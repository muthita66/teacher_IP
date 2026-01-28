const students = [
    { no: 1, name: "เด็กชายฉนวน กันไฟ" },
    { no: 2, name: "เด็กชายธนวัฒน์ไชย แม่น้ำปิง" },
    { no: 3, name: "เด็กชายไชยพศ ชาละวัน" },
    { no: 4, name: "เด็กหญิงมูตี้ ปาละมี" }
];

window.onload = () => renderStudents();

function renderStudents() {
    const tbody = document.getElementById('studentList');
    tbody.innerHTML = students.map(s => `
                <tr>
                    <td>${s.no}</td>
                    <td style="text-align:left; padding-left:20px;">${s.name}</td>
                    <td class="total-cell">0</td>
                </tr>
            `).join('');
}

function updateUI() {
    document.getElementById('displaySubject').innerText = document.getElementById('subjectSelect').value;
}

function openModal() { document.getElementById('workModal').style.display = 'block'; }
function closeModal() { document.getElementById('workModal').style.display = 'none'; }

function confirmAddColumn() {
    const name = document.getElementById('workName').value || "งาน";
    const max = parseFloat(document.getElementById('maxScore').value) || 10;
    const headerRow = document.getElementById('headerRow');
    const totalHeader = document.getElementById('totalHeader');
    const tbody = document.getElementById('studentList');

    const newTh = document.createElement('th');
    newTh.innerHTML = `${name}<br><small>(${max})</small>`;
    headerRow.insertBefore(newTh, totalHeader);

    for (let row of tbody.rows) {
        const totalCellIndex = row.cells.length - 1;
        const newCell = row.insertCell(totalCellIndex);
        newCell.innerHTML = `<input type="number" class="score-input" data-max="${max}" value="0" oninput="validateScore(this)">`;
    }
    closeModal();
    Swal.fire('สำเร็จ', 'เพิ่มช่องกรอกคะแนนแล้ว', 'success');
}
// แก้ไขฟังก์ชันเปิด Modal ให้แสดงผลแบบ Flex
function openModal() { 
    document.getElementById('workModal').style.display = 'flex'; 
}

// ฟังก์ชันปิด Modal (คงเดิม)
function closeModal() { 
    document.getElementById('workModal').style.display = 'none'; 
}

function validateScore(input) {
    const max = parseFloat(input.dataset.max);
    let value = parseFloat(input.value) || 0;
    if (value > max) {
        Swal.fire('คะแนนเกิน!', `คะแนนเต็มคือ ${max}`, 'error');
        input.value = max;
        value = max;
    }
    if (value < 0) input.value = 0;

    const row = input.closest('tr');
    const inputs = row.querySelectorAll('.score-input');
    let sum = 0;
    inputs.forEach(inp => sum += (parseFloat(inp.value) || 0));
    row.querySelector('.total-cell').innerText = sum;
}

function handleLogout() {
    Swal.fire({ title: 'ออกจากระบบ?', icon: 'warning', showCancelButton: true });
}

// ฟังก์ชันจัดการสถานะเมนู Active เมื่อมีการคลิก
function setupMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            // ลบ class active ออกจากทุกเมนู
            menuItems.forEach(i => i.classList.remove('active'));
            // เพิ่ม class active ให้เมนูที่ถูกคลิก
            this.classList.add('active');
        });
    });
}

// ระบบยืนยันการออกจากระบบด้วย SweetAlert2
document.getElementById('logoutBtn').addEventListener('click', () => {
    Swal.fire({
        title: 'ยืนยันการออกจากระบบ?',
        text: "คุณต้องการลงชื่อออกหรือไม่",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#632b2b', // ใช้สี Primary ตามธีม
        cancelButtonColor: '#aaa',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('สำเร็จ!', 'คุณออกจากระบบแล้ว', 'success').then(() => {
                location.reload(); // หรือเปลี่ยนหน้าไปที่ login.html
            });
        }
    });
});

// เรียกใช้งานเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => {
    setupMenuInteractions();
});