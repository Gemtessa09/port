// Wait for the DOM to fully load

document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scrolling for Navigation and Footer Links
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Contact Form Validation
    
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;

            // Reset previous error styles
            [nameInput, emailInput, messageInput].forEach(input => {
                if (input) input.style.borderColor = '';
            });

            // Name validation
            if (!nameInput || nameInput.value.trim().length < 2) {
                isValid = false;
                if (nameInput) nameInput.style.borderColor = 'red';
                alert('Name must be at least 2 characters long.');
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput || !emailPattern.test(emailInput.value.trim())) {
                isValid = false;
                if (emailInput) emailInput.style.borderColor = 'red';
                alert('Please enter a valid email address.');
            }

            // Message validation
            if (!messageInput || messageInput.value.trim().length < 10) {
                isValid = false;
                if (messageInput) messageInput.style.borderColor = 'red';
                alert('Message must be at least 10 characters long.');
            }

            if (!isValid) {
                e.preventDefault(); // Prevent form submission if invalid
            }
        });
    }

    // Back-to-Top Button

    const backToTopBtn = document.createElement('button');
    backToTopBtn.textContent = '↑ Top';
    backToTopBtn.classList.add('btn', 'btn-primary', 'back-to-top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Skills Section Toggle for Mobile

    const skillsCategories = document.querySelectorAll('.skills-category h4');
    skillsCategories.forEach(category => {
        const ul = category.nextElementSibling;
        if (ul) {
            // Set initial state for mobile

            if (window.innerWidth <= 767) {
                ul.style.display = 'none';
            }
            category.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
    });

    // Dynamic Project Link Highlight

    const projectLinks = document.querySelectorAll('.project-links a');
    projectLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.backgroundColor = '#0056b3';
            link.style.color = 'white';
        });
        link.addEventListener('mouseout', () => {
            link.style.backgroundColor = '';
            link.style.color = '';
        });
    });

    // Navbar Active Link Highlight

    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Interactive SVG Click Effect (if present in HTML)

    const svg = document.querySelector('.interactive-svg');
    if (svg) {
        svg.addEventListener('click', () => {
            svg.classList.toggle('active');
            const gearPath = svg.querySelector('.gear-path');
            if (gearPath) {
                gearPath.style.animation = svg.classList.contains('active') 
                    ? 'spin 2s linear infinite' 
                    : 'spin 10s linear infinite';
            }
        });
    }
});

// Ensure skills lists are visible on desktop with debounced resize

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleResize = debounce(() => {
    const skillLists = document.querySelectorAll('.skills-category ul');
    skillLists.forEach(list => {
        list.style.display = window.innerWidth > 767 ? 'block' : '';
    });
}, 200);

window.addEventListener('resize', handleResize);
handleResize(); 