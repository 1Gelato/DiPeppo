// navbar-inline.js - DiPeppo Navigation
(function() {
    'use strict';

    if (window.dipeppoNavbarLoaded) return;
    window.dipeppoNavbarLoaded = true;

    const navbarCSS = `
        <style id="navbar-inline-css">
        :root {
            --rosso: #D32F2F;
            --rosso-light: #EF5350;
            --oro: #F9A825;
            --dark: #2C1810;
            --shadow-soft: 0 10px 40px rgba(44, 24, 16, 0.08);
            --radius-xl: 48px;
            --radius-lg: 16px;
        }

        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            padding: 1rem 2rem;
            transition: all 0.4s ease;
        }

        header.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: var(--shadow-soft);
            padding: 0.75rem 2rem;
        }

        nav {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
            color: var(--dark);
            z-index: 1002;
        }

        .logo-image {
            height: 50px;
            width: auto;
            transition: transform 0.3s ease;
        }

        .logo:hover .logo-image {
            transform: scale(1.05);
        }

        .logo-text {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--rosso) 0%, var(--oro) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
            align-items: center;
        }

        .nav-links > li {
            display: flex;
            align-items: center;
            height: 100%;
        }

        .nav-links a {
            text-decoration: none;
            color: var(--dark);
            font-weight: 500;
            font-size: 0.95rem;
            position: relative;
            padding: 0.5rem 0;
            transition: color 0.3s ease;
            display: flex;
            align-items: center;
        }

        .nav-links > li > a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--rosso);
            border-radius: 2px;
            transition: width 0.3s ease;
        }

        .nav-links > li > a:hover {
            color: var(--rosso);
        }

        .nav-links > li > a:hover::after {
            width: 100%;
        }

        .nav-cta {
            background: linear-gradient(135deg, var(--rosso) 0%, var(--rosso-light) 100%);
            color: white !important;
            padding: 0.75rem 1.5rem !important;
            border-radius: var(--radius-xl);
            font-weight: 600 !important;
            box-shadow: 0 4px 15px rgba(211, 47, 47, 0.3);
            transition: all 0.3s ease !important;
            white-space: nowrap;
        }

        .nav-cta::after {
            display: none !important;
        }

        .nav-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(211, 47, 47, 0.4);
        }

        /* Mobile Toggle */
        .mobile-toggle {
            display: none;
            flex-direction: column;
            gap: 6px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 5px;
            z-index: 1002;
        }

        .mobile-toggle span {
            width: 28px;
            height: 3px;
            background: var(--dark);
            border-radius: 3px;
            transition: all 0.3s ease;
        }

        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(7px, 7px);
        }

        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Dropdowns */
        .nav-dropdown {
            position: relative;
            height: 100%;
        }

        .dropdown-trigger {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            cursor: pointer;
        }

        .dropdown-arrow {
            font-size: 0.6rem;
            transition: transform 0.3s ease;
        }

        .nav-dropdown:hover .dropdown-arrow {
            transform: rotate(180deg);
        }

        .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%) translateY(15px);
            min-width: 320px;
            padding: 16px;
            opacity: 0;
            visibility: hidden;
            display: block;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1000;
        }

        .glass-dropdown {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: var(--radius-lg);
            box-shadow: 0 20px 40px rgba(44, 24, 16, 0.12);
        }

        .dropdown-columns {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .dropdown-section {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .dropdown-title {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #999;
            padding: 0.5rem 1rem;
            margin-bottom: 0.25rem;
            font-weight: 600;
        }

        .dropdown-item {
            display: block;
            padding: 12px 20px;
            color: var(--dark);
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.2s ease;
            border-radius: 12px;
        }

        .dropdown-item:hover {
            color: var(--rosso);
            background: rgba(211, 47, 47, 0.08);
            transform: translateX(5px);
        }

        .dropdown-item::after {
            display: none !important;
        }

        @media (min-width: 1025px) {
            .nav-dropdown:hover .dropdown-menu {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) translateY(0);
            }
        }

        /* Tablettes & Mobiles */
        @media (max-width: 1024px) {
            header {
                padding: 1rem 1.5rem;
            }

            .nav-links {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                height: 100vh;
                background: white;
                flex-direction: column;
                padding: 90px 2rem 2rem 2rem;
                gap: 0;
                overflow-y: auto;
                align-items: stretch;
                z-index: 1001;
            }

            .nav-links.active {
                display: flex;
            }

            .mobile-toggle {
                display: flex;
            }

            .nav-links > li {
                width: 100%;
                height: auto;
                border-bottom: 1px solid rgba(0,0,0,0.05);
            }

            .nav-links > li:last-child {
                border-bottom: none;
                margin-top: 2rem;
            }

            .nav-links a {
                padding: 1.25rem 0;
                font-size: 1.1rem;
                width: 100%;
                justify-content: space-between;
            }

            .nav-links > li > a::after {
                display: none;
            }

            .dropdown-menu {
                position: static !important;
                transform: none !important;
                width: 100% !important;
                min-width: 100% !important;
                opacity: 1 !important;
                visibility: visible !important;
                display: none;
                padding: 0.5rem;
                margin: 0;
                background: #f9f9f9;
                box-shadow: inset 0 2px 10px rgba(0,0,0,0.03);
                border-radius: 12px;
                border: none;
            }

            .dropdown-columns {
                grid-template-columns: 1fr;
                gap: 0;
            }

            .nav-dropdown.active .dropdown-menu {
                display: block;
                animation: slideDown 0.3s ease;
            }

            .dropdown-item {
                padding: 1rem;
                font-size: 1rem;
            }

            .dropdown-item:hover {
                background: white;
                transform: none;
            }

            .nav-cta {
                width: 100%;
                text-align: center;
                justify-content: center;
                margin-top: 1rem;
            }

            .dropdown-arrow {
                transform: rotate(0);
            }

            .nav-dropdown.active .dropdown-arrow {
                transform: rotate(180deg);
            }
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        </style>
    `;

    const navbarHTML = `
    <header id="header">
        <nav>
            <a href="index.html" class="logo">
                <img src="images/logo-dipeppo.svg" alt="DiPeppo" class="logo-image">
                <span class="logo-text">DiPeppo</span>
            </a>
            <ul class="nav-links" id="navLinks">
                <li><a href="index.html">Accueil</a></li>
                <li class="nav-dropdown">
                    <a href="evenementiel.html" class="dropdown-trigger">Nos Services <span class="dropdown-arrow">▼</span></a>
                    <div class="dropdown-menu glass-dropdown">
                        <div class="dropdown-section">
                            <a href="foodtruck.html" class="dropdown-item">Foodtrucks</a>
                            <a href="evenementiel.html" class="dropdown-item">Matériel Prestation et Chariot Mobile</a>
                            <a href="location-jeux.html" class="dropdown-item">Jeux de Loisirs</a>
                        </div>
                    </div>
                </li>
                <li><a href="nos-gelato.html">Nos Gelato</a></li>
                <li><a href="galerie.html">Galerie</a></li>
                <li><a href="devis.html" class="nav-cta">Devis Gratuit</a></li>
            </ul>
            <button class="mobile-toggle" id="mobileToggle" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>
    `;

    function adjustLinks() {
        const currentPath = window.location.pathname;
        const isInBlogFolder = currentPath.includes('/blog/');

        if (isInBlogFolder) {
            const header = document.getElementById('header');
            if (header) {
                header.innerHTML = header.innerHTML.replace(/href="(?!\.\.\/|http|#|tel:)([^"]*\.html)/g, 'href="../$1');
                header.innerHTML = header.innerHTML.replace(/href="(?!\.\.\/|http|#|tel:)(images\/)/g, 'href="../$1');

                setTimeout(() => {
                    const logoImg = document.querySelector('.logo-image');
                    if (logoImg) {
                        const currentSrc = logoImg.getAttribute('src');
                        if (!currentSrc.startsWith('../')) {
                            logoImg.src = '../' + currentSrc;
                        }
                    }
                }, 0);
            }
        }
    }

    function initDropdowns() {
        const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

        dropdownTriggers.forEach(trigger => {
            const parentLi = trigger.closest('.nav-dropdown');
            if (!parentLi) return;

            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    const wasActive = parentLi.classList.contains('active');

                    document.querySelectorAll('.nav-dropdown').forEach(d => {
                        if (d !== parentLi) d.classList.remove('active');
                    });

                    if (wasActive) {
                        parentLi.classList.remove('active');
                    } else {
                        parentLi.classList.add('active');
                    }
                }
            });
        });
    }

    function initMobileMenu() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');

        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                const isActive = mobileToggle.classList.contains('active');

                if (isActive) {
                    mobileToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                } else {
                    mobileToggle.classList.add('active');
                    navLinks.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });

            navLinks.querySelectorAll('a:not(.dropdown-trigger)').forEach(link => {
                link.addEventListener('click', () => {
                    mobileToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    }

    function initScrollEffect() {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    function init() {
        if (!document.getElementById('navbar-inline-css')) {
            document.head.insertAdjacentHTML('beforeend', navbarCSS);
        }

        if (!document.getElementById('header')) {
            document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        }

        requestAnimationFrame(() => {
            adjustLinks();
            initDropdowns();
            initMobileMenu();
            initScrollEffect();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
