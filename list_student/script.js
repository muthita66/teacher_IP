// 1. ข้อมูลนักเรียน (สามารถดึงจาก API ได้ในอนาคต)
const students = [
    { id: 1, name: "เด็กหญิงไชยพศ เผ่า", no: 1, img: "https://i.pravatar.cc/150?u=1", class: "ป.6/1" },
    { id: 2, name: "เด็กชายปอนด์ เอ็กซ์", no: 2, img: "https://i.pravatar.cc/150?u=2", class: "ป.6/1" },
    { id: 3, name: "เด็กหญิงมูตี้ นุซตี้", no: 3, img: "https://i.pravatar.cc/150?u=3", class: "ป.6/1" },
    { id: 4, name: "เด็กชายกฤษฎา โสภณ", no: 4, img: "https://i.pravatar.cc/150?u=4", class: "ป.6/1" },
    { id: 5, name: "เด็กชายพี ที่นี่โสด", no: 5, img: "https://i.pravatar.cc/150?u=5", class: "ป.6/1" },
    { id: 6, name: "เด็กหญิงนารีรัตน์ วังศรี", no: 6, img: "https://i.pravatar.cc/150?u=6", class: "ป.6/1" },
    { id: 7, name: "เด็กชายสมชาย หมายมั่น", no: 7, img: "https://i.pravatar.cc/150?u=7", class: "ป.6/1" },
    { id: 8, name: "เด็กหญิงวิไล พรแสวง", no: 8, img: "https://i.pravatar.cc/150?u=8", class: "ป.6/1" },
];

// 2. ฟังก์ชันแสดงผลการ์ดนักเรียน
function renderStudents() {
    const grid = document.getElementById('studentGrid');
    grid.innerHTML = ''; // ล้างค่าเก่าก่อน

    students.forEach(std => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.innerHTML = `
            <img src="${std.img}" alt="${std.name}">
            <div class="student-info">
                <div class="student-name">${std.name}</div>
                <div class="student-no">เลขที่ ${std.no}</div>
            </div>
        `;

        // Event: เมื่อคลิกที่การ์ด
        card.addEventListener('click', () => {
            // ไฮไลท์การ์ดที่เลือก
            document.querySelectorAll('.student-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            // แสดง Pop-up ข้อมูล
            Swal.fire({
                title: 'ข้อมูลนักเรียน',
                html: `
                    <div style="text-align: left; padding: 10px;">
                        <p><b>ชื่อ-นามสกุล:</b> ${std.name}</p>
                        <p><b>เลขที่:</b> ${std.no}</p>
                        <p><b>ชั้นเรียน:</b> ${std.class}</p>
                    </div>
                `,
                imageUrl: std.img,
                imageWidth: 150,
                imageHeight: 150,
                imageAlt: 'Student Image',
                confirmButtonColor: '#632b2b',
                confirmButtonText: 'ปิด',
                showClass: { popup: 'animate__animated animate__fadeInDown' }
            });
        });

        grid.appendChild(card);
    });
}

// 3. จัดการเมนูด้านซ้าย
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.menu-item.active').classList.remove('active');
        this.classList.add('active');
    });
});

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