  document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelectorAll('.nav-links button');

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });

    // Close menu after clicking a nav item on mobile
    navButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        if (window.innerWidth <= 900) {
          navLinks.classList.remove('open');
          navToggle.classList.remove('open');
        }
      });
    });

    // Optional: close menu if window is resized to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      }
    });
  });

document.addEventListener('DOMContentLoaded', function () {
    /* ---------- Mobile nav toggle UX ---------- */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks  = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
      });

      // Close menu when a nav item is selected
      navLinks.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') {
          navToggle.classList.remove('open');
          navLinks.classList.remove('open');
        }
      });
    }

    /* ---------- Scroll-reveal animations ---------- */
    const revealTargets = document.querySelectorAll(
      '.service-card,' +
      '.ai-feature-card,' +
      '.why-card,' +
      '.faq-item,' +
      '.dashboard-card,' +
      '.progress-card,' +
      '.course-item,' +
      '.data-table-row,' +
      '.stats-banner'
    );

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealTargets.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    /* ---------- Small hover tilt on cards (nice UX touch) ---------- */
    function addTiltEffect(selector) {
      const cards = document.querySelectorAll(selector);
      cards.forEach(card => {
        const strength = 8; // lower = subtler

        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const rotateY = ((x / rect.width) - 0.5) * strength;
          const rotateX = ((y / rect.height) - 0.5) * -strength;

          card.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'translateY(0)';
        });
      });
    }

    addTiltEffect('.service-card');
    addTiltEffect('.ai-feature-card');
    addTiltEffect('.why-card');
  });
const revealTargets = document.querySelectorAll(
  '.service-card,' +
  '.ai-feature-card,' +
  '.why-card,' +
  '.faq-item,' +
  '.dashboard-card,' +
  '.progress-card,' +
  '.course-item,' +
  '.data-table-row,' +
  '.stats-banner,' +
  '.step-card' // ⬅ add this
);



// --------------------------
// FAQ TOGGLE
// --------------------------
function toggleFAQ(button) {
  const item = button.closest(".faq-item");
  const isActive = item.classList.contains("active");

  document.querySelectorAll(".faq-item").forEach((faq) => {
    faq.classList.remove("active");
  });

  if (!isActive) {
    item.classList.add("active");
  }
}

// --------------------------
// SCROLL REVEAL
// --------------------------
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

// --------------------------
// MOBILE NAV TOGGLE
// --------------------------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    }
  });
}

// --------------------------
// NAV: TRANSPARENT -> GREEN ON SCROLL
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  if (!nav) return;

  function updateNavBackground() {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  // Run once on load to set correct state
  updateNavBackground();

  // Update on scroll
  window.addEventListener("scroll", updateNavBackground);
});



// --------------------------
// SMOOTH SCROLL FOR #ANCHORS
// --------------------------
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute("href").substring(1);
  const target = document.getElementById(targetId);
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

// --------------------------
// SCROLL PROGRESS BAR
// --------------------------
const scrollBar = document.querySelector(".scroll-progress-bar");
if (scrollBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = progress + "%";
  });
}

// --------------------------
// SCROLL TO TOP BUTTON
// --------------------------
const scrollTopBtn = document.querySelector(".scroll-top");

if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    const showAt = 200; // px
    if (window.scrollY > showAt) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// --------------------------
// ADMIN PORTAL VIEW SWITCHER
// --------------------------
function switchAdminView(viewName, el) {
  const contentArea = document.getElementById("admin-content-area");
  if (!contentArea) return;

  // Highlight active item in sidebar
  document
    .querySelectorAll(".admin-sidebar-full .sidebar-item")
    .forEach((item) => item.classList.remove("active"));

  if (el) {
    el.classList.add("active");
  }

  let html = "";

  switch (viewName) {
    case "courses":
      html = `
        <div class="page-header">
          <h1>Course Management</h1>
          <p>Create, edit, and manage all your medical learning courses from this panel.</p>
        </div>
        <div class="data-table">
          <div class="data-table-header">
            <div>Course Name</div>
            <div>Enrolled HCPs</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          <div class="data-table-row">
            <div>
              <strong>Practical Diabetes Management</strong><br>
              <small style="color:#94a3b8;">10 modules • 36 lessons</small>
            </div>
            <div>432</div>
            <div><span class="status-badge status-active">Active</span></div>
            <div class="action-buttons">
              <button class="btn-icon btn-edit" onclick="showEditMessage()">✏️ Edit</button>
              <button class="btn-icon btn-delete" onclick="showDeleteConfirm()">🗑️ Delete</button>
            </div>
          </div>

          <div class="data-table-row">
            <div>
              <strong>Evidence-Based Hypertension Management</strong><br>
              <small style="color:#94a3b8;">8 modules • 28 lessons</small>
            </div>
            <div>289</div>
            <div><span class="status-badge status-active">Active</span></div>
            <div class="action-buttons">
              <button class="btn-icon btn-edit" onclick="showEditMessage()">✏️ Edit</button>
              <button class="btn-icon btn-delete" onclick="showDeleteConfirm()">🗑️ Delete</button>
            </div>
          </div>

          <div class="data-table-row">
            <div>
              <strong>Infection Prevention & AMS</strong><br>
              <small style="color:#94a3b8;">6 modules • 20 lessons</small>
            </div>
            <div>198</div>
            <div><span class="status-badge status-active">Active</span></div>
            <div class="action-buttons">
              <button class="btn-icon btn-edit" onclick="showEditMessage()">✏️ Edit</button>
              <button class="btn-icon btn-delete" onclick="showDeleteConfirm()">🗑️ Delete</button>
            </div>
          </div>

          <div class="data-table-row">
            <div>
              <strong>ICU Basics for Residents & Nurses</strong><br>
              <small style="color:#94a3b8;">12 modules • 40 lessons</small>
            </div>
            <div>156</div>
            <div><span class="status-badge status-pending">Draft</span></div>
            <div class="action-buttons">
              <button class="btn-icon btn-edit" onclick="showEditMessage()">✏️ Edit</button>
              <button class="btn-icon btn-delete" onclick="showDeleteConfirm()">🗑️ Delete</button>
            </div>
          </div>
        </div>
      `;
      break;

    case "students":
      html = `
        <div class="page-header">
          <h1>Learner Management</h1>
          <p>View and manage doctors, residents, and nurses enrolled on the platform.</p>
        </div>
        <div class="data-table">
          <div class="data-table-header">
            <div>Learner Name</div>
            <div>Role</div>
            <div>Courses</div>
            <div>Status</div>
          </div>

          <div class="data-table-row">
            <div><strong>Dr. Aisha Verma</strong><br><small style="color:#94a3b8;">Consultant Diabetologist</small></div>
            <div>Doctor</div>
            <div>4 Active</div>
            <div><span class="status-badge status-active">Active</span></div>
          </div>

          <div class="data-table-row">
            <div><strong>Dr. Rahul Mehta</strong><br><small style="color:#94a3b8;">Internal Medicine Resident</small></div>
            <div>Resident</div>
            <div>3 Active</div>
            <div><span class="status-badge status-active">Active</span></div>
          </div>

          <div class="data-table-row">
            <div><strong>Nurse Priya Nair</strong><br><small style="color:#94a3b8;">ICU Nurse</small></div>
            <div>Nurse</div>
            <div>2 Active</div>
            <div><span class="status-badge status-active">Active</span></div>
          </div>

          <div class="data-table-row">
            <div><strong>Dr. Sanjay Rao</strong><br><small style="color:#94a3b8;">Cardiologist</small></div>
            <div>Doctor</div>
            <div>1 Active</div>
            <div><span class="status-badge status-pending">Invited</span></div>
          </div>
        </div>
      `;
      break;

    case "instructors":
      html = `
        <div class="page-header">
          <h1>Faculty & KOLs</h1>
          <p>Manage your expert faculty, KOLs, and course authors.</p>
        </div>
        <div class="data-table">
          <div class="data-table-header">
            <div>Name</div>
            <div>Specialty</div>
            <div>Courses Authored</div>
            <div>Actions</div>
          </div>

          <div class="data-table-row">
            <div><strong>Dr. Neha Kulkarni</strong><br><small style="color:#94a3b8;">Endocrinology</small></div>
            <div>Diabetology</div>
            <div>3</div>
            <div class="action-buttons">
              <button class="btn-icon btn-edit" onclick="showEditMessage()">✏️ Edit</button>
              <button class="btn-icon btn-delete" onclick="showDeleteConfirm()">🗑️ Remove</button>
            </div>
          </div>

          <div class="data-table-row">
            <div><strong>Dr. Arjun Sethi</strong><br><small style="color:#94a3b8;">Cardiology</small></div>
            <div>Cardiology</div>
            <div>2</div>
            <div class="action-buttons">
              <button class="btn-icon btn-edit" onclick="showEditMessage()">✏️ Edit</button>
              <button class="btn-icon btn-delete" onclick="showDeleteConfirm()">🗑️ Remove</button>
            </div>
          </div>

          <div class="data-table-row">
            <div><strong>Dr. Meera Joseph</strong><br><small style="color:#94a3b8;">Infectious Diseases</small></div>
            <div>ID / AMS</div>
            <div>2</div>
            <div class="action-buttons">
              <button class="btn-icon btn-edit" onclick="showEditMessage()">✏️ Edit</button>
              <button class="btn-icon btn-delete" onclick="showDeleteConfirm()">🗑️ Remove</button>
            </div>
          </div>
        </div>
      `;
      break;

    case "modules":
      html = `
        <div class="page-header">
          <h1>Module Library</h1>
          <p>Structure and group all learning units by specialty, format, and difficulty.</p>
        </div>

        <div class="admin-grid">
          <div class="card card-accent">
            <h2>By Specialty</h2>
            <div class="pill-row">
              <span class="pill pill-green">Diabetology • 24 modules</span>
              <span class="pill pill-blue">Cardiology • 18 modules</span>
              <span class="pill pill-purple">Critical Care • 12 modules</span>
              <span class="pill pill-amber">Infectious Diseases • 15 modules</span>
            </div>
            <p class="card-note">Use tags like "Case-based", "Guideline Update", or "Skills" to keep modules discoverable.</p>
          </div>

          <div class="card">
            <h2>Recently Updated Modules</h2>
            <ul class="module-list">
              <li>
                <div>
                  <strong>Titrating Insulin in Type 2 Diabetes</strong><br>
                  <small>Diabetology • Case-based</small>
                </div>
                <span class="module-meta">Updated 2 days ago</span>
              </li>
              <li>
                <div>
                  <strong>Acute Coronary Syndrome: Door-to-Balloon Workflow</strong><br>
                  <small>Cardiology • Algorithm</small>
                </div>
                <span class="module-meta">Updated 1 week ago</span>
              </li>
              <li>
                <div>
                  <strong>Sepsis Bundle in ICU: 3-hour and 6-hour Checklist</strong><br>
                  <small>Critical Care • Skills</small>
                </div>
                <span class="module-meta">Updated 3 weeks ago</span>
              </li>
            </ul>
          </div>

          <div class="card">
            <h2>Module Types</h2>
            <div class="module-type-grid">
              <div class="module-type">
                <span class="emoji">📖</span>
                <h3>Theory</h3>
                <p>Guidelines, slide decks, narrated explainers for core concepts.</p>
              </div>
              <div class="module-type">
                <span class="emoji">🩺</span>
                <h3>Case-based</h3>
                <p>Stepwise cases with branching options and final discussion.</p>
              </div>
              <div class="module-type">
                <span class="emoji">🧪</span>
                <h3>Skills & Checklists</h3>
                <p>Procedural skills, ICU protocols, and nursing checklists.</p>
              </div>
              <div class="module-type">
                <span class="emoji">🎥</span>
                <h3>Video Microlearning</h3>
                <p>Short videos for just-in-time refreshers before rounds.</p>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case "assignments":
      html = `
        <div class="page-header">
          <h1>Assignments & Case Submissions</h1>
          <p>Monitor reflective logs, case write-ups, and OSCE-style tasks.</p>
        </div>

        <div class="admin-grid">
          <div class="card">
            <h2>Pending Reviews</h2>
            <div class="data-table compact">
              <div class="data-table-header">
                <div>Learner</div>
                <div>Assignment</div>
                <div>Course</div>
                <div>Due / Status</div>
              </div>
              <div class="data-table-row">
                <div><strong>Dr. Tara Menon</strong></div>
                <div>Case log: Refractory T2DM</div>
                <div>Practical Diabetes Management</div>
                <div><span class="status-badge status-pending">Awaiting Review</span></div>
              </div>
              <div class="data-table-row">
                <div><strong>Nurse John D’Souza</strong></div>
                <div>ICU shift reflection</div>
                <div>Critical Care Basics</div>
                <div><span class="status-badge status-active">In Progress</span></div>
              </div>
              <div class="data-table-row">
                <div><strong>Dr. Lina Shah</strong></div>
                <div>Hypertension case audit</div>
                <div>Hypertension Management</div>
                <div><span class="status-badge status-active">In Marking</span></div>
              </div>
            </div>
          </div>

          <div class="card card-accent">
            <h2>Upcoming Deadlines (Next 7 Days)</h2>
            <ul class="deadline-list">
              <li>
                <strong>Reflective Log: Hypoglycaemia in OPD</strong>
                <span>Due in 2 days • 34 learners</span>
              </li>
              <li>
                <strong>Case Write-up: NSTEMI in a smoker</strong>
                <span>Due in 4 days • 21 learners</span>
              </li>
              <li>
                <strong>ICU Scenario: Septic Shock</strong>
                <span>Due in 6 days • 18 learners</span>
              </li>
            </ul>
            <p class="card-note">In a live LMS, you would trigger reminder emails and push notifications from here.</p>
          </div>
        </div>
      `;
      break;

    case "quizzes":
      html = `
        <div class="page-header">
          <h1>Quizzes & Knowledge Checks</h1>
          <p>Track performance trends, difficulty mix, and pass rates across courses.</p>
        </div>

        <div class="admin-grid">
          <div class="card">
            <h2>Quiz Performance Snapshot</h2>
            <div class="quiz-metrics">
              <div>
                <span class="metric-label">Average Score</span>
                <span class="metric-value">78%</span>
              </div>
              <div>
                <span class="metric-label">Pass Rate</span>
                <span class="metric-value metric-success">86%</span>
              </div>
              <div>
                <span class="metric-label">Attempts this week</span>
                <span class="metric-value">312</span>
              </div>
            </div>
            <div class="mini-bar-chart">
              <div class="mini-bar">
                <span class="mini-bar-label">Diabetes</span>
                <div class="mini-bar-track">
                  <div class="mini-bar-fill" style="width: 82%;"></div>
                </div>
                <span class="mini-bar-value">82%</span>
              </div>
              <div class="mini-bar">
                <span class="mini-bar-label">Hypertension</span>
                <div class="mini-bar-track">
                  <div class="mini-bar-fill" style="width: 76%;"></div>
                </div>
                <span class="mini-bar-value">76%</span>
              </div>
              <div class="mini-bar">
                <span class="mini-bar-label">ICU Basics</span>
                <div class="mini-bar-track">
                  <div class="mini-bar-fill" style="width: 69%;"></div>
                </div>
                <span class="mini-bar-value">69%</span>
              </div>
              <div class="mini-bar">
                <span class="mini-bar-label">ECG Masterclass</span>
                <div class="mini-bar-track">
                  <div class="mini-bar-fill" style="width: 88%;"></div>
                </div>
                <span class="mini-bar-value">88%</span>
              </div>
            </div>
          </div>

          <div class="card">
            <h2>Question Difficulty Mix</h2>
            <div class="difficulty-pills">
              <span class="pill pill-green">Easy • 40%</span>
              <span class="pill pill-amber">Moderate • 45%</span>
              <span class="pill pill-red">Advanced • 15%</span>
            </div>
            <p class="card-note">Aim for a balanced distribution so learners are challenged but not discouraged.</p>
            <ul class="bullet-list">
              <li>Flag items with very low discrimination and consider revising stems or options.</li>
              <li>Use image-based and ECG-based questions for higher-order assessment.</li>
            </ul>
          </div>
        </div>
      `;
      break;

    case "reports":
      html = `
        <div class="page-header">
          <h1>Analytics & Reports</h1>
          <p>Get a high-level view of engagement, completion, and CME credits across your programs.</p>
        </div>

        <div class="analytics-grid">
          <div class="chart-card">
            <h2>Course Completion by Specialty</h2>
            <div class="bar-chart">
              <div class="bar-row">
                <span>Diabetology</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: 78%;"></div>
                </div>
                <span class="bar-value">78%</span>
              </div>
              <div class="bar-row">
                <span>Cardiology</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: 71%;"></div>
                </div>
                <span class="bar-value">71%</span>
              </div>
              <div class="bar-row">
                <span>Critical Care</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: 63%;"></div>
                </div>
                <span class="bar-value">63%</span>
              </div>
              <div class="bar-row">
                <span>Infectious Diseases</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: 69%;"></div>
                </div>
                <span class="bar-value">69%</span>
              </div>
            </div>
          </div>

          <div class="chart-card">
            <h2>Live vs On-Demand Learning</h2>
            <div class="donut-row">
              <div class="donut">
                <div class="donut-ring donut-live"></div>
                <div class="donut-center">
                  <span class="donut-value">42%</span>
                  <span class="donut-label">Live</span>
                </div>
              </div>
              <div class="donut">
                <div class="donut-ring donut-ondemand"></div>
                <div class="donut-center">
                  <span class="donut-value">58%</span>
                  <span class="donut-label">On-Demand</span>
                </div>
              </div>
            </div>
            <p class="card-note">On-demand consumption is growing, but live events still drive peak attention and interaction.</p>
          </div>

          <div class="chart-card">
            <h2>CME Credits Issued (Last 90 Days)</h2>
            <div class="sparkline-row">
              <div class="sparkline-meta">
                <span class="metric-label">Total Credits</span>
                <span class="metric-value metric-success">412</span>
              </div>
              <div class="sparkline-meta">
                <span class="metric-label">Unique HCPs</span>
                <span class="metric-value">176</span>
              </div>
            </div>
            <div class="sparkline-bars">
              <div style="height: 35%;"></div>
              <div style="height: 52%;"></div>
              <div style="height: 68%;"></div>
              <div style="height: 61%;"></div>
              <div style="height: 80%;"></div>
              <div style="height: 72%;"></div>
              <div style="height: 90%;"></div>
            </div>
            <p class="card-note">In a full implementation, this view would be exportable to Excel and filterable by region or specialty.</p>
          </div>
        </div>
      `;
      break;

    default:
      return switchAdminView("courses", el);
  }

  contentArea.innerHTML = html;
}

// --------------------------
// DEFAULT ADMIN VIEW ON LOAD
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  const adminContent = document.getElementById("admin-content-area");
  if (adminContent) {
    const firstSidebarItem = document.querySelector(
      ".admin-sidebar-full .sidebar-item"
    );
    switchAdminView("courses", firstSidebarItem);
  }
});

// --------------------------
// HELPER MODAL / ALERT FNS
// --------------------------
function showEditMessage() {
  alert("This is a demo. In the full LMS, you would open an edit screen here.");
}

function showDeleteConfirm() {
  const ok = confirm(
    "This is a demo. In the full LMS, this would delete the item. Proceed?"
  );
  if (ok) {
    alert("Demo only – no real deletion performed.");
  }
}

function showSuccessModal(title, message, context) {
  alert(title + "\n\n" + message);
}

function downloadCertificate(courseName) {
  alert(
    'Demo only – in the full LMS, a certificate for "' +
      courseName +
      '" would be downloaded.'
  );
}
