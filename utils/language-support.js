// Multi-Language Support
class LanguageSupport {
  constructor(defaultLanguage = 'en') {
    this.defaultLanguage = defaultLanguage;
    this.translations = {
      en: {
        postPrefix: 'Exciting Update',
        cta: 'What are your thoughts? Let\'s discuss!'
      },
      es: {
        postPrefix: 'Actualización emocionante',
        cta: '¿Qué opinas? ¡Hablemos!'
      },
      fr: {
        postPrefix: 'Mise à jour passionnante',
        cta: 'Qu\'en pensez-vous? Discutons!'
      }
    };
  }

  translate(content, language) {
    const lang = this.translations[language] || this.translations[this.defaultLanguage];
    const translated = content
      .replace(/Exciting Update/g, lang.postPrefix)
      .replace(/What are your thoughts\? Let's discuss!/g, lang.cta);
    
    // Add language-specific hashtags
    const hashtags = {
      en: ['#Tech', '#Innovation'],
      es: ['#Tecnología', '#Innovación'],
      fr: ['#Technologie', '#Innovation']
    };
    
    return translated + '\n\n' + (hashtags[language] || hashtags[this.defaultLanguage]).join(' ');
  }

  getSupportedLanguages() {
    return Object.keys(this.translations);
  }
}

module.exports = LanguageSupport;