  // PDF.js worker fayl manzilini belgilash
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

  const pdfFiles = {
      'uz': 'pdf/jizzak-compressed.pdf',
      'ru': 'pdf/jizzak.pdf',
      'en': 'pdf/jizzak-compressed.pdf'
  };

  const languageSelector = document.getElementById('language');
  const pdfViewer = document.getElementById('pdf-viewer');
  const loadingIndicator = document.getElementById('loading');
  const loadingText = document.getElementById('loading-text');
  let pdfDoc = null;
  let scale = 1.5;

  function renderPage(page) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const viewport = page.getViewport({ scale: scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
          canvasContext: context,
          viewport: viewport
      };
      page.render(renderContext);
      pdfViewer.appendChild(canvas);
  }

  function loadPDF(lang) {
      const url = `${pdfFiles[lang]}?t=${new Date().getTime()}`; // URL yangilash
      loadingIndicator.style.display = 'flex'; // Yuklash belgisini ko'rsatish
      pdfjsLib.getDocument(url).promise.then(function(pdf) {
          pdfDoc = pdf;
          const numPages = pdf.numPages;
          const pagePromises = [];
          for (let i = 1; i <= numPages; i++) {
              pagePromises.push(pdf.getPage(i).then(renderPage));
          }
          return Promise.all(pagePromises);
      }).then(() => {
          loadingIndicator.style.display = 'none'; // Yuklash belgisini yashirish
      }).catch(error => {
          loadingIndicator.style.display = 'none'; // Xatolik yuz bersa, yuklash belgisini yashirish
          console.error('PDF yuklashda xatolik:', error);
      });
  }

  // Dastlabki yuklash
  window.onload = function() {
      loadingIndicator.style.display = 'flex'; // Sayt yuklayotganda yuklash belgisini ko'rsatish
      loadPDF(languageSelector.value);
  };

  // Tilni o'zgartirish
  languageSelector.addEventListener('change', function() {
      pdfViewer.innerHTML = ''; // Avvalgi sahifalarni tozalash
      loadingIndicator.style.display = 'flex'; // Yuklash belgisini ko'rsatish
      loadPDF(this.value);
  });

  // i18next sozlamalari
  i18next.init({
      lng: 'uz',
      resources: {
          uz: { translation: { welcome: "Xush kelibsiz", loading: "Yuklanmoqda..." }},
          ru: { translation: { welcome: "Добро пожаловать", loading: "Загрузка..." }},
          en: { translation: { welcome: "Welcome", loading: "Loading..." }}
      }
  }, function(err, t) {
      updateContent();
  });

  function updateContent() {
      document.title = i18next.t('welcome');
      document.querySelector('header h1').textContent = i18next.t('welcome');
      loadingText.textContent = i18next.t('loading');
  }

  languageSelector.addEventListener('change', function() {
      i18next.changeLanguage(this.value);
      updateContent();
  });