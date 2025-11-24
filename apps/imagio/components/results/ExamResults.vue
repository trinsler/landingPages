<template>
  <div class="exam-results-section">
    <h3 class="section-title">{{ results.examTitle }} - Results</h3>
    
    <!-- Overall Score -->
    <div class="score-overview">
      <div class="overall-score" :class="{ passed: results.passed }">
        <div class="score-circle">
          <span class="score-value">{{ Math.round(results.overallScore) }}%</span>
        </div>
        <div class="score-label">
          <h4>{{ results.passed ? 'Congratulations! You Passed!' : 'Not Quite There Yet' }}</h4>
          <p>{{ results.totalQuestions }} questions answered</p>
        </div>
      </div>
    </div>
    
    <!-- Individual Answers -->
    <div class="answers-list">
      <div 
        v-for="(answer, index) in results.answers" 
        :key="index"
        class="answer-item"
        :class="{ passed: answer.passed }"
      >
        <div class="answer-header">
          <div class="question-info">
            <h4>Question {{ index + 1 }}</h4>
            <p class="question-text">{{ answer.question }}</p>
          </div>
          <div class="answer-score">
            <span class="score-points">{{ answer.score }}/10</span>
            <span class="score-percentage">{{ answer.percentage }}%</span>
          </div>
        </div>
        
        <div class="answer-content">
          <div class="user-answer">
            <h5>Your Answer:</h5>
            <p class="answer-text">{{ answer.userAnswer }}</p>
          </div>
          
          <div class="keywords-analysis">
            <h5>Keywords Found:</h5>
            <div class="keywords-list">
              <span 
                v-for="keyword in answer.keywordsFound" 
                :key="keyword"
                class="keyword-tag found"
              >
                {{ keyword }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  results: {
    examTitle: string
    overallScore: number
    totalQuestions: number
    passed: boolean
    answers: Array<{
      question: string
      userAnswer: string
      keywordsFound: string[]
      score: number
      percentage: number
      passed: boolean
      mode: string
    }>
  }
}>()
</script>

<style scoped>
.exam-results-section {
  background: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.score-overview {
  margin-bottom: 2rem;
  text-align: center;
}

.overall-score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
}

.overall-score.passed {
  border-color: #10b981;
  background: #f0fdf4;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #0097b2;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 151, 178, 0.2);
}

.overall-score.passed .score-circle {
  background: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.score-value {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
}

.score-label h4 {
  color: #1f2937;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.score-label p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.answer-item {
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s;
}

.answer-item.passed {
  border-color: #10b981;
  background: #f0fdf4;
}

.answer-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.question-info h4 {
  color: #1f2937;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.question-text {
  color: #374151;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.6;
}

.answer-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.score-points {
  color: #0097b2;
  font-size: 1.25rem;
  font-weight: 700;
}

.answer-item.passed .score-points {
  color: #10b981;
}

.score-percentage {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.answer-content {
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}

.user-answer h5 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.answer-text {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  color: #374151;
  line-height: 1.6;
  margin: 0;
}

.keywords-analysis {
  margin-top: 1rem;
}

.keywords-analysis h5 {
  color: #374151;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.keywords-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.keyword-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  background: #ffffff;
}

.keyword-tag.found {
  background: #dcfce7;
  color: #166534;
  border-color: #bbf7d0;
}

@media (max-width: 768px) {
  .answer-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .answer-score {
    align-items: flex-start;
  }
  
  .overall-score {
    flex-direction: column;
    gap: 1rem;
  }
  
  .score-circle {
    width: 100px;
    height: 100px;
  }
  
  .score-value {
    font-size: 1.25rem;
  }
}
</style>