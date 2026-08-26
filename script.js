document.documentElement.classList.add('js');

const translations = {
  en: { navLabel: 'Main navigation', featuresNav: 'Features', privacyNav: 'Privacy', termsNav: 'Terms', eyebrow: 'Care, connected', heroTitle: 'Your pet’s health<br>records in one place', heroLede: 'Track vaccinations, vet visits, medications, and medical records—all in one secure place. Stay organized and keep your pet happy and healthy.', downloadLabel: 'Download HandyPet', android: 'Download for Android', ios: 'Download for iOS', secure: 'Secure & Private', secureText: 'Your pet’s data is encrypted and always protected.', sync: 'Cloud Sync', syncText: 'Access your pet’s records anytime, anywhere.', reminders: 'Smart Reminders', remindersText: 'Never miss a vaccine or medication again.', featuresTitle: 'HandyPet features', vaccinations: 'Vaccinations', vaccinationsText: 'Track vaccines and never miss an important dose.', vetVisits: 'Vet Visits', vetVisitsText: 'Log visits and keep a history of your pet’s health.', medications: 'Medications', medicationsText: 'Manage medications and set helpful reminders.', medicalRecords: 'Medical Records', medicalRecordsText: 'Store test results and records in one secure place.', weightLogging: 'Weight Logging', weightLoggingText: 'Track weight changes over time and follow your pet’s progress.', documentUploads: 'Document Uploads', documentUploadsText: 'Upload and organize important pet documents securely.', recordExports: 'Health Record Exports', recordExportsText: 'Export your pet’s complete health history as a convenient PDF.', customReminders: 'Custom Reminders', customRemindersText: 'Schedule pet reminders for the exact date and time you choose.', privacy: 'Privacy Policy', terms: 'Terms of Use', support: 'Support', languageLabel: 'Language', copyright: '© 2026 HandyPet. All rights reserved.' },
  es: { navLabel: 'Navegación principal', featuresNav: 'Funciones', privacyNav: 'Privacidad', termsNav: 'Términos', eyebrow: 'Cuidado conectado', heroTitle: 'La salud de tu mascota<br>en un solo lugar', heroLede: 'Registra vacunas, visitas al veterinario, medicamentos e historiales médicos en un lugar seguro. Organízate y mantén a tu mascota feliz y saludable.', downloadLabel: 'Descargar HandyPet', android: 'Descargar para Android', ios: 'Descargar para iOS', secure: 'Seguro y privado', sync: 'Sincronización en la nube', data: 'Tus datos siempre son tuyos', featuresTitle: 'Funciones de HandyPet', vaccinations: 'Vacunas', vaccinationsText: 'Registra las vacunas y no te pierdas ninguna dosis importante.', vetVisits: 'Visitas veterinarias', vetVisitsText: 'Registra las visitas y conserva el historial de salud de tu mascota.', medications: 'Medicamentos', medicationsText: 'Gestiona los medicamentos y configura recordatorios útiles.', medicalRecords: 'Historial médico', medicalRecordsText: 'Guarda resultados y documentos en un lugar seguro.', weightLogging: 'Registro de peso', weightLoggingText: 'Sigue los cambios de peso y el progreso de tu mascota.', documentUploads: 'Carga de documentos', documentUploadsText: 'Carga y organiza documentos importantes de forma segura.', recordExports: 'Exportación del historial', recordExportsText: 'Exporta el historial médico completo de tu mascota en PDF.', customReminders: 'Recordatorios personalizados', customRemindersText: 'Programa recordatorios para la fecha y hora exactas que elijas.', privacy: 'Política de privacidad', terms: 'Términos de uso', support: 'Soporte', languageLabel: 'Idioma', copyright: '© 2026 HandyPet. Todos los derechos reservados.' },
  fr: { navLabel: 'Navigation principale', featuresNav: 'Fonctionnalités', privacyNav: 'Confidentialité', termsNav: 'Conditions', eyebrow: 'Les soins, connectés', heroTitle: 'La santé de votre animal<br>en un seul endroit', heroLede: 'Suivez les vaccins, visites vétérinaires, médicaments et dossiers médicaux dans un espace sécurisé. Restez organisé et gardez votre animal heureux et en bonne santé.', downloadLabel: 'Télécharger HandyPet', android: 'Télécharger pour Android', ios: 'Télécharger pour iOS', secure: 'Sécurisé et privé', sync: 'Synchronisation cloud', data: 'Vos données vous appartiennent', featuresTitle: 'Fonctionnalités HandyPet', vaccinations: 'Vaccinations', vaccinationsText: 'Suivez les vaccins et ne manquez jamais une dose importante.', vetVisits: 'Visites vétérinaires', vetVisitsText: 'Notez les visites et conservez l’historique de santé de votre animal.', medications: 'Médicaments', medicationsText: 'Gérez les médicaments et définissez des rappels utiles.', medicalRecords: 'Dossiers médicaux', medicalRecordsText: 'Stockez les résultats et dossiers dans un espace sécurisé.', weightLogging: 'Suivi du poids', weightLoggingText: 'Suivez l’évolution du poids de votre animal.', documentUploads: 'Téléchargement de documents', documentUploadsText: 'Téléchargez et organisez vos documents importants en toute sécurité.', recordExports: 'Export des dossiers', recordExportsText: 'Exportez l’historique médical complet de votre animal en PDF.', customReminders: 'Rappels personnalisés', customRemindersText: 'Planifiez des rappels à la date et à l’heure de votre choix.', privacy: 'Politique de confidentialité', terms: 'Conditions d’utilisation', support: 'Assistance', languageLabel: 'Langue', copyright: '© 2026 HandyPet. Tous droits réservés.' },
  de: { navLabel: 'Hauptnavigation', featuresNav: 'Funktionen', privacyNav: 'Datenschutz', termsNav: 'Bedingungen', eyebrow: 'Fürsorge, verbunden', heroTitle: 'Die Gesundheit Ihres Tieres<br>an einem Ort', heroLede: 'Verwalten Sie Impfungen, Tierarztbesuche, Medikamente und Krankenakten sicher an einem Ort. Bleiben Sie organisiert und halten Sie Ihr Tier glücklich und gesund.', downloadLabel: 'HandyPet herunterladen', android: 'Für Android herunterladen', ios: 'Für iOS herunterladen', secure: 'Sicher und privat', sync: 'Cloud-Synchronisierung', data: 'Ihre Daten gehören Ihnen', featuresTitle: 'HandyPet-Funktionen', vaccinations: 'Impfungen', vaccinationsText: 'Verfolgen Sie Impfungen und verpassen Sie keine wichtige Dosis.', vetVisits: 'Tierarztbesuche', vetVisitsText: 'Dokumentieren Sie Besuche und bewahren Sie die Gesundheitsgeschichte auf.', medications: 'Medikamente', medicationsText: 'Verwalten Sie Medikamente und setzen Sie hilfreiche Erinnerungen.', medicalRecords: 'Krankenakten', medicalRecordsText: 'Speichern Sie Testergebnisse und Unterlagen sicher an einem Ort.', weightLogging: 'Gewicht verfolgen', weightLoggingText: 'Verfolgen Sie Gewichtsveränderungen und die Entwicklung Ihres Tieres.', documentUploads: 'Dokumente hochladen', documentUploadsText: 'Laden Sie wichtige Dokumente sicher hoch und organisieren Sie sie.', recordExports: 'Gesundheitsdaten exportieren', recordExportsText: 'Exportieren Sie die vollständige Krankengeschichte als PDF.', customReminders: 'Individuelle Erinnerungen', customRemindersText: 'Planen Sie Erinnerungen für das gewünschte Datum und die gewünschte Uhrzeit.', privacy: 'Datenschutzerklärung', terms: 'Nutzungsbedingungen', support: 'Support', languageLabel: 'Sprache', copyright: '© 2026 HandyPet. Alle Rechte vorbehalten.' },
  pt: { navLabel: 'Navegação principal', featuresNav: 'Funcionalidades', privacyNav: 'Privacidade', termsNav: 'Termos', eyebrow: 'Cuidado conectado', heroTitle: 'A saúde do seu animal<br>num só lugar', heroLede: 'Acompanhe vacinas, consultas veterinárias, medicamentos e registos médicos num local seguro. Mantenha-se organizado e cuide da saúde e felicidade do seu animal.', downloadLabel: 'Transferir o HandyPet', android: 'Transferir para Android', ios: 'Transferir para iOS', secure: 'Seguro e privado', sync: 'Sincronização na nuvem', data: 'Os seus dados são sempre seus', featuresTitle: 'Funcionalidades do HandyPet', vaccinations: 'Vacinas', vaccinationsText: 'Acompanhe as vacinas e nunca perca uma dose importante.', vetVisits: 'Consultas veterinárias', vetVisitsText: 'Registe consultas e guarde o histórico de saúde do seu animal.', medications: 'Medicamentos', medicationsText: 'Gira medicamentos e defina lembretes úteis.', medicalRecords: 'Registos médicos', medicalRecordsText: 'Guarde resultados e registos num local seguro.', weightLogging: 'Registo de peso', weightLoggingText: 'Acompanhe as alterações de peso e o progresso do seu animal.', documentUploads: 'Carregamento de documentos', documentUploadsText: 'Carregue e organize documentos importantes com segurança.', recordExports: 'Exportação de registos', recordExportsText: 'Exporte o histórico completo de saúde do seu animal em PDF.', customReminders: 'Lembretes personalizados', customRemindersText: 'Agende lembretes para a data e hora exatas que escolher.', privacy: 'Política de privacidade', terms: 'Termos de utilização', support: 'Suporte', languageLabel: 'Idioma', copyright: '© 2026 HandyPet. Todos os direitos reservados.' }
};

const languageSelects = [...document.querySelectorAll('.language-picker select')];
const highlightTranslations = {
  es: { secure: 'Seguro y privado', secureText: 'Los datos de tu mascota están cifrados y protegidos.', sync: 'Sincronización en la nube', syncText: 'Accede a los registros de tu mascota en cualquier momento.', reminders: 'Recordatorios inteligentes', remindersText: 'No vuelvas a olvidar una vacuna o un medicamento.' },
  fr: { secure: 'Sécurisé et privé', secureText: 'Les données de votre animal sont chiffrées et toujours protégées.', sync: 'Synchronisation cloud', syncText: 'Accédez aux dossiers de votre animal à tout moment.', reminders: 'Rappels intelligents', remindersText: 'Ne manquez plus jamais un vaccin ou un médicament.' },
  de: { secure: 'Sicher und privat', secureText: 'Die Daten Ihres Tieres sind verschlüsselt und stets geschützt.', sync: 'Cloud-Synchronisierung', syncText: 'Greifen Sie jederzeit auf die Daten Ihres Tieres zu.', reminders: 'Smarte Erinnerungen', remindersText: 'Verpassen Sie nie wieder eine Impfung oder ein Medikament.' },
  pt: { secure: 'Seguro e privado', secureText: 'Os dados do seu animal estão encriptados e sempre protegidos.', sync: 'Sincronização na nuvem', syncText: 'Aceda aos registos do seu animal a qualquer momento.', reminders: 'Lembretes inteligentes', remindersText: 'Nunca mais se esqueça de uma vacina ou medicamento.' }
};

const supportedLanguages = Object.keys(translations);
const systemLanguage = (navigator.languages || [navigator.language || 'en'])
  .map((language) => language.toLowerCase().split('-')[0])
  .find((language) => supportedLanguages.includes(language)) || 'en';

const applyLanguage = (language) => {
  const selectedLanguage = supportedLanguages.includes(language) ? language : 'en';
  const copy = { ...translations[selectedLanguage], ...(highlightTranslations[selectedLanguage] || {}) };
  document.documentElement.lang = selectedLanguage;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    if (copy[element.dataset.i18n]) element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    if (copy[element.dataset.i18nHtml]) element.innerHTML = copy[element.dataset.i18nHtml];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    if (copy[element.dataset.i18nAria]) element.setAttribute('aria-label', copy[element.dataset.i18nAria]);
  });
  languageSelects.forEach((select) => { select.value = selectedLanguage; });
};

const savedLanguage = window.localStorage.getItem('handypet-language');
applyLanguage(savedLanguage || systemLanguage);
languageSelects.forEach((select) => select.addEventListener('change', (event) => {
  window.localStorage.setItem('handypet-language', event.target.value);
  applyLanguage(event.target.value);
}));

const cards = [...document.querySelectorAll('.feature-card')];
const showcase = document.querySelector('.feature-showcase');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cards.length && showcase) {
  let activeIndex = 0;
  let timer;
  let paused = false;

  const progress = document.createElement('div');
  progress.className = 'feature-progress';
  progress.setAttribute('aria-label', 'Feature slideshow controls');

  const dots = cards.map((card, index) => {
    card.tabIndex = 0;
    card.style.setProperty('--reveal-delay', `${index * 55}ms`);
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'feature-dot';
    dot.setAttribute('aria-label', `Show feature ${index + 1}: ${card.querySelector('h3')?.textContent ?? ''}`);
    dot.addEventListener('click', () => {
      activeIndex = index;
      updateSpotlight();
      restart();
    });
    progress.append(dot);
    return dot;
  });

  showcase.append(progress);

  const updateSpotlight = () => {
    cards.forEach((card, index) => card.classList.toggle('is-featured', index === activeIndex));
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === activeIndex);
      dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
    });
  };

  const advance = () => {
    if (!paused) {
      activeIndex = (activeIndex + 1) % cards.length;
      updateSpotlight();
    }
  };

  const restart = () => {
    window.clearInterval(timer);
    if (!reduceMotion) timer = window.setInterval(advance, 2400);
  };

  showcase.addEventListener('mouseenter', () => { paused = true; });
  showcase.addEventListener('mouseleave', () => { paused = false; });
  showcase.addEventListener('focusin', () => { paused = true; });
  showcase.addEventListener('focusout', () => { paused = false; });

  const startShowcase = () => {
    cards.forEach((card) => card.classList.add('is-revealed'));
    updateSpotlight();
    restart();
  };

  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startShowcase();
        reveal.disconnect();
      }
    }, { threshold: 0.14 });
    reveal.observe(showcase);
  } else {
    startShowcase();
  }
}
