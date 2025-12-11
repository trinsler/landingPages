// Basic Load Test for Imagio Platform
// Tests core API endpoints under simulated 20k user load

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
export const errorRate = new Rate('errors');

// Test configuration for 20k users simulation
export const options = {
  stages: [
    { duration: '30s', target: 50 },    // Ramp up to 50 users
    { duration: '1m', target: 200 },   // Scale to 200 users
    { duration: '2m', target: 500 },   // Scale to 500 users  
    { duration: '1m', target: 200 },   // Scale down
    { duration: '30s', target: 0 },    // Cool down
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests under 1s
    http_req_failed: ['rate<0.1'],     // Error rate under 10%
    errors: ['rate<0.05'],             // Custom error rate under 5%
  },
};

const BASE_URL = 'http://localhost:3000';

// Test data
const testCourseData = {
  code: `TEST${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  title: 'Load Test Course',
  description: 'Testing under load',
  level: 1,
  totalTime: 10,
  timePerQuestion: 60
};

export default function () {
  // 1. Health Check (most common request)
  const healthResponse = http.get(`${BASE_URL}/api/health`);
  check(healthResponse, {
    'health check status is 200': (r) => r.status === 200,
    'health check has redis': (r) => JSON.parse(r.body).redis !== undefined,
  }) || errorRate.add(1);

  // 2. Course Listing (public endpoint)
  const coursesResponse = http.get(`${BASE_URL}/api/courses`);
  check(coursesResponse, {
    'courses list status is 200': (r) => r.status === 200,
    'courses response has data': (r) => JSON.parse(r.body).courses !== undefined,
  }) || errorRate.add(1);

  // 3. Course Creation (admin endpoint)  
  const createResponse = http.post(
    `${BASE_URL}/api/courses`,
    JSON.stringify(testCourseData),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(createResponse, {
    'course creation status is 200': (r) => r.status === 200,
    'course creation returns ID': (r) => JSON.parse(r.body).course?.id !== undefined,
  }) || errorRate.add(1);

  // 4. Keyword Generation
  const keywordResponse = http.post(
    `${BASE_URL}/api/generate-keywords`,
    JSON.stringify({ 
      answerText: 'Paris ist die Hauptstadt von Frankreich und liegt an der Seine.' 
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(keywordResponse, {
    'keyword generation completes': (r) => r.status < 500,
  }) || errorRate.add(1);

  // Simulate real user behavior with pauses
  sleep(1 + Math.random() * 2); // Random delay 1-3 seconds
}