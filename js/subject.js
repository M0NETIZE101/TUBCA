/* BCA PORTAL — subject.js (CLEAN VERSION - No Security Features) */

// ─── Check if FILES exists before using it ───
if (typeof FILES === 'undefined') {
  console.error('FILES is not defined - make sure files.js is loaded');
  window.FILES = {};
}

const SYLLABUS = {
  1: {
    subjects: [
      { code: "BCA-101", title: "Computer Fundamentals and Applications", credits: 3, type: "Notes" },
      { code: "BCA-102", title: "Programming in C", credits: 3, type: "Notes" },
      { code: "BCA-103", title: "Digital Logic", credits: 3, type: "Notes" },
      { code: "BCA-104", title: "Mathematics-I", credits: 3, type: "Exam Paper" },
      { code: "BCA-105", title: "Professional Communication and Ethics", credits: 3, type: "Notes" },
      { code: "BCA-106", title: "Hardware Workshop", credits: 1, type: "Lab Manual" }
    ]
  },
  2: {
    subjects: [
      { code: "BCA-151", title: "Discrete Structure", credits: 3, type: "Notes" },
      { code: "BCA-152", title: "Microprocessor and Computer Architecture", credits: 3, type: "Notes" },
      { code: "BCA-153", title: "OOP in Java", credits: 3, type: "Notes" },
      { code: "BCA-154", title: "Mathematics-II", credits: 3, type: "Exam Paper" },
      { code: "BCA-155", title: "UX/UI Design", credits: 3, type: "Notes" },
      { code: "BCA-156", title: "Principles of Management", credits: 1, type: "Notes" }
    ]
  },
  3: {
    subjects: [
      { code: "BCA-201", title: "Data Structure and Algorithms", credits: 3, type: "Notes" },
      { code: "BCA-202", title: "Database Management System", credits: 3, type: "Notes" },
      { code: "BCA-203", title: "Web Technology-I", credits: 3, type: "Notes" },
      { code: "BCA-204", title: "System Analysis and Design", credits: 3, type: "Notes" },
      { code: "BCA-205", title: "Probability and Statistics", credits: 3, type: "Exam Paper" },
      { code: "BCA-206", title: "Applied Economics", credits: 2, type: "Notes" }
    ]
  },
  4: {
    subjects: [
      { code: "BCA-251", title: "Operating Systems", credits: 3, type: "Notes" },
      { code: "BCA-252", title: "Software Engineering", credits: 3, type: "Notes" },
      { code: "BCA-253", title: "Numerical Methods", credits: 3, type: "Exam Paper" },
      { code: "BCA-254", title: "Python Programming", credits: 3, type: "Notes" },
      { code: "BCA-255", title: "Web Technology-II", credits: 3, type: "Notes" },
      { code: "BCA-256", title: "Project-I", credits: 2, type: "Lab Manual" }
    ]
  },
  5: {
    subjects: [
      { code: "BCA-301", title: "Computer Network", credits: 3, type: "Notes" },
      { code: "BCA-302", title: "Artificial Intelligence", credits: 3, type: "Notes" },
      { code: "BCA-303", title: "Advance Java Programming", credits: 3, type: "Notes" },
      { code: "BCA-304", title: "MIS and e-Business", credits: 3, type: "Notes" },
      { code: "BCA-305", title: "Society and Technology", credits: 3, type: "Notes" },
      { code: "BCA-306", title: "Project-II", credits: 3, type: "Lab Manual" }
    ]
  },
  6: {
    subjects: []
  }
};

function findSubject(code) {
  for (const sem of Object.values(SYLLABUS)) {
    const s = sem.subjects.find(s => s.code === code);
    if (s) return s;
  }
  return null;
}

const params = new URLSearchParams(location.search);
const subCode = params.get('code');
const subject = findSubject(subCode);

if (subject) {
  document.title = subject.title + ' — BCA Portal';
  document.getElementById('subject-title').textContent = subject.title;
  document.getElementById('subject-code-badge').textContent = subject.code;
  document.getElementById('subject-type-badge').textContent = subject.type;
  document.getElementById('subject-credits').textContent =
    subject.credits + ' Credit' + (subject.credits !== 1 ? 's' : '') + ' · ' + subject.type;
} else {
  document.title = 'Subject Not Found — BCA Portal';
  document.getElementById('subject-title').textContent = 'Subject Not Found';
}

// ─── Using hyphenated names to match files.js ───
const TAB_ICONS = {
  notes: 'menu_book',
  'question-papers': 'assignment',
  'lab-reports': 'science',
  assignments: 'edit_note'
};

const LABEL_MAP = {
  notes: 'notes',
  'question-papers': 'question papers',
  'lab-reports': 'lab reports',
  assignments: 'assignments'
};

// ─── Using hyphenated names ───
const subjectFiles = (subCode && FILES && FILES[subCode]) || {
  notes: [],
  'question-papers': [],
  'lab-reports': [],
  assignments: []
};

// ─── renderFileList with null check ───
function renderFileList(tabKey) {
  const files = subjectFiles[tabKey] || [];
  const listEl = document.getElementById('list-' + tabKey);

  if (!listEl) {
    console.warn('Element not found: list-' + tabKey);
    return;
  }

  const countEl = document.getElementById('count-' + tabKey);
  if (countEl) countEl.textContent = files.length;

  if (!files.length) {
    listEl.innerHTML = '<div class="empty-tab">' +
      '<span class="material-symbols-outlined">' + (TAB_ICONS[tabKey] || 'description') + '</span>' +
      '<h3>No files yet</h3>' +
      '<p>No ' + (LABEL_MAP[tabKey] || tabKey) + ' uploaded for this subject yet.</p>' +
      '</div>';
    return;
  }

  listEl.innerHTML = files.map(function(f, i) {
    return '<div class="file-item" data-tab="' + tabKey + '" data-index="' + i + '" tabindex="0" role="button">' +
      '<div class="file-icon"><span class="material-symbols-outlined">picture_as_pdf</span></div>' +
      '<div class="file-info">' +
      '<div class="file-title">' + f.title + '</div>' +
      '<div class="file-date">Uploaded: ' + f.date + '</div>' +
      '</div>' +
      '<span class="material-symbols-outlined file-arrow">arrow_forward</span>' +
      '</div>';
  }).join('');

  listEl.querySelectorAll('.file-item').forEach(function(item) {
    item.addEventListener('click', function() {
      openFile(item.dataset.tab, +item.dataset.index);
    });
    item.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') openFile(item.dataset.tab, +item.dataset.index);
    });
  });
}

// ─── Using hyphenated names ───
['notes', 'question-papers', 'lab-reports', 'assignments'].forEach(renderFileList);

document.querySelectorAll('.tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(function(b) {
      b.classList.remove('active');
    });
    document.querySelectorAll('.tab-panel').forEach(function(p) {
      p.classList.remove('active');
    });
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    document.getElementById('viewer-section').classList.remove('visible');
  });
});

function openFile(tabKey, index) {
  const file = (subjectFiles[tabKey] || [])[index];
  if (!file) return;
  document.querySelectorAll('.file-item').forEach(function(i) {
    i.classList.remove('active-file');
  });
  document.querySelectorAll('[data-tab="' + tabKey + '"][data-index="' + index + '"]').forEach(function(i) {
    i.classList.add('active-file');
  });
  document.getElementById('viewer-file-title').textContent = file.title;

  const viewerSection = document.getElementById('viewer-section');
  if (viewerSection) {
    viewerSection.classList.add('visible');
    viewerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.href = file.file;
  }

  setTimeout(function() {
    loadPDF(file.file);
  }, 80);
}

/* ── PDF.js continuous scroll viewer ── */
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let pdfDoc = null;
let totalPages = 1;
let zoomScale = 'auto';
let pageCanvases = [];

const pagesContainer = document.getElementById('pdf-pages-container');
const scrollWrap = document.getElementById('canvas-wrap');
const pageInfo = document.getElementById('page-info');
const loadingEl = document.getElementById('pdf-loading');
const noPdfEl = document.getElementById('no-pdf-state');
const singleCanvas = document.getElementById('pdf-canvas');
const downloadBtn = document.getElementById('download-btn');

function containerWidth() {
  if (!scrollWrap) return window.innerWidth * 0.88;
  var cs = getComputedStyle(scrollWrap);
  var pad = parseFloat(cs.paddingLeft || 0) + parseFloat(cs.paddingRight || 0);
  var w = scrollWrap.clientWidth - pad - 24;
  return Math.max(w > 10 ? w : window.innerWidth * 0.88, 40);
}

function calcScale(pageViewport) {
  if (zoomScale !== 'auto') return zoomScale;
  var cw = containerWidth();
  var dpr = Math.min(window.devicePixelRatio || 1, 3);
  var fit = cw / pageViewport.width;
  return Math.min(fit * dpr, 3.0 * dpr);
}

function renderOnePage(pageNum) {
  if (!pdfDoc) return Promise.resolve();
  return pdfDoc.getPage(pageNum).then(function(page) {
    var baseVp = page.getViewport({ scale: 1 });
    var sc = calcScale(baseVp);
    var vp = page.getViewport({ scale: sc });
    var canvas = pageCanvases[pageNum - 1];
    if (!canvas) return;
    canvas.width = vp.width;
    canvas.height = vp.height;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    return page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
  });
}

function renderAllPages() {
  if (!pdfDoc) return;
  var oldWraps = pagesContainer.querySelectorAll('.pdf-page-wrap');
  oldWraps.forEach(function(w) { w.remove(); });
  pageCanvases = [];

  for (var i = 1; i <= totalPages; i++) {
    var wrap = document.createElement('div');
    wrap.className = 'pdf-page-wrap';
    wrap.dataset.page = i;

    var lbl = document.createElement('div');
    lbl.className = 'pdf-page-label';
    lbl.textContent = 'Page ' + i + ' of ' + totalPages;

    var canvas = document.createElement('canvas');
    canvas.className = 'pdf-page-canvas';

    wrap.appendChild(lbl);
    wrap.appendChild(canvas);
    pagesContainer.appendChild(wrap);
    pageCanvases.push(canvas);
  }

  var eager = Math.min(3, totalPages);
  var queue = [];
  for (var j = 1; j <= eager; j++) {
    queue.push(renderOnePage(j));
  }
  Promise.all(queue).then(function() {
    for (var k = eager + 1; k <= totalPages; k++) {
      renderOnePage(k);
    }
  });
}

function loadPDF(url) {
  pdfDoc = null;
  pageCanvases = [];
  var oldWraps = pagesContainer.querySelectorAll('.pdf-page-wrap');
  oldWraps.forEach(function(w) { w.remove(); });
  singleCanvas.style.display = 'none';
  loadingEl.style.display = 'flex';
  noPdfEl.style.display = 'none';

  if (downloadBtn) {
    downloadBtn.href = url;
  }

  pdfjsLib.getDocument(url).promise
    .then(function(pdf) {
      pdfDoc = pdf;
      totalPages = pdf.numPages;
      zoomScale = 'auto';
      loadingEl.style.display = 'none';
      pageInfo.textContent = 'Page 1 of ' + totalPages;
      var ji = document.getElementById('page-jump-input');
      if (ji) { ji.max = totalPages;
        ji.value = 1; }

      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          renderAllPages();
        });
      });
    })
    .catch(function() {
      loadingEl.style.display = 'none';
      noPdfEl.style.display = 'flex';
    });
}

if (scrollWrap) {
  scrollWrap.addEventListener('scroll', function() {
    if (!pdfDoc) return;
    var mid = scrollWrap.scrollTop + scrollWrap.clientHeight * 0.4;
    var cur = 1;
    pagesContainer.querySelectorAll('.pdf-page-wrap').forEach(function(wrap) {
      if (wrap.offsetTop <= mid) cur = parseInt(wrap.dataset.page);
    });
    pageInfo.textContent = 'Page ' + cur + ' of ' + totalPages;
    var ji = document.getElementById('page-jump-input');
    if (ji) ji.value = cur;
  });
}

function scrollToPage(num) {
  if (!pdfDoc || num < 1 || num > totalPages) return;
  var wrap = pagesContainer.querySelector('[data-page="' + num + '"]');
  if (wrap && scrollWrap) {
    scrollWrap.scrollTo({ top: wrap.offsetTop - 8, behavior: 'smooth' });
  }
}

var prevBtn = document.getElementById('prev-page');
var nextBtn = document.getElementById('next-page');

if (prevBtn) {
  prevBtn.addEventListener('click', function() {
    var ji = document.getElementById('page-jump-input');
    var cur = parseInt(ji ? ji.value : 1) || 1;
    if (cur > 1) scrollToPage(cur - 1);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', function() {
    var ji = document.getElementById('page-jump-input');
    var cur = parseInt(ji ? ji.value : 1) || 1;
    if (cur < totalPages) scrollToPage(cur + 1);
  });
}

var pageJumpInput = document.getElementById('page-jump-input');

function jumpToPage() {
  var val = parseInt(pageJumpInput.value);
  if (!isNaN(val) && val >= 1 && val <= totalPages) {
    scrollToPage(val);
  } else {
    pageJumpInput.value = parseInt(pageInfo.textContent) || 1;
  }
}

if (pageJumpInput) {
  pageJumpInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      jumpToPage();
    }
  });
  pageJumpInput.addEventListener('blur', jumpToPage);
}

var zoomInBtn = document.getElementById('zoom-in');
var zoomOutBtn = document.getElementById('zoom-out');

if (zoomInBtn) {
  zoomInBtn.addEventListener('click', function() {
    if (!pdfDoc) return;
    pdfDoc.getPage(1).then(function(p) {
      var b = p.getViewport({ scale: 1 });
      var c = zoomScale === 'auto' ? calcScale(b) : zoomScale;
      zoomScale = Math.min(+(c + 0.25).toFixed(2), 3.0);
      renderAllPages();
    });
  });
}

if (zoomOutBtn) {
  zoomOutBtn.addEventListener('click', function() {
    if (!pdfDoc) return;
    pdfDoc.getPage(1).then(function(p) {
      var b = p.getViewport({ scale: 1 });
      var c = zoomScale === 'auto' ? calcScale(b) : zoomScale;
      zoomScale = Math.max(+(c - 0.25).toFixed(2), 0.4);
      renderAllPages();
    });
  });
}

var resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    if (pdfDoc) {
      zoomScale = 'auto';
      renderAllPages();
    }
  }, 300);
});

/* ── Sidebar ── */
var sidebar = document.getElementById('sidebar');
var sidebarOverlay = document.getElementById('sidebar-overlay');
var sidebarToggle = document.getElementById('sidebar-toggle');

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('is-open');
    sidebarOverlay.classList.toggle('is-open');
  });
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', function() {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-open');
  });
}