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

// ================================
// CERTIFICATE EDITOR – LIVE PREVIEW
// ================================
function initCertificateEditor() {
  const bindings = [
    { inputId: "cert-learner-name", previewId: "cert-preview-learner" },
    { inputId: "cert-course-title", previewId: "cert-preview-course", wrapQuotes: true },
    { inputId: "cert-duration",     previewId: "cert-preview-duration" },
    { inputId: "cert-credits",      previewId: "cert-preview-credits" },
    { inputId: "cert-id",           previewId: "cert-preview-id" },
    { inputId: "cert-sign1-name",   previewId: "cert-preview-sign1-name" },
    { inputId: "cert-sign1-role",   previewId: "cert-preview-sign1-role" },
    { inputId: "cert-sign2-name",   previewId: "cert-preview-sign2-name" },
    { inputId: "cert-sign2-role",   previewId: "cert-preview-sign2-role" }
  ];

  function applyCertificateFormToPreview() {
    bindings.forEach(({ inputId, previewId, wrapQuotes }) => {
      const input = document.getElementById(inputId);
      const previewEl = document.getElementById(previewId);
      if (!input || !previewEl) return;

      let value = input.value || "";
      if (wrapQuotes && value.trim()) {
        value = "“" + value.trim() + "”";
      }

      previewEl.textContent = value;
    });
  }

  // live update while typing
  bindings.forEach(({ inputId }) => {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener("input", applyCertificateFormToPreview);
  });

  const saveBtn = document.getElementById("cert-template-save");
  if (saveBtn) {
    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      applyCertificateFormToPreview();

      if (typeof showSuccessModal === "function") {
        showSuccessModal(
          "Template saved",
          "Your certificate template has been updated. All future previews will use these details.",
          "certificates"
        );
      } else {
        alert("Certificate template saved (demo only).");
      }
    });
  }

  // initial sync
  applyCertificateFormToPreview();
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
          <p>Monitor real-time usage, engagement trends, and course performance across your healthcare programs.</p>
        </div>

        <!-- TOP ROW: REALTIME SNAPSHOT -->
        <div class="dashboard-stats">
          <div class="dashboard-card">
            <h3>Active learners now</h3>
            <div class="value">128</div>
            <div class="change">
              ▲ +14% <span style="color:#6b7280; font-weight:400;">vs last hour</span>
            </div>
          </div>
          <div class="dashboard-card">
            <h3>Today’s logins</h3>
            <div class="value">1,042</div>
            <div class="change">
              ▲ +9% <span style="color:#6b7280; font-weight:400;">vs yesterday</span>
            </div>
          </div>
          <div class="dashboard-card">
            <h3>Avg. course completion</h3>
            <div class="value">76%</div>
            <div class="change">
              ● Stable <span style="color:#6b7280; font-weight:400;">week-on-week</span>
            </div>
          </div>
          <div class="dashboard-card">
            <h3>CME credits issued (30D)</h3>
            <div class="value">412</div>
            <div class="change">
              ▲ +21% <span style="color:#6b7280; font-weight:400;">vs last 30 days</span>
            </div>
          </div>
        </div>

        <!-- MIDDLE ROW: SPECIALTY COMPLETION + LIVE vs ON-DEMAND -->
        <div class="analytics-grid">
          <div class="chart-card">
            <h2>Course completion by specialty</h2>
            <div class="bar-chart">
              <div class="bar-row">
                <span>Diabetology</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: 82%;"></div>
                </div>
                <span class="bar-value">82%</span>
              </div>
              <div class="bar-row">
                <span>Cardiology</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: 74%;"></div>
                </div>
                <span class="bar-value">74%</span>
              </div>
              <div class="bar-row">
                <span>Critical Care</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: 68%;"></div>
                </div>
                <span class="bar-value">68%</span>
              </div>
              <div class="bar-row">
                <span>Infectious Diseases</span>
                <div class="bar-track">
                  <div class="bar-fill" style="width: 71%;"></div>
                </div>
                <span class="bar-value">71%</span>
              </div>
            </div>
          </div>

          <div class="chart-card">
            <h2>Live vs on-demand learning</h2>
            <div class="donut-row">
              <div class="donut">
                <div class="donut-ring donut-live"></div>
                <div class="donut-center">
                  <span class="donut-value">44%</span>
                  <span class="donut-label">Live</span>
                </div>
              </div>
              <div class="donut">
                <div class="donut-ring donut-ondemand"></div>
                <div class="donut-center">
                  <span class="donut-value">56%</span>
                  <span class="donut-label">On-demand</span>
                </div>
              </div>
            </div>
            <p class="card-note">
              In a real deployment, this would read from your webinar & on-demand video integrations.
            </p>
          </div>
        </div>

        <!-- NEW: BEHAVIOUR ANALYTICS + DIGITAL TWIN SNAPSHOT -->
        <div class="behavior-analytics-grid">
          <div class="behavior-card">
            <h2>Behavioural heatmap (demo)</h2>
            <p>
              See exactly when HCPs from each cohort log in and where they drop off inside a pathway.
            </p>
            <div class="behavior-heatmap">
              <div class="behavior-cell" data-level="mid" title="Mon AM"></div>
              <div class="behavior-cell" data-level="high" title="Tue AM"></div>
              <div class="behavior-cell" data-level="high" title="Wed AM"></div>
              <div class="behavior-cell" data-level="mid" title="Thu AM"></div>
              <div class="behavior-cell" data-level="low" title="Fri AM"></div>
              <div class="behavior-cell" data-level="low" title="Sat AM"></div>
              <div class="behavior-cell" data-level="low" title="Sun AM"></div>

              <div class="behavior-cell" data-level="low" title="Mon Noon"></div>
              <div class="behavior-cell" data-level="mid" title="Tue Noon"></div>
              <div class="behavior-cell" data-level="high" title="Wed Noon"></div>
              <div class="behavior-cell" data-level="mid" title="Thu Noon"></div>
              <div class="behavior-cell" data-level="mid" title="Fri Noon"></div>
              <div class="behavior-cell" data-level="low" title="Sat Noon"></div>
              <div class="behavior-cell" data-level="low" title="Sun Noon"></div>

              <div class="behavior-cell" data-level="low" title="Mon PM"></div>
              <div class="behavior-cell" data-level="mid" title="Tue PM"></div>
              <div class="behavior-cell" data-level="mid" title="Wed PM"></div>
              <div class="behavior-cell" data-level="high" title="Thu PM"></div>
              <div class="behavior-cell" data-level="high" title="Fri PM"></div>
              <div class="behavior-cell" data-level="mid" title="Sat PM"></div>
              <div class="behavior-cell" data-level="low" title="Sun PM"></div>
            </div>

            <div class="behavior-legend">
              <span class="low">Low</span>
              <span class="mid">Medium</span>
              <span class="high">High</span>
            </div>

            <p class="card-note" style="margin-top:10px;">
              In production, this would be filterable by brand, speciality, territory and cohort.
            </p>
          </div>

          <div class="digital-twin-admin-card">
            <h2>HCP cohort “digital twin”</h2>
            <p>
              Snapshot of a look-alike group of HCPs based on behaviour, specialty, and quiz performance.
            </p>
            <ul class="bullet-list">
              <li>70% complete all diabetology cases but drop at insulin titration modules.</li>
              <li>Strong engagement with live cardiology webinars, weaker on on-demand videos.</li>
              <li>High pass rates for hypertension MCQs, lower on ECG interpretation OSCEs.</li>
            </ul>
            <p class="card-note">
              Brand teams can design tailored journeys and then watch this “digital twin” move when
              new content or campaigns go live.
            </p>
          </div>
        </div>
      `;
      break;


    case "certificates":
      html = `
        <div class="page-header">
          <h1>Certificates & CME</h1>
          <p>Configure how your completion certificates will look and preview changes in real time.</p>
        </div>

        <div class="admin-grid">
          <!-- LEFT: Template form -->
          <div class="card">
            <h2>Certificate Template</h2>
            <p class="card-note">
              Edit the default text that appears on certificates. This is a demo only; in the live LMS,
              learner name, course, and date will auto-fill.
            </p>

            <form id="cert-template-form" class="cert-form">
              <div class="form-group-full">
                <label for="cert-learner-name">Sample learner name</label>
                <input
                  type="text"
                  id="cert-learner-name"
                  value="Dr. Aisha Verma"
                />
              </div>

              <div class="form-group-full">
                <label for="cert-course-title">Course title</label>
                <input
                  type="text"
                  id="cert-course-title"
                  value="Practical Diabetes Management"
                />
              </div>

              <div class="form-group-full">
                <label for="cert-duration">Duration</label>
                <input
                  type="text"
                  id="cert-duration"
                  value="6 hours (online)"
                />
              </div>

              <div class="form-group-full">
                <label for="cert-credits">CME credits</label>
                <input
                  type="text"
                  id="cert-credits"
                  value="3 Credits"
                />
              </div>

              <div class="form-group-full">
                <label for="cert-id">Certificate ID format (preview)</label>
                <input
                  type="text"
                  id="cert-id"
                  value="OAM-2025-00127"
                />
              </div>

              <div class="form-row" style="margin-top: 12px;">
                <div class="form-field">
                  <label for="cert-sign1-name">Signatory 1 – Name</label>
                  <input
                    type="text"
                    id="cert-sign1-name"
                    value="Dr. Medical Director"
                  />
                </div>
                <div class="form-field">
                  <label for="cert-sign1-role">Signatory 1 – Designation</label>
                  <input
                    type="text"
                    id="cert-sign1-role"
                    value="Program Director"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-field">
                  <label for="cert-sign2-name">Signatory 2 – Name</label>
                  <input
                    type="text"
                    id="cert-sign2-name"
                    value="OneAlphaMed"
                  />
                </div>
                <div class="form-field">
                  <label for="cert-sign2-role">Signatory 2 – Designation</label>
                  <input
                    type="text"
                    id="cert-sign2-role"
                    value="Academic Operations"
                  />
                </div>
              </div>

              <button
                type="button"
                id="cert-template-save"
                class="login-submit"
                style="margin-top: 18px; width: 100%;"
              >
                Save default certificate template
              </button>
            </form>
          </div>

          <!-- RIGHT: Visual preview -->
          <div class="card">
            <h2>Live Preview</h2>
            <p class="card-note">
              This preview updates as you type. In production, learner data will be filled dynamically.
            </p>

            <div class="cert-preview">
              <div class="cert-inner">
                <!-- Top row: logo + seal -->
                <div class="cert-top-row">
                  <div class="cert-logo-box">
                    <span class="cert-logo-main">OneAlphaMed</span>
                    <span class="cert-logo-sub">Healthcare Learning Platform</span>
                  </div>
                  <div class="cert-seal">
                    <span>CME</span>
                  </div>
                </div>

                <!-- Main title -->
                <h3 class="cert-title">CERTIFICATE OF COMPLETION</h3>

                <!-- Main body -->
                <p class="cert-line-small">This is to certify that</p>
                <p class="cert-name" id="cert-preview-learner">Dr. Aisha Verma</p>

                <p class="cert-line-small">has successfully completed the course</p>
                <p class="cert-course" id="cert-preview-course">“Practical Diabetes Management”</p>

                <p class="cert-line-small" id="cert-preview-body-extra">
                  on <strong>12 October 2025</strong>, having met the required learning objectives
                  and assessment criteria for this program.
                </p>

                <!-- Meta row -->
                <div class="cert-meta-row">
                  <div>
                    <span class="cert-meta-label">Duration</span>
                    <span class="cert-meta-value" id="cert-preview-duration">6 hours (online)</span>
                  </div>
                  <div>
                    <span class="cert-meta-label">CME credits</span>
                    <span class="cert-meta-value" id="cert-preview-credits">3 Credits</span>
                  </div>
                  <div>
                    <span class="cert-meta-label">Certificate ID</span>
                    <span class="cert-meta-value" id="cert-preview-id">OAM-2025-00127</span>
                  </div>
                </div>

                <!-- Footer signatures -->
                <div class="cert-footer">
                  <div class="cert-sign-block">
                    <div class="cert-line"></div>
                    <span class="cert-sign-name" id="cert-preview-sign1-name">Dr. Medical Director</span>
                    <span class="cert-sign-role" id="cert-preview-sign1-role">Program Director</span>
                  </div>
                  <div class="cert-sign-block">
                    <div class="cert-line"></div>
                    <span class="cert-sign-name" id="cert-preview-sign2-name">OneAlphaMed</span>
                    <span class="cert-sign-role" id="cert-preview-sign2-role">Academic Operations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case "live-events":
      html = `
        <div class="page-header">
          <h1>Live Events Control</h1>
          <p>Monitor and manage upcoming webinars, virtual CMEs, and hybrid events.</p>
        </div>

        <div class="admin-grid">
          <!-- LEFT: Upcoming events table -->
          <div class="card">
            <h2>Upcoming sessions</h2>
            <p class="card-note">In a full LMS, you would start/stop sessions and track live attendance from here.</p>

            <div class="data-table" style="margin-top:16px;">
              <div class="data-table-header">
                <div>Event</div>
                <div>Date &amp; time</div>
                <div>Status</div>
                <div>Actions</div>
              </div>

              <div class="data-table-row">
                <div>
                  <strong>Diabetes Masterclass: TIR in Practice</strong><br>
                  <small style="color:#94a3b8;">Faculty: Dr. Neha Kulkarni</small>
                </div>
                <div>12 Dec 2025 • 7:30–9:00 PM</div>
                <div><span class="status-badge status-active">Scheduled</span></div>
                <div class="action-buttons">
                  <button class="btn-icon btn-edit" onclick="showSuccessModal('Preview event lobby', 'In a full LMS, this would open the event lobby with waiting-room view.', 'live')">
                    Lobby
                  </button>
                  <button class="btn-icon btn-delete" onclick="showSuccessModal('Start session', 'In a full LMS, this would start the live webinar &amp; attendance tracking.', 'live')">
                    Start
                  </button>
                </div>
              </div>

              <div class="data-table-row">
                <div>
                  <strong>ICU Skills: Sepsis Bundle Walkthrough</strong><br>
                  <small style="color:#94a3b8;">Faculty: Dr. Meera Joseph</small>
                </div>
                <div>18 Dec 2025 • 5:00–6:30 PM</div>
                <div><span class="status-badge status-pending">Draft</span></div>
                <div class="action-buttons">
                  <button class="btn-icon btn-edit" onclick="showEditMessage()">Edit</button>
                  <button class="btn-icon btn-delete" onclick="showDeleteConfirm()">Delete</button>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: Live engagement snapshot -->
          <div class="card">
            <h2>Live engagement snapshot</h2>
            <p class="card-note">Example data for an ongoing event.</p>

            <div class="quiz-metrics" style="margin-top:10px;">
              <div>
                <span class="metric-label">Viewers connected</span>
                <span class="metric-value">326</span>
              </div>
              <div>
                <span class="metric-label">Avg. watch time</span>
                <span class="metric-value">42 min</span>
              </div>
              <div>
                <span class="metric-label">Questions asked</span>
                <span class="metric-value metric-success">48</span>
              </div>
            </div>

            <div class="sparkline-bars" style="margin-top:18px;">
              <div style="height: 35%;"></div>
              <div style="height: 62%;"></div>
              <div style="height: 78%;"></div>
              <div style="height: 71%;"></div>
              <div style="height: 90%;"></div>
              <div style="height: 76%;"></div>
              <div style="height: 82%;"></div>
            </div>

            <p class="card-note" style="margin-top:16px;">
              In a live implementation, this view would update in real-time from your webinar platform or RTMP integrations.
            </p>
          </div>
        </div>
      `;
      break;

    default:
      return switchAdminView("courses", el);
  }

  contentArea.innerHTML = html;

  // Run any view-specific setup AFTER injecting HTML
  if (viewName === "certificates" && typeof initCertificateEditor === "function") {
    initCertificateEditor();
  }
}

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

// --------------------------
// STUDENT – JOURNEY MAP INTERACTION
// --------------------------
const JOURNEY_COPY = {
  1: {
    body:
      "Complete onboarding, profile and speciality selection. In a live LMS, this step would already tailor your catalog and CME suggestions.",
  },
  2: {
    body:
      "Focus on your core guideline modules in diabetology and hypertension. Completion here unlocks advanced case pathways and branded deep-dives.",
  },
  3: {
    body:
      "Work through branching clinical cases that mirror OPD decision-making. Your brand teams can plug in their own molecules or protocols here.",
  },
  4: {
    body:
      "Short knowledge checks and OSCE-style questions reinforce decision-making, not just recall, and feed into the digital twin scoring.",
  },
  5: {
    body:
      "CME certificates, nudges and reminders keep HCPs re-engaging around key guidelines and launch priorities.",
  },
};

function setJourneyStep(step) {
  const steps = document.querySelectorAll(".journey-step");
  const bodyEl = document.getElementById("journey-next-body");
  if (!steps.length || !bodyEl) return;

  steps.forEach((s) => s.classList.remove("active"));
  const active = document.querySelector(`.journey-step[data-step="${step}"]`);
  if (active) active.classList.add("active");

  if (JOURNEY_COPY[step]) {
    bodyEl.textContent = JOURNEY_COPY[step].body;
  }
}

// --------------------------
// STUDENT – BRANCHING CLINICAL PATHWAY INTERACTION
// --------------------------
function handlePathChoice(btn) {
  const all = document.querySelectorAll(".path-option");
  all.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  const titleEl = document.getElementById("path-outcome-title");
  const metaEl = document.getElementById("path-outcome-meta");
  const bodyEl = document.getElementById("path-outcome-body");
  const badgesEl = document.getElementById("path-outcome-badges");

  if (!titleEl || !metaEl || !bodyEl || !badgesEl) return;

  titleEl.textContent = btn.dataset.title || "";
  metaEl.textContent = btn.dataset.meta || "";
  bodyEl.textContent = btn.dataset.body || "";

  badgesEl.innerHTML = "";
  const tags = (btn.dataset.tags || "").split(";");
  tags.forEach((t) => {
    const trimmed = t.trim();
    if (!trimmed) return;
    const span = document.createElement("span");
    span.className = "path-outcome-badge";
    span.textContent = trimmed;
    badgesEl.appendChild(span);
  });
}

// --------------------------
// AI SEARCH – SUGGESTIONS LAYER ON TOP OF HIGHLIGHT SEARCH
// --------------------------
function extendGlobalSearchWithSuggestions() {
  const searchInput = document.querySelector(".nav-search");
  if (!searchInput) return;

  const liWrapper = searchInput.closest("li");
  if (!liWrapper) return;

  const suggestionBox = document.createElement("div");
  suggestionBox.className = "nav-search-suggestions";
  suggestionBox.innerHTML = `
    <div class="nav-search-suggestions-header">Smart suggestions (demo)</div>
    <ul class="nav-search-suggestion-list"></ul>
  `;
  liWrapper.appendChild(suggestionBox);

  const listEl = suggestionBox.querySelector(".nav-search-suggestion-list");

  const CORPUS = [
    { label: "Practical Diabetes Management", meta: "Course • Diabetology" },
    { label: "Hypertension guideline update 2024", meta: "Module • Cardiology" },
    { label: "ICU sepsis bundle checklist", meta: "Protocol • Critical Care" },
    { label: "Titrating insulin in Type 2 Diabetes", meta: "Case • Diabetology" },
    { label: "Door-to-balloon ACS workflow", meta: "Algorithm • Cardiology" },
  ];

  function renderSuggestions(query) {
    const q = (query || "").trim().toLowerCase();
    listEl.innerHTML = "";
    if (!q) {
      suggestionBox.classList.remove("visible");
      return;
    }

    const matches = CORPUS.filter((item) =>
      item.label.toLowerCase().includes(q)
    ).slice(0, 4);

    if (!matches.length) {
      suggestionBox.classList.remove("visible");
      return;
    }

    matches.forEach((item) => {
      const li = document.createElement("li");
      li.className = "nav-search-suggestion";
      li.innerHTML = `
        <span>${item.label}</span>
        <small>${item.meta}</small>
      `;
      li.addEventListener("click", () => {
        searchInput.value = item.label;
        // trigger existing highlight + scroll from setupGlobalSearch
        const event = new Event("input", { bubbles: true });
        searchInput.dispatchEvent(event);
        suggestionBox.classList.remove("visible");
      });
      listEl.appendChild(li);
    });

    suggestionBox.classList.add("visible");
  }

  searchInput.addEventListener("input", (e) => {
    renderSuggestions(e.target.value);
  });

  searchInput.addEventListener("focus", (e) => {
    if (e.target.value.trim()) {
      renderSuggestions(e.target.value);
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !suggestionBox.contains(e.target) &&
      e.target !== searchInput
    ) {
      suggestionBox.classList.remove("visible");
    }
  });
}


// --------------------------
// SMALL TILT EFFECT ON CARDS
// --------------------------
function addTiltEffect(selector) {
  const cards = document.querySelectorAll(selector);
  cards.forEach((card) => {
    const strength = 8;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * strength;
      const rotateX = ((y / rect.height) - 0.5) * -strength;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
}

function setupLogoCarousel() {
  const tracks = document.querySelectorAll(".logo-track");
  if (!tracks.length) return;

  tracks.forEach((track) => {
    // Duplicate content once to make [A A]
    const originalHTML = track.innerHTML;
    track.innerHTML += originalHTML;

    // After duplication, half of scrollWidth = one full A
    const halfWidth = track.scrollWidth / 2;

    const isRight = track.classList.contains("track-right");
    const speed = 0.5; // pixels per frame – tweak if you want

    // Start positions:
    // left row: from 0 → move negative
    // right row: from -halfWidth → move positive
    let offset = isRight ? -halfWidth : 0;

    function step() {
      if (isRight) {
        // move right
        offset += speed;
        // when we've slid all the way to 0, jump back to -halfWidth
        if (offset >= 0) {
          offset = -halfWidth;
        }
      } else {
        // move left
        offset -= speed;
        // when we've slid one full width (−halfWidth), jump back to 0
        if (offset <= -halfWidth) {
          offset = 0;
        }
      }

      track.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  });
}

// --------------------------
// STUDENT – SIDEBAR VIEW SWITCHER
// --------------------------
function switchStudentView(viewName, el) {
  const layout = document.querySelector(".student-layout");
  if (!layout) return;

  const views = layout.querySelectorAll(".student-view");
  views.forEach((view) => {
    view.classList.toggle("active", view.dataset.view === viewName);
  });

  const items = layout.querySelectorAll(".student-sidebar .sidebar-item");
  items.forEach((item) => item.classList.remove("active"));
  if (el) el.classList.add("active");

  // Smooth scroll to top of the layout when switching
  const layoutTop = layout.getBoundingClientRect().top + window.scrollY - 90;
  window.scrollTo({ top: layoutTop, behavior: "smooth" });
}

// --------------------------
// CONTACT FORM – FAST AJAX SUBMIT
// --------------------------
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = document.getElementById("submit-btn");
  const FORM_ENDPOINT = "https://formsubmit.co/ajax/info@onealphamed.com"; // <- put your email

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop normal slow submit

    // UI: show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
          // send all form fields + hidden fields
        body: new FormData(form),
      });

      if (res.ok) {
        form.reset();
        alert("Thank you! Your demo request has been sent.");
      } else {
        alert("Something went wrong while sending. Please try again in a bit.");
      }
    } catch (err) {
      alert("Network error. Please check your internet and try again.");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Request Demo";
      }
    }
  });
}


// --------------------------
// MAIN DOMContentLoaded
// --------------------------
document.addEventListener("DOMContentLoaded", () => {
  setupNavToggle();
  setupScrollReveal();
  setupNavBackground();
  setupAnchorSmoothScroll();
  setupScrollProgressBar();
  setupScrollTopButton();
  setupAdminDefaultView();
  setupGlobalSearch();
  extendGlobalSearchWithSuggestions(); // ⭐ AI suggestions on top
  setupSnapScrollHome();
  setupLogoCarousel();
  setupContactForm();
});


// --------------------------
// NAV TOGGLE (MOBILE)
// --------------------------
function setupNavToggle() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close menu when a nav item (button or link) is clicked
  navLinks.addEventListener("click", (e) => {
    const tag = e.target.tagName.toLowerCase();
    if (tag === "button" || tag === "a") {
      navToggle.classList.remove("open");
      navLinks.classList.remove("open");
    }
  });

  // Close dropdown if window resized to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    }
  });

  // Card tilt
  addTiltEffect(".service-card");
  addTiltEffect(".ai-feature-card");
  addTiltEffect(".why-card");
}

// --------------------------
// SCROLL REVEAL SETUP
// --------------------------
function setupScrollReveal() {
  const revealTargets = document.querySelectorAll(
    ".service-card," +
      ".ai-feature-card," +
      ".why-card," +
      ".faq-item," +
      ".dashboard-card," +
      ".progress-card," +
      ".course-item," +
      ".data-table-row," +
      ".stats-banner," +
      ".step-card"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const revealEls = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return;

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
// NAV: TRANSPARENT -> COLORED ON SCROLL
// --------------------------
function setupNavBackground() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  function getScrollTop() {
    return window.scrollY || document.documentElement.scrollTop;
  }

  function updateNavBackground() {
    if (getScrollTop() > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  updateNavBackground();
  window.addEventListener("scroll", updateNavBackground);
}


// --------------------------
// SMOOTH SCROLL FOR #ANCHORS
// --------------------------
function setupAnchorSmoothScroll() {
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
}

// --------------------------
// SCROLL PROGRESS BAR
// --------------------------
function setupScrollProgressBar() {
  const scrollBar = document.querySelector(".scroll-progress-bar");
  if (!scrollBar) return;

  const pageHome = document.getElementById("page-home");

  function updateProgress() {
    let scrollTop, docHeight, viewport;

    if (pageHome) {
      scrollTop = pageHome.scrollTop;
      viewport = pageHome.clientHeight;
      docHeight = pageHome.scrollHeight - viewport;
    } else {
      scrollTop = window.scrollY || document.documentElement.scrollTop;
      viewport = document.documentElement.clientHeight;
      docHeight =
        document.documentElement.scrollHeight - viewport;
    }

    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollBar.style.width = progress + "%";
  }

  updateProgress();

  if (pageHome) {
    pageHome.addEventListener("scroll", updateProgress);
  } else {
    window.addEventListener("scroll", updateProgress);
  }
}

// --------------------------
// SCROLL TO TOP BUTTON
// --------------------------
function setupScrollTopButton() {
  const scrollTopBtn = document.querySelector(".scroll-top");
  if (!scrollTopBtn) return;

  const pageHome = document.getElementById("page-home");

  function getScrollTop() {
    if (pageHome) return pageHome.scrollTop;
    return window.scrollY || document.documentElement.scrollTop;
  }

  function handleVisibility() {
    const showAt = 200;
    if (getScrollTop() > showAt) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }

  handleVisibility();

  if (pageHome) {
    pageHome.addEventListener("scroll", handleVisibility);
  } else {
    window.addEventListener("scroll", handleVisibility);
  }

  scrollTopBtn.addEventListener("click", () => {
    if (pageHome) {
      pageHome.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

// --------------------------
// DEFAULT ADMIN VIEW ON LOAD
// --------------------------
function setupAdminDefaultView() {
  const adminContent = document.getElementById("admin-content-area");
  if (!adminContent) return;

  const firstSidebarItem = document.querySelector(
    ".admin-sidebar-full .sidebar-item"
  );
  switchAdminView("courses", firstSidebarItem);
}

// --------------------------
// GLOBAL NAV SEARCH – HIGHLIGHT + SCROLL
// --------------------------
function setupGlobalSearch() {
  const searchInput = document.querySelector(".nav-search");
  if (!searchInput) return;

  function getSearchableElements() {
    if (document.querySelector(".student-portal")) {
      return document.querySelectorAll(".course-item");
    }

    if (document.querySelector(".admin-layout")) {
      return document.querySelectorAll(".data-table-row");
    }

    if (document.querySelector(".feature-grid")) {
      return document.querySelectorAll(".feature-card");
    }

    const list = [];
    document
      .querySelectorAll(".service-card, .hub-card, .why-card, .faq-item")
      .forEach((el) => list.push(el));
    return list;
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function clearHighlights(elements) {
    elements.forEach((el) => {
      if (el.dataset.originalHtml) {
        el.innerHTML = el.dataset.originalHtml;
      }
    });
  }

  function highlightAndScroll(term) {
    const elements = getSearchableElements();
    const query = term.toLowerCase().trim();

    if (!query) {
      clearHighlights(elements);
      return;
    }

    clearHighlights(elements);

    const re = new RegExp("(" + escapeRegExp(query) + ")", "gi");
    let firstMatchElement = null;

    elements.forEach((el) => {
      const original = el.dataset.originalHtml || el.innerHTML;

      if (!el.dataset.originalHtml) {
        el.dataset.originalHtml = original;
      }

      if (original.toLowerCase().includes(query)) {
        const newHtml = original.replace(
          re,
          '<span class="search-highlight">$1</span>'
        );
        el.innerHTML = newHtml;

        if (!firstMatchElement) {
          firstMatchElement = el;
        }
      }
    });

    if (firstMatchElement) {
      firstMatchElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  searchInput.addEventListener("input", (e) => {
    highlightAndScroll(e.target.value);
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      highlightAndScroll(e.target.value);
    }
  });
}

// --------------------------
// FULL-PAGE SNAP SCROLL ON HOME
// (2-SCROLL SNAP + TALL SECTION SUPPORT + LAST SMALL SECTION FIX)
// --------------------------
function setupSnapScrollHome() {
  const pageHome = document.getElementById("page-home");
  if (!pageHome) return; // only home page

  const sections = Array.from(pageHome.querySelectorAll(".snap-section"));
  if (!sections.length) return;

  let isSnapping = false;
  let currentIndex = 0;

  // Need multiple wheel "ticks" in same direction before snapping
  const SNAP_THRESHOLD = 2; // ← 2 scrolls as you wanted
  let scrollIntentDirection = null; // "up" | "down"
  let scrollIntentSteps = 0;

  function getScrollPos() {
    return pageHome.scrollTop;
  }

  function getViewportHeight() {
    return pageHome.clientHeight;
  }

  function setActiveSection(index) {
    sections.forEach((sec, i) => {
      sec.classList.toggle("snap-active", i === index);
    });
    currentIndex = index;
  }

  function updateCurrentIndex() {
    const scrollY = getScrollPos();
    const vh = getViewportHeight();

    let closestIndex = 0;
    let closestDistance = Infinity;

    sections.forEach((sec, i) => {
      const top = sec.offsetTop;
      const center = top + sec.offsetHeight / 2;
      const viewportCenter = scrollY + vh / 2;
      const distance = Math.abs(center - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    setActiveSection(closestIndex);
  }

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    if (index === currentIndex) return;

    isSnapping = true;
    const targetTop = sections[index].offsetTop;

    pageHome.scrollTo({
      top: targetTop,
      behavior: "auto",
    });

    setActiveSection(index);

    setTimeout(() => {
      isSnapping = false;
    }, 500);
  }

  // Initial state
  setActiveSection(0);

  pageHome.addEventListener(
    "wheel",
    (e) => {
      if (!sections.length) return;

      const delta = e.deltaY;
      if (delta === 0) return;

      if (isSnapping) {
        e.preventDefault();
        return;
      }

      const direction = delta > 0 ? "down" : "up";

      const currentSection = sections[currentIndex];
      const vh = getViewportHeight();
      const scrollTop = getScrollPos();

      const sectionTop = currentSection.offsetTop;
      const sectionHeight = currentSection.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      const sectionIsTaller = sectionHeight > vh + 10;

      const atTopOfSection = scrollTop <= sectionTop + 2;
      const atBottomOfSection = scrollTop + vh >= sectionBottom - 2;

      let targetIndex = currentIndex;
      let shouldSnapAttempt = false;

      if (sectionIsTaller) {
        // Tall section: free scroll until edges
        if (direction === "down") {
          if (!atBottomOfSection) return;
          targetIndex = currentIndex + 1;
          shouldSnapAttempt = true;
        } else {
          if (!atTopOfSection) return;
          targetIndex = currentIndex - 1;
          shouldSnapAttempt = true;
        }
      } else {
        const isLastSection = currentIndex === sections.length - 1;

        if (direction === "down") {
          if (isLastSection) {
            // last small section → let footer scroll naturally
            return;
          }
          targetIndex = currentIndex + 1;
          shouldSnapAttempt = true;
        } else {
          // direction === "up"
          if (isLastSection && !atTopOfSection) {
            // in the short last section but not at the top → normal scroll
            return;
          }
          targetIndex = currentIndex - 1;
          shouldSnapAttempt = true;
        }
      }

      if (!shouldSnapAttempt || targetIndex < 0 || targetIndex >= sections.length) {
        return;
      }

      // multi-scroll intent logic
      if (scrollIntentDirection !== direction) {
        scrollIntentDirection = direction;
        scrollIntentSteps = 0;
      }

      scrollIntentSteps++;

      if (scrollIntentSteps < SNAP_THRESHOLD) {
        e.preventDefault();
        return;
      }

      scrollIntentSteps = 0;
      e.preventDefault();
      scrollToSection(targetIndex);
    },
    { passive: false }
  );

  pageHome.addEventListener("scroll", () => {
    if (!isSnapping) {
      updateCurrentIndex();
    }
  });

  window.addEventListener("resize", () => {
    updateCurrentIndex();
  });
}

 document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".user-journey-video-wrapper");
    const video = wrapper.querySelector("video");
    const playBtn = wrapper.querySelector(".custom-play-btn");

    let hideTimer;

    function showControlsBriefly() {
      // Show native controls
      if (!video.hasAttribute("controls")) {
        video.setAttribute("controls", "");
      }

      // Reset timer
      clearTimeout(hideTimer);

      // Always hide again after 2.5s
      hideTimer = setTimeout(() => {
        video.removeAttribute("controls");
      }, 2500);
    }

    // First big play button click
    playBtn.addEventListener("click", () => {
      playBtn.style.display = "none";
      video.style.pointerEvents = "auto";
      video.play();
      showControlsBriefly();
    });

    // Only REAL interactions trigger controls:
    // - click on video area
    // - touch (mobile)
    // - play / pause events
    ["click", "touchstart"].forEach((evt) => {
      video.addEventListener(evt, showControlsBriefly);
    });

    video.addEventListener("play", showControlsBriefly);
    video.addEventListener("pause", showControlsBriefly);
  });



