let slideIndex = 1;
showSlides(slideIndex);

// Hàm thay đổi slide
function changeSlide(n) {
    showSlides(slideIndex += n);
}

// Hàm hiển thị slide hiện tại
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Hàm hiển thị tất cả các slide
function showSlides(n) {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Ẩn tất cả các slide
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", ""); // Xóa class "active" từ tất cả các dot
    }
    
    slides[slideIndex - 1].style.display = "block"; // Hiển thị slide hiện tại
    dots[slideIndex - 1].className += " active"; // Đánh dấu dot hiện tại là "active"
}

document.addEventListener('DOMContentLoaded', function() {
    const countItems = document.querySelectorAll('.count-item');

    countItems.forEach(item => {
        const countNumber = item.querySelector('.count-number');
        const targetCount = parseInt(item.getAttribute('data-count'));
        let count = 0;
        let isCounting = false; // Biến kiểm tra xem đã bắt đầu đếm chưa

        const updateCount = () => {
            count += Math.ceil(targetCount / (2000 / 50)); // Tăng dần
            if (count < targetCount) {
                countNumber.textContent = count;
                setTimeout(updateCount, 50); // Thời gian cập nhật
            } else {
                countNumber.textContent = targetCount; // Đảm bảo đến số cuối cùng
            }
        };

        item.addEventListener('mouseenter', () => {
            if (!isCounting) { // Chỉ bắt đầu đếm nếu chưa bắt đầu
                isCounting = true; // Đánh dấu là đã bắt đầu
                updateCount();
            }
        });
    });
});
