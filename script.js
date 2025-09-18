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

let translations = {} // Object to hold translations
let currentLanguage = 'en' // Default language

async function loadTranslations(lang) {
  const response = await fetch(`./locales/${lang}.json`)
  translations[lang] = await response.json()
}

async function setLanguage(lang) {
  currentLanguage = lang
  document.documentElement.lang = lang // Update the lang attribute of the html tag

  if (!translations[lang]) {
    await loadTranslations(lang)
  }

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n')
    if (translations[lang][key]) {
      // Handle strong tag within homeIntro
      if (key === 'homeIntro' || key === 'projectsGithubNote') {
        element.innerHTML = translations[lang][key]
      } else {
        element.textContent = translations[lang][key]
      }
    }
  })

  // Update typing effect phrase
  updateTypingEffectPhrase()

  // Update the selected option in the dropdown
  const languageSelector = document.getElementById('language-selector')
  if (languageSelector) {
    languageSelector.value = lang
  }
}

function updateTypingEffectPhrase() {
  if (translations[currentLanguage]) {
    phrases[0] =
      translations[currentLanguage].homeAbout +
      ' ' +
      translations[currentLanguage].sidebarTitle
    typingEffectElement.textContent = '' // Clear current text
    currentLetter = 0
    typePhrase() // Restart typing effect with new phrase
  }
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
document.addEventListener('DOMContentLoaded', async () => {
  await setLanguage(currentLanguage)
  typePhrase() // Start the typing effect after translations are loaded
})

// Event listener for the language selector
document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('language-selector')
  if (languageSelector) {
    languageSelector.addEventListener('change', event => {
      setLanguage(event.target.value)
    })
  }
})

// --------------------------------------------------------------
function openCategory(categoryName) {
  // Update active tab link styling
  var tabLinks = document.querySelectorAll('.tab-link')
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove('active')
  }
  event.currentTarget.classList.add('active')
}

// Initialize the "All" tab on load
document.addEventListener('DOMContentLoaded', function () {
  const allTabButton = document.getElementById('all-tab')
  if (allTabButton) {
    // Simulate a click event on the "All" tab button
    // This ensures 'event.currentTarget' is correctly set within openCategory
    allTabButton.click()
  }
})
function openLink() {
  var url =
    'https://drive.google.com/file/d/1bi9yW-4-q4fmMe380vGi7gwERvf2oAQj/view'
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
