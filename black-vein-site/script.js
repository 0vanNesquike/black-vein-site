const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalDesc = document.getElementById("modal-desc");
const masterTitle = document.getElementById("master-title");
const masterText = document.getElementById("master-text");

function openLightbox(src) {
    modal.style.display = "flex";
    modalImg.src = src;
    modalDesc.style.display = "none";
    document.body.style.overflow = "hidden";
}

function openMaster(name, bio, src) {
    modal.style.display = "flex";
    modalImg.src = src;
    modalDesc.style.display = "block";
    masterTitle.innerText = name;
    masterText.innerText = bio;
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
}

window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const sliderTrack = document.getElementById('sliderTrack');
const dotsContainer = document.getElementById('sliderDots');

function createDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function updateSlider() {
    const offset = -currentSlide * 100;
    sliderTrack.style.transform = `translateX(${offset}%)`;

    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

let autoSlideInterval;
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
}

createDots();
startAutoSlide();

const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
        bookingForm.reset();
    });
}

const bookBtn = document.querySelector('.btn-main');
if (bookBtn) {
    bookBtn.addEventListener('click', () => {
        document.getElementById('booking').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

let smokeMachine;
let smokeCanvas;
let smokeCtx;

function initSmoke() {
    smokeCanvas = document.getElementById('smokeCanvas');
    if (!smokeCanvas) return;

    smokeCtx = smokeCanvas.getContext('2d');

    function resizeCanvas() {
        smokeCanvas.width = window.innerWidth;
        smokeCanvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (typeof smokemachine !== 'undefined') {
        smokeMachine = smokemachine(smokeCtx, [25, 25, 30]);
        smokeMachine.start();

        document.addEventListener('mousemove', (e) => {
            if (smokeMachine) {
                const x = e.clientX;
                const y = e.clientY;
                const particleCount = Math.random() * 1.2 + 0.6;
                smokeMachine.addsmoke(x, y, particleCount);
            }
        });

        setInterval(() => {
            if (smokeMachine && Math.random() > 0.8) {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                smokeMachine.addsmoke(x, y, 0.3);
            }
        }, 3000);
    }
}

window.addEventListener('load', initSmoke);

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section, hr, footer').forEach(el => {
    if (!el.classList.contains('fade-in') && !el.classList.contains('slide-up')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    }
});