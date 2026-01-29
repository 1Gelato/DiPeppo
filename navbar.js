// navbar.js
const navbarHTML = `
<nav>
    <div class="logo">Di<span>Peppo</span></div>
    <ul class="nav-links">
        <li><a href="evenementiel-landing.html">Accueil</a></li>
        <li><a href="foodtrucks-trailers.html">Foodtrucks & Trailers</a></li>
        <li><a href="evenementiel-landing.html#jeux">Jeux & Décorations</a></li>
        <li><a href="evenementiel-landing.html#catalogue">Catalogue</a></li>
        <li><a href="evenementiel-landing.html#contact">Contact</a></li>
    </ul>
</nav>
`;

document.getElementById('main-nav').innerHTML = navbarHTML;

// Logique pour le scroll (optionnel si tu veux garder l'effet de flou au scroll)
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = "rgba(250, 250, 248, 0.98)";
        nav.style.padding = "1rem 4rem";
    } else {
        nav.style.background = "linear-gradient(180deg, rgba(250, 250, 248, 0.95) 0%, rgba(250, 250, 248, 0) 100%)";
        nav.style.padding = "2rem 4rem";
    }
});
