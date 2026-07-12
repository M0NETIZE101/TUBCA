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
 * 10. Notification System — Bell icon with dropdown
 * ============================================================
 */

/* ============================================================
   1. SYLLABUS DATA
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
    subjects: []
  }
};

/* ============================================================
   2. CARD RENDERER
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

  // Custom image path
  const customImagePath = `images/subjects/${subject.code}-cover.jpg`;
  
  // Fallback: use placeholder instead of images
  const thumbHTML = `
    <img
      src="${customImagePath}"
      alt="Cover image for ${subject.title}"
      loading="lazy"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
    />
    <div class="thumb-placeholder" style="display:none;">
      <span class="material-symbols-outlined" aria-hidden="true">${icon}</span>
    </div>
  `;

  return `
    <article class="resource-card" aria-label="${subject.title}"
             data-code="${subject.code}"
             data-title="${subject.title.toLowerCase()}"
             data-type="${subject.type}"
             data-date="${subject.date}"
             style="cursor:pointer"
             onclick="window.location.href='subject.html?code=${subject.code}'"
             role="button"
             tabindex="0"
             onkeydown="if(event.key==='Enter') window.location.href='subject.html?code=${subject.code}'"
             >
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
        <!-- Removed download button - it was just a decorative icon -->
      </div>
    </article>`;
}


/* ============================================================
   3. SEMESTER FILTER + PAGE TITLE UPDATER
   ============================================================ */
let activeSemester = 1;

function renderSemester(semNum) {
  activeSemester = semNum;
  const sem    = SYLLABUS[semNum];
  const grid   = document.getElementById("cards-grid");
  const heading = document.getElementById("page-heading");
  const subhead  = document.getElementById("page-subheading");

  if (heading) heading.textContent = `${sem.label} — Subjects`;
  if (subhead)  subhead.textContent = sem.subjects.length
    ? `${sem.subjects.length} subjects · click any card to access materials.`
    : "No materials uploaded yet for this semester.";

  if (!grid) return;

  if (!sem.subjects.length) {
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
document.addEventListener("DOMContentLoaded", function() {

  /* ── 3b. SIDEBAR NAV CLICKS ─────────────────────────────── */
  const navLinks = document.querySelectorAll("aside .nav-link[data-semester]");

  navLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      navLinks.forEach(function(l) { l.classList.remove("active"); });
      this.classList.add("active");

      const sem = parseInt(this.dataset.semester, 10);
      renderSemester(sem);

      if (window.innerWidth <= 768) closeSidebar();
    });
  });

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

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function() {
      sidebar.classList.contains("is-open") ? closeSidebar() : openSidebar();
    });
  }
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);


  /* ── 5. LIVE SEARCH ─────────────────────────────────────── */
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const query = this.value.trim().toLowerCase();
      const cards = document.querySelectorAll("#cards-grid .resource-card");

      var visibleCount = 0;
      cards.forEach(function(card) {
        const title = card.dataset.title || "";
        const code  = card.dataset.code?.toLowerCase() || "";
        const match = !query || title.includes(query) || code.includes(query);
        card.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });

      var noResult = document.getElementById("search-no-result");
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


  /* ── 6. SORT BUTTON ─────────────────────────────────────── */
  const sortBtn = document.getElementById("sort-btn");
  var sortAsc = false;

  if (sortBtn) {
    sortBtn.addEventListener("click", function() {
      sortAsc = !sortAsc;
      this.innerHTML = `
        <span class="material-symbols-outlined" aria-hidden="true">sort</span>
        ${sortAsc ? "Oldest First" : "Latest First"}`;

      const grid  = document.getElementById("cards-grid");
      const cards = [...grid.querySelectorAll(".resource-card")];

      cards.sort(function(a, b) {
        const dateA = new Date(a.dataset.date || 0);
        const dateB = new Date(b.dataset.date || 0);
        return sortAsc ? dateA - dateB : dateB - dateA;
      });

      cards.forEach(function(c) { grid.appendChild(c); });
    });
  }


  /* ── 7. NOTIFICATION SYSTEM ─────────────────────────────── */
  // ─── Cached notices data to avoid multiple fetches ───
  var cachedNotices = null;
  var noticesFetched = false;

  // ─── Load notices and update badge (only counts recent notices) ───
  async function loadNotificationBadge() {
    try {
      const url = `https://raw.githubusercontent.com/M0NETIZE101/TUBCA/main/notices.json`;
      const response = await fetch(url);

      if (!response.ok) {
        console.log('No notices file found');
        return;
      }

      const notices = await response.json();
      cachedNotices = notices;
      noticesFetched = true;

      if (!notices || !notices.length) {
        document.getElementById('notification-badge').classList.remove('visible');
        return;
      }

      // ─── FIXED: Only count notices from the last 30 days ───
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      const readIds = JSON.parse(localStorage.getItem('read_notice_ids') || '[]');

      // Count notices that are recent AND unread
      const unreadCount = notices.filter(function(n) {
        const noticeDate = new Date(n.date).getTime();
        const isRecent = noticeDate > thirtyDaysAgo;
        const isUnread = !readIds.includes(n.id);
        return isRecent && isUnread;
      }).length;

      const badge = document.getElementById('notification-badge');
      if (unreadCount > 0) {
        badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        badge.classList.add('visible');
      } else {
        badge.classList.remove('visible');
      }
    } catch (error) {
      console.log('Could not load notices:', error);
    }
  }

  // ─── Load notices into dropdown ───
  async function loadNoticesIntoDropdown() {
    const list = document.getElementById('notification-list');
    if (!list) return;

    // Use cached notices if available
    var notices = cachedNotices;

    if (!notices) {
      try {
        const url = `https://raw.githubusercontent.com/M0NETIZE101/TUBCA/main/notices.json`;
        const response = await fetch(url);
        if (!response.ok) {
          list.innerHTML = '<div class="notification-empty"><span class="material-symbols-outlined">notifications_off</span><div>No notices available</div></div>';
          return;
        }
        notices = await response.json();
        cachedNotices = notices;
        noticesFetched = true;
      } catch (error) {
        list.innerHTML = '<div class="notification-empty"><span class="material-symbols-outlined">error_outline</span><div>Could not load notices</div></div>';
        return;
      }
    }

    if (!notices || !notices.length) {
      list.innerHTML = '<div class="notification-empty"><span class="material-symbols-outlined">notifications_off</span><div>No notices yet 📢</div></div>';
      return;
    }

    // Sort newest first, limit to 5
    const sorted = [...notices].sort(function(a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    const latest = sorted.slice(0, 5);

    // Get read IDs from localStorage
    const readIds = JSON.parse(localStorage.getItem('read_notice_ids') || '[]');

    list.innerHTML = latest.map(function(notice) {
      const typeClass = notice.type || 'general';
      const date = new Date(notice.date);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const isUnread = !readIds.includes(notice.id);

      return '<div class="notification-item ' + (isUnread ? 'unread' : '') + '" data-id="' + notice.id + '" onclick="window.location.href=\'notices.html\'">' +
        '<div class="ntitle">' + escapeHtml(notice.title) + ' <span class="ntype ' + typeClass + '">' + typeClass + '</span></div>' +
        '<div class="ndate">' + dateStr + ' · ' + escapeHtml(notice.author || 'Admin') + '</div>' +
        '<div class="ncontent">' + escapeHtml(notice.content.substring(0, 120)) + (notice.content.length > 120 ? '...' : '') + '</div>' +
        '</div>';
    }).join('');

    // ─── FIXED: Do NOT auto-mark as read when dropdown opens ───
    // Users must click "Mark all as read" to mark notices as read
  }

  // ─── Escape HTML for safety ───
  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ─── Toggle dropdown ───
  function toggleNotificationDropdown() {
    var dropdown = document.getElementById('notification-dropdown');
    if (!dropdown) return;

    var isOpen = dropdown.classList.contains('open');
    dropdown.classList.toggle('open');

    if (!isOpen) {
      loadNoticesIntoDropdown();
    }
  }

  // ─── Mark all as read ───
  function markAllAsRead() {
    var items = document.querySelectorAll('#notification-list .notification-item');
    var ids = [];
    items.forEach(function(item) {
      var id = item.dataset.id;
      if (id) ids.push(parseInt(id));
      item.classList.remove('unread');
    });

    if (ids.length) {
      var readIds = JSON.parse(localStorage.getItem('read_notice_ids') || '[]');
      var newReadIds = [...new Set([...readIds, ...ids])];
      localStorage.setItem('read_notice_ids', JSON.stringify(newReadIds));
      loadNotificationBadge();
    }
  }

  // ─── Click outside to close dropdown ───
  document.addEventListener('click', function(e) {
    var wrapper = document.querySelector('.notification-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
      var dropdown = document.getElementById('notification-dropdown');
      if (dropdown) dropdown.classList.remove('open');
    }
  });

  // ─── Initialize notifications ───
  loadNotificationBadge();

  // Click on notification button
  var btn = document.getElementById('notification-btn');
  if (btn) {
    btn.addEventListener('click', toggleNotificationDropdown);
  }

  // Mark all as read button
  var markReadBtn = document.getElementById('mark-read-btn');
  if (markReadBtn) {
    markReadBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      markAllAsRead();
    });
  }

}); /* end DOMContentLoaded */