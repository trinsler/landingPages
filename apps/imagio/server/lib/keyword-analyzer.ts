interface KeywordAnalysisConfig {
  minKeywordLength: number;
  caseSensitive: boolean;
  stemming: boolean;
  synonyms: Record<string, string[]>;
}

export interface KeywordAnalysisResult {
  foundKeywords: string[];
  missedKeywords: string[];
  score: number;
  percentage: number;
  passed: boolean;
  details: Array<{
    keyword: string;
    found: boolean;
    variations?: string[];
    confidence: number;
  }>;
}

export class KeywordAnalyzer {
  private config: KeywordAnalysisConfig;
  
  constructor(config: Partial<KeywordAnalysisConfig> = {}) {
    this.config = {
      minKeywordLength: 3,
      caseSensitive: false,
      stemming: true,
      synonyms: {},
      ...config
    };
  }
  
  async analyzeAnswer(
    answerText: string, 
    targetKeywords: string[]
  ): Promise<KeywordAnalysisResult> {
    const normalizedAnswer = this.normalizeText(answerText);
    const normalizedKeywords = targetKeywords.map(k => this.normalizeText(k));
    
    const results: Array<{
      keyword: string;
      found: boolean;
      variations: string[];
      confidence: number;
    }> = [];
    
    for (const keyword of normalizedKeywords) {
      const analysis = this.findKeywordInText(normalizedAnswer, keyword);
      results.push({
        keyword,
        found: analysis.found,
        variations: analysis.variations,
        confidence: analysis.confidence
      });
    }
    
    const foundCount = results.filter(r => r.found).length;
    const totalCount = results.length;
    const percentage = totalCount > 0 ? (foundCount / totalCount) * 100 : 0;
    const score = this.calculateScore(results);
    const passed = percentage >= 60; // 60% Threshold
    
    return {
      foundKeywords: results.filter(r => r.found).map(r => r.keyword),
      missedKeywords: results.filter(r => !r.found).map(r => r.keyword),
      score,
      percentage,
      passed,
      details: results
    };
  }
  
  private normalizeText(text: string): string {
    if (!this.config.caseSensitive) {
      text = text.toLowerCase();
    }
    
    // Remove punctuation, extra spaces
    text = text.replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
    
    return text;
  }
  
  private findKeywordInText(text: string, keyword: string) {
    const variations: string[] = [];
    let found = false;
    let confidence = 0;
    
    // Exact match
    if (text.includes(keyword)) {
      found = true;
      confidence = 1.0;
      variations.push(keyword);
    }
    
    // Partial match (für zusammengesetzte Wörter)
    const keywordParts = keyword.split(' ');
    if (keywordParts.length > 1) {
      const partMatches = keywordParts.filter(part => 
        part.length >= this.config.minKeywordLength && text.includes(part)
      );
      
      if (partMatches.length > 0) {
        found = true;
        confidence = partMatches.length / keywordParts.length;
        variations.push(...partMatches);
      }
    }
    
    // Synonyms
    const synonyms = this.config.synonyms[keyword] || [];
    for (const synonym of synonyms) {
      if (text.includes(synonym)) {
        found = true;
        confidence = Math.max(confidence, 0.8); // Synonyms get 80% confidence
        variations.push(synonym);
      }
    }
    
    return { found, variations, confidence };
  }
  
  private calculateScore(results: Array<{ found: boolean; confidence: number }>): number {
    if (results.length === 0) return 0;
    
    const totalScore = results.reduce((sum, result) => {
      return sum + (result.found ? result.confidence * 100 : 0);
    }, 0);
    
    return Math.round(totalScore / results.length);
  }
}