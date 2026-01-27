// Set today's date in form
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('actStartDate').value = today;
});

function selectColor(el) {
    document.querySelectorAll('.color-option').forEach(e => e.classList.remove('active'));
    el.classList.add('active');
}

function resetForm() {
    document.getElementById('activityForm').reset();
    document.getElementById('budgetAlert').classList.add('d-none');
    document.getElementById('actBudget').classList.remove('is-invalid');
}

// --- SWIMLANE LOGIC IMPLEMENTATION ---
function saveAndApprove() {
    // 1. รับค่า (Get Data)
    const topic = document.getElementById('actTopic').value;
    const startDate = document.getElementById('actStartDate').value;
    const budget = parseFloat(document.getElementById('actBudget').value) || 0;
    const teacher = document.getElementById('actTeacher').value;

    // 2. ตรวจสอบข้อมูลเบื้องต้น (Basic Validation)
    if (!topic || !startDate) {
        alert("กรุณากรอกหัวข้อกิจกรรมและวันที่เริ่มต้น");
        return;
    }

    // 3. Logic ตรวจสอบงบประมาณ (Check Budget & Data) - ตาม Swimlane
    const BUDGET_LIMIT = 50000; // สมมติเพดานงบประมาณ

    if (budget > BUDGET_LIMIT) {
        // Condition: ไม่ผ่าน (Fail)
        // Swimlane Action: แจ้งเตือน ข้อมูลไม่ครบ/งบเกิน
        alert("❌ การอนุมัติไม่ผ่าน: งบประมาณเกินกำหนด (" + BUDGET_LIMIT.toLocaleString() + " บาท)");

        // Highlight error field
        const budgetInput = document.getElementById('actBudget');
        budgetInput.classList.add('is-invalid');
        document.getElementById('budgetAlert').classList.remove('d-none');
        budgetInput.focus();

        // Swimlane Flow: วนกลับไปแก้ไข (User Edits)
        return;
    }

    // 4. Condition: ผ่าน (Pass)
    // Swimlane Action: บันทึกและติดตามสถานะ -> แสดงผลสำเร็จ
    console.log("Saving Activity:", { topic, budget, teacher });

    alert("✅ บันทึกกิจกรรมและส่งอนุมัติเรียบร้อยแล้ว");

    // Close Modal
    const modalEl = document.getElementById('activityModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    // (Optional) Add dummy event to table visually...
}