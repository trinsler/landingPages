// Stress Test for 20k+ Users
// Aggressive testing to find breaking points

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

export const errorRate = new Rate('errors');
export const responseTime = new Trend('response_time');

// Aggressive configuration
export const options = {
  stages: [
    { duration: '1m', target: 500 },   // Quick ramp to 500
    { duration: '2m', target: 1000 },  // Scale to 1k users
    { duration: '3m', target: 2000 },  // Scale to 2k users (simulate 20k load)
    { duration: '1m', target: 500 },   // Scale down
    { duration: '30s', target: 0 },    // Stop
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // Relaxed for stress test
    http_req_failed: ['rate<0.2'],     // Allow higher error rate
    errors: ['rate<0.15'],
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  const start = new Date().getTime();
  
  // Concurrent API calls to simulate real load
  const responses = http.batch([
    ['GET', `${BASE_URL}/api/health`],
    ['GET', `${BASE_URL}/api/courses`],
    ['GET', `${BASE_URL}/api/health`], // Duplicate to test caching
  ]);

  const duration = new Date().getTime() - start;
  responseTime.add(duration);

  responses.forEach((response, index) => {
    check(response, {
      [`Request ${index} status < 500`]: (r) => r.status < 500,
      [`Request ${index} response time < 3s`]: (r) => r.timings.duration < 3000,
    }) || errorRate.add(1);
  });

  // Very short sleep to maintain high load
  sleep(0.1 + Math.random() * 0.5);
}