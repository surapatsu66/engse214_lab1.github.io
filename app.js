document.addEventListener('DOMContentLoaded', () => {
    const commentsContainer = document.getElementById('comments-container');
    const commentForm = document.getElementById('comment-form');
    const nameInput = document.getElementById('name-input');
    const commentInput = document.getElementById('comment-input');

    // ฐานข้อมูลจำลองในหน่วยความจำ (เริ่มต้น)
    let comments = [
        { name: "Alice", text: "นี่คือคอมเมนต์แรก!" }
    ];

    const sanitize = (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    function displayComments() {
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');

            const safeName = sanitize(comment.name);
            const safeText = sanitize(comment.text);

            commentElement.innerHTML = `<strong>${safeName}:</strong> ${safeText}`;
            commentsContainer.appendChild(commentElement);
        });
    }

    // เมื่อส่งฟอร์ม
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const text = commentInput.value.trim();

        if (!name || !text) return;

        comments.push({ name, text });  // เพิ่มลงใน "ฐานข้อมูลจำลอง"
        displayComments();

        nameInput.value = '';
        commentInput.value = '';
    });

    // แสดงคอมเมนต์เริ่มต้น
    displayComments();
});