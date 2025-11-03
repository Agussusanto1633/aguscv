// Typing Animation
const roles = ['Web Developer', 'Mobile Developer', 'UI/UX Designer',];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, speed);
}

// Start animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(type, 500);

    // Initialize all event listeners
    initializeEventListeners();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Active menu on scroll
    setupScrollNavigation();

    // Hamburger menu toggle
    setupHamburgerMenu();

    // Download CV functionality
    setupDownloadCV();

    // Service buttons
    setupServiceButtons();

    // Project cards and modal
    setupProjectModal();

    // Certificate cards and modal
    setupCertificateModal();

    // Contact form
    setupContactForm();

    // Newsletter form
    setupNewsletterForm();

    // Scroll to top button
    setupScrollToTop();

    // Navbar scroll effect
    setupNavbarScroll();

    // Smooth scroll for all anchor links
    setupSmoothScroll();
}

// Active menu on scroll
function setupScrollNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu if open
            const nav = document.querySelector('nav');
            const hamburger = document.querySelector('.hamburger');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Hamburger menu toggle
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

// Download CV functionality - UPDATED TO PDF FORMAT
function setupDownloadCV() {
    const downloadBtn = document.getElementById('downloadCV');
    
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Show loading message
        showNotification('Mempersiapkan CV Anda... ⏳', 'info');
        
        try {
            // Import jsPDF from UMD
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Set font
            doc.setFont('helvetica');
            
            // Header - Name
            doc.setFontSize(24);
            doc.setTextColor(0, 206, 209);
            doc.text('AGUS SUSANTO', 105, 20, { align: 'center' });
            
            // Subtitle
            doc.setFontSize(12);
            doc.setTextColor(100, 100, 100);
            doc.text(' Web Developer & Mobile Developer', 105, 28, { align: 'center' });
            
            // Line separator
            doc.setDrawColor(0, 206, 209);
            doc.setLineWidth(0.5);
            doc.line(20, 32, 190, 32);
            
            // Contact Information
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'bold');
            doc.text('CONTACT INFORMATION', 20, 42);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);
            doc.text('Email: agussusanto@webmail.umm.ac.id', 20, 50);
            doc.text('Phone: +62 857 8567 2280', 20, 56);
            doc.text('Location: Blitar, Jawa Timur, Indonesia', 20, 62);
            doc.text('LinkedIn: linkedin.com/in/agussusanto', 20, 68);
            doc.text('GitHub: github.com/Agussusanto1633', 20, 74);
            
            // Professional Summary
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('PROFESSIONAL SUMMARY', 20, 86);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);
            const summaryText = 'Passionate web developer and designer with 5+ years of experience in creating innovative digital solutions. Specialized in modern web development, mobile applications, and UI/UX design with a proven track record of delivering high-quality projects.';
            const splitSummary = doc.splitTextToSize(summaryText, 170);
            doc.text(splitSummary, 20, 94);
            
            // Skills
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('SKILLS', 20, 115);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);
            doc.text('Web Development: HTML5, CSS3, JavaScript, React, Node.js, Vue.js', 20, 123);
            doc.text('Mobile Development: React Native, Flutter, Kotlin', 20, 129);
            doc.text('Design: UI/UX Design, Graphic Design, Figma, Adobe Creative Suite', 20, 135);
            doc.text('Database: MySQL, MongoDB, PostgreSQL, Firebase', 20, 141);
            doc.text('Other: SEO Optimization, Content Writing, Digital Marketing, Git', 20, 147);
            
            // Experience
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('EXPERIENCE', 20, 159);
            
            doc.setFontSize(11);
            doc.setTextColor(0, 206, 209);
            doc.text('Junior Web Developer', 20, 167);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Tech Company | 2020 - Present', 20, 173);
            
            doc.setTextColor(60, 60, 60);
            doc.text('• Led development of 20+ web applications using modern frameworks', 25, 179);
            doc.text('• Improved website performance by 40% through optimization', 25, 185);
            doc.text('• Mentored junior developers and conducted code reviews', 25, 191);
            
            doc.setFontSize(11);
            doc.setTextColor(0, 206, 209);
            doc.text('Web Developer', 20, 200);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Digital Agency | 2018 - 2020', 20, 206);
            
            doc.setTextColor(60, 60, 60);
            doc.text('• Built responsive websites for various clients across industries', 25, 212);
            doc.text('• Implemented SEO best practices resulting in increased traffic', 25, 218);
            doc.text('• Collaborated with design team to create user-centric interfaces', 25, 224);
            
            // Education
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('EDUCATION', 20, 236);
            
            doc.setFontSize(11);
            doc.setTextColor(0, 206, 209);
            doc.text('Bachelor of Computer Science', 20, 244);
            
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Universitas Muhammadiyah Malang | 2023 - 2026', 20, 250);
            
            // Certifications
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0);
            doc.text('CERTIFICATIONS', 20, 262);
            
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(60, 60, 60);
            doc.text('• Web Development Professional - Tech Academy (2023)', 20, 270);
            doc.text('• UI/UX Design Specialist - Design Institute (2023)', 20, 276);
            doc.text('• React Developer Expert - React Academy (2024)', 20, 282);
            
            // Save the PDF
            doc.save('Agus_Susanto_CV.pdf');
            
            // Show success message
            showNotification('CV berhasil diunduh dalam format PDF! 📄', 'success');
            
        } catch (error) {
            console.error('Error generating PDF:', error);
            showNotification('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.', 'error');
        }
    });
}

// Service buttons functionality
function setupServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const service = e.target.getAttribute('data-service') || 'service';
            const serviceName = e.target.previousElementSibling.previousElementSibling.textContent;
            
            // Show contact section
            const contactSection = document.getElementById('kontak-saya');
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill message in contact form
            setTimeout(() => {
                const messageField = document.getElementById('message');
                messageField.value = `Halo, saya tertarik dengan layanan ${serviceName}. Saya ingin mendiskusikan lebih lanjut tentang proyek saya.`;
                messageField.focus();
            }, 800);

            showNotification(`Silakan isi form kontak untuk ${serviceName}`, 'info');
        });
    });
}

// Project Modal Setup
function setupProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    const projectData = {
        '1': {
            title: 'E-Commerce Platform',
            image: 'foto1.jpg',
            description: 'Platform e-commerce modern yang dibangun dengan React dan Node.js. Fitur lengkap meliputi shopping cart, payment gateway integration, product management, dan user authentication. Website ini dapat menangani ribuan transaksi per hari dengan performa optimal.',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            demo: 'https://example-ecommerce.com',
            github: 'https://github.com/agussusanto/ecommerce'
        },
        '2': {
            title: 'Corporate Website',
            image: 'foto1.jpg',
            description: 'Website perusahaan profesional dengan desain modern dan elegan. Dilengkapi dengan CMS untuk memudahkan update konten, optimasi SEO, dan fast loading speed. Responsif di semua device dengan UI yang menarik.',
            tags: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
            demo: 'https://example-corporate.com',
            github: 'https://github.com/agussusanto/corporate-web'
        },
        '3': {
            title: 'Mobile Application',
            image: 'foto1.jpg',
            description: 'Aplikasi mobile cross-platform yang dibangun dengan React Native. Fitur include push notifications, offline mode, real-time data sync, dan smooth animations. Available untuk iOS dan Android.',
            tags: ['React Native', 'Firebase', 'Redux', 'API'],
            demo: 'https://example-app.com',
            github: 'https://github.com/agussusanto/mobile-app'
        },
        '4': {
            title: 'Dashboard Admin',
            image: 'foto1.jpg',
            description: 'Dashboard admin yang powerful dengan visualisasi data yang informatif. Dilengkapi dengan real-time analytics, user management, reporting system, dan customizable widgets. Interface yang user-friendly dan mudah digunakan.',
            tags: ['Vue.js', 'Chart.js', 'Bootstrap', 'REST API'],
            demo: 'https://example-dashboard.com',
            github: 'https://github.com/agussusanto/admin-dashboard'
        },
        '5': {
            title: 'Portfolio Website',
            image: 'foto1.jpg',
            description: 'Website portfolio kreatif dengan animasi yang smooth dan interaktif. Menggunakan modern design trends, micro-interactions, dan parallax effects. Optimasi untuk fast loading dan SEO friendly.',
            tags: ['HTML5', 'CSS3', 'GSAP', 'JavaScript'],
            demo: 'https://example-portfolio.com',
            github: 'https://github.com/agussusanto/portfolio'
        },
        '6': {
            title: 'Landing Page',
            image: 'foto1.jpg',
            description: 'Landing page yang dioptimasi untuk konversi maksimal. Design yang eye-catching, clear call-to-actions, fast loading time, dan mobile responsive. Includes A/B testing setup dan analytics integration.',
            tags: ['HTML', 'TailwindCSS', 'JavaScript', 'Analytics'],
            demo: 'https://example-landing.com',
            github: 'https://github.com/agussusanto/landing-page'
        }
    };

    projectCards.forEach(card => {
        const projectBtn = card.querySelector('.project-btn');
        projectBtn.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                document.getElementById('modalImage').src = project.image;
                document.getElementById('modalTitle').textContent = project.title;
                document.getElementById('modalDescription').textContent = project.description;
                document.getElementById('modalLiveDemo').href = project.demo;
                document.getElementById('modalGithub').href = project.github;

                // Update tags
                const tagsContainer = modal.querySelector('.modal-tags');
                tagsContainer.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'tag';
                    tagSpan.textContent = tag;
                    tagsContainer.appendChild(tagSpan);
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Certificate Modal Setup
function setupCertificateModal() {
    const certificateCards = document.querySelectorAll('.certificate-card');
    const modal = document.getElementById('certificateModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    const certificateData = {
        '1': {
            title: 'Web Development Professional',
            image: 'foto1.jpg',
            issuer: 'Tech Academy',
            date: 'January 2023',
            description: 'Comprehensive web development certification covering modern web technologies, best practices, and industry standards.',
            link: 'https://example.com/certificate1'
        },
        '2': {
            title: 'UI/UX Design Specialist',
            image: 'foto1.jpg',
            issuer: 'Design Institute',
            date: 'March 2023',
            description: 'Advanced certification in user interface and user experience design principles, design thinking, and prototyping.',
            link: 'https://example.com/certificate2'
        },
        '3': {
            title: 'React Developer Expert',
            image: 'foto1.jpg',
            issuer: 'React Academy',
            date: 'June 2024',
            description: 'Expert-level React certification covering advanced concepts, state management, performance optimization, and best practices.',
            link: 'https://example.com/certificate3'
        },
        '4': {
            title: 'Digital Marketing Pro',
            image: 'foto1.jpg',
            issuer: 'Marketing School',
            date: 'September 2024',
            description: 'Professional digital marketing certification covering SEO, SEM, social media marketing, and analytics.',
            link: 'https://example.com/certificate4'
        }
    };

    certificateCards.forEach(card => {
        const certBtn = card.querySelector('.cert-btn');
        certBtn.addEventListener('click', () => {
            const certId = card.getAttribute('data-certificate');
            const certificate = certificateData[certId];

            if (certificate) {
                document.getElementById('certModalImage').src = certificate.image;
                document.getElementById('certModalTitle').textContent = certificate.title;
                document.getElementById('certModalIssuer').textContent = 'Issued by: ' + certificate.issuer;
                document.getElementById('certModalDate').textContent = 'Date: ' + certificate.date;
                document.getElementById('certModalView').href = certificate.link;

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Contact Form Setup
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Validation
        if (!name || !email || !message) {
            showNotification('Harap isi semua field yang wajib!', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Format email tidak valid!', 'error');
            return;
        }

        // Simulate sending email (in real app, this would be an API call)
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification(`Terima kasih ${name}! Pesan Anda telah dikirim. Saya akan segera menghubungi Anda.`, 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Newsletter Form Setup
function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Format email tidak valid!', 'error');
            return;
        }

        // Simulate subscription (in real app, this would be an API call)
        const submitBtn = newsletterForm.querySelector('button');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('Terima kasih! Anda telah berlangganan newsletter kami. 📧', 'success');
            newsletterForm.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Scroll to Top Button
function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Smooth Scroll for All Anchor Links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#' || href === '#privacy' || href === '#terms') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${getNotificationColor(type)};
        color: #fff;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        info: 'info-circle',
        warning: 'exclamation-triangle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #00CED1 0%, #006666 100%)',
        error: 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)',
        info: 'linear-gradient(135deg, #0088cc 0%, #0066aa 100%)',
        warning: 'linear-gradient(135deg, #ffaa00 0%, #cc8800 100%)'
    };
    return colors[type] || colors.info;
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 15px;
        font-weight: 500;
    }

    .notification-content i {
        font-size: 20px;
    }

    @media (max-width: 768px) {
        .notification {
            right: 15px;
            left: 15px;
            max-width: none;
            top: 80px;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

console.log('%c👋 Hello! Welcome to Agus Susanto Portfolio', 'color: #00CED1; font-size: 20px; font-weight: bold;');
console.log('%c✨ This portfolio is built with vanilla JavaScript, no frameworks needed!', 'color: #aaa; font-size: 14px;');