document.addEventListener('DOMContentLoaded', () => {

    /* ==============================
       MOBILE NAVIGATION
    ============================== */
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile nav when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile nav when clicking overlay
        if (mobileNavOverlay) {
            mobileNavOverlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    /* ==============================
       SMOOTH SCROLL FOR ANCHOR LINKS
    ============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ==============================
       HEADER SCROLL EFFECT
    ============================== */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==============================
       FADE-IN ANIMATION
    ============================== */
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    /* ==============================
       GALLERY LIGHTBOX
    ============================== */
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const title = item.querySelector('h3')?.textContent || '';
            const description = item.querySelector('p')?.textContent || '';

            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                    <div class="lightbox-info">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>
            `;

            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            const closeLightbox = () => {
                lightbox.remove();
                document.body.style.overflow = '';
            };

            lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeLightbox();
            }, { once: true });
        });
    });

    /* ==============================
       CONTACT FORM TO WHATSAPP
    ============================== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            if (!data.name || !data.phone) {
                alert('Please fill in all required fields.');
                return;
            }

            const message = `Hello Little Minds Foundation School,

I would like to enquire about admission:

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || 'Not provided'}
Child's Age: ${data.childAge || 'Not specified'}

Message: ${data.message || 'No additional message'}

Please contact me for more information.`;

            const whatsappUrl = `https://wa.me/919119060984?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            this.reset();
        });
    }

    /* ==============================
       NEWSLETTER TO WHATSAPP
    ============================== */
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (!email) {
                alert('Please enter your email address.');
                return;
            }

            const message = `Hello Little Minds Foundation School,

I would like to subscribe to your newsletter.

Email: ${email}

Please add me to your mailing list.`;

            const whatsappUrl = `https://wa.me/919119060984?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            this.reset();
            alert('Thank you for subscribing! We will contact you soon.');
        });
    }

    /* ==============================
       STATS COUNTER
    ============================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                let currentValue = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(currentValue) + finalValue.replace(/\d+/, '');
                }, 30);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    /* ==============================
       PARALLAX HERO
    ============================== */
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = window.pageYOffset * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
});
