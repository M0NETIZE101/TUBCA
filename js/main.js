/**
 * BCA Student Portal — Main JS
 * ============================================================
 * Handles:
 *  1. Responsive sidebar (open/close drawer on mobile)
 *  2. Upload modal (open/close)
 *  3. Sidebar nav active-link state
 *  4. Search bar focus animation
 *  5. Drag-and-drop zone visual feedback
 *  6. Upload progress bar animation (mock)
 *  7. File browse button
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. SIDEBAR TOGGLE (mobile drawer) ─────────────────── */
  const sidebar        = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarToggle  = document.getElementById('sidebar-toggle');

  function openSidebar() {
    sidebar.classList.add('is-open');
    sidebarOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
    });
  }

  // Tap overlay to close sidebar
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar when a nav link is clicked on mobile
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });


  /* ── 2. UPLOAD MODAL ────────────────────────────────────── */
  const modal         = document.getElementById('upload-modal');
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  const closeModalBtn = document.getElementById('modal-close');
  const cancelModalBtn= document.getElementById('modal-cancel');

  function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    // Start mock progress animation when modal opens
    startProgressAnimation();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeModalBtn)  closeModalBtn.addEventListener('click', closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

  // Click on overlay backdrop (not the card) to close
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });


  /* ── 3. SIDEBAR NAV ACTIVE STATE ────────────────────────── */
  // Clicking a semester link updates the active state visually
  document.querySelectorAll('aside .nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent navigation (demo behaviour)

      // Remove active from all
      document.querySelectorAll('aside .nav-link').forEach(l => {
        l.classList.remove('active');
      });

      // Set this one as active
      this.classList.add('active');
    });
  });


  /* ── 4. SEARCH BAR FOCUS ANIMATION ─────────────────────── */
  // The search-wrap expands via CSS :focus-within — no JS needed.
  // This adds an accessible label toggle for screen readers.
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchInput.setAttribute('aria-expanded', 'true');
    });
    searchInput.addEventListener('blur', () => {
      searchInput.removeAttribute('aria-expanded');
    });
  }


  /* ── 5. DRAG-AND-DROP ZONE VISUAL FEEDBACK ──────────────── */
  const dropZone = document.getElementById('drop-zone');

  if (dropZone) {
    // Highlight on drag enter
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      const files = e.dataTransfer.files;
      if (files.length) {
        // In a real app: handle file upload here
        console.log('Dropped files:', files);
        updateFileCard(files[0]);
      }
    });
  }


  /* ── 6. FILE BROWSE BUTTON ──────────────────────────────── */
  const browseBtn  = document.getElementById('browse-btn');
  const fileInput  = document.getElementById('file-input');

  if (browseBtn && fileInput) {
    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        updateFileCard(fileInput.files[0]);
      }
    });
  }

  /**
   * updateFileCard — Updates the upload progress card with
   * the selected file's name and size.
   * @param {File} file
   */
  function updateFileCard(file) {
    const nameEl = document.getElementById('upload-file-name');
    const sizeEl = document.getElementById('upload-file-size');
    if (nameEl) nameEl.textContent = file.name;
    if (sizeEl) sizeEl.textContent = formatFileSize(file.size) + ' • Uploading...';
    startProgressAnimation();
  }

  /** Formats bytes into a human-readable string (e.g. "12.4 MB") */
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }


  /* ── 7. MOCK UPLOAD PROGRESS ANIMATION ──────────────────── */
  /**
   * startProgressAnimation — Animates the progress bar from
   * 65% → 78% to simulate an ongoing upload (demo only).
   * In production, replace with real XHR/fetch upload progress.
   */
  function startProgressAnimation() {
    const bar     = document.getElementById('progress-bar');
    const sizeEl  = document.getElementById('upload-file-size');

    if (!bar) return;

    // Reset to initial state
    bar.style.width = '65%';

    setTimeout(() => {
      bar.style.width = '78%';
      if (sizeEl && sizeEl.textContent.includes('MB')) {
        sizeEl.textContent = sizeEl.textContent.replace(/\d+%.*/, '78% completed');
      } else if (sizeEl) {
        sizeEl.textContent = '12.4 MB • 78% completed';
      }
    }, 1500);
  }

  // Kick off progress on page load (modal is pre-opened in upload.html)
  startProgressAnimation();


  /* ── FINISH UPLOAD BUTTON ───────────────────────────────── */
  const finishBtn = document.getElementById('finish-upload');
  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      const bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = '100%';
      // Simulate completion feedback then close
      setTimeout(() => closeModal(), 800);
    });
  }

});
