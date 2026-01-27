// ====== ข้อมูลนักเรียนตัวอย่าง ======
const students = [
  { id: "0001", name: "นารีรัตน์ วังศรี", no: 1, className: "ม.1" },
  { id: "0002", name: "ธนวัฒน์ไชย แม่น้ำปิง", no: 2, className: "ม.1" },
  { id: "0003", name: "เด็กชายไชยพศ ชาละวัน", no: 3, className: "ม.1" },
  { id: "0004", name: "เด็กหญิงมูตี้ ปาละมี", no: 4, className: "ม.1" },
  { id: "0005", name: "เด็กหญิงภัทรวดี นาคใจดี", no: 5, className: "ม.1" },
  { id: "0006", name: "เด็กชายวรเมธ ก้องไกล", no: 6, className: "ม.1" },
];

// หัวข้อประเมิน (ตามรูป)
const competencyTopics = [
  { key: "academic", label: "ด้านวิชาการและการเรียนรู้", default: 85 },
  { key: "ethics", label: "ด้านคุณธรรม จริยธรรม", default: 92 },
  { key: "leadership", label: "ด้านความเป็นผู้นำและการทำงานเป็นทีม", default: 78 },
  { key: "it", label: "ด้านเทคโนโลยีสารสนเทศ", default: 88 },
];

let selectedStudentId = null;

// ====== Render ======
function renderStudentGrid() {
  const grid = document.getElementById("studentGrid");
  if (!grid) return;

  const q = (document.getElementById("searchInput")?.value || "").trim().toLowerCase();
  const classValue = document.getElementById("classSelect")?.value || "m1";
  const classText = mapClassValueToText(classValue);

  const filtered = students.filter(s => {
    const matchClass = !classText ? true : (s.className === classText);
    const matchQuery = !q || s.id.toLowerCase().includes(q) || s.name.toLowerCase().includes(q);
    return matchClass && matchQuery;
  });

  grid.innerHTML = filtered.map(s => {
    const stored = getEvaluationFromLocal(s.id);
    const isDone = !!stored;

    const badgeHtml = isDone
      ? `<div class="badge done"><i class="fas fa-circle-check"></i> ประเมินแล้ว</div>`
      : `<div class="badge pending"><i class="fas fa-circle-exclamation"></i> ยังไม่ประเมิน</div>`;

    const btnClass = isDone ? "edit" : "eval";
    const btnText = isDone ? "แก้ไขการประเมิน" : "ประเมิน";
    const btnIcon = isDone ? "fa-pen-to-square" : "fa-pen";

    return `
      <div class="student-card ${selectedStudentId === s.id ? "selected" : ""}" data-id="${s.id}">
        ${badgeHtml}
        <img src="https://i.pravatar.cc/120?u=${encodeURIComponent(s.id)}" alt="avatar"/>
        <div class="student-info">
          <div class="student-name">${escapeHtml(s.name)}</div>
          <div class="student-no">เลขที่ ${s.no} • รหัส ${s.id} • ${escapeHtml(s.className)}</div>
        </div>
        <!-- ปุ่มประเมินถูกย้ายไปอยู่ใน Modal รายละเอียดแทน -->
      </div>
    `;
  }).join("");

  // bind click
  grid.querySelectorAll(".student-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      const student = students.find(x => x.id === id);
      if (student) {
        openStudentDetailModal(student);
      }
    });
  });
}

function openStudentDetailModal(student) {
  const old = getEvaluationFromLocal(student.id);
  const isDone = !!old;
  const statusHtml = isDone
    ? `<div style="color:#1b854d;font-weight:bold;margin-top:5px;"><i class="fas fa-circle-check"></i> ประเมินแล้ว (${formatThaiDateTime(old.updatedAt)})</div>`
    : `<div style="color:#f59e0b;font-weight:bold;margin-top:5px;"><i class="fas fa-circle-exclamation"></i> ยังไม่ประเมิน</div>`;

  Swal.fire({
    title: `<div style="color:#303f9f;font-weight:900;">ข้อมูลนักเรียน</div>`,
    html: `
      <div style="margin-bottom:15px;">
        <img src="https://i.pravatar.cc/150?u=${encodeURIComponent(student.id)}"
             style="width:120px;height:120px;border-radius:50%;object-fit:cover;border:4px solid #eee;box-shadow:0 4px 10px rgba(0,0,0,0.1);margin-bottom:10px;">
        <h3 style="margin:0;color:#333;">${escapeHtml(student.name)}</h3>
        <p style="color:#666;font-size:14px;margin-top:4px;">
          รหัส ${student.id} • เลขที่ ${student.no} • ${escapeHtml(student.className)}
        </p>
        ${statusHtml}
      </div>
      <div style="background:#f9f9f9;padding:10px;border-radius:10px;text-align:left;font-size:13px;color:#555;margin-bottom:20px;">
        <p><b>สถิติการมาเรียน:</b> 98%</p>
        <p><b>เกรดเฉลี่ยสะสม:</b> 3.45</p>
        <p><b>ความถนัด:</b> ศิลปะ, คอมพิวเตอร์</p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: isDone ? '<i class="fas fa-pen-to-square"></i> แก้ไขการประเมิน' : '<i class="fas fa-pen"></i> ประเมินสมรรถนะ',
    cancelButtonText: "ปิด",
    confirmButtonColor: isDone ? "#1b854d" : "#f59e0b",
    cancelButtonColor: "#aaa",
    showCloseButton: true,
    width: 800,
  }).then((result) => {
    if (result.isConfirmed) {
      openEvaluateModal(student);
    }
  });
}

function setSelectedCard(studentId) {
  selectedStudentId = studentId;
  document.querySelectorAll(".student-card").forEach(c => {
    c.classList.toggle("selected", c.getAttribute("data-id") === studentId);
  });
}

// ====== Modal ประเมิน ======
function openEvaluateModal(student) {
  setSelectedCard(student.id);

  const old = getEvaluationFromLocal(student.id); // ถ้ามีของเก่า
  const oldScores = old?.scores || {};
  const oldComment = old?.comment || "";

  const rowsHtml = competencyTopics.map(t => {
    const initial = Number(oldScores[t.key] ?? t.default);
    return `
      <div class="eval-row">
        <div>
          <label>${escapeHtml(t.label)}</label>
          <input type="range" min="0" max="100" value="${initial}"
            id="range_${t.key}"
            oninput="document.getElementById('val_${t.key}').innerText=this.value+'%'" />
        </div>
        <div class="eval-score" id="val_${t.key}">${initial}%</div>
      </div>
    `;
  }).join("");

  Swal.fire({
    title: `<div style="color:#632b2b;font-weight:900;">${old ? "แก้ไขผลประเมิน" : "ประเมินสมรรถนะนักเรียน"}</div>`,
    html: `
      <div style="text-align:left;color:#6b7280;font-size:13px;margin-bottom:10px;">
        นักเรียน: <b>${escapeHtml(student.name)}</b> (รหัส ${student.id}) • เลขที่ ${student.no} • ${escapeHtml(student.className)}
        ${old?.updatedAt ? `<br><span style="font-size:12px;">ประเมินล่าสุด: ${formatThaiDateTime(old.updatedAt)}</span>` : ""}
      </div>

      <div class="eval-form">
        ${rowsHtml}

        <div style="margin-top:12px;">
          <label style="font-weight:900;color:#303f9f;">ความเห็นจากอาจารย์ที่ปรึกษา</label>
          <textarea id="teacherComment" class="eval-textarea"
            placeholder="พิมพ์ความเห็น...">${escapeHtml(oldComment)}</textarea>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "บันทึกและส่งผล",
    cancelButtonText: "ยกเลิก",
    confirmButtonColor: "#1b854d",
    cancelButtonColor: "#aaa",
    width: 900,
    preConfirm: () => {
      const scores = {};
      competencyTopics.forEach(t => {
        const el = document.getElementById(`range_${t.key}`);
        scores[t.key] = Number(el?.value ?? 0);
      });

      const comment = (document.getElementById("teacherComment")?.value || "").trim();
      if (!comment) {
        Swal.showValidationMessage("กรุณาใส่ความเห็นจากอาจารย์ที่ปรึกษาอย่างน้อย 1 ข้อความ");
        return false;
      }
      return { scores, comment };
    }
  }).then(res => {
    if (res.isConfirmed) {
      saveEvaluationToLocal(student, res.value.scores, res.value.comment);

      Swal.fire({
        icon: "success",
        title: "บันทึกสำเร็จ!",
        html: `ตั้งค่าสถานะเป็น <b>ประเมินแล้ว</b> เรียบร้อย`,
        confirmButtonColor: "#632b2b"
      }).then(() => {
        // รีเรนเดอร์ให้ badge/ปุ่มเปลี่ยนทันที
        renderStudentGrid();
        setSelectedCard(student.id);
      });
    }
  });
}

// ====== localStorage ======
function storageKey(studentId) {
  return `competency_result_${studentId}`;
}

function getEvaluationFromLocal(studentId) {
  try {
    const raw = localStorage.getItem(storageKey(studentId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveEvaluationToLocal(student, scores, comment) {
  const payload = {
    studentId: student.id,
    studentName: student.name,
    studentNo: student.no,
    className: student.className,
    scores,
    comment,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(storageKey(student.id), JSON.stringify(payload));
  localStorage.setItem("competency_result_latest", JSON.stringify(payload));
}

// ====== utils ======
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function mapClassValueToText(v) {
  const m = { m1: "ม.1", m2: "ม.2", m3: "ม.3", m4: "ม.4", m5: "ม.5", m6: "ม.6" };
  return m[v] || "";
}

function formatThaiDateTime(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("th-TH", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

// ====== init ======
document.addEventListener("DOMContentLoaded", () => {
  renderStudentGrid();

  document.getElementById("searchInput")?.addEventListener("input", renderStudentGrid);
  document.getElementById("classSelect")?.addEventListener("change", () => {
    selectedStudentId = null;
    renderStudentGrid();
  });

  // logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      Swal.fire({
        title: 'ยืนยันการออกจากระบบ?',
        text: "คุณต้องการลงชื่อออกหรือไม่",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#632b2b',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('สำเร็จ!', 'คุณออกจากระบบแล้ว', 'success').then(() => {
            location.reload();
          });
        }
      });
    });
  }
});