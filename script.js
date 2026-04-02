
// 1. Theme Toggle (Light / Dark)

const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

// Load saved preference, fallback to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

   //2. Mobile Menu (Hamburger Dropdown)
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const overlay     = document.getElementById('mobile-overlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    overlay.style.display = 'block';
    // Trigger transition on next frame
    requestAnimationFrame(() => overlay.classList.add('active'));
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    // Hide overlay after fade
    overlay.addEventListener('transitionend', () => {
        overlay.style.display = '';
    }, { once: true });
}

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
});

overlay.addEventListener('click', closeMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});


//3. Sticky Navbar — scroll shadow

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}, { passive: true });


//4. Active Nav Link on Scroll (Intersection Observer)
   
const sections  = document.querySelectorAll('section[id], .hero[id]');
const navAnchors = document.querySelectorAll('.nav-links .nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.35 });

sections.forEach(sec => navObserver.observe(sec));


//5. Scroll-Reveal Animation

// Add .reveal class to elements we want to animate
const revealTargets = document.querySelectorAll(
    '.expert-card, .project, .skill, .cert-card, .hero-text, .hero-image-wrap, table, .about-text, .sub-heading'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger delay for sibling cards
            entry.target.style.transitionDelay = `${i * 60}ms`;
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

//6. Skill Bar Animation
   
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

//8. Typewriter Effect for Hero Subtitle
const heroSub = document.querySelector('.hero-sub');

if (heroSub) {
    const phrases = [
        'Aspiring Cybersecurity Engineer',
        'IT Enthusiast',
        'Frontend Developer',
        'Ethical Hacker/Pentester in Training',
    ];

    let phraseIdx = 0;
    let charIdx   = 0;
    let deleting  = false;

    function typeWriter() {
        const current = phrases[phraseIdx];

        if (!deleting) {
            heroSub.textContent = current.slice(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                deleting = true;
                setTimeout(typeWriter, 1800); // pause before delete
                return;
            }
        } else {
            heroSub.textContent = current.slice(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
            }
        }

        setTimeout(typeWriter, deleting ? 45 : 80);
    }

    typeWriter();
}
