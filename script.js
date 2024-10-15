// Tìm kiếm các vị trí ứng tuyển
document.getElementById('search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase(); // Lấy giá trị tìm kiếm
    const jobItems = document.querySelectorAll('.job-item'); // Lấy tất cả các job-item

    jobItems.forEach(item => {
        const jobTitle = item.querySelector('h3').innerText.toLowerCase(); // Lấy tiêu đề công việc
        item.style.display = jobTitle.includes(searchValue) ? 'block' : 'none'; // Hiển thị hoặc ẩn
    });
});

// Lọc theo văn phòng
function filterJobs() {
    const officeFilter = document.getElementById('office').value; // Lấy giá trị chọn
    const jobItems = document.querySelectorAll('.job-item'); // Lấy tất cả job-item

    jobItems.forEach(item => {
        const office = item.getAttribute('data-office'); // Lấy dữ liệu văn phòng từ thuộc tính
        // Hiển thị hoặc ẩn job-item dựa trên giá trị văn phòng
        item.style.display = (officeFilter === 'all' || office === officeFilter) ? 'block' : 'none';
    });
}


// Khởi tạo EmailJS với User ID của bạn
(function() {
    emailjs.init("user_7AZJetmD5i5FWTUk2"); // Thay "YOUR_USER_ID" bằng user ID của bạn
})();

// Xử lý gửi form
document.getElementById('recruitForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Ngăn chặn hành động mặc định của form

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const position = document.getElementById('position').value;
    const cvFile = document.getElementById('cv').files[0];

    // Đọc file CV và chuyển sang base64
    const reader = new FileReader();
    reader.onload = function(event) {
        const cvBase64 = event.target.result.split(',')[1];  // Loại bỏ phần 'data:application/pdf;base64,'

        // Gửi email qua EmailJS
        emailjs.send("service_5n65ofr", "template_ty2qc1q", {
            from_name: name,
            from_email: email,
            phone: phone,
            position: position,
            cvFile: cvBase64 // Gửi base64 của file CV
        })
        .then(function(response) {
            console.log('Success!', response.status, response.text);
            alert('Thông tin đã được gửi thành công!');
            document.getElementById('recruitForm').reset(); // Reset form sau khi gửi
        }, function(error) {
            console.log('Failed to send:', error);
            alert('Đã xảy ra lỗi, vui lòng thử lại!');
        });
    };
    reader.readAsDataURL(cvFile);  // Đọc file CV
});
