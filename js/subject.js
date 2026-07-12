/* BCA PORTAL — subject.js (CLEAN VERSION) */

// ─── Check if FILES exists ───
if (typeof FILES === 'undefined') {
  console.error('FILES is not defined - make sure files.js is loaded');
  window.FILES = {};
}

// ─── SYLLABUS DATA ───
var SYLLABUS = {
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
  for (var sem in SYLLABUS) {
    var subjects = SYLLABUS[sem].subjects;
    for (var i = 0; i < subjects.length; i++) {
      if (subjects[i].code === code) {
        return subjects[i];
      }
    }
  }
  return null;
}

// ─── Get subject from URL ───
var params = new URLSearchParams(location.search);
var subCode = params.get('code');
var subject = findSubject(subCode);

if (subject) {
  document.title = subject.title + ' — BCA Portal';
  document.getElementById('subject-title').textContent = subject.title;
  document.getElementById('subject-code-badge').textContent = subject.code;
  document.getElementById('subject-type-badge').textContent = subject.type;
  document.getElementById('subject-credits').textContent = subject.credits + ' Credit' + (subject.credits !== 1 ? 's' : '') + ' · ' + subject.type;
} else {
  document.title = 'Subject Not Found — BCA Portal';
  document.getElementById('subject-title').textContent = 'Subject Not Found';
}

// ─── Tab configuration ───
var TAB_ICONS = {
  notes: 'menu_book',
  'question-papers': 'assignment',
  'lab-reports': 'science',
  assignments: 'edit_note'
};

var LABEL_MAP = {
  notes: 'notes',
  'question-papers': 'question papers',
  'lab-reports': 'lab reports',
  assignments: 'assignments'
};

// ─── Get files for this subject ───
var subjectFiles = (subCode && FILES && FILES[subCode]) || {
  notes: [],
  'question-papers': [],
  'lab-reports': [],
  assignments: []
};

// ─── Render file list ───
function renderFileList(tabKey) {
  var files = subjectFiles[tabKey] || [];
  var listEl = document.getElementById('list-' + tabKey);

  if (!listEl) {
    return;
  }

  var countEl = document.getElementById('count-' + tabKey);
  if (countEl) {
    countEl.textContent = files.length;
  }

  if (files.length === 0) {
    listEl.innerHTML = '<div class="empty-tab">' +
      '<span class="material-symbols-outlined">' + (TAB_ICONS[tabKey] || 'description') + '</span>' +
      '<h3>No files yet</h3>' +
      '<p>No ' + (LABEL_MAP[tabKey] || tabKey) + ' uploaded for this subject yet.</p>' +
      '</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    html += '<div class="file-item" data-tab="' + tabKey + '" data-index="' + i + '" tabindex="0" role="button">' +
      '<div class="file-icon"><span class="material-symbols-outlined">picture_as_pdf</span></div>' +
      '<div class="file-info">' +
      '<div class="file-title">' + f.title + '</div>' +
      '<div class="file-date">Uploaded: ' + f.date + '</div>' +
      '</div>' +
      '<span class="material-symbols-outlined file-arrow">arrow_forward</span>' +
      '</div>';
  }
  listEl.innerHTML = html;

  var items = listEl.querySelectorAll('.file-item');
  for (var j = 0; j < items.length; j++) {
    (function(item) {
      item.addEventListener('click', function() {
        openFile(item.dataset.tab, parseInt(item.dataset.index));
      });
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          openFile(item.dataset.tab, parseInt(item.dataset.index));
        }
      });
    })(items[j]);
  }
}

// ─── Render all tabs ───
var tabKeys = ['notes', 'question-papers', 'lab-reports', 'assignments'];
for (var t = 0; t < tabKeys.length; t++) {
  renderFileList(tabKeys[t]);
}

// ─── Tab switching ───
var tabBtns = document.querySelectorAll('.tab-btn');
for (var b = 0; b < tabBtns.length; b++) {
  (function(btn) {
    btn.addEventListener('click', function() {
      var allBtns = document.querySelectorAll('.tab-btn');
      for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove('active');
      }
      var allPanels = document.querySelectorAll('.tab-panel');
      for (var j = 0; j < allPanels.length; j++) {
        allPanels[j].classList.remove('active');
      }
      btn.classList.add('active');
      var panel = document.getElementById('panel-' + btn.dataset.tab);
      if (panel) {
        panel.classList.add('active');
      }
      var viewer = document.getElementById('viewer-section');
      if (viewer) {
        viewer.classList.remove('visible');
      }
    });
  })(tabBtns[b]);
}

// ─── Open file ───
function openFile(tabKey, index) {
  var file = (subjectFiles[tabKey] || [])[index];
  if (!file) {
    return;
  }

  var allItems = document.querySelectorAll('.file-item');
  for (var i = 0; i < allItems.length; i++) {
    allItems[i].classList.remove('active-file');
  }

  var selectedItems = document.querySelectorAll('[data-tab="' + tabKey + '"][data-index="' + index + '"]');
  for (var j = 0; j < selectedItems.length; j++) {
    selectedItems[j].classList.add('active-file');
  }

  var titleEl = document.getElementById('viewer-file-title');
  if (titleEl) {
    titleEl.textContent = file.title;
  }

  var viewerSection = document.getElementById('viewer-section');
  if (viewerSection) {
    viewerSection.classList.add('visible');
    viewerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  var downloadBtn = document.getElementById('download-btn');
  if (downloadBtn) {
    downloadBtn.href = file.file;
  }

  setTimeout(function() {
    loadPDF(file.file);
  }, 80);
}

// ─── PDF.js ───
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

var pdfDoc = null;
var totalPages = 1;
var zoomScale = 'auto';
var pageCanvases = [];

var pagesContainer = document.getElementById('pdf-pages-container');
var scrollWrap = document.getElementById('canvas-wrap');
var pageInfo = document.getElementById('page-info');
var loadingEl = document.getElementById('pdf-loading');
var noPdfEl = document.getElementById('no-pdf-state');
var singleCanvas = document.getElementById('pdf-canvas');
var downloadBtn = document.getElementById('download-btn');

function containerWidth() {
  if (!scrollWrap) {
    return window.innerWidth * 0.88;
  }
  var cs = getComputedStyle(scrollWrap);
  var pad = parseFloat(cs.paddingLeft || 0) + parseFloat(cs.paddingRight || 0);
  var w = scrollWrap.clientWidth - pad - 24;
  return Math.max(w > 10 ? w : window.innerWidth * 0.88, 40);
}

function calcScale(pageViewport) {
  if (zoomScale !== 'auto') {
    return zoomScale;
  }
  var cw = containerWidth();
  var dpr = Math.min(window.devicePixelRatio || 1, 3);
  var fit = cw / pageViewport.width;
  return Math.min(fit * dpr, 3.0 * dpr);
}

function renderOnePage(pageNum) {
  if (!pdfDoc) {
    return Promise.resolve();
  }
  return pdfDoc.getPage(pageNum).then(function(page) {
    var baseVp = page.getViewport({ scale: 1 });
    var sc = calcScale(baseVp);
    var vp = page.getViewport({ scale: sc });
    var canvas = pageCanvases[pageNum - 1];
    if (!canvas) {
      return;
    }
    canvas.width = vp.width;
    canvas.height = vp.height;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    return page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
  });
}

function renderAllPages() {
  if (!pdfDoc) {
    return;
  }
  var oldWraps = pagesContainer.querySelectorAll('.pdf-page-wrap');
  for (var i = 0; i < oldWraps.length; i++) {
    oldWraps[i].remove();
  }
  pageCanvases = [];

  for (var p = 1; p <= totalPages; p++) {
    var wrap = document.createElement('div');
    wrap.className = 'pdf-page-wrap';
    wrap.dataset.page = p;

    var lbl = document.createElement('div');
    lbl.className = 'pdf-page-label';
    lbl.textContent = 'Page ' + p + ' of ' + totalPages;

    var canvas = document.createElement('canvas');
    canvas.className = 'pdf-page-canvas';

    wrap.appendChild(lbl);
    wrap.appendChild(canvas);
    pagesContainer.appendChild(wrap);
    pageCanvases.push(canvas);
  }

  var eager = Math.min(3, totalPages);
  var queue = [];
  for (var q = 1; q <= eager; q++) {
    queue.push(renderOnePage(q));
  }
  Promise.all(queue).then(function() {
    for (var r = eager + 1; r <= totalPages; r++) {
      renderOnePage(r);
    }
  });
}

function loadPDF(url) {
  pdfDoc = null;
  pageCanvases = [];
  var oldWraps = pagesContainer.querySelectorAll('.pdf-page-wrap');
  for (var i = 0; i < oldWraps.length; i++) {
    oldWraps[i].remove();
  }
  singleCanvas.style.display = 'none';
  loadingEl.style.display = 'flex';
  noPdfEl.style.display = 'none';

  if (downloadBtn) {
    downloadBtn.href = url;
  }

  pdfjsLib.getDocument(url).promise.then(function(pdf) {
    pdfDoc = pdf;
    totalPages = pdf.numPages;
    zoomScale = 'auto';
    loadingEl.style.display = 'none';
    pageInfo.textContent = 'Page 1 of ' + totalPages;
    var ji = document.getElementById('page-jump-input');
    if (ji) {
      ji.max = totalPages;
      ji.value = 1;
    }
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        renderAllPages();
      });
    });
  }).catch(function() {
    loadingEl.style.display = 'none';
    noPdfEl.style.display = 'flex';
  });
}

// ─── Scroll listener ───
if (scrollWrap) {
  scrollWrap.addEventListener('scroll', function() {
    if (!pdfDoc) {
      return;
    }
    var mid = scrollWrap.scrollTop + scrollWrap.clientHeight * 0.4;
    var cur = 1;
    var wraps = pagesContainer.querySelectorAll('.pdf-page-wrap');
    for (var i = 0; i < wraps.length; i++) {
      if (wraps[i].offsetTop <= mid) {
        cur = parseInt(wraps[i].dataset.page);
      }
    }
    pageInfo.textContent = 'Page ' + cur + ' of ' + totalPages;
    var ji = document.getElementById('page-jump-input');
    if (ji) {
      ji.value = cur;
    }
  });
}

// ─── Scroll to page ───
function scrollToPage(num) {
  if (!pdfDoc || num < 1 || num > totalPages) {
    return;
  }
  var wrap = pagesContainer.querySelector('[data-page="' + num + '"]');
  if (wrap && scrollWrap) {
    scrollWrap.scrollTo({ top: wrap.offsetTop - 8, behavior: 'smooth' });
  }
}

// ─── Previous / Next buttons ───
var prevBtn = document.getElementById('prev-page');
var nextBtn = document.getElementById('next-page');

if (prevBtn) {
  prevBtn.addEventListener('click', function() {
    var ji = document.getElementById('page-jump-input');
    var cur = parseInt(ji ? ji.value : 1) || 1;
    if (cur > 1) {
      scrollToPage(cur - 1);
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', function() {
    var ji = document.getElementById('page-jump-input');
    var cur = parseInt(ji ? ji.value : 1) || 1;
    if (cur < totalPages) {
      scrollToPage(cur + 1);
    }
  });
}

// ─── Page jump input ───
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

// ─── Zoom buttons ───
var zoomInBtn = document.getElementById('zoom-in');
var zoomOutBtn = document.getElementById('zoom-out');

if (zoomInBtn) {
  zoomInBtn.addEventListener('click', function() {
    if (!pdfDoc) {
      return;
    }
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
    if (!pdfDoc) {
      return;
    }
    pdfDoc.getPage(1).then(function(p) {
      var b = p.getViewport({ scale: 1 });
      var c = zoomScale === 'auto' ? calcScale(b) : zoomScale;
      zoomScale = Math.max(+(c - 0.25).toFixed(2), 0.4);
      renderAllPages();
    });
  });
}

// ─── Resize handler ───
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

// ─── Sidebar ───
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