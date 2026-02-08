// footer-inline.js - Footer DiPeppo avec CSS intégré
(function() {
    'use strict';

    const footerCSS = `
        <style id="footer-inline-css">
        footer {
            background: #1A237E;
            color: white;
            padding: 4rem 2rem 2rem;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr;
            gap: 3rem;
            margin-bottom: 3rem;
        }

        .footer-brand .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
            margin-bottom: 1rem;
        }

        .footer-brand .logo-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #D32F2F 0%, #F9A825 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }

        .footer-brand .logo-text {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 700;
            background: linear-gradient(135deg, #D32F2F 0%, #F9A825 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
        }

        .footer-brand p {
            color: rgba(255,255,255,0.6);
            font-size: 0.95rem;
            line-height: 1.8;
        }

        .footer-social {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }

        .footer-social a {
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            font-size: 1.1rem;
            transition: all 0.3s ease;
        }

        .footer-social a:hover {
            background: #D32F2F;
            transform: translateY(-3px);
        }

        .footer-col h4 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
            color: white;
        }

        .footer-col ul {
            list-style: none;
        }

        .footer-col ul li {
            margin-bottom: 0.75rem;
        }

        .footer-col ul a {
            color: rgba(255,255,255,0.6);
            text-decoration: none;
            transition: color 0.3s ease;
            font-size: 0.95rem;
        }

        .footer-col ul a:hover {
            color: #F9A825;
        }

        .footer-partner {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 1.2rem;
            padding: 0.6rem 1.2rem;
            background: linear-gradient(135deg, #D32F2F 0%, #EF5350 100%);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            font-size: 0.85rem;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .footer-partner:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(211, 47, 47, 0.4);
        }

        .footer-bottom {
            max-width: 1200px;
            margin: 0 auto;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.9rem;
            color: rgba(255,255,255,0.5);
        }

        .footer-bottom a {
            color: rgba(255,255,255,0.5);
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer-bottom a:hover {
            color: #F9A825;
        }

        @media (max-width: 992px) {
            .footer-content {
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
            }
        }

        @media (max-width: 768px) {
            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }

            .footer-brand .logo {
                justify-content: center;
            }

            .footer-social {
                justify-content: center;
            }

            .footer-bottom {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
        }
        </style>
    `;

    const indexFooterHTML = `
    <footer>
        <div class="footer-content">
            <div class="footer-brand">
                <a href="#" class="logo">
                    <div class="logo-icon">🎪</div>
                    <span class="logo-text">DiPeppo</span>
                </a>
                <p>
                    Animation événementielle, foodtruck italien et location de jeux de loisirs.
                    Festivals, mariages, fêtes d'entreprise en Loire-Atlantique et Grand Ouest.
                </p>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: rgba(255,255,255,0.5); line-height: 1.6;">
                    📍 P.A Brais - 27, rue Jacques Daguerre<br>
                    44600 Saint-Nazaire — Loire-Atlantique<br>
                    Bretagne | Pays de la Loire | France entière
                </p>
                <div class="footer-social">
                    <a href="https://facebook.com/dipeppo" aria-label="Suivez DiPeppo sur Facebook">📘</a>
                    <a href="https://instagram.com/dipeppo" aria-label="Suivez DiPeppo sur Instagram">📷</a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Services</h4>
                <ul>
                    <li><a href="evenementiel.html">Événementiel & Festivals</a></li>
                    <li><a href="foodtruck.html">Foodtruck Italien</a></li>
                    <li><a href="mariages-evenements-prives.html">Mariages & Privés</a></li>
                    <li><a href="location-jeux.html">Location Jeux</a></li>
                    <li><a href="machines-glaces-granites.html">Machines Glaces & Granités</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Informations</h4>
                <ul>
                    <li><a href="nos-gelato.html">Nos Gelato</a></li>
                    <li><a href="galerie.html">Galerie</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="mentions-legales.html">Mentions Légales</a></li>
                    <li><a href="politique-confidentialite.html">Politique de Confidentialité</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <ul>
                    <li><a href="tel:0954934990">09 54 93 49 90</a></li>
                    <li><a href="tel:0698722040">06 98 72 20 40</a></li>
                    <li><a href="mailto:contact@dipeppo.fr">contact@dipeppo.fr</a></li>
                    <li><a href="devis.html">Demander un Devis</a></li>
                    <li><a href="#contact">Nous contacter</a></li>
                </ul>
                <a href="https://www.ogelato.fr/" target="_blank" rel="noopener" class="footer-partner">🍦 O'Gelato — Matériel Glacier Pro</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2025 DiPeppo - Tous droits réservés</p>
            <p><a href="mentions-legales.html">Mentions légales</a> | <a href="politique-confidentialite.html">Politique de confidentialité</a></p>
        </div>
    </footer>
    `;

    const otherPagesFooterHTML = `
    <footer>
        <div class="footer-content">
            <div class="footer-brand">
                <a href="index.html" class="logo">
                    <div class="logo-icon">🎪</div>
                    <span class="logo-text">DiPeppo</span>
                </a>
                <p>
                    Animation événementielle, foodtruck italien et location de jeux de loisirs.
                    Festivals, mariages, fêtes d'entreprise en Loire-Atlantique et Grand Ouest.
                </p>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: rgba(255,255,255,0.5); line-height: 1.6;">
                    📍 P.A Brais - 27, rue Jacques Daguerre<br>
                    44600 Saint-Nazaire — Loire-Atlantique<br>
                    Bretagne | Pays de la Loire | France entière
                </p>
                <div class="footer-social">
                    <a href="https://facebook.com/dipeppo" aria-label="Suivez DiPeppo sur Facebook">📘</a>
                    <a href="https://instagram.com/dipeppo" aria-label="Suivez DiPeppo sur Instagram">📷</a>
                </div>
            </div>
            <div class="footer-col">
                <h4>Services</h4>
                <ul>
                    <li><a href="evenementiel.html">Événementiel & Festivals</a></li>
                    <li><a href="foodtruck.html">Foodtruck Italien</a></li>
                    <li><a href="mariages-evenements-prives.html">Mariages & Privés</a></li>
                    <li><a href="location-jeux.html">Location Jeux</a></li>
                    <li><a href="machines-glaces-granites.html">Machines Glaces & Granités</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Informations</h4>
                <ul>
                    <li><a href="nos-gelato.html">Nos Gelato</a></li>
                    <li><a href="galerie.html">Galerie</a></li>
                    <li><a href="faq.html">FAQ</a></li>
                    <li><a href="mentions-legales.html">Mentions Légales</a></li>
                    <li><a href="politique-confidentialite.html">Politique de Confidentialité</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <ul>
                    <li><a href="tel:0954934990">09 54 93 49 90</a></li>
                    <li><a href="tel:0698722040">06 98 72 20 40</a></li>
                    <li><a href="mailto:contact@dipeppo.fr">contact@dipeppo.fr</a></li>
                    <li><a href="devis.html">Demander un Devis</a></li>
                    <li><a href="contact.html">Nous contacter</a></li>
                </ul>
                <a href="https://www.ogelato.fr/" target="_blank" rel="noopener" class="footer-partner">🍦 O'Gelato — Matériel Glacier Pro</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2025 DiPeppo - Tous droits réservés</p>
            <p><a href="mentions-legales.html">Mentions légales</a> | <a href="politique-confidentialite.html">Politique de confidentialité</a></p>
        </div>
    </footer>
    `;

    function getFooterHTML() {
        const currentPath = window.location.pathname;
        const isIndexPage = currentPath.endsWith('index.html') || currentPath.endsWith('/');
        const isInBlogFolder = currentPath.includes('/blog/');

        if (isIndexPage) {
            return indexFooterHTML;
        } else if (isInBlogFolder) {
            return otherPagesFooterHTML.replace(/href="([^h#m][^"]*\.html)/g, 'href="../$1');
        } else {
            return otherPagesFooterHTML;
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        document.head.insertAdjacentHTML('beforeend', footerCSS);
        document.body.insertAdjacentHTML('beforeend', getFooterHTML());
    });
})();
