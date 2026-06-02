const SYLLABUS = {
  1: { subjects: [
    { code:"BCA-101", title:"Computer Fundamentals and Applications", credits:3, type:"Notes" },
    { code:"BCA-102", title:"Programming in C",                       credits:3, type:"Notes" },
    { code:"BCA-103", title:"Digital Logic",                          credits:3, type:"Notes" },
    { code:"BCA-104", title:"Mathematics-I",                          credits:3, type:"Exam Paper" },
    { code:"BCA-105", title:"Professional Communication and Ethics",  credits:3, type:"Notes" },
    { code:"BCA-106", title:"Hardware Workshop",                      credits:1, type:"Lab Manual" },
  ]},
  2: { subjects: [
    { code:"BCA-151", title:"Discrete Structure",                      credits:3, type:"Notes" },
    { code:"BCA-152", title:"Microprocessor and Computer Architecture",credits:3, type:"Notes" },
    { code:"BCA-153", title:"OOP in Java",                             credits:3, type:"Notes" },
    { code:"BCA-154", title:"Mathematics-II",                          credits:3, type:"Exam Paper" },
    { code:"BCA-155", title:"UX/UI Design",                            credits:3, type:"Notes" },
    { code:"BCA-156", title:"Principles of Management",                credits:1, type:"Notes" },
  ]},
  3: { subjects: [
    { code:"BCA-201", title:"Data Structure and Algorithms", credits:3, type:"Notes" },
    { code:"BCA-202", title:"Database Management System",   credits:3, type:"Notes" },
    { code:"BCA-203", title:"Web Technology-I",             credits:3, type:"Notes" },
    { code:"BCA-204", title:"System Analysis and Design",   credits:3, type:"Notes" },
    { code:"BCA-205", title:"Probability and Statistics",   credits:3, type:"Exam Paper" },
    { code:"BCA-206", title:"Applied Economics",            credits:2, type:"Notes" },
  ]},
  4: { subjects: [
    { code:"BCA-251", title:"Operating Systems",    credits:3, type:"Notes" },
    { code:"BCA-252", title:"Software Engineering", credits:3, type:"Notes" },
    { code:"BCA-253", title:"Numerical Methods",    credits:3, type:"Exam Paper" },
    { code:"BCA-254", title:"Python Programming",   credits:3, type:"Notes" },
    { code:"BCA-255", title:"Web Technology-II",    credits:3, type:"Notes" },
    { code:"BCA-256", title:"Project-I",            credits:2, type:"Lab Manual" },
  ]},
  5: { subjects: [
    { code:"BCA-301", title:"Computer Network",         credits:3, type:"Notes" },
    { code:"BCA-302", title:"Artificial Intelligence",  credits:3, type:"Notes" },
    { code:"BCA-303", title:"Advance Java Programming", credits:3, type:"Notes" },
    { code:"BCA-304", title:"MIS and e-Business",       credits:3, type:"Notes" },
    { code:"BCA-305", title:"Society and Technology",   credits:3, type:"Notes" },
    { code:"BCA-306", title:"Project-II",               credits:3, type:"Lab Manual" },
  ]},
  6: { subjects: [] }
};

function findSubject(code) {
  for (const sem of Object.values(SYLLABUS)) {
    const s = sem.subjects.find(s => s.code === code);
    if (s) return s;
  }
  return null;
}

const params  = new URLSearchParams(location.search);
const subCode = params.get('code');
const subject = findSubject(subCode);

if (subject) {
  document.title = subject.title + ' — BCA Portal';
  document.getElementById('subject-title').textContent      = subject.title;
  document.getElementById('subject-code-badge').textContent = subject.code;
  document.getElementById('subject-type-badge').textContent = subject.type;
  document.getElementById('subject-credits').textContent    =
    subject.credits + ' Credit' + (subject.credits !== 1 ? 's' : '') + ' · ' + subject.type;
} else {
  document.title = 'Subject Not Found — BCA Portal';
  document.getElementById('subject-title').textContent = 'Subject Not Found';
}

const TAB_ICONS = {
  notes:         'menu_book',
  questionPapers:'assignment',
  labReports:    'science',
};

const subjectFiles = (FILES && subCode && FILES[subCode]) || { notes:[], questionPapers:[], labReports:[] };

function renderFileList(tabKey) {
  const files   = subjectFiles[tabKey] || [];
  const listEl  = document.getElementById('list-' + tabKey);
  const countEl = document.getElementById('count-' + tabKey);
  if (countEl) countEl.textContent = files.length;

  if (!files.length) {
    listEl.innerHTML = `
      <div class="empty-tab">
        <span class="material-symbols-outlined">${TAB_ICONS[tabKey]}</span>
        <h3>No files yet</h3>
        <p>No ${tabKey === 'questionPapers' ? 'question papers' : tabKey === 'labReports' ? 'lab reports' : 'notes'} uploaded for this subject yet.</p>
      </div>`;
    return;
  }

  listEl.innerHTML = files.map((f, i) => `
    <div class="file-item" data-tab="${tabKey}" data-index="${i}" tabindex="0" role="button" aria-label="Open ${f.title}">
      <div class="file-icon">
        <span class="material-symbols-outlined">picture_as_pdf</span>
      </div>
      <div class="file-info">
        <div class="file-title">${f.title}</div>
        <div class="file-date">Uploaded: ${f.date}</div>
      </div>
      <span class="material-symbols-outlined file-arrow">arrow_forward</span>
    </div>`).join('');

  listEl.querySelectorAll('.file-item').forEach(item => {
    item.addEventListener('click',   () => openFile(item.dataset.tab, parseInt(item.dataset.index)));
    item.addEventListener('keydown', e => { if (e.key === 'Enter') openFile(item.dataset.tab, parseInt(item.dataset.index)); });
  });
}

['notes','questionPapers','labReports'].forEach(renderFileList);

/* ── Tab switching ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    document.getElementById('viewer-section').classList.remove('visible');
  });
});

/* ── Open file ── */
function openFile(tabKey, index) {
  const files = subjectFiles[tabKey] || [];
  const file  = files[index];
  if (!file) return;

  document.querySelectorAll('.file-item').forEach(i => i.classList.remove('active-file'));
  const items = document.querySelectorAll(`[data-tab="${tabKey}"][data-index="${index}"]`);
  items.forEach(i => i.classList.add('active-file'));

  document.getElementById('viewer-file-title').textContent = file.title;
  document.getElementById('viewer-section').classList.add('visible');
  document.getElementById('viewer-section').scrollIntoView({ behavior: 'smooth', block: 'start' });

  loadPDF(file.file);
}

/* ── PDF.js ── */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc      = null;
let currentPage = 1;
let totalPages  = 1;
let scale       = 1.4;
let isRendering = false;

const canvas     = document.getElementById('pdf-canvas');
const ctx        = canvas.getContext('2d');
const pageInfo   = document.getElementById('page-info');
const loadingEl  = document.getElementById('pdf-loading');
const noPdfEl    = document.getElementById('no-pdf-state');

function renderPage(num) {
  if (isRendering || !pdfDoc) return;
  isRendering = true;
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale });
    canvas.height  = viewport.height;
    canvas.width   = viewport.width;
    page.render({ canvasContext: ctx, viewport }).promise.then(() => {
      isRendering = false;
      pageInfo.textContent = 'Page ' + currentPage + ' of ' + totalPages;
    });
  });
}

function loadPDF(url) {
  pdfDoc = null;
  loadingEl.style.display = 'flex';
  canvas.style.display    = 'none';
  noPdfEl.style.display   = 'none';

  pdfjsLib.getDocument(url).promise
    .then(pdf => {
      pdfDoc      = pdf;
      totalPages  = pdf.numPages;
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

document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage <= 1) return;
  currentPage--; renderPage(currentPage);
});
document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage >= totalPages) return;
  currentPage++; renderPage(currentPage);
});
document.getElementById('zoom-in').addEventListener('click', () => {
  if (scale >= 3.0) return; scale += 0.2; renderPage(currentPage);
});
document.getElementById('zoom-out').addEventListener('click', () => {
  if (scale <= 0.6) return; scale -= 0.2; renderPage(currentPage);
});

/* ── Protection ── */
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  const blocked = [
    e.ctrlKey && e.key === 's', e.ctrlKey && e.key === 'p',
    e.ctrlKey && e.shiftKey && e.key === 'S',
    e.metaKey && e.key === 's', e.metaKey && e.key === 'p',
    e.key === 'PrintScreen',
    e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4'),
  ];
  if (blocked.some(Boolean)) { e.preventDefault(); showToast(); }
});
document.addEventListener('keyup', e => {
  if (e.key === 'PrintScreen') { navigator.clipboard.writeText('').catch(()=>{}); showToast(); }
});

function showToast() {
  const t = document.getElementById('screenshot-toast');
  t.classList.add('visible');
  setTimeout(() => t.classList.remove('visible'), 3000);
}

const canvasWrap = document.getElementById('canvas-wrap');
const blurNotice = document.getElementById('blur-notice');
window.addEventListener('blur',  () => { canvasWrap.classList.add('is-blurred');    blurNotice.classList.add('visible'); });
window.addEventListener('focus', () => { canvasWrap.classList.remove('is-blurred'); blurNotice.classList.remove('visible'); });
document.getElementById('protection-overlay').addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('dragstart',   e => e.preventDefault());

/* ── Sidebar ── */
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarToggle  = document.getElementById('sidebar-toggle');
if (sidebarToggle) sidebarToggle.addEventListener('click', () => { sidebar.classList.toggle('is-open'); sidebarOverlay.classList.toggle('is-open'); });
if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => { sidebar.classList.remove('is-open'); sidebarOverlay.classList.remove('is-open'); });
