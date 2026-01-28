const API = 'http://26.47.10.181:3000/api';
let students = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
});

/* ================= LOAD DATA ================= */

async function loadData() {
    const res = await fetch(`${API}/grades`);
    student = await res.json();
    renderScoreTable();
}

/* ================= RENDER TABLE ================= */

function renderScoreTable() {
    const tbody = document.getElementById('scoreTableBody');

    const ranges = Array.from(document.querySelectorAll('.range-config'))
        .map(i => ({
            grade: i.dataset.grade,
            min: parseFloat(i.value) || 0
        }))
        .sort((a, b) => b.min - a.min);

    tbody.innerHTML = students.map(std => {
        let grade = 'F';
        for (const r of ranges) {
            if (std.total >= r.min) {
                grade = r.grade;
                break;
            }
        }

        const badge =
            grade === 'A' ? 'grade-a' :
            grade === 'F' ? 'grade-f' :
            'grade-other';

        return `
            <tr>
                <td>${std.no}</td>
                <td style="text-align:left; padding-left:20px;">${std.name}</td>
                <td colspan="4">—</td>
                <td style="font-weight:bold;">${std.total}</td>
                <td><span class="grade-badge ${badge}">${grade}</span></td>
            </tr>
        `;
    }).join('');
}

/* ================= SAVE GRADE ================= */

async function saveAllGrades() {
    for (const s of students) {
        await fetch(`${API}/grades`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(s)
        });
    }
    Swal.fire('สำเร็จ', 'บันทึกเกรดเรียบร้อย', 'success');
}

/* ================= EVENTS ================= */

function setupEventListeners() {
    document.querySelectorAll('.range-config')
        .forEach(i => i.addEventListener('input', renderScoreTable));

    document.getElementById('saveAllScores')
        .addEventListener('click', saveAllGrades);

    document.getElementById('logoutBtn')
        .addEventListener('click', () => {
            Swal.fire({
                title: 'ออกจากระบบ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#632b2b'
            }).then(r => {
                if (r.isConfirmed) location.reload();
            });
        });
}
