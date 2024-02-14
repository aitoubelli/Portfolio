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
const phrases = ['Junior Full-Stack Web Developer']
let currentPhrase = 0
let currentLetter = 0
let typingEffectElement = document.getElementById('typing-effect')
let typingSpeed = 100 // in milliseconds
let deletingSpeed = 50 // in milliseconds

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

typePhrase() // start the typing effect
// --------------------------------------------------------------
