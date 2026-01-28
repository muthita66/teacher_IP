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
    if (!tbody) return;
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
            <td>
                <button class="btn-evaluate" onclick="openEvaluation('${std.id}', '${std.name}')">
                    <i class="fas fa-user-check"></i> ประเมิน
                </button>
            </td>
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

// ฟังก์ชันสำหรับอัปเดตสีเส้น Slider (เส้นสีน้ำเงินวิ่งตามนิ้ว)
function updateSliderColor(el) {
    const val = (el.value - el.min) / (el.max - el.min) * 100;
    el.style.background = `linear-gradient(to right, #007bff ${val}%, #ddd ${val}%)`;
    // อัปเดตตัวเลข % ด้านข้าง
    const targetId = el.getAttribute('data-target');
    if (targetId) document.getElementById(targetId).innerText = el.value + '%';
}

// แก้ชื่อฟังก์ชันให้ตรงกับที่เรียกจากปุ่มในตาราง
function openEvaluation(id, name) {
    Swal.fire({
        title: '<h2 style="color: #632b2b; font-weight: bold;">ประเมินสมรรถนะนักเรียน</h2>',
        html: `
            <div style="text-align: left; font-size: 14px; margin-bottom: 15px; color: #666;">
                นักเรียน: <b>${name}</b> (รหัส ${id}) • เลขที่ 1 • ม.1
            </div>
            
            <div class="eval-item">
                <div class="eval-label"><span>ด้านวิชาการและการเรียนรู้</span> <span id="val1" class="score-text">85%</span></div>
                <input type="range" class="eval-slider" min="0" max="100" value="85" data-target="val1" oninput="updateSliderColor(this)">
            </div>

            <div class="eval-item">
                <div class="eval-label"><span>ด้านคุณธรรม จริยธรรม</span> <span id="val2" class="score-text">92%</span></div>
                <input type="range" class="eval-slider" min="0" max="100" value="92" data-target="val2" oninput="updateSliderColor(this)">
            </div>

            <div class="eval-item">
                <div class="eval-label"><span>ด้านความเป็นผู้นำและการทำงานเป็นทีม</span> <span id="val3" class="score-text">78%</span></div>
                <input type="range" class="eval-slider" min="0" max="100" value="78" data-target="val3" oninput="updateSliderColor(this)">
            </div>

            <div class="eval-item">
                <div class="eval-label"><span>ด้านเทคโนโลยีสารสนเทศ</span> <span id="val3" class="score-text">78%</span></div>
                <input type="range" class="eval-slider" min="0" max="100" value="78" data-target="val3" oninput="updateSliderColor(this)">
            </div>

            <div style="text-align: left; margin-top: 15px;">
                <label style="color: #303f9f; font-weight: bold; display: block; margin-bottom: 5px;">ความเห็นจากอาจารย์ที่ปรึกษา</label>
                <textarea id="evalComment" class="eval-textarea" placeholder="พิมพ์ความเห็น..."></textarea>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'บันทึกและส่งผล',
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: '#27ae60',
        cancelButtonColor: '#aaa',
        width: '600px',
        didOpen: () => {
            // ทำให้เส้นสีแสดงผลทันทีที่เปิด Modal
            const sliders = document.querySelectorAll('.eval-slider');
            sliders.forEach(s => updateSliderColor(s));
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('สำเร็จ!', 'บันทึกผลการประเมินเรียบร้อย', 'success');
        }
    });
}

// จัดการสถานะเมนู Active
function setupMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
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

// เรียกใช้ฟังก์ชันตอนโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', renderStudents);