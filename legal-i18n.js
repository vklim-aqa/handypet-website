(() => {
  const page = document.querySelector('[data-legal-i18n="faqTitle"]') ? 'faq'
    : document.querySelector('[data-legal-i18n="privacyTitle"]') ? 'privacy' : 'terms';

  const copy = {
    en: { languageLabel: 'Language', home: 'Home', backHome: '&larr; Back to home', backHomeAria: 'Back to HandyPet home', faq: 'FAQ', privacy: 'Privacy Policy', terms: 'Terms of Use', faqTitle: 'Handy Pet FAQ', privacyTitle: 'HandyPet Privacy Policy', termsTitle: 'HandyPet Terms of Use', faqDocumentTitle: 'HandyPet FAQ &mdash; HandyPet', privacyDocumentTitle: 'HandyPet Privacy Policy &mdash; HandyPet', termsDocumentTitle: 'HandyPet Terms of Use &mdash; HandyPet' },
    es: { languageLabel: 'Idioma', home: 'Inicio', backHome: '&larr; Volver al inicio', backHomeAria: 'Volver a la página de inicio de HandyPet', faq: 'Preguntas frecuentes', privacy: 'Política de privacidad', terms: 'Términos de uso', faqTitle: 'Preguntas frecuentes de Handy Pet', privacyTitle: 'Política de privacidad de HandyPet', termsTitle: 'Términos de uso de HandyPet', faqDocumentTitle: 'Preguntas frecuentes de HandyPet &mdash; HandyPet', privacyDocumentTitle: 'Política de privacidad de HandyPet &mdash; HandyPet', termsDocumentTitle: 'Términos de uso de HandyPet &mdash; HandyPet' },
    fr: { languageLabel: 'Langue', home: 'Accueil', backHome: '&larr; Retour à l’accueil', backHomeAria: 'Retour à l’accueil HandyPet', faq: 'FAQ', privacy: 'Politique de confidentialité', terms: 'Conditions d’utilisation', faqTitle: 'FAQ Handy Pet', privacyTitle: 'Politique de confidentialité HandyPet', termsTitle: 'Conditions d’utilisation HandyPet', faqDocumentTitle: 'FAQ HandyPet &mdash; HandyPet', privacyDocumentTitle: 'Politique de confidentialité HandyPet &mdash; HandyPet', termsDocumentTitle: 'Conditions d’utilisation HandyPet &mdash; HandyPet' },
    de: { languageLabel: 'Sprache', home: 'Startseite', backHome: '&larr; Zur Startseite', backHomeAria: 'Zur HandyPet-Startseite', faq: 'FAQ', privacy: 'Datenschutzerklärung', terms: 'Nutzungsbedingungen', faqTitle: 'Handy Pet FAQ', privacyTitle: 'Datenschutzerklärung von HandyPet', termsTitle: 'Nutzungsbedingungen von HandyPet', faqDocumentTitle: 'HandyPet FAQ &mdash; HandyPet', privacyDocumentTitle: 'Datenschutzerklärung von HandyPet &mdash; HandyPet', termsDocumentTitle: 'Nutzungsbedingungen von HandyPet &mdash; HandyPet' },
    pt: { languageLabel: 'Idioma', home: 'Início', backHome: '&larr; Voltar ao início', backHomeAria: 'Voltar à página inicial do HandyPet', faq: 'FAQ', privacy: 'Política de privacidade', terms: 'Termos de utilização', faqTitle: 'FAQ do Handy Pet', privacyTitle: 'Política de privacidade do HandyPet', termsTitle: 'Termos de utilização do HandyPet', faqDocumentTitle: 'FAQ do HandyPet &mdash; HandyPet', privacyDocumentTitle: 'Política de privacidade do HandyPet &mdash; HandyPet', termsDocumentTitle: 'Termos de utilização do HandyPet &mdash; HandyPet' }
  };

  const selects = [...document.querySelectorAll('.language-picker select')];
  const supported = Object.keys(copy);
  const browserLanguage = (navigator.languages || [navigator.language || 'en'])
    .map((language) => language.toLowerCase().split('-')[0])
    .find((language) => supported.includes(language)) || 'en';

  const applyLanguage = (language) => {
    const selected = supported.includes(language) ? language : 'en';
    const strings = copy[selected];
    document.documentElement.lang = selected;
    document.title = strings[`${page}DocumentTitle`];
    document.querySelectorAll('[data-legal-i18n]').forEach((element) => {
      const value = strings[element.dataset.legalI18n];
      if (value) element.textContent = value;
    });
    document.querySelectorAll('[data-legal-i18n-html]').forEach((element) => {
      const value = strings[element.dataset.legalI18nHtml];
      if (value) element.innerHTML = value;
    });
    document.querySelectorAll('[data-legal-i18n-aria]').forEach((element) => {
      const value = strings[element.dataset.legalI18nAria];
      if (value) element.setAttribute('aria-label', value);
    });
    selects.forEach((select) => { select.value = selected; });
  };

  applyLanguage(window.localStorage.getItem('handypet-language') || browserLanguage);
  selects.forEach((select) => select.addEventListener('change', (event) => {
    window.localStorage.setItem('handypet-language', event.target.value);
    applyLanguage(event.target.value);
  }));
})();
