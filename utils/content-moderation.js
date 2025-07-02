// Content Moderation Check
class ContentModeration {
  constructor() {
    this.sensitiveTopics = [
      'politics', 'religion', 'controversial'
    ];
  }

  checkContent(content) {
    const warnings = [];
    const blockedTerms = [];
    
    this.sensitiveTopics.forEach(topic => {
      if (content.toLowerCase().includes(topic)) {
        warnings.push(`Content contains sensitive topic: ${topic}`);
      }
    });

    // Check for inappropriate language
    const inappropriate = this.checkInappropriateLanguage(content);
    if (inappropriate) {
      blockedTerms.push(...inappropriate);
    }

    return {
      approved: blockedTerms.length === 0,
      warnings,
      blockedTerms,
      score: this.calculateSafetyScore(content)
    };
  }

  checkInappropriateLanguage(content) {
    // Comprehensive list of inappropriate terms
    const inappropriateTerms = [
      'hate', 'violence', 'discrimination',
      'racism', 'sexism', 'harassment'
    ];
    
    // Check for terms and variations
    return inappropriateTerms.filter(term => {
      const regex = new RegExp(`\\b${term}\\w*\\b`, 'i');
      return regex.test(content);
    });
  }

  calculateSafetyScore(content) {
    const sensitiveCount = this.sensitiveTopics.filter(topic => 
      content.toLowerCase().includes(topic)
    ).length;
    
    return 100 - (sensitiveCount * 10);
  }
}

module.exports = ContentModeration;