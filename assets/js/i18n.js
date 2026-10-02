/* Curated translations, served with the page. No external translation service. */
(() => {
  document.documentElement.classList.add('js');
  const supported = ['pt-BR', 'en'];
  let language = 'pt-BR';
  try {
    const saved = localStorage.getItem('portfolio-language');
    if (supported.includes(saved)) language = saved;
  } catch (_) { /* Browsing with storage disabled still supports switching. */ }
  document.documentElement.lang = language;

  document.addEventListener('DOMContentLoaded', () => {
    const translations = [...document.querySelectorAll('[data-en]')].map(element => ({
      element, portuguese: element.innerHTML, english: element.dataset.en
    }));
    const metadata = [...document.querySelectorAll('[data-en-content]')].map(element => ({
      element, portuguese: element.content, english: element.dataset.enContent
    }));
    const buttons = document.querySelectorAll('[data-set-language]');

    function applyLanguage(nextLanguage) {
      if (!supported.includes(nextLanguage)) return;
      language = nextLanguage;
      document.documentElement.lang = language;
      translations.forEach(({ element, portuguese, english }) => {
        // Only repository-authored, HTML-escaped attributes are read here.
        element.innerHTML = language === 'en' ? english : portuguese;
      });
      metadata.forEach(({ element, portuguese, english }) => {
        element.content = language === 'en' ? english : portuguese;
      });
      buttons.forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.setLanguage === language));
      });
      document.querySelectorAll('a[href*="api.whatsapp.com/send"]').forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('text', language === 'en' ? 'Hi Pedro!' : 'Oi Pedro!');
        link.href = url.toString();
      });
      document.dispatchEvent(new CustomEvent('languagechange', { detail: { language } }));
      try { localStorage.setItem('portfolio-language', language); } catch (_) { /* Optional persistence. */ }
    }

    buttons.forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.setLanguage)));
    document.querySelectorAll('.language-switcher').forEach(control => { control.hidden = false; });
    applyLanguage(language);
  });
})();
