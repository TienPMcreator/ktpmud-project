const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Dữ liệu mẫu các dạng bài toán lớp 3 trong "Vườn Toán"
let mathTopics = [
    { id: 1, title: 'Nhân chia trong bảng tính', description: 'Các bài toán tính toán cơ bản lớp 3', totalQuestions: 15 },
    { id: 2, title: 'Tìm x (Tìm thành phần chưa biết)', description: 'Giải phương trình cơ bản cho học sinh tiểu học', totalQuestions: 20 },
    { id: 3, title: 'Giải toán có lời văn', description: 'Các bài toán thực tế về thêm bớt, gấp lên một số lần', totalQuestions: 12 }
];

// API 1: Trang chủ Vườn Toán
app.get('/', (req, res) => {
    res.json({ message: 'Chào mừng đến với Vườn Toán Lớp 3 - Track B!' });
});

// API 2: Lấy danh sách tất cả các dạng bài toán
app.get('/api/topics', (req, res) => {
    res.json(mathTopics);
});

// API 3: Thêm dạng bài mới (Track B yêu cầu)
app.post('/api/topics', (req, res) => {
    const { title, description, totalQuestions } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Tên dạng bài toán không được để trống!' });
    }

    const newTopic = {
        id: mathTopics.length + 1,
        title: title,
        description: description || 'Dạng bài toán luyện tập mới cập nhật',
        totalQuestions: totalQuestions || 10
    };

    mathTopics.push(newTopic);
    res.status(201).json({ 
        message: 'Thêm dạng bài toán lớp 3 mới thành công!', 
        data: newTopic 
    });
});

app.listen(PORT, () => {
    console.log(`Server Vườn Toán đang chạy tại: http://localhost:${PORT}`);
});