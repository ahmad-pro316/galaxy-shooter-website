// Loading Screen Simulation
let progress = 0;
const progressFill = document.querySelector('.progress-fill');
const loadingText = document.getElementById('loading-text');
const loadingScreen = document.getElementById('loading-screen');

const interval = setInterval(() => {
    if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 500);
    } else {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        if (progressFill) progressFill.style.width = progress + '%';
        if (loadingText) loadingText.textContent = Math.floor(progress) + '%';
    }
}, 150);

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navLinks.classList.remove('active');
        }
    });
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            navLinks?.classList.remove('active');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

// Navbar Active Link on Scroll with ARIA current
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === `#${current}`) {
            item.classList.add('active');
            item.setAttribute('aria-current', 'page');
        } else {
            item.classList.remove('active');
            item.removeAttribute('aria-current');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// ============================================
// Download Game Function
// ============================================

const GAME_DOWNLOAD_URL = 'downloads/GalaxyShooter.zip';

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00bfff, #8a2be2)' : '#333'};
        color: #fff;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        font-family: 'Orbitron', monospace;
        animation: slideIn 0.3s ease;
        box-shadow: 0 0 20px rgba(0,191,255,0.5);
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function downloadGame() {
    const confirmDownload = confirm(
        '🚀 هل تريد تحميل لعبة Galaxy Shooter؟\n\n' +
        '📦 حجم الملف: ~450 MB\n' +
        '💻 نظام التشغيل: Windows 10/11\n' +
        '✅ مجاني بالكامل\n\n' +
        'ملاحظة: قد يطلب المتصفح تأكيد التحميل.'
    );
    
    if (confirmDownload) {
        const link = document.createElement('a');
        link.href = GAME_DOWNLOAD_URL;
        link.download = 'GalaxyShooter.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('⏳ بدأ التحميل! شكراً لك على تحميل Galaxy Shooter', 'success');
        
        // Live region for screen readers
        const liveRegion = document.getElementById('live-region') || (() => {
            const region = document.createElement('div');
            region.id = 'live-region';
            region.setAttribute('aria-live', 'polite');
            region.setAttribute('class', 'sr-only');
            region.style.position = 'absolute';
            region.style.width = '1px';
            region.style.height = '1px';
            region.style.padding = '0';
            region.style.margin = '-1px';
            region.style.overflow = 'hidden';
            document.body.appendChild(region);
            return region;
        })();
        liveRegion.textContent = 'بدء تحميل لعبة Galaxy Shooter';
        
        console.log('تم بدء تحميل اللعبة في: ' + new Date().toLocaleString());
    }
}

// Add CSS for notifications
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);

// Bind download button
const downloadBtn = document.getElementById('download-game-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadGame);
}

const playNowBtn = document.getElementById('play-now-btn');
if (playNowBtn) {
    playNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadGame();
    });
}

// Screenshot Lightbox
const screenshotCards = document.querySelectorAll('.screenshot-card');
screenshotCards.forEach(card => {
    card.addEventListener('click', () => {
        const imgSrc = card.querySelector('img').src;
        const altText = card.querySelector('img').getAttribute('alt') || 'صورة اللعبة';
        
        const lightbox = document.createElement('div');
        lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:10000;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(10px);';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'معرض الصور');
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = altText;
        img.style.cssText = 'max-width:90%;max-height:90%;border-radius:15px;border:3px solid #00bfff;box-shadow:0 0 50px rgba(0,191,255,0.5);';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.setAttribute('aria-label', 'إغلاق');
        closeBtn.style.cssText = 'position:absolute;top:20px;right:30px;font-size:40px;color:#fff;background:none;border:none;cursor:pointer;transition:0.3s;font-family:monospace;';
        closeBtn.onmouseover = () => closeBtn.style.color = '#00bfff';
        closeBtn.onmouseout = () => closeBtn.style.color = '#fff';
        
        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        const closeLightbox = () => {
            lightbox.remove();
            document.body.style.overflow = '';
        };
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        closeBtn.addEventListener('click', closeLightbox);
        
        // Close with Escape key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        });
    });
    
    // Make screenshot cards keyboard accessible
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
        }
    });
});

// Typing Effect for Tagline
const tagline = document.querySelector('.tagline');
if (tagline) {
    const originalText = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            tagline.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();
}

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0,0,0,0.98)';
        navbar.style.padding = '10px 50px';
    } else {
        navbar.style.background = 'rgba(10,10,10,0.95)';
        navbar.style.padding = '15px 50px';
    }
});

// Visitor counter
let visitorCount = localStorage.getItem('visitorCount');
if (!visitorCount) {
    visitorCount = Math.floor(Math.random() * 5000) + 10000;
    localStorage.setItem('visitorCount', visitorCount);
}
const statsSpans = document.querySelectorAll('.stat span');
if (statsSpans[0]) {
    statsSpans[0].textContent = visitorCount.toLocaleString() + '+ لاعب';
}

// ========================================
// Accessibility Enhancements
// ========================================

// 1. Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('[role="dialog"]');
        if (lightbox) lightbox.remove();
    }
});

// 2. Add ARIA labels for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    const currentLabel = link.getAttribute('aria-label') || link.textContent.trim();
    link.setAttribute('aria-label', `${currentLabel} (يفتح في نافذة جديدة)`);
});

// 3. Add table ARIA attributes
const leaderboardTable = document.querySelector('.leaderboard-table');
if (leaderboardTable) {
    leaderboardTable.setAttribute('aria-label', 'جدول ترتيب أفضل اللاعبين في Galaxy Shooter');
}

// 4. Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    const reduceStyle = document.createElement('style');
    reduceStyle.textContent = `
        .loader, .rocket, .stat i, .btn, .screenshot-card,
        .glow-text, .tagline {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(reduceStyle);
}

// 5. Fix images that fail to load
document.querySelectorAll('.screenshot-card img').forEach(img => {
    img.onerror = function() {
        this.src = 'https://placehold.co/600x400/1a1a2e/00bfff?text=Game+Image';
        this.alt = 'صورة مؤقتة للعبة';
    };
});

// 6. Announce page load for screen readers
const announceLoad = () => {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('class', 'sr-only');
    announcer.style.position = 'absolute';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.padding = '0';
    announcer.style.margin = '-1px';
    announcer.style.overflow = 'hidden';
    announcer.textContent = 'تم تحميل موقع Galaxy Shooter بنجاح';
    document.body.appendChild(announcer);
    setTimeout(() => announcer.remove(), 1000);
};
announceLoad();

console.log('🚀 Galaxy Shooter Website Loaded Successfully!');
console.log('♿ Accessibility features enabled');
console.log('💜 Made with love by Galaxy Studios');