/**
 * BCA Student Portal — Main JS
 * ============================================================
 * 1.  Syllabus data — all 5 semesters with subjects
 * 2.  Card renderer — builds subject cards from data
 * 3.  Semester filter — sidebar clicks filter the grid
 * 4.  Sidebar toggle (mobile drawer)
 * 5.  Upload modal (open / close)
 * 6.  Search — filters visible cards by subject name / code
 * 7.  Sort — Latest First / Oldest First toggle
 * 8.  Drag-and-drop upload zone
 * 9.  Progress bar animation (mock)
 * ============================================================
 */

/* ============================================================
   1. SYLLABUS DATA
   Each subject has: code, title, credits, type, semester.
   "type" drives the card badge colour.
   "thumb" is an optional image URL; if absent a gradient
   placeholder is shown instead.
   ============================================================ */
const SYLLABUS = {
  1: {
    label: "Year 1 — Semester I",
    subjects: [
      { code: "BCA-101", title: "Computer Fundamentals and Applications", credits: 3, type: "Notes",    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD-n9z_oHv4D0OqwzxREkzDxtTB6_F-u1N4UvrkNMturrWMBMq9OmkvypRfzMK5d0lHz1XY-c4vCIaxCBqA6QjVJlgnHki43PGDlsFFtjch3a46Q_GOvAq0oL6Aidg6-04XqXtQfkcZ5bZeVczsBHSBp4duZzoyNCT5aRL4aiZv-PAT5_AlxafLSPh6wG9aMx-qIpgRXHTQWxceDNGopMW2FizGOqzLxODO3A9PbO88NXrhHYm7xt8VEVT57wLEKZC7ZfqeLEPT00", date: "Oct 12, 2023" },
      { code: "BCA-102", title: "Programming in C",                        credits: 3, type: "Notes",    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlel6gz8Q369d1TIh1NHLZRRO8nnPJAv4GXY0EXxipyTnHorwQOpaaxfPzFH-F6wyTi5M558wOm3WSDTrafXodlfs6KE5P0clg3-Trj-DkiNGtf0kaqZ6reJ0DdJlaSnW4pWhuR2VA95K0DgwelPZvfmdzgKQ7wsBUxyNQZxKwYT-5nBP7mjAvyHCU8zqmRPELSBUOKKQEWrYipMBmqQTIOsMbNwKoiOZAX3JTo7_BcSeHSmd2gcZHUGmq1AeCrR6vq6-FhLObkqI", date: "Oct 18, 2023" },
      { code: "BCA-103", title: "Digital Logic",                           credits: 3, type: "Notes",    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz920-K14PT1EcSS-jMVIUJj1rOKe6NvevaeiWhFnB7_njdsZHAeC0Q3iUeBQvoBaCyvKO1PVhN3hCeS66eSoalQzW6a9cinYzZ8yl8kP2x9s2snTEywcgW43wEtzNGbfH_YnBxyNDTcEHfHuXRCgzCpHEup8VtwreqDolKjyAoey3rEmvDT1zkFUrxqkFdcvZ9Hx5qWl19kGgsSNJxf2Pgb4T_xoAgYgp3vQKZ2pKPha-ZF-agB-NfXsXoSf74L8dKhVJ7FDL_us", date: "Nov 01, 2023" },
      { code: "BCA-104", title: "Mathematics-I",                           credits: 3, type: "Exam Paper",thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Nov 05, 2023" },
      { code: "BCA-105", title: "Professional Communication and Ethics",   credits: 3, type: "Notes",    thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo2PbNyTEXTp_d34UIvPg6qjfQz8ExNy8IuSkVUea7pFFw4zT-cBj86oCfGe8P-x0EHsXk3daj_glXBMBuH21sDjzn6znDOK4EPujwkamt5y_VOQqKZ509IbX-hVka4TX1uZ2lEnqIzp5dMb-ntAbiZj8K8ZBSK9Wq6LgFPTFTv_ZZvLcblXZ0M4msSJP4gH7StybUKWfQ19fRgybXwxyO6GRpCqadP4ahwOCkTXchFCVHPj2GwwY7rYd-hUx7dJt0rjbh-o", date: "Nov 10, 2023" },
      { code: "BCA-106", title: "Hardware Workshop",                       credits: 1, type: "Lab Manual",thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwKYCFYeM-zG5OvnIguFMy82dntNY3iw1-hAb6m1Y2wgGvFDnBRxlo0wNO0jT2b-HI-DQFO53ylKX5aP2zwugS7xvVt1lY30WX6eiQ8MP34IAUiuDKlIaxBxohkB0kbZJZTviyEUH2lLDrkbc9FVps6Fkm5qzr7HVzv7PQ2SXlDwTrrrIEPHiqlsZVlkMrzOK6Ko8j3cf583bpjpWqO3Ec1H9FWuE5awK2-OwWFpqu5pMRwKDLGbCRDsbeXf4-u19NTDCwJ7PwZ68", date: "Nov 20, 2023" },
    ]
  },
  2: {
    label: "Year 1 — Semester II",
    subjects: [
      { code: "BCA-151", title: "Discrete Structure",                        credits: 3, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Jan 08, 2024" },
      { code: "BCA-152", title: "Microprocessor and Computer Architecture",  credits: 3, type: "Notes",     thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwKYCFYeM-zG5OvnIguFMy82dntNY3iw1-hAb6m1Y2wgGvFDnBRxlo0wNO0jT2b-HI-DQFO53ylKX5aP2zwugS7xvVt1lY30WX6eiQ8MP34IAUiuDKlIaxBxohkB0kbZJZTviyEUH2lLDrkbc9FVps6Fkm5qzr7HVzv7PQ2SXlDwTrrrIEPHiqlsZVlkMrzOK6Ko8j3cf583bpjpWqO3Ec1H9FWuE5awK2-OwWFpqu5pMRwKDLGbCRDsbeXf4-u19NTDCwJ7PwZ68", date: "Jan 12, 2024" },
      { code: "BCA-153", title: "OOP in Java",                               credits: 3, type: "Notes",     thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD-n9z_oHv4D0OqwzxREkzDxtTB6_F-u1N4UvrkNMturrWMBMq9OmkvypRfzMK5d0lHz1XY-c4vCIaxCBqA6QjVJlgnHki43PGDlsFFtjch3a46Q_GOvAq0oL6Aidg6-04XqXtQfkcZ5bZeVczsBHSBp4duZzoyNCT5aRL4aiZv-PAT5_AlxafLSPh6wG9aMx-qIpgRXHTQWxceDNGopMW2FizGOqzLxODO3A9PbO88NXrhHYm7xt8VEVT57wLEKZC7ZfqeLEPT00", date: "Jan 18, 2024" },
      { code: "BCA-154", title: "Mathematics-II",                            credits: 3, type: "Exam Paper", thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                   date: "Jan 22, 2024" },
      { code: "BCA-155", title: "UX/UI Design",                              credits: 3, type: "Notes",     thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo2PbNyTEXTp_d34UIvPg6qjfQz8ExNy8IuSkVUea7pFFw4zT-cBj86oCfGe8P-x0EHsXk3daj_glXBMBuH21sDjzn6znDOK4EPujwkamt5y_VOQqKZ509IbX-hVka4TX1uZ2lEnqIzp5dMb-ntAbiZj8K8ZBSK9Wq6LgFPTFTv_ZZvLcblXZ0M4msSJP4gH7StybUKWfQ19fRgybXwxyO6GRpCqadP4ahwOCkTXchFCVHPj2GwwY7rYd-hUx7dJt0rjbh-o", date: "Feb 01, 2024" },
      { code: "BCA-156", title: "Principles of Management",                  credits: 1, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Feb 05, 2024" },
    ]
  },
  3: {
    label: "Year 2 — Semester III",
    subjects: [
      { code: "BCA-201", title: "Data Structure and Algorithms",  credits: 3, type: "Notes",     thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuDz920-K14PT1EcSS-jMVIUJj1rOKe6NvevaeiWhFnB7_njdsZHAeC0Q3iUeBQvoBaCyvKO1PVhN3hCeS66eSoalQzW6a9cinYzZ8yl8kP2x9s2snTEywcgW43wEtzNGbfH_YnBxyNDTcEHfHuXRCgzCpHEup8VtwreqDolKjyAoey3rEmvDT1zkFUrxqkFdcvZ9Hx5qWl19kGgsSNJxf2Pgb4T_xoAgYgp3vQKZ2pKPha-ZF-agB-NfXsXoSf74L8dKhVJ7FDL_us", date: "Mar 02, 2024" },
      { code: "BCA-202", title: "Database Management System",     credits: 3, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Mar 08, 2024" },
      { code: "BCA-203", title: "Web Technology-I",               credits: 3, type: "Notes",     thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD-n9z_oHv4D0OqwzxREkzDxtTB6_F-u1N4UvrkNMturrWMBMq9OmkvypRfzMK5d0lHz1XY-c4vCIaxCBqA6QjVJlgnHki43PGDlsFFtjch3a46Q_GOvAq0oL6Aidg6-04XqXtQfkcZ5bZeVczsBHSBp4duZzoyNCT5aRL4aiZv-PAT5_AlxafLSPh6wG9aMx-qIpgRXHTQWxceDNGopMW2FizGOqzLxODO3A9PbO88NXrhHYm7xt8VEVT57wLEKZC7ZfqeLEPT00", date: "Mar 15, 2024" },
      { code: "BCA-204", title: "System Analysis and Design",     credits: 3, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Mar 20, 2024" },
      { code: "BCA-205", title: "Probability and Statistics",     credits: 3, type: "Exam Paper", thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                  date: "Mar 25, 2024" },
      { code: "BCA-206", title: "Applied Economics",              credits: 2, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Apr 01, 2024" },
    ]
  },
  4: {
    label: "Year 2 — Semester IV",
    subjects: [
      { code: "BCA-251", title: "Operating Systems",    credits: 3, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Apr 10, 2024" },
      { code: "BCA-252", title: "Software Engineering", credits: 3, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Apr 15, 2024" },
      { code: "BCA-253", title: "Numerical Methods",    credits: 3, type: "Exam Paper", thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                  date: "Apr 20, 2024" },
      { code: "BCA-254", title: "Python Programming",   credits: 3, type: "Notes",     thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD-n9z_oHv4D0OqwzxREkzDxtTB6_F-u1N4UvrkNMturrWMBMq9OmkvypRfzMK5d0lHz1XY-c4vCIaxCBqA6QjVJlgnHki43PGDlsFFtjch3a46Q_GOvAq0oL6Aidg6-04XqXtQfkcZ5bZeVczsBHSBp4duZzoyNCT5aRL4aiZv-PAT5_AlxafLSPh6wG9aMx-qIpgRXHTQWxceDNGopMW2FizGOqzLxODO3A9PbO88NXrhHYm7xt8VEVT57wLEKZC7ZfqeLEPT00", date: "Apr 25, 2024" },
      { code: "BCA-255", title: "Web Technology-II",    credits: 3, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "May 01, 2024" },
      { code: "BCA-256", title: "Project-I",            credits: 2, type: "Lab Manual", thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                   date: "May 05, 2024" },
    ]
  },
  5: {
    label: "Year 3 — Semester V",
    subjects: [
      { code: "BCA-301", title: "Computer Network",           credits: 3, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Jun 01, 2024" },
      { code: "BCA-302", title: "Artificial Intelligence",    credits: 3, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Jun 08, 2024" },
      { code: "BCA-303", title: "Advance Java Programming",   credits: 3, type: "Notes",     thumb: "https://lh3.googleusercontent.com/aida-public/AB6AXuCD-n9z_oHv4D0OqwzxREkzDxtTB6_F-u1N4UvrkNMturrWMBMq9OmkvypRfzMK5d0lHz1XY-c4vCIaxCBqA6QjVJlgnHki43PGDlsFFtjch3a46Q_GOvAq0oL6Aidg6-04XqXtQfkcZ5bZeVczsBHSBp4duZzoyNCT5aRL4aiZv-PAT5_AlxafLSPh6wG9aMx-qIpgRXHTQWxceDNGopMW2FizGOqzLxODO3A9PbO88NXrhHYm7xt8VEVT57wLEKZC7ZfqeLEPT00", date: "Jun 15, 2024" },
      { code: "BCA-304", title: "MIS and e-Business",         credits: 3, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Jun 20, 2024" },
      { code: "BCA-305", title: "Society and Technology",     credits: 3, type: "Notes",     thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                    date: "Jun 25, 2024" },
      { code: "BCA-306", title: "Project-II",                 credits: 3, type: "Lab Manual", thumb: null,                                                                                                                                                                                                                                                                                                                                                                                                   date: "Jul 01, 2024" },
    ]
  },
  6: {
    label: "Year 3 — Semester VI",
    subjects: [] /* No data yet — will show empty state */
  }
};

/* ============================================================
   2. CARD RENDERER
   Builds subject card HTML from a subject data object.
   Called by renderSemester() for each subject in the array.
   ============================================================ */

/** Maps resource type string → CSS badge modifier class */
const TYPE_BADGE_CLASS = {
  "Notes":      "badge-notes",
  "Exam Paper": "badge-exam",
  "Lab Manual": "badge-lab",
  "Quiz":       "badge-quiz",
};

/** Maps resource type → placeholder icon when no thumb image */
const TYPE_ICON = {
  "Notes":      "menu_book",
  "Exam Paper": "assignment",
  "Lab Manual": "science",
  "Quiz":       "quiz",
  "default":    "description",
};

/**
 * buildCardHTML — Returns the HTML string for one resource card.
 * @param {Object} subject — one entry from SYLLABUS[n].subjects
 * @returns {string} HTML string
 */
function buildCardHTML(subject) {
  const badgeClass = TYPE_BADGE_CLASS[subject.type] || "badge-default";
  const icon       = TYPE_ICON[subject.type] || TYPE_ICON["default"];

  /* Thumbnail: real image if available, gradient placeholder otherwise */
  const thumbHTML = subject.thumb
    ? `<img
         src="${subject.thumb}"
         alt="Cover image for ${subject.title}"
         loading="lazy"
       />`
    : `<div class="thumb-placeholder">
         <span class="material-symbols-outlined" aria-hidden="true">${icon}</span>
       </div>`;

  return `
    <article class="resource-card" aria-label="${subject.title}"
             data-code="${subject.code}"
             data-title="${subject.title.toLowerCase()}"
             data-type="${subject.type}">
      <div class="card-thumb">
        ${thumbHTML}
        <span class="card-type-badge ${badgeClass}" aria-label="Resource type: ${subject.type}">
          ${subject.type}
        </span>
      </div>

      <div class="card-title-row">
        <h3 class="card-title">${subject.title}</h3>
        <span class="subject-chip" aria-label="Subject code ${subject.code}">${subject.code}</span>
      </div>

      <p class="card-description">
        ${subject.credits} Credit${subject.credits !== 1 ? "s" : ""} —
        ${subject.type === "Notes"      ? "Lecture notes and study materials." :
          subject.type === "Exam Paper" ? "Past examination papers and answer keys." :
          subject.type === "Lab Manual" ? "Lab instructions and experiment guides." :
          subject.type === "Quiz"       ? "Practice quizzes and self-assessment tests." :
          "Study resource for this subject."}
      </p>

      <div class="card-footer">
        <span class="card-date text-label-sm">Uploaded: ${subject.date}</span>
        <button class="btn-icon-round" aria-label="Download ${subject.title}">
          <span class="material-symbols-outlined" aria-hidden="true">download</span>
        </button>
      </div>
    </article>`;
}


/* ============================================================
   3. SEMESTER FILTER + PAGE TITLE UPDATER
   Called whenever a sidebar nav-link is clicked.
   Clears the grid, renders new cards, updates the heading.
   ============================================================ */
let activeSemester = 1; /* default on page load */

/**
 * renderSemester — Clears the grid and fills it with cards
 * for the chosen semester number (1–6).
 * @param {number} semNum
 */
function renderSemester(semNum) {
  activeSemester = semNum;
  const sem    = SYLLABUS[semNum];
  const grid   = document.getElementById("cards-grid");
  const heading = document.getElementById("page-heading");
  const subhead  = document.getElementById("page-subheading");

  /* Update page title to reflect chosen semester */
  if (heading) heading.textContent = `${sem.label} — Subjects`;
  if (subhead)  subhead.textContent = sem.subjects.length
    ? `${sem.subjects.length} subjects · click any card to access materials.`
    : "No materials uploaded yet for this semester.";

  /* Re-render cards */
  if (!grid) return;

  if (!sem.subjects.length) {
    /* Empty state */
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1" role="status">
        <span class="material-symbols-outlined" aria-hidden="true">library_books</span>
        <h3>No materials yet</h3>
        <p>Resources for ${sem.label} haven't been uploaded yet. Check back soon!</p>
      </div>`;
    return;
  }

  grid.innerHTML = sem.subjects.map(buildCardHTML).join("");
}


/* ============================================================
   MAIN — runs after DOM is ready
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ── 3b. SIDEBAR NAV CLICKS ─────────────────────────────── */
  const navLinks = document.querySelectorAll("aside .nav-link[data-semester]");

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      /* Visual active state */
      navLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");

      /* Render the clicked semester */
      const sem = parseInt(this.dataset.semester, 10);
      renderSemester(sem);

      /* Close drawer on mobile after selection */
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  /* Render default semester on load */
  renderSemester(1);


  /* ── 4. SIDEBAR TOGGLE (mobile) ─────────────────────────── */
  const sidebar        = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const sidebarToggle  = document.getElementById("sidebar-toggle");

  function openSidebar() {
    sidebar.classList.add("is-open");
    sidebarOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
    sidebarToggle.setAttribute("aria-expanded", "true");
  }
  function closeSidebar() {
    sidebar.classList.remove("is-open");
    sidebarOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
    sidebarToggle.setAttribute("aria-expanded", "false");
  }

  if (sidebarToggle)  sidebarToggle.addEventListener("click", () =>
    sidebar.classList.contains("is-open") ? closeSidebar() : openSidebar()
  );
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);


  /* ── 5. UPLOAD MODAL ────────────────────────────────────── */
  const modal          = document.getElementById("upload-modal");
  const openModalBtns  = document.querySelectorAll("[data-open-modal]");
  const closeModalBtn  = document.getElementById("modal-close");
  const cancelModalBtn = document.getElementById("modal-cancel");

  function openModal()  {
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
    startProgressAnimation();
  }
  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  openModalBtns.forEach(btn => btn.addEventListener("click", openModal));
  if (closeModalBtn)  closeModalBtn.addEventListener("click",  closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);
  if (modal) modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  const finishBtn = document.getElementById("finish-upload");
  if (finishBtn) {
    finishBtn.addEventListener("click", () => {
      const bar = document.getElementById("progress-bar");
      if (bar) bar.style.width = "100%";
      setTimeout(closeModal, 700);
    });
  }


  /* ── 6. LIVE SEARCH ─────────────────────────────────────── */
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
      const cards = document.querySelectorAll("#cards-grid .resource-card");

      let visibleCount = 0;
      cards.forEach(card => {
        const title = card.dataset.title || "";
        const code  = card.dataset.code?.toLowerCase() || "";
        const match = !query || title.includes(query) || code.includes(query);
        card.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });

      /* Show inline "no results" if everything is hidden */
      let noResult = document.getElementById("search-no-result");
      if (!visibleCount && query) {
        if (!noResult) {
          noResult = document.createElement("div");
          noResult.id = "search-no-result";
          noResult.className = "empty-state";
          noResult.style.gridColumn = "1 / -1";
          noResult.innerHTML = `
            <span class="material-symbols-outlined">search_off</span>
            <h3>No results for "${query}"</h3>
            <p>Try a different subject name or code.</p>`;
          document.getElementById("cards-grid").appendChild(noResult);
        } else {
          noResult.querySelector("h3").textContent = `No results for "${query}"`;
          noResult.style.display = "";
        }
      } else if (noResult) {
        noResult.style.display = "none";
      }
    });
  }


  /* ── 7. SORT BUTTON ─────────────────────────────────────── */
  const sortBtn = document.getElementById("sort-btn");
  let sortAsc   = false; /* default: latest first */

  if (sortBtn) {
    sortBtn.addEventListener("click", () => {
      sortAsc = !sortAsc;
      sortBtn.innerHTML = `
        <span class="material-symbols-outlined" aria-hidden="true">sort</span>
        ${sortAsc ? "Oldest First" : "Latest First"}`;

      const grid  = document.getElementById("cards-grid");
      const cards = [...grid.querySelectorAll(".resource-card")];

      cards.sort((a, b) => {
        const dateA = new Date(a.querySelector(".card-date").textContent.replace("Uploaded: ", ""));
        const dateB = new Date(b.querySelector(".card-date").textContent.replace("Uploaded: ", ""));
        return sortAsc ? dateA - dateB : dateB - dateA;
      });

      /* Re-insert sorted cards */
      cards.forEach(c => grid.appendChild(c));
    });
  }


  /* ── 8. DRAG-AND-DROP ZONE ──────────────────────────────── */
  const dropZone  = document.getElementById("drop-zone");
  const browseBtn = document.getElementById("browse-btn");
  const fileInput = document.getElementById("file-input");

  if (dropZone) {
    dropZone.addEventListener("dragover",  e => { e.preventDefault(); dropZone.classList.add("drag-over"); });
    dropZone.addEventListener("dragleave", ()  => dropZone.classList.remove("drag-over"));
    dropZone.addEventListener("drop", e => {
      e.preventDefault();
      dropZone.classList.remove("drag-over");
      if (e.dataTransfer.files.length) updateFileCard(e.dataTransfer.files[0]);
    });
  }
  if (browseBtn && fileInput) {
    browseBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
      if (fileInput.files.length) updateFileCard(fileInput.files[0]);
    });
  }

  function updateFileCard(file) {
    const nameEl = document.getElementById("upload-file-name");
    const sizeEl = document.getElementById("upload-file-size");
    if (nameEl) nameEl.textContent = file.name;
    if (sizeEl) sizeEl.textContent = formatBytes(file.size) + " • Uploading...";
    startProgressAnimation();
  }

  function formatBytes(bytes) {
    if (bytes < 1024)    return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }


  /* ── 9. PROGRESS BAR ANIMATION (mock) ──────────────────── */
  function startProgressAnimation() {
    const bar    = document.getElementById("progress-bar");
    const sizeEl = document.getElementById("upload-file-size");
    if (!bar) return;
    bar.style.width = "65%";
    setTimeout(() => {
      bar.style.width = "78%";
      if (sizeEl) sizeEl.textContent = "12.4 MB • 78% completed";
    }, 1500);
  }

  startProgressAnimation();

}); /* end DOMContentLoaded */
