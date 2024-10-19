// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

// const pdfFiles = {
//     'uz': 'pdf/jizzak-compressed.pdf',
//     'ru': 'pdf/Ruscha Jizzax-compressed.pdf',
//     'en': 'pdf/English Jizzax-compressed.pdf'
// };

// const languageSelector = document.getElementById('language');
// const pdfViewer = document.getElementById('pdf-viewer');
// const loadingIndicator = document.getElementById('loading');
// const loadingText = document.getElementById('loading-text');
// let pdfDoc = null;
// let scale = 1.5;
// let loadedPages = new Set();

// function renderPage(page) {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     const viewport = page.getViewport({ scale: scale });
//     canvas.height = viewport.height;
//     canvas.width = viewport.width;
//     const renderContext = {
//         canvasContext: context,
//         viewport: viewport
//     };
//     page.render(renderContext);
//     pdfViewer.appendChild(canvas);
// }

// function loadPDF(lang) {
//     const url = `${pdfFiles[lang]}?t=${new Date().getTime()}`;
//     loadingIndicator.style.display = 'flex';
//     pdfjsLib.getDocument(url).promise.then(function(pdf) {
//         pdfDoc = pdf;
//         loadingIndicator.style.display = 'none';
//         loadVisiblePages(); // Avvalgi sahifalarni yuklash
//     }).catch(error => {
//         loadingIndicator.style.display = 'none';
//         console.error('PDF yuklashda xatolik:', error);
//     });
// }

// function loadVisiblePages() {
//     const scrollTop = pdfViewer.scrollTop;
//     const viewerHeight = pdfViewer.clientHeight;
//     const numPages = pdfDoc.numPages;

//     for (let i = 1; i <= numPages; i++) {
//         const pageOffset = (i - 1) * (viewerHeight / 2); // Sahifa offsetini hisoblash
//         if (scrollTop + viewerHeight > pageOffset && !loadedPages.has(i)) {
//             pdfDoc.getPage(i).then(renderPage);
//             loadedPages.add(i); // Yuklangan sahifani qo'shish
//         }
//     }
// }

// // Dastlabki yuklash
// window.onload = function() {
//     loadingIndicator.style.display = 'flex';
//     loadPDF(languageSelector.value);
// };

// // Tilni o'zgartirish
// languageSelector.addEventListener('change', function() {
//     pdfViewer.innerHTML = ''; // Avvalgi sahifalarni tozalash
//     loadedPages.clear(); // Yuklangan sahifalarni tozalash
//     loadingIndicator.style.display = 'flex';
//     loadPDF(this.value);
// });

// // PDF ko'rinishi bo'yicha sahifalarni yuklash
// pdfViewer.addEventListener('scroll', loadVisiblePages);

// // i18next sozlamalari
// i18next.init({
//     lng: 'uz',
//     resources: {
//         uz: { translation: { welcome: "JIZZAX MO̒JIZALAR O̒LKASI", loading: "Yuklanmoqda..." }},
//         ru: { translation: { welcome: "Джизак – страна чудес", loading: "Загрузка..." }},
//         en: { translation: { welcome: "Jizzax is a wonderland", loading: "Loading..." }}
//     }
// }, function(err, t) {
//     updateContent();
// });

// function updateContent() {
//     document.title = i18next.t('welcome');
//     document.querySelector('header h1').textContent = i18next.t('welcome');
//     loadingText.textContent = i18next.t('loading');
// }

// languageSelector.addEventListener('change', function() {
//     i18next.changeLanguage(this.value);
//     updateContent();
// });



// PDF.js worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const pdfFiles = {
    'uz': 'pdf/jizzak-compressed.pdf',
    'ru': 'pdf/Ruscha Jizzax-compressed.pdf',
    'en': 'pdf/English Jizzax-compressed.pdf'
};

const languageSelector = document.getElementById('language');
const pdfViewer = document.getElementById('pdf-viewer');
const loadingIndicator = document.getElementById('loading');
const loadingText = document.getElementById('loading-text');
let pdfDoc = null;
let scale = 1.0;  // Consider starting with a lower scale for faster rendering
let loadedPages = new Set();

// Function to render a page
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

// Function to load a PDF
function loadPDF(lang) {
    const url = `${pdfFiles[lang]}?t=${new Date().getTime()}`;
    loadingIndicator.style.display = 'flex';
    pdfjsLib.getDocument(url).promise.then(pdf => {
        pdfDoc = pdf;
        loadingIndicator.style.display = 'none';
        loadVisiblePages(); // Load initial visible pages
    }).catch(error => {
        loadingIndicator.style.display = 'none';
        console.error('Error loading PDF:', error);
    });
}

// Function to load visible pages
function loadVisiblePages() {
    const scrollTop = pdfViewer.scrollTop;
    const viewerHeight = pdfViewer.clientHeight;
    const numPages = pdfDoc.numPages;

    for (let i = 1; i <= numPages; i++) {
        const pageOffset = (i - 1) * (viewerHeight / 2); // Calculate page offset
        if (scrollTop + viewerHeight > pageOffset && !loadedPages.has(i)) {
            pdfDoc.getPage(i).then(renderPage);
            loadedPages.add(i); // Mark page as loaded
        }
    }
}

// Initial loading
window.onload = function() {
    loadingIndicator.style.display = 'flex';
    loadPDF(languageSelector.value);
};

// Language change event
languageSelector.addEventListener('change', function() {
    pdfViewer.innerHTML = ''; // Clear previous pages
    loadedPages.clear(); // Clear loaded pages
    loadingIndicator.style.display = 'flex';
    loadPDF(this.value);
});

// PDF viewer scroll event
pdfViewer.addEventListener('scroll', loadVisiblePages);

