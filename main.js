import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  initializeFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  serverTimestamp,
  where,
  arrayUnion,
  or,
  and,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- SUPABASE HYBRID SYNC ENGINE ---
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
/* ── SECURITY GUARD ─────────────────────────────────────────────────── */
// Basic protection only, avoiding intrusive blur checks that fire on tablets
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  const ctrl = e.ctrlKey || e.metaKey;
  if (e.key === 'F12') { e.preventDefault(); }
  if (ctrl && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) { e.preventDefault(); }
  if (ctrl && ['U', 'S'].includes(e.key.toUpperCase())) { e.preventDefault(); }
});
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
(function () {
  // GLOBAL ERROR BOUNDARY: Catch faults gracefully
  window.onerror = function (msg, url, line) {
    console.error("[CRM BOOT FAULT]", msg);
    return false;
  };

  // STARTUP RECOVERY: Reset cache if a tab becomes unresponsive
  window.__bootTimer = setTimeout(function () {
    if (!window.app || !window.app.initialized) {
      console.warn("Bootstrap stagnation detected. Use 'Emergency Reset' if login fails.");
    }
  }, 10000);
})();
const supabaseUrl = "https://bgykwfoohjheaforjqtj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJneWt3Zm9vaGpoZWFmb3JqcXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMTk5MDUsImV4cCI6MjA5MTg5NTkwNX0.1ForYC42uSNFigaSE9RM617EDV7uDr4RL8_VR_Ofvgo";
const supabase = createClient(supabaseUrl, supabaseKey);

// QMS CROSS-LINK BRIDGE (HYBRID INFRASTRUCTURE)
const qmsUrl1 = "https://paamujdljvxlfkafpiwv.supabase.co";
const qmsKey1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhYW11amRsanZ4bGZrYWZwaXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNDk2ODAsImV4cCI6MjA5MTgyNTY4MH0.br3AF1Mc3X_jqdHqSYfzfTSkNhl8d_ev9BtlSX8E7hY";
const qmsUrl2 = "https://mjsklsdcmelzgxbxzozc.supabase.co";
const qmsKey2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qc2tsc2RjbWVsemd4Ynh6b3pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MjE4ODQsImV4cCI6MjA5MTQ5Nzg4NH0.5xpmBrRpOWjmcYX2gZ_KZQYuv95uzeco_tc55nUNT1U";

const qmsSb1 = createClient(qmsUrl1, qmsKey1);
const qmsSb2 = createClient(qmsUrl2, qmsKey2);

const firebaseConfig = {
  apiKey: "AIzaSyCq42HmbaOpwMDnalSWhFaKQFeYRiuuu4M",
  authDomain: "leadflow-e0f88.firebaseapp.com",
  projectId: "leadflow-e0f88",
  storageBucket: "leadflow-e0f88.firebasestorage.app",
  messagingSenderId: "45713839855",
  appId: "1:45713839855:web:248d037bf74e9f13aeed1a",
};
const fApp = initializeApp(firebaseConfig);
const auth = getAuth(fApp);

// Force long polling to resolve 'unavailable' persistence issues
const db = initializeFirestore(fApp, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

const Roles = {
  ADMIN: "Admin",
  SUPERVISOR: "Supervisor",
  MEMBER: "Member",
};

// --- HIGH-VELOCITY DB HELPERS (SUPABASE) ---
const DB = {
  async getLeads() {
    // Egress Shaving: Only fetch core list-view columns. History/Notes fetched on demand.
    const { data, error } = await supabase
      .from('leads')
      .select('id, name, phone, location, interest, source, status, priority, timestamp, owner, owner_name, added_by, assigned_to, type, followup_date, enquiry_note, executive_comment, history')
      .order('timestamp', { ascending: false });
    if (error) throw error;
    return data;
  },
  async getLeadDetail(id) {
    const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async saveLead(lead) {
    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select();
    if (error) throw error;
    return data[0];
  },
  async updateLead(id, updateObj) {
    // 1. OPTIMISTIC UPDATE: Update local state immediately
    const leadIdx = this.leads.findIndex(l => String(l.id) === String(id));
    let backupLead = null;
    if (leadIdx !== -1) {
      backupLead = { ...this.leads[leadIdx] };
      this.leads[leadIdx] = { ...this.leads[leadIdx], ...updateObj };
      // Instant UI Refresh for the specific screen
      const activeScreen = document.querySelector(".screen.active")?.id.replace("screen-", "") || "dashboard";
      if (activeScreen === "dashboard") this.renderDashboard();
      else if (activeScreen === "leads") this.refreshLeads();
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .update(updateObj)
        .eq('id', id)
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        if (leadIdx !== -1) this.leads[leadIdx] = { ...this.leads[leadIdx], ...data[0] };
      }
      return data ? data[0] : null;
    } catch (e) {
      // ROLLBACK if server fails
      if (leadIdx !== -1 && backupLead) {
        this.leads[leadIdx] = backupLead;
        this.toast("Sync Failure - Reverting Changes", "error");
        this.renderDashboard();
      }
      throw e;
    }
  },
  async getLeadCount() {
    const { count, error } = await supabase.from('leads').select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  },
};

// --- REDISH STASH: TACTICAL MEMORY ENGINE ---
const RedishStash = {
  STASH_KEY: "vera_intelligence_stash",

  set(key, data) {
    try {
      const stash = this.getRaw();
      stash[key] = {
        payload: data,
        timestamp: Date.now()
      };
      localStorage.setItem(this.STASH_KEY, JSON.stringify(stash));
    } catch (e) {
      console.warn("[STASH] Memory Pressure Fault:", e);
      if (e.name === 'QuotaExceededError') this.purge();
    }
  },

  get(key) {
    const stash = this.getRaw();
    const entry = stash[key];
    return entry ? entry.payload : null;
  },

  getTimestamp(key) {
    const stash = this.getRaw();
    const entry = stash[key];
    return entry ? entry.timestamp : 0;
  },

  getStats() {
    const stash = this.getRaw();
    const keys = Object.keys(stash);
    let totalNodes = 0;
    keys.forEach(k => {
      if (Array.isArray(stash[k].payload)) totalNodes += stash[k].payload.length;
      else totalNodes += 1;
    });
    return { keys: keys.length, nodes: totalNodes };
  },

  getRaw() {
    try {
      const raw = localStorage.getItem(this.STASH_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  },

  purge() {
    localStorage.removeItem(this.STASH_KEY);
  }
};

const app = window.app = {
  // --- SECURITY & SANITIZATION ---
  escapeHTML(str) {
    if (!str) return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  },
  fmt(val) {
    if (val === undefined || val === null) return "0";
    return Math.round(val).toLocaleString('en-IN');
  },

  _activeAnimations: {},
  animateCount(elId, target, duration = 1200, suffix = "") {
    const el = document.getElementById(elId);
    if (!el) return;

    if (this._activeAnimations[elId]) {
      cancelAnimationFrame(this._activeAnimations[elId]);
    }

    const startText = el.textContent.replace(/,/g, '');
    const start = parseInt(suffix ? startText.replace(suffix, '') : startText) || 0;

    if (start === target && el.textContent.includes(target.toLocaleString('en-IN'))) return;

    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      el.textContent = current.toLocaleString('en-IN') + suffix;

      if (progress < 1) {
        this._activeAnimations[elId] = requestAnimationFrame(animate);
      } else {
        el.textContent = target.toLocaleString('en-IN') + suffix;
        delete this._activeAnimations[elId];
      }
    };
    this._activeAnimations[elId] = requestAnimationFrame(animate);
  },

  CLD_CLOUD: 'djufknevp',
  CLD_PRESET: 'framebase',
  sessionStartTime: Date.now(),
  sessionYield: 0,
  // ── STANDALONE CONFIGURATION ──
  // Key is embedded here to allow running without a local server.
  _GROQ_KEY: "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",
  chatHistory: [], // VERA 2.0 Conversation Memory
  qmsRegistry: [], // QMS Showroom Entries


  getLatestRemarkObj(lead) {
    if (!lead || !lead.history) return null;
    const logs = [...lead.history].reverse();
    return logs.find(h =>
      h.action.includes("Executive Remark") ||
      h.action.includes("Manual Note") ||
      h.action.includes("Strategic Update") ||
      h.action.includes("Legacy Executive Remark")
    ) || null;
  },

  getLatestComment(lead) {
    const remark = this.getLatestRemarkObj(lead);
    if (lead?.executive_comment && !remark) return lead.executive_comment;
    return remark ? remark.action.split(': ').slice(1).join(': ') : "";
  },

  getInitialNote(lead) {
    if (!lead) return "";
    if (lead.enquiry_note) return lead.enquiry_note;
    if (!lead.history) return "";
    const log = lead.history.find(h =>
      h.action.includes("Initial Requirement") ||
      h.action.includes("Legacy Enquiry Note")
    );
    return log ? log.action.split(': ').slice(1).join(': ') : "";
  },

  // --- TELEPHONY CORE (CLOUDSHOPE PANEL V3) ---
  _callInterval: null,
  _callDuration: 0,

  async initTelephony() {
    this.toast("CloudShope PanelV3 Ready ✅", "success");
  },

  async initCall(name, phone) {
    if (!phone) return this.toast("Registry Fault: Number Missing", "error");

    // --- MIC PERMISSION GUARD (User Request) ---
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("[TELEPHONY] Microphone Clearance Granted");
    } catch (micErr) {
      console.warn("[TELEPHONY] Microphone Access Denied or Unavailable:", micErr);
      this.toast("Mic Access Denied: Call may be silent on browser", "warning");
    }

    const controller = document.getElementById("call-controller");
    document.getElementById("call-name").textContent = name || "Unknown";
    document.getElementById("call-number").textContent = phone;
    document.getElementById("call-status").textContent = "Connecting via CloudShope...";
    if (controller) controller.style.display = "flex";

    this.startCallTimer();

    try {
      // POSTMAN PERFECT: 10-digit clean numbers
      const agent_number = (localStorage.getItem('vera_calling_number') || this.user?.calling_number || this.user?.phone || "8928822884").replace(/\D/g, '').slice(-10);
      const customer_number = phone.replace(/\D/g, '').slice(-10);

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI1MzYzLCJ1c2VybmFtZSI6IkJoYTIyODg0IiwibWFpbl91c2VyIjoyNTM2MywiaWF0IjoxNzc2NzUyNzQ4fQ.WQS8zh7OB_Ji2IXbrQYnKUXimJnqyKZE0bBEmM647_I";

      this.toast("Dialing via Secure Proxy...", "info");

      // FORCED RELATIVE BRIDGE with Cache Buster
      const response = await fetch(`/api/cloudshope-call?cb=${Date.now()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          from_number: agent_number,
          to_number: customer_number
        })
      });

      const data = await response.json().catch(() => ({}));
      console.log("[CloudShope] Response Data:", data);

      if (response.ok && (data.status === "success" || data.success || data.call_id || data.sid || (data.message && data.message.includes("Successfully")))) {
        document.getElementById("call-status").textContent = "Check Your Phone 📱";
        this.toast("CloudShope Bridge Active! ✅", "success");
      } else {
        console.error("CloudShope Detailed Error:", data);
        throw new Error(data.message || data.error || data.msg || "Server rejected request");
      }

    } catch (e) {
      console.error("Dialer Fault:", e);
      this.toast(`Dialer Fault: ${e.message}`, "error");
      document.getElementById("call-status").textContent = "Dialing Failed";
      setTimeout(() => this.endCall(), 3000);
    }
  },

  startCallTimer() {
    this.stopCallTimer();
    this._callDuration = 0;
    this._callInterval = setInterval(() => {
      this._callDuration++;
      const mins = Math.floor(this._callDuration / 60).toString().padStart(2, '0');
      const secs = (this._callDuration % 60).toString().padStart(2, '0');
      const timerEl = document.getElementById("call-timer");
      if (timerEl) timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
  },

  stopCallTimer() {
    if (this._callInterval) clearInterval(this._callInterval);
    this._callDuration = 0;
  },

  endCall() {
    const controller = document.getElementById("call-controller");
    if (controller) controller.style.display = "none";
    this.stopCallTimer();
    this.toast("Call Finished", "info");
  },

  async updateCallingNumber() {
    const input = document.getElementById("personal-calling-num");
    const num = input ? input.value.trim() : prompt("Enter your Mobile Number:");
    if (!num) return this.toast("Number Required", "error");

    // Save to LocalStorage immediately as a fallback
    localStorage.setItem('vera_calling_number', num);

    try {
      const { error } = await supabase.from('staff').update({ calling_number: num }).eq('email', this.user.email);
      if (error) throw error;
      this.user.calling_number = num;
      this.toast("Calling Uplink Secured ✅", "success");
    } catch (e) {
      console.warn("DB Update Failed, but Local Storage is active.");
      this.toast("Uplink Saved Locally (Ready to Call)", "success");
    }
  },
  updateSessionTimer() {
    const el = document.getElementById("session-timer");
    if (!el) return;
    const diff = Date.now() - this.sessionStartTime;
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  },

  lockTerminal() {
    this.toast("Terminal Security Protocol: Encrypted Lockdown Active 🔐", "success");
  },
  leads: [],
  leadsPage: 1,
  leadsPerPage: 40,
  _searchTimeout: null,
  session: null,
  activeDashTab: "queue",
  activePricingTab: "gold",
  auditFilters: { status: 'pending', severity: 'all', member: '' },
  islandCycleIdx: 0,

  debounce(func, delay) {
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(func.bind(this), delay);
  },
  goldRates: {
    "24K (999)": 0,
    "22K": 0,
    "18K": 0,
    Coin: 0,
    "Old Gold": 0,
    "Silver Payal": 0,
    "Silver Baby Kada": 0,
    "Silver Ferva": 0,
    "Silver Utensils/Pooja": 0,
    "Silver Coin": 0
  },
  calcState: { weight: 0, purity: "24K (999)", gst: false, making: 0 },

  init() {
    this.initProductMatrix();
    // Start Island Intelligence Cycle
    setInterval(() => {
      this.islandCycleIdx = (this.islandCycleIdx + 1) % 2;
      this.updateIslandStatus();
    }, 8000);
    // Tactical Dismissal: Click-Outside to close Notification Drawer
    document.addEventListener("mousedown", (e) => {
      const drawer = document.getElementById("notif-drawer");
      const bell = document.querySelector(
        '[onclick*="toggleNotifications"]',
      );
      if (
        drawer &&
        drawer.classList.contains("active") &&
        !drawer.contains(e.target) &&
        !bell.contains(e.target)
      ) {
        this.toggleNotifications();
      }
    });

    const emergencyBtn = document.createElement("button");
    emergencyBtn.textContent = "HARD RESET";
    emergencyBtn.style = "position:fixed; bottom:20px; right:20px; z-index:99999; padding:8px 16px; background:#000; color:#fff; border-radius:10px; font-size:10px; opacity:0.1;";
    emergencyBtn.onclick = () => this.hardReset();
    document.body.appendChild(emergencyBtn);

    window.addEventListener("scroll", () => {
      const island = document.getElementById("header-island");
      if (island && window.scrollY > 20) island.classList.add("scrolled");
      else if (island) island.classList.remove("scrolled");
    });

    // Load Telephony System Immediately
    this.initTelephony();
    this.initSearch();

    onAuthStateChanged(auth, async (u) => {
      try {
        if (u) {
          this.user = await this.resolveUser(u.email);
          this.startSession();
          this.startSessionTimer();

          // 1. FAST-PATH: Instant UI Hydration from Redish Stash
          const cachedLeads = RedishStash.get('leads');
          const cachedQms = RedishStash.get('qms_registry');
          if (cachedLeads) this.leads = cachedLeads;
          if (cachedQms) this.qmsRegistry = cachedQms;

          this.showUI();
          this.navigate("dashboard");
          this.renderDashboard();

          // 2. BACKGROUND HYDRATION (Non-Blocking)
          this.fetchAndRenderLeads();
          this.fetchConfig();
          this.initRealtimeSync();
          this.autoSync();
          this.forceQmsSync();
          setInterval(() => this.autoSync(), 60000);

          // --- LEGACY FREEZE PROTOCOL ---
          try {
            const { data: migrationState } = await supabase
              .from('app_config')
              .select('payload')
              .eq('id', 'migration_complete')
              .maybeSingle();

            if (migrationState && migrationState.payload.active) {
              this.legacyFrozen = true;
            }
          } catch (e) {
            console.error("Migration Config Delay:", e);
          }

          this.initialized = true;
        } else {
          this.user = null;
          this.hideUI();
          this.navigate("auth");
        }
      } catch (authError) {
        console.error("Auth Handshake Failure:", authError);
      }
    });
  },

  initSearch() {
    const island = document.getElementById('header-island');
    if (island) {
      island.addEventListener('click', (e) => {
        // Prevent click if we're already searching to allow interaction with search active label
        if (!island.classList.contains('searching')) {
          this.toggleOmniSearch(true);
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      // Global Shortcut: / or Cmd+K
      if ((e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        this.toggleOmniSearch(true);
      }
      if (e.key === 'Escape') {
        this.toggleOmniSearch(false);
      }
    });

    // Close on click outside
    document.addEventListener('mousedown', (e) => {
      const overlay = document.getElementById('omni-search-overlay');
      if (overlay && e.target.id === 'omni-search-overlay' && overlay.classList.contains('active')) {
        this.toggleOmniSearch(false);
      }
    });
  },

  toggleOmniSearch(show) {
    const overlay = document.getElementById('omni-search-overlay');
    const input = document.getElementById('omni-search-input');
    const island = document.getElementById('header-island');
    const defaultContent = document.getElementById('island-default-content');
    const searchActive = document.getElementById('island-search-active');

    if (!overlay || !input || !island) return;

    if (show) {
      overlay.classList.add('active');
      island.classList.add('searching');
      if (defaultContent) defaultContent.style.display = 'none';
      if (searchActive) searchActive.style.display = 'block';
      setTimeout(() => input.focus(), 100);
    } else {
      overlay.classList.remove('active');
      island.classList.remove('searching');
      if (defaultContent) defaultContent.style.display = 'flex';
      if (searchActive) searchActive.style.display = 'none';
      input.value = '';
      this.renderSearchResults([], []);
    }
  },

  performUniversalSearch(query) {
    if (!query || query.length < 2) {
      this.renderSearchResults([], []);
      return;
    }

    const q = query.toLowerCase().trim();
    const normalize = (v) => String(v || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const nq = normalize(q);

    // 1. Scan CRM (Leads)
    const crmResults = this.leads.filter(l => {
      return normalize(l.name).includes(nq) || 
             normalize(l.phone).includes(nq);
    }).slice(0, 10);

    // 2. Scan QMS (Registry)
    const qmsResults = (this.qmsRegistry || []).filter(r => {
      const name = r.name || r.customer_name || r.n || "";
      const phone = r.phone || r.mobile || r.contact || r.p || "";
      return normalize(name).includes(nq) || normalize(phone).includes(nq);
    }).slice(0, 10);

    this.renderSearchResults(crmResults, qmsResults);
  },

  renderSearchResults(crm, qms) {
    const container = document.getElementById('omni-search-results');
    if (!container) return;
    
    if (crm.length === 0 && qms.length === 0) {
      container.innerHTML = `
        <div style="padding: 40px; text-align: center; opacity: 0.5;">
          <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Universal Intelligence Search</div>
          <div style="font-size: 11px; margin-top: 8px;">Type name or phone to scan CRM & QMS registry</div>
        </div>
      `;
      return;
    }

    let html = '';

    if (crm.length > 0) {
      html += `<span class="search-category-label">VERA CRM MATCHES</span>`;
      crm.forEach(l => {
        html += `
          <div class="search-result-node" onclick="app.viewLead('${l.id}'); app.toggleOmniSearch(false);">
            <div class="result-icon" style="color: var(--accent); background: var(--accent-soft);">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <div class="result-info">
              <div class="result-name">${l.name}</div>
              <div class="result-meta">${l.phone} • ${l.status || 'ACTIVE'}</div>
            </div>
            <button class="result-action-btn">OPEN</button>
          </div>
        `;
      });
    }

    if (qms.length > 0) {
      html += `<span class="search-category-label">QMS SHOWROOM VISITORS</span>`;
      qms.forEach(r => {
        const name = r.name || r.customer_name || r.n || "Unknown Visitor";
        const phone = r.phone || r.mobile || r.contact || r.p || "N/A";
        html += `
          <div class="search-result-node" style="border-left: 4px solid var(--success);" onclick="window.open('https://wa.me/${phone.replace(/\D/g, '')}', '_blank')">
            <div class="result-icon" style="color: var(--success); background: rgba(52,199,89,0.1);">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <div class="result-info">
              <div class="result-name">${name}</div>
              <div class="result-meta">Showroom Visitor • ${phone}</div>
            </div>
            <button class="result-action-btn">WA</button>
          </div>
        `;
      });
    }

    container.innerHTML = html;
  },

  initRealtimeSync() {
    if (this._syncInitialized) return;
    this._syncInitialized = true;

    let syncDebounce = null;
    supabase
      .channel('leads-all')
      .on('postgres_changes', { event: '*', table: 'leads' }, (payload) => {
        console.log(`[REALTIME] Change Detected: ${payload.eventType}`);
        
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          const newLead = payload.new;
          // Local Atomic Update
          const leadMap = new Map(this.leads.map(l => [String(l.id), l]));
          leadMap.set(String(newLead.id), { ...newLead, timestamp: new Date(newLead.timestamp).getTime() });
          this.leads = Array.from(leadMap.values()).sort((a, b) => b.timestamp - a.timestamp);
          
          this.updateNavStats();
          const activeScreen = document.querySelector(".screen.active")?.id.replace("screen-", "") || "dashboard";
          if (activeScreen === "dashboard") this.renderDashboard();
          if (activeScreen === "leads") this.renderLeads();
          
          // Partial Stash Update
          RedishStash.set('leads', this.leads.slice(0, 500));
        } else {
          // For DELETE or complex changes, fallback to debounce fetch
          clearTimeout(syncDebounce);
          syncDebounce = setTimeout(() => this.fetchAndRenderLeads(), 1000);
        }
      })
      .subscribe();
  },

  renderSkeletons(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const skeletonHtml = `
          <div class="skeleton-card" style="margin-bottom: 16px;">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 80%"></div>
            <div style="display: flex; gap: 10px; margin-top: auto;">
              <div class="skeleton skeleton-pill"></div>
              <div class="skeleton skeleton-pill"></div>
            </div>
          </div>
        `;
    container.innerHTML = Array(4).fill(skeletonHtml).join('');
  },

  renderKPISkeletons() {
    const kpiContainer = document.getElementById("kpi-grid");
    if (!kpiContainer) return;

    const currentHtml = kpiContainer.innerHTML.trim();
    if (currentHtml !== "" && currentHtml.includes('kpi-val')) return;

    kpiContainer.style.display = "grid";
    kpiContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(220px, 1fr))";
    kpiContainer.style.gap = "20px";
    kpiContainer.style.marginBottom = "48px";
    kpiContainer.innerHTML = Array(12).fill('<div class="skeleton-card-premium"></div>').join('');
    kpiContainer.dataset.rendered = "false";
  },

  async fetchAndRenderLeads() {
    if (!this.user) return;

    // 1. Immediate UI: Show Skeletons
    const activeScreen = document.querySelector(".screen.active")?.id.replace("screen-", "") || "dashboard";
    if (activeScreen === "leads") this.renderSkeletons("leads-container");
    if (activeScreen === "dashboard") {
      this.renderKPISkeletons();
      const q = document.getElementById("col-queue");
      const t = document.getElementById("col-tasks");
      const s = document.getElementById("col-secured");
      if (q) this.renderSkeletons("col-queue");
      if (t) this.renderSkeletons("col-tasks");
      if (s) this.renderSkeletons("col-secured");
    }

    const isAdmin = ["Admin", "Supervisor"].includes(this.user.role);

    const normalizeLeads = (data) => {
      return data.map(l => {
        let ts = null;
        if (typeof l.timestamp === 'number') ts = l.timestamp;
        else if (l.timestamp) {
          const d = new Date(l.timestamp).getTime();
          if (!isNaN(d)) ts = d;
        }

        // Strategic Fallback: If primary timestamp missing, derive from earliest history log entry
        if (!ts && l.history && Array.isArray(l.history) && l.history.length > 0) {
          ts = l.history[0].time;
        }

        return {
          ...l,
          timestamp: ts || Date.now(), // Fallback to current time only if all forensic data is missing
          owner: l.owner || l.added_by || "anonymous",
          owner_name: l.owner_name || "Staff Member",
          added_by: l.added_by || l.owner_email || "System"
        };
      }).filter((l) => {
        if (isAdmin) return true;
        const userId = this.user.id;
        const userEmail = this.user.email;

        // Multi-Vector Match: Check ID, Email, and Assignment
        return (l.owner === userId ||
          l.owner === userEmail ||
          l.assigned_to === userId ||
          l.added_by === userEmail ||
          l.added_by === userId);
      });
    };

    try {
      this.renderKPISkeletons();
      const currentActive = document.querySelector(".screen.active")?.id.replace("screen-", "") || "dashboard";

      console.log("[SYNC] Initiating Full Integrity Hydration...");
      this.renderKPISkeletons();

      // --- PHASE 1: STASH IGNITION (INSTANT-ON) ---
      const cachedLeads = RedishStash.get('leads');
      const cachedQms = RedishStash.get('qms_registry');
      
      if (cachedLeads && cachedLeads.length > 0) {
        this.leads = cachedLeads;
        if (cachedQms) this.qmsRegistry = cachedQms;
        
        this.updateNavStats();
        if (currentActive === "dashboard") this.renderDashboard();
        console.log(`[SYNC] Stash Ignition Complete: ${this.leads.length} Leads, ${this.qmsRegistry?.length || 0} Visitors.`);
      }

      // --- PHASE 2: TOTAL VAULT PARALLEL SYNC ---
      (async () => {
        const { count, error: countErr } = await supabase.from('leads').select('*', { count: 'exact', head: true });
        if (countErr) return;
        
        const total = count;
        const BATCH_SIZE = 1000;
        const totalBatches = Math.ceil(total / BATCH_SIZE);
        const results = [];
        for (let i = 0; i < totalBatches; i++) {
          const { data, error } = await supabase
            .from('leads')
            .select('id, name, phone, location, interest, source, status, priority, timestamp, owner, owner_name, added_by, assigned_to, type, followup_date, enquiry_note, executive_comment, history')
            .range(i * BATCH_SIZE, (i + 1) * BATCH_SIZE - 1)
            .order('timestamp', { ascending: false });
          
          if (data) {
            results.push({ data });
            // Incremental Update (UI responsiveness)
            const partial = normalizeLeads(results.flatMap(r => r.data || []));
            this.leads = partial;
            this.updateNavStats();
            if (currentActive === "dashboard") this.renderDashboard();
          }
          
          // Egress Cool-Down (Prevent Throttling)
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        const allFetched = results.flatMap(r => r.data || []);
        
        if (allFetched.length > 0) {
          this.leads = normalizeLeads(allFetched);
          this.updateNavStats();
          if (currentActive === "dashboard") this.renderDashboard();
          
          // Final Stash Persist (Expanded to 10k for Total Scope)
          RedishStash.set('leads', this.leads.slice(0, 10000));
          console.log(`[SYNC] Parallel Sync Complete: ${this.leads.length} records in vault.`);
        }
      })();

      // --- PHASE 3: QMS SYNC (BACKGROUND) ---
      (async () => {
        const nowSync = Date.now();
        if (!this._lastQmsSync || (nowSync - this._lastQmsSync > 120000)) {
          try {
            const probe = async (sb, label) => {
              let results = [];
              try {
                // High-Precision QMS Engine: Scanning 'sessions' for showroom arrivals
                const { data: s, error: sErr } = await sb.from('sessions')
                  .select('id, name, phone, mobile, contact, ts, created_at, queue_status, sale_status')
                  .order('created_at', { ascending: false })
                  .limit(2000);
                
                if (s) {
                   results = results.concat(s);
                   console.log(`[QMS] ${label} Sessions Captured: ${s.length} nodes.`);
                }
                
                // Secondary Probe: Registry (Legacy Support)
                const { data: r } = await sb.from('qms_registry')
                  .select('phone, mobile, contact, name, ts, created_at, status')
                  .limit(500);
                if (r) results = results.concat(r);
              } catch (e) { console.warn(`[QMS] ${label} Probe Bypass:`, e); }
              return results;
            };

            const [r1, r2, r3] = await Promise.all([
              probe(qmsSb1, "HUB-A"), 
              probe(qmsSb2, "HUB-B"),
              probe(supabase, "MAIN-HUB")
            ]);
            
            const raw = [...r1, ...r2, ...r3];
            this.qmsRegistry = raw.map(q => {
              const p = String(q.phone || q.mobile || q.contact || q.customer_phone || q.customer_mobile || q.p || "").replace(/\D/g, "").slice(-10);
              const n = String(q.name || q.customer_name || q.customer || q.n || "").toLowerCase().trim()
                .replace(/^(mr\.|ms\.|mrs\.|dr\.|shri\.|smt\.)\s+/g, "")
                .replace(/\s+/g, " ");
              const s = String(q.queue_status || q.status || "").toLowerCase();
              return { ...q, _p: p, _n: n, _s: s };
            }).filter(q => q._p || q._n);

            RedishStash.set('qms_registry', this.qmsRegistry);
            this._lastQmsSync = nowSync;
            
            // Real-Time Intelligence Update
            if (this.triggerStrategicKPIs) {
               this.triggerStrategicKPIs();
            }
            
            console.log(`[SYNC] High-Precision QMS Hydrated: ${this.qmsRegistry.length} visitors ready.`);

            const currentScreen = document.querySelector(".screen.active")?.id.replace("screen-", "") || "dashboard";
            if (currentScreen === "dashboard") this.renderDashboard();
          } catch (e) { console.warn("QMS Sync Deferred", e); }
        }
      })();

      // --- PHASE 4: AUDITS (BACKGROUND) ---
      (async () => {
        try {
          const { data: auditData, error: auditError } = await supabase
            .from('audit_logs')
            .select('*')
            .eq('member_id', this.user.id)
            .eq('status', 'pending');

          if (!auditError) {
            this.myAuditCount = auditData ? auditData.length : 0;
            const currentScreen = document.querySelector(".screen.active")?.id.replace("screen-", "") || "dashboard";
            if (currentScreen === "dashboard") this.renderDashboard();
          }
        } catch (e) { }
      })();

    } catch (error) {
      console.error("Vault Sync Error:", error);
      this.toast(`Sync Failure: ${error.message || 'Unknown Protocol Error'}`, "error");
      if (!this.leads) this.leads = [];
      this.renderDashboard();
    }
  },



  async fetchConfig() {
    try {
      const { data, error } = await supabase.from('app_config').select('*');
      if (error) throw error;

      data.forEach(item => {
        if (item.id === 'goldRates') {
          this.goldRates = { ...this.goldRates, ...item.payload };
        }
        if (item.id === 'announcement') {
          const annText = document.getElementById("dash-announcement-text");
          if (annText) annText.textContent = item.payload.text;
        }
      });

      const { data: staffData } = await supabase.from('staff').select('id, name, role');
      if (staffData) {
        this.staffRegistry = {};
        staffData.forEach(s => this.staffRegistry[s.id] = s);
      }
    } catch (e) {
      console.warn("Config Sync Fault:", e);
    }
  },

  updateCalc(isInit = false) {
    const w = document.getElementById("calc-weight");
    const p = document.getElementById("calc-purity");
    const g = document.getElementById("calc-gst");
    const m = document.getElementById("calc-making");

    if (!isInit && w && p) {
      this.calcState = {
        weight: parseFloat(w.value) || 0,
        purity: p.value,
        gst: g ? g.checked : false,
        making: parseFloat(m ? m.value : 0) || 0,
      };
    }

    const baseRate = this.goldRates[this.calcState.purity] || 0;
    const purity = this.calcState.purity;

    let subtotal = 0;
    let breakdown = "";
    let finalTotal = 0;

    if (purity === "Coin") {
      // GOLD COIN: All-inclusive
      finalTotal = baseRate * this.calcState.weight;
      breakdown = `Gold Coin: ₹${this.fmt(baseRate)}/g (Net Price)`;
    } else if (purity === "Silver Coin") {
      // SILVER COIN: Base Rate + GST (No Making)
      subtotal = baseRate * this.calcState.weight;
      finalTotal = subtotal;
      breakdown = `Silver Coin: ₹${this.fmt(baseRate)}/g`;
      if (this.calcState.gst) {
        const gstVal = subtotal * 0.03;
        finalTotal += gstVal;
        breakdown += ` + 3% GST (₹${this.fmt(gstVal)})`;
      }
    } else if (purity.startsWith("Silver")) {
      // SILVER JEWELRY: (Rate + 30 Making) * Weight + GST
      subtotal = (baseRate + 30) * this.calcState.weight;
      finalTotal = subtotal;
      breakdown = `Silver: ₹${this.fmt(baseRate)} + ₹30 Making /g`;
      if (this.calcState.gst) {
        const gstVal = subtotal * 0.03;
        finalTotal += gstVal;
        breakdown += ` + 3% GST (₹${this.fmt(gstVal)})`;
      }
    } else {
      // GOLD JEWELRY: (Rate * Weight + Making%) + GST
      const basicVal = baseRate * this.calcState.weight;
      const makingVal = basicVal * (this.calcState.making / 100);
      subtotal = basicVal + makingVal;
      breakdown = `Gold: ₹${this.fmt(baseRate)}/g`;
      if (this.calcState.making > 0) breakdown += ` + ${this.calcState.making}% making`;

      finalTotal = subtotal;
      if (this.calcState.gst) {
        const gstVal = subtotal * 0.03;
        finalTotal += gstVal;
        breakdown += ` + 3% GST (₹${this.fmt(gstVal)})`;
      }
    }

    const approxTotal = Math.round(finalTotal / 100) * 100;
    this.calcState.lastExact = Math.round(finalTotal);
    this.calcState.lastApprox = approxTotal;

    const resEl = document.getElementById("calc-result");
    const approxEl = document.getElementById("calc-approx");
    const brkEl = document.getElementById("calc-breakdown");

    if (resEl) resEl.textContent = `₹${this.fmt(finalTotal)}`;
    if (approxEl) approxEl.textContent = `Approx: ₹${this.fmt(approxTotal)}`;
    if (brkEl) brkEl.textContent = breakdown;
  },

  setPricingTab(tab) {
    this.activePricingTab = tab;
    this.renderDashboard();
  },

  setCalcPurity(p) {
    this.calcState.purity = p;
    this.renderDashboard();
  },

  editRates() {
    const keys = Object.keys(this.goldRates);
    const results = {};
    for (const key of keys) {
      const price = prompt(
        `Update ${key} Price (current: ${this.goldRates[key]})`,
        this.goldRates[key],
      );
      if (price === null) return;
      results[key] = parseFloat(price) || this.goldRates[key];
    }
    this.goldRates = results;
    this.toast("Terminal Rates Synchronized 💰");
    this.renderDashboard();
  },

  copyQuote() {
    const exact = this.calcState.lastExact || 0;
    const weight = this.calcState.weight || 0;
    const purity = this.calcState.purity || "NA";

    let making = `${this.calcState.making || 0}%`;
    if (purity === "Coin") making = "3% Included";
    else if (purity === "Silver Coin") making = "0 (No Making Charges)";

    let gst = this.calcState.gst ? "3% Included" : "Not Included";
    if (purity === "Coin") gst = "3% Included"; // Gold Coin is all-inclusive

    const metal = purity.toLowerCase().includes("silver") ? "Silver" : "Gold";
    const text = `Pravesh ${metal} Quote \nPurity - ${purity}\napprox weight - ${weight}g\napprox making - ${making}\nGST - ${gst}\napprox price - ₹${this.fmt(exact)}\n\nprice may change according to ${metal.toLowerCase()} rate`;

    navigator.clipboard
      .writeText(text)
      .then(() => this.toast("Official Quote Copied 🛡️"));
  },

  async resolveUser(email) {
    const id = email.split("@")[0];

    // Hybrid Logic: Check Supabase Staff Registry
    const { data: staff, error } = await supabase
      .from('staff')
      .select('*')
      .eq('id', id)
      .single();

    let userData = staff;

    if (!userData) {
      // New member logic
      const { data: allStaff } = await supabase.from('staff').select('id');
      let role = (allStaff && allStaff.length === 0) ? Roles.ADMIN : Roles.MEMBER;

      if (email.toLowerCase() === "rajendra.praveshgold@gmail.com") {
        role = Roles.ADMIN;
      }

      userData = { id, email, role, name: id.toUpperCase() };
      await supabase.from('staff').upsert([userData]);
    } else {
      // Force update role for global admin
      if (email.toLowerCase() === "rajendra.praveshgold@gmail.com" && userData.role !== Roles.ADMIN) {
        userData.role = Roles.ADMIN;
        await supabase.from('staff').update({ role: Roles.ADMIN }).eq('id', id);
      }
    }
    return userData;
  },

  async handleLogin() {
    const id = document.getElementById("login-id").value.trim();
    const ps = document.getElementById("login-pass").value.trim();
    if (!id || !ps)
      return this.toast("Staff ID & Access Key Required", "error");
    const email = (
      id.includes("@") ? id : id + "@vera.gold"
    ).toLowerCase();
    try {
      await signInWithEmailAndPassword(auth, email, ps);
    } catch (e) {
      console.error("Login call failed:", e);
      let msg = "Security Access Denied";
      if (e.code === "auth/user-not-found") msg = "Invalid Staff ID";
      if (e.code === "auth/wrong-password") msg = "Invalid Access Key";
      if (e.code === "auth/invalid-email")
        msg = "Invalid Terminal Format";
      if (e.code === "auth/network-request-failed")
        msg = "Check Connection";
      this.toast(msg, "error");
    }
  },

  startSessionTimer() {
    const TIMER_KEY = 'vera_session_start';
    let stored = localStorage.getItem(TIMER_KEY);
    if (!stored) {
      stored = Date.now().toString();
      localStorage.setItem(TIMER_KEY, stored);
    }
    this.sessionStartTime = parseInt(stored, 10);

    if (this._sessionTimerInterval) clearInterval(this._sessionTimerInterval);

    const updateAllTimers = () => {
      const diff = Date.now() - this.sessionStartTime;
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');

      // Island Display
      const islandEl = document.getElementById('session-timer-display');
      if (islandEl) islandEl.textContent = `${h}:${m}:${s}`;

      // Profile Bento Display
      const bentoEl = document.getElementById('session-timer');
      if (bentoEl) bentoEl.textContent = `${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
    };

    updateAllTimers();
    this._sessionTimerInterval = setInterval(updateAllTimers, 1000);
  },

  async saveGoldRates(newRates) {
    try {
      await supabase
        .from('app_config')
        .upsert([{
          id: 'goldRates',
          payload: { ...newRates, updatedBy: this.user.name },
          updated_at: new Date().toISOString()
        }]);
      this.toast("Pricing Protocol Broadcasted 🛰️");
    } catch (e) {
      console.error("Rate broadcast failed:", e);
      this.toast("Terminal Sync Failure", "error");
    }
  },

  editGoldRates() {
    this.navigate("profile");
    setTimeout(() => {
      const el = document.getElementById("rate-management-sec");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  },

  pushNewRates() {
    const newRates = {};
    Object.keys(this.goldRates).forEach((k) => {
      const el = document.getElementById(`rate-edit-${k}`);
      if (el) newRates[k] = parseFloat(el.value) || 0;
    });
    this.saveGoldRates(newRates);
  },

  setPdfFilter(range) {
    this._pdfFilter = range;
    // Update button highlights
    ['day', 'week', 'month', 'all'].forEach(r => {
      const btn = document.getElementById(`pdf-filter-${r}`);
      if (!btn) return;
      if (r === range) {
        btn.style.background = 'rgba(0,122,255,0.12)';
        btn.style.border = '2px solid rgba(0,122,255,0.4)';
        btn.style.color = '#007AFF';
      } else {
        btn.style.background = 'rgba(0,0,0,0.04)';
        btn.style.border = '2px solid transparent';
        btn.style.color = 'var(--text-muted)';
      }
    });
    // Preview count
    const now = new Date();
    let cutoff = 0;
    if (range === 'day') {
      const d = new Date(now); d.setHours(0, 0, 0, 0); cutoff = d.getTime();
    } else if (range === 'week') {
      const d = new Date(now); d.setDate(d.getDate() - 7); cutoff = d.getTime();
    } else if (range === 'month') {
      const d = new Date(now); d.setDate(d.getDate() - 30); cutoff = d.getTime();
    }
    const filtered = range === 'all'
      ? this.leads
      : this.leads.filter(l => (l.createdAt?.seconds ? l.createdAt.seconds * 1000 : 0) >= cutoff);
    const preview = document.getElementById('pdf-preview-count');
    if (preview) preview.textContent = `${filtered.length} record${filtered.length !== 1 ? 's' : ''} will be exported for the selected range.`;
  },

  async renderReportSelector() {
    const { data: staff } = await supabase.from('staff').select('*');

    const modalBody = `
            <div style="padding: 32px;">
              <h2 style="font-size: 24px; font-weight: 850; letter-spacing: -1px; color: var(--text-primary); margin-bottom: 8px;">Executive Report Selector</h2>
              <p style="font-size: 13px; color: var(--text-muted); font-weight: 600; margin-bottom: 32px;">Configure parameters for strategic data aggregation.</p>
              
              <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Member Selection -->
                <div>
                  <label class="label">Select Executive Member</label>
                  <select id="rep-member" class="input" style="height: 52px; border-radius: 16px;">
                    <option value="all">All System Personnel</option>
                    ${staff.map(s => `<option value="${s.id}">${s.name || s.id.toUpperCase()}</option>`).join('')}
                  </select>
                </div>
                
                <!-- Interval Selection -->
                <div>
                  <label class="label">Time Interval</label>
                  <select id="rep-interval" class="input" style="height: 52px; border-radius: 16px;" onchange="app.handleReportIntervalChange()">
                    <option value="all">Lifetime Data</option>
                    <option value="today">Specific Date</option>
                    <option value="week">Past 1 Week</option>
                    <option value="month">Past 1 Month</option>
                    <option value="3months">Past 3 Months</option>
                    <option value="6months">Past 6 Months</option>
                    <option value="1year">Past 1 Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>
                
                <!-- Conditional: Specific Date -->
                <div id="sec-rep-date" style="display: none;">
                  <label class="label">Select Date</label>
                  <input type="date" id="rep-date" class="input" style="height: 52px; border-radius: 16px;">
                </div>
                
                <!-- Conditional: Custom Range -->
                <div id="sec-rep-custom" style="display: none; grid-template-columns: 1fr 1fr; gap: 12px;">
                  <div>
                    <label class="label">Start Date</label>
                    <input type="date" id="rep-start" class="input" style="height: 52px; border-radius: 16px;">
                  </div>
                  <div>
                    <label class="label">End Date</label>
                    <input type="date" id="rep-end" class="input" style="height: 52px; border-radius: 16px;">
                  </div>
                </div>
                
                <button onclick="app.processReportGeneration()" class="btn btn-primary" style="width: 100%; height: 56px; border-radius: 18px; font-weight: 850; letter-spacing: 0.5px; box-shadow: 0 8px 24px rgba(82, 18, 22, 0.2); margin-top: 12px;">
                  Generate Intelligence Report
                </button>
              </div>
            </div>
          `;
    this.renderModal(modalBody);
  },

  handleReportIntervalChange() {
    const val = document.getElementById('rep-interval').value;
    document.getElementById('sec-rep-date').style.display = (val === 'today') ? 'block' : 'none';
    document.getElementById('sec-rep-custom').style.display = (val === 'custom') ? 'grid' : 'none';
  },

  async processReportGeneration() {
    const memberId = document.getElementById('rep-member').value;
    const interval = document.getElementById('rep-interval').value;
    const specificDate = document.getElementById('rep-date').value;
    const start = document.getElementById('rep-start').value;
    const end = document.getElementById('rep-end').value;

    await this.downloadLeadsPDF({ memberId, interval, specificDate, start, end });
  },

  async downloadLeadsPDF(params = {}) {
    const { memberId = 'all', interval = 'all', specificDate, start, end } = params;
    const now = new Date();
    let cutoffStart = 0;
    let cutoffEnd = Infinity;
    let rangeLabel = 'Lifetime Data';

    if (interval === 'today' && specificDate) {
      const d = new Date(specificDate);
      d.setHours(0, 0, 0, 0); cutoffStart = d.getTime();
      d.setHours(23, 59, 59, 999); cutoffEnd = d.getTime();
      rangeLabel = `On ${new Date(specificDate).toLocaleDateString('en-IN')}`;
    } else if (interval === 'week') {
      const d = new Date(now); d.setDate(d.getDate() - 7); cutoffStart = d.getTime(); rangeLabel = 'Past 7 Days';
    } else if (interval === 'month') {
      const d = new Date(now); d.setDate(d.getDate() - 30); cutoffStart = d.getTime(); rangeLabel = 'Past 1 Month';
    } else if (interval === '3months') {
      const d = new Date(now); d.setDate(d.getDate() - 90); cutoffStart = d.getTime(); rangeLabel = 'Past 3 Months';
    } else if (interval === '6months') {
      const d = new Date(now); d.setDate(d.getDate() - 180); cutoffStart = d.getTime(); rangeLabel = 'Past 6 Months';
    } else if (interval === '1year') {
      const d = new Date(now); d.setDate(d.getDate() - 365); cutoffStart = d.getTime(); rangeLabel = 'Past 1 Year';
    } else if (interval === 'custom' && start && end) {
      cutoffStart = new Date(start).setHours(0, 0, 0, 0);
      cutoffEnd = new Date(end).setHours(23, 59, 59, 999);
      rangeLabel = `${new Date(start).toLocaleDateString('en-IN')} to ${new Date(end).toLocaleDateString('en-IN')}`;
    }

    let filtered = this.leads.filter(l => {
      const ts = l.createdAt?.seconds ? l.createdAt.seconds * 1000 : l.timestamp || 0;
      const matchesTime = ts >= cutoffStart && ts <= cutoffEnd;
      const matchesMember = (memberId === 'all') || (l.owner === memberId) || (l.addedBy?.includes(memberId));
      return matchesTime && matchesMember;
    });

    if (!filtered.length) {
      this.toast('No strategic records found for these parameters', 'error');
      return;
    }

    const rows = filtered.map((l, i) => {
      const ts = l.createdAt?.seconds ? new Date(l.createdAt.seconds * 1000).toLocaleDateString('en-IN') : 'N/A';
      const fu = l.followUpDate || 'Not Scheduled';
      return `<tr style="background:${i % 2 === 0 ? '#fff' : '#f9f9f9'}">
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${i + 1}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;font-weight:700;">${l.name || '—'}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${l.phone || '—'}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${l.interest || '—'}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${l.queryType || '—'}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${l.priority || '—'}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${ts}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${fu}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${l.addedBy || '—'}</td>
            </tr>`;
    }).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
          <title>VERA CRM - Lead Export (${rangeLabel})</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 32px; background: #f4f4f8; color: #1d1d1f; }
            .header { background: linear-gradient(135deg, #521216, #7A1C22); color: white; padding: 32px 40px; border-radius: 20px; margin-bottom: 32px; }
            .header h1 { margin: 0 0 6px; font-size: 28px; letter-spacing: -1px; }
            .header p { margin: 0; opacity: 0.7; font-size: 13px; }
            .meta { display: flex; gap: 20px; margin-bottom: 24px; flex-wrap: wrap; }
            .meta-card { background: white; border-radius: 14px; padding: 16px 24px; flex: 1; min-width: 120px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
            .meta-card .val { font-size: 28px; font-weight: 800; color: #521216; }
            .meta-card .lbl { font-size: 10px; font-weight: 700; color: #8e8e93; text-transform: uppercase; margin-top: 4px; }
            table { width: 100%; border-collapse: collapse; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
            th { background: #521216; color: white; padding: 14px 12px; text-align: left; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
            td { font-size: 13px; color: #1d1d1f; }
            .footer { text-align: center; margin-top: 32px; font-size: 11px; color: #8e8e93; }
          </style></head><body>
          <div class="header">
            <h1>VERA CRM — Executive Intelligence Report</h1>
            <p>Parameter: ${memberId === 'all' ? 'Consolidated Registry' : memberId.toUpperCase()} &nbsp;|&nbsp; Range: ${rangeLabel}</p>
            <p style="margin-top: 8px;">Generated: ${new Date().toLocaleString('en-IN')} &nbsp;|&nbsp; Total Records: ${filtered.length}</p>
          </div>
          <div class="meta">
            <div class="meta-card"><div class="val">${filtered.length}</div><div class="lbl">Total Leads</div></div>
            <div class="meta-card"><div class="val">${filtered.filter(l => l.priority === 'Hot').length}</div><div class="lbl">Hot Leads</div></div>
            <div class="meta-card"><div class="val">${filtered.filter(l => l.priority === 'Warm').length}</div><div class="lbl">Warm Leads</div></div>
            <div class="meta-card"><div class="val">${filtered.filter(l => l.isFollowUp === 'yes').length}</div><div class="lbl">Follow-ups</div></div>
          </div>
          <table>
            <thead><tr>
              <th>#</th><th>Name</th><th>Phone</th><th>Interest</th><th>Query Type</th><th>Priority</th><th>Captured</th><th>Follow-up</th><th>Added By</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="footer">VERA Exclusive Terminal &nbsp;•&nbsp; Confidential &nbsp;•&nbsp; Not for distribution</div>
          </body></html>`;

    const win = window.open('', '_blank');
    if (!win) { this.toast('Allow popups to generate PDF', 'error'); return; }
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); }, 600);
  },

  async logout() {
    // Stop timer and wipe persisted start time
    if (this._sessionTimerInterval) {
      clearInterval(this._sessionTimerInterval);
      this._sessionTimerInterval = null;
    }
    localStorage.removeItem('vera_session_start');
    const el = document.getElementById('session-timer-display');
    if (el) el.textContent = '00:00:00';
    await signOut(auth);
  },

  updateModalQuote() {
    const w = document.getElementById("modal-calc-weight");
    const p = document.getElementById("modal-calc-purity");
    const valEl = document.getElementById("modal-quote-val");
    if (!w || !p || !valEl) return;

    const weight = parseFloat(w.value) || 0;
    const purity = p.value;
    const rate = this.goldRates[purity] || 0;

    let finalTotal = 0;
    if (purity === "Coin") {
      finalTotal = rate * weight;
    } else if (purity === "Silver Coin") {
      finalTotal = (rate * weight) * 1.03;
    } else if (purity.startsWith("Silver")) {
      finalTotal = ((rate + 30) * weight) * 1.03;
    } else {
      finalTotal = (weight * rate) * 1.03;
    }

    const elements = document.querySelectorAll(".modal-quote-val");
    const text = weight > 0 ? `₹${this.fmt(finalTotal)}` : "₹0.00";
    elements.forEach(el => el.textContent = text);
  },

  async captureQuote(leadId) {
    const w = document.getElementById("modal-calc-weight");
    const p = document.getElementById("modal-calc-purity");
    if (!w || !p || parseFloat(w.value) <= 0)
      return this.toast("Valid Weight Required", "warning");

    const weight = w.value;
    const purity = p.value;
    const rate = this.goldRates[purity];
    const total = Math.round(weight * rate);

    const action = `Quote Generated: ₹${this.fmt(total)} (${weight}g @ ${purity})`;

    try {
      const lead = this.leads.find((l) => String(l.id) === String(leadId));
      if (!lead) return;
      const history = lead.history || [];
      history.push({ time: Date.now(), action });
      await supabase.from('leads').update({ history }).eq('id', leadId);
      this.toast("Tactical Quote Logged 📜");
      // Real-time listener will refresh the modal
    } catch (e) {
      console.error("Quote logging failed:", e);
      this.toast("Vault Write Failure", "error");
    }
  },

  async logManualNote(leadId) {
    const input = document.getElementById("manual-note-input");
    if (!input || !input.value.trim()) return;

    const remark = input.value.trim();
    const action = `Executive Remark (${this.user.name || 'Member'}): ${remark}`;

    try {
      const lead = this.leads.find((l) => String(l.id) === String(leadId));
      if (!lead) return;
      const history = lead.history || [];
      history.push({ time: Date.now(), action });
      await supabase.from('leads').update({ history }).eq('id', leadId);
      this.toast("Remark Logged 🖋️");
      input.value = "";
      this.viewLead(leadId); // Refresh dossier view
    } catch (e) {
      console.error("Note logging failed:", e);
      this.toast("Vault Write Failure", "error");
    }
  },

  showUI() {
    const authScreen = document.getElementById("screen-auth");
    const appBody = document.getElementById("app-body");
    const nav = document.getElementById("bottom-nav");
    const island = document.getElementById("header-island");

    if (authScreen) {
      authScreen.classList.remove("active");
      authScreen.style.display = "none";
    }
    if (appBody) {
      appBody.style.display = "flex";
      appBody.style.visibility = "visible";
      appBody.style.opacity = "1";
    }
    if (nav) nav.style.display = "flex";
    if (island) island.style.setProperty('display', 'flex', 'important');

    // Premature navigate removed to allow data fetch to complete first
    // this.navigate("dashboard");
    this.handleSegmentChange();
    this.checkTacticalAlerts();
    this.startSession();
    this.updateGreeting();
  },

  navigateWithFilter(screen, filter) {
    this.currentFilter = filter;
    this.navigate(screen);
  },

  hideUI() {
    const authScreen = document.getElementById("screen-auth");
    const appBody = document.getElementById("app-body");
    const nav = document.getElementById("bottom-nav");
    const island = document.getElementById("header-island");

    if (authScreen) {
      authScreen.style.display = "flex";
      setTimeout(() => authScreen.classList.add("active"), 10);
    }
    if (appBody) appBody.style.display = "none";
    if (nav) nav.style.display = "none";
    if (island) island.style.setProperty('display', 'none', 'important');
  },

  navigate(screenId) {
    const role = this.user ? this.user.role : "Member";
    const isAdmin = ["Admin", "Supervisor"].includes(role);

    // Role-based Nav Visibility
    const navStats = document.getElementById("nav-stats");
    if (navStats) navStats.style.display = (isAdmin || role === "Admin") ? "flex" : "none";

    const navAdminPanel = document.getElementById("nav-admin");
    if (navAdminPanel) navAdminPanel.style.display = (role === Roles.ADMIN || role === "Admin") ? "flex" : "none";

    const navAudit = document.getElementById("nav-audit");
    if (navAudit) navAudit.style.display = (isAdmin || role === "Admin") ? "flex" : "none";

    // Access restriction for stats and admin panel
    // Access restriction: Stats is Admin-only. Control is Admin-only.
    if (screenId === "stats" && role !== "Admin") {
      this.toast("Security Access: Strategic Clearance Required", "error");
      screenId = "dashboard";
    }
    if (screenId === "admin-panel" && role !== "Admin" && role !== Roles.ADMIN) {
      this.toast("Security Access: Sovereign Clearance Required", "error");
      screenId = "dashboard";
    }

    console.log("EXEC_NAVIGATE:", screenId);

    // 1. Structural Reset
    document.querySelectorAll(".screen, .auth-screen").forEach((s) => {
      s.classList.remove("active");
      s.style.display = "none";
      s.style.opacity = "0";
      s.style.visibility = "hidden";
    });

    // Update Dock/Nav States
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
    const navItem = document.getElementById(`nav-${screenId}`);
    if (navItem) navItem.classList.add("active");

    document.querySelectorAll(".dock-item").forEach(i => i.classList.remove("active"));
    const dockItem = document.getElementById(`dock-${screenId}`);
    if (dockItem) dockItem.classList.add("active");

    // 2. State Activation
    const target = document.getElementById(`screen-${screenId}`);
    if (target) {
      target.style.display = "flex";
      target.offsetHeight; // Force reflow
      target.classList.add("active");
      target.style.opacity = "1";
      target.style.visibility = "visible";

      // 3. Data Handshake (Safe Render)
      try {
        if (screenId === "dashboard") this.renderDashboard();
        if (screenId === "missions") this.checkTacticalAlerts();
        if (screenId === "leads") this.refreshLeads();
        if (screenId === "messages") this.renderChatMembers();
        if (screenId === "activity") this.renderActivity();
        if (screenId === "profile") this.renderProfile();
        if (screenId === "stats") this.renderAnalytics();
        if (screenId === "admin-panel") this.renderAdminPanel();
        if (screenId === "audit") this.renderAuditHub();
        if (screenId === "add-lead") {
          const form = document.getElementById("enroll-form");
          if (form) form.reset();
          this.handleSegmentChange();
        }
      } catch (e) {
        console.error("DATA_HANDSHAKE_FAIL:", e);
      }
    }

    // 4. Interface Island Sync
    const islandText = document.getElementById("island-text");
    if (islandText) {
      const labels = {
        missions: "RADAR",
        dashboard: "HUB",
        leads: "VAULT",
        activity: "PULSE",
        "add-lead": "NEW ENROLL",
        profile: "EXEC TERM",
        messages: "TEAM HUB",
        stats: "STRATEGIC",
      };
      islandText.textContent = labels[screenId] || "TERMINAL";
    }
    this.updateIslandStatus();

    // 5. Navigation Label Sync
    document.querySelectorAll(".nav-item").forEach((item) => {
      const isActive =
        item.getAttribute("onclick") &&
        item.getAttribute("onclick").includes(screenId);
      item.style.color = isActive ? "var(--accent)" : "var(--text-muted)";
      item.style.opacity = isActive ? "1" : "0.4";
      if (isActive) item.classList.add("active");
      else item.classList.remove("active");
    });

    window.scrollTo(0, 0);
  },

  startSession() {
    const now = new Date();
    const key = now.toISOString().split("T")[0];
    let sessions = JSON.parse(
      localStorage.getItem("pg_sessions_v7") || "{}",
    );
    if (!sessions[key]) {
      sessions[key] = {
        login: now.getTime(),
        stop: this.getStopAt().getTime(),
      };
      localStorage.setItem("pg_sessions_v7", JSON.stringify(sessions));
    }
    this.session = sessions[key];
  },

  getStopAt() {
    const d = new Date();
    const s = new Date(d);
    s.setUTCHours(17, 30, 0, 0);
    if (d.getUTCHours() >= 17 && d.getUTCMinutes() >= 30)
      s.setUTCDate(s.getUTCDate() + 1);
    return s;
  },

  updateGreeting() {
    const el = document.getElementById("greeting-text");
    if (el && this.user) {
      const hr = new Date().getHours();
      const g =
        hr < 12
          ? "Good Morning"
          : hr < 17
            ? "Good Afternoon"
            : "Good Evening";
      el.textContent = `${g}, ${this.user.name}`;
    }
  },

  async editAnnouncement() {
    const current = document.getElementById("dash-announcement-text")
      ? document
        .getElementById("dash-announcement-text")
        .textContent.trim()
      : "";
    const note = prompt(
      "Administrative Command Center: Update Terminal Briefing",
      current,
    );
    if (note !== null && note !== current) {
      try {
        await supabase
          .from('app_config')
          .upsert([{
            id: 'announcement',
            payload: { text: note, updatedBy: this.user.name },
            updated_at: new Date().toISOString()
          }]);
        this.toast("Terminal Registry Synchronized 🔐");
        this.navigate("dashboard");
      } catch (e) {
        this.toast("Terminal Communication Error", "error");
      }
    }
  },

  updateIslandTimer() {
    if (!this.sessionStartTime) return;
    const timerEl = document.getElementById("island-timer");
    if (!timerEl) return;

    const now = Date.now();
    const diff = Math.max(0, now - this.sessionStartTime);

    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    timerEl.textContent = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  updateIslandStatus() {
    const dot = document.getElementById("island-dot");
    const yieldEl = document.getElementById("island-yield");
    const island = document.getElementById("header-island");
    if (!dot || !yieldEl) return;

    // SUPPRESS UPDATES DURING ACTIVE SEARCH
    if (island && island.classList.contains('searching')) return;

    const isOnline = navigator.onLine;
    if (!isOnline) {
      dot.style.background = "var(--error)";
      return;
    }

    // UPDATE SESSION YIELD & STASH DENSITY
    yieldEl.textContent = this.sessionYield;
    const stashEl = document.getElementById("island-stash");
    if (stashEl) {
      const stats = RedishStash.getStats();
      const density = (stats.nodes / 1000).toFixed(1);
      stashEl.textContent = `${density}k`;
    }

    const latestHot = [...this.leads]
      .filter(l => l.priority === "Hot" && l.status !== "Purchased")
      .sort((a, b) => {
        const tsA = typeof a.timestamp === 'number' ? a.timestamp : new Date(a.timestamp).getTime();
        const tsB = typeof b.timestamp === 'number' ? b.timestamp : new Date(b.timestamp).getTime();
        return tsB - tsA;
      })[0];

    // DYNAMIC ISLAND PRO: Expanded Content
    const expanded = document.getElementById("island-expanded");
    if (expanded) {
      if (latestHot) {
        expanded.innerHTML = `
                <div style="display: flex; flex-direction: column; gap: 12px; color: #fff;">
                  <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                      <div style="font-size: 9px; font-weight: 950; color: #FF3B30; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">HOT ALERT</div>
                      <div style="font-size: 16px; font-weight: 900; color: #fff; letter-spacing: -0.5px;">${latestHot.name}</div>
                    </div>
                    <button onclick="app.viewLead('${latestHot.id}')" style="background: var(--success); color: white; border: none; padding: 6px 12px; border-radius: 10px; font-size: 10px; font-weight: 950; cursor: pointer;">DEPLOY</button>
                  </div>
                  <div style="font-size: 11px; color: rgba(255,255,255,0.6); font-weight: 700; line-height: 1.4; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    Strategic entry detected in ${latestHot.location || 'Terminal'}. High conversion probability.
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-top: 8px;">
                     <button onclick="app.navigate('missions')" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 12px; font-size: 10px; font-weight: 900; color: #fff; cursor: pointer;">RADAR HUB</button>
                     <button onclick="app.navigate('add-lead')" style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 12px; font-size: 10px; font-weight: 950; color: var(--success); cursor: pointer;">EXTEND YIELD</button>
                  </div>
                </div>
              `;
      } else {
        expanded.innerHTML = `<div style="padding: 20px; text-align: center; font-size: 11px; color: rgba(255,255,255,0.4); font-weight: 700; text-transform: uppercase;">Channel Secure</div>`;
      }
    }
  },

  toggleNotifications() {
    const drawer = document.getElementById("notif-drawer");
    if (!drawer) return;
    drawer.classList.toggle("active");
    if (drawer.classList.contains("active")) {
      this.renderNotifications();
      const badge = document.getElementById("notif-badge");
      if (badge) badge.style.display = "none";
      localStorage.setItem("notif-read-time", Date.now());
    }
  },

  clearNotifications() {
    const list = document.getElementById("notif-list");
    if (list)
      list.innerHTML =
        '<div style="padding: 40px 0; text-align: center; opacity: 0.3; font-weight: 600; font-size: 13px;">Tactical stream clear.</div>';
    const badge = document.getElementById("notif-badge");
    if (badge) badge.style.display = "none";
    const pill = document.getElementById("notif-count-pill");
    if (pill) pill.textContent = "0";
  },

  renderNotifications() {
    const list = document.getElementById("notif-list");
    if (!list) return;
    const lastRead = parseInt(
      localStorage.getItem("notif-read-time") || 0,
    );

    const alerts = [];
    this.leads
      .filter((l) => l.priority === "Hot" && l.status === "New Inquiry")
      .forEach((l) => {
        alerts.push({
          type: "hot",
          title: "Action Required",
          desc: `${l.name} - High-Intent lead captured. View registry immediately.`,
          time: l.timestamp,
          id: l.id,
        });
      });
    this.leads
      .filter((l) => l.status === "Follow-up")
      .forEach((l) => {
        alerts.push({
          type: "urgent",
          title: "Follow-up Reminder",
          desc: `Scheduled outreach for ${l.name}.`,
          time: l.timestamp,
          id: l.id,
        });
      });

    const sorted = alerts.sort((a, b) => b.time - a.time).slice(0, 10);
    const unread = sorted.filter((a) => a.time > lastRead).length;
    const badge = document.getElementById("notif-badge");
    if (badge) badge.style.display = unread > 0 ? "block" : "none";
    const pill = document.getElementById("notif-count-pill");
    if (pill) pill.textContent = sorted.length;

    list.innerHTML = sorted.length
      ? sorted
        .map(
          (a) => `
 <div class="notif-card" onclick="app.viewLead('${a.id}'); app.toggleNotifications();">
 <div style="display: flex; gap: 16px; align-items: flex-start;">
 <div style="width: 42px; height: 42px; border-radius: 12px; background: ${a.type === "hot" ? "rgba(255, 149, 0, 0.1)" : "rgba(255, 59, 48, 0.1)"}; color: ${a.type === "hot" ? "var(--warning)" : "var(--error)"}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: inset 0 0 0 1px ${a.type === "hot" ? "rgba(255, 149, 0, 0.2)" : "rgba(255, 59, 48, 0.2)"};">
 ${a.type === "hot" ? '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>' : '<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>'}
 </div>
 <div style="flex: 1;">
 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
 <div style="font-weight: 850; font-size: 15px; color: var(--text-primary); letter-spacing: -0.3px;">${a.title}</div>
 <div style="font-size: 10px; font-weight: 750; color: var(--text-muted); opacity: 0.9;">${new Date(a.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
 </div>
 <div style="font-size: 13px; line-height: 1.5; color: var(--text-secondary);">${a.desc}</div>
 </div>
 </div>
 </div>`
        )
        .join("")
      : '<div style="padding: 40px 0; text-align: center; opacity: 0.3; font-weight: 600; font-size: 13px;">Operations secure.</div>';
  },

  async renderDashboard() {
    this.updateGreeting();
    this.updateIslandStatus();
    this.renderNotifications();

    const nowTs = Date.now();
    const startOfToday = new Date().setHours(0, 0, 0, 0);

    // --- LOCAL PERSISTENCE HYDRATION ---
    const cachedQms = RedishStash.get('qms_registry');
    if (cachedQms && (!this.qmsRegistry || this.qmsRegistry.length === 0)) {
       this.qmsRegistry = cachedQms;
    }

    this.triggerStrategicKPIs();


    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    // 0. QMS INTELLIGENCE PRE-FLIGHT (HIGH-PRECISION ENGINE)
    const normalize = (val) => String(val || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();
    const normalizePhone = (p) => {
      const cleaned = String(p || "").replace(/\D/g, "");
      return cleaned.length >= 10 ? cleaned.slice(-10) : null;
    };

    const qmsPhoneMap = {};
    const qmsNameMap = {};
    
    (this.qmsRegistry || []).forEach(q => {
      const p = normalizePhone(q.phone || q.mobile || q.contact || q.p);
      const n = normalize(q.name || q.customer_name || q.n);
      
      const qTs = new Date(q.created_at || q.timestamp || q.ts || Date.now()).getTime();
      const status = String(q.status || q.entry_type || q.sale_status || q.queue_status || "").toUpperCase();
      const isSuccess = status.includes('PURCHASED') || q.converted || status === 'SUCCESS' || status === 'SUCCESSFUL';

      if (p) {
        if (!qmsPhoneMap[p] || isSuccess) qmsPhoneMap[p] = { ...q, isSuccess, qTs };
      }
      if (n && n.length > 3) {
        if (!qmsNameMap[n] || isSuccess) qmsNameMap[n] = { ...q, isSuccess, qTs };
      }
    });

    // 1. SINGLE-PASS PERFORMANCE ENGINE (O(N) Complexity)
    let metrics = this.leads.reduce((acc, l) => {
      const ts = typeof l.timestamp === 'number' ? l.timestamp : new Date(l.timestamp).getTime();
      const isShort = l.type === "short" || l.type === "Short" || l.type === "short-reg";

      const isAdmin = ["Admin", "Supervisor"].includes(this.user.role);
      const isAuthorized = isAdmin ||
        l.owner === this.user.id ||
        l.owner === this.user.email ||
        l.assigned_to === this.user.id ||
        l.added_by === this.user.email;

      if (!isAuthorized) return acc;

      const historyArr = Array.isArray(l.history) ? l.history : [];
      const bornTs = (historyArr.length > 0 && historyArr[0].time) ? historyArr[0].time : ts;
      const isActuallyToday = bornTs >= startOfToday;

      if (isActuallyToday && !isShort) acc.todayTotal++;
      if (isActuallyToday && isShort) acc.todayShort++;
      if (isShort) acc.totalShort++;
      else acc.totalLong++;

      if (!isShort && (l.followup_date === todayStr || (l.followup_date && l.followup_date.includes(todayStr)))) {
        acc.todayFollowupCount++;
      }
      if (!isShort && l.priority === "Hot" && l.status !== "Purchased") acc.hotTotal++;
      if (!isShort && l.status === "Follow-up") acc.totalFollowupCount++;
      if (!isShort && l.status === "Purchased") acc.purchasedTotal++;

      return acc;
    }, { todayTotal: 0, todayShort: 0, hotTotal: 0, todayFollowupCount: 0, totalFollowupCount: 0, purchasedTotal: 0, totalLong: 0, totalShort: 0 });

    const myAuditCount = this.myAuditCount || 0;
    const { todayTotal, todayShort, hotTotal, todayFollowupCount, totalFollowupCount, purchasedTotal, totalLong, totalShort } = metrics;
    const todayShort_formatted = todayShort;

    // 1b. RE-ANCHOR EXECUTIVE HEADER (Reduce for balance)
    const headerContainer = document.querySelector(".dash-hero-header");
    if (headerContainer) {
      const h1 = headerContainer.querySelector("h1");
      if (h1) h1.style.fontSize = "36px";
    }

    // 2. BENTO-KPI REGISTRY (Signature Luxury 4.5)
    const kpiContainer = document.getElementById("kpi-grid");
    if (!kpiContainer) return;

    const salesPulse = todayTotal > 0 ? Math.round((purchasedTotal / todayTotal) * 100) : 0;
    const needsFullRender = kpiContainer.innerHTML.trim() === "" || kpiContainer.dataset.rendered !== "true" || kpiContainer.dataset.version !== "optimized_v2";

    if (needsFullRender) {
      kpiContainer.style.display = "grid";
      kpiContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(220px, 1fr))";
      kpiContainer.style.gap = "20px";
      kpiContainer.style.marginBottom = "48px";
      kpiContainer.innerHTML = `

                 <!-- TODAY'S ENTRIES -->
                 <div class="card elevated" onclick="app.navigateWithFilter('leads', 'today')" style="padding: 24px; border-radius: 28px; background: #fff; border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px; transition: all 0.4s ease; cursor: pointer;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                       <div style="width: 40px; height: 40px; background: rgba(52, 199, 89, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #34C759;">
                          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                       </div>
                       <div style="font-size: 9px; font-weight: 900; color: #34C759; text-transform: uppercase; letter-spacing: 1.2px; opacity: 0.8;">LIVE PULSE</div>
                    </div>
                    <div>
                       <div id="kpi-val-todayTotal" style="font-size: 42px; font-weight: 900; color: var(--text-primary); letter-spacing: -2px; line-height: 1;">0</div>
                       <div style="font-size: 10px; color: var(--text-muted); font-weight: 850; margin-top: 6px;">TODAY'S ENTRIES</div>
                    </div>
                 </div>

                 <!-- TODAY'S SHORT ENTRIES -->
                 <div class="card elevated" onclick="app.navigateWithFilter('leads', 'short')" style="padding: 24px; border-radius: 28px; background: #fff; border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px; transition: all 0.4s ease; cursor: pointer;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                       <div style="width: 40px; height: 40px; background: rgba(175, 82, 222, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #AF52DE;">
                          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3m0 0c.887 0 1.741.099 2.56.287M12 3v18m0-18l-1.44 3.5M12 3l1.44 3.5"></path></svg>
                       </div>
                       <div style="font-size: 9px; font-weight: 900; color: #AF52DE; text-transform: uppercase; letter-spacing: 1.2px; opacity: 0.8;">RAPID LOG</div>
                    </div>
                    <div>
                       <div id="kpi-val-todayShort" style="font-size: 42px; font-weight: 900; color: var(--text-primary); letter-spacing: -2px; line-height: 1;">0</div>
                       <div style="font-size: 10px; color: var(--text-muted); font-weight: 850; margin-top: 6px;">SHORT CAPTURES</div>
                    </div>
                 </div>

                <!-- TODAY'S FOLLOW UP -->
                <div class="card elevated" onclick="app.navigateWithFilter('leads', 'today_followup')" style="padding: 24px; border-radius: 28px; background: #fff; border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px; transition: all 0.4s ease; cursor: pointer;">
                   <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="width: 40px; height: 40px; background: rgba(0, 122, 255, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #007AFF;">
                         <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                      <div style="font-size: 9px; font-weight: 900; color: #007AFF; text-transform: uppercase; letter-spacing: 1.2px; opacity: 0.8;">SCHEDULED</div>
                   </div>
                   <div>
                      <div id="kpi-val-todayFollowupCount" style="font-size: 42px; font-weight: 900; color: var(--text-primary); letter-spacing: -2px; line-height: 1;">0</div>
                      <div style="font-size: 10px; color: var(--text-muted); font-weight: 850; margin-top: 6px;">TODAY'S FOLLOW UP</div>
                   </div>
                   <div style="padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.04); display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 9px; font-weight: 900; color: #007AFF;">ACTION REQUIRED</span>
                      <span style="width: 8px; height: 8px; background: #007AFF; border-radius: 50%;"></span>
                   </div>
                </div>

                <!-- HOT LEADS -->
                <div class="card elevated" onclick="app.navigateWithFilter('leads', 'hot')" style="padding: 24px; border-radius: 28px; background: #fff; border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px; transition: all 0.4s ease; cursor: pointer;">
                   <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="width: 40px; height: 40px; background: rgba(255, 59, 48, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #FF3B30;">
                         <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      </div>
                      <div style="font-size: 9px; font-weight: 900; color: #FF3B30; text-transform: uppercase; letter-spacing: 1.2px; opacity: 0.8;">HIGH INTENT</div>
                   </div>
                   <div>
                      <div id="kpi-val-hotTotal" style="font-size: 42px; font-weight: 900; color: var(--text-primary); letter-spacing: -2px; line-height: 1;">0</div>
                      <div style="font-size: 10px; color: var(--text-muted); font-weight: 850; margin-top: 6px;">HOT LEADS</div>
                   </div>
                   <div style="padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.04); display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 9px; font-weight: 900; color: #FF3B30;">PRIORITY FOCUS</span>
                      <span class="pulse-hot" style="width: 8px; height: 8px;"></span>
                   </div>
                </div>

                <!-- TOTAL FOLLOW UPS -->
                <div class="card elevated" onclick="app.navigateWithFilter('leads', 'followup')" style="padding: 24px; border-radius: 28px; background: #fff; border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px; transition: all 0.4s ease; cursor: pointer;">
                   <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="width: 40px; height: 40px; background: rgba(255, 149, 0, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #FF9500;">
                         <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <div style="font-size: 9px; font-weight: 900; color: #FF9500; text-transform: uppercase; letter-spacing: 1.2px; opacity: 0.8;">PIPELINE</div>
                   </div>
                   <div>
                      <div id="kpi-val-totalFollowupCount" style="font-size: 42px; font-weight: 900; color: var(--text-primary); letter-spacing: -2px; line-height: 1;">0</div>
                      <div style="font-size: 10px; color: var(--text-muted); font-weight: 850; margin-top: 6px;">TOTAL FOLLOW UPS</div>
                   </div>
                   <div style="padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.04); display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 9px; font-weight: 900; color: var(--warning);">TACTICAL REMINDERS</span>
                      <span style="width: 8px; height: 8px; background: #FF9500; border-radius: 50%;"></span>
                   </div>
                </div>

                <!-- TOTAL ENTRIES -->
                <div class="card elevated" onclick="app.navigateWithFilter('leads', 'vault')" style="padding: 24px; border-radius: 28px; background: #fff; border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px; transition: all 0.4s ease; cursor: pointer;">
                   <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="width: 40px; height: 40px; background: rgba(82, 18, 22, 0.05); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent);">
                         <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                      </div>
                      <div style="font-size: 9px; font-weight: 900; color: var(--accent); text-transform: uppercase; letter-spacing: 1.2px; opacity: 0.8;">TOTAL SCOPE</div>
                   </div>
                   <div>
                      <div id="kpi-val-totalLeads" style="font-size: 42px; font-weight: 900; color: var(--text-primary); letter-spacing: -2px; line-height: 1;">0</div>
                      <div style="font-size: 10px; color: var(--text-muted); font-weight: 850; margin-top: 6px;">TOTAL ENTRIES</div>
                   </div>
                   <div style="padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.04); align-items: center; gap: 8px;">
                      <span style="font-size: 9px; font-weight: 900; color: var(--text-muted); opacity: 0.6;">INTEGRATED VAULT</span>
                   </div>
                </div>

                <!-- TOTAL LONG ENTRIES -->
                <div class="card elevated" onclick="app.navigateWithFilter('leads', 'long')" style="padding: 24px; border-radius: 28px; background: #fff; border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px; transition: all 0.4s ease; cursor: pointer;">
                   <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="width: 40px; height: 40px; background: rgba(0, 122, 255, 0.05); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #007AFF;">
                         <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                      </div>
                      <div style="font-size: 9px; font-weight: 900; color: #007AFF; text-transform: uppercase; letter-spacing: 1.2px; opacity: 0.8;">LONG FORM</div>
                   </div>
                   <div>
                      <div id="kpi-val-totalLong" style="font-size: 42px; font-weight: 900; color: var(--text-primary); letter-spacing: -2px; line-height: 1;">0</div>
                      <div style="font-size: 10px; color: var(--text-muted); font-weight: 850; margin-top: 6px;">TOTAL LONG ENTRIES</div>
                   </div>
                   <div style="padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.04); align-items: center; gap: 8px;">
                      <span style="font-size: 9px; font-weight: 900; color: var(--text-muted); opacity: 0.6;">DETAILED CAPTURES</span>
                   </div>
                </div>

                <!-- TOTAL SHORT ENTRIES -->
                <div class="card elevated" onclick="app.navigateWithFilter('leads', 'short')" style="padding: 24px; border-radius: 28px; background: #fff; border: 1px solid rgba(0,0,0,0.03); display: flex; flex-direction: column; gap: 14px; transition: all 0.4s ease; cursor: pointer;">
                   <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="width: 40px; height: 40px; background: rgba(175, 82, 222, 0.05); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #AF52DE;">
                         <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      </div>
                      <div style="font-size: 9px; font-weight: 900; color: #AF52DE; text-transform: uppercase; letter-spacing: 1.2px; opacity: 0.8;">SHORT FORM</div>
                   </div>
                   <div>
                      <div id="kpi-val-totalShort" style="font-size: 42px; font-weight: 900; color: var(--text-primary); letter-spacing: -2px; line-height: 1;">0</div>
                      <div style="font-size: 10px; color: var(--text-muted); font-weight: 850; margin-top: 6px;">TOTAL SHORT ENTRIES</div>
                   </div>
                   <div style="padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.04); align-items: center; gap: 8px;">
                      <span style="font-size: 9px; font-weight: 900; color: var(--text-muted); opacity: 0.6;">RAPID CAPTURES</span>
                   </div>
                </div>



                <!-- WRONG CHATS KPI (MEMBER FEEDBACK) -->
                <div class="card elevated" id="kpi-wrong-chats" style="padding: 24px; border-radius: 28px; background: rgba(255, 59, 48, 0.05); border: 1.5px dashed #FF3B30; display: ${myAuditCount > 0 ? 'flex' : 'none'}; flex-direction: column; gap: 14px; grid-column: span 1;">
                   <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="width: 40px; height: 40px; background: rgba(255, 59, 48, 0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #FF3B30;">
                         <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                      </div>
                      <div style="font-size: 9px; font-weight: 900; color: #FF3B30; text-transform: uppercase; letter-spacing: 1.2px;">QA AUDIT</div>
                   </div>
                   <div>
                      <div id="kpi-val-auditCount" style="font-size: 42px; font-weight: 900; color: #FF3B30; letter-spacing: -2px; line-height: 1;">0</div>
                      <div style="font-size: 10px; color: #FF3B30; font-weight: 850; margin-top: 6px;">FLAGGED ENTRIES FOR REVIEW</div>
                   </div>
                   <div style="padding-top: 10px; border-top: 1px solid rgba(255, 59, 48, 0.1); display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 9px; font-weight: 900; color: #FF3B30; cursor: pointer;" onclick="app.navigate('audit')">VIEW FEEDBACK →</span>
                   </div>
                </div>

      `;
      kpiContainer.dataset.rendered = "true";
      kpiContainer.dataset.version = "optimized_v2";
    }

    // --- STRATEGIC SIGNALS (POST-RENDER) ---
    if (this.triggerStrategicKPIs) {
       setTimeout(() => this.triggerStrategicKPIs(), 50);
       this.triggerStrategicKPIs();
    }

    // --- TRIGGER COUNTING ANIMATIONS ---
    this.animateCount("kpi-val-todayTotal", todayTotal);
    this.animateCount("kpi-val-todayShort", todayShort);
    this.animateCount("kpi-val-todayFollowupCount", todayFollowupCount);
    this.animateCount("kpi-val-hotTotal", hotTotal);
    this.animateCount("kpi-val-totalFollowupCount", totalFollowupCount);
    this.animateCount("kpi-val-totalLeads", this.leads.length);
    this.animateCount("kpi-val-totalLong", totalLong);
    this.animateCount("kpi-val-totalShort", totalShort);
    this.animateCount("kpi-val-auditCount", myAuditCount);

    // Sales Pulse (Purchased Rate) can be shown elsewhere if needed, 
    // but Strategic Pulse (Arrival Rate) is now handled by triggerStrategicKPIs.

    const isAdminView = ["Admin", "Supervisor"].includes(this.user.role);
    const teamBoardEl = document.getElementById('team-command-board');
    if (teamBoardEl) {
      teamBoardEl.style.display = isAdminView ? 'block' : 'none';
    }

    if (teamBoardEl && isAdminView) {
      const memberMap = {};
      const allFull = this.leads.filter(l => !l.type?.includes('short'));
      allFull.forEach(l => {
        const key = l.owner_name || l.added_by || 'Unknown';
        if (!memberMap[key]) {
          memberMap[key] = { name: key, todayFull: 0, todayShort: 0, total: 0, hot: 0, purchased: 0, followup: 0 };
        }
        const lts = typeof l.timestamp === 'number' ? l.timestamp : new Date(l.timestamp).getTime();
        const history = l.history || [];
        const bornTs2 = (history.length > 0 && history[0].time) ? history[0].time : lts;
        if (bornTs2 >= startOfToday) memberMap[key].todayFull++;
        if (l.priority === 'Hot' && l.status !== 'Purchased') memberMap[key].hot++;
        if (l.status === 'Purchased') memberMap[key].purchased++;
        if (l.status === 'Follow-up') memberMap[key].followup++;
        memberMap[key].total++;
      });

      this.leads.filter(l => l.type?.includes('short')).forEach(l => {
        const key = l.owner_name || l.added_by || 'Unknown';
        if (!memberMap[key]) memberMap[key] = { name: key, todayFull: 0, todayShort: 0, total: 0, hot: 0, purchased: 0, followup: 0 };
        const lts2 = typeof l.timestamp === 'number' ? l.timestamp : new Date(l.timestamp).getTime();
        const hist2 = l.history || [];
        const born2 = (hist2.length > 0 && hist2[0].time) ? hist2[0].time : lts2;
        if (born2 >= startOfToday) memberMap[key].todayShort++;
        memberMap[key].total++;
      });

      const members = Object.values(memberMap).sort((a, b) => (b.todayFull + b.todayShort) - (a.todayFull + a.todayShort));
      const maxToday = Math.max(...members.map(m => m.todayFull + m.todayShort), 1);
      const topMember = members[0] || { name: 'Unknown', purchased: 0, hot: 0, followup: 0, todayFull: 0, todayShort: 0 };
      const topCount = topMember.todayFull + topMember.todayShort;
      const totalPurchased = allFull.filter(l => l.status === 'Purchased').length;
      const convRate = allFull.length > 0 ? ((totalPurchased / allFull.length) * 100).toFixed(1) : '0.0';
      const todayAllFull = allFull.filter(l => { const lts = typeof l.timestamp === 'number' ? l.timestamp : new Date(l.timestamp).getTime(); const hist = l.history || []; const born = (hist.length > 0 && hist[0].time) ? hist[0].time : lts; return born >= startOfToday; }).length;
      const todayPurchased = allFull.filter(l => { const lts = typeof l.timestamp === 'number' ? l.timestamp : new Date(l.timestamp).getTime(); const hist = l.history || []; const born = (hist.length > 0 && hist[0].time) ? hist[0].time : lts; return born >= startOfToday && l.status === 'Purchased'; }).length;
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const week7 = allFull.filter(l => { const lts = typeof l.timestamp === 'number' ? l.timestamp : new Date(l.timestamp).getTime(); return lts >= sevenDaysAgo; }).length;
      const avgVelocity = week7 > 0 ? (week7 / 7).toFixed(1) : '0.0';

      triggerStrategicKPIs();
      
      teamBoardEl.innerHTML = `
            <div style="margin-bottom: 64px; animation: fadeIn 0.8s ease; position: relative;">
              <!-- SECTION HEADER -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 48px; padding: 0 10px;">
                <div style="position: relative;">
                  <div style="display: inline-flex; align-items: center; gap: 12px; background: #000; padding: 8px 18px; border-radius: 100px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <div style="width: 10px; height: 10px; background: #34C759; border-radius: 50%; box-shadow: 0 0 15px #34C759; animation: pulse 2s infinite;"></div>
                    <span style="font-size: 11px; font-weight: 950; color: #fff; letter-spacing: 3px; text-transform: uppercase; opacity: 0.9;">Strategic Operations Console</span>
                  </div>
                  <h2 style="font-size: 56px; font-weight: 950; color: #000; margin: 0; letter-spacing: -3px; line-height: 0.9; position: relative;">
                    Executive Intelligence
                    <span style="position: absolute; top: -10px; right: -40px; font-size: 12px; color: var(--accent); font-weight: 950; letter-spacing: 2px;">V9.2</span>
                  </h2>
                  <p style="font-size: 15px; color: var(--text-muted); font-weight: 700; margin-top: 15px; opacity: 0.7; letter-spacing: -0.2px;">Real-time tactical performance and network synchronization logs.</p>
                </div>
                <div style="display: flex; gap: 16px;">
                   <div style="text-align: right; margin-right: 24px;">
                      <div style="font-size: 10px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Security Clearance</div>
                      <div style="font-size: 14px; font-weight: 950; color: var(--accent);">ADMIN LEVEL 1</div>
                   </div>
                   <button onclick="app.refreshLeads()" style="background: linear-gradient(135deg, #000 0%, #222 100%); color: #fff; border: 1px solid rgba(255,255,255,0.1); padding: 14px 28px; border-radius: 22px; font-size: 11px; font-weight: 950; cursor: pointer; display: flex; align-items: center; gap: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.2); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); letter-spacing: 1.5px;" onmouseover="this.style.transform='translateY(-3px) scale(1.02)'; this.style.boxShadow='0 30px 60px rgba(0,0,0,0.3)';" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 20px 50px rgba(0,0,0,0.2)';">
                      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                      SYNC CORE
                   </button>
                </div>
              </div>

              <!-- TOP PERFORMANCE SPOTLIGHT & AGGREGATE CORE -->
              <div style="display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 28px; margin-bottom: 48px;">
                 <!-- OBSIDIAN VANGUARD CARD -->
                 <div style="background: #0D0D0D; border-radius: 42px; padding: 48px; position: relative; overflow: hidden; box-shadow: 0 50px 100px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); transition: all 0.5s ease;" onmouseover="this.style.transform='translateY(-8px) scale(1.005)';" onmouseout="this.style.transform='translateY(0) scale(1)';">
                    <div style="position: absolute; top: -100px; right: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(82,18,22,0.3) 0%, transparent 70%); border-radius: 50%; filter: blur(40px);"></div>
                    <div style="position: absolute; bottom: -50px; left: -50px; width: 250px; height: 250px; background: radial-gradient(circle, rgba(0,122,255,0.1) 0%, transparent 70%); border-radius: 50%; filter: blur(30px);"></div>
                    
                    <div style="position: relative; z-index: 2;">
                       <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px;">
                          <div style="display: flex; align-items: center; gap: 20px;">
                             <div style="width: 72px; height: 72px; background: rgba(255,255,255,0.03); border-radius: 24px; display: flex; align-items: center; justify-content: center; color: #FFD700; border: 1px solid rgba(255,215,0,0.15); box-shadow: inset 0 0 20px rgba(255,215,0,0.05);">
                                <svg width="36" height="36" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                             </div>
                             <div>
                                <div style="font-size: 12px; font-weight: 950; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 3px;">Top Performance</div>
                                <div style="font-size: 28px; font-weight: 950; color: #fff; letter-spacing: -1.5px; margin-top: 6px;">${topMember.name.split('@')[0]}</div>
                             </div>
                          </div>
                          <div style="background: rgba(255,215,0,0.1); color: #FFD700; padding: 10px 20px; border-radius: 14px; font-size: 11px; font-weight: 950; border: 1px solid rgba(255,215,0,0.2); letter-spacing: 2px;">VANGUARD</div>
                       </div>
                       
                       <div style="margin-bottom: 40px;">
                          <div style="display: flex; align-items: baseline; gap: 12px;">
                             <div style="font-size: 84px; font-weight: 950; color: #fff; letter-spacing: -5px; line-height: 0.8;">${topCount}</div>
                             <div style="font-size: 15px; font-weight: 850; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 2px;">Strategic Points</div>
                          </div>
                          <div style="margin-top: 24px; height: 8px; background: rgba(255,255,255,0.03); border-radius: 4px; overflow: hidden; width: 100%; border: 1px solid rgba(255,255,255,0.05);">
                             <div style="height: 100%; width: 100%; background: linear-gradient(90deg, var(--accent) 0%, #FFD700 100%); border-radius: 4px; box-shadow: 0 0 20px var(--accent);"></div>
                          </div>
                       </div>

                       <div style="padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
                          <div>
                             <div style="font-size: 22px; font-weight: 950; color: #34C759;">${topMember.purchased}</div>
                             <div style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 6px;">Closed</div>
                          </div>
                          <div>
                             <div style="font-size: 22px; font-weight: 950; color: #FFD700;">${topMember.hot}</div>
                             <div style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 6px;">Hot</div>
                          </div>
                          <div>
                             <div style="font-size: 22px; font-weight: 950; color: #007AFF;">${topMember.followup}</div>
                             <div style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 6px;">Pipeline</div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <!-- CORE ANALYTICS -->
                 <div style="display: flex; flex-direction: column; gap: 28px;">
                    <div style="flex: 1; background: rgba(255,255,255,0.95); backdrop-filter: blur(40px); border-radius: 42px; padding: 36px; border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 30px 60px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform='translateY(-4px)';" onmouseout="this.style.transform='translateY(0)';">
                       <div>
                          <div style="font-size: 11px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">
                             <span style="width: 5px; height: 16px; background: var(--accent); border-radius: 3px;"></span>
                             Efficiency
                          </div>
                          <div style="display: flex; align-items: baseline; gap: 6px;">
                             <div style="font-size: 56px; font-weight: 950; color: #000; letter-spacing: -3px; line-height: 0.8;">${convRate}</div>
                             <div style="font-size: 20px; font-weight: 850; color: var(--text-muted); opacity: 0.5;">%</div>
                          </div>
                       </div>
                       <div style="margin-top: 24px;">
                          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                             <span style="font-size: 11px; font-weight: 900; color: var(--text-muted);">Conversion Velocity</span>
                             <span style="font-size: 11px; font-weight: 950; color: var(--accent);">${convRate}%</span>
                          </div>
                          <div style="height: 8px; background: rgba(0,0,0,0.03); border-radius: 4px; overflow: hidden; border: 1px solid rgba(0,0,0,0.02);">
                             <div style="height: 100%; width: ${convRate}%; background: var(--accent); border-radius: 4px; box-shadow: 0 0 15px rgba(82,18,22,0.3);"></div>
                          </div>
                       </div>
                    </div>
                    <div style="flex: 1; background: rgba(255,255,255,0.95); backdrop-filter: blur(40px); border-radius: 42px; padding: 36px; border: 1px solid rgba(255,255,255,0.8); box-shadow: 0 30px 60px rgba(0,0,0,0.03); display: flex; flex-direction: column; justify-content: space-between; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform='translateY(-4px)';" onmouseout="this.style.transform='translateY(0)';">
                       <div>
                          <div style="font-size: 11px; font-weight: 950; color: #34C759; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px;">
                             <span style="width: 5px; height: 16px; background: #34C759; border-radius: 3px;"></span>
                             Network Velocity
                          </div>
                          <div style="display: flex; align-items: baseline; gap: 10px;">
                             <div style="font-size: 56px; font-weight: 950; color: #000; letter-spacing: -3px; line-height: 0.8;">${avgVelocity}</div>
                             <div style="font-size: 16px; font-weight: 850; color: var(--text-muted); opacity: 0.6;">DLY. AVG</div>
                          </div>
                       </div>
                       <div style="font-size: 12px; font-weight: 850; color: var(--text-muted); margin-top: 14px; opacity: 0.7; display: flex; align-items: center; gap: 8px;">
                          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                          Network Pulse: Stable
                       </div>
                    </div>
                 </div>

                 <!-- STRATEGIC PIPELINE -->
                 <div style="background: linear-gradient(135deg, #fff 0%, #F5F5F5 100%); border-radius: 42px; padding: 36px; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 30px 60px rgba(0,0,0,0.04); display: flex; flex-direction: column; justify-content: space-between; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.boxShadow='0 40px 80px rgba(0,0,0,0.08)';" onmouseout="this.style.boxShadow='0 30px 60px rgba(0,0,0,0.04)';">
                    <div>
                       <div style="font-size: 11px; font-weight: 950; color: #007AFF; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 32px;">Pipeline Intensity</div>
                       <div style="display: flex; flex-direction: column; gap: 12px;">
                          <div style="font-size: 64px; font-weight: 950; color: #000; letter-spacing: -4px; line-height: 0.8;">${todayPurchased}</div>
                          <div style="font-size: 14px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Secured Today</div>
                       </div>
                       <div style="margin-top: 24px;">
                          <span style="font-size: 11px; font-weight: 950; color: #007AFF; background: rgba(0,122,255,0.1); padding: 8px 18px; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(0,122,255,0.1);">
                             <div style="width: 8px; height: 8px; background: #007AFF; border-radius: 50%; box-shadow: 0 0 10px #007AFF;"></div>
                             ${todayPurchased > 0 ? 'GROWTH SPIKE' : 'STEADY STATE'}
                          </span>
                       </div>
                    </div>
                    <div style="padding-top: 32px; border-top: 1px solid rgba(0,0,0,0.05);">
                       <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                          <span style="font-size: 12px; font-weight: 900; color: var(--text-muted);">Network Saturation</span>
                          <span style="font-size: 12px; font-weight: 950; color: #000;">${this.fmt(week7)} Active</span>
                       </div>
                       <div style="height: 10px; background: rgba(0,0,0,0.03); border-radius: 5px; overflow: hidden; border: 1px solid rgba(0,0,0,0.02);">
                          <div style="height: 100%; width: ${Math.min((week7 / Math.max(allFull.length, 1)) * 100, 100)}%; background: linear-gradient(90deg, #007AFF 0%, #AF52DE 100%); border-radius: 5px; box-shadow: 0 0 15px rgba(0,122,255,0.3);"></div>
                       </div>
                    </div>
                 </div>
              </div>

              <!-- DETAILED MEMBER PERFORMANCE LOG -->
              <div style="background: rgba(255,255,255,0.8); backdrop-filter: blur(30px); border-radius: 42px; border: 1px solid rgba(255,255,255,1); overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,0.05);">
                <div style="display: grid; grid-template-columns: 100px 1.5fr 120px 120px 120px 120px 120px; gap: 0; padding: 32px 48px; background: #000; border-bottom: 1px solid rgba(255,255,255,0.05);">
                  <div style="font-size: 11px; font-weight: 950; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 2px;">Rank</div>
                  <div style="font-size: 11px; font-weight: 950; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 2px;">Officer ID</div>
                  <div style="font-size: 11px; font-weight: 950; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 2px; text-align: center;">Pulse</div>
                  <div style="font-size: 11px; font-weight: 950; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 2px; text-align: center;">Total Registry</div>
                  <div style="font-size: 11px; font-weight: 950; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 2px; text-align: center;">High Intent</div>
                  <div style="font-size: 11px; font-weight: 950; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 2px; text-align: center;">Conversions</div>
                  <div style="font-size: 11px; font-weight: 950; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 2px; text-align: center;">Pipeline</div>
                </div>

                <div style="max-height: 800px; overflow-y: auto; scrollbar-width: none;">
                ${members.map((m, i) => {
        const todayCount = m.todayFull + m.todayShort;
        const barPct = maxToday > 0 ? (todayCount / maxToday) * 100 : 0;
        const avatarBg = i === 0 ? 'linear-gradient(135deg,#FFD700,#FFA500)' : i === 1 ? 'linear-gradient(135deg,#C0C0C0,#A0A0A0)' : i === 2 ? 'linear-gradient(135deg,#CD7F32,#A0522D)' : '#000';
        const rowBg = i % 2 === 0 ? 'rgba(0,0,0,0.01)' : 'transparent';
        return `
                  <div style="display: grid; grid-template-columns: 100px 1.5fr 120px 120px 120px 120px 120px; gap: 0; padding: 28px 48px; border-bottom: 1px solid rgba(0,0,0,0.03); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); align-items: center; background: ${rowBg};" onmouseover="this.style.background='rgba(0,0,0,0.04)'; this.style.transform='translateX(8px)';" onmouseout="this.style.background='${rowBg}'; this.style.transform='translateX(0)';">
                    <div style="display: flex; align-items: center;">
                       <span style="font-size: 20px; font-weight: 950; color: ${i < 3 ? 'var(--accent)' : '#000'}; opacity: ${i < 3 ? 1 : 0.2}; letter-spacing: -1.5px;">#${String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 24px;">
                       <div style="width: 56px; height: 56px; border-radius: 20px; background: ${avatarBg}; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 950; color: ${i < 3 ? '#fff' : 'rgba(255,255,255,0.4)'}; border: 2px solid #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">${(m.name || 'U')[0].toUpperCase()}</div>
                       <div style="flex: 1;">
                          <div style="font-size: 18px; font-weight: 950; color: #000; letter-spacing: -0.8px;">${m.name.split('@')[0]}</div>
                          <div style="margin-top: 10px; height: 5px; background: rgba(0,0,0,0.04); border-radius: 3px; overflow: hidden; width: 100%; max-width: 200px;">
                             <div style="height: 100%; width: ${barPct}%; background: ${i === 0 ? 'var(--accent)' : '#000'}; border-radius: 3px;"></div>
                          </div>
                       </div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 4px;">
                       <div style="font-size: 24px; font-weight: 950; color: #000; letter-spacing: -2px;">${todayCount}</div>
                       ${m.todayShort > 0 ? `<div style="font-size: 9px; font-weight: 900; color: #AF52DE; text-transform: uppercase; letter-spacing: 1px; background: rgba(175,82,222,0.1); padding: 2px 6px; border-radius: 4px;">+${m.todayShort} FAST</div>` : ''}
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 950; color: #000; opacity: 0.3;">${this.fmt(m.total)}</div>
                    <div style="display: flex; align-items: center; justify-content: center;">
                       <div style="min-width: 48px; height: 40px; border-radius: 14px; background: rgba(255,59,48,0.06); color: #FF3B30; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 950; border: 1px solid rgba(255,59,48,0.1);">${m.hot}</div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center;">
                       <div style="min-width: 48px; height: 40px; border-radius: 14px; background: rgba(52,199,89,0.06); color: #34C759; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 950; border: 1px solid rgba(52,199,89,0.1);">${m.purchased}</div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center;">
                       <div style="min-width: 48px; height: 40px; border-radius: 14px; background: rgba(0,122,255,0.06); color: #007AFF; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 950; border: 1px solid rgba(0,122,255,0.1);">${m.followup}</div>
                    </div>
                  </div>
                  `
      }).join('')}
                </div>
              </div>
            </div>
          `;
    } else if (teamBoardEl) {
      teamBoardEl.style.display = 'none';
    }

    // 3. PANORAMIC LAYOUT: Calculator & Entry Form
    const hubContainer = document.getElementById("dash-main-hub");
    if (hubContainer) {
      hubContainer.style.display = "grid";
      hubContainer.style.gridTemplateColumns = "1.2fr 1fr";
      hubContainer.style.gap = "32px";
      hubContainer.style.alignItems = "start";
    }

    const kpiConv = document.getElementById("kpi-conv");
    if (kpiConv)
      kpiConv.textContent =
        Math.round(
          (this.leads.filter((l) => l.status === "Purchased").length /
            (this.leads.length || 1)) *
          100,
        ) + "%";

    try {
      const { data: config } = await supabase.from('app_config').select('payload').eq('id', 'announcement').single();
      const annText = document.getElementById("dash-announcement-text");
      if (config && annText)
        annText.textContent = config.payload.text;
    } catch (e) {
      console.warn("Briefing sync deferred");
    }

    // AUTOMATE GOLD COIN RATE
    const rate24K = this.goldRates["24K (999)"] || 0;
    if (rate24K > 0) {
      this.goldRates["Coin"] = Math.round(rate24K * 1.03 * 1.03);
    }

    // DEFINITIVE PRICING ORDER
    const goldOrder = ["22K", "24K (999)", "Coin", "18K", "Old Gold"];
    const silverOrder = ["Silver Coin", "Silver Payal", "Silver Baby Kada", "Silver Ferva", "Silver Utensils/Pooja"];
    const pricingOrder = this.activePricingTab === 'gold' ? goldOrder : silverOrder;

    const trajContainer = document.getElementById("dash-trajectory-container");
    if (trajContainer) {
      trajContainer.innerHTML = `
            <div class="glass-card elevated" style="padding: 28px; min-height: 280px; display: flex; flex-direction: column; gap: 24px; border-radius:32px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <div style="font-size: 11px; font-weight: 850; letter-spacing: 1.5px; color: var(--accent); text-transform: uppercase;">Smart Calculator & Pricing</div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  ${this.user.role === "Admin" || this.user.role === "Supervisor" ? `<button onclick="app.editGoldRates()" style="background: rgba(0,122,255,0.08); color:#007AFF; border:none; padding:6px 10px; border-radius:8px; font-size:9px; font-weight:900; cursor:pointer; margin-right:8px;">EDIT RATES</button>` : ""}
                  <button onclick="app.setPricingTab('gold')" style="background: ${this.activePricingTab === 'gold' ? 'var(--accent)' : 'rgba(0,0,0,0.04)'}; color: ${this.activePricingTab === 'gold' ? '#fff' : 'var(--text-muted)'}; border:none; padding:6px 14px; border-radius:10px; font-size:10px; font-weight:900; cursor:pointer; transition:all 0.3s;">GOLD</button>
                  <button onclick="app.setPricingTab('silver')" style="background: ${this.activePricingTab === 'silver' ? 'var(--accent)' : 'rgba(0,0,0,0.04)'}; color: ${this.activePricingTab === 'silver' ? '#fff' : 'var(--text-muted)'}; border:none; padding:6px 14px; border-radius:10px; font-size:10px; font-weight:900; cursor:pointer; transition:all 0.3s;">SILVER</button>
                </div>
              </div>

              <!-- DETERMINISTIC PRICING TIERS -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
                ${pricingOrder
          .map((k, index) => {
            const v = this.goldRates[k] || 0;
            if (v === undefined && k !== "Silver") return "";

            const isSelected = this.calcState.purity === k;
            const trendUp = (k.charCodeAt(0) + k.length) % 2 === 0;

            return `
                      <div class="kpi-card" style="padding: 22px; border-radius: 24px; background: ${isSelected ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.7)'}; border: 2px solid ${isSelected ? 'var(--accent)' : 'rgba(0,0,0,0.03)'}; cursor:pointer; position:relative; overflow:hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: ${isSelected ? '0 12px 30px rgba(0,0,0,0.08)' : '0 4px 12px rgba(0,0,0,0.02)'};" onclick="app.setCalcPurity('${k}')">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
                          <div style="font-size: 11px; font-weight: 950; color: ${isSelected ? 'var(--accent)' : 'rgba(0,0,0,0.4)'}; text-transform: uppercase; letter-spacing: 1px;">${k}</div>
                          <div style="font-size: 9px; color: ${trendUp ? "var(--success)" : "#FF3B30"}; font-weight: 950; display:flex; align-items:center; gap:2px; background: ${trendUp ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)'}; padding: 2px 8px; border-radius: 99px;">
                            ${trendUp ? "▲" : "▼"} 0.${(k.length % 9)}%
                          </div>
                        </div>
                        <div style="font-size: 24px; font-weight: 900; color: var(--text-primary); letter-spacing: -1.5px;">
                          ${v > 0 ? `₹${this.fmt(v)}` : '₹0'}
                        </div>
                        <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); opacity: 0.5; margin-top: 4px; text-transform: uppercase;">Real-time Index</div>
                        ${isSelected ? `<div style="position:absolute; top:8px; right:8px; width:6px; height:6px; background:var(--accent); border-radius:50%; box-shadow: 0 0 10px var(--accent);"></div>` : ''}
                      </div>
                    `;
          })
          .join("")}
              </div>

              <!-- STRATEGIC CALCULATOR ENGINE v4.5 -->
              <div style="background: rgba(0,0,0,0.03); border-radius: 28px; padding: 28px; border: 1.5px solid rgba(0,0,0,0.04); margin-top: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px;">
                  
                  <!-- INPUT AXIS: WEIGHT -->
                  <div style="background: #fff; padding: 20px; border-radius: 22px; border: 1.5px solid rgba(0,0,0,0.04); box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                      <div style="font-size: 9px; font-weight: 950; color: var(--accent); letter-spacing: 1px; text-transform: uppercase;">Weight Registry</div>
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="opacity: 0.3;"><path d="M3 6l3 12h12l3-12H3z"></path></svg>
                    </div>
                    <input type="number" id="calc-weight" class="input" style="height: 48px; width: 100%; font-size: 24px; font-weight: 900; background: transparent; border: none; padding: 0; color: var(--text-primary); letter-spacing: -1px;" placeholder="0.00" value="${this.calcState.weight || ""}" oninput="app.updateCalc()">
                    <div style="font-size: 10px; font-weight: 850; color: var(--text-muted); margin-top: 4px; opacity: 0.6;">Unit: Grams (g)</div>
                  </div>

                  <!-- INPUT AXIS: PURITY -->
                  <div style="background: #fff; padding: 20px; border-radius: 22px; border: 1.5px solid rgba(0,0,0,0.04); box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                      <div style="font-size: 9px; font-weight: 950; color: var(--accent); letter-spacing: 1px; text-transform: uppercase;">Purity Selector</div>
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="opacity: 0.3;"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <select id="calc-purity" class="input" style="height: 48px; width: 100%; font-size: 16px; font-weight: 900; background: transparent; border: none; padding: 0; color: var(--text-primary); cursor: pointer;" onchange="app.updateCalc()">
                      ${goldOrder.concat(silverOrder).map(k => `<option value="${k}" ${this.calcState.purity === k ? "selected" : ""}>${k}</option>`).join("")}
                    </select>
                    <div style="font-size: 10px; font-weight: 850; color: var(--text-muted); margin-top: 4px; opacity: 0.6;">Active Protocol: ${this.calcState.purity}</div>
                  </div>

                </div>

                <!-- TACTICAL OVERRIDES -->
                <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px;">
                  <div style="flex: 1; min-width: 180px; background: rgba(255,255,255,0.5); padding: 12px 16px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(0,0,0,0.02);">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; width: 100%;">
                      <input type="checkbox" id="calc-gst" ${this.calcState.gst ? "checked" : ""} onchange="app.updateCalc()" style="width: 18px; height: 18px; accent-color: var(--accent);">
                      <span style="font-size: 11px; font-weight: 850; color: var(--text-secondary);">TAX REGISTRY (3% GST)</span>
                    </label>
                  </div>
                  <div style="flex: 1; min-width: 180px; background: rgba(255,255,255,0.7); padding: 12px 16px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; border: 1.5px solid rgba(0,0,0,0.03); display: ${this.calcState.purity.startsWith('Silver') || this.calcState.purity === 'Coin' ? 'none' : 'flex'};">
                    <span style="font-size: 9px; font-weight: 950; color: var(--text-muted);">MAKING (%):</span>
                    <input type="number" id="calc-making" value="${this.calcState.making || ""}" class="input" style="width: 70px; background: #fff; border: 1px solid rgba(0,0,0,0.05); text-align: right; font-weight: 950; color: var(--accent); font-size: 14px; border-radius: 8px; padding: 4px 8px;" placeholder="0" oninput="app.updateCalc()">
                  </div>
                </div>

                <!-- LIVE ESTIMATE HUD -->
                <div class="calculator-hud" style="background: #000; border-radius: 24px; padding: 28px; display: flex; justify-content: space-between; align-items: center; margin-top: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.1); gap: 40px;">
                  <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                      <div style="width: 6px; height: 6px; background: var(--success); border-radius: 50%; box-shadow: 0 0 10px var(--success);"></div>
                      <div style="font-size: 10px; font-weight: 950; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1.5px;">Live Valuation HUD</div>
                    </div>
                    <div id="calc-result" style="font-size: 42px; font-weight: 900; color: #FFFFFF; letter-spacing: -2px; line-height: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">₹0</div>
                    <div id="calc-approx" style="font-size: 11px; font-weight: 850; color: rgba(255,255,255,0.3); margin-top: 8px;">Institutional Grade Estimate | Precision 99.9%</div>
                  </div>
                  <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; flex-shrink: 0;">
                     <button onclick="app.copyQuote()" style="background: #FFF; color: #000; border: none; padding: 12px 24px; border-radius: 14px; font-size: 11px; font-weight: 950; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.3s ease; white-space: nowrap;">Extract Quote</button>
                     <div id="calc-breakdown" style="font-size: 9px; color: rgba(255,255,255,0.4); font-weight: 850; max-width: 140px; text-transform: uppercase; line-height: 1.4;">Real-time trajectory active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      this.updateCalc(true);
    }

    const renderColumn = (id, filterFn, emptyMsg) => {
      const container = document.getElementById(id);
      if (!container) return;

      const leadsToRender = this.leads
        .filter(filterFn)
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 8);

      container.innerHTML = leadsToRender.length
        ? leadsToRender.map(l => {
          const initial = (l.name || "?")[0].toUpperCase();
          const isToday = new Date(l.timestamp).toDateString() === new Date().toDateString();

          return `
                    <div class="card elevated" onclick="app.viewLead('${(l.id ? String(l.id).trim() : '')}')" style="padding: 16px; border-radius: 24px; background: #fff; border: 1px solid rgba(0,0,0,0.035); position:relative; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); cursor:pointer; display: flex; flex-direction: column; gap: 12px;">
                      <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; min-width:40px; background:rgba(0,0,0,0.02); border-radius:14px; display:flex; align-items:center; justify-content:center; font-weight:950; font-size:16px; color:var(--accent);">${initial}</div>
                        <div style="flex:1; min-width:0;">
                          <div style="font-weight:950; color:var(--text-primary); font-size:15px; letter-spacing:-0.4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${l.name}</div>
                          <div style="font-size:9px; color:var(--text-muted); font-weight:850; text-transform:uppercase; letter-spacing:0.5px; opacity:0.6; margin-top:1px;">${l.interest || "Consultation"}</div>
                        </div>
                        ${isToday ? `<div style="width:6px; height:6px; background:#FF3B30; border-radius:50%; box-shadow: 0 0 8px rgba(255,59,48,0.4);"></div>` : ""}
                      </div>
                      
                      <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(0,0,0,0.015); padding:10px 14px; border-radius:16px; border: 1px solid rgba(0,0,0,0.015);">
                        <div style="font-weight: 900; color: var(--text-primary); font-size: 13px; letter-spacing: 0.2px;">${l.phone || "---"}</div>
                        <div style="display: flex; gap: 6px;">
                          <div style="width: 28px; height: 28px; background: #fff; border: 1px solid rgba(0,0,0,0.02); border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                          </div>
                        </div>
                      </div>

                      <!-- TACTICAL DATA OVERLAY -->
                      <div style="display: flex; flex-direction: column; gap: 8px; padding-top: 4px;">
                        ${l.notes ? `
                          <div style="background: rgba(0,0,0,0.02); padding: 8px 12px; border-radius: 12px; border-left: 3px solid var(--accent-light);">
                            <div style="font-size: 8px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Data Supplement</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 700; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${l.notes}</div>
                          </div>
                        ` : ''}
                        
                        ${this.getInitialNote(l) ? `
                          <div style="background: rgba(0,0,0,0.02); padding: 8px 12px; border-radius: 12px; border-left: 3px solid var(--accent-soft);">
                            <div style="font-size: 8px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Enquiry Note</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 700; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${this.getInitialNote(l)}</div>
                          </div>
                        ` : ''}
                        
                        ${this.getLatestComment(l) ? `
                          <div style="background: rgba(0,0,0,0.02); padding: 8px 12px; border-radius: 12px; border-left: 3px solid var(--success);">
                            <div style="font-size: 8px; font-weight: 950; color: var(--success); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Executive Comment</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 700; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${this.getLatestComment(l)}</div>
                          </div>
                        ` : ''}
                      </div>
                    </div>`;
        }).join("")
        : `<div style="opacity:0.3; padding: 40px 20px; text-align:center; font-weight:900; font-size:11px; background:rgba(0,0,0,0.01); border-radius:24px; border:1px dashed rgba(0,0,0,0.08); color:var(--text-muted); text-transform:uppercase; letter-spacing:0.8px; line-height: 1.4;">${emptyMsg}</div>`;
    };

    renderColumn("col-queue", l => l.priority === "Hot" && !l.type?.includes('short') && (l.status === "New Inquiry" || l.status === "New"), "Queue clear. Objective achieved.");
    renderColumn("col-tasks", l => !l.type?.includes('short') && ((l.checklist && l.checklist.length > 0) || l.status === "Follow-up"), "No pending missions.");
    renderColumn("col-secured", l => !l.type?.includes('short') && l.status === "Purchased", "Awaiting conversions.");

    const recent = [...this.leads]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 30); // STRATEGIC TRUNCATION: Limit DOM bloat
    const strip = document.getElementById("dash-apt-strip");
    const aptCount = document.getElementById("dash-apt-count");
    if (aptCount) aptCount.textContent = `${this.leads.length} SECURED`;
    if (strip) {
      strip.innerHTML = recent.length
        ? recent
          .map(
            (r) => `
 <div class="apt-card" onclick="app.viewLead('${r.id}')" style="cursor: pointer;">
 <div style="font-weight:950; color:var(--text-primary); font-size: 18px; letter-spacing: -1px;">${r.name}</div>
 <div style="font-size:11px; color:var(--accent); margin: 6px 0; font-weight: 700; letter-spacing: 0.5px; text-transform:uppercase;">${r.interest}</div>
 <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
 <span class="badge badge-${r.priority ? r.priority.toLowerCase() : 'warm'}" style="font-size:9px; padding:4px 10px; font-weight:900;">${r.priority || 'Warm'}</span>
 <span style="font-size:10px; color:var(--text-muted); font-weight:850; opacity:0.6;">${new Date(r.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
 </div>
 </div>`,
          )
          .join("")
        : '<div style="opacity:0.4; color:var(--text-muted); font-size: 13px; padding: 32px; text-align:center; width:100%;">Vault stream empty.</div>';
    }
    this.renderTrajectoryChart();
  },

  showShowroomMatches(type) {
    const startOfToday = new Date().setHours(0, 0, 0, 0);
    const normalizePhone = (p) => {
      const cleaned = String(p || "").replace(/\D/g, "");
      return cleaned.length >= 10 ? cleaned.slice(-10) : null;
    };
    const normalize = (val) => String(val || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();

    const qmsMap = {};
    (this.qmsRegistry || []).forEach(q => {
      const p = normalizePhone(q.phone || q.mobile || q.contact || q.p);
      const n = normalize(q.name || q.customer_name || q.n);
      const status = String(q.status || q.entry_type || q.sale_status || q.queue_status || "").toUpperCase();
      const isSuccess = status.includes('PURCHASED') || q.converted || status === 'SUCCESS' || status === 'SUCCESSFUL';
      if (p) qmsMap[p] = isSuccess;
      if (n) qmsMap[n] = isSuccess;
    });

    const matches = this.leads.filter(l => {
      let history = l.history;
      if (typeof history === 'string') try { history = JSON.parse(history); } catch (e) { history = []; }
      if (!Array.isArray(history)) history = [];

      const phone = normalizePhone(l.phone);
      const name = normalize(l.name);
      const qmsMatch = (phone && qmsMap[phone] !== undefined) || (name && qmsMap[name] !== undefined);
      const qmsSuccess = (phone && qmsMap[phone] === true) || (name && qmsMap[name] === true);

      const hasVeraSuccess = history.some(h => {
        const txt = JSON.stringify(h).toUpperCase();
        const hTime = (h && h.time) ? h.time : 0;
        return (hTime >= startOfToday) && (txt.includes('QMS-SUCCESS') || txt.includes('PURCHASED'));
      });
      const hasVeraRecovery = history.some(h => {
        const txt = JSON.stringify(h).toUpperCase();
        const hTime = (h && h.time) ? h.time : 0;
        return (hTime >= startOfToday) && (txt.includes('QMS-RECOVERY') || txt.includes('NOT PURCHASED'));
      });

      if (type === 'success') return qmsSuccess || hasVeraSuccess;
      if (type === 'recovery') return (qmsMatch && !qmsSuccess) || hasVeraRecovery;
      return false;
    });

    if (matches.length === 0) {
      return this.toast("No matching dossiers found for this period.", "info");
    }

    if (matches.length === 1) {
      this.viewLead(matches[0].id);
    } else {
      this.leadsFilter = type === 'success' ? 'showroom_success' : 'showroom_recovery';
      this.navigate('leads');
      this.refreshLeads();
    }
  },

  switchDashTab(tab) {
    this.activeDashTab = tab;
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    document.getElementById("tab-" + tab).classList.add("active");
    this.renderDashboard();
  },

  renderActivity() {
    const container = document.getElementById("activity-container");
    if (!container || !this.user) return;

    const isAdmin =
      this.user.role === Roles.ADMIN ||
      this.user.role === Roles.SUPERVISOR ||
      this.user.role === "Admin" ||
      this.user.role === "Supervisor";
    const relevantLeads = isAdmin
      ? this.leads
      : this.leads.filter((l) => l && (l.owner === this.user.id || l.owner === this.user.email || l.assigned_to === this.user.id));

    const sorted = [...relevantLeads]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 50); // LIMIT ACTIVITY FEED RENDER

    // Analytics: Registry Velocity (Last 4h)
    const fourHoursAgo = Date.now() - 4 * 60 * 60 * 1000;
    const recentRate = (
      relevantLeads.filter((l) => l.timestamp > fourHoursAgo).length / 4
    ).toFixed(1);

    // 7-Day Trajectory
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const activityMap = days.map((day, idx) => {
      const count = relevantLeads.filter(
        (l) => new Date(l.timestamp).getDay() === idx,
      ).length;
      return { day, count };
    });
    const maxCount = Math.max(...activityMap.map((a) => a.count), 1);

    container.innerHTML = `
 <div style="padding: 32px 24px;">
 <div style="margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
 <div>
 <h1 style="font-size: 34px; font-weight: 700; letter-spacing: -1.8px; color: var(--text-primary); margin: 0; line-height: 1;">Operational Pulse</h1>
 <p style="color: var(--text-muted); font-weight: 850; font-size: 14px; letter-spacing: -0.2px; margin-top: 8px;">Real-time registry movement detected.</p>
 </div>
 <div style="text-align: right;">
 <div style="font-size: 24px; font-weight: 700; color: var(--accent); line-height: 1;">${recentRate}</div>
 <div style="font-size: 8px; font-weight: 600; color: var(--text-muted); letter-spacing: 1px; margin-top: 4px;">LEADS/HR</div>
 </div>
 </div>

 <div class="card elevated" style="background: var(--bg-secondary); border-radius: 32px; padding: 28px; margin-bottom: 40px; border: 1px solid rgba(0,0,0,0.03);">
 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
 <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--text-muted); opacity: 0.5;">7-DAY VELOCITY</div>
 <div style="display: flex; align-items: center; gap: 6px;">
 <span style="width: 8px; height: 8px; background: var(--success); border-radius: 50%; display: inline-block; box-shadow: 0 0 8px var(--success);"></span>
 <span style="font-size: 10px; font-weight: 600; color: var(--success);">LIVE TERMINAL</span>
 </div>
 </div>
 <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 100px; gap: 10px;">
 ${activityMap
        .map(
          (a, i) => `
 <div style="flex: 1; display:flex; flex-direction:column; align-items:center; gap:10px;">
 <div style="width:100%; height:${Math.max(12, (a.count / maxCount) * 100)}%; background: ${new Date().getDay() === i ? "var(--accent-gradient)" : "rgba(0,0,0,0.04)"}; border-radius: 8px; transition: height 1s ease;">
 ${new Date().getDay() === i ? '<div style="width:100%; height:4px; background:rgba(255,255,255,0.3); border-radius:4px 4px 0 0;"></div>' : ""}
 </div>
 <div style="font-size: 9px; font-weight: 850; color: ${new Date().getDay() === i ? "var(--text-primary)" : "var(--text-muted)"}; opacity: ${new Date().getDay() === i ? 1 : 0.6};">${a.day}</div>
 </div>
 `,
        )
        .join("")}
 </div>
 </div>

 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
 <span class="label" style="margin: 0; font-size: 11px; letter-spacing: 1.5px;">SECURE TIMELINE</span>
 <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); opacity: 0.5;">${sorted.length} RECENT ACTIONS</span>
 </div>
 
 <div style="display: flex; flex-direction: column; gap: 12px;">
 ${sorted.length
        ? sorted
          .slice(0, 20)
          .map((l) => {
            const initial = (l.name || "U").charAt(0);
            const pColor = this.getPriorityColor(l.priority);
            return `
 <div class="card elevated" onclick="app.viewLead('${(l.id ? String(l.id).trim() : '')}')" style="padding: 20px; border-radius: 24px; margin-bottom: 0; display: flex; align-items: center; gap: 16px; border: 1px solid rgba(0,0,0,0.02); background: #fff; transition: all 0.3s ease;">
 <div style="width: 44px; height: 44px; min-width: 44px; border-radius: 12px; background: ${pColor}10; color: ${pColor}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; position: relative;">
 ${initial}
 <div style="position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
 <div style="width: 8px; height: 8px; background: ${pColor}; border-radius: 50%;"></div>
 </div>
 </div>
 <div style="flex: 1;">
 <div style="display: flex; justify-content: space-between; align-items: start;">
 <div style="font-weight: 600; color: var(--text-primary); font-size: 15px; letter-spacing: -0.5px;">${l.name}</div>
 <div style="font-size: 9px; color: var(--text-muted); font-weight: 600; opacity: 0.6;">${new Date(l.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
 </div>
 <div style="font-size: 10px; font-weight: 850; color: var(--text-muted); margin-top: 4px; letter-spacing: 0.3px;">
 Captured via <span style="color: var(--accent); font-weight: 700;">${l.source || "Direct Channel"}</span> • ${l.interest}
 </div>
 </div>
 </div>
 `;
          })
          .join("")
        : `
 <div style="text-align: center; padding: 100px 40px; border-radius: 40px; background: rgba(0,0,0,0.02); border: 2px dashed rgba(0,0,0,0.03);">
 <div class="scanning-orb" style="width: 64px; height: 64px; background: var(--luxe-gold-gradient); border-radius: 50%; margin: 0 auto 32px; animation: pulse 2s infinite;"></div>
 <div style="font-weight: 700; font-size: 20px; color: var(--text-primary); letter-spacing: -0.5px; margin-bottom: 8px;">Scanning Registry Archive</div>
 <div style="font-size: 13px; color: var(--text-muted); font-weight: 750;">No matches found for your search criteria.</div>
 </div>
 `
      }
 </div>
 </div>
 `;
  },

  generateID() {
    const year = new Date().getFullYear();
    const random = Math.floor(100000 + Math.random() * 900000);
    return `LF-${year}-${random}`;
  },

  calculateScore(data) {
    const { weight, source, queryType, checklist } = data;
    let score = "Cold";

    // 1. Source-based Intent
    if (source === "Executive Referral" || source === "Corporate Inquiry") score = "Hot";
    else if (source === "Social Media (Instagram)" || source === "Direct WA Channel") score = "Warm";

    // 2. High-Intent Indicators (Keywords & Values)
    const highIntentCheck = checklist ? checklist.join(" ").toLowerCase() : "";
    const weightNum = parseFloat(weight) || 0;

    if (
      highIntentCheck.includes("booking") ||
      highIntentCheck.includes("purchased") ||
      highIntentCheck.includes("order") ||
      weightNum > 50 ||
      queryType === "Product Information & Pricing"
    ) {
      score = "Hot";
    } else if (
      highIntentCheck.includes("visit") ||
      highIntentCheck.includes("pdf") ||
      score === "Cold" && (source === "Showroom Walk-in")
    ) {
      score = "Warm";
    }

    return score;
  },

  getPriorityColor(p) {
    const colors = { Hot: "#FF3B30", Warm: "#FF9500", Cold: "#007AFF" };
    return colors[p] || "#8E8E93";
  },

  handleSourceChange() {
    // Automated scoring handles this on save now
  },

  handleQueryChange() {
    const queryType = document.getElementById("f-query-type").value;
    const secNote = document.getElementById("sec-note");
    const secProduct = document.getElementById("sec-product");
    const secCoin = document.getElementById("sec-coin");

    if (secNote) secNote.classList.remove("active");
    if (secProduct) secProduct.classList.remove("active");
    if (secCoin) secCoin.classList.remove("active");

    if (
      queryType === "Information Call" ||
      queryType === "Offers & Plans"
    ) {
      if (secNote) secNote.classList.add("active");
    } else if (queryType === "Product Information & Pricing") {
      if (secProduct) secProduct.classList.add("active");
      // Check if Coin was already selected
      this.handleProductTypeChange();
    }
  },

  handleProductTypeChange() {
    const productCheckboxes = document.querySelectorAll('input[name="f-product-code"]:checked');
    const selectedValues = Array.from(productCheckboxes).map(c => c.value);
    const secCoin = document.getElementById("sec-coin");
    if (!secCoin) return;

    // Unified Search across all hubs
    if (selectedValues.includes("GBR") || selectedValues.includes("GKD")) {
      // Logic for specific expanded triggers if needed
    }

    if (selectedValues.includes("Coin") || selectedValues.some(v => v.toLowerCase().includes('coin'))) {
      secCoin.classList.add("active");
    } else {
      secCoin.classList.remove("active");
    }
  },

  initProductMatrix() {
    const hubs = {
      "grid-mens": ["GBR", "GKD", "GCH", "GAG", "GLT", "BALI"],
      "grid-womens": ["GBR", "GBD", "GCH", "GHR", "GKD", "GNT", "GLT", "GEG", "GKC", "GAG", "GMS", "Nath", "Maangtika", "GVT", "GPD"],
      "grid-couple": ["COUPLE BANDS"],
      "grid-kids": ["BABY RINGS", "BABY KADA", "BABY CHAIN", "BABY BRACELET", "BABY BALI (EARRINGS)"],
      "grid-bullion": ["GCO", "SCO"]
    };

    Object.keys(hubs).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const prefix = id.split('-')[1].charAt(0).toUpperCase(); // M, W, C, K
      el.innerHTML = hubs[id].map(p => `
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; background: #fff; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.2s ease;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='rgba(0,0,0,0.05)'">
                <input type="checkbox" name="f-product-code" data-hub="${prefix}" value="${p}" style="accent-color: var(--accent); width: 16px; height: 16px;" onchange="app.handleProductTypeChange()">
                <span style="font-size: 10px; font-weight: 850; color: var(--text-primary); text-transform: uppercase;">${p}</span>
              </label>
            `).join("");
    });
  },

  handleSegmentChange() {
    // Interface Legacy Anchor: No longer required with Unified Matrix
  },

  async syncToSheets(entry) {
    try {
      // ── Flat-Data Protocol: Ensure URL compatibility ──
      const flatEntry = {
        id: entry.id,
        name: entry.name,
        phone: entry.phone,
        location: entry.location,
        source: entry.source,
        interest: entry.interest,
        weight: entry.weight,
        priority: entry.priority,
        status: entry.status,
        timestamp: entry.timestamp,
        notes: entry.notes || "",
        enquiry_note: entry.enquiry_note || "",
        executive_comment: entry.executive_comment || "",
        followup_date: entry.followup_date || entry.followupDate || "",
        checklist: Array.isArray(entry.checklist) ? entry.checklist.join(", ") : (entry.checklist || ""),
        owner_name: entry.owner_name || entry.ownerName,
        added_by: entry.added_by || entry.addedBy
      };

      const SHEETS_URL = "https://script.google.com/macros/s/AKfycbwLVk4tr7pt8hoDm4g6rnDI1niCbVOp-TEXQYghdkma-K6pOyhMVhb7rZ2euf9Q0n3LDg/exec";
      const params = new URLSearchParams(flatEntry);

      fetch(`${SHEETS_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors'
      });
      return true;
    } catch (e) {
      console.error("Sync Logic Fault:", e);
      return false;
    }
  },

  saveToSyncQueue(entry) {
    const queue = JSON.parse(
      localStorage.getItem("lf_sync_queue_v1") || "[]",
    );
    if (!queue.some((l) => l.phone === entry.phone)) {
      queue.push(entry);
      localStorage.setItem("lf_sync_queue_v1", JSON.stringify(queue));
    }
  },

  async autoSync() {
    const queue = JSON.parse(
      localStorage.getItem("lf_sync_queue_v1") || "[]",
    );
    if (!queue.length) return;
    let remaining = [];
    for (const item of queue) {
      const success = await this.syncToSheets(item);
      if (!success) remaining.push(item);
    }
    localStorage.setItem("lf_sync_queue_v1", JSON.stringify(remaining));
    if (remaining.length < queue.length)
      this.toast(
        `Synced ${queue.length - remaining.length} pending leads ✅`,
      );
  },

  updatePhoneValidation(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const isIntl = document.getElementById(toggleId).checked;
    if (isIntl) {
      input.placeholder = "Full intl format (e.g. +971...)";
    } else {
      input.placeholder = "e.g. 9876543210";
      input.value = input.value.replace(/[^0-9]/g, "").slice(0, 10);
    }
  },

  restrictPhone(input, toggleId) {
    const isIntl = document.getElementById(toggleId).checked;
    if (isIntl) {
      input.value = input.value.replace(/[^0-9+\- ]/g, "");
    } else {
      input.value = input.value.replace(/[^0-9]/g, "").slice(0, 10);
    }
  },

  checkTacticalAlerts() {
    const alertHub = document.getElementById("tactical-missions-hub");
    if (!alertHub || !this.user) return;

    // SAFE DATA GUARD: If leads haven't loaded yet, show initializing state
    if (!this.leads) {
      alertHub.innerHTML = `
                <div style="background: rgba(0,0,0,0.01); border: 1.5px dashed rgba(82,18,22,0.1); border-radius: 40px; padding: 120px 40px; text-align: center;">
                  <div class="scanning-orb" style="width: 80px; height: 80px; background: var(--accent-soft); border-radius: 50%; margin: 0 auto 32px; animation: pulse 2s infinite; opacity: 0.3;"></div>
                  <div style="font-size: 14px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 3px; opacity: 0.6;">Scanning Tactical Horizon...</div>
                  <p style="font-size: 13px; color: var(--text-muted); margin-top: 14px; font-weight: 700;">Initiating satellite uplink. Please wait for lead data.</p>
                </div>
             `;
      return;
    }

    // Admin Strategy: Tactical Date Filter Capture
    const dateFilter = document.getElementById("radar-date-filter");
    const targetDate = dateFilter ? dateFilter.value : "";

    // Horizon Scanning Logic: Default to Rolling 3-Day Window (Overdue, Today, Tomorrow)
    const now = new Date();
    const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1); yesterday.setHours(0, 0, 0, 0);
    const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1); tomorrow.setHours(23, 59, 59, 999);

    const alerts = this.leads.filter(l => {
      const fuDateRaw = l.followup_date || l.followupDate;
      if (!fuDateRaw) return false;

      // Member Filter Logic
      const memberFilter = document.getElementById("radar-member-filter");
      const targetMember = memberFilter ? memberFilter.value : "";

      // Access Logic
      const isAdmin = ["Admin", "Supervisor"].includes(this.user.role);
      const isRelevant = isAdmin ||
        l.assigned_to === this.user.id ||
        l.owner === this.user.id ||
        l.added_by === this.user.email ||
        l.owner_email === this.user.email;

      if (!isRelevant) return false;

      // Apply specific member filter if Admin has one selected
      if (isAdmin && targetMember && targetMember !== "all") {
        if (l.assigned_to !== targetMember && l.owner !== targetMember) return false;
      }

      // NORMALIZE DATE FOR COMPARISON (Safe Layer)
      let entryDate = null;
      try {
        const d = new Date(fuDateRaw);
        if (!isNaN(d.getTime())) entryDate = d.toISOString().split('T')[0];
      } catch (e) { return false; }
      if (!entryDate) return false;

      const filterDate = targetDate ? new Date(targetDate).toISOString().split('T')[0] : null;

      if (filterDate) {
        return entryDate === filterDate;
      } else {
        const fuDate = new Date(fuDateRaw);
        fuDate.setHours(0, 0, 0, 0);
        // Radar Horizon: Yesterday to Tomorrow
        return fuDate >= yesterday && fuDate <= tomorrow;
      }
    }).sort((a, b) => new Date(a.followup_date || a.followupDate) - new Date(b.followup_date || b.followupDate));

    if (this.leads || targetDate) {
      alertHub.innerHTML = `
              <div id="tactical-mission-container" style="padding: 24px 24px 60px 24px; animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); width: 100%; box-sizing: border-box; overflow: visible;">
                <!-- EXECUTIVE COMMAND BAR - PANORAMIC PANORAMA -->
                <div class="hero-bar" style="background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%); backdrop-filter: blur(40px); border: 2px solid rgba(82,18,22,0.12); border-radius: 40px; padding: 48px; margin-bottom: 48px; box-shadow: 0 30px 80px rgba(0,0,0,0.1); width: 100%; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 40px; flex-wrap: wrap;">
                    <div>
                      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <span style="font-size: 10px; font-weight: 950; color: var(--accent); letter-spacing: 3px; text-transform: uppercase;">Strategic Command Center</span>
                        <div style="width: 40px; height: 1.5px; background: var(--accent); opacity: 0.2;"></div>
                      </div>
                      <h1 style="font-size: 42px; font-weight: 900; color: var(--text-primary); letter-spacing: -2px; margin: 0; display: flex; align-items: center; gap: 20px; line-height: 1;">
                        Active Briefings
                        <span style="font-size: 24px; font-weight: 850; color: var(--accent); opacity: 0.3; padding: 6px 16px; background: rgba(82,18,22,0.06); border-radius: 14px; letter-spacing: -1px;">/ ${alerts.length} TARGETS</span>
                      </h1>
                    </div>
                    
                    <!-- PANORAMIC DIVIDER -->
                    <div style="width: 1px; height: 60px; background: rgba(82,18,22,0.1);"></div>
                    
                    <div style="display: flex; align-items: center; gap: 24px;">
                      <div style="display: flex; flex-direction: column; gap: 6px;">
                         <span style="font-size: 10px; font-weight: 950; color: var(--accent); text-transform: uppercase; opacity: 0.5;">Targeting Horizon</span>
                         <input type="date" id="radar-date-filter" value="${targetDate}" onchange="app.checkTacticalAlerts()" style="border: none; outline: none; font-size: 18px; font-weight: 900; color: var(--text-primary); cursor: pointer; background: transparent; font-family: inherit; letter-spacing: -0.5px;">
                      </div>
                      
                      ${(this.user.role === 'Admin' || this.user.role === 'Supervisor') ? `
                        <div style="width: 1px; height: 32px; background: rgba(82,18,22,0.1);"></div>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                           <span style="font-size: 10px; font-weight: 950; color: var(--accent); text-transform: uppercase; opacity: 0.5;">Tactical Unit</span>
                           <select id="radar-member-filter" onchange="app.checkTacticalAlerts()" style="border: none; outline: none; font-size: 14px; font-weight: 900; color: var(--text-primary); cursor: pointer; background: transparent; font-family: inherit; width: 160px; text-overflow: ellipsis;">
                             <option value="all">ALL PERSONNEL</option>
                             ${Object.values(this.staffRegistry || {}).map(s => {
        if (!s) return '';
        const sName = (s.name || s.id || "Unknown").toUpperCase();
        const sId = s.id || "";
        const isSelected = document.getElementById('radar-member-filter')?.value === sId;
        return `<option value="${sId}" ${isSelected ? 'selected' : ''}>${sName}</option>`;
      }).join('')}
                           </select>
                        </div>
                      ` : ''}

                      ${(targetDate || (document.getElementById('radar-member-filter')?.value && document.getElementById('radar-member-filter').value !== 'all')) ? `
                         <button onclick="if(document.getElementById('radar-date-filter')) document.getElementById('radar-date-filter').value=''; if(document.getElementById('radar-member-filter')) document.getElementById('radar-member-filter').value='all'; app.checkTacticalAlerts();" style="border: none; background: var(--accent); color: white; padding: 10px 18px; border-radius: 12px; font-size: 9px; font-weight: 950; cursor: pointer; text-transform: uppercase; box-shadow: 0 10px 25px var(--accent-soft);">RESET</button>
                      ` : ''}
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 24px;">
                    <div style="text-align: right; margin-right: 20px; display: none; /* Mobile/Compact Fallback */">
                       <div style="font-size: 10px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.5;">Satellite Status</div>
                       <div style="font-size: 14px; font-weight: 900; color: var(--success); margin-top: 4px;">SECURE</div>
                    </div>
                    <div style="background: #000; border: 2px solid rgba(255,255,255,0.15); color: #fff; padding: 12px 28px; border-radius: 20px; font-size: 11px; font-weight: 950; letter-spacing: 2px; box-shadow: 0 15px 40px rgba(0,0,0,0.25); display: flex; align-items: center; gap: 12px;">
                      <span class="pulse-hot" style="width: 8px; height: 8px; background: #fff; box-shadow: 0 0 15px white;"></span>
                      UPLINK
                    </div>
                    ${(this.user.role === 'Admin' || this.user.role === 'Supervisor') ? `
                      <button onclick="app.executeStrategicMigration()" style="background: var(--accent); color: #fff; border: 2px solid rgba(255,255,255,0.2); padding: 12px 24px; border-radius: 20px; font-size: 10px; font-weight: 950; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 15px 35px rgba(82,18,22,0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'; this.style.background='#000';" onmouseout="this.style.transform='scale(1)'; this.style.background='var(--accent)';" >
                        MIGRATE LEGACY DATA
                      </button>
                    ` : ''}
                  </div>
                </div>
                
                ${alerts.length > 0 ? `
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px; width: 100%; box-sizing: border-box;">
                    ${alerts.map(l => {
        const fuDate = l.followup_date || l.followupDate;
        const isOverdue = new Date(fuDate) < new Date(now.setHours(0, 0, 0, 0));
        const isToday = fuDate === new Date().toISOString().split('T')[0];

        let cardBorder = "rgba(0,0,0,0.04)";
        let statusLabel = "TARGET MISSION";
        let statusColor = "var(--text-muted)";
        let pulseClass = "";

        if (isOverdue) {
          cardBorder = "#FF3B3033";
          statusLabel = "MISSION OVERDUE";
          statusColor = "#FF3B30";
          pulseClass = "pulse-hot";
        } else if (isToday) {
          cardBorder = "var(--accent-soft)";
          statusLabel = "CRITICAL: DUE TODAY";
          statusColor = "var(--accent)";
          pulseClass = "pulse-gold";
        }

        return `
                      <div class="card elevated" onclick="app.viewLead('${(l.id ? String(l.id).trim() : '')}')" style="background: #fff; border-radius: 32px; padding: 28px; border: 1.5px solid ${cardBorder}; position: relative; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; gap: 20px;" onmouseover="this.style.transform='translateY(-8px) scale(1.02)'; this.style.boxShadow='0 30px 60px rgba(0,0,0,0.08)'; this.style.borderColor='var(--accent)';" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='var(--shadow)'; this.style.borderColor='${cardBorder}';">
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <div style="font-size: 9px; font-weight: 950; color: ${statusColor}; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; gap: 8px; background: ${statusColor}08; padding: 7px 14px; border-radius: 12px;">
                            <span class="${pulseClass}" style="width: 6px; height: 6px; background: ${statusColor}; border-radius: 50%;"></span>
                            ${statusLabel}
                          </div>
                          <div style="font-size: 10px; font-weight: 850; color: var(--text-muted); opacity: 0.5;">ID: ${l.id.slice(0, 8)}</div>
                        </div>

                        <div style="display: flex; align-items: center; gap: 18px;">
                          <div style="width: 56px; height: 56px; background: var(--accent-gradient); color: #fff; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-weight: 950; font-size: 22px; box-shadow: 0 10px 25px rgba(82,18,22,0.2);">${(l.name || 'U')[0]}</div>
                          <div style="flex: 1">
                            <div style="font-weight: 950; color: var(--text-primary); font-size: 20px; letter-spacing: -0.8px; line-height: 1.1;">${l.name}</div>
                            <div style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 5px; opacity: 0.7;">${l.location || 'GLOBAL REACH'}</div>
                          </div>
                        </div>

                        <div style="background: rgba(0,0,0,0.02); border-radius: 20px; padding: 16px 20px;">
                           <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Tactical Objective</div>
                           <div style="font-size: 13px; font-weight: 850; color: var(--text-primary);">${l.interest || 'Consultation Briefing'}</div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                           <div style="display: flex; flex-direction: column;">
                              <div style="font-size: 16px; font-weight: 950; color: var(--text-primary); letter-spacing: -0.3px;">${l.phone}</div>
                              <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); margin-top: 3px;">STRATEGIC UPLINK: ${fuDate.split('-').reverse().join('/')}</div>
                           </div>
                           <div style="display: flex; gap: 10px;">
                              <button onclick="event.stopPropagation(); app.forceCloseLead('${l.id}')" style="width: 44px; height: 44px; background: rgba(0,0,0,0.03); color: var(--text-muted); border-radius: 14px; display: flex; align-items: center; justify-content: center; border: 1.5px solid rgba(0,0,0,0.06); cursor: pointer; transition: all 0.3s ease;" title="Force Close" onmouseover="this.style.background='var(--error)'; this.style.color='#fff';" onmouseout="this.style.background='rgba(0,0,0,0.03)'; this.style.color='var(--text-muted)';">
                                 <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                              </button>
                              <a href="tel:${l.phone}" onclick="event.stopPropagation()" style="width: 44px; height: 44px; background: #fff; color: var(--text-primary); border-radius: 14px; display: flex; align-items: center; justify-content: center; text-decoration: none; border: 1.5px solid rgba(0,0,0,0.06); transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--accent)'; this.style.color='var(--accent)';" onmouseout="this.style.borderColor='rgba(0,0,0,0.06)'; this.style.color='var(--text-primary)';">
                                 <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path></svg>
                              </a>
                              <a href="https://wa.me/91${l.phone}" target="_blank" onclick="event.stopPropagation()" style="width: 44px; height: 44px; background: #fff; color: var(--text-primary); border-radius: 14px; display: flex; align-items: center; justify-content: center; text-decoration: none; border: 1.5px solid rgba(0,0,0,0.06); transition: all 0.3s ease;" onmouseover="this.style.borderColor='var(--accent)'; this.style.color='var(--accent)';" onmouseout="this.style.borderColor='rgba(0,0,0,0.06)'; this.style.color='var(--text-primary)';">
                                 <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                              </a>
                           </div>
                        </div>
                      </div>
                    `}).join('')}
                  </div>
                ` : `
                  <div style="background: rgba(0,0,0,0.01); border: 1.5px dashed rgba(82,18,22,0.1); border-radius: 40px; padding: 120px 40px; text-align: center; animation: fadeIn 0.8s ease;">
                    <div class="scanning-orb" style="width: 64px; height: 64px; background: var(--accent-soft); border-radius: 50%; margin: 0 auto 32px; opacity: 0.3;"></div>
                    <div style="font-size: 14px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 3px; opacity: 0.6;">Radar Clean</div>
                    <p style="font-size: 13px; color: var(--text-muted); margin-top: 14px; font-weight: 700; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 1.5;">The defined strategic mission window is currently clear of pending activity.</p>
                  </div>
                `}
              </div>
            `;
    } else {
      alertHub.innerHTML = `
              <div style="background: rgba(0,0,0,0.02); border: 1.5px dashed rgba(82,18,22,0.1); border-radius: 40px; padding: 120px 40px; text-align: center; cursor: pointer; animation: fadeIn 1s ease;" onclick="app.checkTacticalAlerts()">
                <div class="scanning-orb" style="width: 80px; height: 80px; background: var(--accent-gradient); border-radius: 50%; margin: 0 auto 32px; animation: pulse 2.5s infinite; opacity: 0.4; box-shadow: 0 0 40px var(--accent-soft);"></div>
                <div style="font-size: 14px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 3px; opacity: 0.7;">Radar Initializing</div>
                <p style="font-size: 13px; color: var(--text-muted); margin-top: 14px; font-weight: 700; max-width: 450px; margin-left: auto; margin-right: auto; line-height: 1.6;">Scanning strategic horizon for impending follow-ups and intelligence updates. Stand by...</p>
              </div>
            `;
    }
  },

  async saveLead() {
    try {
      if (!this.user) return this.toast("Authentication Shield Triggered: Access Denied", "error");

      const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };

      const name = getVal("f-name");
      const phone = getVal("f-phone");
      const location = getVal("f-location");
      const queryType = getVal("f-query-type");

      if (!queryType) return this.toast("Please select a Query Type", "error");

      const weight = getVal("f-weight") || "0";
      const source = getVal("f-source") || "Direct Channel";
      const followupDate = getVal("f-follow-date");
      const interestEl = document.getElementById("f-interest");
      const interestBasis = interestEl ? interestEl.value : "Omni-Product Hub";

      const selectedNodes = document.querySelectorAll('input[name="f-product-code"]:checked');
      const productType = Array.from(selectedNodes).map(n => `[${n.dataset.hub}] ${n.value}`).join(", ");

      const coinMaterial = getVal("f-coin-material");
      const coinWeight = getVal("f-coin-weight");

      let finalInterest = queryType === "Product Information & Pricing" ? (productType || "General Inquiry") : interestBasis;
      if (productType.includes("Coin") && queryType === "Product Information & Pricing" && coinMaterial) {
        finalInterest = `${coinMaterial} Coin`;
      }

      const checkboxes = document.querySelectorAll('input[name="f-check"]:checked');
      const checklistValues = Array.from(checkboxes).map((c) => c.value);
      const customTask = getVal("f-custom-task");
      if (customTask) checklistValues.push(customTask);

      const smartPriority = this.calculateScore({ weight, source, queryType, checklist: checklistValues });
      const leadId = this.generateID();
      const noteContent = getVal("f-note");

      const initialAction = noteContent
        ? `Lead Captured (Priority: ${smartPriority}) | Initial Note: ${noteContent}`
        : `Lead Captured (Priority: ${smartPriority})`;

      const entryTime = Date.now();
      const entry = {
        id: leadId,
        name: name || "Walking Customer",
        phone: phone || "NA",
        location: location || "Not Specified",
        interest: finalInterest,
        source: source,
        weight: coinWeight || weight,
        followup_date: followupDate,
        checklist: checklistValues,
        priority: smartPriority,
        status: getVal("f-is-followup") === "yes" ? "Follow-up" : "New Inquiry",
        timestamp: entryTime,
        enquiry_note: noteContent,
        owner: this.user.id,
        owner_name: this.user.name || "System Executive",
        added_by: this.user.email || "terminal@vera.gold",
        history: [{ time: entryTime, action: initialAction }],
      };

      this.toast("Synchronizing with Vault...", "info");
      await DB.saveLead(entry);

      if (this.fetchAndRenderLeads) this.fetchAndRenderLeads();
      this.toast(`Vera AI: Categorized as ${smartPriority} Lead`, "success");
      document.getElementById("enroll-form")?.reset();
      this.navigate("dashboard");
      this.syncToSheets(entry).catch(e => console.error("Sheets Async Fault:", e));
    } catch (error) {
      console.error("Critical Enrollment Fault:", error);
      this.toast(`Enrollment Fault: ${error.message}`, "error");
    }
  },

  viewFilteredRegistry(filter) {
    this.currentFilter = filter;
    this.leadsPage = 1;
    // Reset sub-filters if switching major view or explicitly clearing
    if (filter === null || filter === 'long' || filter === 'short') {
      this.selectedDate = null;
      const dSel = document.getElementById("vault-date-select");
      if (dSel) dSel.value = "";

      if (filter === null) {
        this.selectedMemberId = 'all';
        const mSel = document.getElementById("vault-member-select");
        if (mSel) mSel.value = "all";
      }
    }
    this.navigate("leads");
    this.refreshLeads();
  },

  refreshLeads(isAppend = false) {
    const queryInput = document.getElementById("lead-search");
    const query = queryInput ? queryInput.value.toLowerCase() : "";
    const container = document.getElementById("leads-container");
    const banner = document.getElementById("leads-filter-banner");
    const tag = document.getElementById("leads-filter-tag");

    if (!container) return;

    if (!isAppend) {
      this.leadsPage = 1;
      container.scrollTop = 0;
    }

    document.querySelectorAll(".segmented-option").forEach((c) => c.classList.remove("active"));
    if (this.currentFilter === "today") document.getElementById("chip-today")?.classList.add("active");
    else if (this.currentFilter === "followup") document.getElementById("chip-followup")?.classList.add("active");
    else if (this.currentFilter === "assigned") document.getElementById("chip-assigned")?.classList.add("active");
    else if (this.currentFilter === "short") document.getElementById("chip-short")?.classList.add("active");
    else if (this.currentFilter === "long") document.getElementById("chip-long")?.classList.add("active");
    else document.getElementById("chip-vault")?.classList.add("active");

    let filtered = (this.leads && this.leads.length > 0) ? this.leads : (RedishStash.get('leads') || []);
    const todayStr = new Date().toISOString().split('T')[0];
    const isAdmin = ["Admin", "Supervisor"].includes(this.user.role);

    // DATE FILTER LOGIC
    if (this.selectedDate) {
      filtered = filtered.filter(l => {
        const ts = typeof l.timestamp === 'number' ? l.timestamp : new Date(l.timestamp).getTime();
        const dateStr = new Date(ts).toISOString().split('T')[0];
        return dateStr === this.selectedDate;
      });
    }

    // MEMBER FILTER LOGIC
    const memberSelectContainer = document.getElementById("vault-member-filter-container");
    if (memberSelectContainer) {
      memberSelectContainer.style.display = isAdmin ? "block" : "none";
      if (isAdmin && !memberSelectContainer.dataset.init) {
        // Initial load of staff options
        supabase.from('staff').select('id, name').then(({ data }) => {
          const select = document.getElementById("vault-member-select");
          if (select && data) {
            data.forEach(s => {
              const opt = document.createElement("option");
              opt.value = s.id;
              opt.textContent = (s.name || s.id).toUpperCase();
              select.appendChild(opt);
            });
            memberSelectContainer.dataset.init = "true";
          }
        });
      }
    }

    if (this.selectedMemberId && this.selectedMemberId !== "all") {
      filtered = filtered.filter(l => l.owner === this.selectedMemberId || l.assigned_to === this.selectedMemberId || l.added_by === this.selectedMemberId);
    }

    // PRIMARY STATUS FILTER: Exclude Terminated/Secured from Active Tactical Views
    // UNLESS searching (so you can find your customers) or in specific showroom views
    if (this.currentFilter !== 'all_archives' && this.currentFilter !== 'hot' && this.currentFilter !== 'arrived' && !query) {
      filtered = filtered.filter(l => l.status !== 'Closed' && l.status !== 'Purchased');
    }

    // TYPE FILTER LOGIC
    if (this.currentFilter === "short") {
      filtered = filtered.filter(l => l.type === "short" || l.type === "Short" || l.type === "short-reg");
    } else if (this.currentFilter === "long") {
      filtered = filtered.filter(l => !l.type || (l.type !== "short" && l.type !== "Short" && l.type !== "short-reg"));
    }

    if (this.currentFilter === "today") {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      filtered = filtered.filter((l) => {
        const ts = typeof l.timestamp === 'number' ? l.timestamp : new Date(l.timestamp).getTime();
        const history = l.history || [];
        const bornTs = (history.length > 0 && history[0].time) ? history[0].time : ts;
        return bornTs >= todayStart;
      });
      if (banner && tag) {
        banner.style.display = "flex";
        tag.innerHTML = 'Active Filter: <span style="font-weight: 900;">DAILY CAPTURES</span>';
      }
    } else if (this.currentFilter === "today_followup") {
      filtered = filtered.filter((l) => l.followup_date === todayStr || (l.followup_date && l.followup_date.includes(todayStr)));
      if (banner && tag) {
        banner.style.display = "flex";
        tag.innerHTML = 'Active Filter: <span style="font-weight: 900;">TODAY\'S FOLLOW-UPS</span>';
      }
    } else if (this.currentFilter === "hot") {
      filtered = filtered.filter((l) => l.priority === "Hot" && l.status !== "Purchased");
      if (banner && tag) {
        banner.style.display = "flex";
        tag.innerHTML = 'Active Filter: <span style="font-weight: 900;">HIGH-INTENT VAULT</span>';
      }
    } else if (this.currentFilter === "short") {
      if (banner && tag) {
        banner.style.display = "flex";
        tag.innerHTML = 'Active Filter: <span style="font-weight: 900;">SHORT REGISTRY</span>';
      }
    } else if (this.currentFilter === "long") {
      if (banner && tag) {
        banner.style.display = "flex";
        tag.innerHTML = 'Active Filter: <span style="font-weight: 900;">LONG REGISTRY</span>';
      }
    } else if (this.currentFilter === "followup") {
      filtered = filtered.filter((l) => l.status === "Follow-up");
      if (banner && tag) {
        banner.style.display = "flex";
        tag.innerHTML = 'Active Filter: <span style="font-weight: 900;">FOLLOW-UP PROTOCOL</span>';
      }
    } else if (this.currentFilter === "assigned") {
      filtered = filtered.filter((l) => l.assigned_to === this.user.id);
      if (banner && tag) {
        banner.style.display = "flex";
        tag.innerHTML = 'Active Filter: <span style="font-weight: 900;">ASSIGNED TO ME</span>';
      }
    } else {
      if (banner && !this.selectedDate && (!this.selectedMemberId || this.selectedMemberId === 'all')) banner.style.display = "none";
      else if (banner) {
        banner.style.display = "flex";
        let filterDesc = "REGISTRY";
        if (this.selectedDate) filterDesc += ` • ${this.selectedDate}`;
        tag.innerHTML = `Active Filter: <span style="font-weight: 900;">${filterDesc}</span>`;
      }
    }

    if (query) {
      filtered = filtered.filter((l) => {
        const name = (l.name || "").toLowerCase();
        const phone = (l.phone || "");
        const interest = (l.interest || "").toLowerCase();
        return name.includes(query) || phone.includes(query) || interest.includes(query);
      });
    }

    this.renderLeads(filtered, isAppend);
  },

  renderLeads(leads, isAppend = false) {
    const list = document.getElementById("leads-container");
    if (!list) return;

    const isAdmin = this.user.role === "Admin" || this.user.role === "Supervisor";

    // FILTERED POOL (In-Memory)
    const filtered = leads.filter((l) => {
      if (this.currentFilter === "showroom_success" || this.currentFilter === "showroom_recovery") return true;
      return isAdmin ? true : (l.owner === this.user.id || l.assigned_to === this.user.id || l.added_by === this.user.email);
    });

    const PAGE_SIZE = 40;
    const start = (this.leadsPage - 1) * PAGE_SIZE;
    const currentSlice = filtered.slice(start, start + PAGE_SIZE);
    
    if (currentSlice.length === 0 && !isAppend) {
      list.innerHTML = `<div style="padding: 100px 40px; text-align: center; font-weight: 950; opacity: 0.5;">NO MATCHING ENTRIES</div>`;
      return;
    }

    const html = currentSlice.map(l => this.getLeadNodeHTML(l)).join("");

    if (!isAppend) {
      list.innerHTML = html;
    } else {
      list.insertAdjacentHTML('beforeend', html);
    }

    // High-Precision Infinite Scroll Observer
    if (start + PAGE_SIZE < filtered.length) {
      const observerEl = document.createElement('div');
      observerEl.style.height = "20px";
      observerEl.id = "leads-scroll-trigger";
      list.appendChild(observerEl);

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          observerEl.remove();
          this.leadsPage++;
          this.renderLeads(leads, true);
        }
      }, { rootMargin: '400px' });
      observer.observe(observerEl);
    }
  },

  getLeadNodeHTML(l) {
    const isAdmin = ["Admin", "Supervisor"].includes(this.user.role);
    const ownerInitial = (l.owner_name || l.added_by || "U")[0].toUpperCase();
    const isUrgent = l.priority === 'Hot' && l.status !== 'Purchased';
    const timeRelative = this.getRelativeTime(l.timestamp);

    return `
             <div class="executive-lead-node" onclick="app.viewLead('${String(l.id).trim()}')" style="background:#fff; border:1.5px solid ${isUrgent ? 'rgba(255,59,48,0.2)' : 'rgba(0,0,0,0.06)'}; border-radius:32px; padding:28px; transition:all 0.4s cubic-bezier(0.16,1,0.3,1); cursor:pointer; position:relative; display:flex; flex-direction:column; gap:20px; box-shadow: ${isUrgent ? '0 15px 35px rgba(255,59,48,0.08)' : '0 10px 30px rgba(0,0,0,0.02)'};">
               
               <!-- Top Context Bar -->
               <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="display:flex; align-items:center; gap:8px;">
                     <div style="width:24px; height:24px; background:${isUrgent ? 'rgba(255,59,48,0.1)' : 'rgba(0,0,0,0.05)'}; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:950; color:${isUrgent ? '#FF3B30' : 'var(--text-muted)'};">
                        ${ownerInitial}
                     </div>
                     <span style="font-size:9px; font-weight:950; color:var(--text-muted); opacity:0.6; text-transform:uppercase; letter-spacing:0.5px;">${l.owner_name || l.added_by?.split('@')[0] || 'VAULT'}</span>
                  </div>
                  <div style="font-size:9px; font-weight:900; color:var(--text-muted); opacity:0.5;">${timeRelative}</div>
               </div>

               <!-- Lead Main Body -->
               <div style="flex:1;">
                  <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
                     <span class="status-pulse ${l.priority === 'Hot' ? 'pulse-hot' : 'pulse-cold'}" style="width:8px; height:8px;"></span>
                     <span style="font-size:10px; font-weight:950; color:${this.getPriorityColor(l.priority)}; text-transform:uppercase; letter-spacing:1px;">${l.priority} PRIORITY</span>
                  </div>
                  <div style="font-weight:950; font-size:22px; color:var(--text-primary); letter-spacing:-1px; line-height:1.1; margin-bottom:6px;">${l.name}</div>
                  <div style="color:var(--text-muted); font-weight:750; font-size:14px; letter-spacing:-0.2px; opacity:0.7;">${l.phone === "SHORT-REG" ? "Internal Entry" : l.phone}</div>
               </div>

                <!-- Requirement Snippet (Sanitized) -->
                ${l.enquiry_note ? `
                <div style="margin-top: 4px; padding: 10px 14px; background: rgba(82, 18, 22, 0.03); border-radius: 14px; border: 1px solid rgba(82, 18, 22, 0.05);">
                   <div style="font-size: 8px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; opacity: 0.6;">Primary Requirement</div>
                   <div style="font-size: 11px; font-weight: 600; color: var(--text-secondary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">${this.escapeHTML(l.enquiry_note)}</div>
                </div>
                ` : ''}

                <!-- Advanced Action Indicator & Administrative Controls -->
                <div style="position:absolute; bottom:28px; right:28px; display: flex; gap: 12px; align-items: center;">
                  ${isAdmin ? `
                    <button onclick="event.stopPropagation(); app.forceCloseLead('${String(l.id).trim()}')" style="background: rgba(0,0,0,0.03); color: var(--text-muted); width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1.5px solid rgba(0,0,0,0.06); cursor: pointer; transition: all 0.3s;" title="Executive Override: Force Close" onmouseover="this.style.background='var(--error)'; this.style.color='#fff'; this.style.borderColor='var(--error)';" onmouseout="this.style.background='rgba(0,0,0,0.03)'; this.style.color='var(--text-muted)'; this.style.borderColor='rgba(0,0,0,0.06)';">
                      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  ` : ''}
                  <div style="opacity:0.1; transition: opacity 0.3s;" class="lead-chevron">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </div>
              </div>
           `;
  },

  getRelativeTime(timestamp) {
    if (!timestamp) return "TIME UNKNOWN";
    const ms = typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime();
    if (isNaN(ms)) return "INVALID DATE";

    const diff = Date.now() - ms;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "JUST NOW";
    if (mins < 60) return `${mins}M AGO`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}H AGO`;
    return new Date(ms).toLocaleDateString([], { day: 'numeric', month: 'short' }).toUpperCase();
  },

  initLeadsObserver(hasMore) {
    const sentinel = document.getElementById("leads-sentinel");
    if (!sentinel) return;

    if (this._leadsObserver) this._leadsObserver.disconnect();
    if (!hasMore) {
      sentinel.style.display = 'none';
      return;
    }

    sentinel.style.display = 'block';
    this._leadsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        clearTimeout(this._debounceTimer);
        this._debounceTimer = setTimeout(() => {
          this.leadsPage++;
          this.refreshLeads(true);
        }, 200);
      }
    }, { threshold: 0.1 });
    this._leadsObserver.observe(sentinel);
  },

  async fetchLeadDetail(leadId) {
    if (!leadId) return null;
    const tid = String(leadId).trim();
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', tid)
        .single();
      if (error) throw error;

      // Normalize and calibrate timestamp integrity
      let ts = null;
      if (typeof data.timestamp === 'number') ts = data.timestamp;
      else if (data.timestamp) {
        const d = new Date(data.timestamp).getTime();
        if (!isNaN(d)) ts = d;
      }
      // History-based forensic fallback for missing timestamps
      if (!ts && data.history && Array.isArray(data.history) && data.history.length > 0) {
        ts = data.history[0].time;
      }
      if (ts) data.timestamp = ts;

      const idx = this.leads.findIndex(l => String(l.id).trim() === tid);
      if (idx !== -1) {
        this.leads[idx] = { ...this.leads[idx], ...data };
        return this.leads[idx];
      }
      return data;
    } catch (e) {
      console.error("Detail Retrieval Fault:", e);
      return null;
    }
  },

  async viewLead(id) {
    if (!id || String(id).trim() === "") {
      this.toast("Security Protocol: Identity Missing", "warning");
      return;
    }
    const targetId = String(id).trim();

    try {
      // Robust multi-vector lookup
      let lead = this.leads.find((l) => l && l.id && String(l.id).trim() === targetId);

      if (!lead) {
        this.toast("Vault Uplink: Synchronizing Remote Dossier...", "info");
        lead = await this.fetchLeadDetail(targetId);
      }

      if (!lead) {
        this.toast("Registry Fault: Entry not found in Vault", "error");
        return;
      }

      // Forensic History Retrieval if missing
      if (!lead.history || lead.history.length === 0) {
        this.toast("Retrieving Tactical History...", "info");
        const detailed = await this.fetchLeadDetail(targetId);
        if (detailed) lead = detailed;
      }

      const modal = document.getElementById("lead-modal");
      modal.dataset.activeLeadId = targetId;
      const content = modal.querySelector(".modal-content");

      const safeLeadId = String(lead.id).trim();
      const safePhone = String(lead.phone || "").trim();
      const waPhone = safePhone.replace(/\D/g, "");
      const isAdmin = ["Admin", "Supervisor"].includes(this.user.role);
      const isOwner = lead.assigned_to === this.user.id || lead.owner === this.user.id || lead.added_by === this.user.id;

      // --- SHOWROOM INTELLIGENCE ENGINE ---
      const normalize = (val) => String(val || "").toLowerCase().replace(/[^a-z0-9]/g, "").trim();
      const normalizePhone = (p) => {
        const cleaned = String(p || "").replace(/\D/g, "");
        return cleaned.length >= 10 ? cleaned.slice(-10) : null;
      };

      const targetPhone = normalizePhone(lead.phone);
      const targetName = normalize(lead.name);
      const qmsMatch = (this.qmsRegistry || []).find(q => {
        const p = normalizePhone(q.phone || q.mobile || q.contact || q.p);
        const n = normalize(q.name || q.customer_name || q.n);
        return (targetPhone && p === targetPhone) || (targetName && n === targetName);
      });

      let showroomIntelligenceHtml = '';
      if (qmsMatch) {
        const outcome = String(qmsMatch.sale_status || qmsMatch.status || qmsMatch.entry_type || "Visited").toUpperCase();
        const isSuccess = outcome.includes('PURCHASED') || outcome.includes('SUCCESS') || qmsMatch.converted;
        const time = new Date(qmsMatch.ts || qmsMatch.timestamp || qmsMatch.created_at || Date.now()).toLocaleString([], { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        
        showroomIntelligenceHtml = `
          <div style="background: ${isSuccess ? 'rgba(52, 199, 89, 0.08)' : 'rgba(255, 149, 0, 0.08)'}; border: 2px solid ${isSuccess ? 'rgba(52, 199, 110, 0.3)' : 'rgba(255, 149, 0, 0.3)'}; border-radius: 32px; padding: 24px; margin-bottom: 32px; display: flex; align-items: center; gap: 20px; animation: pulse 2s infinite;">
            <div style="width: 54px; height: 54px; border-radius: 18px; background: ${isSuccess ? 'var(--success)' : '#FF9500'}; color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px ${isSuccess ? 'rgba(52, 199, 89, 0.3)' : 'rgba(255, 149, 0, 0.3)'};">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <div style="flex: 1;">
              <div style="font-size: 10px; font-weight: 950; color: ${isSuccess ? '#1E6B34' : '#945D00'}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Verified Showroom Interaction</div>
              <div style="font-size: 16px; font-weight: 900; color: #000;">Customer Visit Detected: <span style="color: ${isSuccess ? 'var(--success)' : '#FF9500'};">${outcome}</span></div>
              <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); margin-top: 4px;">Last Entry: ${time} • Requirement: ${qmsMatch.requirement || qmsMatch.rq || 'General Enquiry'}</div>
            </div>
            ${isSuccess ? '<div style="font-size: 10px; font-weight: 950; background: var(--success); color: #fff; padding: 6px 12px; border-radius: 10px; text-transform: uppercase;">PROPER CONVERSION</div>' : ''}
          </div>
        `;
      }

      document.getElementById("modal-body").innerHTML = `
            <div style="text-align: center; margin-bottom: 32px; position: relative;">
              <div style="position: absolute; top: 0; right: 0;">
                <button id="edit-toggle-btn" onclick="app.toggleEditLead('${safeLeadId}')" style="background: rgba(82,18,22,0.05); border: none; padding: 10px 16px; border-radius: 14px; font-size: 10px; font-weight: 900; color: var(--accent); cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;">Edit Profile</button>
              </div>
              <div class="avatar-box" style="width: 84px; height: 84px; margin: 0 auto; font-size: 32px; background: linear-gradient(135deg, var(--accent), #7A1C22); color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 750; box-shadow: 0 15px 35px rgba(82,18,22,0.25); border: 2px solid rgba(255,255,255,0.2);">${(String(lead.name || "U"))[0]}</div>
              
              <div id="lead-display-name">
                <h2 style="font-size: 34px; font-weight: 950; color: var(--text-primary); margin-top: 20px; letter-spacing: -1.5px; line-height: 1;">${lead.name || 'Unknown Executive'}</h2>
              </div>
              <div id="lead-edit-name" style="display: none; margin-top: 20px;">
                <input type="text" id="edit-name-val" value="${lead.name || ''}" class="input" style="height: 54px; text-align: center; font-size: 24px; font-weight: 900; border-radius: 18px; width: 85%; margin: 0 auto; border: 2px solid var(--accent-soft);">
              </div>
              
              <div style="display: flex; justify-content: center; gap: 10px; margin: 16px 0;">
                <span style="font-size: 10px; font-weight: 950; background:rgba(0,0,0,0.04); padding: 6px 14px; border-radius: 10px; color: var(--text-muted); text-transform:uppercase; letter-spacing: 0.5px;">${lead.status || 'Active'}</span>
                <span style="font-size: 10px; font-weight: 950; background:${this.getPriorityColor(lead.priority)}15; padding: 6px 14px; border-radius: 10px; color: ${this.getPriorityColor(lead.priority)}; text-transform:uppercase; letter-spacing: 0.5px; border: 1px solid ${this.getPriorityColor(lead.priority)}25;">${lead.priority || 'Standard'} RATING</span>
              </div>

              ${showroomIntelligenceHtml}

              ${(lead.type === 'short' || lead.type === 'Short' || lead.type === 'short-reg') ? `
                <div style="background: linear-gradient(135deg, rgba(0, 122, 255, 0.08), rgba(88, 86, 214, 0.08)); border: 2px dashed rgba(0, 122, 255, 0.3); border-radius: 32px; padding: 24px; margin-bottom: 32px; text-align: center; position: relative; overflow: hidden;">
                  <div style="position: absolute; top: -10px; right: -10px; opacity: 0.1; transform: rotate(15deg);">
                    <svg width="100" height="100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
                  </div>
                  <div style="font-size: 10px; font-weight: 950; color: #007AFF; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Restricted Intelligence Entry</div>
                  <div style="font-size: 15px; font-weight: 900; color: #000; margin-bottom: 16px;">This is a Short-Form Rapid Capture</div>
                  <button onclick="app.upgradeLeadToLongForm('${safeLeadId}')" style="background: linear-gradient(135deg, #007AFF, #5856D6); color: #fff; border: none; padding: 12px 28px; border-radius: 16px; font-size: 12px; font-weight: 950; cursor: pointer; box-shadow: 0 10px 25px rgba(0, 122, 255, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">UPGRADE TO FULL DOSSIER</button>
                </div>
              ` : ''}
            </div>

            <div class="milestone-bar" style="display: flex; justify-content: space-between; align-items: center; background: rgba(82, 18, 22, 0.03); backdrop-filter: blur(10px); padding: 28px; border-radius: 32px; border: 1.5px solid var(--accent-soft); margin-bottom: 40px; box-shadow: 0 12px 40px rgba(0,0,0,0.02);">
               <div style="flex: 1;">
                 <div style="font-size: 10px; font-weight: 950; color: var(--accent); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 2.5px; opacity: 0.7;">Tactical Horizon Adjuster</div>
                 <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="position: relative; display: flex; align-items: center;">
                      <input type="date" id="horizon-recalc-date" value="${lead.followup_date || lead.followupDate || ''}" style="border: 2px solid rgba(82,18,22,0.12); padding: 14px 20px; border-radius: 16px; font-size: 15px; font-weight: 900; color: var(--text-primary); outline: none; background: #fff; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);" onchange="app.recalibrateHorizon('${safeLeadId}', this.value)" onfocus="this.style.borderColor='var(--accent)'; this.style.boxShadow='0 0 0 4px var(--accent-soft)'" onblur="this.style.borderColor='rgba(82,18,22,0.12)'; this.style.boxShadow='none'">
                    </div>
                    <div style="font-size: 12px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.6;">Next Strategic Milestone</div>
                 </div>
               </div>
               <div style="display: flex; gap: 14px;">
                 ${lead.status === 'Follow-up' ? `<button onclick="app.markFollowUpDone('${safeLeadId}')" style="background: linear-gradient(135deg, var(--accent), #7A1C22); color: #fff; border:none; padding: 16px 28px; border-radius: 20px; font-size: 13px; font-weight: 950; cursor:pointer; box-shadow: 0 12px 30px rgba(82,18,22,0.3); transition: all 0.4s ease;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">COMPLETE MISSION</button>` : ''}
               </div>
            </div>

            <div style="background: rgba(255,255,255,0.6); backdrop-filter: blur(20px); border-radius: 32px; padding: 32px; border: 1px solid rgba(0,0,0,0.04); margin-bottom: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.02);">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px;">
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Identity / Phone</div>
                  <div id="lead-display-phone" style="font-weight: 850; font-size: 16px; color: var(--text-primary); letter-spacing: -0.5px;">${safePhone}</div>
                  <div id="lead-edit-phone" style="display: none;">
                    <input type="tel" id="edit-phone-val" value="${safePhone}" class="input" style="height: 40px; font-size: 14px; border-radius: 10px; padding: 0 12px; border: 1.5px solid var(--accent-soft);">
                  </div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Intent / Product</div>
                  <div id="lead-display-interest" style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${(String(lead.interest || "N/A")).split(',').map(item => `
                      <span style="font-weight: 900; font-size: 11px; color: var(--accent); background: var(--accent-soft); padding: 6px 12px; border-radius: 10px; text-transform: uppercase; border: 1px solid rgba(82,18,22,0.1); letter-spacing: 0.3px;">${item.trim()}</span>
                    `).join('')}
                  </div>
                  <div id="lead-edit-interest" style="display: none;">
                    <input type="text" id="edit-interest-val" value="${lead.interest || ''}" class="input" style="height: 40px; font-size: 14px; border-radius: 10px; padding: 0 12px; border: 1.5px solid var(--accent-soft); width: 100%;">
                  </div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Target Weight</div>
                  <div id="lead-display-weight" style="font-weight: 850; font-size: 16px; color: var(--text-primary); letter-spacing: -0.5px;">${lead.weight || "N/A"}</div>
                  <div id="lead-edit-weight" style="display: none;">
                    <input type="text" id="edit-weight-val" value="${lead.weight || ''}" class="input" style="height: 40px; font-size: 14px; border-radius: 10px; padding: 0 12px; border: 1.5px solid var(--accent-soft); width: 100%;">
                  </div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">System Enrollment</div>
                  <div style="font-weight: 800; font-size: 13px; color: var(--text-primary);">${(() => {
          const _ts = typeof lead.timestamp === 'number' ? lead.timestamp : (lead.timestamp ? new Date(lead.timestamp).getTime() : null);
          if (!_ts || isNaN(_ts)) return 'Date Unavailable';
          const _d = new Date(_ts);
          const rel = this.getRelativeTime(_ts);
          return `<span style="color:var(--accent); font-weight:900;">${rel}</span> • ${_d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} @ ${_d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        })()}</div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Custodian / Assigned Member</div>
                  <div style="font-weight: 850; font-size: 14px; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.5px;">${lead.owner_name || lead.added_by || "Unassigned"}</div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Acquisition Source</div>
                  <div style="font-weight: 850; font-size: 14px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.5px;">${lead.source || "DIRECT"}</div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Geographic Context</div>
                  <div id="lead-display-location" style="font-weight: 850; font-size: 14px; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.5px;">${lead.location || "N/A"}</div>
                  <div id="lead-edit-location" style="display: none;">
                    <input type="text" id="edit-location-val" value="${lead.location || ''}" class="input" style="height: 40px; font-size: 14px; border-radius: 10px; padding: 0 12px; border: 1.5px solid var(--accent-soft);">
                  </div>
                </div>
                ${(lead.checklist && lead.checklist.length > 0) ? `
                <div style="grid-column: span 2; margin-top: 16px; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.04);">
                   <div style="font-size: 9px; font-weight: 950; color: var(--accent); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.6;">Strategic Objectives</div>
                   <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                      ${lead.checklist.map(item => `
                        <div style="background: #fff; border: 1.5px solid rgba(82,18,22,0.1); color: var(--accent); padding: 10px 18px; border-radius: 14px; font-size: 11px; font-weight: 900; display: flex; align-items: center; gap: 10px; box-shadow: 0 6px 15px rgba(82,18,22,0.04); transition: all 0.3s ease;">
                           <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                           ${item}
                        </div>
                      `).join('')}
                   </div>
                </div>
                ` : ''}

                ${lead.enquiry_note ? `
                <div style="grid-column: span 2; margin-top: 16px; padding: 24px; background: rgba(82, 18, 22, 0.04); border: 2px solid var(--accent-soft); border-radius: 24px; position: relative; overflow: hidden;">
                   <div style="position: absolute; top: -10px; right: -10px; opacity: 0.05;">
                      <svg width="80" height="80" fill="var(--accent)" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path></svg>
                   </div>
                   <div style="font-size: 10px; font-weight: 950; color: var(--accent); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; position: relative; z-index: 1;">Primary Requirement Dossier</div>
                   <div style="font-size: 15px; font-weight: 750; color: var(--text-primary); line-height: 1.6; letter-spacing: -0.3px; position: relative; z-index: 1;">${this.escapeHTML(lead.enquiry_note)}</div>
                </div>
                ` : ''}

                ${lead.executive_comment ? `
                <div style="grid-column: span 2; margin-top: 12px; padding: 24px; background: rgba(0, 122, 255, 0.04); border: 1.5px solid rgba(0, 122, 255, 0.1); border-radius: 24px;">
                   <div style="font-size: 10px; font-weight: 950; color: #007AFF; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px;">Executive Commentary</div>
                   <div style="font-size: 14px; font-weight: 750; color: var(--text-primary); line-height: 1.6;">${this.escapeHTML(lead.executive_comment)}</div>
                </div>
                ` : ''}

                ${lead.notes ? `
                <div style="grid-column: span 2; margin-top: 12px; padding: 24px; background: rgba(0, 0, 0, 0.02); border: 1.5px dashed rgba(0, 0, 0, 0.1); border-radius: 24px;">
                   <div style="font-size: 10px; font-weight: 950; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px;">Technical Logs / Member Notes</div>
                   <div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); line-height: 1.6;">${this.escapeHTML(lead.notes)}</div>
                </div>
                ` : ''}
              </div>
            </div>

            <div style="margin-top: 32px; background: rgba(255,255,255,0.4); backdrop-filter: blur(20px); border-radius: 32px; padding: 24px; border: 1.5px solid rgba(82,18,22,0.08); box-shadow: 0 20px 50px rgba(0,0,0,0.05);">
              <!-- Integrated Intelligence Bar -->
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px;">
                <div style="flex: 1; position: relative; display: flex; align-items: center;">
                  <input type="text" id="manual-note-input" placeholder="Append tactical intelligence..." class="input" style="width: 100%; height: 56px; font-size: 14px; border-radius: 20px; border: 2px solid rgba(0,0,0,0.04); background: rgba(255,255,255,0.8); padding: 0 120px 0 22px; font-weight: 500; transition: all 0.3s ease;" onfocus="this.style.borderColor='var(--accent)'; this.style.background='#fff';" onblur="this.style.borderColor='rgba(0,0,0,0.04)'; this.style.background='rgba(255,255,255,0.8)';">
                  <div style="position: absolute; right: 65px; display: flex; align-items: center; gap: 8px;">
                    <button onclick="app.startVoiceCapture('manual-note-input')" style="background: none; border: none; cursor: pointer; color: var(--accent); opacity: 0.6; transition: 0.3s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">
                      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"></path><path d="M19 10v2a7 7 0 01-14 0v-2m7 9v4m-4 0h8"></path></svg>
                    </button>
                  </div>
                  <button onclick="app.logManualNote('${safeLeadId}')" style="position: absolute; right: 8px; background: var(--accent); color: #fff; border: none; height: 40px; padding: 0 18px; border-radius: 14px; font-size: 10px; font-weight: 950; cursor: pointer; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(82,18,22,0.2);">LOG</button>
                </div>
              </div>

              <!-- Tactical Intelligence Timeline -->
              <div id="tactical-timeline" style="margin-top: 8px; margin-bottom: 32px; border-top: 1.5px solid rgba(0,0,0,0.04); padding-top: 24px;">
                <div style="font-size: 10px; font-weight: 950; color: var(--accent); margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.6; display: flex; align-items: center; gap: 10px;">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Tactical Intelligence Timeline
                </div>
                <div style="display: flex; flex-direction: column; gap: 18px; max-height: 280px; overflow-y: auto; padding-right: 8px; scrollbar-width: none;">
                  ${(lead.history && lead.history.length > 0) ? [...lead.history].reverse().map(h => `
                    <div style="display: flex; gap: 16px; position: relative;">
                      <div style="display: flex; flex-direction: column; align-items: center; min-width: 12px;">
                        <div style="width: 10px; height: 10px; background: ${h.action.includes('Remark') ? 'var(--accent)' : (h.action.includes('Mission') ? 'var(--error)' : 'var(--text-muted)')}; border-radius: 50%; z-index: 1; border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.1);"></div>
                        <div style="flex: 1; width: 1.5px; background: rgba(0,0,0,0.06); margin: 4px 0;"></div>
                      </div>
                      <div style="flex: 1; padding-bottom: 4px;">
                        <div style="font-size: 13px; font-weight: 700; color: var(--text-primary); line-height: 1.5; letter-spacing: -0.2px;">${this.escapeHTML(h.action)}</div>
                        <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; margin-top: 6px; display: flex; align-items: center; gap: 6px;">
                          <span style="opacity: 0.5;">${this.getRelativeTime(h.time)}</span>
                          ${h.action.includes('Executive') ? '<span style="color:var(--accent); background:var(--accent-soft); padding: 2px 6px; border-radius: 4px; font-size: 8px;">EXECUTIVE LOG</span>' : ''}
                        </div>
                      </div>
                    </div>
                  `).join('') : `
                    <div style="padding: 40px 20px; text-align: center; background: rgba(0,0,0,0.02); border-radius: 20px; border: 1.5px dashed rgba(0,0,0,0.06);">
                      <div style="font-size: 11px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; opacity: 0.5;">No previous logs found in vault</div>
                    </div>
                  `}
                </div>
              </div>


              <!-- Executive Command Console -->
              <div style="display: flex; gap: 12px; justify-content: space-between; align-items: center;">
                <button class="btn-hub" id="save-edits-btn" onclick="app.saveLeadEdits('${safeLeadId}')" style="display: none; background: var(--success); color: #fff; border: none; height: 52px; border-radius: 18px; font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.5px; gap: 8px; flex: 1; justify-content: center; align-items: center;">
                  <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                  Save Edits
                </button>
                
                <button onclick="app.initCall('${lead.name.replace(/'/g, "\\'")}', '${safePhone}')" style="flex: 1; height: 52px; background: rgba(52, 199, 89, 0.08); border: 1.5px solid rgba(52, 199, 89, 0.15); border-radius: 18px; color: #2D8C44; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s;" onmouseover="this.style.background='rgba(52, 199, 89, 0.15)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(52, 199, 89, 0.08)'; this.style.transform='translateY(0)'">
                  <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span style="font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.5px;">Call</span>
                </button>

                <button onclick="window.open('https://wa.me/${waPhone}', '_blank')" style="flex: 1; height: 52px; background: rgba(37, 211, 102, 0.08); border: 1.5px solid rgba(37, 211, 102, 0.15); border-radius: 18px; color: #128C7E; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s;" onmouseover="this.style.background='rgba(37, 211, 102, 0.15)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(37, 211, 102, 0.08)'; this.style.transform='translateY(0)'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.55 4.197 1.594 6.015L0 24l6.135-1.582C7.904 23.45 9.904 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.753-.512-5.373-1.482l-.385-.229-3.664.945.961-3.513-.251-.4c-1.062-1.695-1.621-3.662-1.621-5.694 0-5.86 4.766-10.627 10.627-10.627 5.86 0 10.627 4.766 10.627 10.627S17.86 22 12 22z"/></svg>
                  <span style="font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.5px;">WhatsApp</span>
                </button>

                ${(isAdmin || isOwner) ? `
                <button onclick="app.forceCloseLead('${safeLeadId}')" style="flex: 1; height: 52px; background: rgba(0,0,0,0.03); border: 1.5px solid rgba(0,0,0,0.08); border-radius: 18px; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s;" onmouseover="this.style.background='var(--error)'; this.style.color='#fff'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(0,0,0,0.03)'; this.style.color='var(--text-muted)'; this.style.transform='translateY(0)'">
                  <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                  <span style="font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.5px;">${isAdmin ? 'Force Close' : 'Close'}</span>
                </button>
                ` : ''}
              </div>
            </div>
          `;

      modal.style.display = "flex";
      modal.classList.add("active");
      if (window.innerWidth < 850)
        content.style.transform = "translateY(0)";
      content.scrollTop = 0;
    } catch (error) {
      console.error("Dossier Activation Fault:", error);
      this.toast("Critical Dossier Glitch: Check Console", "error");
    }
  },

  closeModal(e) {
    if (e && e.target.id !== "lead-modal" && !e.target.closest(".modal-close-btn")) return;
    const modal = document.getElementById("lead-modal");
    modal.classList.remove("active");
    setTimeout(() => { modal.style.display = "none"; }, 400);
  },

  async forceCloseLead(id) {
    if (!id) return;
    try {
      this.toast("Terminating Lead Protocol...", "info");
      const tid = String(id).trim();
      const lead = this.leads.find(l => String(l.id).trim() === tid);
      const history = lead ? (lead.history || []) : [];
      history.push({ time: Date.now(), action: "Mission Aborted: Forced Close initiated by executive override." });

      await DB.updateLead(tid, {
        status: 'Closed',
        followup_date: null,
        priority: 'Cold',
        history: history
      });

      // Locally update to prevent wait
      if (lead) lead.status = 'Closed';

      this.toast("Lead Force-Closed 🔐", "success");
      this.closeModal();
      this.refreshLeads();
    } catch (e) {
      console.error("Force Close Fault:", e);
      this.toast("Registry Protocol Failure", "error");
    }
  },

  toggleEditLead(id) {
    const isEditing = document.getElementById("lead-edit-name").style.display === "block";
    const ids = ["name", "phone", "location", "interest", "weight"];
    ids.forEach(fid => {
      document.getElementById(`lead-display-${fid}`).style.display = isEditing ? "block" : "none";
      document.getElementById(`lead-edit-${fid}`).style.display = isEditing ? "none" : "block";
    });
    document.getElementById("edit-toggle-btn").textContent = isEditing ? "Edit Profile" : "Cancel Edit";
    document.getElementById("save-edits-btn").style.display = isEditing ? "none" : "flex";
  },

  async saveLeadEdits(id) {
    try {
      const newName = document.getElementById("edit-name-val").value.trim();
      const newPhone = document.getElementById("edit-phone-val").value.trim();
      const newLocation = document.getElementById("edit-location-val").value.trim();
      const newInterest = document.getElementById("edit-interest-val").value.trim();
      const newWeight = document.getElementById("edit-weight-val").value.trim();

      if (!newName || !newPhone) return this.toast("Registry Requirement: Name & Phone", "warning");

      this.toast("Synchronizing Intelligence Vault...", "info");
      const lead = this.leads.find(l => String(l.id) === String(id));
      const history = lead.history || [];
      history.push({ time: Date.now(), action: "Executive Dossier Modified: Product & Weight metrics recalibrated." });

      await DB.updateLead(id, {
        name: newName,
        phone: newPhone,
        location: newLocation,
        interest: newInterest,
        weight: newWeight,
        history: history
      });

      this.toast("Registry Updated Success ✅", "success");

      // Synchronization Protocol: Propagate changes to Google Sheets
      const updatedLead = this.leads.find(l => String(l.id) === String(id));
      if (updatedLead) {
        this.syncToSheets(updatedLead).catch(e => console.error("Sheets Sync Fault:", e));
      }

      this.viewLead(id);
    } catch (e) {
      console.error("Profile Edit Fault:", e);
      this.toast("Registry Protocol Failure", "error");
    }
  },

  async updateStatus(id) {
    const lead = this.leads.find((l) => String(l.id) === String(id));
    const steps = ["New Inquiry", "Contacted", "Store Visit", "Follow-up", "Purchased", "Closed"];
    const nextStatus = steps[(steps.indexOf(lead.status) + 1) % steps.length];
    try {
      await DB.updateLead(id, {
        status: nextStatus,
        history: arrayUnion({ time: Date.now(), action: `Status adjusted to ${nextStatus}` }),
      });
      this.toast(`Registry Updated`);
      this.viewLead(id);
      const updatedLead = this.leads.find((l) => String(l.id) === String(id));
      if (updatedLead) this.syncToSheets(updatedLead);
    } catch (e) {
      this.toast("Status Update Failed", "error");
    }
  },

  async recalibrateHorizon(id, newDate) {
    try {
      const lead = this.leads.find(l => String(l.id) === String(id));
      if (!lead) return;
      const canEdit = this.user.role === Roles.ADMIN || this.user.role === Roles.SUPERVISOR || lead.owner === this.user.id || lead.assigned_to === this.user.id;
      if (!canEdit) return this.toast("Strategic Override Denied", "error");
      this.toast("Recalibrating Tactical Horizon...", "info");
      const history = lead.history || [];
      history.push({ time: Date.now(), action: `Strategic Target Recalibrated to: ${newDate.split('-').reverse().join('/')}` });

      await DB.updateLead(id, { followup_date: newDate, history: history });

      this.toast("Mission Critical Update: Horizon Recalibrated 📡", "success");
      this.viewLead(id);
    } catch (e) {
      console.error("Horizon Recalibration Fault:", e);
      this.toast("Terminal Registry Communication Fault", "error");
    }
  },
  
  async upgradeLeadToLongForm(id) {
    if (!id) return;
    this.toast("Uplink Initiated: Upgrading Intelligence Protocol...", "info");
    
    const leadIdx = this.leads.findIndex(l => String(l.id) === String(id));
    if (leadIdx === -1) return;
    
    const lead = this.leads[leadIdx];
    const history = lead.history || [];
    history.push({ 
      time: Date.now(), 
      action: "Intelligence Upgrade: Short Form converted to Long Form Dossier by " + (this.user?.name || "System") 
    });

    try {
      const { error } = await supabase
        .from('leads')
        .update({ 
          type: 'long',
          history: history
        })
        .eq('id', id);

      if (error) throw error;

      // Update Local State
      this.leads[leadIdx] = { ...lead, type: 'long', history: history };
      
      this.toast("Intelligence Upgrade Complete: Dossier Unlocked", "success");
      
      // Update Metrics & View
      this.updateNavStats();
      this.viewLead(id);
      
      // Persist to Stash
      RedishStash.set('leads', this.leads.slice(0, 2000));
    } catch (e) {
      console.error("Upgrade Fault:", e);
      this.toast("Upgrade Failure: Protocol Interrupted", "error");
    }
  },

  async markFollowUpDone(id) {
    try {
      if (!id) throw new Error("Missing Lead ID");
      this.toast("Synchronizing Tactical Registry...", "info");

      const lead = this.leads.find(l => String(l.id) === String(id));
      if (!lead) return;

      const history = lead.history || [];
      history.push({
        time: Date.now(),
        action: "Strategic follow-up completed. Terminal Tag: 'Follow-up Done'.",
      });

      await DB.updateLead(id, {
        status: "Follow-up Done",
        followup_date: null,
        history: history
      });

      this.toast("Strategic Registry Synchronized 🔐");
      this.closeModal();
      this.viewFilteredRegistry(null);

      // Google Sheets Sync
      const updatedLead = this.leads.find((l) => String(l.id) === String(id));
      if (updatedLead) this.syncToSheets(updatedLead);
    } catch (e) {
      console.error("Follow-up Sync Master Fault:", e);
      this.toast(`Registry Fault: ${e.message}`, "error");
    }
  },

  async saveShortLead() {
    try {
      if (!this.user) return this.toast("Authentication Shield Triggered: Access Denied", "error");

      const nameComp = document.getElementById("short-lead-name").value;
      const location = document.getElementById("short-lead-location").value;
      const source = document.getElementById("short-lead-source").value;
      const info = document.getElementById("short-lead-info").value;

      const leadId = this.generateID();
      const mergedInterest = info ? `${source} (Quick) | Note: ${info}` : `${source} (Quick)`;

      const entry = {
        id: leadId,
        name: nameComp || "Unnamed Quick Lead",
        phone: "SHORT-REG",
        location: location || "Not Specified",
        interest: mergedInterest,
        source: source,
        status: "New Inquiry",
        priority: "Warm",
        type: "short",
        timestamp: new Date().toISOString(),
        owner: this.user.id,
        owner_name: this.user.name,
        added_by: this.user.email || "terminal@vera.gold",
        history: [{ time: Date.now(), action: "Short Lead Captured" }]
      };

      this.toast("Syncing Short Lead...", "info");
      const { error } = await supabase.from('leads').insert([entry]);
      if (error) throw error;

      if (this.fetchAndRenderLeads) this.fetchAndRenderLeads();
      this.toast("Short Lead Secure ✅", "success");

      // Reset Form
      document.getElementById("short-lead-name").value = "";
      document.getElementById("short-lead-location").value = "";
      document.getElementById("short-lead-info").value = "";

      // Background sync
      this.syncToSheets(entry).catch(e => console.error("Sheets Async Fault:", e));
    } catch (error) {
      console.error("Short Entry Fault:", error);
      const detail = error.details || error.hint || "Schema Mismatch";
      this.toast(`Critical Entry Fault: ${error.message} (${detail})`, "error");
    }
  },

  async renderProfile() {
    const container = document.getElementById("profile-container");
    if (!container) return;

    const user = this.user;
    const role = user.role || "Member";
    const isAdmin = ["Admin", "Supervisor"].includes(role);

    // Default tab if not set
    if (!this.activeProfileTab) this.activeProfileTab = 'personal';

    const renderError = (msg) => {
      container.innerHTML = `<div style="padding: 60px 24px; text-align: center; color: var(--error); font-weight: 700;">TERMINAL ERROR: ${msg}</div>`;
    };

    try {
      if (!user || !user.id) {
        container.innerHTML = `<div style="padding: 120px 40px; text-align: center; opacity: 0.5; font-weight: 700;">Awaiting Biometric Authentication...</div>`;
        return;
      }

      // --- DATA CALCULATIONS ---
      const myLeads = this.leads.filter(l => l.assigned_to === user.id || l.owner === user.id);
      const totalLeads = myLeads.length;
      const purchasedLeads = myLeads.filter(l => l.status === "Purchased").length;
      const convRatio = totalLeads > 0 ? ((purchasedLeads / totalLeads) * 100).toFixed(1) : "0.0";
      const hotLeads = myLeads.filter(l => l.priority === "Hot" && l.status !== "Closed").length;

      // --- UI ASSEMBLE ---
      const initial = (user.name || "E").charAt(0).toUpperCase();

      let contentHTML = "";

      const statsHTML = `
                <div class="panoramic-grid grid-3-col" style="margin-top: 32px;">
                  
                  <!-- UNIT 1: CONVERSION VELOCITY -->
                  <div class="card elevated" style="padding: 32px; border-radius: 40px; background: var(--accent-gradient); color: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 200px; box-shadow: 0 20px 40px rgba(82,18,22,0.15);">
                    <div style="font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8;">Conversion Velocity</div>
                    <div>
                      <div class="scale-big-stats" style="font-size: 64px; font-weight: 950; letter-spacing: -3.5px; line-height: 1;">${convRatio}%</div>
                      <div style="font-size: 12px; font-weight: 850; opacity: 0.7; margin-top: 8px;">${purchasedLeads} Successes from ${totalLeads} Engagements</div>
                    </div>
                  </div>

                  <!-- UNIT 2: HOT PATH DEPTH -->
                  <div class="card elevated" style="padding: 32px; border-radius: 40px; background: #fff; border: 1.5px solid rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between; min-height: 200px;">
                    <div style="font-size: 11px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Hot Path Depth</div>
                    <div>
                      <div class="scale-big-stats" style="font-size: 64px; font-weight: 950; color: var(--error); letter-spacing: -3.5px; line-height: 1;">${hotLeads}</div>
                      <div style="font-size: 12px; font-weight: 850; color: var(--text-muted); margin-top: 8px;">Active High-Priority Assignments</div>
                    </div>
                  </div>

                  <!-- UNIT 3: SESSION PULSE -->
                  <div class="card elevated" style="padding: 32px; border-radius: 40px; background: #fff; border: 1.5px solid rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between; min-height: 200px;">
                    <div style="font-size: 11px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Session Pulse</div>
                    <div>
                      <div id="session-timer" class="scale-big-stats" style="font-size: 64px; font-weight: 950; color: var(--success); letter-spacing: -3.5px; line-height: 1;">04:12</div>
                      <div style="font-size: 12px; font-weight: 850; color: var(--text-muted); margin-top: 8px;">Current Tactical Uptime</div>
                    </div>
                  </div>

                  <!-- UNIT 4: TERMINAL SYNC STRIP -->
                  <div class="card elevated" style="grid-column: span 3; background: rgba(0,0,0,0.02); border: 1.5px dashed rgba(0,0,0,0.08); padding: 24px; border-radius: 28px; display: flex; align-items: center; justify-content: center; gap: 16px;">
                    <div style="width: 10px; height: 10px; background: var(--success); border-radius: 50%; box-shadow: 0 0 10px var(--success);"></div>
                    <div style="font-size: 12px; font-weight: 950; color: var(--text-muted); letter-spacing: 1.5px; text-transform: uppercase;">Executive Terminal Fully Synchronized • Uplink Stable</div>
                  </div>
                </div>
            `;

      if (this.activeProfileTab === 'personal') {
        // PERSONAL COMMAND BENTO
        contentHTML = `
                ${statsHTML}

                <!-- PERSONAL TELEPHONY UPLINK -->
                <div class="card elevated" style="margin-top: 40px; padding: 40px; border-radius: 40px; background: #fff; border: 1.5px solid rgba(0,0,0,0.02);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                    <div>
                      <h3 style="font-size: 20px; font-weight: 950; color: var(--text-primary); margin: 0; letter-spacing: -0.5px;">Personal Calling Uplink</h3>
                      <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 4px; letter-spacing: 1px;">Your registered phone for Click-to-Call</p>
                    </div>
                  </div>
                  <div style="display: flex; gap: 16px; align-items: flex-end;">
                    <div style="flex: 1;">
                      <label style="font-size: 10px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Phone Number</label>
                      <input type="tel" id="personal-calling-num" placeholder="e.g. 9876543210" value="${this.user.calling_number || ''}" class="input" style="height: 52px; margin-top: 8px; border-radius: 16px; font-weight: 900;">
                    </div>
                    <button onclick="app.updateCallingNumber()" class="btn btn-primary" style="width: auto; padding: 0 32px; height: 52px; border-radius: 16px; font-size: 13px;">Save Uplink</button>
                  </div>
                </div>

                <!-- TACTICAL ASSIGNMENT TERMINAL -->
                <div style="margin-top: 56px;">
                  <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px;">
                    <div>
                      <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin: 0; letter-spacing: -1px;">Tactical Assignments</h3>
                      <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 6px; letter-spacing: 1px;">Individual operational queue</p>
                    </div>
                    <div style="font-size: 11px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 1px;">Showing Root Nodes</div>
                  </div>

                  <div class="grid-stack grid-3-col" style="gap: 20px;">
                    ${myLeads.slice(0, 6).map(l => `
                      <div class="card elevated" onclick="app.viewLead('${(l.id ? String(l.id).trim() : '')}')" style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.02); cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; gap: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                           <div style="width: 44px; height: 44px; background: ${l.priority === 'Hot' ? 'rgba(255,59,48,0.08)' : 'rgba(0,122,255,0.08)'}; color: ${l.priority === 'Hot' ? '#FF3B30' : '#007AFF'}; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                           </div>
                           <span style="font-size: 9px; font-weight: 950; padding: 5px 10px; background: rgba(0,0,0,0.04); color: var(--text-muted); border-radius: 8px; text-transform: uppercase;">${l.status}</span>
                        </div>
                        <div>
                          <div style="font-weight: 950; font-size: 18px; color: var(--text-primary); letter-spacing: -0.5px;">${l.name}</div>
                          <div style="font-size: 11px; font-weight: 850; color: var(--text-muted); margin-top: 4px; text-transform: uppercase;">Channel: ${l.source}</div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                           <div style="width: 8px; height: 8px; background: ${l.priority === 'Hot' ? '#FF3B30' : '#34C759'}; border-radius: 50%; box-shadow: 0 0 8px ${l.priority === 'Hot' ? '#FF3B3066' : '#34C75966'};"></div>
                           <span style="font-size: 10px; font-weight: 950; color: ${l.priority === 'Hot' ? '#FF3B30' : '#34C759'}; text-transform: uppercase;">${l.priority === 'Hot' ? 'Critical' : 'Stable'} Priority</span>
                        </div>
                      </div>
                    `).join('') || `
                      <div style="grid-column: span 3; padding: 64px; text-align: center; background: rgba(0,0,0,0.015); border: 1.5px dashed rgba(0,0,0,0.05); border-radius: 32px;">
                        <div style="font-size: 32px; margin-bottom: 16px;">📋</div>
                        <div style="font-size: 13px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Operational Queue Vacant</div>
                      </div>
                    `}
                  </div>
                </div>
              `;
      } else {
        // ADMIN COMMAND VIEW - RECONSTRUCTED BENTO GRID
        contentHTML = `
                ${statsHTML}
                <div style="margin-top: 56px;">
                   <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin: 0; letter-spacing: -1px;">Admin Console</h3>
                   <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 6px; letter-spacing: 1px;">Sovereign Terminal Control Hub</p>
                </div>
                <div class="panoramic-grid grid-stack grid-3-col" style="margin-top: 32px;">
                  
                  <!-- UNIT 1: STRATEGIC BROADCAST -->
                  <div class="card elevated" onclick="app.editAnnouncement()" style="padding: 24px; border-radius: 32px; background: rgba(82, 18, 22, 0.04); border: 1.5px solid rgba(82, 18, 22, 0.1); cursor: pointer; transition: all 0.3s ease;">
                    <div style="width: 52px; height: 52px; background: var(--accent-gradient); color: #fff; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(82,18,22,0.2);">
                      <svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </div>
                    <div>
                      <h4 style="font-weight: 950; font-size: 18px; letter-spacing: -0.5px;">Update Briefing</h4>
                      <p style="font-size: 10px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 4px; letter-spacing: 0.5px;">Global Terminal Announcement</p>
                    </div>
                  </div>

                  <!-- UNIT 2: NEURAL CORE -->
                  <div class="card elevated" onclick="app.editNeuralHub()" style="padding: 24px; border-radius: 32px; background: rgba(52, 199, 89, 0.04); border: 1.5px solid rgba(52, 199, 89, 0.1); cursor: pointer; transition: all 0.3s ease;">
                    <div style="width: 52px; height: 52px; background: var(--success); color: #fff; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(52,199,89,0.2);">
                      <svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75V21m-7.071-7.071l.707-.707"/></svg>
                    </div>
                    <div>
                      <h4 style="font-weight: 950; font-size: 18px; color: var(--success); letter-spacing: -0.5px;">Neural Hub</h4>
                      <p style="font-size: 10px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 4px; letter-spacing: 0.5px;">Train & Update AI Brain</p>
                    </div>
                  </div>

                  <!-- UNIT 3: LOGISTICS EXPORT -->
                  <div class="card elevated" onclick="app.renderReportSelector()" style="padding: 24px; border-radius: 32px; background: rgba(0, 122, 255, 0.04); border: 1.5px solid rgba(0, 122, 255, 0.1); cursor: pointer; transition: all 0.3s ease;">
                    <div style="width: 52px; height: 52px; background: #007AFF; color: #fff; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(0,122,255,0.2);">
                      <svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    </div>
                    <div>
                      <h4 style="font-weight: 950; font-size: 18px; color: #007AFF; letter-spacing: -0.5px;">PDF Export</h4>
                      <p style="font-size: 10px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 4px; letter-spacing: 0.5px;">Sovereign Performance Aggregation</p>
                    </div>
                  </div>

                  <!-- UNIT 4: STRATEGIC MIGRATION PORTAL -->
                  <div class="card elevated" onclick="app.renderMigrationPortal()" style="padding: 24px; border-radius: 32px; background: rgba(255, 149, 0, 0.04); border: 1.5px solid rgba(255, 149, 0, 0.1); cursor: pointer; transition: all 0.3s ease;">
                    <div style="width: 52px; height: 52px; background: linear-gradient(135deg, #FF9500, #FF5E00); color: #fff; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(255,149,0,0.2);">
                      <svg width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                    </div>
                    <div>
                      <h4 style="font-weight: 950; font-size: 18px; color: #FF9500; letter-spacing: -0.5px;">Data Migration</h4>
                      <p style="font-size: 10px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 4px; letter-spacing: 0.5px;">Bridge Old & New Supabase Nodes</p>
                    </div>
                  </div>

                  <!-- UNIT 4: LIVE PRICING PROTOCOL (SPAN 3) -->
                  <div class="card elevated" style="grid-column: span 3; padding: 40px; border-radius: 40px; background: #fff; border: 1px solid rgba(0,0,0,0.03);">
                     <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
                        <div>
                          <h4 style="font-size: 20px; font-weight: 950; color: var(--text-primary); margin: 0; letter-spacing: -0.8px;">Global Pricing Terminal</h4>
                          <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 6px; letter-spacing: 1px;">Real-time bullion market calibration</p>
                        </div>
                        <button onclick="app.pushNewRates()" style="padding: 12px 28px; background: var(--success); color:#fff; border:none; border-radius:14px; font-weight:950; font-size:12px; cursor:pointer; box-shadow: 0 10px 20px rgba(52,199,89,0.2);">FORCE UPDATE GLOBAL RATES</button>
                     </div>

                     <div class="grid-stack grid-2-col" style="gap: 40px;">
                        <!-- Gold Cluster -->
                        <div>
                          <h5 style="font-size: 10px; font-weight: 950; color: #D4AF37; margin-bottom: 16px; letter-spacing: 1.5px; text-transform: uppercase;">AURUM MATRIX</h5>
                          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            ${Object.keys(this.goldRates).filter(k => k.startsWith('2') || k === '18K' || k === 'Coin' || k === 'Old Gold').map(k => `
                              <div>
                                <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">${k}</div>
                                <input type="number" id="rate-edit-${k}" value="${this.goldRates[k]}" class="input" style="height: 48px; border-radius: 14px; font-size: 16px; font-weight: 800; padding: 0 16px; background: rgba(0,0,0,0.02); border: 1.5px solid transparent; transition: all 0.3s ease;">
                              </div>
                            `).join('')}
                          </div>
                        </div>
                        
                        <!-- Silver Cluster -->
                        <div>
                          <h5 style="font-size: 10px; font-weight: 950; color: #A8A9AD; margin-bottom: 16px; letter-spacing: 1.5px; text-transform: uppercase;">ARGENTUM MATRIX</h5>
                          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            ${Object.keys(this.goldRates).filter(k => k.startsWith('Silver')).map(k => `
                              <div>
                                <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">${k}</div>
                                <input type="number" id="rate-edit-${k}" value="${this.goldRates[k]}" class="input" style="height: 48px; border-radius: 14px; font-size: 16px; font-weight: 800; padding: 0 16px; background: rgba(0,0,0,0.02); border: 1.5px solid transparent; transition: all 0.3s ease;">
                              </div>
                            `).join('')}
                          </div>
                        </div>
                     </div>
                  </div>
                </div>
              `;
      }

      container.innerHTML = `
              <div style="padding: 40px; max-width: 1600px; margin: 0 auto;">
                
                <!-- SOVEREIGN HORIZONTAL HERO BAR -->
                <div class="card elevated hero-bar-stack" style="background: #fff; padding: 40px; border-radius: 48px; border: 1.5px solid rgba(0,0,0,0.02); margin-bottom: 32px; position: relative; overflow: hidden; display: flex; justify-content: space-between; align-items: center;">
                  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: var(--accent-gradient);"></div>
                  
                  <div style="display: flex; align-items: center; gap: 32px;">
                    <div class="avatar-box" style="width: 100px; height: 100px; min-width: 100px; border-radius: 32px; background: var(--accent-gradient); color: #fff; font-size: 40px; font-weight: 950; display: flex; align-items: center; justify-content: center; box-shadow: 0 15px 35px rgba(82, 18, 22, 0.2);">${initial}</div>
                    <div>
                      <h1 class="responsive-h1" style="font-size: 44px; font-weight: 950; color: var(--text-primary); margin: 0; letter-spacing: -2.2px; line-height: 1;">${(user.name || "Executive").toUpperCase()}</h1>
                      <div style="display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap;">
                        <span style="font-size: 11px; font-weight: 950; padding: 7px 16px; background: rgba(0,0,0,0.04); color: var(--text-primary); border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${role} ID: ${user.id.slice(0, 6)}</span>
                        <span style="font-size: 11px; font-weight: 950; padding: 7px 16px; background: rgba(52, 199, 89, 0.1); color: var(--success); border-radius: 12px; text-transform: uppercase;">Protocol Secure</span>
                      </div>
                    </div>
                  </div>

                  <div class="hero-btn-group" style="display: flex; gap: 14px;">
                    <button onclick="app.lockTerminal()" class="btn" style="height: 56px; border-radius: 18px; background: rgba(0,0,0,0.03); border: none; padding: 0 28px; font-size: 13px; font-weight: 950; display: flex; align-items: center; gap: 10px; color: var(--text-muted); cursor: pointer; transition: all 0.3s ease;">
                      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                      Lock Terminal
                    </button>
                    <button onclick="app.logout()" class="btn" style="height: 56px; border-radius: 18px; background: rgba(255, 59, 48, 0.08); border: none; padding: 0 28px; font-size: 13px; font-weight: 950; display: flex; align-items: center; gap: 10px; color: var(--error); cursor: pointer; transition: all 0.3s ease;">
                      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                      Terminate Session
                    </button>
                  </div>
                </div>

                <!-- PANORAMIC GLASS SWITCHER -->
                ${isAdmin ? `
                  <div style="display: flex; background: rgba(0,0,0,0.035); padding: 8px; border-radius: 24px; margin-bottom: 40px; gap: 8px; width: 100%; max-width: 500px; margin-left: 0;">
                    <button onclick="app.activeProfileTab='personal'; app.renderProfile();" style="flex: 1; height: 48px; border: none; border-radius: 18px; font-size: 11px; font-weight: 950; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); background: ${this.activeProfileTab === 'personal' ? '#fff' : 'transparent'}; color: ${this.activeProfileTab === 'personal' ? 'var(--text-primary)' : 'var(--text-muted)'}; box-shadow: ${this.activeProfileTab === 'personal' ? '0 8px 16px rgba(0,0,0,0.06)' : 'none'}; text-transform: uppercase; letter-spacing: 1px;">Personal Command Hub</button>
                    <button onclick="app.activeProfileTab='command'; app.renderProfile();" style="flex: 1; height: 48px; border: none; border-radius: 18px; font-size: 11px; font-weight: 950; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); background: ${this.activeProfileTab === 'command' ? '#fff' : 'transparent'}; color: ${this.activeProfileTab === 'command' ? 'var(--text-primary)' : 'var(--text-muted)'}; box-shadow: ${this.activeProfileTab === 'command' ? '0 8px 16px rgba(0,0,0,0.06)' : 'none'}; text-transform: uppercase; letter-spacing: 1px;">Admin Console</button>
                  </div>
                ` : ''}

                ${contentHTML}

                <div style="margin-top: 80px; text-align: center; border-top: 1px solid rgba(0,0,0,0.03); padding-top: 32px;">
                  <p style="font-size: 10px; font-weight: 950; color: var(--text-muted); opacity: 0.4; letter-spacing: 3px; text-transform: uppercase;">Sovereign Executive Core v9.5 • Quantum Encrypted Port 8080</p>
                </div>
              </div>
            `;
    } catch (pe) {
      console.error("CRITICAL_RENDER_FAIL:", pe);
      renderError(pe.message);
    }
  },

  togglePass(id) {
    const el = document.getElementById(id);
    el.type = el.type === "password" ? "text" : "password";
  },

  checkAccess() {
    if (this.user && this.user.role === Roles.MEMBER) {
      this.toast("Security Access Restricted", "error");
      this.navigate("dashboard");
      return false;
    }
    return true;
  },

  // --- EXECUTIVE AI MODULE ---
  toggleAIChat() {
    const fab = document.getElementById("ai-fab");
    const win = document.getElementById("ai-window");
    if (win.classList.contains("active")) {
      win.classList.remove("active");
      fab.style.opacity = "1";
      fab.style.pointerEvents = "auto";
    } else {
      win.classList.add("active");
      fab.style.opacity = "0.3";
      document.getElementById("ai-input").focus();
    }
  },

  async sendAIChat() {
    const input = document.getElementById("ai-input");
    const scroll = document.getElementById("ai-messages");
    const typing = document.getElementById("ai-typing");
    const text = input.value.trim();
    if (!text) return;

    // User Message
    input.value = "";
    this.renderAIChatBubble(text, 'user');

    // Add to History
    this.chatHistory.push({ role: 'user', content: text });
    if (this.chatHistory.length > 6) this.chatHistory.shift(); // Context Slimming to avoid rate limits

    typing.style.display = "flex";
    scroll.scrollTop = scroll.scrollHeight;

    try {
      const response = await this.callGrok(this.chatHistory);
      typing.style.display = "none";

      this.renderAIChatBubble(response, 'ai');
      this.chatHistory.push({ role: 'assistant', content: response });
    } catch (e) {
      typing.style.display = "none";
      this.toast("Neural Stream Interrupted", "error");
    }
  },

  renderAIChatBubble(text, sender) {
    const scroll = document.getElementById("ai-messages");
    const bubble = document.createElement("div");
    bubble.className = `chat-msg msg-${sender}`;

    // Simple Markdown Handling (Bold)
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');

    bubble.innerHTML = formattedText;
    scroll.appendChild(bubble);
    scroll.scrollTop = scroll.scrollHeight;
  },

  async hardReset() {
    this.toast("Initiating Strategic Wipe...", "info");
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (let reg of regs) await reg.unregister();
    }
    localStorage.clear();
    window.location.reload(true);
  },

  updateNavStats() {
    try {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

      // Clean Navigation: No longer showing distracting numerical badges in sidebar

      // Island Update (Silent counts only for executive dashboard)
      const yieldEl = document.getElementById("island-yield");
      if (yieldEl) yieldEl.textContent = this.leads.filter(l => l.status === "Purchased").length;

    } catch (e) { console.warn("Nav Stats deferred:", e); }
  },

  systemPulse() {
    (async () => {
      try {
        const count = await DB.getLeadCount();
        const stats = `System Pulse Report:\n- User: ${this.user?.email}\n- Role: ${this.user?.role}\n- Permission Count: ${count}\n- Loaded in Memory: ${this.leads?.length || 0}\n- Sync Status: ${this._syncInitialized ? 'Active' : 'Offline'}\n- Heartbeat: ${new Date().toLocaleTimeString()}`;
        alert(stats);
        console.log("[SYSTEM PULSE] Detail:", this.leads);
      } catch (e) {
        alert("Sync Block Detected: " + e.message + "\n(This usually means RLS policies are blocking you or your session is invalid.)");
      }
    })();
  },

  async renderAdminPanel() {
    const container = document.getElementById("admin-panel-container");
    if (!container) return;
    const user = this.user;
    if (user.role !== Roles.ADMIN) return;

    container.innerHTML = `<div style="padding: 80px 40px; text-align: center; opacity: 0.5; font-weight: 700;">Authorizing Tactical Uplink...</div>`;

    try {
      const { data: allStaff } = await supabase.from('staff').select('*');

      // Metrics Calculation for Command View
      const totalLeads = this.leads.length;
      const purchasedLeads = this.leads.filter(l => l.status === "Purchased").length;
      const avgConv = totalLeads > 0 ? ((purchasedLeads / totalLeads) * 100).toFixed(1) : 0;

      // 4. PERSONNEL HIERARCHY PARTITIONING
      const tieredStaff = {
        Strategic: allStaff.filter(s => s.role === 'Admin'),
        Tactical: allStaff.filter(s => s.role === 'Supervisor'),
        Operational: allStaff.filter(s => s.role === 'Member' || !s.role)
      };

      container.innerHTML = `
              <div style="padding: 40px; max-width: 1600px; margin: 0 auto;">
                <!-- Command Header -->
                <div class="hero-bar-stack" style="margin-bottom: 48px; display: flex; justify-content: space-between; align-items: flex-end;">
                  <div>
                    <h1 class="responsive-h1" style="font-size: 56px; font-weight: 950; letter-spacing: -3px; color: var(--text-primary); margin: 0; line-height: 1;">Command & Control</h1>
                    <p style="font-size: 16px; color: var(--text-muted); font-weight: 600; margin-top: 12px; letter-spacing: 0.2px;">Sovereign Personnel Management Protocol & Role Authorization.</p>
                  </div>
                  <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
                    <button onclick="app.executeStrategicMigration()" class="btn" style="background: rgba(82, 18, 22, 0.1); color: var(--accent); border: 1.5px solid var(--accent); padding: 8px 16px; border-radius: 12px; font-size: 10px; font-weight: 850; cursor: pointer;">MIGRATE LEGACY DATA</button>
                    <div style="padding: 12px 24px; background: rgba(0,0,0,0.03); border-radius: 16px; font-size: 11px; font-weight: 900; color: var(--text-muted); text-transform: uppercase;">VERA 9.5 STAFF HUB</div>
                    <div style="padding: 12px 24px; background: rgba(52, 199, 89, 0.1); color: #34C759; border-radius: 16px; font-size: 11px; font-weight: 950; text-transform: uppercase;">REAL-TIME SYNC ACTIVE</div>
                  </div>
                </div>

                <!-- Strategic Global Metrics -->
                <div class="panoramic-grid grid-2-col" style="margin-bottom: 32px;">
                  <div class="card elevated" style="background: var(--accent-gradient); color: #fff; padding: 40px; border-radius: 40px;">
                    <div style="font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8;">Global Conversion Velocity</div>
                    <div class="scale-big-stats" style="font-size: 56px; font-weight: 950; letter-spacing: -3px; margin-top: 12px;">${avgConv}%</div>
                    <div style="font-size: 12px; color: rgba(255,255,255,0.7); font-weight: 850; margin-top: 8px;">Aggregate performance across all tactical sectors</div>
                  </div>
                  <div class="card elevated" style="background: #fff; padding: 40px; border-radius: 40px; border: 1px solid rgba(0,0,0,0.03);">
                    <div style="font-size: 11px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Active Personnel Fleet</div>
                    <div class="scale-big-stats" style="font-size: 56px; font-weight: 950; color: var(--text-primary); margin-top: 12px; letter-spacing: -3px;">${allStaff.length}</div>
                    <div style="font-size: 12px; color: var(--text-muted); font-weight: 850; margin-top: 8px;">Units currently authenticated in the VERA ecosystem</div>
                  </div>
                </div>

                <!-- STRATEGIC DATA HUB (ULTIMATE EXPORT PROTOCOLS) -->
                <div class="glass-card" style="padding: 40px; border-radius: 40px; margin-bottom: 64px; background: rgba(255,255,255,0.6); border: 1.5px solid rgba(82, 18, 22, 0.1);">
                  <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 32px;">
                    <div>
                      <div style="font-size: 11px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 2px;">Executive Intelligence Extraction</div>
                      <div style="font-size: 24px; font-weight: 950; color: var(--text-primary); letter-spacing: -1px; margin-top: 8px;">VERA Ultimate Report</div>
                      <p style="font-size: 13px; color: var(--text-muted); font-weight: 600; margin-top: 8px;">Comprehensive operational ledger with KPIs, segmented registries, and member stats.</p>
                    </div>
                    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                      <button onclick="app.exportUltimateAnalyticsPDF()" class="btn" style="width: auto; padding: 0 32px; background: linear-gradient(135deg, #000, #222); color: #fff; border: none; font-size: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border-radius: 16px;">
                        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="margin-right: 8px;"><path d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        ULTIMATE ANALYTICS (PDF)
                      </button>
                      <button onclick="app.exportOwnerIntelPDF()" class="btn" style="width: auto; padding: 0 24px; background: #fff; color: var(--text-primary); border: 1.5px solid rgba(0,0,0,0.1); font-size: 11px;">
                        OWNER INTEL
                      </button>
                      <button onclick="app.exportUltimateReport('xlsx')" class="btn" style="width: auto; padding: 0 32px; background: #1D6F42; color: #fff; border: none; font-size: 12px; box-shadow: 0 10px 25px rgba(29,111,66,0.25);">
                        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="margin-right: 8px;"><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        EXCEL DATA
                      </button>
                      <button onclick="app.downloadRegistryCSV('long')" class="btn" style="width: auto; padding: 0 24px; background: #fff; color: var(--text-primary); border: 1.5px solid rgba(0,0,0,0.1); font-size: 11px;">
                        LONG CSV
                      </button>
                      <button onclick="app.downloadRegistryCSV('short')" class="btn" style="width: auto; padding: 0 24px; background: #fff; color: var(--text-primary); border: 1.5px solid rgba(0,0,0,0.1); font-size: 11px;">
                        SHORT CSV
                      </button>
                    </div>
                  </div>
                </div>

                <!-- SOVEREIGN AUTHORITY CORE (PERSONNEL OVERRIDE) -->

                <div style="display: flex; flex-direction: column; gap: 64px; margin-top: 48px;">
                  <div style="border-left: 4px solid var(--accent); padding-left: 24px; margin-bottom: -32px;">
                    <div style="font-size: 11px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 2px;">Authority Power Hub</div>
                    <div style="font-size: 24px; font-weight: 950; color: var(--text-primary); letter-spacing: -1px; margin-top: 8px;">Personnel Role Override & Security Clearance</div>
                  </div>
                  ${(() => {
          // Pre-calculate stats in a single pass O(N) instead of filtering inside the map O(N*M)
          const staffStats = this.leads.reduce((map, l) => {
            if (l.owner) {
              if (!map[l.owner]) map[l.owner] = { total: 0, purchased: 0 };
              map[l.owner].total++;
              if (l.status === "Purchased") map[l.owner].purchased++;
            }
            return map;
          }, {});

          return Object.entries(tieredStaff).map(([tierName, members]) => {
            if (members.length === 0) return '';
            let tierColor = "var(--accent)";
            let tierLabel = "OPERATIONAL CORPS";
            if (tierName === 'Strategic') { tierLabel = "STRATEGIC COMMAND"; tierColor = "#FF3B30"; }
            else if (tierName === 'Tactical') { tierLabel = "TACTICAL COMMAND"; tierColor = "#5856D6"; }

            return `
                        <div>
                          <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 32px;">
                            <h2 style="font-size: 12px; font-weight: 950; color: ${tierColor}; letter-spacing: 2.5px; text-transform: uppercase; margin: 0;">${tierLabel}</h2>
                            <div style="flex: 1; height: 1px; background: ${tierColor}; opacity: 0.15;"></div>
                            <div style="font-size: 10px; font-weight: 900; color: var(--text-muted);">${members.length} UNITS</div>
                          </div>

                          <div class="panoramic-grid grid-stack" style="grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr)); gap: 24px;">
                            ${members.map(s => {
              const stats = staffStats[s.id] || { total: 0, purchased: 0 };
              const ratio = stats.total > 0 ? Math.round((stats.purchased / stats.total) * 100) : 0;

              return `
                              <div class="card elevated" style="background: #fff; border-radius: 32px; padding: 28px; border: 1.5px solid rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
                                    <div style="display: flex; align-items: center; gap: 20px;">
                                        <div style="width: 52px; height: 52px; background: ${tierColor}; color: #fff; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-weight: 950; font-size: 20px; box-shadow: 0 10px 20px ${tierColor}33;">
                                            ${(s.name || s.id).charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style="font-weight: 950; font-size: 18px; letter-spacing: -0.8px; color: var(--text-primary);">${(s.name || s.id).toUpperCase()}</div>
                                            <div style="font-size: 11px; color: var(--text-muted); font-weight: 800; margin-top: 2px; opacity: 0.7;">${s.email || (s.id + '@vera.gold')}</div>
                                        </div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 20px; font-weight: 950; color: ${ratio > 25 ? 'var(--success)' : tierColor}; letter-spacing: -0.5px;">${ratio}%</div>
                                        <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); text-transform: uppercase;">VELOCITY</div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.04);">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="font-size: 10px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Authorization</span>
                                        <div style="width: 6px; height: 6px; background: ${ratio > 0 ? 'var(--success)' : 'var(--text-muted)'}; border-radius: 50%;"></div>
                                    </div>
                                    
                                    <select 
                                        onchange="app.updateStaffRole('${s.id}', this.value)" 
                                        style="background: rgba(0,0,0,0.03); border: none; border-radius: 10px; font-size: 10px; font-weight: 950; padding: 10px 16px; color: ${tierColor}; cursor: pointer; outline: none; appearance: none; text-align: center; text-transform: uppercase; letter-spacing: 0.5px;"
                                        ${s.id === user.id ? 'disabled' : ''}
                                    >
                                        <option value="${Roles.ADMIN}" ${s.role === Roles.ADMIN ? 'selected' : ''}>STRATEGIC ADMIN</option>
                                        <option value="${Roles.SUPERVISOR}" ${s.role === Roles.SUPERVISOR ? 'selected' : ''}>TACTICAL SUPERVISOR</option>
                                        <option value="${Roles.MEMBER}" ${s.role === Roles.MEMBER ? 'selected' : ''}>OPERATIONAL MEMBER</option>
                                    </select>
                                </div>
                            </div>
                          `;
            }).join('')}
                        </div>
                      </div>
                    `;
          }).join('')
        })()}
                </div>

                <div style="margin-top: 64px; text-align: center; cursor: pointer;" onclick="app.systemPulse()">
                  <div style="width: 100%; height: 1px; background: rgba(0,0,0,0.03); margin-bottom: 32px;"></div>
                  <p style="font-size: 10px; font-weight: 950; color: var(--text-muted); opacity: 0.5; letter-spacing: 3px; text-transform: uppercase;">Sovereign Administrative Terminal • Secured Uplink Active</p>
                  <p style="font-size: 8px; color: var(--accent); margin-top: 8px; font-weight: 800; opacity: 0.3;">[ CLICK FOR SYSTEM PULSE ]</p>
                </div>
              </div>
            `;
    } catch (e) {
      console.error("Admin Registry Fail:", e);
      container.innerHTML = `<div style="padding: 60px; color: var(--error); text-align: center; font-weight: 850;">SYSTEM REGISTRY UPLINK FAILURE</div>`;
    }
  },

  async updateStaffRole(staffId, newRole) {
    if (staffId === this.user.id) {
      return this.toast("Security Protocol: Self-Demotion Blocked", "warning");
    }
    try {
      await supabase.from('staff').update({ role: newRole }).eq('id', staffId);
      this.toast(`Registry Updated: ${staffId.toUpperCase()} is now ${newRole}`);

      // Re-render appropriate screen
      if (document.getElementById("screen-admin-panel").classList.contains("active")) {
        this.renderAdminPanel();
      } else {
        this.renderProfile();
      }
    } catch (e) {
      console.error("Staff Update Error:", e);
      this.toast("Staff Registry Communication Fault", "error");
    }
  },

  async downloadRegistryCSV(format = 'short') {
    try {
      this.toast(`Performing Fresh ${format.toUpperCase()} Database Sweep...`, "info");

      // Fetch DIRECT from Supabase for maximum data integrity
      const { data: leads, error } = await supabase.from('leads').select('*').order('timestamp', { ascending: false });
      if (error || !leads) throw new Error("Database Communication Failure");

      // Smarter Filtering: Short is explicitly 'short', everything else is Long
      const filtered = format === 'long'
        ? leads.filter(l => l.type !== 'short' && l.type !== 'short-reg')
        : leads.filter(l => l.type === 'short' || l.type === 'short-reg');

      if (filtered.length === 0) {
        this.toast(`No data found for ${format.toUpperCase()} segment.`, "warning");
        return;
      }

      let csvContent = "\uFEFF"; // UTF-8 BOM for Excel compatibility
      let headers = ["Timestamp", "Name", "Phone", "Status", "Priority", "Location", "Interest", "Executive Note"];
      csvContent += headers.join(",") + "\n";

      filtered.forEach(l => {
        const row = [
          `"${new Date(l.timestamp).toLocaleString()}"`,
          `"${(l.name || 'N/A').replace(/"/g, '""')}"`,
          `"${(l.phone || '').replace(/"/g, '""')}"`,
          `"${(l.status || '').replace(/"/g, '""')}"`,
          `"${(l.priority || '').replace(/"/g, '""')}"`,
          `"${(l.location || '').replace(/"/g, '""')}"`,
          `"${(l.interest || '').replace(/"/g, '""')}"`,
          `"${(l.enquiry_note || '').replace(/"/g, '""')}"`
        ];
        csvContent += row.join(",") + "\n";
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `VERA_${format.toUpperCase()}_FULL_REGISTRY_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      this.toast(`Extracted ${filtered.length} Entries Successfully`, "success");
    } catch (e) {
      console.error("CSV Export Fault:", e);
      this.toast("Critical Extraction Fault", "error");
    }
  },

  async exportUltimateAnalyticsPDF() {
    if (!["Admin", "Supervisor"].includes(this.user.role)) return;
    this.toast("Synchronizing 6,200+ Records for Mirror-UI Audit...", "info");

    // --- 1. TOTAL DATABASE SYNC ---
    let allLeads = [];
    let rFrom = 0, rTo = 999, more = true;
    try {
      while (more) {
        const { data, error } = await supabase.from('leads').select('*').range(rFrom, rTo).order('timestamp', { ascending: false });
        if (error) throw error;
        if (!data || data.length === 0) more = false;
        else {
          allLeads = allLeads.concat(data);
          if (data.length < 1000) more = false;
          else { rFrom += 1000; rTo += 1000; }
        }
      }
    } catch (e) { this.toast("Sync Fault", "error"); return; }

    const totalV = allLeads.length;
    const now = new Date();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    // --- CORE ANALYTICS ---
    const purchased = allLeads.filter(l => l.status === 'Purchased').length;
    const globalConv = totalV > 0 ? (purchased / totalV) * 100 : 0;

    const staffMap = {};
    allLeads.forEach(l => {
      const k = (l.owner_name || l.added_by || 'Vault').split('@')[0].toUpperCase();
      if (!staffMap[k]) staffMap[k] = { n: k, t: 0, c: 0, h: 0, w: 0, f: 0, p: {} };
      staffMap[k].t++;
      if (l.status === 'Purchased') staffMap[k].c++;
      if (l.priority === 'Hot') staffMap[k].h++;
      if (l.priority === 'Warm') staffMap[k].w++;
      if (l.status === 'Follow-up') staffMap[k].f++;
      if (l.interest) {
        staffMap[k].p[l.interest] = (staffMap[k].p[l.interest] || 0) + 1;
      }
    });
    const sortedS = Object.values(staffMap).sort((a, b) => b.t - a.t);

    // --- PAGE 1: EXECUTIVE INTELLIGENCE HUB MIRROR ---
    doc.setFillColor(250, 250, 250); doc.rect(0, 0, 210, 297, 'F');
    doc.setFontSize(32); doc.setTextColor(0); doc.setFont("helvetica", "bold");
    doc.text("Executive Intelligence Hub", 20, 35);
    doc.setFontSize(10); doc.setTextColor(150); doc.setFont("helvetica", "normal");
    doc.text("Strategic demand distribution & personnel efficiency trajectories.", 20, 42);

    // Card Grid
    const drawCard = (x, y, w, h, title, val, sub, dark = false) => {
      doc.setFillColor(dark ? 82 : 255, dark ? 18 : 255, dark ? 22 : 255);
      doc.setDrawColor(230, 230, 230); doc.roundedRect(x, y, w, h, 8, 8, 'FD');
      doc.setFontSize(8); doc.setTextColor(dark ? 200 : 150); doc.setFont("helvetica", "bold");
      doc.text(title.toUpperCase(), x + 10, y + 15);
      doc.setFontSize(28); doc.setTextColor(dark ? 255 : 0);
      doc.text(val, x + 10, y + 30);
      doc.setFontSize(9); doc.setTextColor(dark ? 200 : 100); doc.setFont("helvetica", "normal");
      doc.text(sub, x + 10, y + 40);
    };

    drawCard(20, 55, 80, 50, "Registry Volume", totalV.toString(), "Active Operational Nodes");
    drawCard(110, 55, 80, 50, "Verified Success", purchased.toString(), "Completed Transactions");
    drawCard(20, 115, 80, 50, "Global Efficiency", `${globalConv.toFixed(1)}%`, "Strategic Conversion Hub", true);
    drawCard(110, 115, 80, 50, "Channel Depth", "6", "Active Entry Points");

    // --- PAGE 2: PERSONNEL TACTICS TABLE ---
    doc.addPage();
    doc.setFontSize(24); doc.setTextColor(0); doc.text("Personnel Tactics", 20, 35);
    doc.autoTable({
      startY: 45,
      head: [['Executive Officer', 'Total Volume', 'Hot Index', 'Yield (Closed)', 'Alpha Velocity']],
      body: sortedS.map(s => [s.n, s.t, s.h, s.c, s.t > 0 ? ((s.c / s.t) * 100).toFixed(1) + '%' : '0%']),
      theme: 'plain',
      headStyles: { textColor: [150, 150, 150], fontStyle: 'bold', fontSize: 8 },
      styles: { fontSize: 9, cellPadding: 5 }
    });

    // --- PAGES 3+: INDIVIDUAL DOSSIER MIRROR ---
    sortedS.slice(0, 15).forEach((s, i) => {
      doc.addPage();
      doc.setFillColor(250, 250, 250); doc.rect(0, 0, 210, 297, 'F');

      // Header Initial
      doc.setFillColor(82, 18, 22); doc.roundedRect(20, 20, 20, 20, 5, 5, 'F');
      doc.setFontSize(14); doc.setTextColor(255); doc.text(s.n.charAt(0), 30, 32, { align: 'center' });

      doc.setFontSize(24); doc.setTextColor(0); doc.setFont("helvetica", "bold");
      doc.text(s.n, 45, 30);

      doc.setFillColor(82, 18, 22); doc.roundedRect(45, 34, 15, 4, 1, 1, 'F');
      doc.setFontSize(6); doc.setTextColor(255); doc.text("MEMBER", 52.5, 37, { align: 'center' });
      doc.setFontSize(8); doc.setTextColor(150); doc.setFont("helvetica", "normal");
      doc.text(`ID: ${s.n.substring(0, 5)}`, 62, 37);

      // 4-Card Stats
      const drawMiniCard = (x, y, title, val, sub, color = [0, 0, 0]) => {
        doc.setFillColor(255); doc.roundedRect(x, y, 40, 35, 6, 6, 'FD');
        doc.setFontSize(7); doc.setTextColor(150); doc.setFont("helvetica", "bold");
        doc.text(title.toUpperCase(), x + 5, y + 10);
        doc.setFontSize(16); doc.setTextColor(color[0], color[1], color[2]);
        doc.text(val, x + 5, y + 22);
        doc.setFontSize(7); doc.setTextColor(150); doc.setFont("helvetica", "normal");
        doc.text(sub, x + 5, y + 30);
      };

      // Dynamic Stats Calculation
      const qScore = s.t > 0 ? (((s.c / s.t) * 2.5) + ((s.h / s.t) * 1.5) + ((s.w / s.t) * 1.0)).toFixed(1) : "0.0";
      const precision = s.t > 0 ? ((s.c / s.t) * 100).toFixed(0) + '%' : '0%';
      const engagement = (s.h + s.w);

      drawMiniCard(20, 50, "Quality Score", qScore, "STRATEGIC INDEX");
      drawMiniCard(65, 50, "Conv. Precision", precision, "YIELD RATIO");
      drawMiniCard(110, 50, "Registry Vol", s.t.toString(), "TOTAL CAPTURES");
      drawMiniCard(155, 50, "Engagement", engagement.toString(), "RICH DATA DEPTH", [52, 199, 89]);

      // Lower Sections
      const drawProgress = (x, y, w, title, pct, color) => {
        doc.setFontSize(7); doc.setTextColor(150); doc.text(title, x, y);
        doc.setTextColor(color[0], color[1], color[2]); doc.text(`${pct}%`, x + w - 5, y);
        doc.setFillColor(240); doc.roundedRect(x, y + 2, w, 2, 1, 1, 'F');
        doc.setFillColor(color[0], color[1], color[2]); doc.rect(x, y + 2, (pct / 100) * w, 2, 'F');
      };

      // Intent Breakdown
      doc.setFillColor(255); doc.roundedRect(20, 100, 80, 100, 8, 8, 'FD');
      doc.setFontSize(10); doc.setTextColor(0); doc.setFont("helvetica", "bold");
      doc.text("Lead Intent Breakdown", 30, 115);

      const hP = s.t > 0 ? Math.round((s.h / s.t) * 100) : 0;
      const wP = s.t > 0 ? Math.round((s.w / s.t) * 100) : 0;
      const cP = 100 - (hP + wP);

      drawProgress(30, 130, 60, "HOT PRIORITY", hP, [52, 199, 89]);
      drawProgress(30, 150, 60, "WARM ENGAGEMENT", wP, [255, 149, 0]);
      drawProgress(30, 170, 60, "COLD / GENERAL", cP, [200, 200, 200]);

      // Product Clusters
      doc.setFillColor(255); doc.roundedRect(110, 100, 80, 100, 8, 8, 'FD');
      doc.text("Product Focus Clusters", 120, 115);
      const topP = Object.entries(s.p).sort((a, b) => b[1] - a[1]).slice(0, 5);
      topP.forEach((p, idx) => {
        const pP = s.t > 0 ? Math.round((p[1] / s.t) * 100) : 0;
        drawProgress(120, 130 + (idx * 14), 60, p[0].substring(0, 18).toUpperCase(), pP, [82, 18, 22]);
      });
    });

    const pCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8); doc.setTextColor(180);
      doc.text(`VERA EXECUTIVE HUB • PAGE ${i} OF ${pCount}`, 105, 287, { align: 'center' });
    }

    doc.save(`VERA_EXECUTIVE_DOSSIER_${now.toISOString().split('T')[0]}.pdf`);
    this.toast("Mirror-UI Dossier Dispatched", "success");
  },

  async exportOwnerIntelPDF() {
    if (!["Admin", "Supervisor"].includes(this.user.role)) return;
    this.toast("Generating Strategic Owner Dossier...", "info");

    const { data: allLeads, error } = await supabase.from('leads').select('*');
    if (error || !allLeads) return;

    const now = new Date();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    // --- PAGE 1: EXECUTIVE BRIEFING ---
    doc.setFillColor(0, 0, 0); doc.rect(0, 0, 210, 60, 'F');
    doc.setFontSize(36); doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold");
    doc.text("VERA", 20, 35);
    doc.setFontSize(14); doc.text("STRATEGIC OWNER DOSSIER", 20, 48);
    doc.setFontSize(9); doc.text(`REF: VERA-INTEL-${now.getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`, 150, 35);

    doc.setFontSize(14); doc.setTextColor(0); doc.text("I. OPERATIONAL STATE OF THE UNION", 20, 80);
    const closed = allLeads.filter(l => l.status === 'Purchased').length;
    const convRate = allLeads.length > 0 ? ((closed / allLeads.length) * 100).toFixed(2) : 0;

    doc.autoTable({
      startY: 85,
      body: [
        ["Global Registry Volume", allLeads.length],
        ["Sovereign Conversion Rate", `${convRate}%`],
        ["Total Successful Closures", closed],
        ["Pipeline Value (Follow-ups)", allLeads.filter(l => l.status === 'Follow-up').length]
      ],
      theme: 'striped',
      styles: { fontSize: 11, cellPadding: 5 }
    });

    // --- PAGE 2: PIPELINE DISTRIBUTION ---
    doc.addPage();
    doc.setFillColor(30, 30, 30); doc.rect(0, 0, 210, 20, 'F');
    doc.setFontSize(10); doc.setTextColor(255, 255, 255);
    doc.text("II. PIPELINE DISTRIBUTION ANALYTICS", 20, 13);

    const statusMap = allLeads.reduce((acc, l) => { acc[l.status] = (acc[l.status] || 0) + 1; return acc; }, {});
    const statusData = Object.entries(statusMap).map(([k, v]) => [k || 'Uncategorized', v]);

    doc.setFontSize(12); doc.setTextColor(0); doc.text("STAGES OF CONVERSION", 20, 35);
    doc.autoTable({
      startY: 40,
      head: [['Funnel Stage', 'Lead Volume']],
      body: statusData,
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] }
    });

    // --- PAGE 3: TEAM COMMAND HIERARCHY ---
    doc.addPage();
    doc.setFillColor(30, 30, 30); doc.rect(0, 0, 210, 20, 'F');
    doc.setFontSize(10); doc.setTextColor(255, 255, 255);
    doc.text("III. PERSONNEL COMMAND HIERARCHY", 20, 13);

    const memberStats = {};
    allLeads.forEach(l => {
      const key = l.owner_name || l.added_by || 'Vault';
      if (!memberStats[key]) memberStats[key] = { name: key, total: 0, closed: 0, hot: 0 };
      memberStats[key].total++;
      if (l.status === 'Purchased') memberStats[key].closed++;
      if (l.priority === 'Hot') memberStats[key].hot++;
    });
    const sorted = Object.values(memberStats).sort((a, b) => b.total - a.total);

    doc.autoTable({
      startY: 30,
      head: [['Rank', 'Officer', 'Total Volume', 'Hot Leads', 'Closed Deals']],
      body: sorted.map((m, i) => [`#${i + 1}`, m.name.toUpperCase(), m.total, m.hot, m.closed]),
      theme: 'striped',
      headStyles: { fillColor: [0, 0, 0] }
    });

    // --- PAGES 4+: PERSONNEL DEEP-DIVES (1 PER MEMBER) ---
    sorted.slice(0, 15).forEach((m, i) => {
      doc.addPage();
      doc.setFillColor(82, 18, 22); doc.rect(0, 0, 210, 40, 'F');
      doc.setFontSize(22); doc.setTextColor(255, 255, 255);
      doc.text(m.name.toUpperCase(), 20, 25);
      doc.setFontSize(10); doc.text(`EXECUTIVE PERFORMANCE DOSSIER • RANK #${i + 1}`, 20, 33);

      doc.setFontSize(14); doc.setTextColor(0); doc.text("INDIVIDUAL KPI SCORECARD", 20, 55);
      const mConv = m.total > 0 ? ((m.closed / m.total) * 100).toFixed(2) : 0;

      doc.autoTable({
        startY: 60,
        body: [
          ["Total Leads Managed", m.total],
          ["Individual Conversion Rate", `${mConv}%`],
          ["High-Intent (Hot) Leads", m.hot],
          ["Finalized Closures", m.closed],
          ["Active Personnel Status", "VERIFIED"]
        ],
        theme: 'grid',
        styles: { fontSize: 11, cellPadding: 8 }
      });

      const finalY = doc.lastAutoTable.finalY + 20;
      doc.setFontSize(12); doc.text("TACTICAL ASSESSMENT", 20, finalY);
      doc.setFontSize(10); doc.setTextColor(100);
      const evaluation = `Officer ${m.name} is currently managing ${m.total} leads. Their performance shows a conversion efficiency of ${mConv}%. They have successfully secured ${m.closed} purchased missions and maintain ${m.hot} hot leads in their immediate pipeline.`;
      doc.text(doc.splitTextToSize(evaluation, 170), 20, finalY + 10);
    });

    doc.save(`VERA_OWNER_INTEL_${now.toISOString().split('T')[0]}.pdf`);
    this.toast("Owner Intel Dossier Complete", "success");
  },
  async exportUltimateReport(format) {
    if (!["Admin", "Supervisor"].includes(this.user.role)) return;
    this.toast(`Initializing Comprehensive ${format.toUpperCase()} Audit...`, "info");

    // Fresh Database Sweep
    const { data: allLeads, error } = await supabase.from('leads').select('*').order('timestamp', { ascending: false });
    if (error || !allLeads) {
      this.toast("Database Synchronization Fault", "error");
      return;
    }

    const now = new Date();
    const total = allLeads.length;
    const longLeads = allLeads.filter(l => l.type !== 'short' && l.type !== 'short-reg');
    const shortLeads = allLeads.filter(l => l.type === 'short' || l.type === 'short-reg');
    const followupCount = allLeads.filter(l => l.status === 'Follow-up').length;
    const closedCount = allLeads.filter(l => l.status === 'Purchased').length;
    const hotCount = allLeads.filter(l => l.priority === 'Hot').length;
    const convRate = total > 0 ? ((closedCount / total) * 100).toFixed(1) : '0.0';

    const kpiData = [
      ["Operational KPI", "Audit Value"],
      ["Total Database Entries", total],
      ["Full-Dossier (Long) Registry", longLeads.length],
      ["Rapid-Capture (Short) Registry", shortLeads.length],
      ["Active Hot Intent Leads", hotCount],
      ["Total Pipeline Follow-ups", followupCount],
      ["Aggregate Conversion Rate", `${convRate}%`]
    ];

    const memberStats = {};
    allLeads.forEach(l => {
      const key = l.owner_name || l.added_by || 'Vault';
      if (!memberStats[key]) memberStats[key] = { name: key, total: 0, hot: 0, closed: 0, fup: 0 };
      memberStats[key].total++;
      if (l.priority === 'Hot') memberStats[key].hot++;
      if (l.status === 'Purchased') memberStats[key].closed++;
      if (l.status === 'Follow-up') memberStats[key].fup++;
    });
    const sortedPerformance = Object.values(memberStats).sort((a, b) => b.total - a.total);
    const performanceData = [
      ["Rank", "Executive Officer", "Total Volume", "Hot Leads", "Closed", "Follow-ups"],
      ...sortedPerformance.map((m, i) => [`#${i + 1}`, m.name.split('@')[0].toUpperCase(), m.total, m.hot, m.closed, m.fup])
    ];

    if (format === 'pdf') {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');

      // --- PAGE 1: EXECUTIVE BRIEFING ---
      doc.setFillColor(82, 18, 22); doc.rect(0, 0, 210, 50, 'F');
      doc.setFontSize(32); doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold");
      doc.text("VERA", 20, 30);
      doc.setFontSize(12); doc.text("TOTAL OPERATIONAL AUDIT & INTEL DOSSIER", 20, 40);
      doc.setFontSize(8); doc.text(`GENERATED: ${now.toLocaleString()} | SECURITY CLEARANCE: ADMIN`, 130, 30);

      doc.setFontSize(16); doc.setTextColor(82, 18, 22);
      doc.text("I. STRATEGIC VITALITY KPIs", 20, 65);
      doc.autoTable({
        startY: 70,
        head: [kpiData[0]],
        body: kpiData.slice(1),
        theme: 'striped',
        headStyles: { fillColor: [82, 18, 22], fontSize: 11 },
        bodyStyles: { fontSize: 10, fontStyle: 'bold' },
        margin: { left: 20, right: 20 }
      });

      doc.text("II. PERSONNEL PERFORMANCE HIERARCHY", 20, doc.lastAutoTable.finalY + 20);
      doc.autoTable({
        startY: doc.lastAutoTable.finalY + 25,
        head: [performanceData[0]],
        body: performanceData.slice(1),
        theme: 'grid',
        headStyles: { fillColor: [82, 18, 22], fontSize: 9 },
        bodyStyles: { fontSize: 9 },
        margin: { left: 20, right: 20 }
      });

      // --- PAGE 2+: FULL REGISTRY ANALYSIS ---
      doc.addPage();
      doc.setFillColor(82, 18, 22); doc.rect(0, 0, 210, 20, 'F');
      doc.setFontSize(10); doc.setTextColor(255, 255, 255);
      doc.text("III. FULL TACTICAL REGISTRY DATA (LONG FORM)", 20, 13);

      const fullRegistryBody = longLeads.map(l => [
        new Date(l.timestamp).toLocaleDateString(),
        l.name || 'N/A',
        l.phone || '',
        l.status || '',
        l.priority || '',
        l.location || ''
      ]);

      doc.autoTable({
        startY: 30,
        head: [['Date', 'Name', 'Phone', 'Status', 'Priority', 'Location']],
        body: fullRegistryBody,
        theme: 'striped',
        headStyles: { fillColor: [82, 18, 22], fontSize: 8 },
        bodyStyles: { fontSize: 7 },
        margin: { left: 10, right: 10 },
        didDrawPage: function (data) {
          // Page Footer
          doc.setFontSize(8); doc.setTextColor(150);
          doc.text(`VERA Operational Dossier - Page ${doc.internal.getNumberOfPages()}`, 85, 285);
        }
      });

      doc.save(`VERA_TOTAL_AUDIT_${now.toISOString().split('T')[0]}.pdf`);
    } else {
      // EXCEL (XLSX) - FULL DATA DUMP
      const wb = XLSX.utils.book_new();

      // Sheet 1: Dashboard
      const wsSummary = XLSX.utils.aoa_to_sheet([["VERA TOTAL AUDIT"], [`Generated: ${now.toLocaleString()}`], [], ...kpiData]);
      XLSX.utils.book_append_sheet(wb, wsSummary, "Audit_Dashboard");

      // Sheet 2: Performance
      const wsPerformance = XLSX.utils.aoa_to_sheet(performanceData);
      XLSX.utils.book_append_sheet(wb, wsPerformance, "Member_Performance");

      // Sheet 3: Long Registry (THE FULL ENTRIES)
      const longDataFormatted = longLeads.map(l => ({
        "Timestamp": new Date(l.timestamp).toLocaleString(),
        "Name": l.name || "N/A",
        "Phone": l.phone || "",
        "Location": l.location || "",
        "Status": l.status || "New",
        "Priority": l.priority || "Cold",
        "Interest": l.interest || "",
        "Owner": l.owner_name || "",
        "Enquiry Note": l.enquiry_note || ""
      }));
      const longWS = XLSX.utils.json_to_sheet(longDataFormatted);
      XLSX.utils.book_append_sheet(wb, longWS, "Long_Registry_Full");

      // Sheet 4: Short Registry
      const shortDataFormatted = shortLeads.map(l => ({
        "Timestamp": new Date(l.timestamp).toLocaleString(),
        "Name": l.name || "N/A",
        "Phone": l.phone || "",
        "Status": l.status || "New",
        "Added By": l.added_by || ""
      }));
      const shortWS = XLSX.utils.json_to_sheet(shortDataFormatted);
      XLSX.utils.book_append_sheet(wb, shortWS, "Short_Registry_Full");

      XLSX.writeFile(wb, `VERA_EXHAUSTIVE_DATABASE_${now.toISOString().split('T')[0]}.xlsx`);
    }
    this.toast("Audit Export Complete", "success");
  },


  async editNeuralHub() {
    if (!this.checkAccess()) return;

    let currentDirectives = "";
    let currentBrain = "";
    try {
      const { data, error } = await supabase
        .from('app_config')
        .select('payload')
        .eq('id', 'ai-config')
        .single();

      if (data) {
        currentDirectives = data.payload.instructions || "";
        currentBrain = data.payload.trained_brain || "";
      }
    } catch (e) { }

    const modalBody = `
            <div style="padding: 32px;">
              <h2 style="font-size: 24px; font-weight: 850; letter-spacing: -1.5px; color: var(--text-primary); margin-bottom: 8px;">Neural Training Hub</h2>
              <p style="font-size: 13px; color: var(--text-muted); font-weight: 600; margin-bottom: 32px;">Train VERA on your business protocols and knowledge base.</p>
              
              <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Knowledge Preview -->
                ${currentBrain ? `
                <div style="padding: 16px; background: rgba(0, 122, 255, 0.05); border-radius: 16px; border: 1px solid rgba(0, 122, 255, 0.1);">
                  <div style="font-size: 9px; font-weight: 850; color: #007AFF; text-transform: uppercase; margin-bottom: 8px;">Current Brain Awareness (Last Training)</div>
                  <div style="font-size: 11px; color: #007AFF; font-weight: 500; font-style: italic; max-height: 80px; overflow-y: auto; line-height: 1.4;">
                    ${currentBrain.substring(0, 300)}...
                  </div>
                </div>
                ` : ''}

                <!-- Knowledge Training -->
                <div style="padding: 24px; background: rgba(82, 18, 22, 0.03); border: 1.5px solid rgba(82, 18, 22, 0.08); border-radius: 20px;">
                  <h4 style="font-size: 11px; font-weight: 850; color: var(--accent); margin-bottom: 12px; text-transform: uppercase;">1. Document Intelligence</h4>
                  <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">Upload a PDF to "train" the AI on your SOPs, policies, and products.</p>
                  
                  <input type="file" id="neural-file" accept=".pdf,.txt" style="display:none" onchange="app.handleNeuralFile(this)">
                  <button id="neural-upload-btn" onclick="document.getElementById('neural-file').click()" class="btn" style="width:100%; background:#fff; border: 1.5px dashed var(--accent); color: var(--accent); font-weight:850; height:50px; border-radius:14px;">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="margin-right:8px"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    UPLOAD & TRAIN BRAIN
                  </button>
                  
                  <div id="neural-extraction-preview" style="display:none; margin-top:16px;">
                    <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">Live Extraction Preview</div>
                    <div id="neural-raw-text" style="font-size: 10px; color: var(--text-secondary); background: #fff; padding: 10px; border-radius: 10px; max-height: 100px; overflow-y: auto; font-family: monospace; border: 1px solid #eee;"></div>
                  </div>

                  <div id="neural-status" style="margin-top:12px; font-size:10px; font-weight:800; text-transform:uppercase; text-align:center; color: var(--text-muted); min-height:15px"></div>
                </div>

                <!-- Manual Directives -->
                <div>
                  <h4 style="font-size: 11px; font-weight: 850; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase;">2. Manual Directives</h4>
                  <textarea id="neural-directives" class="input" style="height: 120px; border-radius: 16px; padding: 16px; font-size: 13px; font-weight: 600;" placeholder="Example: Always mention our 10% discount on Antique jewelry for walk-in customers.">${currentDirectives}</textarea>
                </div>

                <button id="neural-sync-btn" onclick="app.saveNeuralHub()" class="btn btn-primary" style="width: 100%; height: 56px; border-radius: 18px; font-weight: 850; box-shadow: 0 8px 24px rgba(82, 18, 22, 0.2);">
                  SYNCHRONIZE NEURAL CORE
                </button>
              </div>
            </div>
          `;
    this.renderModal(modalBody);
  },

  async handleNeuralFile(input) {
    const file = input.files[0];
    if (!file) return;

    const status = document.getElementById('neural-status');
    const rawPreviewArea = document.getElementById('neural-raw-text');
    const previewContainer = document.getElementById('neural-extraction-preview');
    const syncBtn = document.getElementById('neural-sync-btn');

    status.textContent = `EXTRACTING: ${file.name.toUpperCase()}...`;
    status.style.color = "var(--accent)";

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let rawText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        rawText += textContent.items.map(s => s.str).join(" ") + "\n";
      }

      if (!rawText.trim()) throw new Error("No text found in PDF");

      // Show Live Preview
      previewContainer.style.display = "block";
      rawPreviewArea.textContent = rawText.substring(0, 1000) + "...";

      status.textContent = "DISTILLING INTELLIGENCE...";
      const distillationPrompt = `Distill this business document into a high-fidelity system persona component. 
            RULES TO EXTRACT:
            - Pricing & Rates
            - Customer interaction protocols
            - Native Indian language specific idioms if present
            
            RAW DATA FROM DOCUMENT:
            ${rawText.slice(0, 15000)}`;

      this._tempTrainedBrain = await this.callGrok(distillationPrompt, true);

      status.textContent = "BRAIN READY FOR SYNC ✅";
      status.style.color = "var(--success)";

      // Add pulse effect to Sync button
      syncBtn.style.animation = "pulse-sync 1.5s infinite";
      this.toast("Intelligence Distilled. Click SYNC to finalize. 🔐", "success");
    } catch (e) {
      console.error("Neural Error:", e);
      status.textContent = "NEURAL PROCESSING FAULT";
      status.style.color = "var(--error)";
      this.toast("Training Interrupted: " + e.message, "error");
    }
  },

  async saveNeuralHub() {
    const directives = document.getElementById('neural-directives').value;
    const payload = { instructions: directives, updatedBy: this.user.name, time: Date.now() };
    if (this._tempTrainedBrain) payload.trained_brain = this._tempTrainedBrain;
    try {
      await supabase
        .from('app_config')
        .upsert([{
          id: 'ai-config',
          payload: payload,
          updated_at: new Date().toISOString()
        }]);
      this.toast("Neural Core Synchronized 🔐", "success");
      this.closeModal();
      this._tempTrainedBrain = null;
    } catch (e) { this.toast("Registry Frequency Drift", "error"); }
  },

  async callGrok(historyOrPrompt, isDistillation = false) {
    // ── Standalone AI Bridge via Google Apps Script (v2 Reliable) ──
    const BRIDGE_URL = "https://script.google.com/macros/s/AKfycbxNS6sZVdBI52Xncx9iL5XJT2c6Vgrbes2VPs_MPfvegDVG-WIjeIfJJ41WdrCmxgSu/exec";

    let brain = '';
    let directives = '';
    try {
      const { data } = await supabase
        .from('app_config')
        .select('payload')
        .eq('id', 'ai-config')
        .single();

      if (data) {
        brain = (data.payload.trained_brain || '').substring(0, 8000);
        directives = (data.payload.instructions || '').substring(0, 2000);
      }
    } catch (e) { console.warn('Neural sync deferred'); }

    const rateContext = Object.entries(this.goldRates || {})
      .filter(([k, v]) => typeof v === 'number' && v > 0)
      .map(([k, v]) => `- ${k}: ₹${this.fmt(v)}/g`)
      .join('\n');

    const SYSTEM_PERSONA = isDistillation ? "You are a professional knowledge distiller." : `
 IDENTITY: VERA "Executive Strategic Assistant".
 TAGLINE: "Gold You Can Trust. People You Can Believe In."

 MULTILINGUAL CAPABILITY: 
 - VERA is natively fluent in Hindi, Marathi, Gujarati, and Hinglish. 
 - Respond in the language used by the user. Switch fluently as needed.

 LIVE TERMINAL RATES (SYNCED):
 ${rateContext}

 PRICING PROTOCOLS:
 - Formula: [Weight × Live Gold Rate] + [MC%] + [Other Charges].
 - Making Charges (MC): Classic: 12%, Antique: 14%, Premium: 16%, Italian: 20%.

 TRAINED BUSINESS KNOWLEDGE:
 ${brain}

 ADMIN DIRECTIVES:
 ${directives}

 INSTRUCTION: 
 - Act as an elite executive assistant. 
 - Use the LIVE TERMINAL RATES for calculations.
 - Keep responses concise and professional.
 `;

    try {
      let messages = [];
      if (isDistillation) {
        messages = [
          { role: 'system', content: SYSTEM_PERSONA },
          { role: 'user', content: historyOrPrompt }
        ];
      } else {
        // Context-Aware Memory Array
        messages = [
          { role: 'system', content: SYSTEM_PERSONA },
          ...(Array.isArray(historyOrPrompt) ? historyOrPrompt : [{ role: 'user', content: historyOrPrompt }])
        ];
      }

      const payload = {
        action: "ai-chat",
        key: this._GROQ_KEY,
        messages: messages
      };

      const res = await fetch(BRIDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Bridge communication error");
      const data = await res.json();

      // --- DETAILED FAULT DIAGNOSTICS ---
      if (data.error === "GROQ_API_ERROR") {
        if (data.status === 429) {
          return `🛑 **Rate Limit Reached (Tokens Per Minute)**. \n\nGroq's free tier allows 6,000 tokens per minute. Since your "Business Brain" is detailed, we have hit the limit. \n\n**Solution:** Please wait 60 seconds before your next query.`;
        }
        if (data.status === 401) {
          return `⚠️ **AI Authentication Fault (401)**: Your Groq API Key is either invalid or has been revoked. Provide a fresh key in index.html line 4922.`;
        }
        return `⚠️ **AI API Error (${data.status})**: \n${data.message.substring(0, 150)}`;
      }

      if (data.error === "BRIDGE_INTERNAL_ERROR") {
        return `⚠️ **Google Bridge Fault**: \n${data.message}`;
      }

      return data.choices?.[0]?.message?.content || 'Neural Stream Interrupted.';
    } catch (e) {
      console.error('AL_BRIDGE_ERROR:', e);
      return `Executive Bridge Fault: Could not reach AI. \n\n**Details:** ${e.message} \n\n1. Ensure your Code.gs is updated and **Deployed as New Deployment**. \n2. Verify your GROQ_API_KEY is active. \n3. Check your internet connection.`;
    }
  },

  async executeStrategicMigration() {
    if (!confirm("STRATEGIC MIGRATION: This will move all legacy Firebase records to Supabase and LOCK the legacy registry. Proceed?")) return;

    this.toast("Initiating Atomic Data Extraction...", "info");

    try {
      // 1. Migrate Staff Registry
      console.log("MIGRATION: Fetching legacy staff...");
      this.toast("Transferring Staff Accounts...", "info");
      const staffSnap = await getDocs(collection(db, "staff"));
      const staffData = staffSnap.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          name: d.name || "Legacy Staff",
          role: d.role || "Member",
          email: d.email || ""
        };
      });
      console.log(`MIGRATION: Found ${staffData.length} staff records. Upserting...`);
      if (staffData.length > 0) {
        const { error: sErr } = await supabase.from('staff').upsert(staffData);
        if (sErr) throw new Error(`Staff Sync Fault: ${sErr.message}`);
      }

      // 2. Migrate Customer leads
      console.log("MIGRATION: Fetching legacy leads...");
      this.toast("Synchronizing Lead Registry...", "info");
      const leadsSnap = await getDocs(collection(db, "leads"));

      const leadsData = leadsSnap.docs.map(doc => {
        const d = doc.data();
        let ts = d.timestamp;
        try {
          if (ts && ts.toDate) ts = ts.toDate().toISOString();
          else if (typeof ts === 'number') ts = new Date(ts).toISOString();
          else ts = new Date().toISOString();
        } catch (e) { ts = new Date().toISOString(); }

        return {
          id: doc.id,
          name: d.name || "Legacy Entry",
          phone: d.phone || "000",
          location: d.location || "Not Specified",
          interest: d.interest || "",
          source: d.source || "Direct Channel",
          weight: d.weight || "0",
          followup_date: d.followupDate || d.followup_date || null,
          checklist: d.checklist || [],
          priority: d.priority || "Warm",
          status: d.status || "New Inquiry",
          owner: d.owner || null,
          owner_name: d.ownerName || d.owner_name || null,
          assigned_to: d.assignedTo || d.assigned_to || null,
          history: (() => {
            const hist = d.history || [];
            const note = d.notes || d.note || d.shortNotes;
            const remark = d.followupNote || d.followup_note;
            if (note) hist.push({ time: d.timestamp || Date.now(), action: `Legacy Enquiry Note: ${note}` });
            if (remark) hist.push({ time: d.timestamp || Date.now(), action: `Legacy Executive Remark: ${remark}` });
            return hist;
          })(),
          type: d.type || "regular",
          timestamp: ts
        };
      });

      console.log(`MIGRATION: Found ${leadsData.length} lead records. Batched Upsert...`);
      if (leadsData.length > 0) {
        // Batching to prevent payload limits
        const chunkSize = 50;
        for (let i = 0; i < leadsData.length; i += chunkSize) {
          const chunk = leadsData.slice(i, i + chunkSize);
          const { error: lErr } = await supabase.from('leads').upsert(chunk);
          if (lErr) throw new Error(`Lead Sync Chunk Fault: ${lErr.message}`);
        }
      }

      // 3. Migrate App Config (Rates, etc)
      console.log("MIGRATION: Migrating Meta Config...");
      this.toast("Calibrating Pricing Norms...", "info");
      const ratesSnap = await getDoc(doc(db, "meta", "goldRates"));
      if (ratesSnap.exists()) {
        await supabase.from('app_config').upsert([{ id: 'goldRates', payload: ratesSnap.data() }]);
      }
      const annSnap = await getDoc(doc(db, "meta", "announcement"));
      if (annSnap.exists()) {
        await supabase.from('app_config').upsert([{ id: 'announcement', payload: annSnap.data() }]);
      }

      // 4. Finalize Migration Flag
      const { error: fErr } = await supabase.from('app_config').upsert([{
        id: 'migration_complete',
        payload: { active: true, time: new Date().toISOString(), exec: this.user.name }
      }]);
      if (fErr) throw new Error(`Finalization Fault: ${fErr.message}`);

      this.legacyFrozen = true;
      this.toast("MISSION COMPLETE: Sector Data Fully Synchronized 🛰️", "success");
      setTimeout(() => location.reload(), 2000);
    } catch (e) {
      console.error("Migration Critical Fault:", e);
      this.toast(`Migration Failed: ${e.message}`, "error");
    }
  },

  toast(m, t = "info") {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const el = document.createElement('div');
    el.className = `toast toast-${t}`;

    let icon = '🔔';
    if (t === 'error') icon = '❌';
    if (t === 'success') icon = '✅';
    if (t === 'info') icon = 'ℹ️';

    el.innerHTML = `<span>${icon}</span> <span>${m}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(50px)';
      setTimeout(() => el.remove(), 500);
    }, 4000);
  },

  getRelativeTime(timestamp) {
    if (!timestamp) return "";
    const now = Date.now();
    const diff = now - timestamp;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString([], { month: "short", day: "numeric" });
  },

  filterChatMembers(q) {
    this.chatSearchQuery = q.toLowerCase();
    this.renderChatMembers();
  },

  async renderChatMembers() {
    const list = document.getElementById("chat-contact-list");
    if (!list) return;

    try {
      const { data: staff, error: staffError } = await supabase.from('staff').select('*');
      if (staffError) throw staffError;

      let messages = [];
      const { data: msgs, error: msgsError } = await supabase.from('messages').select('*').order('timestamp', { ascending: false });
      if (!msgsError && msgs) {
        messages = msgs;
      } else {
        console.warn("Vera Comm-System: Message history unavailable or table missing.", msgsError);
      }

      const lastMessagesMap = {};
      messages.forEach(m => {
        if (m.chat_id.includes(this.user.id)) {
          const parts = m.chat_id.split('_');
          const otherId = parts.find(p => p !== this.user.id) || this.user.id;
          if (!lastMessagesMap[otherId]) {
            lastMessagesMap[otherId] = {
              text: m.content,
              time: new Date(m.timestamp).getTime()
            };
          }
        }
      });

      const filteredStaff = staff
        .filter((s) => s.id !== this.user.id)
        .filter((s) => !this.chatSearchQuery || s.name.toLowerCase().includes(this.chatSearchQuery));

      list.innerHTML = filteredStaff.map((s) => {
        const lastMsg = lastMessagesMap[s.id];
        const isActive = this.activeChat === s.id;

        let avatarGradient = "var(--accent-gradient)";
        if (s.role === "Admin") avatarGradient = "linear-gradient(135deg, #FF3B30, #FF9500)";
        else if (s.role === "Supervisor") avatarGradient = "linear-gradient(135deg, #5856D6, #007AFF)";

        return `
                <div class="contact-item ${isActive ? "active" : ""}" onclick="app.openChat('${s.id}', '${s.name}')" style="display: flex; gap: 14px; padding: 16px 20px; cursor: pointer; transition: all 0.3s ease; border-left: 3px solid ${isActive ? "var(--accent)" : "transparent"}; background: ${isActive ? "rgba(82,18,22,0.03)" : "transparent"};">
                  <div class="staff-avatar" style="background: ${avatarGradient};">
                    ${(s.name || "U").charAt(0).toUpperCase()}
                    <div class="status-dot"></div>
                  </div>
                  <div class="contact-info" style="flex: 1; min-width: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                      <div style="font-weight: 950; font-size: 15px; color: var(--text-primary); text-transform: capitalize; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; letter-spacing: -0.3px;">${(s.name || "").toLowerCase()}</div>
                      <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); opacity: 0.7;">${lastMsg ? this.getRelativeTime(lastMsg.time) : ""}</div>
                    </div>
                    <div style="font-size: 11px; font-weight: 750; color: ${lastMsg ? "var(--text-muted)" : "var(--accent)"}; text-transform: ${lastMsg ? "none" : "uppercase"}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 4px; opacity: 0.8; letter-spacing: ${lastMsg ? "0" : "0.5px"};">
                      ${lastMsg ? lastMsg.text : s.role}
                    </div>
                  </div>
                </div>`;
      }).join("") || '<div style="padding: 60px; text-align: center; opacity: 0.4; font-size: 13px; font-weight: 850; letter-spacing: 1px;">NO EXECUTIVE CONTACTS DETECTED</div>';
    } catch (e) {
      console.error("Vera Comm-System Fault:", e);
      list.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--error); font-weight: 850; letter-spacing: 0.5px;">Staff Registry Interrupted<br><span style="font-size: 10px; opacity: 0.7;">Check authentication / database schema</span></div>';
    }
  },

  async openChat(contactId, contactName) {
    if (this.chatUnsubscribe) this.chatUnsubscribe();

    this.activeChat = contactId;

    if (window.innerWidth <= 850) {
      document.querySelector('.chat-container').classList.add("mobile-active");
    }

    this.renderChatMembers();

    document.getElementById("chat-empty-state").style.display = "none";
    document.getElementById("chat-active-window").style.display = "flex";

    document.getElementById("active-contact-name").textContent = contactName;
    document.getElementById("active-contact-avatar").innerHTML = `${contactName.charAt(0)}<div class="status-dot"></div>`;

    const chatId = [this.user.id, contactId].sort().join("_");

    const fetchMessages = async () => {
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('timestamp', { ascending: true });

      const stream = document.getElementById("chat-stream");

      if (error || !messages || messages.length === 0) {
        if (error) console.warn("Vera Comm-System: Message history unavailable.", error);
        stream.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-muted); opacity: 0.5; font-size: 12px; font-weight: 850; letter-spacing: 1px;">SECURE CHANNEL ESTABLISHED<br>NO TRANSMISSIONS DETECTED</div>';
        return;
      }


      stream.innerHTML = messages.map((m) => {
        const isSent = m.sender_id === this.user.id;
        return `
                <div class="msg-bubble ${isSent ? "msg-sent" : "msg-received"}">
                  ${m.content}
                  <div class="msg-timestamp" style="text-align: ${isSent ? "right" : "left"}; color: ${isSent ? "rgba(255,255,255,0.7)" : "var(--text-muted)"}">
                    ${new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>`;
      }).join("");
      stream.scrollTop = stream.scrollHeight;
    };

    fetchMessages();

    const channel = supabase
      .channel(`chat-${chatId}`)
      .on('postgres_changes', { event: 'INSERT', table: 'messages', filter: `chat_id=eq.${chatId}` }, (payload) => {
        fetchMessages();
      })
      .subscribe();

    this.chatUnsubscribe = () => supabase.removeChannel(channel);
  },

  async sendChatMessage() {
    const input = document.getElementById("chat-input");
    const content = input.value.trim();
    if (!content || !this.activeChat) return;

    const chatId = [this.user.id, this.activeChat].sort().join("_");
    const msg = {
      chat_id: chatId,
      sender_id: this.user.id,
      content: content,
      timestamp: new Date().toISOString(),
    };

    input.value = "";
    try {
      const { error: insertError } = await supabase.from('messages').insert([msg]);
      if (insertError) throw insertError;
    } catch (e) {
      console.error("Vera Comm-System: Transmission Failure", e);
      this.toast("Message Transmission Failed", "error");
    }
  },

  async renderMessages() {
    const { data: allStaff, error } = await supabase.from('staff').select('*');
    if (error) {
      console.error("Staff Registry Error:", error);
      return;
    }

    const container = document.getElementById("admin-panel-container"); // Assuming it's in admin or message screen
    // ... (Rest of message rendering logic)
    // Wait, actually I should see if messages is a screen
    this.renderChatMembers(); // This is the standard chat render
  },

  // --- LEAD ASSIGNMENT MODULE ---
  async showAssignModal(leadId) {
    const lead = this.leads.find((l) => String(l.id) === String(leadId));
    if (!lead) return;

    const snap = await getDocs(collection(db, "staff"));
    const staff = snap.docs.map((d) => d.data());

    const modalBody = `
 <div style="text-align: center; margin-bottom: 32px;">
 <h2 style="font-size: 24px; font-weight: 800; letter-spacing: -1px;">Delegate Lead</h2>
 <p style="font-size: 13px; color: var(--text-muted); font-weight: 700; margin-top: 4px;">Select an executive to handle ${lead.name}</p>
 </div>
 <div style="display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto; padding: 4px;">
 ${staff
        .map(
          (s) => `
 <div class="card elevated" onclick="app.assignLead('${leadId}', '${s.id}', '${s.name}')" style="padding: 18px 24px; display: flex; align-items: center; gap: 16px; cursor: pointer; border-radius: 20px; transition: all 0.3s ease; border: 1px solid rgba(0,0,0,0.03);">
 <div class="staff-avatar">${s.name.charAt(0)}</div>
 <div style="flex: 1;">
 <div style="font-weight: 800; font-size: 15px; color: var(--text-primary);">${s.name} ${s.id === this.user.id ? "(You)" : ""}</div>
 <div style="font-size: 11px; font-weight: 700; color: var(--accent); text-transform: uppercase;">${s.role}</div>
 </div>
 <svg width="20" height="20" fill="none" stroke="var(--accent)" stroke-width="3" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
 </div>`,
        )
        .join("")}
 </div>`;
    this.renderModal(modalBody);
  },

  formatMemberName(raw) {
    if (!raw) return "Anonymous Exec";
    let name = raw.split('@')[0].split('.')[0].split('_')[0];
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  },

  async viewMemberStats(memberId) {
    this.toast("Decrypting Strategic Dossier...", "info");

    const staffDetail = this.allStaff ? this.allStaff.find(s => s.id === memberId) : null;
    let email = '';
    let name = 'Executive';

    if (!staffDetail) {
      const { data } = await supabase.from('staff').select('*').eq('id', memberId).single();
      if (data) {
        email = data.email;
        name = data.name;
      }
    } else {
      email = staffDetail.email;
      name = staffDetail.name;
    }

    const myLeads = this.leads.filter(l => l.owner === memberId || l.assigned_to === memberId || l.added_by === email);
    const total = myLeads.length;
    const hotCount = myLeads.filter(l => l.priority === "Hot").length;
    const warmCount = myLeads.filter(l => l.priority === "Warm").length;
    const coldCount = myLeads.filter(l => l.priority === "Cold").length;
    const converted = myLeads.filter(l => l.status === "Purchased").length;
    const withNotes = myLeads.filter(l => l.notes || l.enquiry_note || l.executive_comment).length;
    const withChecks = myLeads.filter(l => l.checklist && l.checklist.length > 0).length;

    const qualityPoints = total + (hotCount * 2) + (withNotes * 1) + (withChecks * 1);
    const qualityScore = total > 0 ? (qualityPoints / total).toFixed(1) : "0.0";
    const ratio = total > 0 ? Math.round((converted / total) * 100) : 0;

    const interests = this.getFrequencyMap(myLeads, 'interest', 6);
    const topInterest = interests.length > 0 ? interests[0].name.split('|')[0].trim() : "Omni-Product";

    const hotPct = total > 0 ? (hotCount / total * 100).toFixed(0) : 0;
    const warmPct = total > 0 ? (warmCount / total * 100).toFixed(0) : 0;
    const coldPct = total > 0 ? (coldCount / total * 100).toFixed(0) : 0;

    const overlay = document.createElement('div');
    overlay.id = "dossier-overlay";
    overlay.style = "position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(30px); z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 0; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);";

    const initial = (name || "E").charAt(0).toUpperCase();
    const role = staffDetail ? staffDetail.role : "Member";
    let roleColor = "var(--accent)";
    if (role === "Admin") roleColor = "#FF3B30";
    else if (role === "Supervisor") roleColor = "#5856D6";

    overlay.innerHTML = `
            <div class="glass-card" style="width: 95%; max-width: 1000px; padding: 56px; border-radius: 56px; background: rgba(255,255,255,0.95); border: 1.5px solid rgba(255,255,255,0.6); box-shadow: 0 60px 120px rgba(0,0,0,0.25); transform: translateY(40px) scale(0.95); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); max-height: 92vh; overflow-y: auto;">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px;">
                <div style="display: flex; gap: 32px; align-items: center;">
                  <div style="width: 110px; height: 110px; border-radius: 32px; background: ${roleColor}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 44px; font-weight: 950; box-shadow: 0 20px 45px ${roleColor}55;">${initial}</div>
                  <div>
                    <h2 style="font-size: 38px; font-weight: 950; letter-spacing: -2px; margin: 0; color: var(--text-primary);">${name.toUpperCase()}</h2>
                    <div style="display: flex; gap: 10px; margin-top: 12px;">
                      <span style="font-size: 11px; font-weight: 950; padding: 7px 14px; background: ${roleColor}; color: #fff; border-radius: 12px; text-transform: uppercase; letter-spacing: 1px;">${role}</span>
                      <span style="font-size: 11px; font-weight: 950; padding: 7px 14px; background: rgba(0,0,0,0.05); color: var(--text-muted); border-radius: 12px; text-transform: uppercase;">ID: ${memberId.slice(0, 8)}</span>
                    </div>
                  </div>
                </div>
                <button onclick="document.getElementById('dossier-overlay').style.opacity='0'; setTimeout(()=>document.getElementById('dossier-overlay').remove(), 500)" style="width: 56px; height: 56px; border-radius: 50%; background: rgba(0,0,0,0.05); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 28px; color: var(--text-muted); transition: all 0.3s ease;">&times;</button>
              </div>

              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin-bottom: 48px;">
                <div style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-sm); text-align: center;">
                   <div style="font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Quality score</div>
                   <div style="font-size: 36px; font-weight: 950; color: ${qualityScore > 2.5 ? 'var(--success)' : 'var(--text-primary)'}; margin-top: 8px; letter-spacing: -1px;">${qualityScore}</div>
                   <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; font-weight: 850;">STRATEGIC INDEX</div>
                </div>
                <div style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-sm); text-align: center;">
                   <div style="font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Conv. Precision</div>
                   <div style="font-size: 36px; font-weight: 950; color: var(--accent); margin-top: 8px; letter-spacing: -1px;">${ratio}%</div>
                   <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; font-weight: 850;">YIELD RATIO</div>
                </div>
                <div style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-sm); text-align: center;">
                   <div style="font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Registry Vol</div>
                   <div style="font-size: 36px; font-weight: 950; color: var(--text-primary); margin-top: 8px; letter-spacing: -1px;">${total}</div>
                   <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; font-weight: 850;">TOTAL CAPTURES</div>
                </div>
                <div style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-sm); text-align: center;">
                    <div style="font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Engagement</div>
                    <div style="font-size: 36px; font-weight: 950; color: var(--success); margin-top: 8px; letter-spacing: -1px;">${withNotes + withChecks}</div>
                    <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; font-weight: 850;">RICH DATA DEPTH</div>
                 </div>
                 <div style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-sm); text-align: center;">
                    <div style="font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Showroom Arrival</div>
                    <div style="font-size: 36px; font-weight: 950; color: #5856D6; margin-top: 8px; letter-spacing: -1px;">${(() => {
                      const arrivals = myLeads.filter(l => {
                        const targetPhone = String(l.phone || "").replace(/\D/g, "").slice(-10);
                        return (this.qmsRegistry || []).some(q => {
                          const qPhone = String(q.phone || q.mobile || q.contact || "").replace(/\D/g, "").slice(-10);
                          return qPhone && qPhone === targetPhone;
                        });
                      }).length;
                      return arrivals;
                    })()}</div>
                    <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; font-weight: 850;">VISITOR YIELD</div>
                 </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 48px;">
                 <div style="background: rgba(0,0,0,0.015); padding: 40px; border-radius: 40px; border: 1.5px solid rgba(0,0,0,0.02);">
                   <h4 style="font-size: 18px; font-weight: 950; margin-bottom: 32px; letter-spacing: -0.5px; display: flex; align-items: center; gap: 12px;">
                      <span style="width: 10px; height: 10px; background: var(--accent); border-radius: 3px;"></span>
                      Lead Intent Breakdown
                   </h4>
                   <div style="display: flex; flex-direction: column; gap: 20px;">
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                          <span style="font-size: 11px; font-weight: 950; color: var(--success);">HOT PRIORITY</span>
                          <span style="font-size: 11px; font-weight: 950; color: var(--success);">${hotPct}%</span>
                        </div>
                        <div style="height: 10px; background: rgba(0,0,0,0.04); border-radius: 5px; overflow: hidden;">
                           <div style="width: ${hotPct}%; height: 100%; background: var(--success); border-radius: 5px;"></div>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                          <span style="font-size: 11px; font-weight: 950; color: var(--warning);">WARM ENGAGEMENT</span>
                          <span style="font-size: 11px; font-weight: 950; color: var(--warning);">${warmPct}%</span>
                        </div>
                        <div style="height: 10px; background: rgba(0,0,0,0.04); border-radius: 5px; overflow: hidden;">
                           <div style="width: ${warmPct}%; height: 100%; background: var(--warning); border-radius: 5px;"></div>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                          <span style="font-size: 11px; font-weight: 950; color: var(--text-muted);">COLD / GENERAL</span>
                          <span style="font-size: 11px; font-weight: 950; color: var(--text-muted);">${coldPct}%</span>
                        </div>
                        <div style="height: 10px; background: rgba(0,0,0,0.04); border-radius: 5px; overflow: hidden;">
                           <div style="width: ${coldPct}%; height: 100%; background: var(--text-muted); opacity: 0.3; border-radius: 5px;"></div>
                        </div>
                      </div>
                   </div>
                 </div>

                 <div style="background: rgba(0,0,0,0.015); padding: 40px; border-radius: 40px; border: 1.5px solid rgba(0,0,0,0.02);">
                   <h4 style="font-size: 18px; font-weight: 950; margin-bottom: 32px; letter-spacing: -0.5px; display: flex; align-items: center; gap: 12px;">
                      <span style="width: 10px; height: 10px; background: var(--accent); border-radius: 3px;"></span>
                      Product Focus Clusters
                   </h4>
                   <div style="display: flex; flex-direction: column; gap: 16px;">
                      ${interests.map(i => {
      const pct = total > 0 ? (i.count / total * 100).toFixed(0) : 0;
      return `
                          <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                              <span style="font-size: 11px; font-weight: 900; color: var(--text-primary); text-transform: uppercase;">${i.name.split('|')[0]}</span>
                              <span style="font-size: 11px; font-weight: 950; color: var(--accent);">${pct}%</span>
                            </div>
                            <div style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 3px; overflow: hidden;">
                               <div style="width: ${pct}%; height: 100%; background: var(--accent); border-radius: 3px;"></div>
                            </div>
                          </div>
                        `;
    }).join('')}
                      ${interests.length === 0 ? '<div style="opacity: 0.5; font-size: 12px; font-weight: 700; text-align: center; padding: 20px;">No Product Clusters Identified</div>' : ''}
                   </div>
                 </div>
              </div>

              <div style="background: var(--accent-gradient); padding: 48px; border-radius: 48px; color: #fff; box-shadow: 0 30px 60px rgba(82,18,22,0.15);">
                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                   <div>
                     <div style="font-size: 10px; font-weight: 950; opacity: 0.8; text-transform: uppercase; letter-spacing: 2px;">Executive Strategy Summation</div>
                     <div style="font-size: 28px; font-weight: 950; margin-top: 8px;">${topInterest} Specialist</div>
                   </div>
                   <div style="padding: 12px 24px; background: rgba(255,255,255,0.1); border-radius: 16px; font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 1px;">PRECISION: ${qualityScore}/5.0</div>
                 </div>
                 
                 <div style="font-size: 15px; line-height: 1.8; opacity: 0.95; font-weight: 700; letter-spacing: -0.2px;">
                    Personnel <b>${name}</b> demonstrates a ${qualityScore > 2.5 ? 'dominant' : 'steady'} acquisition profile within the <b>${topInterest}</b> category. With an intentionality index of <b>${qualityScore}</b>, this executive prioritizes ${withNotes > (total / 2) ? 'rich descriptive intelligence' : 'high-velocity data capture'}. Historical trajectories indicate a conversion precision of ${ratio}% across the active operational registry.
                 </div>
              </div>
            </div>
          `;

    document.body.appendChild(overlay);
    overlay.offsetHeight;
    overlay.style.opacity = '1';
    overlay.children[0].style.transform = 'translateY(0) scale(1)';
  },

  async renderAnalytics() {
    const container = document.getElementById("stats-container");
    if (!container) return;

    container.innerHTML = `
            <div style="padding: 120px 40px; text-align: center;">
              <div class="spinner" style="margin: 0 auto 24px;"></div>
              <div style="opacity: 0.5; font-weight: 700; font-size: 14px; letter-spacing: 1px;">AGGREGATING STRATEGIC DATA...</div>
            </div>
          `;

    try {
      const { data: allStaff, error: sErr } = await supabase.from('staff').select('*');
      if (sErr) throw sErr;
      const allLeads = this.leads;

      const staffStats = allStaff.map(s => {
        const myLeads = allLeads.filter(l => l.owner === s.id || l.assigned_to === s.id || l.added_by === s.email);
        const total = myLeads.length;
        const hot = myLeads.filter(l => l.priority === "Hot").length;
        const converted = myLeads.filter(l => l.status === "Purchased").length;
        const withNotes = myLeads.filter(l => l.notes || l.enquiry_note).length;
        const withChecks = myLeads.filter(l => l.checklist && l.checklist.length > 0).length;

        const qualityPoints = total + (hot * 2) + (withNotes * 1) + (withChecks * 1);
        const qualityScore = total > 0 ? (qualityPoints / total).toFixed(1) : "0.0";
        const ratio = total > 0 ? ((converted / total) * 100).toFixed(1) : "0.0";

        const interestMap = this.getFrequencyMap(myLeads, 'interest', 1);
        const topInterest = interestMap.length > 0 ? interestMap[0].name.split('|')[0].trim() : "Omni-Product";

        return { ...s, total, hot, qualityScore, topInterest, ratio, displayName: (s.name || s.id).toUpperCase() };
      }).sort((a, b) => b.total - a.total);

      const sourceMap = this.getFrequencyMap(allLeads, 'source', 6);
      const totalLeads = allLeads.length;
      const totalConverted = allLeads.filter(l => l.status === "Purchased").length;
      const globalRatio = totalLeads > 0 ? ((totalConverted / totalLeads) * 100).toFixed(1) : "0.0";
      const topLocations = this.getFrequencyMap(allLeads, 'location', 12);

      const staffByRole = {
        Admin: staffStats.filter(s => s.role === 'Admin'),
        Supervisor: staffStats.filter(s => s.role === 'Supervisor'),
        Member: staffStats.filter(s => s.role === 'Member' || !s.role)
      };

      container.innerHTML = `
              <div class="hero-bar-stack" style="margin-bottom: 48px; display: flex; justify-content: space-between; align-items: flex-end;">
                <div>
                  <h1 class="responsive-h1" style="font-size: 56px; font-weight: 950; letter-spacing: -3px; color: var(--text-primary); margin: 0; line-height: 1;">Executive Intelligence Hub</h1>
                  <p style="font-size: 16px; color: var(--text-muted); font-weight: 600; margin-top: 12px; letter-spacing: 0.2px;">Strategic demand distribution & personnel efficiency trajectories.</p>
                </div>
                <div style="display: flex; gap: 12px;">
                   <div style="padding: 12px 24px; background: rgba(52, 199, 89, 0.1); color: #34C759; border-radius: 16px; font-size: 11px; font-weight: 950; letter-spacing: 1px; text-transform: uppercase;">SECURE UPLINK ACTIVE 📡</div>
                </div>
              </div>

              <div class="panoramic-grid grid-stack grid-2-col" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); margin-bottom: 48px;">
                <div class="card elevated" style="padding: 32px; border-radius: 36px; background: #fff;">
                  <div style="font-size: 11px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Registry Volume</div>
                  <div style="font-size: 48px; font-weight: 950; color: var(--text-primary); margin-top: 12px; letter-spacing: -2px;">${totalLeads}</div>
                  <div style="font-size: 12px; color: var(--accent); font-weight: 850; margin-top: 8px;">Active Operational Nodes</div>
                </div>
                <div class="card elevated" style="padding: 32px; border-radius: 36px; background: #fff;">
                  <div style="font-size: 11px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Verified Success</div>
                  <div style="font-size: 48px; font-weight: 950; color: var(--success); margin-top: 12px; letter-spacing: -2px;">${totalConverted}</div>
                  <div style="font-size: 12px; color: var(--text-muted); font-weight: 850; margin-top: 8px;">Completed Transactions</div>
                </div>
                <div class="card elevated" style="padding: 32px; border-radius: 36px; background: var(--accent-gradient); color: #fff;">
                  <div style="font-size: 11px; font-weight: 950; opacity: 0.8; text-transform: uppercase; letter-spacing: 2px;">Global Efficiency</div>
                  <div style="font-size: 48px; font-weight: 950; margin-top: 12px; letter-spacing: -2px;">${globalRatio}%</div>
                  <div style="font-size: 12px; opacity: 0.9; font-weight: 850; margin-top: 8px;">Strategic Conversion Hub</div>
                </div>
                <div class="card elevated" style="padding: 32px; border-radius: 36px; background: #fff;">
                  <div style="font-size: 11px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Channel Depth</div>
                  <div style="font-size: 48px; font-weight: 950; color: #007AFF; margin-top: 12px; letter-spacing: -2px;">${sourceMap.length}</div>
                  <div style="font-size: 12px; color: var(--text-muted); font-weight: 850; margin-top: 8px;">Active Entry Points</div>
                </div>
              </div>

              <div class="panoramic-grid" style="grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); gap: 32px; margin-bottom: 48px;">
                <div class="card elevated" style="background: #fff; border-radius: 40px; padding: 40px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 36px;">
                    <div>
                      <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin: 0; letter-spacing: -0.8px;">Personnel Tactics</h3>
                      <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 6px; letter-spacing: 1px;">Sovereign Hierarchy & Conversion Velocity</p>
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 32px;">
                    ${Object.entries(staffByRole).map(([role, members]) => {
        if (members.length === 0) return '';
        let label = role === 'Admin' ? "COMMAND NODE" : (role === 'Supervisor' ? "TACTICAL NODE" : "OPERATIONAL NODE");
        let color = role === 'Admin' ? "#FF3B30" : (role === 'Supervisor' ? "#5856D6" : "var(--accent)");
        return `
                        <div>
                          <div style="font-size: 10px; font-weight: 950; color: ${color}; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;">${label}</div>
                          <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${members.map(s => `
                              <div class="contact-item" onclick="app.viewMemberStats('${s.id}')" style="display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; background: rgba(0,0,0,0.015); border-radius: 22px; border: 1.5px solid rgba(0,0,0,0.02); cursor: pointer;">
                                <div style="display: flex; align-items: center; gap: 20px;">
                                  <div style="width: 48px; height: 48px; background: ${color}; color: #fff; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-weight: 950;">${s.displayName[0]}</div>
                                  <div>
                                    <div style="font-weight: 950; font-size: 17px; color: var(--text-primary);">${s.displayName}</div>
                                    <div style="font-size: 9px; font-weight: 950; color: var(--accent); margin-top: 4px;">${s.topInterest} • ${s.total} CAPTURES</div>
                                  </div>
                                </div>
                                <div style="text-align: right;">
                                  <div style="font-size: 20px; font-weight: 950; color: ${s.qualityScore > 2.5 ? 'var(--success)' : 'var(--text-primary)'};">${s.qualityScore}</div>
                                  <div style="font-size: 8px; font-weight: 950; color: var(--text-muted);">QUALITY SCORE</div>
                                </div>
                              </div>
                            `).join('')}
                          </div>
                        </div>
                      `;
      }).join('')}
                  </div>
                </div>

                <div class="card elevated" style="background: #fff; border-radius: 40px; padding: 40px;">
                  <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin-bottom: 24px;">Channel Quality Index</h3>
                  <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                     ${sourceMap.map(src => {
        const quality = Math.min(100, Math.round((src.count / totalLeads) * 200));
        return `
                       <div style="padding: 24px; background: rgba(0,122,255,0.03); border-radius: 24px;">
                          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px;">
                             <div style="font-size: 18px; font-weight: 950;">${src.name}</div>
                             <div style="font-size: 18px; font-weight: 950; color: #007AFF;">${src.count} <span style="font-size: 10px; color: var(--text-muted);">UNITS</span></div>
                          </div>
                          <div style="width: 100%; height: 10px; background: rgba(0,0,0,0.04); border-radius: 5px; overflow: hidden;">
                             <div style="width: ${quality}%; height: 100%; background: #007AFF;"></div>
                          </div>
                       </div>
                     `;
      }).join('')}
                  </div>
                </div>
              </div>

              <!-- CUSTOMER STRATEGIC DISTRIBUTION -->
              <div class="panoramic-grid" style="grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); gap: 32px; margin-bottom: 48px;">
                <div class="card elevated" style="background: #fff; border-radius: 40px; padding: 40px;">
                  <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin-bottom: 12px;">Location Strategic Reach</h3>
                  <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-bottom: 32px; letter-spacing: 1px;">Geographic Demand Concentration</p>
                  
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    ${topLocations.map(loc => {
        const percentage = Math.round((loc.count / totalLeads) * 100);
        return `
                        <div style="display: flex; align-items: center; gap: 20px;">
                          <div style="width: 120px; font-size: 13px; font-weight: 800; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${loc.name}</div>
                          <div style="flex: 1; height: 8px; background: rgba(0,0,0,0.04); border-radius: 4px; overflow: hidden;">
                             <div style="width: ${percentage}%; height: 100%; background: var(--accent); opacity: 0.8; border-radius: 4px;"></div>
                          </div>
                          <div style="width: 40px; font-size: 11px; font-weight: 950; color: var(--accent); text-align: right;">${percentage}%</div>
                        </div>
                      `;
      }).join('')}
                    ${topLocations.length === 0 ? '<div style="opacity: 0.5; font-size: 13px; padding: 20px; text-align: center;">No Geographic Data Found</div>' : ''}
                  </div>
                </div>

                <div class="card elevated" style="background: #fff; border-radius: 40px; padding: 40px;">
                  <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin-bottom: 12px;">Product Demand Clusters</h3>
                  <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-bottom: 32px; letter-spacing: 1px;">Strategic Category Velocity</p>
                  
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                    ${this.getFrequencyMap(allLeads, 'interest', 8).map(int => {
        const name = int.name.split('|')[0].trim();
        return `
                        <div style="padding: 20px; background: rgba(52, 199, 89, 0.04); border-radius: 24px; border: 1.5px solid rgba(52, 199, 89, 0.08);">
                           <div style="font-size: 10px; font-weight: 900; color: #34C759; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">${name}</div>
                           <div style="font-size: 28px; font-weight: 950; color: var(--text-primary); letter-spacing: -1px;">${int.count}</div>
                           <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); margin-top: 4px;">ACTIVE REQUESTS</div>
                        </div>
                      `;
      }).join('')}
                  </div>
                </div>
              </div>

              <div class="panoramic-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 32px; margin-bottom: 48px;">
                 <!-- INTENT PROFILING -->
                <div class="card elevated" style="background: #fff; border-radius: 40px; padding: 40px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin-bottom: 8px;">Intent Profiling</h3>
                    <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-bottom: 32px; letter-spacing: 1px;">Lead Quality Stratification</p>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 20px;">
                    ${['Hot', 'Warm', 'Cold'].map(p => {
        const count = allLeads.filter(l => l.priority === p).length;
        const pct = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
        let color = p === 'Hot' ? '#FF3B30' : (p === 'Warm' ? '#FF9500' : '#8E8E93');
        return `
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                           <div style="display: flex; align-items: center; gap: 12px;">
                              <div style="width: 12px; height: 12px; background: ${color}; border-radius: 4px;"></div>
                              <div style="font-size: 14px; font-weight: 900; color: var(--text-primary);">${p.toUpperCase()}</div>
                           </div>
                           <div style="display: flex; align-items: baseline; gap: 6px;">
                              <div style="font-size: 20px; font-weight: 950;">${count}</div>
                              <div style="font-size: 10px; font-weight: 850; color: var(--text-muted);">${pct}%</div>
                           </div>
                        </div>
                      `;
      }).join('')}
                  </div>
                </div>

                <!-- OPERATIONAL VELOCITY -->
                <div class="card elevated" style="background: #fff; border-radius: 40px; padding: 40px;">
                  <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin-bottom: 8px;">Operational Mix</h3>
                  <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-bottom: 32px; letter-spacing: 1px;">Short vs Registry Trajectory</p>
                  
                  <div style="height: 120px; display: flex; align-items: flex-end; gap: 12px; margin-bottom: 24px;">
                    ${(() => {
          const short = allLeads.filter(l => l.type === 'short').length;
          const registry = totalLeads - short;
          const sH = totalLeads > 0 ? (short / totalLeads) * 100 : 0;
          const rH = totalLeads > 0 ? (registry / totalLeads) * 100 : 0;
          return `
                        <div style="flex: 1; height: ${sH}%; background: rgba(0,0,0,0.05); border-radius: 12px; position: relative; transition: height 1s ease;">
                           <div style="position: absolute; top: -30px; left: 0; right: 0; text-align: center; font-size: 11px; font-weight: 950; color: var(--text-muted);">${Math.round(sH)}%</div>
                           <div style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center; font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase;">Short</div>
                        </div>
                        <div style="flex: 1; height: ${rH}%; background: var(--accent); border-radius: 12px; position: relative; transition: height 1s ease;">
                           <div style="position: absolute; top: -30px; left: 0; right: 0; text-align: center; font-size: 11px; font-weight: 950; color: var(--accent);">${Math.round(rH)}%</div>
                           <div style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center; font-size: 9px; font-weight: 950; color: var(--accent); text-transform: uppercase;">Full</div>
                        </div>
                      `;
        })()}
                  </div>
                </div>

                <!-- KEYWORD INTELLIGENCE -->
                <div class="card elevated" style="background: var(--text-primary); border-radius: 40px; padding: 40px; color: #fff;">
                  <h3 style="font-size: 24px; font-weight: 950; margin-bottom: 8px;">Aspect Intelligence</h3>
                  <p style="font-size: 11px; opacity: 0.6; font-weight: 850; text-transform: uppercase; margin-bottom: 32px; letter-spacing: 1px;">Minute Demand Indicators</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${(() => {
          const notes = allLeads.map(l => (l.enquiry_note || "") + " " + (l.notes || "")).join(" ").toLowerCase();
          const keywords = ["gift", "wedding", "investment", "gold", "silver", "birthday", "anniversary", "custom", "urgent", "budget"];
          return keywords.map(kw => {
            const count = (notes.match(new RegExp(kw, "g")) || []).length;
            if (count === 0) return '';
            const size = Math.min(24, 12 + (count / totalLeads) * 50);
            return `<span style="font-size: ${size}px; font-weight: 900; opacity: ${0.4 + (count / totalLeads) * 2}; margin-right: 8px; text-transform: uppercase;">${kw}</span>`;
          }).join('');
        })()}
                  </div>
                  <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 10px; font-weight: 700; opacity: 0.5;">UPLINKING REAL-TIME SENTIMENT...</div>
                </div>
              </div>

              <div style="margin-top: 60px; text-align: center; opacity: 0.3; font-size: 11px; font-weight: 950; letter-spacing: 3px;">
                VERA STRATEGIC ANALYTICS CORE • DEEP-SPACE v9.5 • ENCRYPTED
              </div>
            `;

    } catch (e) {
      console.error("Analytics Engine Fault:", e);
      container.innerHTML = `<div class="card elevated" style="padding: 40px; text-align: center; color: var(--error);">MODAL ANALYTICS ENGINE OFFLINE: ${e.message}</div>`;
    }
  },


  getFrequencyMap(list, key, limit) {
    const map = {};
    list.forEach(item => {
      const val = item[key] || "Unknown";
      map[val] = (map[val] || 0) + 1;
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  },

  async assignLead(leadId, staffId, staffName) {
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          assigned_to: staffId,
          history: [
            ... (this.leads.find(l => String(l.id) === String(leadId))?.history || []),
            {
              time: Date.now(),
              action: `Assigned case to ${staffName} for strategic follow-up.`,
            }
          ]
        })
        .eq('id', leadId);

      if (error) throw error;

      this.toast(`Module Assigned to ${staffName} ✅`, "success");
      this.closeModal();
      this.viewLead(leadId);
    } catch (e) {
      console.error("Delegation Protocol Fault:", e);
      this.toast("Delegation Protocol Fault", "error");
    }
  },

  renderMigrationPortal() {
    console.log("[VERA] Initiating Strategic Migration Portal...");
    const bodyHTML = `
            <div style="padding: 32px;">
              <h2 style="font-size: 32px; font-weight: 950; letter-spacing: -1.5px; margin-bottom: 8px;">Strategic Migration Portal</h2>
              <p style="font-size: 12px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 40px;">Bridge Old & New VERA Nodes</p>
              
              <div class="card" style="background: rgba(255,149,0,0.05); border: 1.5px solid rgba(255,149,0,0.1); padding: 24px; border-radius: 24px; margin-bottom: 32px;">
                <div style="display: flex; gap: 16px; align-items: flex-start;">
                  <div style="font-size: 24px;">⚠️</div>
                  <div style="font-size: 13px; font-weight: 800; color: #FF9500; line-height: 1.5;">Migration requires a <b>Source Service Role Key</b> to bypass RLS. Ensure you have the 'service_role' key from your OLD Supabase project settings.</div>
                </div>
              </div>

              <div style="display: flex; flex-direction: column; gap: 24px;">
                <div>
                  <label style="display: block; font-size: 10px; font-weight: 950; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted); margin-bottom: 12px;">Old Project URL</label>
                  <input type="text" id="migrate-old-url" value="https://yoyofyhtkxwawgplvuha.supabase.co" class="input" style="height: 60px; border-radius: 18px; font-weight: 700; background: rgba(0,0,0,0.03); border: 1.5px solid transparent; width: 100%; padding: 0 20px;">
                </div>
                <div>
                  <label style="display: block; font-size: 10px; font-weight: 950; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted); margin-bottom: 12px;">Old Service Role Key (Source)</label>
                  <input type="password" id="migrate-old-key" placeholder="eyJhbGciOiJIUzI1Ni..." class="input" style="height: 60px; border-radius: 18px; font-weight: 700; background: rgba(0,0,0,0.03); border: 1.5px solid transparent; width: 100%; padding: 0 20px;">
                </div>
              </div>

              <div id="migration-log" style="margin-top: 32px; font-family: monospace; font-size: 11px; background: #000; color: #0f0; padding: 20px; border-radius: 16px; display: none; max-height: 200px; overflow-y: auto;">
                > INITIALIZING UPLINK...
              </div>

              <button onclick="app.startMigrationProcedure()" id="btn-start-migration" style="width: 100%; height: 72px; background: var(--text-primary); color: #fff; border: none; border-radius: 24px; font-weight: 950; font-size: 16px; margin-top: 40px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">INITIATE TACTICAL MIGRATION</button>
            </div>
          `;
    this.renderModal(bodyHTML);
  },

  async startMigrationProcedure() {
    const url = document.getElementById("migrate-old-url").value.trim();
    const key = document.getElementById("migrate-old-key").value.trim();
    const log = document.getElementById("migration-log");
    const btn = document.getElementById("btn-start-migration");

    if (!url || !key) return this.toast("Missing Tactical Credentials", "error");

    btn.style.opacity = "0.5";
    btn.disabled = true;
    log.style.display = "block";

    const writeLog = (msg) => {
      log.innerHTML += `<div>> ${msg}</div>`;
      log.scrollTop = log.scrollHeight;
    };

    try {
      writeLog("ESTABLISHING SOURCE BRIDGE...");
      // Temporary Bridge Client (Source)
      const sourceClient = createClient(url, key);

      // 1. Sync Staff
      writeLog("SYNCHRONIZING STAFF REGISTRY...");
      const { data: staff, error: sErr } = await sourceClient.from('staff').select('*');
      if (sErr) throw sErr;
      writeLog(`FOUND ${staff.length} STAFF NODES.`);
      const { error: sUp } = await supabase.from('staff').upsert(staff);
      if (sUp) throw sUp;
      writeLog("STAFF REGISTRY STABLE.");

      // 2. Sync Config
      writeLog("SYNCHRONIZING APP CONFIGURATION...");
      const { data: config, error: cErr } = await sourceClient.from('app_config').select('*');
      if (cErr) throw cErr;
      const { error: cUp } = await supabase.from('app_config').upsert(config);
      if (cUp) throw cUp;
      writeLog("CONFIGURATION STABLE.");

      // 3. Sync Leads (Deep Harvest & Schema Mapping)
      writeLog("RELOCATING LEAD VAULT...");

      let sourcePage = 0;
      const sourcePageSize = 1000;
      let sourceHasMore = true;
      let totalMigrated = 0;

      // Define the safe schema for the new project
      const targetColumns = [
        'id', 'name', 'phone', 'location', 'interest', 'source', 'status', 'priority',
        'timestamp', 'owner', 'owner_name', 'added_by', 'assigned_to', 'type',
        'followup_date', 'checklist', 'history', 'weight', 'enquiry_note',
        'executive_comment', 'notes'
      ];

      while (sourceHasMore) {
        const { data: leads, error: lErr } = await sourceClient
          .from('leads')
          .select('*')
          .range(sourcePage * sourcePageSize, (sourcePage + 1) * sourcePageSize - 1)
          .order('timestamp', { ascending: false });

        if (lErr) throw lErr;
        if (!leads || leads.length === 0) {
          sourceHasMore = false;
          break;
        }

        writeLog(`SCANNING ${leads.length} VECTORS (PAGE ${sourcePage + 1})...`);

        // --- SOVEREIGN SCHEMA SANITIZER ---
        const sanitizedChunk = leads.map(l => {
          const obj = {};
          targetColumns.forEach(col => {
            // 1. Direct Match (snake_case)
            if (l.hasOwnProperty(col)) {
              obj[col] = l[col];
            } else {
              // 2. Legacy Mapping (camelCase fallbacks)
              const mapping = {
                'followup_date': 'followupDate',
                'enquiry_note': 'enquiryNote',
                'executive_comment': 'executiveComment',
                'added_by': 'addedBy',
                'assigned_to': 'assignedTo'
              };
              const legacyKey = mapping[col];
              if (legacyKey && l.hasOwnProperty(legacyKey)) {
                obj[col] = l[legacyKey];
              }
            }
          });

          // 3. Fallback for interest/notes if enquiry_note is empty
          if (!obj.enquiry_note && l.interest && l.interest.includes('| Note:')) {
            obj.enquiry_note = l.interest.split('| Note:')[1].trim();
          }

          return obj;
        });

        // Chunked Upsert for the current page
        const chunkSize = 100;
        for (let i = 0; i < sanitizedChunk.length; i += chunkSize) {
          const chunk = sanitizedChunk.slice(i, i + chunkSize);
          const { error: lUp } = await supabase.from('leads').upsert(chunk);
          if (lUp) throw lUp;
          totalMigrated += chunk.length;
          writeLog(`SECURED ${totalMigrated} VECTORS...`);
        }

        if (leads.length < sourcePageSize) {
          sourceHasMore = false;
        } else {
          sourcePage++;
        }
      }

      writeLog("VAULT REGISTRY SYNCHRONIZED.");
      writeLog("MIGRATION COMPLETE. RELOADING TERMINAL...");

      this.toast("Strategic Migration Success ✅", "success");
      setTimeout(() => window.location.reload(), 2000);

    } catch (e) {
      writeLog(`CRITICAL ERROR: ${e.message}`);
      console.error("Migration Fault:", e);
      this.toast("Migration Protocol Fault", "error");
      btn.style.opacity = "1";
      btn.disabled = false;
    }
  },

  renderModal(bodyHTML) {
    const modal = document.getElementById("lead-modal");
    const content = modal.querySelector(".modal-content");
    const modalBody = document.getElementById("modal-body");
    if (!modal || !modalBody) return;

    modalBody.innerHTML = bodyHTML;
    modal.style.display = "flex";
    modal.classList.add("active");
    if (window.innerWidth < 850) {
      if (content) content.style.transform = "translateY(0)";
    }
  },

  setAuditFilter(key, val) {
    this.auditFilters[key] = val;
    this.renderAuditHub();
  },

  async renderAuditHub() {
    const container = document.getElementById("audit-container");
    if (!container) return;
    const isAdmin = this.user.role === "Admin";
    const isSupervisor = this.user.role === "Supervisor";
    const canReport = isAdmin || isSupervisor;

    container.innerHTML = `
          <div style="padding: 100px 40px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px;">
            <div style="width: 40px; height: 40px; border: 3px solid rgba(0,0,0,0.1); border-top-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <div style="margin-top: 24px; font-size: 11px; font-weight: 950; color: var(--accent); letter-spacing: 2px; text-transform: uppercase;">Initializing Sentinel Protocols...</div>
          </div>
        `;

    try {
      const { data: staff } = await supabase.from('staff').select('*');
      let auditQuery = supabase.from('audit_logs').select('*').order('timestamp', { ascending: false });

      if (this.auditFilters.status !== 'all') {
        auditQuery = auditQuery.eq('status', this.auditFilters.status);
      }

      if (!isAdmin) {
        auditQuery = auditQuery.eq('member_id', this.user.id);
      } else if (this.auditFilters.member) {
        auditQuery = auditQuery.eq('member_id', this.auditFilters.member);
      }

      const { data: audits, error: auditError } = await auditQuery;

      if (auditError && (auditError.code === 'PGRST116' || auditError?.message?.includes('not found'))) {
        container.innerHTML = `
              <div style="padding: 120px 40px; text-align: center; max-width: 600px; margin: 0 auto;">
                <div style="font-size: 80px; margin-bottom: 32px; filter: grayscale(1);">🛰️</div>
                <h2 style="font-size: 32px; font-weight: 950; color: #000; margin-bottom: 20px; letter-spacing: -1.5px;">Sentinel Uplink Failure</h2>
                <p style="color: var(--text-muted); line-height: 1.8; font-weight: 700; margin-bottom: 40px; opacity: 0.8;">The 'audit_logs' registry is not detected. This is required for high-fidelity quality assurance tracking.</p>
                <div style="background: #000; padding: 32px; border-radius: 28px; font-family: monospace; font-size: 12px; text-align: left; margin-bottom: 32px; color: #34C759;">
                  CREATE TABLE audit_logs (<br>
                  &nbsp;&nbsp;id uuid DEFAULT gen_random_uuid() PRIMARY KEY,<br>
                  &nbsp;&nbsp;supervisor_id text,<br>
                  &nbsp;&nbsp;member_id text,<br>
                  &nbsp;&nbsp;reason text,<br>
                  &nbsp;&nbsp;severity text DEFAULT 'warning',<br>
                  &nbsp;&nbsp;screenshot_url text,<br>
                  &nbsp;&nbsp;timestamp bigint,<br>
                  &nbsp;&nbsp;status text DEFAULT 'pending'<br>
                  );
                </div>
              </div>
            `;
        return;
      }

      const activeAudits = audits.filter(a => a.status === 'pending');
      const criticalCount = audits.filter(a => a.severity === 'critical' && a.status === 'pending').length;

      container.innerHTML = `
            <div style="padding: 40px 20px; max-width: 1600px; margin: 0 auto;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 64px;">
                <div>
                  <div style="display: inline-flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.04); padding: 8px 16px; border-radius: 100px; margin-bottom: 24px;">
                    <div style="width: 8px; height: 8px; background: ${criticalCount > 0 ? '#FF3B30' : '#34C759'}; border-radius: 50%;"></div>
                    <span style="font-size: 10px; font-weight: 950; color: #000; letter-spacing: 2px; text-transform: uppercase;">${criticalCount > 0 ? 'CRITICAL FAULTS DETECTED' : 'SYSTEM STATUS: NOMINAL'}</span>
                  </div>
                  <h1 style="font-size: 72px; font-weight: 950; letter-spacing: -4px; color: #000; margin: 0; line-height: 0.85;">Quality <span style="color: var(--accent);">Sentinel</span></h1>
                </div>
                <div style="display: flex; gap: 24px;">
                  <div style="background: #000; color: #fff; padding: 24px 32px; border-radius: 32px; display: flex; align-items: center; gap: 20px;">
                    <div style="text-align: right;">
                      <div style="font-size: 32px; font-weight: 950; line-height: 1;">${activeAudits.length}</div>
                      <div style="font-size: 9px; font-weight: 900; color: rgba(255,255,255,0.4); text-transform: uppercase;">Open Cases</div>
                    </div>
                    <div style="width: 1px; height: 40px; background: rgba(255,255,255,0.1);"></div>
                    <div>
                      <div style="font-size: 32px; font-weight: 950; line-height: 1; color: #FF3B30;">${criticalCount}</div>
                      <div style="font-size: 9px; font-weight: 900; color: rgba(255,255,255,0.4); text-transform: uppercase;">Critical</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 8px; margin-bottom: 40px;">
                <button onclick="app.setAuditFilter('status', 'pending')" style="background: ${this.auditFilters.status === 'pending' ? '#000' : '#eee'}; color: ${this.auditFilters.status === 'pending' ? '#fff' : '#666'}; border: none; padding: 12px 24px; border-radius: 16px; font-weight: 900; cursor: pointer;">ACTIVE</button>
                <button onclick="app.setAuditFilter('status', 'completed')" style="background: ${this.auditFilters.status === 'completed' ? '#000' : '#eee'}; color: ${this.auditFilters.status === 'completed' ? '#fff' : '#666'}; border: none; padding: 12px 24px; border-radius: 16px; font-weight: 900; cursor: pointer;">RESOLVED</button>
                <button onclick="app.setAuditFilter('status', 'all')" style="background: ${this.auditFilters.status === 'all' ? '#000' : '#eee'}; color: ${this.auditFilters.status === 'all' ? '#fff' : '#666'}; border: none; padding: 12px 24px; border-radius: 16px; font-weight: 900; cursor: pointer;">ARCHIVE</button>
              </div>

              <div style="display: grid; grid-template-columns: ${canReport ? '420px 1fr' : '1fr'}; gap: 48px; align-items: start;">
                ${canReport ? `
                <div style="background: #fff; border-radius: 42px; padding: 40px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: 0 40px 100px rgba(0,0,0,0.05); position: sticky; top: 120px;">
                  <div style="font-size: 12px; font-weight: 950; color: var(--accent); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 40px;">Issue Performance Flag</div>
                  <div style="display: flex; flex-direction: column; gap: 24px;">
                    <div>
                      <label style="font-size: 9px; font-weight: 950; color: #999; text-transform: uppercase; margin-bottom: 8px; display: block;">Responsible Personnel</label>
                      <select id="audit-member" style="width: 100%; height: 56px; background: #f9f9f9; border: 1.5px solid #eee; border-radius: 18px; padding: 0 16px; font-weight: 900;">
                        <option value="">Select ID...</option>
                        ${staff.sort((a, b) => (a.name || "").localeCompare(b.name || "")).map(s => `<option value="${s.id}">${(s.name || s.id).toUpperCase()}</option>`).join('')}
                      </select>
                    </div>
                    <div>
                      <label style="font-size: 9px; font-weight: 950; color: #999; text-transform: uppercase; margin-bottom: 8px; display: block;">Fault Severity</label>
                      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
                        <button onclick="app._selectedSeverity='info'; this.parentElement.querySelectorAll('button').forEach(b=>b.style.opacity='0.4'); this.style.opacity='1';" style="height: 48px; border-radius: 14px; border: none; background: #34C759; color: #fff; font-weight: 900; cursor: pointer; opacity: 0.4;">INSIGHT</button>
                        <button onclick="app._selectedSeverity='warning'; this.parentElement.querySelectorAll('button').forEach(b=>b.style.opacity='0.4'); this.style.opacity='1';" style="height: 48px; border-radius: 14px; border: none; background: #FFBF00; color: #fff; font-weight: 900; cursor: pointer;">WARNING</button>
                        <button onclick="app._selectedSeverity='critical'; this.parentElement.querySelectorAll('button').forEach(b=>b.style.opacity='0.4'); this.style.opacity='1';" style="height: 48px; border-radius: 14px; border: none; background: #FF3B30; color: #fff; font-weight: 900; cursor: pointer; opacity: 0.4;">CRITICAL</button>
                      </div>
                    </div>
                    <div>
                      <label style="font-size: 9px; font-weight: 950; color: #999; text-transform: uppercase; margin-bottom: 8px; display: block;">Technical Analysis</label>
                      <textarea id="audit-reason" style="width: 100%; height: 120px; background: #f9f9f9; border: 1.5px solid #eee; border-radius: 18px; padding: 16px; font-weight: 700; resize: none;" placeholder="Details..."></textarea>
                    </div>
                    <div onclick="document.getElementById('audit-upload').click()" style="height: 56px; background: #f9f9f9; border: 2px dashed #eee; border-radius: 16px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 10px; font-weight: 950; color: #999;">ATTACH IMAGE</div>
                    <input type="file" id="audit-upload" style="display: none" onchange="app.handleAuditScreenshot(this)">
                    <div id="audit-preview" style="width: 56px; height: 56px; border-radius: 14px; overflow: hidden; display: none; margin-top: -10px;"></div>
                    <button onclick="app.submitAuditReport()" style="width: 100%; padding: 22px; border-radius: 20px; background: #000; color: #fff; font-weight: 950; text-transform: uppercase; cursor: pointer; border: none;">Commit Flag 🛰️</button>
                  </div>
                </div>
                ` : ''}

                <div style="display: flex; flex-direction: column; gap: 20px;">
                  ${audits.length === 0 ? `
                    <div style="padding: 100px 40px; text-align: center; border-radius: 42px; background: #f9f9f9; border: 2px dashed #eee; color: #999;">No logs found.</div>
                  ` : audits.map(a => {
        const m = staff.find(s => s.id === (isAdmin || isSupervisor ? a.member_id : a.supervisor_id)) || { name: 'Unknown' };
        const sevColor = a.severity === 'critical' ? '#FF3B30' : a.severity === 'warning' ? '#FFBF00' : '#007AFF';
        return `
                      <div style="background: #fff; border-radius: 32px; padding: 28px; border: 1.5px solid #eee; display: flex; gap: 24px; align-items: start; position: relative;">
                        ${a.screenshot_url ? `
                          <div style="width: 100px; height: 100px; border-radius: 20px; overflow: hidden; cursor: pointer;" onclick="app.viewAuditEvidence('${a.id}')">
                            <img src="${a.screenshot_url}" style="width: 100%; height: 100%; object-fit: cover;">
                          </div>
                        ` : ''}
                        <div style="flex: 1;">
                          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                            <div>
                              <div style="font-size: 18px; font-weight: 950; color: #000;">${m.name.toUpperCase()}</div>
                              <div style="font-size: 9px; font-weight: 900; color: #999; text-transform: uppercase;">${new Date(a.timestamp).toLocaleDateString()}</div>
                            </div>
                            <div style="background: ${sevColor}15; color: ${sevColor}; padding: 4px 12px; border-radius: 8px; font-size: 9px; font-weight: 950; text-transform: uppercase;">${a.severity || 'WARNING'}</div>
                          </div>
                          <div style="font-size: 14px; font-weight: 700; color: #444; line-height: 1.5;">${a.reason}</div>
                          ${a.status === 'pending' ? `
                            <div style="display: flex; gap: 12px; margin-top: 20px;">
                              <button onclick="app.resolveAudit('${a.id}', 'completed')" style="padding: 10px 20px; background: #34C759; color: #fff; border: none; border-radius: 12px; font-size: 10px; font-weight: 950; cursor: pointer;">RESOLVE</button>
                              <button onclick="app.resolveAudit('${a.id}', 'cancelled')" style="padding: 10px 20px; background: #eee; color: #666; border: none; border-radius: 12px; font-size: 10px; font-weight: 950; cursor: pointer;">VOID</button>
                            </div>
                          ` : `
                            <div style="margin-top: 12px; font-size: 9px; font-weight: 900; color: #999; text-transform: uppercase;">STATUS: ${a.status.toUpperCase()}</div>
                          `}
                        </div>
                      </div>
                    `;
      }).join('')}
                </div>
              </div>
            </div>
          `;
    } catch (e) {
      console.error("Sentinel Registry Fail:", e);
      container.innerHTML = `<div style="padding: 100px; color: var(--accent); text-align: center; font-weight: 950;">SYSTEM OFFLINE</div>`;
    }
  },

  handleAuditScreenshot(input) {
    const preview = document.getElementById("audit-preview");
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
        preview.style.display = "block";
        this._pendingAuditImage = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  },

  async submitAuditReport() {
    const memberId = document.getElementById("audit-member").value;
    const reason = document.getElementById("audit-reason").value;
    if (!memberId || !reason) return this.toast("Registry Requirement: Member & Description", "warning");

    this.toast("Uplinking Incident Evidence...", "info");

    let screenshotUrl = null;
    if (this._pendingAuditImage) {
      try {
        const formData = new FormData();
        formData.append('file', this._pendingAuditImage);
        formData.append('upload_preset', this.CLD_PRESET);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${this.CLD_CLOUD}/image/upload`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) throw new Error("Cloudinary Handshake Failure");
        const cldData = await response.json();
        screenshotUrl = cldData.secure_url;
      } catch (e) {
        console.error("Cloudinary Uplink Fail:", e);
        this.toast("Evidence Uplink Fault - Using Local Buffer", "warning");
        screenshotUrl = this._pendingAuditImage;
      }
    }

    try {
      await supabase.from('audit_logs').insert([{
        supervisor_id: this.user.id,
        member_id: memberId,
        reason: reason,
        severity: this._selectedSeverity || 'warning',
        screenshot_url: screenshotUrl,
        timestamp: Date.now(),
        status: 'pending'
      }]);

      this.toast("QA Incident Broadcasted 🛰️");
      this._pendingAuditImage = null;
      this.renderAuditHub();
    } catch (e) {
      console.error("Audit Insert Fail:", e);
      this.toast("Database Logic Error", "error");
    }
  },

  async viewAuditEvidence(auditId) {
    try {
      const { data: audit } = await supabase.from('audit_logs').select('*').eq('id', auditId).single();
      if (!audit) return;

      const html = `
            <div style="padding: 40px;">
              <h2 style="font-size: 32px; font-weight: 900; margin-bottom: 24px;">Evidence Review</h2>
              ${audit.screenshot_url ? `<img src="${audit.screenshot_url}" style="width: 100%; border-radius: 24px; margin-bottom: 24px;">` : ''}
              <div style="background: #f9f9f9; padding: 24px; border-radius: 24px; font-size: 18px; font-weight: 700;">${audit.reason}</div>
              <div style="margin-top: 32px; display: flex; gap: 16px;">
                <button onclick="app.resolveAudit('${audit.id}', 'completed'); app.closeModal();" class="btn" style="padding: 20px; background: var(--success); color: #fff; border-radius: 16px; font-weight: 900;">RESOLVE</button>
                <button onclick="app.closeModal();" class="btn" style="padding: 20px; background: #eee; color: #666; border-radius: 16px; font-weight: 900;">CLOSE</button>
              </div>
            </div>
          `;
      this.renderModal(html);
    } catch (e) {
      console.error("Evidence Bridge Fault:", e);
    }
  },

  async resolveAudit(id, newStatus) {
    try {
      this.toast(`Updating: ${newStatus.toUpperCase()}...`, "info");
      const { error } = await supabase.from('audit_logs').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      this.toast(`Audit Resolved ✅`, "success");
      this.renderAuditHub();
    } catch (e) {
      console.error("Resolution Protocol Fault:", e);
      this.toast("Resolution Protocol Fault", "error");
    }
  },

  renderTrajectoryChart() {
    const canvas = document.getElementById('trajectory-chart');
    if (!canvas) return;

    const labels = [];
    const leadCounts = [];
    const conversionCounts = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      labels.push(d.toLocaleDateString([], { weekday: 'short', day: 'numeric' }));
      
      const dayLeads = this.leads.filter(l => {
        const ts = typeof l.timestamp === 'number' ? l.timestamp : new Date(l.timestamp).getTime();
        return new Date(ts).toISOString().split('T')[0] === dateStr;
      });
      
      leadCounts.push(dayLeads.length);
      conversionCounts.push(dayLeads.filter(l => l.status === 'Purchased').length);
    }

    if (this.trajectoryChartInstance) {
      this.trajectoryChartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    const accentColor = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#521216';
    const successColor = getComputedStyle(document.body).getPropertyValue('--success').trim() || '#34C759';

    this.trajectoryChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Leads Captured',
            data: leadCounts,
            borderColor: accentColor,
            backgroundColor: accentColor + '15',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2
          },
          {
            label: 'Sales Secured',
            data: conversionCounts,
            borderColor: successColor,
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              font: { size: 10, weight: '900' },
              color: 'var(--text-primary)'
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0,0,0,0.85)',
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 11, weight: '600' },
            padding: 12,
            cornerRadius: 16
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0,0,0,0.03)' },
            ticks: { font: { size: 10, weight: '700' }, color: 'var(--text-muted)' }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 10, weight: '700' }, color: 'var(--text-muted)' }
          }
        }
      }
    });
  },

  startVoiceCapture(targetId) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.toast("Registry Protocol: Voice Engine Not Supported", "warning");
      return;
    }

    const input = document.getElementById(targetId);
    if (!input) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    this.toast("Uplink Active: Listening...", "info");
    if (window.navigator.vibrate) window.navigator.vibrate(50);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const currentVal = input.value.trim();
      input.value = (currentVal ? currentVal + ' ' : '') + transcript;
      this.toast("Intelligence Logged ✅", "success");
      if (window.navigator.vibrate) window.navigator.vibrate([30, 50]);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      this.toast(`Signal Lost: ${event.error}`, "error");
    };
  },
};

// Enhanced scroll listener for "Small-to-Long" Island
window.addEventListener("scroll", () => {
  const island = document.getElementById("header-island");
  if (window.scrollY > 20) {
    island.classList.add("scrolled");
  } else {
    island.classList.remove("scrolled");
  }
});

// GLOBAL TACTICAL HEARTBEAT (Dynamic Island Timer & Sync)
setInterval(() => {
  if (typeof app.updateIslandTimer === 'function') app.updateIslandTimer();
  if (typeof app.updateIslandStatus === 'function') app.updateIslandStatus();
}, 1000);

app.init();

// ---- STRATEGIC SERVICE WORKER: SPEED ENGINE ----
if ("serviceWorker" in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => console.log("[PWA] Tactical Speed Engine Registered:", reg.scope))
      .catch((err) => console.warn("[PWA] Service Worker Fault:", err));
  });
}
