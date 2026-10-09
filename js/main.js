// Render Articles Dynamically on Home/Articles Page
document.addEventListener("DOMContentLoaded", () => {
  const articlesContainer = document.getElementById("articlesGrid");

  if (articlesContainer && typeof techBlogData !== "undefined") {
    renderArticles(techBlogData.articles);
  }

  function renderArticles(items) {
    articlesContainer.innerHTML = "";

    items.forEach((art, index) => {
      // Alternate animation classes for staggered left/right floating effect
      const animationClass = index % 2 === 0 ? "reveal-left" : "reveal-right";

      const cardHTML = `
        <article class="article-card float-card ${animationClass}" onclick="window.location.href='article-detail.html?id=${art.id}'">
          <div>
            <img src="${art.img}" alt="${art.title}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin: 1rem 0 0.5rem 0;">
              <span style="font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; background: var(--bg-secondary); padding: 0.2rem 0.5rem; border-radius: 3px; border: 1px solid var(--border-color);">${art.category}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${art.readTime}</span>
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.35;">${art.title}</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">${art.excerpt}</p>
          </div>
          <div style="border-top: 1px solid var(--border-color); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--text-muted);">
            <span>By ${art.author}</span>
            <span>${art.date}</span>
          </div>
        </article>
      `;
      articlesContainer.insertAdjacentHTML("beforeend", cardHTML);
    });
  }
});



// 1. Navbar Get Started Button Trigger
document.querySelectorAll('.btn-black, [href*="account"], .nav-right a').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Agar link button hai to page reload hone se roko
    if (btn.innerText.includes('Get Started')) {
      e.preventDefault();
      document.getElementById('getStartedModal').classList.add('open');
    }
  });
});

// Close Modal Function
function closeGetStartedModal() {
  document.getElementById('getStartedModal').classList.remove('open');
}

// 2. Handle Account Creation Form Submission
function handleAccountCreation(event) {
  event.preventDefault();
  
  const rightBox = document.getElementById('modalRightContent');
  
  // Dynamic Success Message inside the right box
  rightBox.innerHTML = `
    <div class="account-success-box">
      <div class="success-check-icon">✓</div>
      <h2 class="modal-title">Account Created!</h2>
      <p class="modal-subtitle">Welcome to Tech Core. Your developer profile has been initialized successfully.</p>
      <button onclick="closeGetStartedModal()" class="btn-create-account">GO TO DASHBOARD</button>
    </div>
  `;
}

// 3. Handle Newsletter Subscribe Event on any page
document.querySelectorAll('form').forEach(form => {
  if (form.innerHTML.includes('SUBSCRIBE') || form.innerHTML.includes('subscribe')) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.reset();
      
      // Trigger Toast Notification
      const toast = document.getElementById('subscribeToast');
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000); // 4 seconds baad automatic hide
    });
  }
});


/* ==========================================================================
   TECH CORE - USER STATE SYNC & FORM HANDLERS (Paste at end of main.js)
   ========================================================================== */

// 1. Account Creation Handler (Updates AI Assistant & Shows Success State)
function handleAccountCreation(event) {
  if (event) event.preventDefault();

  const emailField = document.querySelector('#email, .modal-input[type="email"]');
  const userEmail = emailField ? emailField.value : 'Developer';

  // AI Assistant ko user state inform karein
  if (typeof window.syncAccountCreated === 'function') {
    window.syncAccountCreated(userEmail);
  }

  // Success UI Update inside Modal
  const rightBox = document.getElementById('modalRightContent');
  if (rightBox) {
    rightBox.innerHTML = `
      <div class="account-success-box" style="text-align: center; padding: 1rem 0;">
        <div class="success-check-icon" style="width: 54px; height: 54px; background: #111; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 1.2rem auto; font-weight: 700;">✓</div>
        <h2 class="modal-title" style="font-size: 1.75rem; font-weight: 700 !important; margin-bottom: 0.4rem; color: #111;">Account Created!</h2>
        <p class="modal-subtitle" style="font-size: 0.85rem; color: #6b7280; margin-bottom: 2rem;">Welcome to Tech Core. Your developer profile has been initialized successfully.</p>
        <button onclick="closeGetStartedModal()" class="btn-create-account" style="width: 100%; background: #000; color: #fff; padding: 0.85rem; border: none; border-radius: 4px; font-weight: 700 !important; cursor: pointer;">GO TO DASHBOARD</button>
      </div>
    `;
  }
}

// 2. Newsletter Subscribe Handler (Updates AI Assistant & Shows Toast Popup)
function triggerSubscribeSuccess(e) {
  if (e) e.preventDefault();

  // AI Assistant ko subscription state inform karein
  if (typeof window.syncUserSubscribed === 'function') {
    window.syncUserSubscribed();
  }

  // Success Toast Show Karein
  const toast = document.getElementById('subscribeToast');
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}

// 3. Close Get Started Modal Helper
function closeGetStartedModal() {
  const modal = document.getElementById('getStartedModal');
  if (modal) {
    modal.classList.remove('open');
  }
}




/* ==========================================================================
   GLOBAL FORM SUBMISSION & AI ASSISTANT SYNC (Paste at end of main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Account Creation Form Listener
  const accountForm = document.getElementById('createAccountForm') || document.getElementById('modalAccountForm');
  
  if (accountForm) {
    accountForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = accountForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value : 'Developer';

      // LocalStorage mein save karein
      localStorage.setItem('techcore_user_account', 'true');
      localStorage.setItem('techcore_user_email', email);

      // Card / Container ka view update karein
      const container = accountForm.closest('.auth-card') || document.getElementById('modalRightContent');
      if (container) {
        container.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 54px; height: 54px; background: #111; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 1.2rem auto; font-weight: 700;">✓</div>
            <h2 style="font-size: 1.75rem; font-weight: 700 !important; margin-bottom: 0.4rem; color: #111;">Account Created!</h2>
            <p style="font-size: 0.85rem; color: #6b7280; margin-bottom: 1.5rem;">Welcome to Tech Core, <strong>${email}</strong>! Your account is active.</p>
            <button onclick="location.reload()" style="background: #000; color: #fff; padding: 0.85rem 1.5rem; border: none; border-radius: 4px; font-weight: 700; cursor: pointer;">CONTINUE</button>
          </div>
        `;
      }
    });
  }

  // 2. Newsletter Subscribe Listener
  document.querySelectorAll('form').forEach(form => {
    if (form !== accountForm && (form.innerHTML.includes('SUBSCRIBE') || form.innerHTML.includes('subscribe'))) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('techcore_user_subscribed', 'true');
        form.reset();

        const toast = document.getElementById('subscribeToast');
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 4000);
        } else {
          alert('🎉 Successfully Subscribed to Tech Core!');
        }
      });
    }
  });
});



// Form Auto-Sync with LocalStorage for AI Assistant
document.addEventListener("DOMContentLoaded", () => {
    // 1. Account Form Listener
    const accountForm = document.querySelector("#createAccountForm") || document.querySelector("form");
    if (accountForm) {
        accountForm.addEventListener("submit", (e) => {
            const emailField = accountForm.querySelector('input[type="email"]');
            localStorage.setItem('techcore_user_account', 'true');
            if (emailField && emailField.value) {
                localStorage.setItem('techcore_user_email', emailField.value);
            }
        });
    }

    // 2. Subscribe Button / Form Listener
    const subscribeBtns = document.querySelectorAll("button, form");
    subscribeBtns.forEach((btn) => {
        if (btn.textContent.toLowerCase().includes("subscribe")) {
            btn.addEventListener("click", () => {
                localStorage.setItem('techcore_user_subscribed', 'true');
            });
        }
    });
});














document.addEventListener('DOMContentLoaded', () => {
  // 1. Back to Top Smooth Scroll Logic
  const topBtn = document.getElementById('backToTopBtn');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. System Status Modal Toggle Logic
  const statusBtn = document.getElementById('systemStatusBtn');
  const statusModal = document.getElementById('statusModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (statusBtn && statusModal && closeModalBtn) {
    statusBtn.addEventListener('click', () => {
      statusModal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
      statusModal.classList.remove('active');
    });

    statusModal.addEventListener('click', (e) => {
      if (e.target === statusModal) {
        statusModal.classList.remove('active');
      }
    });
  }

  // 3. Dynamic Footer Year Update
  const yearSpan = document.getElementById('footerYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});



function scrollToTop() {
  // 1. Standard Window Smooth Scroll
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });

  // 2. Direct Fallback for Document Element & Body
  document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.scrollTo({ top: 0, behavior: 'smooth' });

  // 3. Container Overflow Fallback (Agar kisi inner div/main tag mein scroll bar ho)
  const scrollableContainers = document.querySelectorAll('main, section, div, .wrapper, #app');
  scrollableContainers.forEach(container => {
    if (container.scrollTop > 0) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}








/* ==========================================================================
   NEW FEATURES EXTENSION (Accents, Scroll Progress, Command Palette)
   Paste this at the very end of your existing js/main.js file
   ========================================================================== */

// Global Accent Theme Switcher
window.setAccent = function(themeName) {
  if (themeName === 'default') {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", themeName);
  }
  localStorage.setItem("techcore_accent", themeName);
};

// Global Focus Mode Toggle
window.toggleFocusMode = function() {
  document.body.classList.toggle("focus-mode");
  const cmdOverlay = document.getElementById("cmdOverlay");
  if (cmdOverlay) cmdOverlay.style.display = "none";
};

// Auto Engine Injector
(function initTechCoreFeatures() {
  const setupFeatures = () => {
    
    // 1. Inject Liquid Glass Accent Picker
    if (!document.querySelector(".theme-picker-floating")) {
      const themeHTML = `
        <div class="theme-picker-floating" title="Change Accent Glow">
          <button class="dot-btn dot-blue" onclick="window.setAccent('default')"></button>
          <button class="dot-btn dot-purple" onclick="window.setAccent('purple')"></button>
          <button class="dot-btn dot-emerald" onclick="window.setAccent('emerald')"></button>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", themeHTML);
    }

    // Restore saved accent preference
    const savedAccent = localStorage.getItem("techcore_accent");
    if (savedAccent) window.setAccent(savedAccent);

    // 2. Inject Reading Scroll Progress Bar
    if (!document.getElementById("readingProgress")) {
      const progressBar = document.createElement("div");
      progressBar.id = "readingProgress";
      document.body.appendChild(progressBar);

      window.addEventListener("scroll", () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = (window.scrollY / totalHeight) * 100;
          progressBar.style.width = progress + "%";
        }
      });
    }

    // 3. Inject Command Palette (Ctrl + K) Modal
    if (!document.getElementById("cmdOverlay")) {
      const cmdHTML = `
        <div class="cmd-overlay" id="cmdOverlay" style="display: none;">
          <div class="cmd-box">
            <input type="text" id="cmdInput" class="cmd-input" placeholder="Type a command or jump to page... (Press ESC to close)" />
            <div class="cmd-results" id="cmdResults">
              <div class="cmd-item" onclick="location.href='index.html'"><span>🏠 Home Page</span> <code>Jump</code></div>
              <div class="cmd-item" onclick="location.href='articles.html'"><span>📚 Technical Articles</span> <code>Jump</code></div>
              <div class="cmd-item" onclick="location.href='resources.html'"><span>🎨 UI Resources & Code</span> <code>Jump</code></div>
              <div class="cmd-item" onclick="location.href='courses.html'"><span>🎓 Courses & Roadmaps</span> <code>Jump</code></div>
              <div class="cmd-item" onclick="location.href='author.html'"><span>👩‍💻 Author Profile</span> <code>Jump</code></div>
              <div class="cmd-item" onclick="window.toggleFocusMode()"><span>🧘 Toggle Focus Reading Mode</span> <code>Action</code></div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", cmdHTML);
    }

    // Command Palette Keyboard Listeners
    const cmdOverlay = document.getElementById("cmdOverlay");
    const cmdInput = document.getElementById("cmdInput");

    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (cmdOverlay) {
          cmdOverlay.style.display = (cmdOverlay.style.display === "none" || cmdOverlay.style.display === "") ? "flex" : "none";
          if (cmdOverlay.style.display === "flex" && cmdInput) cmdInput.focus();
        }
      }
      if (e.key === "Escape" && cmdOverlay && cmdOverlay.style.display === "flex") {
        cmdOverlay.style.display = "none";
      }
    });

    if (cmdOverlay) {
      cmdOverlay.addEventListener("click", (e) => {
        if (e.target === cmdOverlay) cmdOverlay.style.display = "none";
      });
    }
  };

  // Safe DOM Load execution
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupFeatures);
  } else {
    setupFeatures();
  }
})();


/* ==========================================================================
   UNIVERSAL DOCUMENT DELEGATION FOR EXTERNAL EXPLORE LINKS
   ========================================================================== */
document.addEventListener("click", function (e) {
  // Find if clicked element or its parent contains text 'EXPLORE'
  var target = e.target;
  
  if (!target) return;

  var text = (target.innerText || target.textContent || "").trim().toUpperCase();

  if (text === "EXPLORE") {
    e.preventDefault();
    e.stopPropagation();

    // Mapping card topics to external links
    var EXTERNAL_MAP = {
      "UI Kits & Tokens": "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
      "JS Architecture Specs": "https://javascript.info/",
      "AI Prompt Engineering": "https://www.promptingguide.ai/",
      "A11y Checklists": "https://www.w3.org/WAI/ARIA/apg/",
      "Git & CI/CD Boilerplates": "https://docs.github.com/en/actions",
      "Full-Stack Schemas": "https://expressjs.com/",
      "Icon & Asset Libraries": "https://css-tricks.com/an-explicit-idea-for-using-svgs/",
      "Engineering Roadmaps": "https://roadmap.sh/frontend"
    };

    // Find card title from nearest parent container
    var parent = target.parentElement;
    var cardTitle = "";

    while (parent && parent !== document.body) {
      var heading = parent.querySelector("h1, h2, h3, h4, h5, strong, b");
      if (heading) {
        cardTitle = heading.innerText.trim();
        break;
      }
      parent = parent.parentElement;
    }

    var targetUrl = EXTERNAL_MAP[cardTitle] || "https://roadmap.sh/frontend";
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  }
}, true);



/* ==========================================================================
   PREMIUM ENHANCEMENTS: SEARCH, BOOKMARKS & DYNAMIC SPOTLIGHT
   ========================================================================== */
(function initPremiumFeatures() {
  document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DYNAMIC SEARCH BAR INJECTION FOR RESOURCES PAGE
    const resourceHeader = document.querySelector(".resources-header, header, .hero");
    if (resourceHeader && !document.getElementById("resource-search-input")) {
      const searchContainer = document.createElement("div");
      searchContainer.className = "premium-search-wrapper";
      searchContainer.style.cssText = "margin: 20px auto; max-width: 500px; position: relative;";

      searchContainer.innerHTML = `
        <input type="text" id="resource-search-input" placeholder="⚡ Search resources, topics, tools..." 
               style="width:100%; padding: 12px 20px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1); 
                      background: rgba(255,255,255,0.05); color: #fff; backdrop-filter: blur(10px); outline: none;">
      `;
      resourceHeader.appendChild(searchContainer);

      const searchInput = document.getElementById("resource-search-input");
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll(".card, .resource-card");
        
        cards.forEach((card) => {
          const text = card.innerText.toLowerCase();
          if (text.includes(query)) {
            card.style.display = "";
            card.style.opacity = "1";
          } else {
            card.style.display = "none";
            card.style.opacity = "0";
          }
        });
      });
    }

    // 2. DYNAMIC SPOTLIGHT CURSOR GLOW EFFECT ON CARDS
    const cards = document.querySelectorAll(".card, .resource-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });

  });
})();