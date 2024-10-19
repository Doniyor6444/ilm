// PDF.js worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

const pdfFiles = {
    'uz': 'pdf/Uzbekcha.compress.pdf',
    'ru': 'pdf/Russian-Jizzax-compressed.pdf',
    'en': 'pdf/English_compressed.pdf'
};

// Text translations for the main title and lead text
const mainTitles = {
    'uz': "JIZZAX MO'JIZALAR O'LKASI",
    'ru': "ЧУДЕСНАЯ СТРАНА ДЖИЗАК",
    'en': "THE LAND OF WONDERS - JIZZAX"
};



const languageSelector = document.getElementById('language');
const pdfViewer = document.getElementById('pdf-viewer');
const loadingIndicator = document.getElementById('loading');
const mainTitle = document.getElementById('main-title');  // Get the main title element
const leadText = document.getElementById('lead-text');    // Get the lead text element
let pdfDoc = null;
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
        }

        loadingIndicator.style.display = 'none'; // Hide loading indicator once all pages are rendered
    }).catch(function(error) {
        loadingIndicator.style.display = 'none'; // Hide loading indicator on error
        console.error('Error loading PDF:', error);
    });
}

// Initial PDF loading and text on window load
window.onload = function() {
    loadPDF(languageSelector.value); // Load PDF based on initial language selection
    mainTitle.textContent = mainTitles[languageSelector.value]; // Set initial main title
    leadText.textContent = leadTexts[languageSelector.value];   // Set initial lead text
};

// Language change event
languageSelector.addEventListener('change', function() {
    pdfViewer.innerHTML = ''; // Clear the viewer for the new language
    loadPDF(this.value);      // Load the new PDF

    // Change the main title and lead text according to the selected language
    mainTitle.textContent = mainTitles[this.value];
    leadText.textContent = leadTexts[this.value];
});
