<<<<<<< HEAD
=======
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



>>>>>>> 970db3bc9e483f64ce57e213741b15a51696a6d5
// PDF.js worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const pdfFiles = {
<<<<<<< HEAD
    'uz': 'pdf/Uzbekcha.compress.pdf',
    'ru': 'pdf/Russian_compressed.pdf',
    'en': 'pdf/English_compressed.pdf'
};

// Text translations for the main title and lead text
const mainTitles = {
    'uz': "JIZZAX MO̒JIZALAR O̒LKASI",
    'ru': "ЧУДЕСНАЯ СТРАНА ДЖИЗАК",
    'en': "THE LAND OF WONDERS - JIZZAX"
};

const leadTexts = {
    'uz': "Kitobni o'qish, bilimni oshirishning kalitidir",
    'ru': "Чтение книг — это ключ к обогащению знаний",
    'en': "Reading books is the key to enhancing knowledge"
=======
    'uz': 'pdf/jizzak-compressed.pdf',
    'ru': 'pdf/Ruscha Jizzax-compressed.pdf',
    'en': 'pdf/English Jizzax-compressed.pdf'
>>>>>>> 970db3bc9e483f64ce57e213741b15a51696a6d5
};

const languageSelector = document.getElementById('language');
const pdfViewer = document.getElementById('pdf-viewer');
const loadingIndicator = document.getElementById('loading');
const mainTitle = document.getElementById('main-title');  // Get the main title element
const leadText = document.getElementById('lead-text');    // Get the lead text element
let pdfDoc = null;
<<<<<<< HEAD
let scale = 1.0;  // Adjust this value if you want to change the rendering scale

// Function to render a page
function renderPage(pageNum) {
    pdfDoc.getPage(pageNum).then(function(page) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render the page to the canvas
        page.render({
            canvasContext: context,
            viewport: viewport
        }).promise.then(() => {
            console.log(`Page ${pageNum} rendered`);
        });

        // Append the canvas to the viewer
        pdfViewer.appendChild(canvas);
    });
}

// Function to load the entire PDF and render all pages
function loadPDF(lang) {
    const url = `${pdfFiles[lang]}?t=${new Date().getTime()}`;
    loadingIndicator.style.display = 'flex'; // Show loading indicator

    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        pdfDoc = pdf;
        const numPages = pdf.numPages;
        console.log(`PDF loaded with ${numPages} pages`);

        // Render each page in sequence
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            renderPage(pageNum);
=======
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
>>>>>>> 970db3bc9e483f64ce57e213741b15a51696a6d5
        }

        loadingIndicator.style.display = 'none'; // Hide loading indicator once all pages are rendered
    }).catch(function(error) {
        loadingIndicator.style.display = 'none'; // Hide loading indicator on error
        console.error('Error loading PDF:', error);
    });
}

<<<<<<< HEAD
// Initial PDF loading and text on window load
=======
// Initial loading
>>>>>>> 970db3bc9e483f64ce57e213741b15a51696a6d5
window.onload = function() {
    loadPDF(languageSelector.value); // Load PDF based on initial language selection
    mainTitle.textContent = mainTitles[languageSelector.value]; // Set initial main title
    leadText.textContent = leadTexts[languageSelector.value];   // Set initial lead text
};

// Language change event
languageSelector.addEventListener('change', function() {
<<<<<<< HEAD
    pdfViewer.innerHTML = ''; // Clear the viewer for the new language
    loadPDF(this.value);      // Load the new PDF

    // Change the main title and lead text according to the selected language
    mainTitle.textContent = mainTitles[this.value];
    leadText.textContent = leadTexts[this.value];
});
=======
    pdfViewer.innerHTML = ''; // Clear previous pages
    loadedPages.clear(); // Clear loaded pages
    loadingIndicator.style.display = 'flex';
    loadPDF(this.value);
});

// PDF viewer scroll event
pdfViewer.addEventListener('scroll', loadVisiblePages);

>>>>>>> 970db3bc9e483f64ce57e213741b15a51696a6d5
