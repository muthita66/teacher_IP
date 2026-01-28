const API = 'http://26.47.10.181:3000/api';
let student = [];

/* ================= LOAD STUDENTS ================= */

window.onload = async () => {
    const res = await fetch(`${API}/students`);
    student = await res.json();
    renderStudents();
};

/* ================= RENDER ================= */

function renderStudents() {
    const tbody = document.getElementById('studentList');
    tbody.innerHTML = student.map(s => `
        <tr>
            <td>${s.no}</td>
            <td style="text-align:left; padding-left:20px;">${s.name}</td>
            <td class="total-cell">0</td>
        </tr>
    `).join('');
}

/* ================= SUBJECT ================= */

function updateUI() {
    document.getElementById('displaySubject').innerText =
        document.getElementById('subjectSelect').value;
}

/* ================= MODAL ================= */

function openModal() {
    document.getElementById('workModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('workModal').style.display = 'none';
}

/* ================= ADD COLUMN ================= */

function confirmAddColumn() {
    const name = document.getElementById('workName').value || 'งาน';
    const max = parseFloat(document.getElementById('maxScore').value) || 10;

    const headerRow = document.getElementById('headerRow');
    const totalHeader = document.getElementById('totalHeader');
    const tbody = document.getElementById('studentList');

    const th = document.createElement('th');
    th.innerHTML = `${name}<br><small>(${max})</small>`;
    headerRow.insertBefore(th, totalHeader);

    for (let row of tbody.rows) {
        const cell = row.insertCell(row.cells.length - 1);
        cell.innerHTML = `
            <input type="number"
                   class="score-input"
                   data-max="${max}"
                   value="0"
                   oninput="validateScore(this)">
        `;
    }

    closeModal();
    Swal.fire('สำเร็จ', 'เพิ่มช่องกรอกคะแนนแล้ว', 'success');
}

/* ================= VALIDATE SCORE ================= */

function validateScore(input) {
    const max = parseFloat(input.dataset.max);
    let value = parseFloat(input.value) || 0;

    if (value > max) {
        Swal.fire('คะแนนเกิน', `เต็ม ${max}`, 'error');
        input.value = max;
        value = max;
    }

    if (value < 0) input.value = 0;

    const row = input.closest('tr');
    let sum = 0;
    row.querySelectorAll('.score-input').forEach(i => {
        sum += parseFloat(i.value) || 0;
    });

    row.querySelector('.total-cell').innerText = sum;
}

/* ================= SAVE SCORE ================= */

async function saveAllScores() {
    const rows = document.querySelectorAll('#studentList tr');

    for (let i = 0; i < rows.length; i++) {
        const total = rows[i].querySelector('.total-cell').innerText;

        await fetch(`${API}/scores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                student_id: student[i].id,
                subject: document.getElementById('subjectSelect').value,
                total_score: total
            })
        });
    }

    Swal.fire('บันทึกแล้ว', 'คะแนนถูกบันทึกทั้งหมด', 'success');
}
