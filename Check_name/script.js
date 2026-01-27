// 1. ตัวแปรเก็บวันที่ปัจจุบันสำหรับการเลื่อนวัน
let currentDateContext = new Date();

document.addEventListener('DOMContentLoaded', () => {
    // แสดงวันที่ครั้งแรก
    updateDateDisplay();

    // 2. จัดการปุ่มเปลี่ยนวันที่ (ย้อนหลัง - ถัดไป)
    const prevBtn = document.querySelector('.btn-date:first-child');
    const nextBtn = document.querySelector('.btn-date:last-child');

    prevBtn.addEventListener('click', () => {
        currentDateContext.setDate(currentDateContext.getDate() - 1);
        updateDateDisplay();
    });

    nextBtn.addEventListener('click', () => {
        currentDateContext.setDate(currentDateContext.getDate() + 1);
        updateDateDisplay();
    });

    // เรียกฟังก์ชันอื่นๆ
    renderAttendanceTable();
    setupMenuInteractions();
});

// ฟังก์ชันอัปเดตตัวอักษรวันที่ในแถบสีครีม
function updateDateDisplay() {
    const dateSpan = document.getElementById('currentDate');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateSpan.innerText = currentDateContext.toLocaleDateString('th-TH', options);
}

// ฟังก์ชันสร้างตารางเช็คชื่อ (ตัวอย่างข้อมูลจากรูป)
function renderAttendanceTable() {
    const students = [
        { id: "0001", name: "นารีรัตน์ วังศรี", no: 1 },
        { id: "0002", name: "นารีรัตน์ วังศรี", no: 2 },
        { id: "0003", name: "นารีรัตน์ วังศรี", no: 3, note: "ลาป่วย" },
        { id: "0004", name: "นารีรัตน์ วังศรี", no: 4 },
    ];
    const tbody = document.getElementById('attendanceBody');
    if(!tbody) return;
    tbody.innerHTML = ''; 

    students.forEach(std => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${std.no}</td>
            <td>${std.id}</td>
            <td style="text-align: left;">${std.name}</td>
            <td>
                <div class="status-group">
                    <i class="fas fa-check-circle active" title="มา"></i>
                    <i class="fas fa-times-circle" title="ขาด"></i>
                    <i class="fas fa-clock" title="สาย"></i>
                </div>
            </td>
            <td><input type="text" value="${std.note || ''}" class="note-input" placeholder=""></td>
        `;
        
        // ลูกเล่นการคลิกเลือกสถานะในแถว
        const icons = tr.querySelectorAll('.status-group i');
        icons.forEach(icon => {
            icon.addEventListener('click', () => {
                icons.forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
            });
        });
        tbody.appendChild(tr);
    });
}

// จัดการสถานะเมนู Active
function setupMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ปุ่มออกจากระบบ
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


// ปุ่มบันทึก
document.getElementById('saveAll').addEventListener('click', () => {
    Swal.fire({
        title: 'ยืนยันการบันทึก?',
        text: "คุณต้องการบันทึกข้อมูลหรือไม่",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#632b2b',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    })
    .then((result) => {
        if (result.isConfirmed) {
            Swal.fire('สำเร็จ!', 'คุณบันทึกข้อมูลเรียบร้อยแล้ว', 'success').then(() => {
                location.reload();
            });
        }
    });
})

// เรียกใช้ฟังก์ชันตอนโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', renderStudents);