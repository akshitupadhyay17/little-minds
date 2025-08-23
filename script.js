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

   
    
});

// Modal functionality for programs
function openModal(programType) {
    const modal = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    
    const programData = {
        'pre-nursery': {
            title: 'Pre-Nursery',
            subtitle: 'Taking the first step',
            content: `The LM Pre-Nursery is like a second home to our little toddlers. With a comfortable, zero-furniture atmosphere for safe play and learning, our Pre-Nursery boasts of two very affectionate, well-trained motherly educators (per section) extending emotional connect to our tiny-tots for whom the first-step in the world outside home is truly made easy.
            
            Using a blend of play-way and Montessori methodology, our Pre-Schoolers get to feel, explore, learn, and adapt not just social and conversational skills but worldly behaviour along. The Pre-Nursery grade offers to boost personal confidence, independence in executing basic tasks, developing basic sensory and early-learning skills while exploring extra-curricular activities that channelize their enormous energies in a constructive way.`
        },
        'nursery': {
            title: 'Nursery',
            subtitle: 'Setting real-world foundational learnings',
            content: `Nursery at Little Minds is the true foundation for rock-solid, lifetime value learnings in an LMite's life. With two super-fun educators (per section), our Nursery includes unique, innovative and fun-to-learn initiatives, which are almost copyrighted ideas of the Little Minds' team.
            
            A child-centric, Montessori-inspired approach by our educators using stories and role-plays, rhythm and rhyme, cognitive situations, and delivering simple age-appropriate academic concepts ensure 360-degree holistic hike in early formative years.
            
            The LM Nursery is very thoughtfully designed to offer a beautiful amalgamation of modern-day concepts and traditional values.`
        },
        'junior-kg': {
            title: 'Junior KG',
            subtitle: 'Experiencing the Kindergarten – the Junior way',
            content: `Kindergarten Junior at Little Minds brings in a transitional shift from pure-fun based assisted learning in Nursery to a tad balanced, mixed yet independent, Montessori-based approach with a blend of experiential academics, stepped-up life concepts and individual refinement exercises.
            
            Personal confidence, public-speaking skills and peer group initiatives are encouraged to carve out the street-smartness, much needed in today's world. Music and drama play a vital role here for enhancing child's sonic adaptability and refining expressive emotions.`
        },
        'senior-kg': {
            title: 'Senior KG',
            subtitle: 'Readying up for the formal world',
            content: `Kindergarten Seniors are holistically engaged in life-like concepts in academics, theatre, dance and drama, and language enhancement through experiential learning opportunities in a supportive classroom environment. Montessori methodology comes to fore in this final stage of kindergarten journey offering numerous fun-based situations in problem-solving, reasoning and creative thinking.
            
            Academic emphasis includes literacy, numeracy, language, social sciences and general awareness, besides important life-concepts that help form a strong learning path before entering into the formal world of school education.`
        },
        'class-1': {
            title: 'Class 1',
            subtitle: 'Introduction to the formal world',
            content: `At Little Minds Class 1, academic orientation takes center-stage in absolute accordance with National Education Policy (NEP). Subject-based delivery in Languages (Hindi & English), Social Sciences, General Knowledge and Computer Literacy form the cornerstone of foundational learnings.
            
            Theme-based concepts and experiential learnings are ongoing elements through in-class ponderings, quizzes, model forums etc.
            
            Structured educational tours to Regional Science Centre, Space Park, War Memorial etc. feature on year activity calendar besides extra-curriculars and school events. (subject to conditions and relatable concepts/themes)`
        },
        'class-2': {
            title: 'Class 2',
            subtitle: 'A brighter, bigger academic grade',
            content: `Class 2 at Little Minds is the pinnacle of our school pyramid, offering age-appropriate academic learnings in complete accordance with National Education Policy (NEP). Subject-based delivery in Languages (Hindi & English), Social Sciences, General Knowledge and Computer Literacy form the very base of our foundational learnings.
            
            Life-like concepts and experiential learnings are ongoing elements through in-class ponderings, role-plays, concept zones and elements, quizzes, model forums etc.
            
            Structured educational tours to Regional Science Centre, Space Park, War Memorial etc. feature on year activity calendar besides extra-curriculars and school events. (subject to conditions and relatable concepts/themes)
            
            Class 2 is the final grade at Little Minds for our dear LMites before they climb the ladder up to join a prestigious formal school anywhere in the country or overseas.`
        },
        'day-care': {
            title: 'Day-Care',
            subtitle: 'Extended care and support',
            content: `The Day-care at Little Minds is a time-extended rest and care facility for parents occupied with work commitments during daytime hours.
            
            With dedicated caregiving and support staff available through the daytime, your child spends the after-school hours to have meals, rest and relax, complete academic practice work and enjoy an evening full of supervised play, before leaving for home with you.
            
            Sign up for worry free days and let your child be at ease after school.`
        },
        'parent-toddler': {
            title: 'Parent-Toddler Program',
            subtitle: 'Dehradun\'s first exclusive parent-toddler experience',
            content: `Little Minds proudly brings to you Dehradun's first and very exclusive Parent-Toddler Program. It is an early learning familiarization program designed for toddlers aged 14 to 24 months who can be accompanied by their parents or caregivers for their sessions at our school Montessori facility.
            
            What you get with us is a safe environment to nurture your little one by your side. As well as, sessions that offer fun-filled engaging activities like story-telling rhythmic development and sensorial play to your tiny-tot while developing dexterity, brain simulation and play-based learning.
            
            All this while we assist you in building a bond with your baby like never before. So, step on and have an experience of a lifetime because its time for you to discover the joy of babyhood, the LM way!`
        },
        'summer-club': {
            title: 'Summer Club',
            subtitle: 'Summer vacations aren\'t boring anymore!',
            content: `Let your child join the Little Minds Summer Splash, the most-admired summer program in Dehradun.
            
            A three-week fun-filled summer engagement program for children aged 2 to 8 years comes alive every summer at the LM town offering unconventional, innovative and exciting fun activities for the kids. From pottery sessions to cupcake making and watching animation shows, we make the summer of your child the most unforgettable one!
            
            Connect with us for more details.`
        }
    };
    
    const program = programData[programType];
    if (program) {
        modalBody.innerHTML = `
            <h2>${program.title}</h2>
            <h3>${program.subtitle}</h3>
            <p>${program.content.split('\n\n').join('</p><p>')}</p>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});


// Simple alumni slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.alumni-slider-container');
    const sliderTrack = document.querySelector('.alumni-slider-track');
    
    // Pause animation on hover
    sliderContainer.addEventListener('mouseenter', function() {
        sliderTrack.style.animationPlayState = 'paused';
    });
    
    // Resume animation when not hovering
    sliderContainer.addEventListener('mouseleave', function() {
        sliderTrack.style.animationPlayState = 'running';
    });
});

// Perfect seamless alumni slider
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.alumni-slider-track');
    const cards = track.querySelectorAll('.alumni-card');
    const cardWidth = 320; // card width
    const gap = 32; // gap between cards (2rem = 32px)
    const totalCardWidth = cardWidth + gap;
    const totalCards = 4;
    
    let position = 0;
    const speed = 1; // pixels per frame (adjust for speed)
    
    function animate() {
        position -= speed;
        
        // Reset position when we've moved exactly 4 cards worth
        if (Math.abs(position) >= (totalCardWidth * totalCards)) {
            position = 0;
        }
        
        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Pause on hover
    let isPaused = false;
    const container = document.querySelector('.alumni-slider-container');
    
    container.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    
    container.addEventListener('mouseleave', () => {
        isPaused = false;
        animate();
    });
    
    // Modified animate function with pause support
    function animateWithPause() {
        if (!isPaused) {
            position -= speed;
            
            if (Math.abs(position) >= (totalCardWidth * totalCards)) {
                position = 0;
            }
            
            track.style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(animateWithPause);
    }
    
    // Use the pause-aware version
    animateWithPause();
});

/* ============================== 
   DARK MODE TOGGLE 
============================== */
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;
    
    // Check for saved dark mode preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
        updateToggleIcon(savedTheme === 'dark');
    }
    
    // Dark mode toggle functionality
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            
            // Save preference to localStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            // Update toggle icon
            updateToggleIcon(isDarkMode);
        });
    }
    
    function updateToggleIcon(isDarkMode) {
        if (darkModeToggle) {
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }
});

/* ============================== MOBILE LOGO NAVIGATION ============================== */
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const logoLink = document.querySelector('.logo a');
    
    function handleLogoClick(e) {
        // Check if we're on mobile (same breakpoint as mobile hero display)
        if (window.innerWidth <= 1024) {
            e.preventDefault(); // Prevent default link behavior
            
            // Check if mobile hero exists and is visible
            const mobileHero = document.querySelector('.mobile-hero');
            if (mobileHero && window.getComputedStyle(mobileHero).display !== 'none') {
                // Scroll to mobile hero section
                mobileHero.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            } else {
                // Fallback: scroll to top of page
                window.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth' 
                });
            }
            
            // Close mobile nav if it's open
            const hamburger = document.querySelector('.hamburger');
            const mobileNav = document.querySelector('.mobile-nav');
            if (hamburger && mobileNav && mobileNav.classList.contains('active')) {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        // On desktop, let the default behavior work (go to home page or desktop hero)
    }
    
    // Add click event listener to logo
    if (logo) {
        logo.addEventListener('click', handleLogoClick);
    }
    
    // Also add to logo link if it exists separately
    if (logoLink && logoLink !== logo) {
        logoLink.addEventListener('click', handleLogoClick);
    }
    
    // Handle window resize to ensure proper behavior when switching between mobile/desktop
    window.addEventListener('resize', function() {
        // Remove any existing event listeners and re-add them
        // This ensures consistent behavior when switching between breakpoints
    });
});


// --- IGNORE ---