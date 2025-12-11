// Quick API test to verify our simplifications work
const http = require('http');

// Test data
const testCourse = {
  code: "TESTFIX",
  title: "API Fix Test", 
  description: "Testing simplified backend",
  level: 1,
  totalTime: 10,
  timePerQuestion: 60
};

const testKeywordRequest = {
  answerText: "Paris ist die Hauptstadt von Frankreich und liegt an der Seine."
};

function testAPI(port = 3000) {
  console.log('🧪 Testing Simplified Backend APIs...\n');
  
  // Test 1: Health Check
  const healthReq = http.request({
    hostname: 'localhost',
    port: port,
    path: '/api/health',
    method: 'GET'
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('✅ Health Check:', res.statusCode === 200 ? 'PASS' : 'FAIL');
      console.log('   Response:', JSON.parse(data).status || 'unknown');
      
      // Test 2: Course Creation
      testCourseCreation(port);
    });
  });
  
  healthReq.on('error', () => {
    console.log('❌ Server not running on port', port);
    console.log('   Start server with: npm run dev');
  });
  
  healthReq.end();
}

function testCourseCreation(port) {
  const postData = JSON.stringify(testCourse);
  
  const courseReq = http.request({
    hostname: 'localhost', 
    port: port,
    path: '/api/courses',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const result = JSON.parse(data);
      console.log('✅ Course Creation:', res.statusCode === 200 ? 'PASS' : 'FAIL');
      if (result.success) {
        console.log('   Course ID:', result.course.id);
        testKeywordGeneration(port);
      } else {
        console.log('   Error:', result.message);
      }
    });
  });
  
  courseReq.write(postData);
  courseReq.end();
}

function testKeywordGeneration(port) {
  const postData = JSON.stringify(testKeywordRequest);
  
  const keywordReq = http.request({
    hostname: 'localhost',
    port: port, 
    path: '/api/generate-keywords',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const result = JSON.parse(data);
      console.log('✅ Keyword Generation:', res.statusCode === 200 ? 'PASS' : 'FAIL');
      if (result.keywords) {
        console.log('   Keywords:', result.keywords.slice(0, 3).join(', '));
      } else {
        console.log('   Error:', result.message);
      }
      
      console.log('\n🎉 API Testing Complete!');
    });
  });
  
  keywordReq.write(postData);
  keywordReq.end();
}

// Run tests
testAPI();