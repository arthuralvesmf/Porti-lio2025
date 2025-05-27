// Global Variables
let currentRoleIndex = 0
const roles = ["Desenvolvedor Web e Mobile"]
let typingTimer
let isTyping = false

// DOM Elements
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const typedTextElement = document.querySelector(".typed-text")
const scrollIndicator = document.querySelector(".scroll-indicator")

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializeTypingEffect()
  initializeScrollEffects()
  initializeSkillBars()
  initializeFloatingParticles()
  initializeAnimations()
})

// Navigation Functions
function initializeNavigation() {
  // Mobile menu toggle
  hamburger.addEventListener("click", toggleMobileMenu)

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileMenu()
      const targetId = link.getAttribute("href")
      if (targetId.startsWith("#")) {
        scrollToSection(targetId)
      }
    })
  })

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      scrollToSection(targetId)
    })
  })

  // Update active navigation on scroll
  window.addEventListener("scroll", updateActiveNavigation)

  // Update navbar background on scroll
  window.addEventListener("scroll", updateNavbarBackground)
}

function toggleMobileMenu() {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
}

function closeMobileMenu() {
  hamburger.classList.remove("active")
  navMenu.classList.remove("active")
}

function scrollToSection(targetId) {
  const targetElement = document.querySelector(targetId)
  if (targetElement) {
    const offsetTop = targetElement.offsetTop - 70 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll("section")
  const scrollPosition = window.pageYOffset + 100

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active")
        }
      })
    }
  })
}

function updateNavbarBackground() {
  const navbar = document.querySelector(".navbar")
  if (window.pageYOffset > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(16, 185, 129, 0.2)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"
    navbar.style.boxShadow = "none"
  }
}

// Typing Effect
function initializeTypingEffect() {
  if (typedTextElement) {
    startTypingEffect()
  }
}

function startTypingEffect() {
  const currentRole = roles[currentRoleIndex]
  let charIndex = 0
  isTyping = true

  typedTextElement.textContent = ""

  function typeCharacter() {
    if (charIndex < currentRole.length) {
      typedTextElement.textContent += currentRole.charAt(charIndex)
      charIndex++
      typingTimer = setTimeout(typeCharacter, 100)
    } else {
      isTyping = false
      // Wait 3 seconds before starting next role (if multiple roles)
      if (roles.length > 1) {
        setTimeout(() => {
          currentRoleIndex = (currentRoleIndex + 1) % roles.length
          startTypingEffect()
        }, 3000)
      }
    }
  }

  typeCharacter()
}

// Scroll Effects
function initializeScrollEffects() {
  // Scroll indicator click
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      scrollToSection("#about")
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")

        // Trigger skill bar animations
        if (entry.target.classList.contains("skills")) {
          animateSkillBars()
        }
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".stat-card, .experience-item, .skill-category, .project-card, .contact-item",
  )
  animateElements.forEach((el) => observer.observe(el))

  // Observe sections
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => observer.observe(section))
}

// Skill Bars Animation
function initializeSkillBars() {
  const skillsSection = document.querySelector("#skills")
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              animateSkillBars()
            }, 500)
            skillsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    skillsObserver.observe(skillsSection)
  }
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.getAttribute("data-width")
      bar.style.width = width + "%"
    }, index * 200)
  })
}

// Floating Particles
function initializeFloatingParticles() {
  const particlesContainer = document.querySelector(".floating-particles")
  if (particlesContainer) {
    createFloatingParticles(particlesContainer)
  }
}

function createFloatingParticles(container) {
  const particleCount = 20

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: rgba(16, 185, 129, 0.2);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 2}s infinite ease-in-out;
            animation-delay: ${Math.random() * 3}s;
        `
    container.appendChild(particle)
  }

  // Add CSS animation for particles
  if (!document.querySelector("#particle-styles")) {
    const style = document.createElement("style")
    style.id = "particle-styles"
    style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0.7;
                }
                50% {
                    transform: translateY(-20px) rotate(180deg);
                    opacity: 1;
                }
            }
        `
    document.head.appendChild(style)
  }
}

// General Animations
function initializeAnimations() {
  // Project card hover effects
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Stat cards counter animation
  const statCards = document.querySelectorAll(".stat-card")
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          statsObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  statCards.forEach((card) => statsObserver.observe(card))
}

function animateCounter(card) {
  const numberElement = card.querySelector("h3")
  const finalNumber = numberElement.textContent
  const isPercentage = finalNumber.includes("%")
  const numericValue = Number.parseInt(finalNumber.replace(/\D/g, ""))

  let currentNumber = 0
  const increment = numericValue / 30 // 30 steps
  const timer = setInterval(() => {
    currentNumber += increment
    if (currentNumber >= numericValue) {
      currentNumber = numericValue
      clearInterval(timer)
    }

    const displayValue = Math.floor(currentNumber)
    numberElement.textContent = isPercentage
      ? `${displayValue}%`
      : finalNumber.includes("+")
        ? `${displayValue}+`
        : displayValue
  }, 50)
}

// Utility Functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Smooth reveal animation for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll(".section-title, .about-text, .contact-info")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("fade-in-up")
    }
  })
}

// Add scroll event listener with debounce
window.addEventListener("scroll", debounce(revealOnScroll, 10))

// Initialize reveal on page load
revealOnScroll()

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero) {
    const speed = scrolled * 0.3
    hero.style.transform = `translateY(${speed}px)`
  }
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    closeMobileMenu()
  }

  // Enter key on scroll indicator
  if (e.key === "Enter" && document.activeElement === scrollIndicator) {
    scrollToSection("#about")
  }
})

// Performance optimization: Lazy load images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
lazyLoadImages()

// Console welcome message
console.log(`
🚀 Arthur Alves Portfolio
💚 Desenvolvedor Web e Mobile
🔗 Conecte-se comigo!

Gostou do código? Vamos conversar!
`)

// Service Worker registration (if available)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  // Could send error to analytics service here
})

// Unhandled promise rejection handling
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason)
  e.preventDefault()
})
