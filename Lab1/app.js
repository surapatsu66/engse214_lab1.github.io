// โค้ดส่วนนี้มีช่องโหว่

// 1. สร้างฟังก์ชันสำหรับ Sanitize ข้อมูล
function sanitize(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function displayComments(comments) {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        // 2. ใช้ฟังก์ชัน sanitize กับข้อมูลที่มาจากผู้ใช้ก่อนแสดงผล
        const safeName = sanitize(comment.name);
        const safeText = sanitize(comment.text);
        commentElement.innerHTML = `<strong>${safeName}:</strong> ${safeText}`;
        commentsContainer.appendChild(commentElement);
    });
}
// ... (ส่วน fetch และ post data)

// ดึงคอมเมนต์จาก API
function loadComments() {
    fetch('http://localhost:3000/comments')
        .then(res => {
            if (!res.ok) throw new Error('โหลดคอมเมนต์ไม่สำเร็จ');
            return res.json();
        })
        .then(data => displayComments(data))
        .catch(err => console.error('เกิดข้อผิดพลาด:', err));
}

// ส่งคอมเมนต์ใหม่ไปยัง API
function postComment(name, text) {
    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, text })
    })
    .then(res => {
        if (!res.ok) throw new Error('โพสต์คอมเมนต์ไม่สำเร็จ');
        return res.json();
    })
    .then(() => {
        loadComments(); // โหลดใหม่หลังโพสต์สำเร็จ
        document.getElementById('comment-form').reset(); // ล้างฟอร์ม
    })
    .catch(err => console.error('เกิดข้อผิดพลาดขณะโพสต์:', err));
}

// ฟังชัน submit ฟอร์ม
document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name-input').value.trim();
    const comment = document.getElementById('comment-input').value.trim();
    if (name && comment) {
        postComment(name, comment);
    }
});

// โหลดคอมเมนต์เมื่อหน้าเว็บโหลด
loadComments();
