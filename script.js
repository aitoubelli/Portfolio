// toggle dark/light mode logic
const toggleTheme = () => {
  const root = document.documentElement
  const currentTheme = root.getAttribute('data-theme')
  const themeIcon = document.querySelector('#toggle-button')
  themeIcon.classList.toggle('fa-moon')
  root.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark')
}

const applyUserPreferredMode = () => {
  const root = document.documentElement
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  // Apply user's preferred mode
  root.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light')
}

const toggleButton = document.querySelector('#toggle-button')
window.addEventListener('load', applyUserPreferredMode)
toggleButton.addEventListener('click', toggleTheme)

// --------------------------------------------------------------
// close/open sidebar  logic
function collaplseSidebar() {
  const sidebar = document.querySelector('.sidebar')
  sidebar.classList.toggle('collapsed')

  toggleBurgerIcon()

  const sidebarHeader = document.querySelector('.sidebar-header')
  const children = [...sidebarHeader.children]
  const childrenToHide = children.slice(1)
  if (sidebar.classList.contains('collapsed')) {
    childrenToHide.forEach(child => hideElement(child))
    collapseMenu()
  } else {
    childrenToHide.forEach(child => showElement(child))
    expanedMenu()
  }
  const sidebarLinks = document.querySelector('.sidebar-links')
  sidebarLinks.classList.toggle('collapsed-links')

  const content = document.querySelector('.content')
  content.classList.toggle('expanded-content')
}

function hideElement(element) {
  element.classList.add('hidden')
}

function showElement(element) {
  element.classList.remove('hidden')
}

function collapseMenu() {
  const sidebarMenuItems = [...document.querySelectorAll('.sidebar-menu__item')]
  sidebarMenuItems.forEach(item => {
    item.classList.add('collapsed-item')
    item.firstElementChild.classList.add('collapsed-icon')
  })
}

function expanedMenu() {
  const sidebarMenuItems = [...document.querySelectorAll('.sidebar-menu__item')]
  sidebarMenuItems.forEach(item => {
    item.classList.remove('collapsed-item')
    item.firstElementChild.classList.add('collapsed-icon')
  })
}

function toggleBurgerIcon() {
  const hamburger = document.querySelector('.hamburger')
  const sidebarIcon = document.querySelector('.hamburger i')
  hamburger.classList.toggle('dock-to-right')
  if (sidebarIcon.classList.contains('fa-bars')) {
    sidebarIcon.classList.remove('fa-bars')
    sidebarIcon.classList.add('fa-times')
  } else {
    sidebarIcon.classList.remove('fa-times')
    sidebarIcon.classList.add('fa-bars')
  }
}

const hamburgerButton = document
  .querySelector('.hamburger')
  .addEventListener('click', collaplseSidebar)

// --------------------------------------------------------------
// Function to smoothly scroll to a specific section
function smoothScrollTo(element, duration) {
  var startingY = window.scrollY
  var elementY = window.scrollY + element.getBoundingClientRect().top
  var targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY
  var diff = targetY - startingY
  var easing = function (t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  }
  var start

  if (!diff) return

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp
    // Elapsed milliseconds since start of scrolling.
    var time = timestamp - start
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1)
    // Apply the easing.
    // It can cause bad-looking slow frames in browser performance tool, so be careful.
    percent = easing(percent)

    window.scrollTo(0, startingY + diff * percent)

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step)
    }
  })
}

// Add click event to sidebar links
document.querySelectorAll('.sidebar-menu__item').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault()
    const targetId = this.getAttribute('href').substring(1)
    const targetSection = document.getElementById(targetId)
    smoothScrollTo(targetSection, 500)
  })
})

// --------------------------------------------------------------
const phrases = ['software engineer and data enthusiast']
let currentPhrase = 0
let currentLetter = 0
let typingEffectElement = document.getElementById('typing-effect')
let typingSpeed = 100 // in milliseconds
let deletingSpeed = 50 // in milliseconds

// Language translations
const translations = {
  en: {
    pageTitle: 'AIT OUBELLI | Software engineer and data enthusiast.',
    maintenanceBanner:
      "This site is currently under maintenance. We'll be back soon!",
    sidebarTitle: 'Software engineer',
    navHome: 'Home',
    navAboutMe: 'About Me',
    navEducation: 'Education',
    navSkills: 'Skills',
    navExperience: 'Experience',
    navProjects: 'Projects',
    navBlog: 'Blog',
    navContactMe: 'Contact Me',
    homeWelcome: 'Hello & Welcome!',
    homeIntro: "I'm <strong>AITOUBELLI Salah</strong>,",
    homeAbout: 'As a dedicated',
    homePhilosophy:
      'Driven by curiosity and innovation, I strive to transform ideas into impactful web applications that enhance user experiences.',
    homeCtaButton: 'Download CV',
    aboutMeTitle: 'About Me',
    aboutMeP1:
      "Currently, I'm a third-year student at the University of Upper Alsace, where I'm immersed in an engaging and challenging academic environment. My journey through higher education has been marked by a deep commitment to learning and personal growth, both inside and outside the classroom.",
    aboutMeP2:
      "Throughout my time at the university, I've had the opportunity to work on various academic and personal projects, ranging from complex web applications using modern technologies to simple yet insightful console games that reinforce fundamental programming concepts. My diverse project portfolio, which includes front-end applications, server-side solutions, and full-stack projects, is a testament to my adaptability and eagerness to embrace new challenges.",
    aboutMeP3:
      "Beyond my academic pursuits, I'm an active participant in the tech community, regularly updating my GitHub with projects that showcase my skills across different domains, including game development with classic titles like Snake and Tetris in JavaScript. This hands-on approach to learning has significantly enhanced my problem-solving skills and has kept me at the forefront of emerging technologies.",
    aboutMeP4:
      "I'm passionate about leveraging technology to create impactful solutions and am always on the lookout for opportunities to apply my knowledge in practical, real-world settings.",
    educationTitle: 'Education',
    edu1Degree: 'Master in Software Engineering',
    edu1School: 'University of Bordeaux, Bordeaux (33)',
    edu1Years: '2024-2026',
    edu1Details:
      'Focusing on advanced software engineering principles, design patterns, and large-scale system architecture.',
    edu2Degree: 'Bachelor in Computer Science',
    edu2School: 'University of Haute-Alsace, Mulhouse (68)',
    edu2Years: '2023 - 2024',
    edu2Details:
      'Studied core computer science concepts, including algorithms, data structures, and programming paradigms.',
    edu3Degree: 'Bachelor in Computer Science',
    edu3School: 'University of Mohammed Chérif Messadia, Algeria',
    edu3Years: '2015-2018',
    edu3Details:
      'Completed foundational studies in computer science, covering programming, databases, and networking.',
    skillsTitle: 'Skills',
    skillsTabAll: 'All',
    skillsTabWebDev: 'Web Development',
    skillsTabProgLang: 'Programming Languages',
    skillsTabTools: 'Tools & Technologies',
    skillsFrontendTitle: 'Frontend Development',
    skillsBackendTitle: 'Backend Development',
    skillsDatabasesTitle: 'Databases',
    skillsProgLangTitle: 'Programming Languages',
    skillsToolsTitle: 'Tools & Technologies',
    experienceTitle: 'Professional Experience',
    exp1Position: 'Computer Science Study Officer',
    exp1Company: 'MAATEC Insurance, April 2019 - 2020',
    exp1Detail1:
      'Technical assistance and problem resolution across various offices.',
    exp1Detail2: 'Repair of faulty equipment.',
    exp2Position: 'Software Testing Intern',
    exp2Company: 'ThagasteSoft Technologies, October 2018 - January 2019',
    exp2Detail1: 'Detailed test procedure documentation.',
    exp2Detail2: 'Design and implementation of test scenarios.',
    projectsTitle: 'Projects',
    proj1Title: 'Graph Algo Web Application',
    proj1Description:
      'A complex web application using C++ for server-side processing and HTML, CSS, JavaScript for the UI, implementing various graph algorithms and data structures.',
    proj2Title: 'Chasse aux Fauves Console Game',
    proj2Description:
      'A console game developed in C++ applying OOP principles like inheritance and polymorphism, enhancing my C++ skills and understanding of OOP concepts.',
    projectsGithubNote:
      'For more projects, including front-end applications, back-end solutions, full-stack projects, and classic games like Snake and Tetris in JavaScript, visit my <a href="https://github.com/kit0ra"> GitHub portfolio</a>.',
    blogTitle: 'Blog',
    blog1Title: 'The Future of Web Development',
    blog1Date: 'Posted on January 15, 2024',
    blog1Summary:
      'Exploring the latest trends and technologies shaping the future of web development, from AI-driven design to progressive web applications.',
    blogReadMore: 'Read More',
    blog2Title: 'Understanding JavaScript Asynchronicity',
    blog2Date: 'Posted on February 20, 2024',
    blog2Summary:
      'A deep dive into asynchronous programming in JavaScript, covering callbacks, promises, and async/await syntax to manage asynchronous operations.',
    moreBlogs: 'More Blogs',
    contactTitle: 'Contact Me',
    contactIntro:
      'If you have any questions, project ideas, or just want to say hello, feel free to get in touch with me.',
    contactEmail: 'Email:',
    contactLinkedIn: 'LinkedIn:',
    contactNameLabel: 'Name:',
    contactEmailLabel: 'Email:',
    contactMessageLabel: 'Message:',
    contactSubmitButton: 'Send Message',
  },
  fr: {
    pageTitle: 'AIT OUBELLI | Ingénieur logiciel et passionné de données.',
    maintenanceBanner:
      'Ce site est actuellement en maintenance. Nous serons de retour bientôt !',
    sidebarTitle: 'Ingénieur logiciel',
    navHome: 'Accueil',
    navAboutMe: 'À Propos',
    navEducation: 'Éducation',
    navSkills: 'Compétences',
    navExperience: 'Expérience',
    navProjects: 'Projets',
    navBlog: 'Blog',
    navContactMe: 'Contactez-moi',
    homeWelcome: 'Bonjour & Bienvenue !',
    homeIntro: 'Je suis <strong>AITOUBELLI Salah</strong>,',
    homeAbout: "En tant qu'ingénieur logiciel dédié",
    homePhilosophy:
      "Animé par la curiosité et l'innovation, je m'efforce de transformer les idées en applications web percutantes qui améliorent les expériences utilisateur.",
    homeCtaButton: 'Télécharger CV',
    aboutMeTitle: 'À Propos de Moi',
    aboutMeP1:
      "Actuellement, je suis étudiant en troisième année à l'Université de Haute-Alsace, où je suis immergé dans un environnement académique stimulant et exigeant. Mon parcours dans l'enseignement supérieur a été marqué par un profond engagement envers l'apprentissage et le développement personnel, tant à l'intérieur qu'à l'extérieur de la salle de classe.",
    aboutMeP2:
      "Tout au long de mon séjour à l'université, j'ai eu l'occasion de travailler sur divers projets académiques et personnels, allant d'applications web complexes utilisant des technologies modernes à des jeux console simples mais instructifs qui renforcent les concepts fondamentaux de la programmation. Mon portefeuille de projets diversifié, qui comprend des applications front-end, des solutions côté serveur et des projets full-stack, témoigne de mon adaptabilité et de mon désir d'embrasser de nouveaux défis.",
    aboutMeP3:
      "Au-delà de mes activités académiques, je suis un participant actif de la communauté technologique, mettant régulièrement à jour mon GitHub avec des projets qui mettent en valeur mes compétences dans différents domaines, y compris le développement de jeux avec des titres classiques comme Snake et Tetris en JavaScript. Cette approche pratique de l'apprentissage a considérablement amélioré mes compétences en résolution de problèmes et m'a permis de rester à la pointe des technologies émergentes.",
    aboutMeP4:
      "Je suis passionné par l'exploitation de la technologie pour créer des solutions percutantes et je suis toujours à l'affût d'opportunités d'appliquer mes connaissances dans des contextes pratiques et réels.",
    educationTitle: 'Éducation',
    edu1Degree: 'Master Informatique spécialité Génie Logiciel',
    edu1School: 'Université de Bordeaux, Bordeaux (33)',
    edu1Years: '2024-2026',
    edu1Details:
      "Axé sur les principes avancés de l'ingénierie logicielle, les patrons de conception et l'architecture de systèmes à grande échelle.",
    edu2Degree: 'Licence Informatique',
    edu2School: 'Université de Haute-Alsace, Mulhouse (68)',
    edu2Years: '2023 - 2024',
    edu2Details:
      "Étude des concepts fondamentaux de l'informatique, y compris les algorithmes, les structures de données et les paradigmes de programmation.",
    edu3Degree: 'Licence Informatique',
    edu3School: 'Université de Mohammed Chérif Messadia, Algérie',
    edu3Years: '2015-2018',
    edu3Details:
      'Études fondamentales en informatique, couvrant la programmation, les bases de données et les réseaux.',
    skillsTitle: 'Compétences',
    skillsTabAll: 'Tout',
    skillsTabWebDev: 'Développement Web',
    skillsTabProgLang: 'Langages de Programmation',
    skillsTabTools: 'Outils & Technologies',
    skillsFrontendTitle: 'Développement Frontend',
    skillsBackendTitle: 'Développement Backend',
    skillsDatabasesTitle: 'Bases de Données',
    skillsProgLangTitle: 'Langages de Programmation',
    skillsToolsTitle: 'Outils & Technologies',
    experienceTitle: 'Expérience Professionnelle',
    exp1Position: "Chargé d'Études Informatiques",
    exp1Company: 'MAATEC Assurances, Avril 2019 - 2020',
    exp1Detail1:
      'Assistance technique et résolution de problèmes dans divers bureaux.',
    exp1Detail2: "Réparation d'équipements défectueux.",
    exp2Position: 'Stagiaire en Test Logiciel',
    exp2Company: 'ThagasteSoft Technologies, Octobre 2018 - Janvier 2019',
    exp2Detail1: 'Documentation détaillée des procédures de test.',
    exp2Detail2: 'Conception et implémentation de scénarios de test.',
    projectsTitle: 'Projets',
    proj1Title: 'Application Web Algorithmes de Graphe',
    proj1Description:
      "Une application web complexe utilisant C++ pour le traitement côté serveur et HTML, CSS, JavaScript pour l'interface utilisateur, implémentant divers algorithmes de graphe et structures de données.",
    proj2Title: 'Jeu Console Chasse aux Fauves',
    proj2Description:
      "Un jeu console développé en C++ appliquant les principes de la POO comme l'héritage et le polymorphisme, améliorant mes compétences en C++ et ma compréhension des concepts de la POO.",
    projectsGithubNote:
      'Pour plus de projets, y compris des applications front-end, des solutions back-end, des projets full-stack et des jeux classiques comme Snake et Tetris en JavaScript, visitez mon <a href="https://github.com/kit0ra"> portfolio GitHub</a>.',
    blogTitle: 'Blog',
    blog1Title: "L'Avenir du Développement Web",
    blog1Date: 'Publié le 15 Janvier 2024',
    blog1Summary:
      "Exploration des dernières tendances et technologies façonnant l'avenir du développement web, de la conception basée sur l'IA aux applications web progressives.",
    blogReadMore: 'Lire la suite',
    blog2Title: "Comprendre l'Asynchronisme JavaScript",
    blog2Date: 'Publié le 20 Février 2024',
    blog2Summary:
      'Une plongée profonde dans la programmation asynchrone en JavaScript, couvrant les callbacks, les promesses et la syntaxe async/await pour gérer les opérations asynchrones.',
    moreBlogs: 'Plus de Blogs',
    contactTitle: 'Contactez-moi',
    contactIntro:
      "Si vous avez des questions, des idées de projets ou si vous voulez simplement dire bonjour, n'hésitez pas à me contacter.",
    contactEmail: 'Email :',
    contactLinkedIn: 'LinkedIn :',
    contactNameLabel: 'Nom :',
    contactEmailLabel: 'Email :',
    contactMessageLabel: 'Message :',
    contactSubmitButton: 'Envoyer le message',
  },
}

let currentLanguage = 'en' // Default language

function setLanguage(lang) {
  currentLanguage = lang
  document.documentElement.lang = lang // Update the lang attribute of the html tag
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n')
    if (translations[lang][key]) {
      // Handle strong tag within homeIntro
      if (key === 'homeIntro') {
        element.innerHTML = translations[lang][key]
      } else if (key === 'projectsGithubNote') {
        element.innerHTML = translations[lang][key]
      } else {
        element.textContent = translations[lang][key]
      }
    }
  })

  // Update typing effect phrase
  updateTypingEffectPhrase()

  // Update active class for language buttons
  document.querySelectorAll('.lang-button').forEach(button => {
    button.classList.remove('active')
  })
  document.getElementById(`lang-${lang}`).classList.add('active')
}

function updateTypingEffectPhrase() {
  phrases[0] =
    translations[currentLanguage].homeAbout +
    ' ' +
    translations[currentLanguage].sidebarTitle
  typingEffectElement.textContent = '' // Clear current text
  currentLetter = 0
  typePhrase() // Restart typing effect with new phrase
}

function typePhrase() {
  if (currentLetter < phrases[currentPhrase].length) {
    typingEffectElement.textContent +=
      phrases[currentPhrase].charAt(currentLetter)
    currentLetter++
    setTimeout(typePhrase, typingSpeed)
  } else {
    setTimeout(deletePhrase, 2000) // wait a bit before starting to delete
  }
}

function deletePhrase() {
  if (currentLetter > 0) {
    typingEffectElement.textContent = phrases[currentPhrase].substring(
      0,
      currentLetter - 1
    )
    currentLetter--
    setTimeout(deletePhrase, deletingSpeed)
  } else {
    currentPhrase = (currentPhrase + 1) % phrases.length // move to the next phrase
    setTimeout(typePhrase, typingSpeed) // start typing the next phrase
  }
}

// Initial call to set the default language and start typing effect
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLanguage)
  typePhrase() // Start the typing effect after translations are loaded
})

// Event listeners for language buttons
document
  .getElementById('lang-en')
  .addEventListener('click', () => setLanguage('en'))
document
  .getElementById('lang-fr')
  .addEventListener('click', () => setLanguage('fr'))

// --------------------------------------------------------------
function openCategory(categoryName) {
  // Get all elements with class="skills__category" and hide them
  var categories = document.getElementsByClassName('skills__category')
  for (var i = 0; i < categories.length; i++) {
    categories[i].classList.remove('active-category')
  }

  // Get all elements with class="tab-link" and remove the class "active"
  var tabLinks = document.getElementsByClassName('tab-link')
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '')
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  var activeCategories = document.getElementsByClassName(categoryName)
  for (var i = 0; i < activeCategories.length; i++) {
    activeCategories[i].classList.add('active-category')
  }
  event.currentTarget.className += ' active'
}

// Initialize the "All" tab on load
window.onload = function () {
  openCategory('all')
  document.getElementById('all-tab').classList.add('active')
}
function openLink() {
  var url =
    'https://drive.google.com/file/d/1Jjw-7yYb1nI71Dna4RV1oiK4kv22RQ-u/view'
  window.open(url, '_blank').focus()
}

//
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: '#e94560', // Particle color
    },
    shape: {
      type: 'circle', // Can be "circle", "edge", "triangle", "polygon", "star", "image"
      stroke: {
        width: 0,
        color: '#e94560',
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 5,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#e94560', // Line color
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none', // Can be "none", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"
      random: false,
      straight: false,
      out_mode: 'out', // Can be "out" or "bounce"
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse', // Can be "grab", "bubble", "repulse"
      },
      onclick: {
        enable: true,
        mode: 'push', // Can be "push", "remove", "bubble", "repulse"
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
})
