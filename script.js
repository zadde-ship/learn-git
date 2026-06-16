document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       THEME TOGGLE SYSTEM (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }

    // Toggle theme action
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================================================
       TYPING ANIMATION
       ========================================================================== */
    const typingTextElement = document.getElementById('typing-text');
    
    // Translation sets for typing animation words
    const typingWords = {
        th: ['นักพัฒนาเว็บไซต์', 'นักออกแบบ UI/UX', 'นักเขียนโค้ดสร้างสรรค์'],
        en: ['Frontend Developer', 'UI/UX Designer', 'Creative Coder']
    };
    
    // Initialize words array (will be modified dynamically by language switcher)
    const words = [...typingWords.th];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingTextElement) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting speed
        } else {
            // Add character
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Normal typing speed
        }

        // Handle word completion
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect if element exists
    if (typingTextElement) {
        setTimeout(typeEffect, 1000);
    }

    /* ==========================================================================
       LANGUAGE SWITCH SYSTEM (TH / EN)
       ========================================================================== */
    const langToggleBtn = document.getElementById('lang-toggle');
    const langThBtn = document.getElementById('lang-th-btn');
    const langEnBtn = document.getElementById('lang-en-btn');
    
    let currentLang = localStorage.getItem('lang') || 'th';
    
    // JS Translations for Dynamic elements (Validation & Button status)
    const jsTranslations = {
        th: {
            nameRequired: 'กรุณากรอกชื่อของคุณ',
            emailRequired: 'กรุณากรอกอีเมลติดต่อ',
            emailInvalid: 'รูปแบบอีเมลไม่ถูกต้อง',
            messageRequired: 'กรุณาพิมพ์รายละเอียดข้อความของคุณ',
            sending: 'กำลังส่งข้อความ...',
            sentSuccess: 'ส่งข้อความเรียบร้อยแล้ว! ผมจะติดต่อกลับโดยเร็วที่สุด',
            sentError: 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง'
        },
        en: {
            nameRequired: 'Please enter your name',
            emailRequired: 'Please enter your contact email',
            emailInvalid: 'Invalid email address format',
            messageRequired: 'Please type your project details',
            sending: 'Sending message...',
            sentSuccess: 'Message sent successfully! I will get back to you soon.',
            sentError: 'Please fill out all fields correctly'
        }
    };

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        
        // Update language toggle button visual state
        if (lang === 'th') {
            langThBtn.classList.add('active');
            langEnBtn.classList.remove('active');
            document.documentElement.lang = 'th';
        } else {
            langThBtn.classList.remove('active');
            langEnBtn.classList.add('active');
            document.documentElement.lang = 'en';
        }

        // Translate HTML elements having data-th & data-en
        const translatableElements = document.querySelectorAll('[data-th][data-en]');
        translatableElements.forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });

        // Translate form inputs placeholder (optional design, keeping labels clean)
        // Update the words for typing animation dynamically
        words.length = 0;
        words.push(...typingWords[lang]);
        wordIndex = 0;
        charIndex = 0;
        isDeleting = false;
        if (typingTextElement) {
            typingTextElement.textContent = '';
        }
    }

    langToggleBtn.addEventListener('click', () => {
        const nextLang = currentLang === 'th' ? 'en' : 'th';
        setLanguage(nextLang);
    });

    // Run language initialization
    setLanguage(currentLang);

    /* ==========================================================================
       SCROLL REVEAL & ACTIVE NAV-LINK HIGHLIGHTING
       ========================================================================== */
    const revealSections = document.querySelectorAll('.section-reveal');
    const scrollIndicator = document.getElementById('scroll-indicator');

    // Section reveal using Intersection Observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Active nav-link update on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = 'home';
        const scrollPosition = window.scrollY + 120; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Hide scroll indicator on scroll down
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'all';
            }
        }
    });

    /* ==========================================================================
       PROJECTS FILTERING
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from other buttons
            filterButtons.forEach(button => button.classList.remove('active'));
            e.currentTarget.classList.add('active');

            const filterValue = e.currentTarget.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show card with animation
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide card
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================================================
       CONTACT FORM VALIDATION & SIMULATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const messageInput = document.getElementById('message-input');
    const formStatus = document.getElementById('form-status');
    const formSubmit = document.getElementById('form-submit');

    // Email validation utility
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper to validate a single control
    function validateInput(input, errorElementId, validationFn, errorMessage) {
        const errorElement = document.getElementById(errorElementId);
        
        if (!validationFn(input.value.trim())) {
            input.classList.add('invalid');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.style.opacity = '1';
            }
            return false;
        } else {
            input.classList.remove('invalid');
            if (errorElement) {
                errorElement.style.opacity = '0';
            }
            return true;
        }
    }

    // Clear invalid class on input
    const inputs = [nameInput, emailInput, messageInput];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
            const errorElement = document.getElementById(`${input.id.split('-')[0]}-error`);
            if (errorElement) {
                errorElement.style.opacity = '0';
            }
        });
    });

    // Handle Form Submit
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Dynamically grab messages depending on active language
        const messages = jsTranslations[currentLang];

        // Run validations
        const isNameValid = validateInput(
            nameInput, 
            'name-error', 
            val => val.length > 0, 
            messages.nameRequired
        );
        
        const isEmailValid = validateInput(
            emailInput, 
            'email-error', 
            val => val.length > 0 && isValidEmail(val), 
            emailInput.value.trim().length === 0 ? messages.emailRequired : messages.emailInvalid
        );

        const isMessageValid = validateInput(
            messageInput, 
            'message-error', 
            val => val.length > 0, 
            messages.messageRequired
        );

        if (isNameValid && isEmailValid && isMessageValid) {
            // Prevent double submits
            formSubmit.disabled = true;
            const originalButtonText = formSubmit.innerHTML;
            
            // Set dynamic sending text while preserving structural span or icon
            const submitSpan = formSubmit.querySelector('span');
            if (submitSpan) {
                submitSpan.textContent = messages.sending;
            } else {
                formSubmit.innerHTML = messages.sending;
            }

            // Send real HTTP POST request to Pages Function
            fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim()
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                formSubmit.disabled = false;
                formSubmit.innerHTML = originalButtonText;

                if (data.success) {
                    // Show Success message
                    formStatus.className = 'form-status success';
                    formStatus.textContent = messages.sentSuccess;
                    formStatus.style.display = 'block';
                    
                    // Clear Form
                    contactForm.reset();
                } else {
                    throw new Error(data.error || 'Something went wrong');
                }

                // Clear status after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                formSubmit.disabled = false;
                formSubmit.innerHTML = originalButtonText;

                // Show Error status
                formStatus.className = 'form-status error';
                formStatus.textContent = messages.sentError;
                formStatus.style.display = 'block';
                console.error('Form submission error:', error);
            });
        } else {
            // Show Error status
            formStatus.className = 'form-status error';
            formStatus.textContent = messages.sentError;
            formStatus.style.display = 'block';
        }
    });
});
