document.addEventListener('DOMContentLoaded', () => {
    renderScoreTable();
    setupLogout();
});

const studentScores = [
    { no: 1, name: "เด็กชายฉนวน กันไฟ", work1: 8, work2: 7, mid: 9, final: 9 },
    { no: 2, name: "เด็กชายธนวัฒน์ไชย แม่น้ำปิง", work1: 9, work2: 6, mid: 7, final: 8 },
    { no: 3, name: "เด็กชายไชยพศ ชาละวัน", work1: 7, work2: 8, mid: 9, final: 7 },
    { no: 4, name: "เด็กหญิงมูตี้ ปาละมี", work1: 5, work2: 7, mid: 6, final: 5 }
];

function renderScoreTable() {
    const tbody = document.getElementById('scoreTableBody');
    if(!tbody) return;

    tbody.innerHTML = studentScores.map(std => {
        const total = std.work1 + std.work2 + std.mid + std.final;
        return `
            <tr>
                <td>${std.no}</td>
                <td style="text-align: left; padding-left: 20px;">${std.name}</td>
                <td><input type="number" class="score-input" value="${std.work1}" onchange="updateTotal(this)"></td>
                <td><input type="number" class="score-input" value="${std.work2}" onchange="updateTotal(this)"></td>
                <td><input type="number" class="score-input" value="${std.mid}" onchange="updateTotal(this)"></td>
                <td><input type="number" class="score-input" value="${std.final}" onchange="updateTotal(this)"></td>
                <td class="total-cell" style="font-weight: bold; color: #632b2b;">${total}</td>
            </tr>
        `;
    }).join('');
}

function updateTotal(input) {
    const row = input.closest('tr');
    const inputs = row.querySelectorAll('.score-input');
    let total = 0;
    inputs.forEach(i => total += (parseFloat(i.value) || 0));
    row.querySelector('.total-cell').innerText = total;
}

function setupLogout() {
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

// 4. ปุ่มออกจากระบบ
document.getElementById('logoutBtn').addEventListener('click', () => {
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

// เรียกใช้ฟังก์ชันตอนโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', renderStudents);