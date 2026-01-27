// 1. ย้ายข้อมูลนักเรียนออกมาเป็น Global Variable เพื่อให้ฟังก์ชันอื่นเรียกใช้และอัปเดตได้
let studentsHealth = [
    { no: 1, name: "เด็กชายฉนวน กันไฟ", weight: 30, height: 138, bmi: "15.7", status: "ผอม", blood: "A", disease: "-", allergy: "ไม่มี" },
    { no: 2, name: "เด็กชายธนวัฒน์ไชย แม่น้ำปิง", weight: 34, height: 142, bmi: "16.9", status: "ปกติ", blood: "O", disease: "หอบหืด", allergy: "ฝุ่น" },
    { no: 3, name: "เด็กชายไชยพศ ชาละวัน", weight: 36, height: 145, bmi: "17.1", status: "ปกติ", blood: "B", disease: "-", allergy: "ไม่มี" },
    { no: 4, name: "เด็กหญิงมูตี้ ปาละมี", weight: 38, height: 147, bmi: "17.6", status: "ปกติ", blood: "AB", disease: "-", allergy: "ไม่มี" },
    { no: 5, name: "เด็กชายมาร์ค หลังสวน", weight: 42, height: 150, bmi: "18.7", status: "ปกติ", blood: "A", disease: "-", allergy: "ไม่มี" },
    { no: 6, name: "เด็กหญิงนารี ศรีวัง", weight: 55, height: 145, bmi: "26.2", status: "อ้วน", blood: "B", disease: "-", allergy: "กุ้ง" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderHealthTable();
});

// 2. ฟังก์ชันวาดตาราง
function renderHealthTable() {
    const tbody = document.getElementById('healthTableBody');
    if (!tbody) return;

    tbody.innerHTML = studentsHealth.map(std => `
        <tr>
            <td>${std.no}</td>
            <td style="text-align: left; padding-left: 20px;">${std.name}</td>
            <td>${std.weight}</td>
            <td>${std.height}</td>
            <td>${std.bmi}</td>
            <td>${std.status}</td>
            <td>
                <button class="btn-edit-action" onclick="handleEdit(${std.no})">
                    <i class="fas fa-edit"></i> แก้ไข
                </button>
            </td>
        </tr>
    `).join('');
}

// 3. ฟังก์ชันจัดการการแก้ไข (ดึงข้อมูลเดิมมาใส่ในฟอร์ม)
function handleEdit(id) {
    const std = studentsHealth.find(s => s.no === id);
    if (!std) return;

    Swal.fire({
        title: '<h3 style="color: #632b2b; margin-bottom: 10px;">แก้ไขข้อมูลสุขภาพ</h3>',
        html: `
            <div class="swal-edit-form" style="text-align: left;">
                <div style="margin-bottom: 15px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 5px;">ชื่อ-นามสกุล:</label>
                    <input id="swal-name" class="swal2-input" value="${std.name}" style="width: 100%; margin: 0;">
                </div>
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    <div style="flex: 1;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">น้ำหนัก (กก.):</label>
                        <input type="number" id="swal-weight" class="swal2-input" value="${std.weight}" style="width: 100%; margin: 0;">
                    </div>
                    <div style="flex: 1;">
                        <label style="display: block; font-weight: bold; margin-bottom: 5px;">ส่วนสูง (ซม.):</label>
                        <input type="number" id="swal-height" class="swal2-input" value="${std.height}" style="width: 100%; margin: 0;">
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 5px;">กรุ๊ปเลือด:</label>
                    <select id="swal-blood" class="swal2-input" style="width: 100%; margin: 0;">
                        <option value="A" ${std.blood === 'A' ? 'selected' : ''}>A</option>
                        <option value="B" ${std.blood === 'B' ? 'selected' : ''}>B</option>
                        <option value="AB" ${std.blood === 'AB' ? 'selected' : ''}>AB</option>
                        <option value="O" ${std.blood === 'O' ? 'selected' : ''}>O</option>
                    </select>
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 5px;">โรคประจำตัว:</label>
                    <input id="swal-disease" class="swal2-input" value="${std.disease || ''}" style="width: 100%; margin: 0;" placeholder="ระบุโรคประจำตัว (ถ้ามี)">
                </div>
                <div>
                    <label style="display: block; font-weight: bold; margin-bottom: 5px;">ประวัติการแพ้ยา/อาหาร:</label>
                    <textarea id="swal-allergy" class="swal2-textarea" style="width: 100%; margin: 0; height: 80px;" placeholder="ระบุประวัติการแพ้">${std.allergy || ''}</textarea>
                </div>
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'บันทึกการแก้ไข',
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: '#1b854d',
        cancelButtonColor: '#717171',
        width: '550px',
        preConfirm: () => {
            const name = document.getElementById('swal-name').value;
            const weight = parseFloat(document.getElementById('swal-weight').value);
            const height = parseFloat(document.getElementById('swal-height').value);
            const blood = document.getElementById('swal-blood').value;
            const disease = document.getElementById('swal-disease').value;
            const allergy = document.getElementById('swal-allergy').value;

            if (!name || !weight || !height) {
                Swal.showValidationMessage('กรุณากรอกชื่อ น้ำหนัก และส่วนสูงให้ครบถ้วน');
                return false;
            }
            return { name, weight, height, blood, disease, allergy };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            updateStudent(id, result.value);
        }
    });
}

// 4. ฟังก์ชันอัปเดตข้อมูลและคำนวณ BMI
function updateStudent(id, data) {
    const index = studentsHealth.findIndex(s => s.no === id);
    if (index !== -1) {
        // สูตรคำนวณ BMI: น้ำหนัก / (ส่วนสูงเมตร ^ 2)
        const heightInMeters = data.height / 100;
        const bmi = (data.weight / (heightInMeters * heightInMeters)).toFixed(1);

        // จัดสถานะ
        let status = "ปกติ";
        if (bmi < 18.5) status = "ผอม";
        else if (bmi >= 23 && bmi < 25) status = "ท้วม";
        else if (bmi >= 25) status = "อ้วน";

        // อัปเดตข้อมูลใน Array
        studentsHealth[index] = {
            ...studentsHealth[index],
            ...data,
            bmi: bmi,
            status: status
        };

        // แจ้งเตือนและรีเฟรชตาราง
        Swal.fire({
            title: 'สำเร็จ!',
            text: 'ปรับปรุงข้อมูลสุขภาพเรียบร้อยแล้ว',
            icon: 'success',
            confirmButtonColor: '#632b2b'
        });
        renderHealthTable();
    }
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
document.getElementById('saveHealth').addEventListener('click', () => {
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