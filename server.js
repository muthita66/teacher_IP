const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

/* ================= MOCK DATABASE ================= */

// นักเรียน
const students = [
    { id: 1, no: 1, name: "เด็กชายฉนวน กันไฟ" },
    { id: 2, no: 2, name: "เด็กชายธนวัฒน์ไชย แม่น้ำปิง" },
    { id: 3, no: 3, name: "เด็กชายไชยพศ ชาละวัน" },
    { id: 4, no: 4, name: "เด็กหญิงมูตี้ ปาละมี" }
];

// คะแนนรายงาน/สอบ (มาจากหน้ากรอกคะแนน)
let scores = [];
/*
รูปแบบข้อมูล:
{
  student_id: 1,
  subject: "ว10101",
  total: 85
}
*/

// เกรด (หน้าตัดเกรด)
let grades = [];

/* ================= API ================= */

// 1️⃣ ดึงรายชื่อนักเรียน
app.get('/api/student', (req, res) => {
    res.json(student);
});

// 2️⃣ บันทึกคะแนนรวม (จากหน้ากรอกคะแนน)
app.post('/api/scores', (req, res) => {
    scores.push(req.body);
    res.json({ message: 'บันทึกคะแนนสำเร็จ' });
});

// 3️⃣ ดูคะแนนทั้งหมด (debug / ใช้ตัดเกรด)
app.get('/api/scores', (req, res) => {
    res.json(scores);
});

// 4️⃣ ดึงข้อมูลสำหรับหน้าตัดเกรด
app.get('/api/grades', (req, res) => {
    const data = student.map(s => {
        const score = scores.find(sc => sc.student_id === s.id);
        return {
            no: s.no,
            name: s.name,
            total: score ? score.total : 0
        };
    });
    res.json(data);
});

// 5️⃣ บันทึกผลเกรด
app.post('/api/grades', (req, res) => {
    grades.push(req.body);
    res.json({ message: 'บันทึกเกรดเรียบร้อย' });
});

// 6️⃣ ดูเกรดทั้งหมด
app.get('/api/grades', (req, res) => {
    res.json(grades);
});

/* ================= START SERVER ================= */

app.listen(3000, '0.0.0.0',() => {
    console.log('Backend running at http://localhost:3000');
});
