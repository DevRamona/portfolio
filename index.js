// Function to type out the name gradually
const myName = 'Ramona';
const tagOfMyName = document.querySelector('h1');
tagOfMyName.innerHTML = ''; // Clear any existing content
const arrOfMyName = myName.split('');
let index = 0;

const simulateTyping = () => {
    if (index < myName.length) {
        tagOfMyName.innerHTML += arrOfMyName[index];
        index++;
        setTimeout(simulateTyping, 200);
    } else {
        setTimeout(simulateTypingBackspace, 4000); // Call backspace simulation after typing
    }
};

const simulateTypingBackspace = () => {
    if (index >= 0) {
        arrOfMyName.pop(); // Remove one character
        tagOfMyName.innerHTML = arrOfMyName.join('');
        index--;
        setTimeout(simulateTypingBackspace, 100);
    } else {
        index = 0; // Reset index
        simulateTyping(); // Restart typing
    }
};

simulateTyping(); // Start the typing animation

// Function to handle fade-in animations on scroll
const reveal = document.querySelectorAll('.animate-fadeInUp');
const callback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
        } else {
            entry.target.classList.remove('animate-fadeInUp');
        }
    });
};
const io = new IntersectionObserver(callback);
reveal.forEach(view => io.observe(view)); // Observe each element with the class 'animate-fadeInUp'

// Function to create social media anchor elements
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

// Function to handle toggling of mobile menu
const mobileMenuToggle = document.getElementById("menu-toggle");
mobileMenuToggle.addEventListener("click", () => {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
});

// Function to scroll to the top when the "Up" button in the footer is clicked
document.querySelector('footer .up-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Function to close popup when the escape key is pressed
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        getConditional(document.querySelector('.popup'));
    }
});

// Function to open popup
async function openPopup(element) {
    const popup = document.querySelector('.popup');
    getConditional(popup);

}

// Function to handle conditional behavior of elements
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

// Function to fetch technologies from API
async function fetchTechnologies(URL) {
    const spinner = document.querySelector('#popup-spinner');
    spinner.style.display = 'block';

    try {
        const response = await fetch(URL);
        const data = await response.json();
        spinner.style.display = 'none';
        return data;
    } catch (error) {
        console.error('Error fetching technologies:', error);
        spinner.style.display = 'none';
        return undefined;
    }
}

// Update copyright year dynamically
const copyright = document.querySelector('.copyright');
const year = new Date().getFullYear();
copyright.textContent = `Copyright - \u00A9 ${year}`;
