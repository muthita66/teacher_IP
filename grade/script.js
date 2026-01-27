document.addEventListener('DOMContentLoaded', () => {
    renderScoreTable();
    setupEventListeners();
});

// ข้อมูลจำลองนักเรียน
const studentScores = [
    { no: 1, name: "เด็กชายฉนวน กันไฟ", work1: 18, work2: 17, mid: 25, final: 24 },
    { no: 2, name: "เด็กชายธนวัฒน์ไชย แม่น้ำปิง", work1: 15, work2: 12, mid: 20, final: 18 },
    { no: 3, name: "เด็กชายไชยพศ ชาละวัน", work1: 10, work2: 10, mid: 15, final: 10 },
    { no: 4, name: "เด็กหญิงมูตี้ ปาละมี", work1: 19, work2: 19, mid: 28, final: 27 }
];

function renderScoreTable() {
    const tbody = document.getElementById('scoreTableBody');
    if (!tbody) return;

    // ดึงเกณฑ์การตัดเกรดจากหน้าเว็บ
    const ranges = Array.from(document.querySelectorAll('.range-config')).map(input => ({
        grade: input.dataset.grade,
        min: parseFloat(input.value) || 0
    })).sort((a, b) => b.min - a.min);

    tbody.innerHTML = studentScores.map(std => {
        const total = (std.work1 || 0) + (std.work2 || 0) + (std.mid || 0) + (std.final || 0);
        
        // ฟังก์ชันตัดเกรด
        let grade = 'F';
        for (const r of ranges) {
            if (total >= r.min) {
                grade = r.grade;
                break;
            }
        }

        const badgeClass = grade === 'A' ? 'grade-a' : (grade === 'F' ? 'grade-f' : 'grade-other');

        return `
            <tr>
                <td>${std.no}</td>
                <td style="text-align: left; padding-left: 20px;">${std.name}</td>
                <td><input type="number" class="score-input-box" value="${std.work1}" oninput="updateScore(${std.no}, 'work1', this.value)"></td>
                <td><input type="number" class="score-input-box" value="${std.work2}" oninput="updateScore(${std.no}, 'work2', this.value)"></td>
                <td><input type="number" class="score-input-box" value="${std.mid}" oninput="updateScore(${std.no}, 'mid', this.value)"></td>
                <td><input type="number" class="score-input-box" value="${std.final}" oninput="updateScore(${std.no}, 'final', this.value)"></td>
                <td style="font-weight: bold; color: #632b2b;">${total}</td>
                <td><span class="grade-badge ${badgeClass}">${grade}</span></td>
            </tr>
        `;
    }).join('');
}

function updateScore(no, field, value) {
    const student = studentScores.find(s => s.no === no);
    if (student) {
        student[field] = parseFloat(value) || 0;
        renderScoreTable(); // อัปเดตตารางทันทีเมื่อคะแนนเปลี่ยน
    }
}

function setupEventListeners() {
    // อัปเดตตารางเมื่อมีการเปลี่ยนเกณฑ์คะแนน (Range)
    document.querySelectorAll('.range-config').forEach(input => {
        input.addEventListener('input', renderScoreTable);
    });

    // ปุ่มออกจากระบบ
    document.getElementById('logoutBtn').addEventListener('click', () => {
        Swal.fire({
            title: 'ยืนยันการออกจากระบบ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#632b2b',
            confirmButtonText: 'ยืนยัน'
        }).then((result) => {
            if (result.isConfirmed) location.reload();
        });
    });
}
