const myName = 'Ramona';
const tagOfMyName = document.querySelector('h1');
tagOfMyName.innerHTML = '';
const arrOfMyName = myName.split('');
let index = 0;

const simulateTyping = () => {
    if (index < myName.length) {
        tagOfMyName.innerHTML += arrOfMyName[index];
        index++;
        setTimeout(simulateTyping, 200);
    } else {
        --index;
        setTimeout(simulateTypingBackspace, 4000);
    }
};

const simulateTypingBackspace = () => {
    if (index < 0) {
        arrOfMyName.push(...myName.split(''));
        index = 0;
        simulateTyping();
        return;
    }
    if (index <= myName.length) {
        arrOfMyName.pop();
        tagOfMyName.innerHTML = arrOfMyName.join('');
        index--;
        setTimeout(simulateTypingBackspace, 100);
    }
};

simulateTyping();

// FADE IN ANIMATION ON SCROLL
const reveal = document.querySelectorAll('.animate-fadeInUp');
const callback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            if (entry.target.matches('.projects')) {
                if (!document.querySelector('.projects')) {
                    // new Projects(URL).displayProjects(); // Commented out for simplicity, assuming this is defined elsewhere
                }
            }
        } else {
            entry.target.classList.remove('animate-fadeInUp');
        }
    });
};
const io = new IntersectionObserver(callback);
for (let view of reveal) {
    io.observe(view);
}

const social = document.querySelector('footer .social');

social.appendChild(createSocialAnchors('mailto:j.valerio.figueira@gmail.com', 'fa fa-envelope'));
social.appendChild(createSocialAnchors('https://www.linkedin.com/in/valerio-figueira/', 'fa fa-linkedin-square'));
social.appendChild(createSocialAnchors('https://github.com/valerio-figueira', 'fa fa-github'));
social.appendChild(createSocialAnchors('https://www.instagram.com/valerio.figueira/', 'fa fa-instagram'));
social.appendChild(createSocialAnchors('https://www.facebook.com/jvaleriofigueira/', 'fa fa-facebook-official'));

function createSocialAnchors(url, iconClass) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.className = iconClass;
    return anchor;
}

const copyright = document.querySelector('.copyright');
const year = new Date().getFullYear();
copyright.innerHTML = `Copyright - \u00A9 ${year}`;

// NAVBAR
const navbar = document.querySelector('.mobile-menu');
const closeNav = document.querySelector('#menu-toggle');
document.querySelector('#menu-toggle').addEventListener('click', () => {
    if (!navbar.matches('.hidden')) {
        navbar.classList.add('hidden');
        closeNav.addEventListener('click', () => {
            navbar.classList.remove('hidden');
        });
    } else {
        navbar.classList.remove('hidden');
    }
});

document.querySelector('footer .up-btn').addEventListener('click', () => {
    window.open('#home', '_self');
});

/* ABILITIES LINK & POPUP*/
document.querySelectorAll('.abilities li').forEach(li => {
    li.addEventListener('click', (e) => {
        openPopup(e.target);
    });
});

document.querySelector('.close-popup').addEventListener('click', (e) => {
    getConditional(e.target.parentNode);
});

// IF ESC IS PRESSED SO CLOSE POPUP
document.addEventListener('keydown', (e) => {
    if (e.key.match('Escape')) {
        getConditional(document.querySelector('.popup'));
    }
});

async function openPopup(element) {
    const popup = document.querySelector('.popup');

    getConditional(popup);

    // async function and search conditionals
    const technologies = await fetchTechnologies(`https://portfolium-api.netlify.app/technologies/tag/${element.id}`);

    if (technologies != undefined) {
        // new Technologies(technologies); // Commented out for simplicity, assuming this is defined elsewhere
    }
}
// JavaScript to toggle mobile menu
document.getElementById("menu-toggle").addEventListener("click", function() {
    var mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.remove("hidden");
    } else {
        mobileMenu.classList.add("hidden");
    }
});


function getConditional(element) {
    const main = document.querySelector('main');

    if (element.matches('.open')) {
        element.classList.remove('open');
        document.body.style.overflow = 'scroll';
        main.style.filter = 'blur(0)';
        document.querySelector('.popup-content').innerHTML = '';
        document.querySelector('.close-popup').style.display = 'none';
    } else {
        element.classList.add('open');
        document.body.style.overflow = 'hidden';
        main.style.filter = 'blur(3px)';
        document.querySelector('.close-popup').style.display = 'block';
    }
}

async function fetchTechnologies(URL) {
    const spinner = document.querySelector('#popup-spinner');
    spinner.style.display = 'block';

    return fetch(URL)
        .then(response => {
            return Promise.resolve(response);
        })
        .then(data => {
            return data.json();
        })
        .then(technologies => {
            spinner.style.display = 'none';
            return technologies;
        });
}
