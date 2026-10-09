/**
 * Tech Core — Intelligent Deep Knowledge & Voice AI Engine
 * Built for Mahnoor Fatima (Tech Core Lead Engineer)
 */

// 1. Analytics & Activity Tracking Engine
(function trackAnalytics() {
  const now = new Date();
  const timestamp = now.toLocaleString();

  let analytics = JSON.parse(localStorage.getItem('techcore_analytics')) || {
    totalVisits: 0,
    history: [],
    queries: []
  };

  analytics.totalVisits += 1;
  analytics.history.push({
    page: window.location.pathname.split('/').pop() || 'index.html',
    time: timestamp
  });

  localStorage.setItem('techcore_analytics', JSON.stringify(analytics));
})();

function logUserQuery(queryText, isRoman) {
  let analytics = JSON.parse(localStorage.getItem('techcore_analytics')) || { totalVisits: 0, history: [], queries: [] };
  analytics.queries.push({
    query: queryText,
    language: isRoman ? 'Roman Urdu' : 'English',
    time: new Date().toLocaleString()
  });
  localStorage.setItem('techcore_analytics', JSON.stringify(analytics));
}

// 2. DOM Initialization Engine
document.addEventListener("DOMContentLoaded", () => {

  if (!document.getElementById("aiTrigger")) {
    const widgetHTML = `
      <div class="ai-widget-trigger" id="aiTrigger" title="Tech Core AI Assistant">
        AI 💬
      </div>

      <div class="ai-chat-window" id="aiWindow" style="display: none;">
        <div class="ai-chat-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="status-pulse"></span>
            <strong>Tech Core AI Assistant</strong>
          </div>
          <span id="closeAi" style="cursor: pointer; font-size: 1.1rem; opacity: 0.8;">✕</span>
        </div>
        <div class="ai-chat-body" id="aiChatBody">
          <div class="chat-msg bot">
            Hello! Welcome to Tech Core AI Assistant ✨ Main aapki kis tarah madad kar sakta hoon? Aap kisi bhi page, feature, code snippet ya site functionality ki complete details pooch sakte hain!
          </div>
        </div>
        <div class="ai-chat-input-area">
          <input type="text" id="aiInput" placeholder="Ask AI or click microphone..." />
          <button id="micBtn" style="background: transparent; border: none; cursor: pointer; font-size: 1.2rem; margin: 0 4px;" title="Click to Speak">🎙️</button>
          <button class="btn-black" id="aiSendBtn" style="padding: 0.45rem 0.85rem; font-size: 0.8rem; cursor: pointer;">Send</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", widgetHTML);
  }

  const trigger = document.getElementById("aiTrigger");
  const windowEl = document.getElementById("aiWindow");
  const closeBtn = document.getElementById("closeAi");
  const sendBtn = document.getElementById("aiSendBtn");
  const inputEl = document.getElementById("aiInput");
  const chatBody = document.getElementById("aiChatBody");
  const micBtn = document.getElementById("micBtn");

  trigger.addEventListener("click", () => {
    windowEl.style.display = windowEl.style.display === "flex" ? "none" : "flex";
  });

  closeBtn.addEventListener("click", () => {
    windowEl.style.display = "none";
  });

  // 3. FULL DEEP KNOWLEDGE GRAPH
  const KNOWLEDGE_GRAPH = [
    {
      type: "greeting",
      keys: ["hy", "hi", "hello", "hey", "salam", "aoa", "assalam", "kaise ho", "kaisa hai", "good morning", "good evening", "welcome"],
      roman: `Hello! Warm welcome to Tech Core! ✨ Main aapka AI Assistant hoon. Aap platform ke kisi bhi page (Articles, Home, Resources, Courses, Author, About), Liquid Glass Themes, Command Palette (Ctrl+K), ya Code Workflows ki complete detail pooch sakte hain!`,
      english: `Hello & Welcome to Tech Core! ✨ I am your AI Assistant. Ask me anything about pages (Articles, Home, Resources, Courses, Author, About), Glassmorphism UI, or features like Command Palette (Ctrl+K). How can I assist you?`
    },
    {
      type: "goodbye",
      keys: ["bye", "goodbye", "good bye", "allah hafiz", "khuda hafiz", "see you", "take care", "shukriya", "thanks", "thank you", "tc", "alvida"],
      roman: `Shukriya Tech Core visit karne ka! 🚀 Aasha hai aapko saari details samajh aa gayi hongi. Agar mazeed koi sawaal ho to main yahin hoon. Have a great time & Happy Coding! ✨`,
      english: `Thank you for exploring Tech Core! 🚀 Feel free to return anytime if you need more assistance. Have an amazing day & Happy Coding! ✨`
    },
    {
      type: "page_articles",
      keys: ["article page", "articles page", "articles", "article section", "article directory", "search article"],
      roman: `<strong>Articles Page (articles.html) Comprehensive Breakdown:</strong><br><br>` +
             `Articles Page Tech Core ka sab se bada technical knowledge hub hai:<br>` +
             `1. <strong>Real-Time Live Search Engine:</strong> Client-side JavaScript search engine jo title aur tags dynamic filter karta hai.<br>` +
             `2. <strong>Trending Category Tags:</strong> Instant filter tags (JS Architecture, Glass UI, Performance Engine).<br>` +
             `3. <strong>High-Density Article Cards:</strong> Reading time indicators, author tags, aur detailed snippets.<br>` +
             `4. <strong>Community Interactive Comments:</strong> Direct developer feedback system.<br>` +
             `5. <strong>Focus Reading Mode:</strong> distraction-free clean reading environment.`,
      english: `<strong>Articles Page (articles.html) Breakdown:</strong> Features real-time client-side search, category tag filtering, high-density cards, reading time estimation, and community comment engines.`
    },
    {
      type: "page_home",
      keys: ["home page", "index page", "main page", "landing page", "index.html"],
      roman: `<strong>Home Page (index.html) Architecture Breakdown:</strong><br><br>` +
             `1. <strong>Liquid Glass Hero Banner:</strong> Aesthetic landing region with frosted visual glass UI.<br>` +
             `2. <strong>User Persona Segment:</strong> Customized content paths for Frontend Developers & UI Designers.<br>` +
             `3. <strong>Featured Technical Guides:</strong> Top popular guides highlights.<br>` +
             `4. <strong>Platform Key Metrics:</strong> Zero-latency performance benchmarks.<br>` +
             `5. <strong>Global AI Assistant:</strong> Floating interactive engine.`,
      english: `<strong>Home Page (index.html) Breakdown:</strong> Liquid Glass landing banner, persona mapping for UI/UX developers, featured guides showcase, and AI widget integration.`
    },
    {
      type: "page_resources",
      keys: ["resource page", "resources page", "resources", "resource section", "resources.html", "ui resources", "code snippets"],
      roman: `<strong>Resources Page (resources.html) Code Vault Breakdown:</strong><br><br>` +
             `1. <strong>Glassmorphism CSS UI Kit:</strong> Frosted glass components & CSS generator.<br>` +
             `2. <strong>JavaScript Utility Code Vault:</strong> Reusable production JS helper functions.<br>` +
             `3. <strong>Design System Tokens:</strong> CSS variables, glow accents, aur color models.<br>` +
             `4. <strong>1-Click Clipboard Engine:</strong> Dynamic one-click code copy buttons.`,
      english: `<strong>Resources Page Breakdown:</strong> Glassmorphism UI kit, production JavaScript utility code vault, design system tokens, and 1-click clipboard code copy buttons.`
    },
    {
      type: "page_courses",
      keys: ["course page", "courses page", "courses", "course section", "courses.html", "roadmaps"],
      roman: `<strong>Courses Page (courses.html) Learning Tracks Breakdown:</strong><br><br>` +
             `1. <strong>Frontend Engineering Roadmap:</strong> HTML5, CSS layout engines, Modern ES6+ JS.<br>` +
             `2. <strong>Web Vitals & Performance Engineering:</strong> V8 execution engine aur DOM rendering optimization.<br>` +
             `3. <strong>Curriculum Modules Cards:</strong> Step-by-step skill breakdown cards.`,
      english: `<strong>Courses Page Breakdown:</strong> Structured roadmaps covering Frontend Engineering, Web Vitals, and V8 DOM performance rendering.`
    },
    {
      type: "page_author",
      keys: ["author page", "profile page", "developer page", "mahnoor page", "author.html", "portfolio"],
      roman: `<strong>Author Profile (author.html) Technical Portfolio:</strong><br><br>` +
             `1. <strong>Professional Profile & Internship:</strong> Mahnoor Fatima's Aptura Tech Solutions internship experience.<br>` +
             `2. <strong>Web Engineering Projects:</strong> DevMatrix, WorkPilot, StudyTrack, aur Tech Core.<br>` +
             `3. <strong>Social & Repository Integrations:</strong> Direct GitHub repositories & LinkedIn connections.`,
      english: `<strong>Author Page Profile:</strong> Showcases Lead Engineer Mahnoor Fatima, her Aptura Tech Solutions internship, and projects like DevMatrix, WorkPilot, StudyTrack, and Tech Core.`
    },
    {
      type: "page_about",
      keys: ["about page", "case study page", "about section", "about.html", "architecture"],
      roman: `<strong>About Page (about.html) Technical Case Study:</strong><br><br>` +
             `1. <strong>Zero-Bloat Mission:</strong> Clean developer documentation without ads or bloat.<br>` +
             `2. <strong>Vanilla JS Architecture:</strong> Zero-dependency execution framework.<br>` +
             `3. <strong>Performance Audit Metrics:</strong> Lighthouse score breakdown (99.9% uptime).`,
      english: `<strong>About Page Breakdown:</strong> Technical case study highlighting zero-dependency Vanilla JS architecture, 99.9% Lighthouse scores, and ad-free design philosophy.`
    },
    {
      type: "site_features",
      keys: ["features", "shortcut", "cmd k", "ctrl k", "focus mode", "accent", "command palette", "progress bar"],
      roman: `<strong>Tech Core New Next-Gen Features:</strong><br><br>` +
             `1. <strong>Command Palette (Ctrl / Cmd + K):</strong> Quick navigation modal for instant page jumping.<br>` +
             `2. <strong>Liquid Glass Accent Picker:</strong> Bottom-left glowing color accent selector (Default Blue, Purple, Emerald).<br>` +
             `3. <strong>Scroll Reading Progress Bar:</strong> Top gradient reading progress visual indicator.<br>` +
             `4. <strong>Focus Reading Mode:</strong> Clean, distraction-free reading setup.<br>` +
             `5. <strong>Speech-to-Text Voice Support:</strong> Click microphone icon in AI Assistant to speak queries!`,
      english: `<strong>Tech Core Next-Gen Features:</strong> Command Palette (Ctrl+K), Liquid Glass Color Accents, Top Scroll Reading Bar, Focus Mode, and Voice Speech-to-Text Search.`
    },
    {
      type: "directory",
      keys: ["all pages", "pages list", "list pages", "kitne page", "kitny page", "total page", "site map", "directory"],
      roman: `<strong>Tech Core Directory (6 Main Pages):</strong><br><br>` +
             `1. <strong>Home (index.html):</strong> Overview & Persona Showcase.<br>` +
             `2. <strong>Articles (articles.html):</strong> Searchable Technical Hub.<br>` +
             `3. <strong>Resources (resources.html):</strong> Glass UI & JS Utilities.<br>` +
             `4. <strong>Courses (courses.html):</strong> Frontend Engineering Roadmaps.<br>` +
             `5. <strong>Author (author.html):</strong> Developer Portfolio.<br>` +
             `6. <strong>About (about.html):</strong> Case Study & Performance Audit.`,
      english: `<strong>Tech Core Directory:</strong> Home, Articles, Resources, Courses, Author, and About pages.`
    },
    {
      type: "author_info",
      keys: ["mahnoor", "fatima", "author", "creator", "owner", "who made", "developer", "built by", "kisne banaya"],
      roman: `<strong>Author Details (Mahnoor Fatima):</strong><br><br>` +
             `Tech Core ko **Mahnoor Fatima** ne design aur engineer kiya hai. Wo Aptura Tech Solutions mein Web Development Intern reh chuki hain aur DevMatrix, WorkPilot, StudyTrack aur Tech Core ki Lead Developer hain.`,
      english: `<strong>Author Profile:</strong> Engineered by **Mahnoor Fatima**, Lead Engineer behind Tech Core, DevMatrix, and WorkPilot.`
    }
  ];

  // 4. Intent Scoring & Processor Engine
  function processAIResponse(rawQuery) {
    const clean = rawQuery.toLowerCase().trim();
    const romanWords = ["hy", "q", "kyu", "kyun", "kon", "kia", "kya", "kitne", "kitny", "kaise", "kysy", "hain", "hyn", "hai", "hu", "ho", "me", "ma", "par", "se", "sy", "ko", "baare", "bara", "batao", "bataw", "samjh", "smj", "bataen", "samjao", "smjao", "usko", "wo", "ye", "faida", "bhi", "bta", "btao"];
    const isRoman = romanWords.some(w => clean.split(" ").includes(w));

    logUserQuery(rawQuery, isRoman);

    let bestMatch = null;
    let maxScore = 0;

    KNOWLEDGE_GRAPH.forEach(item => {
      let score = 0;
      item.keys.forEach(key => {
        if (clean === key) {
          score += 100;
        } else if (clean.includes(key)) {
          score += key.length * 3;
        }
      });
      if (score > maxScore) {
        maxScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch && maxScore > 0) {
      return isRoman ? bestMatch.roman : bestMatch.english;
    }

    return isRoman
      ? `Main Tech Core AI Engine hoon. Aap ke sawaal (<em>"${rawQuery}"</em>) ke baare mein main aapko complete details de sakta hoon. Aap kisi bhi page ka naam (Articles, Home, Resources, Courses, Author, About) ya features (Ctrl+K, Accents) poochen!`
      : `I am the Tech Core AI Engine. Feel free to mention any specific page, feature (Ctrl+K, Voice, Focus Mode), or code snippet to get a full breakdown!`;
  }

  // 5. Chat Execution Handlers
  function handleSend() {
    const rawText = inputEl.value.trim();
    if (!rawText) return;

    appendMessage(rawText, "user");
    inputEl.value = "";

    setTimeout(() => {
      const response = processAIResponse(rawText);
      appendMessage(response, "bot");
    }, 200);
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });

  // 6. FULLY WORKABLE SPEECH-TO-TEXT VOICE SUPPORT ENGINE
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Supports English & Romanized voice inputs smoothly

    let isListening = false;

    micBtn.addEventListener("click", () => {
      if (!isListening) {
        try {
          recognition.start();
          isListening = true;
          micBtn.innerText = "🛑";
          micBtn.title = "Recording... Speak now!";
          inputEl.placeholder = "Listening to your voice...";
        } catch (err) {
          console.error("Speech recognition error:", err);
        }
      } else {
        recognition.stop();
        isListening = false;
        micBtn.innerText = "🎙️";
        inputEl.placeholder = "Ask AI or click microphone...";
      }
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      inputEl.value = transcript;
      micBtn.innerText = "🎙️";
      isListening = false;
      inputEl.placeholder = "Ask AI or click microphone...";
      handleSend(); // Auto-send query after speaking
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error event:", event.error);
      micBtn.innerText = "🎙️";
      isListening = false;
      inputEl.placeholder = "Ask AI or click microphone...";
    };

    recognition.onend = () => {
      micBtn.innerText = "🎙️";
      isListening = false;
      inputEl.placeholder = "Ask AI or click microphone...";
    };
  } else {
    // Hide mic icon if browser doesn't support Web Speech API (e.g. older browsers)
    if (micBtn) micBtn.style.display = "none";
  }
});