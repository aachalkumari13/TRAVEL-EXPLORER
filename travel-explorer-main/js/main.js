// Smooth scroll for navigation
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Modal for destination cards
const cards = document.querySelectorAll('.card');
const modal = document.createElement('div');
modal.className = 'modal';
modal.style.display = 'none';
modal.innerHTML = `
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <img class="modal-img" src="" alt="">
        <h3 class="modal-title"></h3>
        <p class="modal-desc"></p>
    </div>
`;
document.body.appendChild(modal);

cards.forEach(card => {
    card.addEventListener('click', function() {
        const img = card.querySelector('img');
        const title = card.querySelector('h3');
        const desc = card.querySelector('p');
        modal.querySelector('.modal-img').src = img.src;
        modal.querySelector('.modal-img').alt = img.alt;
        modal.querySelector('.modal-title').textContent = title.textContent;
        modal.querySelector('.modal-desc').textContent = desc.textContent;
        modal.style.display = 'flex';
    });
});

modal.querySelector('.modal-close').onclick = () => {
    modal.style.display = 'none';
};
modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
};

// Contact form validation and feedback
const form = document.getElementById('contactForm');
const message = document.getElementById('formMessage');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const [name, email, textarea] = form.querySelectorAll('input, textarea');
        let error = '';
        if (!name.value.trim()) error = 'Please enter your name.';
        else if (!email.value.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email.value)) error = 'Please enter a valid email.';
        else if (!textarea.value.trim()) error = 'Please enter your message.';
        if (error) {
            message.style.color = '#d90429';
            message.textContent = error;
        } else {
            message.style.color = '#0077b6';
            message.textContent = "Thank you for contacting us! We'll get back to you soon.";
            form.reset();
            setTimeout(() => { message.textContent = ''; }, 4000);
        }
    });
}

// Modal styles (add to your CSS file for best results)
const modalStyle = document.createElement('style');
modalStyle.textContent = `
.modal {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center;
    z-index: 1000;
}
.modal-content {
    background: #fff; border-radius: 18px; padding: 2rem 1.5rem; max-width: 350px; width: 90vw;
    box-shadow: 0 8px 32px rgba(31,38,135,0.18); text-align: center; position: relative;
    animation: fadeIn 0.4s;
}
.modal-img {
    width: 100%; border-radius: 12px; margin-bottom: 1rem; max-height: 180px; object-fit: cover;
}
.modal-title { color: #0077b6; margin: 0.5rem 0 0.7rem 0; }
.modal-desc { color: #444; font-size: 1.05rem; }
.modal-close {
    position: absolute; top: 10px; right: 18px; font-size: 2rem; color: #0077b6; cursor: pointer;
    font-weight: bold; transition: color 0.2s;
}
.modal-close:hover { color: #ffd700; }
`;
document.head.appendChild(modalStyle);