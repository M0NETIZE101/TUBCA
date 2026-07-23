/**
 * BCA Student Portal — Main JS
 * ============================================================
 * 1.  Syllabus data — all 6 semesters with subjects
 * 2.  Card renderer — builds subject cards from data
 * 3.  Semester filter — sidebar clicks filter the grid
 * 4.  Sidebar toggle (mobile drawer)
 * 5.  Search — filters visible cards by subject name / code
 * 6.  Sort — Latest First / Oldest First toggle
 * 7.  Notification System — Bell icon with dropdown
 * ============================================================
 */

/* ============================================================
   UTILITIES
   ============================================================ */

/** Escapes HTML entities to prevent XSS when inserting user-facing strings. */
function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/** Reads notice read-IDs from localStorage, normalised to strings. */
function getReadIds() {
  const raw = JSON.parse(localStorage.getItem("read_notice_ids") || "[]");
  return raw.map(String);
}

/** Saves an array of notice IDs (strings) to localStorage. */
function saveReadIds(ids) {
  localStorage.setItem("read_notice_ids", JSON.stringify(ids));
}


/* ============================================================
   1. SYLLABUS DATA
   ============================================================ */
const SYLLABUS = {
  1: {
    label: "Year 1 — Semester I",
    subjects: [
      { code: "BCA-101", title: "Computer Fundamentals and Applications", credits: 3, type: "Notes",      date: "Oct 12, 2023" },
      { code: "BCA-102", title: "Programming in C",                        credits: 3, type: "Notes",      date: "Oct 18, 2023" },
      { code: "BCA-103", title: "Digital Logic",                           credits: 3, type: "Notes",      date: "Nov 01, 2023" },
      { code: "BCA-104", title: "Mathematics-I",                           credits: 3, type: "Exam Paper", date: "Nov 05, 2023" },
      { code: "BCA-105", title: "Professional Communication and Ethics",   credits: 3, type: "Notes",      date: "Nov 10, 2023" },
      { code: "BCA-106", title: "Hardware Workshop",                       credits: 1, type: "Lab Manual", date: "Nov 20, 2023" },
    ]
  },
  2: {
    label: "Year 1 — Semester II",
    subjects: [
      { code: "BCA-151", title: "Discrete Structure",                       credits: 3, type: "Notes",      date: "Jan 08, 2024" },
      { code: "BCA-152", title: "Microprocessor and Computer Architecture", credits: 3, type: "Notes",      date: "Jan 12, 2024" },
      { code: "BCA-153", title: "OOP in Java",                              credits: 3, type: "Notes",      date: "Jan 18, 2024" },
      { code: "BCA-154", title: "Mathematics-II",                           credits: 3, type: "Exam Paper", date: "Jan 22, 2024" },
      { code: "BCA-155", title: "UX/UI Design",                             credits: 3, type: "Notes",      date: "Feb 01, 2024" },
      { code: "BCA-156", title: "Principles of Management",                 credits: 1, type: "Notes",      date: "Feb 05, 2024" },
    ]
  },
  3: {
    label: "Year 2 — Semester III",
    subjects: [
      { code: "BCA-201", title: "Data Structure and Algorithms", credits: 3, type: "Notes",      date: "Mar 02, 2024" },
      { code: "BCA-202", title: "Database Management System",    credits: 3, type: "Notes",      date: "Mar 08, 2024" },
      { code: "BCA-203", title: "Web Technology-I",              credits: 3, type: "Notes",      date: "Mar 15, 2024" },
      { code: "BCA-204", title: "System Analysis and Design",    credits: 3, type: "Notes",      date: "Mar 20, 2024" },
      { code: "BCA-205", title: "Probability and Statistics",    credits: 3, type: "Exam Paper", date: "Mar 25, 2024" },
      { code: "BCA-206", title: "Applied Economics",             credits: 2, type: "Notes",      date: "Apr 01, 2024" },
    ]
  },
  4: {
    label: "Year 2 — Semester IV",
    subjects: [
      { code: "BCA-251", title: "Operating Systems",    credits: 3, type: "Notes",      date: "Apr 10, 2024" },
      { code: "BCA-252", title: "Software Engineering", credits: 3, type: "Notes",      date: "Apr 15, 2024" },
      { code: "BCA-253", title: "Numerical Methods",    credits: 3, type: "Exam Paper", date: "Apr 20, 2024" },
      { code: "BCA-254", title: "Python Programming",   credits: 3, type: "Notes",      date: "Apr 25, 2024" },
      { code: "BCA-255", title: "Web Technology-II",    credits: 3, type: "Notes",      date: "May 01, 2024" },
      { code: "BCA-256", title: "Project-I",            credits: 2, type: "Lab Manual", date: "May 05, 2024" },
    ]
  },
  5: {
    label: "Year 3 — Semester V",
    subjects: [
      { code: "BCA-301", title: "Computer Network",         credits: 3, type: "Notes",      date: "Jun 01, 2024" },
      { code: "BCA-302", title: "Artificial Intelligence",  credits: 3, type: "Notes",      date: "Jun 08, 2024" },
      { code: "BCA-303", title: "Advance Java Programming", credits: 3, type: "Notes",      date: "Jun 15, 2024" },
      { code: "BCA-304", title: "MIS and e-Business",       credits: 3, type: "Notes",      date: "Jun 20, 2024" },
      { code: "BCA-305", title: "Society and Technology",   credits: 3, type: "Notes",      date: "Jun 25, 2024" },
      { code: "BCA-306", title: "Project-II",               credits: 3, type: "Lab Manual", date: "Jul 01, 2024" },
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

const TYPE_BADGE_CLASS = {
  "Notes":      "badge-notes",
  "Exam Paper": "badge-exam",
  "Lab Manual": "badge-lab",
  "Quiz":       "badge-quiz",
};

const TYPE_ICON = {
  "Notes":      "menu_book",
  "Exam Paper": "assignment",
  "Lab Manual": "science",
  "Quiz":       "quiz",
};
const DEFAULT_ICON = "description";

const TYPE_DESCRIPTION = {
  "Notes":      "Lecture notes and study materials.",
  "Exam Paper": "Past examination papers and answer keys.",
  "Lab Manual": "Lab instructions and experiment guides.",
  "Quiz":       "Practice quizzes and self-assessment tests.",
};
const DEFAULT_DESCRIPTION = "Study resource for this subject.";

/**
 * Returns the HTML string for one resource card.
 * @param {Object} subject — one entry from SYLLABUS[n].subjects
 * @returns {string}
 */
function buildCardHTML(subject) {
  const badgeClass   = TYPE_BADGE_CLASS[subject.type] || "badge-default";
  const icon         = TYPE_ICON[subject.type] || DEFAULT_ICON;
  const description  = TYPE_DESCRIPTION[subject.type] || DEFAULT_DESCRIPTION;
  const subjectUrl   = `subject.html?code=${subject.code}`;
  const imagePath    = `images/subjects/${subject.code}-cover.jpg`;

  const thumbHTML = `
    <img
      src="${imagePath}"
      alt="Cover image for ${subject.title}"
      loading="lazy"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
    />
    <div class="thumb-placeholder" style="display:none;">
      <span class="material-symbols-outlined" aria-hidden="true">${icon}</span>
    </div>`;

  return `
    <article class="resource-card"
             aria-label="${subject.title}"
             data-code="${subject.code}"
             data-title="${subject.title.toLowerCase()}"
             data-type="${subject.type}"
             data-date="${subject.date}"
             role="link"
             tabindex="0"
             onclick="window.location.href='${subjectUrl}'"
             onkeydown="if(event.key==='Enter') window.location.href='${subjectUrl}'"
             style="cursor:pointer">
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
        ${subject.credits} Credit${subject.credits !== 1 ? "s" : ""} — ${description}
      </p>

      <div class="card-footer">
        <span class="card-date text-label-sm">Uploaded: ${subject.date}</span>
      </div>
    </article>`;
}


/* ============================================================
   3. SEMESTER FILTER + PAGE TITLE UPDATER
   ============================================================ */
let activeSemester = 1;

function renderSemester(semNum) {
  activeSemester = semNum;
  const sem     = SYLLABUS[semNum];
  const grid    = document.getElementById("cards-grid");
  const heading = document.getElementById("page-heading");
  const subhead = document.getElementById("page-subheading");

  if (heading) heading.textContent = `${sem.label} — Subjects`;
  if (subhead) subhead.textContent = sem.subjects.length
    ? `${sem.subjects.length} subjects · click any card to access materials.`
    : "No materials uploaded yet for this semester.";

  if (!grid) return;

  // Clear stale search state when switching semesters
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";

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
document.addEventListener("DOMContentLoaded", function () {

  /* ── 3b. SIDEBAR NAV CLICKS ─────────────────────────────── */
  const navLinks = document.querySelectorAll("aside .nav-link[data-semester]");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Deactivate all — remove both class and aria attribute
      navLinks.forEach(function (l) {
        l.classList.remove("active");
        l.removeAttribute("aria-current");
      });
      this.classList.add("active");
      this.setAttribute("aria-current", "page");

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
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.contains("is-open") ? closeSidebar() : openSidebar();
    });
  }
  if (sidebarOverlay) sidebarOverlay.addEventListener("click", closeSidebar);


  /* ── 5. LIVE SEARCH ─────────────────────────────────────── */
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.trim().toLowerCase();
      const cards = document.querySelectorAll("#cards-grid .resource-card");
      let visibleCount = 0;

      cards.forEach(function (card) {
        const title = card.dataset.title || "";
        const code  = (card.dataset.code || "").toLowerCase();
        const match = !query || title.includes(query) || code.includes(query);
        card.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });

      // Remove any existing no-result element first
      const existingNoResult = document.getElementById("search-no-result");
      if (existingNoResult) existingNoResult.remove();

      if (!visibleCount && query) {
        const noResult = document.createElement("div");
        noResult.id = "search-no-result";
        noResult.className = "empty-state";
        noResult.style.gridColumn = "1 / -1";
        noResult.setAttribute("role", "status");
        noResult.innerHTML = `
          <span class="material-symbols-outlined" aria-hidden="true">search_off</span>
          <h3>No results for "${escapeHtml(query)}"</h3>
          <p>Try a different subject name or code.</p>`;
        document.getElementById("cards-grid").appendChild(noResult);
      }
    });
  }


  /* ── 6. SORT BUTTON ─────────────────────────────────────── */
  const sortBtn = document.getElementById("sort-btn");
  let sortAsc = false;

  if (sortBtn) {
    sortBtn.addEventListener("click", function () {
      sortAsc = !sortAsc;
      this.innerHTML = `
        <span class="material-symbols-outlined" aria-hidden="true">sort</span>
        ${sortAsc ? "Oldest First" : "Latest First"}`;

      const grid  = document.getElementById("cards-grid");
      const cards = [...grid.querySelectorAll(".resource-card")];

      cards.sort(function (a, b) {
        const dateA = new Date(a.dataset.date || 0);
        const dateB = new Date(b.dataset.date || 0);
        return sortAsc ? dateA - dateB : dateB - dateA;
      });

      cards.forEach(function (c) { grid.appendChild(c); });
    });
  }


  /* ── 7. NOTIFICATION SYSTEM ─────────────────────────────── */
  const NOTICES_URL = "https://raw.githubusercontent.com/M0NETIZE101/TUBCA/main/notices.json";
  let cachedNotices = null;
  const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

  /** Fetches notices (uses cache on repeat calls), updates the badge count. */
  async function loadNotificationBadge() {
    try {
      const response = await fetch(NOTICES_URL);
      if (!response.ok) return;

      const notices = await response.json();
      cachedNotices = notices;

      const badge = document.getElementById("notification-badge");
      if (!notices || !notices.length) {
        badge.classList.remove("visible");
        return;
      }

      const cutoff   = Date.now() - THIRTY_DAYS_MS;
      const readIds  = getReadIds();

      const unreadCount = notices.filter(function (n) {
        return new Date(n.date).getTime() > cutoff && !readIds.includes(String(n.id));
      }).length;

      if (unreadCount > 0) {
        badge.textContent = unreadCount > 9 ? "9+" : unreadCount;
        badge.classList.add("visible");
      } else {
        badge.classList.remove("visible");
      }
    } catch (error) {
      console.log("Could not load notices:", error);
    }
  }

  /** Renders the 5 most recent notices into the dropdown list. */
  async function loadNoticesIntoDropdown() {
    const list = document.getElementById("notification-list");
    if (!list) return;

    let notices = cachedNotices;

    if (!notices) {
      try {
        const response = await fetch(NOTICES_URL);
        if (!response.ok) {
          list.innerHTML = `<div class="notification-empty">
            <span class="material-symbols-outlined" aria-hidden="true">notifications_off</span>
            <div>No notices available</div></div>`;
          return;
        }
        notices = await response.json();
        cachedNotices = notices;
      } catch (error) {
        list.innerHTML = `<div class="notification-empty">
          <span class="material-symbols-outlined" aria-hidden="true">error_outline</span>
          <div>Could not load notices</div></div>`;
        return;
      }
    }

    if (!notices || !notices.length) {
      list.innerHTML = `<div class="notification-empty">
        <span class="material-symbols-outlined" aria-hidden="true">notifications_off</span>
        <div>No notices yet</div></div>`;
      return;
    }

    const sorted = [...notices].sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    const latest  = sorted.slice(0, 5);
    const readIds = getReadIds();

    list.innerHTML = latest.map(function (notice) {
      const typeClass = notice.type || "general";
      const date      = new Date(notice.date);
      const dateStr   = isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const isUnread  = !readIds.includes(String(notice.id));
      const excerpt   = (notice.content || "").substring(0, 120);
      const suffix    = (notice.content || "").length > 120 ? "..." : "";

      return `<div class="notification-item ${isUnread ? "unread" : ""}" data-id="${notice.id}" onclick="window.location.href='notices.html'">
        <div class="ntitle">${escapeHtml(notice.title)} <span class="ntype ${typeClass}">${typeClass}</span></div>
        <div class="ndate">${dateStr} · ${escapeHtml(notice.author || "Admin")}</div>
        <div class="ncontent">${escapeHtml(excerpt)}${suffix}</div>
      </div>`;
    }).join("");
  }

  /** Toggles the notification dropdown open/closed. */
  function toggleNotificationDropdown() {
    const dropdown = document.getElementById("notification-dropdown");
    const btn      = document.getElementById("notification-btn");
    if (!dropdown) return;

    const isOpen = dropdown.classList.contains("open");
    dropdown.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(!isOpen));

    if (!isOpen) loadNoticesIntoDropdown();
  }

  /** Marks all currently-visible notice items as read and persists to localStorage. */
  function markAllAsRead() {
    const items = document.querySelectorAll("#notification-list .notification-item");
    const ids   = [];

    items.forEach(function (item) {
      const id = item.dataset.id;
      if (id) ids.push(String(id));
      item.classList.remove("unread");
    });

    if (ids.length) {
      const current   = getReadIds();
      const merged    = [...new Set([...current, ...ids])];
      saveReadIds(merged);
      loadNotificationBadge();
    }
  }

  // Click outside to close dropdown
  document.addEventListener("click", function (e) {
    const wrapper = document.querySelector(".notification-wrapper");
    if (wrapper && !wrapper.contains(e.target)) {
      const dropdown = document.getElementById("notification-dropdown");
      const btn      = document.getElementById("notification-btn");
      if (dropdown) dropdown.classList.remove("open");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  });

  // Initialize
  loadNotificationBadge();

  const notifBtn = document.getElementById("notification-btn");
  if (notifBtn) notifBtn.addEventListener("click", toggleNotificationDropdown);

  const markReadBtn = document.getElementById("mark-read-btn");
  if (markReadBtn) {
    markReadBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      markAllAsRead();
    });
  }

}); /* end DOMContentLoaded */
