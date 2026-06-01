const SYLLABUS = {
  1: { label: "Year 1 — Semester I", subjects: [
    { code: "BCA-101", title: "Computer Fundamentals and Applications", credits: 3, type: "Notes" },
    { code: "BCA-102", title: "Programming in C",                        credits: 3, type: "Notes" },
    { code: "BCA-103", title: "Digital Logic",                           credits: 3, type: "Notes" },
    { code: "BCA-104", title: "Mathematics-I",                           credits: 3, type: "Exam Paper" },
    { code: "BCA-105", title: "Professional Communication and Ethics",   credits: 3, type: "Notes" },
    { code: "BCA-106", title: "Hardware Workshop",                       credits: 1, type: "Lab Manual" },
  ]},
  2: { label: "Year 1 — Semester II", subjects: [
    { code: "BCA-151", title: "Discrete Structure",                       credits: 3, type: "Notes" },
    { code: "BCA-152", title: "Microprocessor and Computer Architecture", credits: 3, type: "Notes" },
    { code: "BCA-153", title: "OOP in Java",                              credits: 3, type: "Notes" },
    { code: "BCA-154", title: "Mathematics-II",                           credits: 3, type: "Exam Paper" },
    { code: "BCA-155", title: "UX/UI Design",                             credits: 3, type: "Notes" },
    { code: "BCA-156", title: "Principles of Management",                 credits: 1, type: "Notes" },
  ]},
  3: { label: "Year 2 — Semester III", subjects: [
    { code: "BCA-201", title: "Data Structure and Algorithms", credits: 3, type: "Notes" },
    { code: "BCA-202", title: "Database Management System",    credits: 3, type: "Notes" },
    { code: "BCA-203", title: "Web Technology-I",              credits: 3, type: "Notes" },
    { code: "BCA-204", title: "System Analysis and Design",    credits: 3, type: "Notes" },
    { code: "BCA-205", title: "Probability and Statistics",    credits: 3, type: "Exam Paper" },
    { code: "BCA-206", title: "Applied Economics",             credits: 2, type: "Notes" },
  ]},
  4: { label: "Year 2 — Semester IV", subjects: [
    { code: "BCA-251", title: "Operating Systems",    credits: 3, type: "Notes" },
    { code: "BCA-252", title: "Software Engineering", credits: 3, type: "Notes" },
    { code: "BCA-253", title: "Numerical Methods",    credits: 3, type: "Exam Paper" },
    { code: "BCA-254", title: "Python Programming",   credits: 3, type: "Notes" },
    { code: "BCA-255", title: "Web Technology-II",    credits: 3, type: "Notes" },
    { code: "BCA-256", title: "Project-I",            credits: 2, type: "Lab Manual" },
  ]},
  5: { label: "Year 3 — Semester V", subjects: [
    { code: "BCA-301", title: "Computer Network",         credits: 3, type: "Notes" },
    { code: "BCA-302", title: "Artificial Intelligence",  credits: 3, type: "Notes" },
    { code: "BCA-303", title: "Advance Java Programming", credits: 3, type: "Notes" },
    { code: "BCA-304", title: "MIS and e-Business",       credits: 3, type: "Notes" },
    { code: "BCA-305", title: "Society and Technology",   credits: 3, type: "Notes" },
    { code: "BCA-306", title: "Project-II",               credits: 3, type: "Lab Manual" },
  ]},
  6: { label: "Year 3 — Semester VI", subjects: [] }
};

function findSubject(code) {
  for (const sem of Object.values(SYLLABUS)) {
    const found = sem.subjects.find(s => s.code === code);
    if (found) return found;
  }
  return null;
}

const params  = new URLSearchParams(location.search);
const subCode = params.get('code');
const subject = findSubject(subCode);

if (subject) {
  document.title = `${subject.title} — BCA Portal`;
  document.getElementById('subject-title').textContent    = subject.title;
  document.getElementById('subject-code-badge').textContent = subject.code;
  document.getElementById('subject-type-badge').textContent = subject.type;
  document.getElementById('subject-credits').textContent  =
    `${subject.credits} Credit${subject.credits !== 1 ? 's' : ''} · ${subject.type}`;
} else {
  document.title = 'Subject Not Found — BCA Portal';
  document.getElementById('subject-title').textContent = 'Subject Not Found';
}

/* ── PDF.js setup ── */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc     = null;
let currentPage = 1;
let totalPages  = 1;
let scale       = 1.4;
let isRendering = false;

const canvas      = document.getElementById('pdf-canvas');
const ctx         = canvas.getContext('2d');
const pageInfo    = document.getElementById('page-info');
const loadingEl   = document.getElementById('pdf-loading');
const noPdfEl     = document.getElementById('no-pdf-state');
const filenameEl  = document.getElementById('pdf-filename');

function renderPage(num) {
  if (isRendering) return;
  isRendering = true;

  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale });
    canvas.height  = viewport.height;
    canvas.width   = viewport.width;

    page.render({ canvasContext: ctx, viewport }).promise.then(() => {
      isRendering = false;
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    });
  });
}

function loadPDF(url) {
  loadingEl.style.display = 'flex';
  canvas.style.display    = 'none';
  noPdfEl.style.display   = 'none';

  pdfjsLib.getDocument(url).promise
    .then(pdf => {
      pdfDoc     = pdf;
      totalPages = pdf.numPages;
      currentPage = 1;
      loadingEl.style.display = 'none';
      canvas.style.display    = 'block';
      renderPage(currentPage);
    })
    .catch(() => {
      loadingEl.style.display = 'none';
      noPdfEl.style.display   = 'flex';
    });
}

if (subCode) {
  const pdfPath = `pdfs/${subCode}.pdf`;
  filenameEl.textContent = `${subCode}.pdf`;
  loadPDF(pdfPath);
} else {
  loadingEl.style.display = 'none';
  noPdfEl.style.display   = 'flex';
}

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage <= 1) return;
  currentPage--;
  renderPage(currentPage);
});

document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage >= totalPages) return;
  currentPage++;
  renderPage(currentPage);
});

document.getElementById('zoom-in').addEventListener('click', () => {
  if (scale >= 3.0) return;
  scale += 0.2;
  renderPage(currentPage);
});

document.getElementById('zoom-out').addEventListener('click', () => {
  if (scale <= 0.6) return;
  scale -= 0.2;
  renderPage(currentPage);
});

/* ── PROTECTION ── */

document.addEventListener('contextmenu', e => e.preventDefault());

document.addEventListener('keydown', e => {
  const blocked = [
    e.ctrlKey && e.key === 's',
    e.ctrlKey && e.key === 'p',
    e.ctrlKey && e.shiftKey && e.key === 'S',
    e.metaKey && e.key === 's',
    e.metaKey && e.key === 'p',
    e.key === 'PrintScreen',
    e.metaKey && e.shiftKey && e.key === '3',
    e.metaKey && e.shiftKey && e.key === '4',
  ];
  if (blocked.some(Boolean)) {
    e.preventDefault();
    showScreenshotToast();
  }
});

document.addEventListener('keyup', e => {
  if (e.key === 'PrintScreen') {
    navigator.clipboard.writeText('').catch(() => {});
    showScreenshotToast();
  }
});

function showScreenshotToast() {
  const toast = document.getElementById('screenshot-toast');
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 3000);
}

const canvasWrap  = document.getElementById('canvas-wrap');
const blurNotice  = document.getElementById('blur-notice');

window.addEventListener('blur', () => {
  canvasWrap.classList.add('is-blurred');
  blurNotice.classList.add('visible');
});

window.addEventListener('focus', () => {
  canvasWrap.classList.remove('is-blurred');
  blurNotice.classList.remove('visible');
});

document.getElementById('protection-overlay').addEventListener('contextmenu', e => e.preventDefault());
document.getElementById('protection-overlay').addEventListener('dragstart',   e => e.preventDefault());

canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('dragstart',   e => e.preventDefault());

/* ── Sidebar toggle ── */
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarToggle  = document.getElementById('sidebar-toggle');

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-open');
  });
}
if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-open');
  });
}
