// ===== Mock Data =====
const MOCK = {
  teachers: [
    {
      id: "t001",
      name: "ครูสมศรี ใจดี",
      year: "2567",
      term: "1",
      summary: { total: 4.52, teaching: 4.60, discipline: 4.40, relation: 4.55 },
      categories: [
        { key: "teaching", label: "ด้านการสอน", score: 4.60 },
        { key: "discipline", label: "ด้านวินัย", score: 4.40 },
        { key: "relation", label: "ด้านความสัมพันธ์", score: 4.55 },
        { key: "fairness", label: "ด้านความยุติธรรม", score: 4.50 },
        { key: "support", label: "ด้านการให้คำปรึกษา", score: 4.55 }
      ],
      items: [
        { title: "เตรียมการสอนเป็นระบบ", max: 5, avg: 4.7 },
        { title: "อธิบายเข้าใจง่าย", max: 5, avg: 4.6 },
        { title: "ใช้สื่อ/กิจกรรมเหมาะสม", max: 5, avg: 4.5 },
        { title: "ตรงต่อเวลาและมีวินัย", max: 5, avg: 4.4 },
        { title: "ให้คำปรึกษาและรับฟัง", max: 5, avg: 4.5 }
      ],
      comments: [
        { by: "นักเรียน", date: "2026-01-10", text: "ครูสอนสนุก เข้าใจง่าย และให้โอกาสถามตลอด" },
        { by: "ผู้ปกครอง", date: "2026-01-12", text: "ดูแลเด็กดี มีการสื่อสารกับผู้ปกครอง" }
      ]
    },
    {
      id: "t002",
      name: "ครูณัฐกานต์ วัฒนชัย",
      year: "2567",
      term: "1",
      summary: { total: 4.18, teaching: 4.10, discipline: 4.35, relation: 4.20 },
      categories: [
        { key: "teaching", label: "ด้านการสอน", score: 4.10 },
        { key: "discipline", label: "ด้านวินัย", score: 4.35 },
        { key: "relation", label: "ด้านความสัมพันธ์", score: 4.20 },
        { key: "fairness", label: "ด้านความยุติธรรม", score: 4.15 },
        { key: "support", label: "ด้านการให้คำปรึกษา", score: 4.10 }
      ],
      items: [
        { title: "เตรียมการสอนเป็นระบบ", max: 5, avg: 4.1 },
        { title: "อธิบายเข้าใจง่าย", max: 5, avg: 4.0 },
        { title: "ใช้สื่อ/กิจกรรมเหมาะสม", max: 5, avg: 4.1 },
        { title: "ตรงต่อเวลาและมีวินัย", max: 5, avg: 4.4 },
        { title: "ให้คำปรึกษาและรับฟัง", max: 5, avg: 4.3 }
      ],
      comments: [
        { by: "นักเรียน", date: "2026-01-09", text: "เข้มงวด แต่สอนละเอียดดี" },
        { by: "นักเรียน", date: "2026-01-13", text: "อยากให้เพิ่มกิจกรรมในห้องเรียนอีกนิด" }
      ]
    },
    {
      id: "t003",
      name: "ครูพิมพ์ชนก ศรีสวัสดิ์",
      year: "2567",
      term: "2",
      summary: { total: 4.68, teaching: 4.75, discipline: 4.55, relation: 4.72 },
      categories: [
        { key: "teaching", label: "ด้านการสอน", score: 4.75 },
        { key: "discipline", label: "ด้านวินัย", score: 4.55 },
        { key: "relation", label: "ด้านความสัมพันธ์", score: 4.72 },
        { key: "fairness", label: "ด้านความยุติธรรม", score: 4.65 },
        { key: "support", label: "ด้านการให้คำปรึกษา", score: 4.73 }
      ],
      items: [
        { title: "เตรียมการสอนเป็นระบบ", max: 5, avg: 4.8 },
        { title: "อธิบายเข้าใจง่าย", max: 5, avg: 4.7 },
        { title: "ใช้สื่อ/กิจกรรมเหมาะสม", max: 5, avg: 4.7 },
        { title: "ตรงต่อเวลาและมีวินัย", max: 5, avg: 4.6 },
        { title: "ให้คำปรึกษาและรับฟัง", max: 5, avg: 4.6 }
      ],
      comments: [
        { by: "ผู้บริหาร", date: "2026-01-20", text: "มีความเป็นผู้นำและพัฒนาการสอนได้ดีมาก" }
      ]
    }
  ]
};

// ===== Helpers =====
function $(id){ return document.getElementById(id); }
function fmt2(n){ return (Math.round(n * 100) / 100).toFixed(2); }
function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }
function escapeHtml(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSelectedTeacher(){
  const year = $("yearSelect").value;
  const term = $("termSelect").value;
  const id = $("teacherSelect").value;
  return MOCK.teachers.find(t => t.id === id && t.year === year && t.term === term);
}

// ===== UI Render =====
function populateTeachers() {
  const year = $("yearSelect").value;
  const term = $("termSelect").value;

  const list = MOCK.teachers.filter(t => t.year === year && t.term === term);
  const sel = $("teacherSelect");
  sel.innerHTML = list.map(t => `<option value="${t.id}">${t.name}</option>`).join("");

  if (!list.length) {
    sel.innerHTML = `<option value="">ไม่พบข้อมูลครู</option>`;
    clearView();
    return;
  }

  renderTeacher(list[0].id);
}

function clearView(){
  $("avgTotal").textContent = "-";
  $("avgTeaching").textContent = "-";
  $("avgDiscipline").textContent = "-";
  $("avgRelation").textContent = "-";
  $("progressList").innerHTML = "";
  $("evalTbody").innerHTML = "";
  $("commentList").innerHTML = `<div class="comment"><div class="text">ไม่มีข้อมูล</div></div>`;
}

function renderTeacher(teacherId){
  const year = $("yearSelect").value;
  const term = $("termSelect").value;

  const t = MOCK.teachers.find(x => x.id === teacherId && x.year === year && x.term === term);
  if(!t){ clearView(); return; }

  // Summary
  $("avgTotal").textContent = fmt2(t.summary.total);
  $("avgTeaching").textContent = fmt2(t.summary.teaching);
  $("avgDiscipline").textContent = fmt2(t.summary.discipline);
  $("avgRelation").textContent = fmt2(t.summary.relation);

  // Progress
  $("progressList").innerHTML = t.categories.map(c => {
    const pct = clamp((c.score / 5) * 100, 0, 100);
    return `
      <div class="progress-item">
        <div class="progress-label">${c.label}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="progress-val">${fmt2(c.score)}</div>
      </div>
    `;
  }).join("");

  // ✅ Table (เพิ่มปุ่มดูผล)
  $("evalTbody").innerHTML = t.items.map((it, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td>${escapeHtml(it.title)}</td>
      <td>${it.max}</td>
      <td><b>${fmt2(it.avg)}</b></td>
      <td>
        <button class="btn-mini" onclick="openItemResult(${idx})">
          <i class="fas fa-eye"></i> ดูผล
        </button>
      </td>
    </tr>
  `).join("");

  // Comments
  if (!t.comments.length) {
    $("commentList").innerHTML = `<div class="comment"><div class="text">ยังไม่มีความคิดเห็น</div></div>`;
  } else {
    $("commentList").innerHTML = t.comments.map(c => `
      <div class="comment">
        <div class="meta">${escapeHtml(c.by)} • ${escapeHtml(c.date)}</div>
        <div class="text">${escapeHtml(c.text)}</div>
      </div>
    `).join("");
  }
}

// ===== ✅ Popup Actions =====

// 1) ดูผลรวมครู
function openTeacherSummary(){
  const t = getSelectedTeacher();
  if(!t){
    Swal.fire({ icon:"warning", title:"ไม่พบข้อมูล", text:"กรุณาเลือกครู/ปี/เทอมที่มีข้อมูล" });
    return;
  }

  const catRows = t.categories.map(c => `
    <div style="display:flex;justify-content:space-between;gap:12px;margin:6px 0;">
      <div style="font-weight:700;">${escapeHtml(c.label)}</div>
      <div style="font-weight:800;color:#1b854d;">${fmt2(c.score)}/5</div>
    </div>
  `).join("");

  Swal.fire({
    title: `<div style="color:#632b2b;font-weight:800;">ผลรวมการประเมิน</div>`,
    html: `
      <div style="text-align:left;">
        <div style="font-size:14px;color:#6b7280;margin-bottom:10px;">
          ครู: <b>${escapeHtml(t.name)}</b> • ปี ${t.year} • เทอม ${t.term}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
          <div style="border:1px solid #eee;border-radius:12px;padding:10px;">
            <div style="color:#6b7280;font-size:12px;">คะแนนเฉลี่ยรวม</div>
            <div style="font-size:26px;font-weight:900;color:#1b854d;">${fmt2(t.summary.total)}</div>
          </div>
          <div style="border:1px solid #eee;border-radius:12px;padding:10px;">
            <div style="color:#6b7280;font-size:12px;">ด้านการสอน</div>
            <div style="font-size:22px;font-weight:900;">${fmt2(t.summary.teaching)}</div>
          </div>
          <div style="border:1px solid #eee;border-radius:12px;padding:10px;">
            <div style="color:#6b7280;font-size:12px;">ด้านวินัย</div>
            <div style="font-size:22px;font-weight:900;">${fmt2(t.summary.discipline)}</div>
          </div>
          <div style="border:1px solid #eee;border-radius:12px;padding:10px;">
            <div style="color:#6b7280;font-size:12px;">ด้านความสัมพันธ์</div>
            <div style="font-size:22px;font-weight:900;">${fmt2(t.summary.relation)}</div>
          </div>
        </div>

        <div style="border-top:1px dashed #ddd;padding-top:10px;">
          ${catRows}
        </div>
      </div>
    `,
    confirmButtonText: "ปิด",
    confirmButtonColor: "#632b2b",
    width: 600
  });
}

// 2) ดูผลรายหัวข้อ (จากปุ่มในตาราง)
function openItemResult(index){
  const t = getSelectedTeacher();
  if(!t) return;

  const it = t.items[index];
  if(!it) return;

  const pct = clamp((it.avg / it.max) * 100, 0, 100);

  Swal.fire({
    title: `<div style="color:#632b2b;font-weight:800;">ผลการประเมินรายหัวข้อ</div>`,
    html: `
      <div style="text-align:left;">
        <div style="color:#6b7280;font-size:13px;margin-bottom:8px;">
          ครู: <b>${escapeHtml(t.name)}</b> • ปี ${t.year} • เทอม ${t.term}
        </div>

        <div style="font-weight:800;margin-bottom:10px;">
          ${escapeHtml(it.title)}
        </div>

        <div style="border:1px solid #eee;border-radius:12px;padding:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
            <div style="color:#6b7280;">คะแนนเฉลี่ย</div>
            <div style="font-weight:900;color:#1b854d;font-size:18px;">
              ${fmt2(it.avg)} / ${it.max}
            </div>
          </div>

          <div style="height:12px;background:#eef2ff;border:1px solid #e5e7eb;border-radius:999px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:#303f9f;"></div>
          </div>

          <div style="margin-top:8px;color:#6b7280;font-size:12px;">
            คิดเป็น ${fmt2(pct)}%
          </div>
        </div>

        <div style="margin-top:12px;color:#6b7280;font-size:12px;">
          * (Mockup) ตรงนี้สามารถเพิ่ม “แจกแจงคะแนนรายผู้ประเมิน” ได้ภายหลัง
        </div>
      </div>
    `,
    confirmButtonText: "ปิด",
    confirmButtonColor: "#632b2b",
    width: 600
  });
}

// ทำให้เรียกได้จาก onclick
window.openItemResult = openItemResult;

// ===== Events =====
document.addEventListener("DOMContentLoaded", () => {
  populateTeachers();

  $("yearSelect").addEventListener("change", populateTeachers);
  $("termSelect").addEventListener("change", populateTeachers);

  $("teacherSelect").addEventListener("change", () => {
    const id = $("teacherSelect").value;
    if(id) renderTeacher(id);
  });

  // ปุ่มดูผล (รีเฟรชหน้าหลัก)
  $("btnView").addEventListener("click", () => {
    const id = $("teacherSelect").value;
    if(id) renderTeacher(id);
  });

  // ✅ ปุ่มดูผลรวม
  $("btnViewSummary").addEventListener("click", openTeacherSummary);

  // Logout (mock)
  const logoutBtn = $("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      Swal.fire({
        title: "ยืนยันการออกจากระบบ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#632b2b"
      }).then(r => {
        if(r.isConfirmed) location.reload();
      });
    });
  }
});