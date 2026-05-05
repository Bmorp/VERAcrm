import{initializeApp as ct}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getAuth as pt,signOut as gt,signInWithEmailAndPassword as ut,onAuthStateChanged as ht}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";import{initializeFirestore as ft,getDocs as Z,collection as tt,getDoc as at,doc as st,arrayUnion as xt}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";import{createClient as Q}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();document.addEventListener("contextmenu",t=>t.preventDefault());document.addEventListener("keydown",t=>{const e=t.ctrlKey||t.metaKey;t.key==="F12"&&t.preventDefault(),e&&t.shiftKey&&["I","J","C"].includes(t.key.toUpperCase())&&t.preventDefault(),e&&["U","S"].includes(t.key.toUpperCase())&&t.preventDefault()});pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";(function(){window.onerror=function(t,e,i){return console.error("[CRM BOOT FAULT]",t),!1},window.__bootTimer=setTimeout(function(){(!window.app||!window.app.initialized)&&console.warn("Bootstrap stagnation detected. Use 'Emergency Reset' if login fails.")},1e4)})();const mt="https://bgykwfoohjheaforjqtj.supabase.co",vt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJneWt3Zm9vaGpoZWFmb3JqcXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMTk5MDUsImV4cCI6MjA5MTg5NTkwNX0.1ForYC42uSNFigaSE9RM617EDV7uDr4RL8_VR_Ofvgo",b=Q(mt,vt),yt="https://paamujdljvxlfkafpiwv.supabase.co",bt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhYW11amRsanZ4bGZrYWZwaXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNDk2ODAsImV4cCI6MjA5MTgyNTY4MH0.br3AF1Mc3X_jqdHqSYfzfTSkNhl8d_ev9BtlSX8E7hY",wt="https://mjsklsdcmelzgxbxzozc.supabase.co",St="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qc2tsc2RjbWVsemd4Ynh6b3pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MjE4ODQsImV4cCI6MjA5MTQ5Nzg4NH0.5xpmBrRpOWjmcYX2gZ_KZQYuv95uzeco_tc55nUNT1U",Et=Q(yt,bt),It=Q(wt,St),Ct={apiKey:"AIzaSyCq42HmbaOpwMDnalSWhFaKQFeYRiuuu4M",authDomain:"leadflow-e0f88.firebaseapp.com",projectId:"leadflow-e0f88",storageBucket:"leadflow-e0f88.firebasestorage.app",messagingSenderId:"45713839855",appId:"1:45713839855:web:248d037bf74e9f13aeed1a"},nt=ct(Ct),et=pt(nt),W=ft(nt,{experimentalForceLongPolling:!0,useFetchStreams:!1}),D={ADMIN:"Admin",SUPERVISOR:"Supervisor",MEMBER:"Member"},V={async getLeads(){const{data:t,error:e}=await b.from("leads").select("id, name, phone, location, interest, source, status, priority, timestamp, owner, owner_name, added_by, assigned_to, type, followup_date, enquiry_note, executive_comment, history").order("timestamp",{ascending:!1});if(e)throw e;return t},async getLeadDetail(t){const{data:e,error:i}=await b.from("leads").select("*").eq("id",t).single();if(i)throw i;return e},async saveLead(t){const{data:e,error:i}=await b.from("leads").insert([t]).select();if(i)throw i;return e[0]},async updateLead(t,e){var o;const i=this.leads.findIndex(s=>String(s.id)===String(t));let r=null;if(i!==-1){r={...this.leads[i]},this.leads[i]={...this.leads[i],...e};const s=((o=document.querySelector(".screen.active"))==null?void 0:o.id.replace("screen-",""))||"dashboard";s==="dashboard"?this.renderDashboard():s==="leads"&&this.refreshLeads()}try{const{data:s,error:n}=await b.from("leads").update(e).eq("id",t).select();if(n)throw n;return s&&s.length>0&&i!==-1&&(this.leads[i]={...this.leads[i],...s[0]}),s?s[0]:null}catch(s){throw i!==-1&&r&&(this.leads[i]=r,this.toast("Sync Failure - Reverting Changes","error"),this.renderDashboard()),s}},async getLeadCount(){const{count:t,error:e}=await b.from("leads").select("*",{count:"exact",head:!0});if(e)throw e;return t}},U={STASH_KEY:"vera_intelligence_stash",set(t,e){try{const i=this.getRaw();i[t]={payload:e,timestamp:Date.now()},localStorage.setItem(this.STASH_KEY,JSON.stringify(i))}catch(i){console.warn("[STASH] Memory Pressure Fault:",i),i.name==="QuotaExceededError"&&this.purge()}},get(t){const i=this.getRaw()[t];return i?i.payload:null},getTimestamp(t){const i=this.getRaw()[t];return i?i.timestamp:0},getStats(){const t=this.getRaw(),e=Object.keys(t);let i=0;return e.forEach(r=>{Array.isArray(t[r].payload)?i+=t[r].payload.length:i+=1}),{keys:e.length,nodes:i}},getRaw(){try{const t=localStorage.getItem(this.STASH_KEY);return t?JSON.parse(t):{}}catch{return{}}},purge(){localStorage.removeItem(this.STASH_KEY)}},K=window.app={escapeHTML(t){if(!t)return"";const e=document.createElement("div");return e.textContent=t,e.innerHTML},fmt(t){return t==null?"0":Math.round(t).toLocaleString("en-IN")},_activeAnimations:{},animateCount(t,e,i=1200,r=""){const o=document.getElementById(t);if(!o)return;this._activeAnimations[t]&&cancelAnimationFrame(this._activeAnimations[t]);const s=o.textContent.replace(/,/g,""),n=parseInt(r?s.replace(r,""):s)||0;if(n===e&&o.textContent.includes(e.toLocaleString("en-IN")))return;const a=performance.now(),l=d=>{const u=d-a,c=Math.min(u/i,1),h=1-Math.pow(1-c,3),f=Math.floor(n+(e-n)*h);o.textContent=f.toLocaleString("en-IN")+r,c<1?this._activeAnimations[t]=requestAnimationFrame(l):(o.textContent=e.toLocaleString("en-IN")+r,delete this._activeAnimations[t])};this._activeAnimations[t]=requestAnimationFrame(l)},CLD_CLOUD:"djufknevp",CLD_PRESET:"framebase",sessionStartTime:Date.now(),sessionYield:0,_GROQ_KEY:"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",chatHistory:[],qmsRegistry:[],getLatestRemarkObj(t){return!t||!t.history?null:[...t.history].reverse().find(i=>i.action.includes("Executive Remark")||i.action.includes("Manual Note")||i.action.includes("Strategic Update")||i.action.includes("Legacy Executive Remark"))||null},getLatestComment(t){const e=this.getLatestRemarkObj(t);return t!=null&&t.executive_comment&&!e?t.executive_comment:e?e.action.split(": ").slice(1).join(": "):""},getInitialNote(t){if(!t)return"";if(t.enquiry_note)return t.enquiry_note;if(!t.history)return"";const e=t.history.find(i=>i.action.includes("Initial Requirement")||i.action.includes("Legacy Enquiry Note"));return e?e.action.split(": ").slice(1).join(": "):""},_callInterval:null,_callDuration:0,async initTelephony(){this.toast("CloudShope PanelV3 Ready ✅","success")},async initCall(t,e){var r,o;if(!e)return this.toast("Registry Fault: Number Missing","error");try{await navigator.mediaDevices.getUserMedia({audio:!0}),console.log("[TELEPHONY] Microphone Clearance Granted")}catch(s){console.warn("[TELEPHONY] Microphone Access Denied or Unavailable:",s),this.toast("Mic Access Denied: Call may be silent on browser","warning")}const i=document.getElementById("call-controller");document.getElementById("call-name").textContent=t||"Unknown",document.getElementById("call-number").textContent=e,document.getElementById("call-status").textContent="Connecting via CloudShope...",i&&(i.style.display="flex"),this.startCallTimer();try{const s=(localStorage.getItem("vera_calling_number")||((r=this.user)==null?void 0:r.calling_number)||((o=this.user)==null?void 0:o.phone)||"8928822884").replace(/\D/g,"").slice(-10),n=e.replace(/\D/g,"").slice(-10),a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI1MzYzLCJ1c2VybmFtZSI6IkJoYTIyODg0IiwibWFpbl91c2VyIjoyNTM2MywiaWF0IjoxNzc2NzUyNzQ4fQ.WQS8zh7OB_Ji2IXbrQYnKUXimJnqyKZE0bBEmM647_I";this.toast("Dialing via Secure Proxy...","info");const l=await fetch(`/api/cloudshope-call?cb=${Date.now()}`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({from_number:s,to_number:n})}),d=await l.json().catch(()=>({}));if(console.log("[CloudShope] Response Data:",d),l.ok&&(d.status==="success"||d.success||d.call_id||d.sid||d.message&&d.message.includes("Successfully")))document.getElementById("call-status").textContent="Check Your Phone 📱",this.toast("CloudShope Bridge Active! ✅","success");else throw console.error("CloudShope Detailed Error:",d),new Error(d.message||d.error||d.msg||"Server rejected request")}catch(s){console.error("Dialer Fault:",s),this.toast(`Dialer Fault: ${s.message}`,"error"),document.getElementById("call-status").textContent="Dialing Failed",setTimeout(()=>this.endCall(),3e3)}},startCallTimer(){this.stopCallTimer(),this._callDuration=0,this._callInterval=setInterval(()=>{this._callDuration++;const t=Math.floor(this._callDuration/60).toString().padStart(2,"0"),e=(this._callDuration%60).toString().padStart(2,"0"),i=document.getElementById("call-timer");i&&(i.textContent=`${t}:${e}`)},1e3)},stopCallTimer(){this._callInterval&&clearInterval(this._callInterval),this._callDuration=0},endCall(){const t=document.getElementById("call-controller");t&&(t.style.display="none"),this.stopCallTimer(),this.toast("Call Finished","info")},async updateCallingNumber(){const t=document.getElementById("personal-calling-num"),e=t?t.value.trim():prompt("Enter your Mobile Number:");if(!e)return this.toast("Number Required","error");localStorage.setItem("vera_calling_number",e);try{const{error:i}=await b.from("staff").update({calling_number:e}).eq("email",this.user.email);if(i)throw i;this.user.calling_number=e,this.toast("Calling Uplink Secured ✅","success")}catch{console.warn("DB Update Failed, but Local Storage is active."),this.toast("Uplink Saved Locally (Ready to Call)","success")}},updateSessionTimer(){const t=document.getElementById("session-timer");if(!t)return;const e=Date.now()-this.sessionStartTime,i=Math.floor(e/6e4),r=Math.floor(e%6e4/1e3);t.textContent=`${String(i).padStart(2,"0")}:${String(r).padStart(2,"0")}`},lockTerminal(){this.toast("Terminal Security Protocol: Encrypted Lockdown Active 🔐","success")},leads:[],leadsPage:1,leadsPerPage:40,_searchTimeout:null,session:null,activeDashTab:"queue",activePricingTab:"gold",auditFilters:{status:"pending",severity:"all",member:""},islandCycleIdx:0,debounce(t,e){clearTimeout(this._searchTimeout),this._searchTimeout=setTimeout(t.bind(this),e)},goldRates:{"24K (999)":0,"22K":0,"18K":0,Coin:0,"Old Gold":0,"Silver Payal":0,"Silver Baby Kada":0,"Silver Ferva":0,"Silver Utensils/Pooja":0,"Silver Coin":0},calcState:{weight:0,purity:"24K (999)",gst:!1,making:0},init(){this.initProductMatrix(),setInterval(()=>{this.islandCycleIdx=(this.islandCycleIdx+1)%2,this.updateIslandStatus()},8e3),document.addEventListener("mousedown",e=>{const i=document.getElementById("notif-drawer"),r=document.querySelector('[onclick*="toggleNotifications"]');i&&i.classList.contains("active")&&!i.contains(e.target)&&!r.contains(e.target)&&this.toggleNotifications()});const t=document.createElement("button");t.textContent="HARD RESET",t.style="position:fixed; bottom:20px; right:20px; z-index:99999; padding:8px 16px; background:#000; color:#fff; border-radius:10px; font-size:10px; opacity:0.1;",t.onclick=()=>this.hardReset(),document.body.appendChild(t),window.addEventListener("scroll",()=>{const e=document.getElementById("header-island");e&&window.scrollY>20?e.classList.add("scrolled"):e&&e.classList.remove("scrolled")}),this.initTelephony(),this.initSearch(),ht(et,async e=>{try{if(e){this.user=await this.resolveUser(e.email),this.startSession(),this.startSessionTimer();const i=U.get("leads"),r=U.get("qms_registry");i&&(this.leads=i),r&&(this.qmsRegistry=r),this.showUI(),this.navigate("dashboard"),this.renderDashboard(),this.fetchAndRenderLeads(),this.fetchConfig(),this.initRealtimeSync(),this.autoSync(),this.forceQmsSync(),setInterval(()=>this.autoSync(),6e4);try{const{data:o}=await b.from("app_config").select("payload").eq("id","migration_complete").maybeSingle();o&&o.payload.active&&(this.legacyFrozen=!0)}catch(o){console.error("Migration Config Delay:",o)}this.initialized=!0}else this.user=null,this.hideUI(),this.navigate("auth")}catch(i){console.error("Auth Handshake Failure:",i)}})},initSearch(){const t=document.getElementById("header-island");t&&t.addEventListener("click",e=>{t.classList.contains("searching")||this.toggleOmniSearch(!0)}),window.addEventListener("keydown",e=>{(e.key==="/"&&document.activeElement.tagName!=="INPUT"&&document.activeElement.tagName!=="TEXTAREA"||e.metaKey&&e.key==="k")&&(e.preventDefault(),this.toggleOmniSearch(!0)),e.key==="Escape"&&this.toggleOmniSearch(!1)}),document.addEventListener("mousedown",e=>{const i=document.getElementById("omni-search-overlay");i&&e.target.id==="omni-search-overlay"&&i.classList.contains("active")&&this.toggleOmniSearch(!1)})},toggleOmniSearch(t){const e=document.getElementById("omni-search-overlay"),i=document.getElementById("omni-search-input"),r=document.getElementById("header-island"),o=document.getElementById("island-default-content"),s=document.getElementById("island-search-active");!e||!i||!r||(t?(e.classList.add("active"),r.classList.add("searching"),o&&(o.style.display="none"),s&&(s.style.display="block"),setTimeout(()=>i.focus(),100)):(e.classList.remove("active"),r.classList.remove("searching"),o&&(o.style.display="flex"),s&&(s.style.display="none"),i.value="",this.renderSearchResults([],[])))},performUniversalSearch(t){if(!t||t.length<2){this.renderSearchResults([],[]);return}const e=t.toLowerCase().trim(),i=n=>String(n||"").toLowerCase().replace(/[^a-z0-9]/g,""),r=i(e),o=this.leads.filter(n=>i(n.name).includes(r)||i(n.phone).includes(r)).slice(0,10),s=(this.qmsRegistry||[]).filter(n=>{const a=n.name||n.customer_name||n.n||"",l=n.phone||n.mobile||n.contact||n.p||"";return i(a).includes(r)||i(l).includes(r)}).slice(0,10);this.renderSearchResults(o,s)},renderSearchResults(t,e){const i=document.getElementById("omni-search-results");if(!i)return;if(t.length===0&&e.length===0){i.innerHTML=`
        <div style="padding: 40px; text-align: center; opacity: 0.5;">
          <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Universal Intelligence Search</div>
          <div style="font-size: 11px; margin-top: 8px;">Type name or phone to scan CRM & QMS registry</div>
        </div>
      `;return}let r="";t.length>0&&(r+='<span class="search-category-label">VERA CRM MATCHES</span>',t.forEach(o=>{r+=`
          <div class="search-result-node" onclick="app.viewLead('${o.id}'); app.toggleOmniSearch(false);">
            <div class="result-icon" style="color: var(--accent); background: var(--accent-soft);">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <div class="result-info">
              <div class="result-name">${o.name}</div>
              <div class="result-meta">${o.phone} • ${o.status||"ACTIVE"}</div>
            </div>
            <button class="result-action-btn">OPEN</button>
          </div>
        `})),e.length>0&&(r+='<span class="search-category-label">QMS SHOWROOM VISITORS</span>',e.forEach(o=>{const s=o.name||o.customer_name||o.n||"Unknown Visitor",n=o.phone||o.mobile||o.contact||o.p||"N/A";r+=`
          <div class="search-result-node" style="border-left: 4px solid var(--success);" onclick="window.open('https://wa.me/${n.replace(/\D/g,"")}', '_blank')">
            <div class="result-icon" style="color: var(--success); background: rgba(52,199,89,0.1);">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
            <div class="result-info">
              <div class="result-name">${s}</div>
              <div class="result-meta">Showroom Visitor • ${n}</div>
            </div>
            <button class="result-action-btn">WA</button>
          </div>
        `})),i.innerHTML=r},initRealtimeSync(){if(this._syncInitialized)return;this._syncInitialized=!0;let t=null;b.channel("leads-all").on("postgres_changes",{event:"*",table:"leads"},e=>{var i;if(console.log(`[REALTIME] Change Detected: ${e.eventType}`),e.eventType==="INSERT"||e.eventType==="UPDATE"){const r=e.new,o=new Map(this.leads.map(n=>[String(n.id),n]));o.set(String(r.id),{...r,timestamp:new Date(r.timestamp).getTime()}),this.leads=Array.from(o.values()).sort((n,a)=>a.timestamp-n.timestamp),this.updateNavStats();const s=((i=document.querySelector(".screen.active"))==null?void 0:i.id.replace("screen-",""))||"dashboard";s==="dashboard"&&this.renderDashboard(),s==="leads"&&this.renderLeads(),U.set("leads",this.leads.slice(0,500))}else clearTimeout(t),t=setTimeout(()=>this.fetchAndRenderLeads(),1e3)}).subscribe()},renderSkeletons(t){const e=document.getElementById(t);if(!e)return;const i=`
          <div class="skeleton-card" style="margin-bottom: 16px;">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width: 80%"></div>
            <div style="display: flex; gap: 10px; margin-top: auto;">
              <div class="skeleton skeleton-pill"></div>
              <div class="skeleton skeleton-pill"></div>
            </div>
          </div>
        `;e.innerHTML=Array(4).fill(i).join("")},renderKPISkeletons(){const t=document.getElementById("kpi-grid");if(!t)return;const e=t.innerHTML.trim();e!==""&&e.includes("kpi-val")||(t.style.display="grid",t.style.gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))",t.style.gap="20px",t.style.marginBottom="48px",t.innerHTML=Array(12).fill('<div class="skeleton-card-premium"></div>').join(""),t.dataset.rendered="false")},async fetchAndRenderLeads(){var r,o,s;if(!this.user)return;const t=((r=document.querySelector(".screen.active"))==null?void 0:r.id.replace("screen-",""))||"dashboard";if(t==="leads"&&this.renderSkeletons("leads-container"),t==="dashboard"){this.renderKPISkeletons();const n=document.getElementById("col-queue"),a=document.getElementById("col-tasks"),l=document.getElementById("col-secured");n&&this.renderSkeletons("col-queue"),a&&this.renderSkeletons("col-tasks"),l&&this.renderSkeletons("col-secured")}const e=["Admin","Supervisor"].includes(this.user.role),i=n=>n.map(a=>{let l=null;if(typeof a.timestamp=="number")l=a.timestamp;else if(a.timestamp){const d=new Date(a.timestamp).getTime();isNaN(d)||(l=d)}return!l&&a.history&&Array.isArray(a.history)&&a.history.length>0&&(l=a.history[0].time),{...a,timestamp:l||Date.now(),owner:a.owner||a.added_by||"anonymous",owner_name:a.owner_name||"Staff Member",added_by:a.added_by||a.owner_email||"System"}}).filter(a=>{if(e)return!0;const l=this.user.id,d=this.user.email;return a.owner===l||a.owner===d||a.assigned_to===l||a.added_by===d||a.added_by===l});try{this.renderKPISkeletons();const n=((o=document.querySelector(".screen.active"))==null?void 0:o.id.replace("screen-",""))||"dashboard";console.log("[SYNC] Initiating Full Integrity Hydration..."),this.renderKPISkeletons();const a=U.get("leads"),l=U.get("qms_registry");a&&a.length>0&&(this.leads=a,l&&(this.qmsRegistry=l),this.updateNavStats(),n==="dashboard"&&this.renderDashboard(),console.log(`[SYNC] Stash Ignition Complete: ${this.leads.length} Leads, ${((s=this.qmsRegistry)==null?void 0:s.length)||0} Visitors.`)),(async()=>{const{count:d,error:u}=await b.from("leads").select("*",{count:"exact",head:!0});if(u)return;const c=d,h=1e3,f=Math.ceil(c/h),p=[];for(let g=0;g<f;g++){const{data:v,error:y}=await b.from("leads").select("id, name, phone, location, interest, source, status, priority, timestamp, owner, owner_name, added_by, assigned_to, type, followup_date, enquiry_note, executive_comment, history").range(g*h,(g+1)*h-1).order("timestamp",{ascending:!1});if(v){p.push({data:v});const I=i(p.flatMap(T=>T.data||[]));this.leads=I,this.updateNavStats(),n==="dashboard"&&this.renderDashboard()}await new Promise(I=>setTimeout(I,200))}const x=p.flatMap(g=>g.data||[]);x.length>0&&(this.leads=i(x),this.updateNavStats(),n==="dashboard"&&this.renderDashboard(),U.set("leads",this.leads.slice(0,1e4)),console.log(`[SYNC] Parallel Sync Complete: ${this.leads.length} records in vault.`))})(),(async()=>{var u;const d=Date.now();if(!this._lastQmsSync||d-this._lastQmsSync>12e4)try{const c=async(v,y)=>{let I=[];try{const{data:T,error:C}=await v.from("sessions").select("id, name, phone, mobile, contact, ts, created_at, queue_status, sale_status").order("created_at",{ascending:!1}).limit(2e3);T&&(I=I.concat(T),console.log(`[QMS] ${y} Sessions Captured: ${T.length} nodes.`));const{data:E}=await v.from("qms_registry").select("phone, mobile, contact, name, ts, created_at, status").limit(500);E&&(I=I.concat(E))}catch(T){console.warn(`[QMS] ${y} Probe Bypass:`,T)}return I},[h,f,p]=await Promise.all([c(Et,"HUB-A"),c(It,"HUB-B"),c(b,"MAIN-HUB")]),x=[...h,...f,...p];this.qmsRegistry=x.map(v=>{const y=String(v.phone||v.mobile||v.contact||v.customer_phone||v.customer_mobile||v.p||"").replace(/\D/g,"").slice(-10),I=String(v.name||v.customer_name||v.customer||v.n||"").toLowerCase().trim().replace(/^(mr\.|ms\.|mrs\.|dr\.|shri\.|smt\.)\s+/g,"").replace(/\s+/g," "),T=String(v.queue_status||v.status||"").toLowerCase();return{...v,_p:y,_n:I,_s:T}}).filter(v=>v._p||v._n),U.set("qms_registry",this.qmsRegistry),this._lastQmsSync=d,this.triggerStrategicKPIs&&this.triggerStrategicKPIs(),console.log(`[SYNC] High-Precision QMS Hydrated: ${this.qmsRegistry.length} visitors ready.`),(((u=document.querySelector(".screen.active"))==null?void 0:u.id.replace("screen-",""))||"dashboard")==="dashboard"&&this.renderDashboard()}catch(c){console.warn("QMS Sync Deferred",c)}})(),(async()=>{var d;try{const{data:u,error:c}=await b.from("audit_logs").select("*").eq("member_id",this.user.id).eq("status","pending");c||(this.myAuditCount=u?u.length:0,(((d=document.querySelector(".screen.active"))==null?void 0:d.id.replace("screen-",""))||"dashboard")==="dashboard"&&this.renderDashboard())}catch{}})()}catch(n){console.error("Vault Sync Error:",n),this.toast(`Sync Failure: ${n.message||"Unknown Protocol Error"}`,"error"),this.leads||(this.leads=[]),this.renderDashboard()}},async fetchConfig(){try{const{data:t,error:e}=await b.from("app_config").select("*");if(e)throw e;t.forEach(r=>{if(r.id==="goldRates"&&(this.goldRates={...this.goldRates,...r.payload}),r.id==="announcement"){const o=document.getElementById("dash-announcement-text");o&&(o.textContent=r.payload.text)}});const{data:i}=await b.from("staff").select("id, name, role");i&&(this.staffRegistry={},i.forEach(r=>this.staffRegistry[r.id]=r))}catch(t){console.warn("Config Sync Fault:",t)}},updateCalc(t=!1){const e=document.getElementById("calc-weight"),i=document.getElementById("calc-purity"),r=document.getElementById("calc-gst"),o=document.getElementById("calc-making");!t&&e&&i&&(this.calcState={weight:parseFloat(e.value)||0,purity:i.value,gst:r?r.checked:!1,making:parseFloat(o?o.value:0)||0});const s=this.goldRates[this.calcState.purity]||0,n=this.calcState.purity;let a=0,l="",d=0;if(n==="Coin")d=s*this.calcState.weight,l=`Gold Coin: ₹${this.fmt(s)}/g (Net Price)`;else if(n==="Silver Coin"){if(a=s*this.calcState.weight,d=a,l=`Silver Coin: ₹${this.fmt(s)}/g`,this.calcState.gst){const p=a*.03;d+=p,l+=` + 3% GST (₹${this.fmt(p)})`}}else if(n.startsWith("Silver")){if(a=(s+30)*this.calcState.weight,d=a,l=`Silver: ₹${this.fmt(s)} + ₹30 Making /g`,this.calcState.gst){const p=a*.03;d+=p,l+=` + 3% GST (₹${this.fmt(p)})`}}else{const p=s*this.calcState.weight,x=p*(this.calcState.making/100);if(a=p+x,l=`Gold: ₹${this.fmt(s)}/g`,this.calcState.making>0&&(l+=` + ${this.calcState.making}% making`),d=a,this.calcState.gst){const g=a*.03;d+=g,l+=` + 3% GST (₹${this.fmt(g)})`}}const u=Math.round(d/100)*100;this.calcState.lastExact=Math.round(d),this.calcState.lastApprox=u;const c=document.getElementById("calc-result"),h=document.getElementById("calc-approx"),f=document.getElementById("calc-breakdown");c&&(c.textContent=`₹${this.fmt(d)}`),h&&(h.textContent=`Approx: ₹${this.fmt(u)}`),f&&(f.textContent=l)},setPricingTab(t){this.activePricingTab=t,this.renderDashboard()},setCalcPurity(t){this.calcState.purity=t,this.renderDashboard()},editRates(){const t=Object.keys(this.goldRates),e={};for(const i of t){const r=prompt(`Update ${i} Price (current: ${this.goldRates[i]})`,this.goldRates[i]);if(r===null)return;e[i]=parseFloat(r)||this.goldRates[i]}this.goldRates=e,this.toast("Terminal Rates Synchronized 💰"),this.renderDashboard()},copyQuote(){const t=this.calcState.lastExact||0,e=this.calcState.weight||0,i=this.calcState.purity||"NA";let r=`${this.calcState.making||0}%`;i==="Coin"?r="3% Included":i==="Silver Coin"&&(r="0 (No Making Charges)");let o=this.calcState.gst?"3% Included":"Not Included";i==="Coin"&&(o="3% Included");const s=i.toLowerCase().includes("silver")?"Silver":"Gold",n=`Pravesh ${s} Quote 
Purity - ${i}
approx weight - ${e}g
approx making - ${r}
GST - ${o}
approx price - ₹${this.fmt(t)}

price may change according to ${s.toLowerCase()} rate`;navigator.clipboard.writeText(n).then(()=>this.toast("Official Quote Copied 🛡️"))},async resolveUser(t){const e=t.split("@")[0],{data:i,error:r}=await b.from("staff").select("*").eq("id",e).single();let o=i;if(o)t.toLowerCase()==="rajendra.praveshgold@gmail.com"&&o.role!==D.ADMIN&&(o.role=D.ADMIN,await b.from("staff").update({role:D.ADMIN}).eq("id",e));else{const{data:s}=await b.from("staff").select("id");let n=s&&s.length===0?D.ADMIN:D.MEMBER;t.toLowerCase()==="rajendra.praveshgold@gmail.com"&&(n=D.ADMIN),o={id:e,email:t,role:n,name:e.toUpperCase()},await b.from("staff").upsert([o])}return o},async handleLogin(){const t=document.getElementById("login-id").value.trim(),e=document.getElementById("login-pass").value.trim();if(!t||!e)return this.toast("Staff ID & Access Key Required","error");const i=(t.includes("@")?t:t+"@vera.gold").toLowerCase();try{await ut(et,i,e)}catch(r){console.error("Login call failed:",r);let o="Security Access Denied";r.code==="auth/user-not-found"&&(o="Invalid Staff ID"),r.code==="auth/wrong-password"&&(o="Invalid Access Key"),r.code==="auth/invalid-email"&&(o="Invalid Terminal Format"),r.code==="auth/network-request-failed"&&(o="Check Connection"),this.toast(o,"error")}},startSessionTimer(){const t="vera_session_start";let e=localStorage.getItem(t);e||(e=Date.now().toString(),localStorage.setItem(t,e)),this.sessionStartTime=parseInt(e,10),this._sessionTimerInterval&&clearInterval(this._sessionTimerInterval);const i=()=>{const r=Date.now()-this.sessionStartTime,o=Math.floor(r/36e5).toString().padStart(2,"0"),s=Math.floor(r%36e5/6e4).toString().padStart(2,"0"),n=Math.floor(r%6e4/1e3).toString().padStart(2,"0"),a=document.getElementById("session-timer-display");a&&(a.textContent=`${o}:${s}:${n}`);const l=document.getElementById("session-timer");l&&(l.textContent=`${s.padStart(2,"0")}:${n.padStart(2,"0")}`)};i(),this._sessionTimerInterval=setInterval(i,1e3)},async saveGoldRates(t){try{await b.from("app_config").upsert([{id:"goldRates",payload:{...t,updatedBy:this.user.name},updated_at:new Date().toISOString()}]),this.toast("Pricing Protocol Broadcasted 🛰️")}catch(e){console.error("Rate broadcast failed:",e),this.toast("Terminal Sync Failure","error")}},editGoldRates(){this.navigate("profile"),setTimeout(()=>{const t=document.getElementById("rate-management-sec");t&&t.scrollIntoView({behavior:"smooth"})},300)},pushNewRates(){const t={};Object.keys(this.goldRates).forEach(e=>{const i=document.getElementById(`rate-edit-${e}`);i&&(t[e]=parseFloat(i.value)||0)}),this.saveGoldRates(t)},setPdfFilter(t){this._pdfFilter=t,["day","week","month","all"].forEach(s=>{const n=document.getElementById(`pdf-filter-${s}`);n&&(s===t?(n.style.background="rgba(0,122,255,0.12)",n.style.border="2px solid rgba(0,122,255,0.4)",n.style.color="#007AFF"):(n.style.background="rgba(0,0,0,0.04)",n.style.border="2px solid transparent",n.style.color="var(--text-muted)"))});const e=new Date;let i=0;if(t==="day"){const s=new Date(e);s.setHours(0,0,0,0),i=s.getTime()}else if(t==="week"){const s=new Date(e);s.setDate(s.getDate()-7),i=s.getTime()}else if(t==="month"){const s=new Date(e);s.setDate(s.getDate()-30),i=s.getTime()}const r=t==="all"?this.leads:this.leads.filter(s=>{var n;return((n=s.createdAt)!=null&&n.seconds?s.createdAt.seconds*1e3:0)>=i}),o=document.getElementById("pdf-preview-count");o&&(o.textContent=`${r.length} record${r.length!==1?"s":""} will be exported for the selected range.`)},async renderReportSelector(){const{data:t}=await b.from("staff").select("*"),e=`
            <div style="padding: 32px;">
              <h2 style="font-size: 24px; font-weight: 850; letter-spacing: -1px; color: var(--text-primary); margin-bottom: 8px;">Executive Report Selector</h2>
              <p style="font-size: 13px; color: var(--text-muted); font-weight: 600; margin-bottom: 32px;">Configure parameters for strategic data aggregation.</p>
              
              <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Member Selection -->
                <div>
                  <label class="label">Select Executive Member</label>
                  <select id="rep-member" class="input" style="height: 52px; border-radius: 16px;">
                    <option value="all">All System Personnel</option>
                    ${t.map(i=>`<option value="${i.id}">${i.name||i.id.toUpperCase()}</option>`).join("")}
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
          `;this.renderModal(e)},handleReportIntervalChange(){const t=document.getElementById("rep-interval").value;document.getElementById("sec-rep-date").style.display=t==="today"?"block":"none",document.getElementById("sec-rep-custom").style.display=t==="custom"?"grid":"none"},async processReportGeneration(){const t=document.getElementById("rep-member").value,e=document.getElementById("rep-interval").value,i=document.getElementById("rep-date").value,r=document.getElementById("rep-start").value,o=document.getElementById("rep-end").value;await this.downloadLeadsPDF({memberId:t,interval:e,specificDate:i,start:r,end:o})},async downloadLeadsPDF(t={}){const{memberId:e="all",interval:i="all",specificDate:r,start:o,end:s}=t,n=new Date;let a=0,l=1/0,d="Lifetime Data";if(i==="today"&&r){const p=new Date(r);p.setHours(0,0,0,0),a=p.getTime(),p.setHours(23,59,59,999),l=p.getTime(),d=`On ${new Date(r).toLocaleDateString("en-IN")}`}else if(i==="week"){const p=new Date(n);p.setDate(p.getDate()-7),a=p.getTime(),d="Past 7 Days"}else if(i==="month"){const p=new Date(n);p.setDate(p.getDate()-30),a=p.getTime(),d="Past 1 Month"}else if(i==="3months"){const p=new Date(n);p.setDate(p.getDate()-90),a=p.getTime(),d="Past 3 Months"}else if(i==="6months"){const p=new Date(n);p.setDate(p.getDate()-180),a=p.getTime(),d="Past 6 Months"}else if(i==="1year"){const p=new Date(n);p.setDate(p.getDate()-365),a=p.getTime(),d="Past 1 Year"}else i==="custom"&&o&&s&&(a=new Date(o).setHours(0,0,0,0),l=new Date(s).setHours(23,59,59,999),d=`${new Date(o).toLocaleDateString("en-IN")} to ${new Date(s).toLocaleDateString("en-IN")}`);let u=this.leads.filter(p=>{var y,I;const x=(y=p.createdAt)!=null&&y.seconds?p.createdAt.seconds*1e3:p.timestamp||0,g=x>=a&&x<=l,v=e==="all"||p.owner===e||((I=p.addedBy)==null?void 0:I.includes(e));return g&&v});if(!u.length){this.toast("No strategic records found for these parameters","error");return}const c=u.map((p,x)=>{var y;const g=(y=p.createdAt)!=null&&y.seconds?new Date(p.createdAt.seconds*1e3).toLocaleDateString("en-IN"):"N/A",v=p.followUpDate||"Not Scheduled";return`<tr style="background:${x%2===0?"#fff":"#f9f9f9"}">
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${x+1}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;font-weight:700;">${p.name||"—"}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${p.phone||"—"}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${p.interest||"—"}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${p.queryType||"—"}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${p.priority||"—"}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${g}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${v}</td>
              <td style="padding:10px 12px;border-bottom:1px solid #eee;">${p.addedBy||"—"}</td>
            </tr>`}).join(""),h=`<!DOCTYPE html><html><head><meta charset="UTF-8">
          <title>VERA CRM - Lead Export (${d})</title>
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
            <p>Parameter: ${e==="all"?"Consolidated Registry":e.toUpperCase()} &nbsp;|&nbsp; Range: ${d}</p>
            <p style="margin-top: 8px;">Generated: ${new Date().toLocaleString("en-IN")} &nbsp;|&nbsp; Total Records: ${u.length}</p>
          </div>
          <div class="meta">
            <div class="meta-card"><div class="val">${u.length}</div><div class="lbl">Total Leads</div></div>
            <div class="meta-card"><div class="val">${u.filter(p=>p.priority==="Hot").length}</div><div class="lbl">Hot Leads</div></div>
            <div class="meta-card"><div class="val">${u.filter(p=>p.priority==="Warm").length}</div><div class="lbl">Warm Leads</div></div>
            <div class="meta-card"><div class="val">${u.filter(p=>p.isFollowUp==="yes").length}</div><div class="lbl">Follow-ups</div></div>
          </div>
          <table>
            <thead><tr>
              <th>#</th><th>Name</th><th>Phone</th><th>Interest</th><th>Query Type</th><th>Priority</th><th>Captured</th><th>Follow-up</th><th>Added By</th>
            </tr></thead>
            <tbody>${c}</tbody>
          </table>
          <div class="footer">VERA Exclusive Terminal &nbsp;•&nbsp; Confidential &nbsp;•&nbsp; Not for distribution</div>
          </body></html>`,f=window.open("","_blank");if(!f){this.toast("Allow popups to generate PDF","error");return}f.document.write(h),f.document.close(),f.focus(),setTimeout(()=>{f.print()},600)},async logout(){this._sessionTimerInterval&&(clearInterval(this._sessionTimerInterval),this._sessionTimerInterval=null),localStorage.removeItem("vera_session_start");const t=document.getElementById("session-timer-display");t&&(t.textContent="00:00:00"),await gt(et)},updateModalQuote(){const t=document.getElementById("modal-calc-weight"),e=document.getElementById("modal-calc-purity"),i=document.getElementById("modal-quote-val");if(!t||!e||!i)return;const r=parseFloat(t.value)||0,o=e.value,s=this.goldRates[o]||0;let n=0;o==="Coin"?n=s*r:o==="Silver Coin"?n=s*r*1.03:o.startsWith("Silver")?n=(s+30)*r*1.03:n=r*s*1.03;const a=document.querySelectorAll(".modal-quote-val"),l=r>0?`₹${this.fmt(n)}`:"₹0.00";a.forEach(d=>d.textContent=l)},async captureQuote(t){const e=document.getElementById("modal-calc-weight"),i=document.getElementById("modal-calc-purity");if(!e||!i||parseFloat(e.value)<=0)return this.toast("Valid Weight Required","warning");const r=e.value,o=i.value,s=this.goldRates[o],n=Math.round(r*s),a=`Quote Generated: ₹${this.fmt(n)} (${r}g @ ${o})`;try{const l=this.leads.find(u=>String(u.id)===String(t));if(!l)return;const d=l.history||[];d.push({time:Date.now(),action:a}),await b.from("leads").update({history:d}).eq("id",t),this.toast("Tactical Quote Logged 📜")}catch(l){console.error("Quote logging failed:",l),this.toast("Vault Write Failure","error")}},async logManualNote(t){const e=document.getElementById("manual-note-input");if(!e||!e.value.trim())return;const i=e.value.trim(),r=`Executive Remark (${this.user.name||"Member"}): ${i}`;try{const o=this.leads.find(n=>String(n.id)===String(t));if(!o)return;const s=o.history||[];s.push({time:Date.now(),action:r}),await b.from("leads").update({history:s}).eq("id",t),this.toast("Remark Logged 🖋️"),e.value="",this.viewLead(t)}catch(o){console.error("Note logging failed:",o),this.toast("Vault Write Failure","error")}},showUI(){const t=document.getElementById("screen-auth"),e=document.getElementById("app-body"),i=document.getElementById("bottom-nav"),r=document.getElementById("header-island");t&&(t.classList.remove("active"),t.style.display="none"),e&&(e.style.display="flex",e.style.visibility="visible",e.style.opacity="1"),i&&(i.style.display="flex"),r&&r.style.setProperty("display","flex","important"),this.handleSegmentChange(),this.checkTacticalAlerts(),this.startSession(),this.updateGreeting()},navigateWithFilter(t,e){this.currentFilter=e,this.navigate(t)},hideUI(){const t=document.getElementById("screen-auth"),e=document.getElementById("app-body"),i=document.getElementById("bottom-nav"),r=document.getElementById("header-island");t&&(t.style.display="flex",setTimeout(()=>t.classList.add("active"),10)),e&&(e.style.display="none"),i&&(i.style.display="none"),r&&r.style.setProperty("display","none","important")},navigate(t){const e=this.user?this.user.role:"Member",i=["Admin","Supervisor"].includes(e),r=document.getElementById("nav-stats");r&&(r.style.display=i||e==="Admin"?"flex":"none");const o=document.getElementById("nav-admin");o&&(o.style.display=e===D.ADMIN||e==="Admin"?"flex":"none");const s=document.getElementById("nav-audit");s&&(s.style.display=i||e==="Admin"?"flex":"none"),t==="stats"&&e!=="Admin"&&(this.toast("Security Access: Strategic Clearance Required","error"),t="dashboard"),t==="admin-panel"&&e!=="Admin"&&e!==D.ADMIN&&(this.toast("Security Access: Sovereign Clearance Required","error"),t="dashboard"),console.log("EXEC_NAVIGATE:",t),document.querySelectorAll(".screen, .auth-screen").forEach(u=>{u.classList.remove("active"),u.style.display="none",u.style.opacity="0",u.style.visibility="hidden"}),document.querySelectorAll(".nav-item").forEach(u=>u.classList.remove("active"));const n=document.getElementById(`nav-${t}`);n&&n.classList.add("active"),document.querySelectorAll(".dock-item").forEach(u=>u.classList.remove("active"));const a=document.getElementById(`dock-${t}`);a&&a.classList.add("active");const l=document.getElementById(`screen-${t}`);if(l){l.style.display="flex",l.offsetHeight,l.classList.add("active"),l.style.opacity="1",l.style.visibility="visible";try{if(t==="dashboard"&&this.renderDashboard(),t==="missions"&&this.checkTacticalAlerts(),t==="leads"&&this.refreshLeads(),t==="messages"&&this.renderChatMembers(),t==="activity"&&this.renderActivity(),t==="profile"&&this.renderProfile(),t==="stats"&&this.renderAnalytics(),t==="admin-panel"&&this.renderAdminPanel(),t==="audit"&&this.renderAuditHub(),t==="add-lead"){const u=document.getElementById("enroll-form");u&&u.reset(),this.handleSegmentChange()}}catch(u){console.error("DATA_HANDSHAKE_FAIL:",u)}}const d=document.getElementById("island-text");if(d){const u={missions:"RADAR",dashboard:"HUB",leads:"VAULT",activity:"PULSE","add-lead":"NEW ENROLL",profile:"EXEC TERM",messages:"TEAM HUB",stats:"STRATEGIC"};d.textContent=u[t]||"TERMINAL"}this.updateIslandStatus(),document.querySelectorAll(".nav-item").forEach(u=>{const c=u.getAttribute("onclick")&&u.getAttribute("onclick").includes(t);u.style.color=c?"var(--accent)":"var(--text-muted)",u.style.opacity=c?"1":"0.4",c?u.classList.add("active"):u.classList.remove("active")}),window.scrollTo(0,0)},startSession(){const t=new Date,e=t.toISOString().split("T")[0];let i=JSON.parse(localStorage.getItem("pg_sessions_v7")||"{}");i[e]||(i[e]={login:t.getTime(),stop:this.getStopAt().getTime()},localStorage.setItem("pg_sessions_v7",JSON.stringify(i))),this.session=i[e]},getStopAt(){const t=new Date,e=new Date(t);return e.setUTCHours(17,30,0,0),t.getUTCHours()>=17&&t.getUTCMinutes()>=30&&e.setUTCDate(e.getUTCDate()+1),e},updateGreeting(){const t=document.getElementById("greeting-text");if(t&&this.user){const e=new Date().getHours(),i=e<12?"Good Morning":e<17?"Good Afternoon":"Good Evening";t.textContent=`${i}, ${this.user.name}`}},async editAnnouncement(){const t=document.getElementById("dash-announcement-text")?document.getElementById("dash-announcement-text").textContent.trim():"",e=prompt("Administrative Command Center: Update Terminal Briefing",t);if(e!==null&&e!==t)try{await b.from("app_config").upsert([{id:"announcement",payload:{text:e,updatedBy:this.user.name},updated_at:new Date().toISOString()}]),this.toast("Terminal Registry Synchronized 🔐"),this.navigate("dashboard")}catch{this.toast("Terminal Communication Error","error")}},updateIslandTimer(){if(!this.sessionStartTime)return;const t=document.getElementById("island-timer");if(!t)return;const e=Date.now(),i=Math.max(0,e-this.sessionStartTime),r=Math.floor(i/(1e3*60*60)),o=Math.floor(i%(1e3*60*60)/(1e3*60)),s=Math.floor(i%(1e3*60)/1e3);t.textContent=`${r.toString().padStart(2,"0")}:${o.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`},updateIslandStatus(){const t=document.getElementById("island-dot"),e=document.getElementById("island-yield"),i=document.getElementById("header-island");if(!t||!e||i&&i.classList.contains("searching"))return;if(!navigator.onLine){t.style.background="var(--error)";return}e.textContent=this.sessionYield;const o=document.getElementById("island-stash");if(o){const l=(U.getStats().nodes/1e3).toFixed(1);o.textContent=`${l}k`}const s=[...this.leads].filter(a=>a.priority==="Hot"&&a.status!=="Purchased").sort((a,l)=>{const d=typeof a.timestamp=="number"?a.timestamp:new Date(a.timestamp).getTime();return(typeof l.timestamp=="number"?l.timestamp:new Date(l.timestamp).getTime())-d})[0],n=document.getElementById("island-expanded");n&&(s?n.innerHTML=`
                <div style="display: flex; flex-direction: column; gap: 12px; color: #fff;">
                  <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                      <div style="font-size: 9px; font-weight: 950; color: #FF3B30; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">HOT ALERT</div>
                      <div style="font-size: 16px; font-weight: 900; color: #fff; letter-spacing: -0.5px;">${s.name}</div>
                    </div>
                    <button onclick="app.viewLead('${s.id}')" style="background: var(--success); color: white; border: none; padding: 6px 12px; border-radius: 10px; font-size: 10px; font-weight: 950; cursor: pointer;">DEPLOY</button>
                  </div>
                  <div style="font-size: 11px; color: rgba(255,255,255,0.6); font-weight: 700; line-height: 1.4; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                    Strategic entry detected in ${s.location||"Terminal"}. High conversion probability.
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-top: 8px;">
                     <button onclick="app.navigate('missions')" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 12px; font-size: 10px; font-weight: 900; color: #fff; cursor: pointer;">RADAR HUB</button>
                     <button onclick="app.navigate('add-lead')" style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.05); padding: 12px; border-radius: 12px; font-size: 10px; font-weight: 950; color: var(--success); cursor: pointer;">EXTEND YIELD</button>
                  </div>
                </div>
              `:n.innerHTML='<div style="padding: 20px; text-align: center; font-size: 11px; color: rgba(255,255,255,0.4); font-weight: 700; text-transform: uppercase;">Channel Secure</div>')},toggleNotifications(){const t=document.getElementById("notif-drawer");if(t&&(t.classList.toggle("active"),t.classList.contains("active"))){this.renderNotifications();const e=document.getElementById("notif-badge");e&&(e.style.display="none"),localStorage.setItem("notif-read-time",Date.now())}},clearNotifications(){const t=document.getElementById("notif-list");t&&(t.innerHTML='<div style="padding: 40px 0; text-align: center; opacity: 0.3; font-weight: 600; font-size: 13px;">Tactical stream clear.</div>');const e=document.getElementById("notif-badge");e&&(e.style.display="none");const i=document.getElementById("notif-count-pill");i&&(i.textContent="0")},renderNotifications(){const t=document.getElementById("notif-list");if(!t)return;const e=parseInt(localStorage.getItem("notif-read-time")||0),i=[];this.leads.filter(a=>a.priority==="Hot"&&a.status==="New Inquiry").forEach(a=>{i.push({type:"hot",title:"Action Required",desc:`${a.name} - High-Intent lead captured. View registry immediately.`,time:a.timestamp,id:a.id})}),this.leads.filter(a=>a.status==="Follow-up").forEach(a=>{i.push({type:"urgent",title:"Follow-up Reminder",desc:`Scheduled outreach for ${a.name}.`,time:a.timestamp,id:a.id})});const r=i.sort((a,l)=>l.time-a.time).slice(0,10),o=r.filter(a=>a.time>e).length,s=document.getElementById("notif-badge");s&&(s.style.display=o>0?"block":"none");const n=document.getElementById("notif-count-pill");n&&(n.textContent=r.length),t.innerHTML=r.length?r.map(a=>`
 <div class="notif-card" onclick="app.viewLead('${a.id}'); app.toggleNotifications();">
 <div style="display: flex; gap: 16px; align-items: flex-start;">
 <div style="width: 42px; height: 42px; border-radius: 12px; background: ${a.type==="hot"?"rgba(255, 149, 0, 0.1)":"rgba(255, 59, 48, 0.1)"}; color: ${a.type==="hot"?"var(--warning)":"var(--error)"}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: inset 0 0 0 1px ${a.type==="hot"?"rgba(255, 149, 0, 0.2)":"rgba(255, 59, 48, 0.2)"};">
 ${a.type==="hot"?'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83zM11 16h2v2h-2v-2zm0-7h2v5h-2V9z"/></svg>':'<svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>'}
 </div>
 <div style="flex: 1;">
 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
 <div style="font-weight: 850; font-size: 15px; color: var(--text-primary); letter-spacing: -0.3px;">${a.title}</div>
 <div style="font-size: 10px; font-weight: 750; color: var(--text-muted); opacity: 0.9;">${new Date(a.time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
 </div>
 <div style="font-size: 13px; line-height: 1.5; color: var(--text-secondary);">${a.desc}</div>
 </div>
 </div>
 </div>`).join(""):'<div style="padding: 40px 0; text-align: center; opacity: 0.3; font-weight: 600; font-size: 13px;">Operations secure.</div>'},async renderDashboard(){this.updateGreeting(),this.updateIslandStatus(),this.renderNotifications();const t=new Date().setHours(0,0,0,0),e=U.get("qms_registry");e&&(!this.qmsRegistry||this.qmsRegistry.length===0)&&(this.qmsRegistry=e),this.triggerStrategicKPIs();const i=new Date().toISOString().split("T")[0],r=m=>String(m||"").toLowerCase().replace(/[^a-z0-9]/g,"").trim(),o=m=>{const S=String(m||"").replace(/\D/g,"");return S.length>=10?S.slice(-10):null},s={},n={};(this.qmsRegistry||[]).forEach(m=>{const S=o(m.phone||m.mobile||m.contact||m.p),N=r(m.name||m.customer_name||m.n),$=new Date(m.created_at||m.timestamp||m.ts||Date.now()).getTime(),M=String(m.status||m.entry_type||m.sale_status||m.queue_status||"").toUpperCase(),L=M.includes("PURCHASED")||m.converted||M==="SUCCESS"||M==="SUCCESSFUL";S&&(!s[S]||L)&&(s[S]={...m,isSuccess:L,qTs:$}),N&&N.length>3&&(!n[N]||L)&&(n[N]={...m,isSuccess:L,qTs:$})});let a=this.leads.reduce((m,S)=>{const N=typeof S.timestamp=="number"?S.timestamp:new Date(S.timestamp).getTime(),$=S.type==="short"||S.type==="Short"||S.type==="short-reg";if(!(["Admin","Supervisor"].includes(this.user.role)||S.owner===this.user.id||S.owner===this.user.email||S.assigned_to===this.user.id||S.added_by===this.user.email))return m;const j=Array.isArray(S.history)?S.history:[],q=(j.length>0&&j[0].time?j[0].time:N)>=t;return q&&!$&&m.todayTotal++,q&&$&&m.todayShort++,$?m.totalShort++:m.totalLong++,!$&&(S.followup_date===i||S.followup_date&&S.followup_date.includes(i))&&m.todayFollowupCount++,!$&&S.priority==="Hot"&&S.status!=="Purchased"&&m.hotTotal++,!$&&S.status==="Follow-up"&&m.totalFollowupCount++,!$&&S.status==="Purchased"&&m.purchasedTotal++,m},{todayTotal:0,todayShort:0,hotTotal:0,todayFollowupCount:0,totalFollowupCount:0,purchasedTotal:0,totalLong:0,totalShort:0});const l=this.myAuditCount||0,{todayTotal:d,todayShort:u,hotTotal:c,todayFollowupCount:h,totalFollowupCount:f,purchasedTotal:p,totalLong:x,totalShort:g}=a,v=document.querySelector(".dash-hero-header");if(v){const m=v.querySelector("h1");m&&(m.style.fontSize="36px")}const y=document.getElementById("kpi-grid");if(!y)return;(y.innerHTML.trim()===""||y.dataset.rendered!=="true"||y.dataset.version!=="optimized_v2")&&(y.style.display="grid",y.style.gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))",y.style.gap="20px",y.style.marginBottom="48px",y.innerHTML=`

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
                <div class="card elevated" id="kpi-wrong-chats" style="padding: 24px; border-radius: 28px; background: rgba(255, 59, 48, 0.05); border: 1.5px dashed #FF3B30; display: ${l>0?"flex":"none"}; flex-direction: column; gap: 14px; grid-column: span 1;">
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

      `,y.dataset.rendered="true",y.dataset.version="optimized_v2"),this.triggerStrategicKPIs&&(setTimeout(()=>this.triggerStrategicKPIs(),50),this.triggerStrategicKPIs()),this.animateCount("kpi-val-todayTotal",d),this.animateCount("kpi-val-todayShort",u),this.animateCount("kpi-val-todayFollowupCount",h),this.animateCount("kpi-val-hotTotal",c),this.animateCount("kpi-val-totalFollowupCount",f),this.animateCount("kpi-val-totalLeads",this.leads.length),this.animateCount("kpi-val-totalLong",x),this.animateCount("kpi-val-totalShort",g),this.animateCount("kpi-val-auditCount",l);const T=["Admin","Supervisor"].includes(this.user.role),C=document.getElementById("team-command-board");if(C&&(C.style.display=T?"block":"none"),C&&T){const m={},S=this.leads.filter(w=>{var k;return!((k=w.type)!=null&&k.includes("short"))});S.forEach(w=>{const k=w.owner_name||w.added_by||"Unknown";m[k]||(m[k]={name:k,todayFull:0,todayShort:0,total:0,hot:0,purchased:0,followup:0});const P=typeof w.timestamp=="number"?w.timestamp:new Date(w.timestamp).getTime(),_=w.history||[];(_.length>0&&_[0].time?_[0].time:P)>=t&&m[k].todayFull++,w.priority==="Hot"&&w.status!=="Purchased"&&m[k].hot++,w.status==="Purchased"&&m[k].purchased++,w.status==="Follow-up"&&m[k].followup++,m[k].total++}),this.leads.filter(w=>{var k;return(k=w.type)==null?void 0:k.includes("short")}).forEach(w=>{const k=w.owner_name||w.added_by||"Unknown";m[k]||(m[k]={name:k,todayFull:0,todayShort:0,total:0,hot:0,purchased:0,followup:0});const P=typeof w.timestamp=="number"?w.timestamp:new Date(w.timestamp).getTime(),_=w.history||[];(_.length>0&&_[0].time?_[0].time:P)>=t&&m[k].todayShort++,m[k].total++});const N=Object.values(m).sort((w,k)=>k.todayFull+k.todayShort-(w.todayFull+w.todayShort)),$=Math.max(...N.map(w=>w.todayFull+w.todayShort),1),M=N[0]||{name:"Unknown",purchased:0,hot:0,followup:0,todayFull:0,todayShort:0},L=M.todayFull+M.todayShort,j=S.filter(w=>w.status==="Purchased").length,Y=S.length>0?(j/S.length*100).toFixed(1):"0.0";S.filter(w=>{const k=typeof w.timestamp=="number"?w.timestamp:new Date(w.timestamp).getTime(),P=w.history||[];return(P.length>0&&P[0].time?P[0].time:k)>=t}).length;const q=S.filter(w=>{const k=typeof w.timestamp=="number"?w.timestamp:new Date(w.timestamp).getTime(),P=w.history||[];return(P.length>0&&P[0].time?P[0].time:k)>=t&&w.status==="Purchased"}).length,lt=Date.now()-7*24*60*60*1e3,X=S.filter(w=>(typeof w.timestamp=="number"?w.timestamp:new Date(w.timestamp).getTime())>=lt).length,dt=X>0?(X/7).toFixed(1):"0.0";triggerStrategicKPIs(),C.innerHTML=`
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
                                <div style="font-size: 28px; font-weight: 950; color: #fff; letter-spacing: -1.5px; margin-top: 6px;">${M.name.split("@")[0]}</div>
                             </div>
                          </div>
                          <div style="background: rgba(255,215,0,0.1); color: #FFD700; padding: 10px 20px; border-radius: 14px; font-size: 11px; font-weight: 950; border: 1px solid rgba(255,215,0,0.2); letter-spacing: 2px;">VANGUARD</div>
                       </div>
                       
                       <div style="margin-bottom: 40px;">
                          <div style="display: flex; align-items: baseline; gap: 12px;">
                             <div style="font-size: 84px; font-weight: 950; color: #fff; letter-spacing: -5px; line-height: 0.8;">${L}</div>
                             <div style="font-size: 15px; font-weight: 850; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 2px;">Strategic Points</div>
                          </div>
                          <div style="margin-top: 24px; height: 8px; background: rgba(255,255,255,0.03); border-radius: 4px; overflow: hidden; width: 100%; border: 1px solid rgba(255,255,255,0.05);">
                             <div style="height: 100%; width: 100%; background: linear-gradient(90deg, var(--accent) 0%, #FFD700 100%); border-radius: 4px; box-shadow: 0 0 20px var(--accent);"></div>
                          </div>
                       </div>

                       <div style="padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
                          <div>
                             <div style="font-size: 22px; font-weight: 950; color: #34C759;">${M.purchased}</div>
                             <div style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 6px;">Closed</div>
                          </div>
                          <div>
                             <div style="font-size: 22px; font-weight: 950; color: #FFD700;">${M.hot}</div>
                             <div style="font-size: 10px; font-weight: 900; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1.5px; margin-top: 6px;">Hot</div>
                          </div>
                          <div>
                             <div style="font-size: 22px; font-weight: 950; color: #007AFF;">${M.followup}</div>
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
                             <div style="font-size: 56px; font-weight: 950; color: #000; letter-spacing: -3px; line-height: 0.8;">${Y}</div>
                             <div style="font-size: 20px; font-weight: 850; color: var(--text-muted); opacity: 0.5;">%</div>
                          </div>
                       </div>
                       <div style="margin-top: 24px;">
                          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                             <span style="font-size: 11px; font-weight: 900; color: var(--text-muted);">Conversion Velocity</span>
                             <span style="font-size: 11px; font-weight: 950; color: var(--accent);">${Y}%</span>
                          </div>
                          <div style="height: 8px; background: rgba(0,0,0,0.03); border-radius: 4px; overflow: hidden; border: 1px solid rgba(0,0,0,0.02);">
                             <div style="height: 100%; width: ${Y}%; background: var(--accent); border-radius: 4px; box-shadow: 0 0 15px rgba(82,18,22,0.3);"></div>
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
                             <div style="font-size: 56px; font-weight: 950; color: #000; letter-spacing: -3px; line-height: 0.8;">${dt}</div>
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
                          <div style="font-size: 64px; font-weight: 950; color: #000; letter-spacing: -4px; line-height: 0.8;">${q}</div>
                          <div style="font-size: 14px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Secured Today</div>
                       </div>
                       <div style="margin-top: 24px;">
                          <span style="font-size: 11px; font-weight: 950; color: #007AFF; background: rgba(0,122,255,0.1); padding: 8px 18px; border-radius: 12px; display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(0,122,255,0.1);">
                             <div style="width: 8px; height: 8px; background: #007AFF; border-radius: 50%; box-shadow: 0 0 10px #007AFF;"></div>
                             ${q>0?"GROWTH SPIKE":"STEADY STATE"}
                          </span>
                       </div>
                    </div>
                    <div style="padding-top: 32px; border-top: 1px solid rgba(0,0,0,0.05);">
                       <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                          <span style="font-size: 12px; font-weight: 900; color: var(--text-muted);">Network Saturation</span>
                          <span style="font-size: 12px; font-weight: 950; color: #000;">${this.fmt(X)} Active</span>
                       </div>
                       <div style="height: 10px; background: rgba(0,0,0,0.03); border-radius: 5px; overflow: hidden; border: 1px solid rgba(0,0,0,0.02);">
                          <div style="height: 100%; width: ${Math.min(X/Math.max(S.length,1)*100,100)}%; background: linear-gradient(90deg, #007AFF 0%, #AF52DE 100%); border-radius: 5px; box-shadow: 0 0 15px rgba(0,122,255,0.3);"></div>
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
                ${N.map((w,k)=>{const P=w.todayFull+w.todayShort,_=$>0?P/$*100:0,J=k===0?"linear-gradient(135deg,#FFD700,#FFA500)":k===1?"linear-gradient(135deg,#C0C0C0,#A0A0A0)":k===2?"linear-gradient(135deg,#CD7F32,#A0522D)":"#000",rt=k%2===0?"rgba(0,0,0,0.01)":"transparent";return`
                  <div style="display: grid; grid-template-columns: 100px 1.5fr 120px 120px 120px 120px 120px; gap: 0; padding: 28px 48px; border-bottom: 1px solid rgba(0,0,0,0.03); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); align-items: center; background: ${rt};" onmouseover="this.style.background='rgba(0,0,0,0.04)'; this.style.transform='translateX(8px)';" onmouseout="this.style.background='${rt}'; this.style.transform='translateX(0)';">
                    <div style="display: flex; align-items: center;">
                       <span style="font-size: 20px; font-weight: 950; color: ${k<3?"var(--accent)":"#000"}; opacity: ${k<3?1:.2}; letter-spacing: -1.5px;">#${String(k+1).padStart(2,"0")}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 24px;">
                       <div style="width: 56px; height: 56px; border-radius: 20px; background: ${J}; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 950; color: ${k<3?"#fff":"rgba(255,255,255,0.4)"}; border: 2px solid #fff; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">${(w.name||"U")[0].toUpperCase()}</div>
                       <div style="flex: 1;">
                          <div style="font-size: 18px; font-weight: 950; color: #000; letter-spacing: -0.8px;">${w.name.split("@")[0]}</div>
                          <div style="margin-top: 10px; height: 5px; background: rgba(0,0,0,0.04); border-radius: 3px; overflow: hidden; width: 100%; max-width: 200px;">
                             <div style="height: 100%; width: ${_}%; background: ${k===0?"var(--accent)":"#000"}; border-radius: 3px;"></div>
                          </div>
                       </div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 4px;">
                       <div style="font-size: 24px; font-weight: 950; color: #000; letter-spacing: -2px;">${P}</div>
                       ${w.todayShort>0?`<div style="font-size: 9px; font-weight: 900; color: #AF52DE; text-transform: uppercase; letter-spacing: 1px; background: rgba(175,82,222,0.1); padding: 2px 6px; border-radius: 4px;">+${w.todayShort} FAST</div>`:""}
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 950; color: #000; opacity: 0.3;">${this.fmt(w.total)}</div>
                    <div style="display: flex; align-items: center; justify-content: center;">
                       <div style="min-width: 48px; height: 40px; border-radius: 14px; background: rgba(255,59,48,0.06); color: #FF3B30; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 950; border: 1px solid rgba(255,59,48,0.1);">${w.hot}</div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center;">
                       <div style="min-width: 48px; height: 40px; border-radius: 14px; background: rgba(52,199,89,0.06); color: #34C759; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 950; border: 1px solid rgba(52,199,89,0.1);">${w.purchased}</div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center;">
                       <div style="min-width: 48px; height: 40px; border-radius: 14px; background: rgba(0,122,255,0.06); color: #007AFF; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 950; border: 1px solid rgba(0,122,255,0.1);">${w.followup}</div>
                    </div>
                  </div>
                  `}).join("")}
                </div>
              </div>
            </div>
          `}else C&&(C.style.display="none");const E=document.getElementById("dash-main-hub");E&&(E.style.display="grid",E.style.gridTemplateColumns="1.2fr 1fr",E.style.gap="32px",E.style.alignItems="start");const A=document.getElementById("kpi-conv");A&&(A.textContent=Math.round(this.leads.filter(m=>m.status==="Purchased").length/(this.leads.length||1)*100)+"%");try{const{data:m}=await b.from("app_config").select("payload").eq("id","announcement").single(),S=document.getElementById("dash-announcement-text");m&&S&&(S.textContent=m.payload.text)}catch{console.warn("Briefing sync deferred")}const z=this.goldRates["24K (999)"]||0;z>0&&(this.goldRates.Coin=Math.round(z*1.03*1.03));const R=["22K","24K (999)","Coin","18K","Old Gold"],F=["Silver Coin","Silver Payal","Silver Baby Kada","Silver Ferva","Silver Utensils/Pooja"],O=this.activePricingTab==="gold"?R:F,H=document.getElementById("dash-trajectory-container");H&&(H.innerHTML=`
            <div class="glass-card elevated" style="padding: 28px; min-height: 280px; display: flex; flex-direction: column; gap: 24px; border-radius:32px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <div style="font-size: 11px; font-weight: 850; letter-spacing: 1.5px; color: var(--accent); text-transform: uppercase;">Smart Calculator & Pricing</div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  ${this.user.role==="Admin"||this.user.role==="Supervisor"?'<button onclick="app.editGoldRates()" style="background: rgba(0,122,255,0.08); color:#007AFF; border:none; padding:6px 10px; border-radius:8px; font-size:9px; font-weight:900; cursor:pointer; margin-right:8px;">EDIT RATES</button>':""}
                  <button onclick="app.setPricingTab('gold')" style="background: ${this.activePricingTab==="gold"?"var(--accent)":"rgba(0,0,0,0.04)"}; color: ${this.activePricingTab==="gold"?"#fff":"var(--text-muted)"}; border:none; padding:6px 14px; border-radius:10px; font-size:10px; font-weight:900; cursor:pointer; transition:all 0.3s;">GOLD</button>
                  <button onclick="app.setPricingTab('silver')" style="background: ${this.activePricingTab==="silver"?"var(--accent)":"rgba(0,0,0,0.04)"}; color: ${this.activePricingTab==="silver"?"#fff":"var(--text-muted)"}; border:none; padding:6px 14px; border-radius:10px; font-size:10px; font-weight:900; cursor:pointer; transition:all 0.3s;">SILVER</button>
                </div>
              </div>

              <!-- DETERMINISTIC PRICING TIERS -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
                ${O.map((m,S)=>{const N=this.goldRates[m]||0;if(N===void 0&&m!=="Silver")return"";const $=this.calcState.purity===m,M=(m.charCodeAt(0)+m.length)%2===0;return`
                      <div class="kpi-card" style="padding: 22px; border-radius: 24px; background: ${$?"rgba(0,0,0,0.03)":"rgba(255,255,255,0.7)"}; border: 2px solid ${$?"var(--accent)":"rgba(0,0,0,0.03)"}; cursor:pointer; position:relative; overflow:hidden; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: ${$?"0 12px 30px rgba(0,0,0,0.08)":"0 4px 12px rgba(0,0,0,0.02)"};" onclick="app.setCalcPurity('${m}')">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
                          <div style="font-size: 11px; font-weight: 950; color: ${$?"var(--accent)":"rgba(0,0,0,0.4)"}; text-transform: uppercase; letter-spacing: 1px;">${m}</div>
                          <div style="font-size: 9px; color: ${M?"var(--success)":"#FF3B30"}; font-weight: 950; display:flex; align-items:center; gap:2px; background: ${M?"rgba(52,199,89,0.1)":"rgba(255,59,48,0.1)"}; padding: 2px 8px; border-radius: 99px;">
                            ${M?"▲":"▼"} 0.${m.length%9}%
                          </div>
                        </div>
                        <div style="font-size: 24px; font-weight: 900; color: var(--text-primary); letter-spacing: -1.5px;">
                          ${N>0?`₹${this.fmt(N)}`:"₹0"}
                        </div>
                        <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); opacity: 0.5; margin-top: 4px; text-transform: uppercase;">Real-time Index</div>
                        ${$?'<div style="position:absolute; top:8px; right:8px; width:6px; height:6px; background:var(--accent); border-radius:50%; box-shadow: 0 0 10px var(--accent);"></div>':""}
                      </div>
                    `}).join("")}
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
                    <input type="number" id="calc-weight" class="input" style="height: 48px; width: 100%; font-size: 24px; font-weight: 900; background: transparent; border: none; padding: 0; color: var(--text-primary); letter-spacing: -1px;" placeholder="0.00" value="${this.calcState.weight||""}" oninput="app.updateCalc()">
                    <div style="font-size: 10px; font-weight: 850; color: var(--text-muted); margin-top: 4px; opacity: 0.6;">Unit: Grams (g)</div>
                  </div>

                  <!-- INPUT AXIS: PURITY -->
                  <div style="background: #fff; padding: 20px; border-radius: 22px; border: 1.5px solid rgba(0,0,0,0.04); box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                      <div style="font-size: 9px; font-weight: 950; color: var(--accent); letter-spacing: 1px; text-transform: uppercase;">Purity Selector</div>
                      <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="opacity: 0.3;"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <select id="calc-purity" class="input" style="height: 48px; width: 100%; font-size: 16px; font-weight: 900; background: transparent; border: none; padding: 0; color: var(--text-primary); cursor: pointer;" onchange="app.updateCalc()">
                      ${R.concat(F).map(m=>`<option value="${m}" ${this.calcState.purity===m?"selected":""}>${m}</option>`).join("")}
                    </select>
                    <div style="font-size: 10px; font-weight: 850; color: var(--text-muted); margin-top: 4px; opacity: 0.6;">Active Protocol: ${this.calcState.purity}</div>
                  </div>

                </div>

                <!-- TACTICAL OVERRIDES -->
                <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px;">
                  <div style="flex: 1; min-width: 180px; background: rgba(255,255,255,0.5); padding: 12px 16px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(0,0,0,0.02);">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; width: 100%;">
                      <input type="checkbox" id="calc-gst" ${this.calcState.gst?"checked":""} onchange="app.updateCalc()" style="width: 18px; height: 18px; accent-color: var(--accent);">
                      <span style="font-size: 11px; font-weight: 850; color: var(--text-secondary);">TAX REGISTRY (3% GST)</span>
                    </label>
                  </div>
                  <div style="flex: 1; min-width: 180px; background: rgba(255,255,255,0.7); padding: 12px 16px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; border: 1.5px solid rgba(0,0,0,0.03); display: ${this.calcState.purity.startsWith("Silver")||this.calcState.purity==="Coin"?"none":"flex"};">
                    <span style="font-size: 9px; font-weight: 950; color: var(--text-muted);">MAKING (%):</span>
                    <input type="number" id="calc-making" value="${this.calcState.making||""}" class="input" style="width: 70px; background: #fff; border: 1px solid rgba(0,0,0,0.05); text-align: right; font-weight: 950; color: var(--accent); font-size: 14px; border-radius: 8px; padding: 4px 8px;" placeholder="0" oninput="app.updateCalc()">
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
      `,this.updateCalc(!0));const G=(m,S,N)=>{const $=document.getElementById(m);if(!$)return;const M=this.leads.filter(S).sort((L,j)=>j.timestamp-L.timestamp).slice(0,8);$.innerHTML=M.length?M.map(L=>{const j=(L.name||"?")[0].toUpperCase(),Y=new Date(L.timestamp).toDateString()===new Date().toDateString();return`
                    <div class="card elevated" onclick="app.viewLead('${L.id?String(L.id).trim():""}')" style="padding: 16px; border-radius: 24px; background: #fff; border: 1px solid rgba(0,0,0,0.035); position:relative; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); cursor:pointer; display: flex; flex-direction: column; gap: 12px;">
                      <div style="display:flex; align-items:center; gap:12px;">
                        <div style="width:40px; height:40px; min-width:40px; background:rgba(0,0,0,0.02); border-radius:14px; display:flex; align-items:center; justify-content:center; font-weight:950; font-size:16px; color:var(--accent);">${j}</div>
                        <div style="flex:1; min-width:0;">
                          <div style="font-weight:950; color:var(--text-primary); font-size:15px; letter-spacing:-0.4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${L.name}</div>
                          <div style="font-size:9px; color:var(--text-muted); font-weight:850; text-transform:uppercase; letter-spacing:0.5px; opacity:0.6; margin-top:1px;">${L.interest||"Consultation"}</div>
                        </div>
                        ${Y?'<div style="width:6px; height:6px; background:#FF3B30; border-radius:50%; box-shadow: 0 0 8px rgba(255,59,48,0.4);"></div>':""}
                      </div>
                      
                      <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(0,0,0,0.015); padding:10px 14px; border-radius:16px; border: 1px solid rgba(0,0,0,0.015);">
                        <div style="font-weight: 900; color: var(--text-primary); font-size: 13px; letter-spacing: 0.2px;">${L.phone||"---"}</div>
                        <div style="display: flex; gap: 6px;">
                          <div style="width: 28px; height: 28px; background: #fff; border: 1px solid rgba(0,0,0,0.02); border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
                            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                          </div>
                        </div>
                      </div>

                      <!-- TACTICAL DATA OVERLAY -->
                      <div style="display: flex; flex-direction: column; gap: 8px; padding-top: 4px;">
                        ${L.notes?`
                          <div style="background: rgba(0,0,0,0.02); padding: 8px 12px; border-radius: 12px; border-left: 3px solid var(--accent-light);">
                            <div style="font-size: 8px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Data Supplement</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 700; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${L.notes}</div>
                          </div>
                        `:""}
                        
                        ${this.getInitialNote(L)?`
                          <div style="background: rgba(0,0,0,0.02); padding: 8px 12px; border-radius: 12px; border-left: 3px solid var(--accent-soft);">
                            <div style="font-size: 8px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Enquiry Note</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 700; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${this.getInitialNote(L)}</div>
                          </div>
                        `:""}
                        
                        ${this.getLatestComment(L)?`
                          <div style="background: rgba(0,0,0,0.02); padding: 8px 12px; border-radius: 12px; border-left: 3px solid var(--success);">
                            <div style="font-size: 8px; font-weight: 950; color: var(--success); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Executive Comment</div>
                            <div style="font-size: 11px; color: var(--text-secondary); font-weight: 700; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${this.getLatestComment(L)}</div>
                          </div>
                        `:""}
                      </div>
                    </div>`}).join(""):`<div style="opacity:0.3; padding: 40px 20px; text-align:center; font-weight:900; font-size:11px; background:rgba(0,0,0,0.01); border-radius:24px; border:1px dashed rgba(0,0,0,0.08); color:var(--text-muted); text-transform:uppercase; letter-spacing:0.8px; line-height: 1.4;">${N}</div>`};G("col-queue",m=>{var S;return m.priority==="Hot"&&!((S=m.type)!=null&&S.includes("short"))&&(m.status==="New Inquiry"||m.status==="New")},"Queue clear. Objective achieved."),G("col-tasks",m=>{var S;return!((S=m.type)!=null&&S.includes("short"))&&(m.checklist&&m.checklist.length>0||m.status==="Follow-up")},"No pending missions."),G("col-secured",m=>{var S;return!((S=m.type)!=null&&S.includes("short"))&&m.status==="Purchased"},"Awaiting conversions.");const B=[...this.leads].sort((m,S)=>S.timestamp-m.timestamp).slice(0,30),it=document.getElementById("dash-apt-strip"),ot=document.getElementById("dash-apt-count");ot&&(ot.textContent=`${this.leads.length} SECURED`),it&&(it.innerHTML=B.length?B.map(m=>`
 <div class="apt-card" onclick="app.viewLead('${m.id}')" style="cursor: pointer;">
 <div style="font-weight:950; color:var(--text-primary); font-size: 18px; letter-spacing: -1px;">${m.name}</div>
 <div style="font-size:11px; color:var(--accent); margin: 6px 0; font-weight: 700; letter-spacing: 0.5px; text-transform:uppercase;">${m.interest}</div>
 <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
 <span class="badge badge-${m.priority?m.priority.toLowerCase():"warm"}" style="font-size:9px; padding:4px 10px; font-weight:900;">${m.priority||"Warm"}</span>
 <span style="font-size:10px; color:var(--text-muted); font-weight:850; opacity:0.6;">${new Date(m.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
 </div>
 </div>`).join(""):'<div style="opacity:0.4; color:var(--text-muted); font-size: 13px; padding: 32px; text-align:center; width:100%;">Vault stream empty.</div>'),this.renderTrajectoryChart()},showShowroomMatches(t){const e=new Date().setHours(0,0,0,0),i=n=>{const a=String(n||"").replace(/\D/g,"");return a.length>=10?a.slice(-10):null},r=n=>String(n||"").toLowerCase().replace(/[^a-z0-9]/g,"").trim(),o={};(this.qmsRegistry||[]).forEach(n=>{const a=i(n.phone||n.mobile||n.contact||n.p),l=r(n.name||n.customer_name||n.n),d=String(n.status||n.entry_type||n.sale_status||n.queue_status||"").toUpperCase(),u=d.includes("PURCHASED")||n.converted||d==="SUCCESS"||d==="SUCCESSFUL";a&&(o[a]=u),l&&(o[l]=u)});const s=this.leads.filter(n=>{let a=n.history;if(typeof a=="string")try{a=JSON.parse(a)}catch{a=[]}Array.isArray(a)||(a=[]);const l=i(n.phone),d=r(n.name),u=l&&o[l]!==void 0||d&&o[d]!==void 0,c=l&&o[l]===!0||d&&o[d]===!0,h=a.some(p=>{const x=JSON.stringify(p).toUpperCase();return(p&&p.time?p.time:0)>=e&&(x.includes("QMS-SUCCESS")||x.includes("PURCHASED"))}),f=a.some(p=>{const x=JSON.stringify(p).toUpperCase();return(p&&p.time?p.time:0)>=e&&(x.includes("QMS-RECOVERY")||x.includes("NOT PURCHASED"))});return t==="success"?c||h:t==="recovery"?u&&!c||f:!1});if(s.length===0)return this.toast("No matching dossiers found for this period.","info");s.length===1?this.viewLead(s[0].id):(this.leadsFilter=t==="success"?"showroom_success":"showroom_recovery",this.navigate("leads"),this.refreshLeads())},switchDashTab(t){this.activeDashTab=t,document.querySelectorAll(".tab-btn").forEach(e=>e.classList.remove("active")),document.getElementById("tab-"+t).classList.add("active"),this.renderDashboard()},renderActivity(){const t=document.getElementById("activity-container");if(!t||!this.user)return;const i=this.user.role===D.ADMIN||this.user.role===D.SUPERVISOR||this.user.role==="Admin"||this.user.role==="Supervisor"?this.leads:this.leads.filter(d=>d&&(d.owner===this.user.id||d.owner===this.user.email||d.assigned_to===this.user.id)),r=[...i].sort((d,u)=>u.timestamp-d.timestamp).slice(0,50),o=Date.now()-4*60*60*1e3,s=(i.filter(d=>d.timestamp>o).length/4).toFixed(1),a=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d,u)=>{const c=i.filter(h=>new Date(h.timestamp).getDay()===u).length;return{day:d,count:c}}),l=Math.max(...a.map(d=>d.count),1);t.innerHTML=`
 <div style="padding: 32px 24px;">
 <div style="margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end;">
 <div>
 <h1 style="font-size: 34px; font-weight: 700; letter-spacing: -1.8px; color: var(--text-primary); margin: 0; line-height: 1;">Operational Pulse</h1>
 <p style="color: var(--text-muted); font-weight: 850; font-size: 14px; letter-spacing: -0.2px; margin-top: 8px;">Real-time registry movement detected.</p>
 </div>
 <div style="text-align: right;">
 <div style="font-size: 24px; font-weight: 700; color: var(--accent); line-height: 1;">${s}</div>
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
 ${a.map((d,u)=>`
 <div style="flex: 1; display:flex; flex-direction:column; align-items:center; gap:10px;">
 <div style="width:100%; height:${Math.max(12,d.count/l*100)}%; background: ${new Date().getDay()===u?"var(--accent-gradient)":"rgba(0,0,0,0.04)"}; border-radius: 8px; transition: height 1s ease;">
 ${new Date().getDay()===u?'<div style="width:100%; height:4px; background:rgba(255,255,255,0.3); border-radius:4px 4px 0 0;"></div>':""}
 </div>
 <div style="font-size: 9px; font-weight: 850; color: ${new Date().getDay()===u?"var(--text-primary)":"var(--text-muted)"}; opacity: ${new Date().getDay()===u?1:.6};">${d.day}</div>
 </div>
 `).join("")}
 </div>
 </div>

 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
 <span class="label" style="margin: 0; font-size: 11px; letter-spacing: 1.5px;">SECURE TIMELINE</span>
 <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); opacity: 0.5;">${r.length} RECENT ACTIONS</span>
 </div>
 
 <div style="display: flex; flex-direction: column; gap: 12px;">
 ${r.length?r.slice(0,20).map(d=>{const u=(d.name||"U").charAt(0),c=this.getPriorityColor(d.priority);return`
 <div class="card elevated" onclick="app.viewLead('${d.id?String(d.id).trim():""}')" style="padding: 20px; border-radius: 24px; margin-bottom: 0; display: flex; align-items: center; gap: 16px; border: 1px solid rgba(0,0,0,0.02); background: #fff; transition: all 0.3s ease;">
 <div style="width: 44px; height: 44px; min-width: 44px; border-radius: 12px; background: ${c}10; color: ${c}; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; position: relative;">
 ${u}
 <div style="position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
 <div style="width: 8px; height: 8px; background: ${c}; border-radius: 50%;"></div>
 </div>
 </div>
 <div style="flex: 1;">
 <div style="display: flex; justify-content: space-between; align-items: start;">
 <div style="font-weight: 600; color: var(--text-primary); font-size: 15px; letter-spacing: -0.5px;">${d.name}</div>
 <div style="font-size: 9px; color: var(--text-muted); font-weight: 600; opacity: 0.6;">${new Date(d.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
 </div>
 <div style="font-size: 10px; font-weight: 850; color: var(--text-muted); margin-top: 4px; letter-spacing: 0.3px;">
 Captured via <span style="color: var(--accent); font-weight: 700;">${d.source||"Direct Channel"}</span> • ${d.interest}
 </div>
 </div>
 </div>
 `}).join(""):`
 <div style="text-align: center; padding: 100px 40px; border-radius: 40px; background: rgba(0,0,0,0.02); border: 2px dashed rgba(0,0,0,0.03);">
 <div class="scanning-orb" style="width: 64px; height: 64px; background: var(--luxe-gold-gradient); border-radius: 50%; margin: 0 auto 32px; animation: pulse 2s infinite;"></div>
 <div style="font-weight: 700; font-size: 20px; color: var(--text-primary); letter-spacing: -0.5px; margin-bottom: 8px;">Scanning Registry Archive</div>
 <div style="font-size: 13px; color: var(--text-muted); font-weight: 750;">No matches found for your search criteria.</div>
 </div>
 `}
 </div>
 </div>
 `},generateID(){const t=new Date().getFullYear(),e=Math.floor(1e5+Math.random()*9e5);return`LF-${t}-${e}`},calculateScore(t){const{weight:e,source:i,queryType:r,checklist:o}=t;let s="Cold";i==="Executive Referral"||i==="Corporate Inquiry"?s="Hot":(i==="Social Media (Instagram)"||i==="Direct WA Channel")&&(s="Warm");const n=o?o.join(" ").toLowerCase():"",a=parseFloat(e)||0;return n.includes("booking")||n.includes("purchased")||n.includes("order")||a>50||r==="Product Information & Pricing"?s="Hot":(n.includes("visit")||n.includes("pdf")||s==="Cold"&&i==="Showroom Walk-in")&&(s="Warm"),s},getPriorityColor(t){return{Hot:"#FF3B30",Warm:"#FF9500",Cold:"#007AFF"}[t]||"#8E8E93"},handleSourceChange(){},handleQueryChange(){const t=document.getElementById("f-query-type").value,e=document.getElementById("sec-note"),i=document.getElementById("sec-product"),r=document.getElementById("sec-coin");e&&e.classList.remove("active"),i&&i.classList.remove("active"),r&&r.classList.remove("active"),t==="Information Call"||t==="Offers & Plans"?e&&e.classList.add("active"):t==="Product Information & Pricing"&&(i&&i.classList.add("active"),this.handleProductTypeChange())},handleProductTypeChange(){const t=document.querySelectorAll('input[name="f-product-code"]:checked'),e=Array.from(t).map(r=>r.value),i=document.getElementById("sec-coin");i&&(e.includes("GBR")||e.includes("GKD"),e.includes("Coin")||e.some(r=>r.toLowerCase().includes("coin"))?i.classList.add("active"):i.classList.remove("active"))},initProductMatrix(){const t={"grid-mens":["GBR","GKD","GCH","GAG","GLT","BALI"],"grid-womens":["GBR","GBD","GCH","GHR","GKD","GNT","GLT","GEG","GKC","GAG","GMS","Nath","Maangtika","GVT","GPD"],"grid-couple":["COUPLE BANDS"],"grid-kids":["BABY RINGS","BABY KADA","BABY CHAIN","BABY BRACELET","BABY BALI (EARRINGS)"],"grid-bullion":["GCO","SCO"]};Object.keys(t).forEach(e=>{const i=document.getElementById(e);if(!i)return;const r=e.split("-")[1].charAt(0).toUpperCase();i.innerHTML=t[e].map(o=>`
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 10px; background: #fff; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.2s ease;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='rgba(0,0,0,0.05)'">
                <input type="checkbox" name="f-product-code" data-hub="${r}" value="${o}" style="accent-color: var(--accent); width: 16px; height: 16px;" onchange="app.handleProductTypeChange()">
                <span style="font-size: 10px; font-weight: 850; color: var(--text-primary); text-transform: uppercase;">${o}</span>
              </label>
            `).join("")})},handleSegmentChange(){},async syncToSheets(t){try{const e={id:t.id,name:t.name,phone:t.phone,location:t.location,source:t.source,interest:t.interest,weight:t.weight,priority:t.priority,status:t.status,timestamp:t.timestamp,notes:t.notes||"",enquiry_note:t.enquiry_note||"",executive_comment:t.executive_comment||"",followup_date:t.followup_date||t.followupDate||"",checklist:Array.isArray(t.checklist)?t.checklist.join(", "):t.checklist||"",owner_name:t.owner_name||t.ownerName,added_by:t.added_by||t.addedBy},i="https://script.google.com/macros/s/AKfycbwLVk4tr7pt8hoDm4g6rnDI1niCbVOp-TEXQYghdkma-K6pOyhMVhb7rZ2euf9Q0n3LDg/exec",r=new URLSearchParams(e);return fetch(`${i}?${r.toString()}`,{method:"GET",mode:"no-cors"}),!0}catch(e){return console.error("Sync Logic Fault:",e),!1}},saveToSyncQueue(t){const e=JSON.parse(localStorage.getItem("lf_sync_queue_v1")||"[]");e.some(i=>i.phone===t.phone)||(e.push(t),localStorage.setItem("lf_sync_queue_v1",JSON.stringify(e)))},async autoSync(){const t=JSON.parse(localStorage.getItem("lf_sync_queue_v1")||"[]");if(!t.length)return;let e=[];for(const i of t)await this.syncToSheets(i)||e.push(i);localStorage.setItem("lf_sync_queue_v1",JSON.stringify(e)),e.length<t.length&&this.toast(`Synced ${t.length-e.length} pending leads ✅`)},updatePhoneValidation(t,e){const i=document.getElementById(t);document.getElementById(e).checked?i.placeholder="Full intl format (e.g. +971...)":(i.placeholder="e.g. 9876543210",i.value=i.value.replace(/[^0-9]/g,"").slice(0,10))},restrictPhone(t,e){document.getElementById(e).checked?t.value=t.value.replace(/[^0-9+\- ]/g,""):t.value=t.value.replace(/[^0-9]/g,"").slice(0,10)},checkTacticalAlerts(){var a;const t=document.getElementById("tactical-missions-hub");if(!t||!this.user)return;if(!this.leads){t.innerHTML=`
                <div style="background: rgba(0,0,0,0.01); border: 1.5px dashed rgba(82,18,22,0.1); border-radius: 40px; padding: 120px 40px; text-align: center;">
                  <div class="scanning-orb" style="width: 80px; height: 80px; background: var(--accent-soft); border-radius: 50%; margin: 0 auto 32px; animation: pulse 2s infinite; opacity: 0.3;"></div>
                  <div style="font-size: 14px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 3px; opacity: 0.6;">Scanning Tactical Horizon...</div>
                  <p style="font-size: 13px; color: var(--text-muted); margin-top: 14px; font-weight: 700;">Initiating satellite uplink. Please wait for lead data.</p>
                </div>
             `;return}const e=document.getElementById("radar-date-filter"),i=e?e.value:"",r=new Date,o=new Date(r);o.setDate(r.getDate()-1),o.setHours(0,0,0,0);const s=new Date(r);s.setDate(r.getDate()+1),s.setHours(23,59,59,999);const n=this.leads.filter(l=>{const d=l.followup_date||l.followupDate;if(!d)return!1;const u=document.getElementById("radar-member-filter"),c=u?u.value:"",h=["Admin","Supervisor"].includes(this.user.role);if(!(h||l.assigned_to===this.user.id||l.owner===this.user.id||l.added_by===this.user.email||l.owner_email===this.user.email)||h&&c&&c!=="all"&&l.assigned_to!==c&&l.owner!==c)return!1;let p=null;try{const g=new Date(d);isNaN(g.getTime())||(p=g.toISOString().split("T")[0])}catch{return!1}if(!p)return!1;const x=i?new Date(i).toISOString().split("T")[0]:null;if(x)return p===x;{const g=new Date(d);return g.setHours(0,0,0,0),g>=o&&g<=s}}).sort((l,d)=>new Date(l.followup_date||l.followupDate)-new Date(d.followup_date||d.followupDate));this.leads||i?t.innerHTML=`
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
                        <span style="font-size: 24px; font-weight: 850; color: var(--accent); opacity: 0.3; padding: 6px 16px; background: rgba(82,18,22,0.06); border-radius: 14px; letter-spacing: -1px;">/ ${n.length} TARGETS</span>
                      </h1>
                    </div>
                    
                    <!-- PANORAMIC DIVIDER -->
                    <div style="width: 1px; height: 60px; background: rgba(82,18,22,0.1);"></div>
                    
                    <div style="display: flex; align-items: center; gap: 24px;">
                      <div style="display: flex; flex-direction: column; gap: 6px;">
                         <span style="font-size: 10px; font-weight: 950; color: var(--accent); text-transform: uppercase; opacity: 0.5;">Targeting Horizon</span>
                         <input type="date" id="radar-date-filter" value="${i}" onchange="app.checkTacticalAlerts()" style="border: none; outline: none; font-size: 18px; font-weight: 900; color: var(--text-primary); cursor: pointer; background: transparent; font-family: inherit; letter-spacing: -0.5px;">
                      </div>
                      
                      ${this.user.role==="Admin"||this.user.role==="Supervisor"?`
                        <div style="width: 1px; height: 32px; background: rgba(82,18,22,0.1);"></div>
                        <div style="display: flex; flex-direction: column; gap: 6px;">
                           <span style="font-size: 10px; font-weight: 950; color: var(--accent); text-transform: uppercase; opacity: 0.5;">Tactical Unit</span>
                           <select id="radar-member-filter" onchange="app.checkTacticalAlerts()" style="border: none; outline: none; font-size: 14px; font-weight: 900; color: var(--text-primary); cursor: pointer; background: transparent; font-family: inherit; width: 160px; text-overflow: ellipsis;">
                             <option value="all">ALL PERSONNEL</option>
                             ${Object.values(this.staffRegistry||{}).map(l=>{var h;if(!l)return"";const d=(l.name||l.id||"Unknown").toUpperCase(),u=l.id||"",c=((h=document.getElementById("radar-member-filter"))==null?void 0:h.value)===u;return`<option value="${u}" ${c?"selected":""}>${d}</option>`}).join("")}
                           </select>
                        </div>
                      `:""}

                      ${i||(a=document.getElementById("radar-member-filter"))!=null&&a.value&&document.getElementById("radar-member-filter").value!=="all"?`
                         <button onclick="if(document.getElementById('radar-date-filter')) document.getElementById('radar-date-filter').value=''; if(document.getElementById('radar-member-filter')) document.getElementById('radar-member-filter').value='all'; app.checkTacticalAlerts();" style="border: none; background: var(--accent); color: white; padding: 10px 18px; border-radius: 12px; font-size: 9px; font-weight: 950; cursor: pointer; text-transform: uppercase; box-shadow: 0 10px 25px var(--accent-soft);">RESET</button>
                      `:""}
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
                    ${this.user.role==="Admin"||this.user.role==="Supervisor"?`
                      <button onclick="app.executeStrategicMigration()" style="background: var(--accent); color: #fff; border: 2px solid rgba(255,255,255,0.2); padding: 12px 24px; border-radius: 20px; font-size: 10px; font-weight: 950; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 15px 35px rgba(82,18,22,0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'; this.style.background='#000';" onmouseout="this.style.transform='scale(1)'; this.style.background='var(--accent)';" >
                        MIGRATE LEGACY DATA
                      </button>
                    `:""}
                  </div>
                </div>
                
                ${n.length>0?`
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px; width: 100%; box-sizing: border-box;">
                    ${n.map(l=>{const d=l.followup_date||l.followupDate,u=new Date(d)<new Date(r.setHours(0,0,0,0)),c=d===new Date().toISOString().split("T")[0];let h="rgba(0,0,0,0.04)",f="TARGET MISSION",p="var(--text-muted)",x="";return u?(h="#FF3B3033",f="MISSION OVERDUE",p="#FF3B30",x="pulse-hot"):c&&(h="var(--accent-soft)",f="CRITICAL: DUE TODAY",p="var(--accent)",x="pulse-gold"),`
                      <div class="card elevated" onclick="app.viewLead('${l.id?String(l.id).trim():""}')" style="background: #fff; border-radius: 32px; padding: 28px; border: 1.5px solid ${h}; position: relative; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; gap: 20px;" onmouseover="this.style.transform='translateY(-8px) scale(1.02)'; this.style.boxShadow='0 30px 60px rgba(0,0,0,0.08)'; this.style.borderColor='var(--accent)';" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='var(--shadow)'; this.style.borderColor='${h}';">
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <div style="font-size: 9px; font-weight: 950; color: ${p}; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; gap: 8px; background: ${p}08; padding: 7px 14px; border-radius: 12px;">
                            <span class="${x}" style="width: 6px; height: 6px; background: ${p}; border-radius: 50%;"></span>
                            ${f}
                          </div>
                          <div style="font-size: 10px; font-weight: 850; color: var(--text-muted); opacity: 0.5;">ID: ${l.id.slice(0,8)}</div>
                        </div>

                        <div style="display: flex; align-items: center; gap: 18px;">
                          <div style="width: 56px; height: 56px; background: var(--accent-gradient); color: #fff; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-weight: 950; font-size: 22px; box-shadow: 0 10px 25px rgba(82,18,22,0.2);">${(l.name||"U")[0]}</div>
                          <div style="flex: 1">
                            <div style="font-weight: 950; color: var(--text-primary); font-size: 20px; letter-spacing: -0.8px; line-height: 1.1;">${l.name}</div>
                            <div style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-top: 5px; opacity: 0.7;">${l.location||"GLOBAL REACH"}</div>
                          </div>
                        </div>

                        <div style="background: rgba(0,0,0,0.02); border-radius: 20px; padding: 16px 20px;">
                           <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Tactical Objective</div>
                           <div style="font-size: 13px; font-weight: 850; color: var(--text-primary);">${l.interest||"Consultation Briefing"}</div>
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                           <div style="display: flex; flex-direction: column;">
                              <div style="font-size: 16px; font-weight: 950; color: var(--text-primary); letter-spacing: -0.3px;">${l.phone}</div>
                              <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); margin-top: 3px;">STRATEGIC UPLINK: ${d.split("-").reverse().join("/")}</div>
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
                    `}).join("")}
                  </div>
                `:`
                  <div style="background: rgba(0,0,0,0.01); border: 1.5px dashed rgba(82,18,22,0.1); border-radius: 40px; padding: 120px 40px; text-align: center; animation: fadeIn 0.8s ease;">
                    <div class="scanning-orb" style="width: 64px; height: 64px; background: var(--accent-soft); border-radius: 50%; margin: 0 auto 32px; opacity: 0.3;"></div>
                    <div style="font-size: 14px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 3px; opacity: 0.6;">Radar Clean</div>
                    <p style="font-size: 13px; color: var(--text-muted); margin-top: 14px; font-weight: 700; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 1.5;">The defined strategic mission window is currently clear of pending activity.</p>
                  </div>
                `}
              </div>
            `:t.innerHTML=`
              <div style="background: rgba(0,0,0,0.02); border: 1.5px dashed rgba(82,18,22,0.1); border-radius: 40px; padding: 120px 40px; text-align: center; cursor: pointer; animation: fadeIn 1s ease;" onclick="app.checkTacticalAlerts()">
                <div class="scanning-orb" style="width: 80px; height: 80px; background: var(--accent-gradient); border-radius: 50%; margin: 0 auto 32px; animation: pulse 2.5s infinite; opacity: 0.4; box-shadow: 0 0 40px var(--accent-soft);"></div>
                <div style="font-size: 14px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 3px; opacity: 0.7;">Radar Initializing</div>
                <p style="font-size: 13px; color: var(--text-muted); margin-top: 14px; font-weight: 700; max-width: 450px; margin-left: auto; margin-right: auto; line-height: 1.6;">Scanning strategic horizon for impending follow-ups and intelligence updates. Stand by...</p>
              </div>
            `},async saveLead(){var t;try{if(!this.user)return this.toast("Authentication Shield Triggered: Access Denied","error");const e=R=>{const F=document.getElementById(R);return F?F.value.trim():""},i=e("f-name"),r=e("f-phone"),o=e("f-location"),s=e("f-query-type");if(!s)return this.toast("Please select a Query Type","error");const n=e("f-weight")||"0",a=e("f-source")||"Direct Channel",l=e("f-follow-date"),d=document.getElementById("f-interest"),u=d?d.value:"Omni-Product Hub",c=document.querySelectorAll('input[name="f-product-code"]:checked'),h=Array.from(c).map(R=>`[${R.dataset.hub}] ${R.value}`).join(", "),f=e("f-coin-material"),p=e("f-coin-weight");let x=s==="Product Information & Pricing"?h||"General Inquiry":u;h.includes("Coin")&&s==="Product Information & Pricing"&&f&&(x=`${f} Coin`);const g=document.querySelectorAll('input[name="f-check"]:checked'),v=Array.from(g).map(R=>R.value),y=e("f-custom-task");y&&v.push(y);const I=this.calculateScore({weight:n,source:a,queryType:s,checklist:v}),T=this.generateID(),C=e("f-note"),E=C?`Lead Captured (Priority: ${I}) | Initial Note: ${C}`:`Lead Captured (Priority: ${I})`,A=Date.now(),z={id:T,name:i||"Walking Customer",phone:r||"NA",location:o||"Not Specified",interest:x,source:a,weight:p||n,followup_date:l,checklist:v,priority:I,status:e("f-is-followup")==="yes"?"Follow-up":"New Inquiry",timestamp:A,enquiry_note:C,owner:this.user.id,owner_name:this.user.name||"System Executive",added_by:this.user.email||"terminal@vera.gold",history:[{time:A,action:E}]};this.toast("Synchronizing with Vault...","info"),await V.saveLead(z),this.fetchAndRenderLeads&&this.fetchAndRenderLeads(),this.toast(`Vera AI: Categorized as ${I} Lead`,"success"),(t=document.getElementById("enroll-form"))==null||t.reset(),this.navigate("dashboard"),this.syncToSheets(z).catch(R=>console.error("Sheets Async Fault:",R))}catch(e){console.error("Critical Enrollment Fault:",e),this.toast(`Enrollment Fault: ${e.message}`,"error")}},viewFilteredRegistry(t){if(this.currentFilter=t,this.leadsPage=1,t===null||t==="long"||t==="short"){this.selectedDate=null;const e=document.getElementById("vault-date-select");if(e&&(e.value=""),t===null){this.selectedMemberId="all";const i=document.getElementById("vault-member-select");i&&(i.value="all")}}this.navigate("leads"),this.refreshLeads()},refreshLeads(t=!1){var u,c,h,f,p,x;const e=document.getElementById("lead-search"),i=e?e.value.toLowerCase():"",r=document.getElementById("leads-container"),o=document.getElementById("leads-filter-banner"),s=document.getElementById("leads-filter-tag");if(!r)return;t||(this.leadsPage=1,r.scrollTop=0),document.querySelectorAll(".segmented-option").forEach(g=>g.classList.remove("active")),this.currentFilter==="today"?(u=document.getElementById("chip-today"))==null||u.classList.add("active"):this.currentFilter==="followup"?(c=document.getElementById("chip-followup"))==null||c.classList.add("active"):this.currentFilter==="assigned"?(h=document.getElementById("chip-assigned"))==null||h.classList.add("active"):this.currentFilter==="short"?(f=document.getElementById("chip-short"))==null||f.classList.add("active"):this.currentFilter==="long"?(p=document.getElementById("chip-long"))==null||p.classList.add("active"):(x=document.getElementById("chip-vault"))==null||x.classList.add("active");let n=this.leads&&this.leads.length>0?this.leads:U.get("leads")||[];const a=new Date().toISOString().split("T")[0],l=["Admin","Supervisor"].includes(this.user.role);this.selectedDate&&(n=n.filter(g=>{const v=typeof g.timestamp=="number"?g.timestamp:new Date(g.timestamp).getTime();return new Date(v).toISOString().split("T")[0]===this.selectedDate}));const d=document.getElementById("vault-member-filter-container");if(d&&(d.style.display=l?"block":"none",l&&!d.dataset.init&&b.from("staff").select("id, name").then(({data:g})=>{const v=document.getElementById("vault-member-select");v&&g&&(g.forEach(y=>{const I=document.createElement("option");I.value=y.id,I.textContent=(y.name||y.id).toUpperCase(),v.appendChild(I)}),d.dataset.init="true")})),this.selectedMemberId&&this.selectedMemberId!=="all"&&(n=n.filter(g=>g.owner===this.selectedMemberId||g.assigned_to===this.selectedMemberId||g.added_by===this.selectedMemberId)),this.currentFilter!=="all_archives"&&this.currentFilter!=="hot"&&this.currentFilter!=="arrived"&&!i&&(n=n.filter(g=>g.status!=="Closed"&&g.status!=="Purchased")),this.currentFilter==="short"?n=n.filter(g=>g.type==="short"||g.type==="Short"||g.type==="short-reg"):this.currentFilter==="long"&&(n=n.filter(g=>!g.type||g.type!=="short"&&g.type!=="Short"&&g.type!=="short-reg")),this.currentFilter==="today"){const g=new Date,v=new Date(g.getFullYear(),g.getMonth(),g.getDate()).getTime();n=n.filter(y=>{const I=typeof y.timestamp=="number"?y.timestamp:new Date(y.timestamp).getTime(),T=y.history||[];return(T.length>0&&T[0].time?T[0].time:I)>=v}),o&&s&&(o.style.display="flex",s.innerHTML='Active Filter: <span style="font-weight: 900;">DAILY CAPTURES</span>')}else if(this.currentFilter==="today_followup")n=n.filter(g=>g.followup_date===a||g.followup_date&&g.followup_date.includes(a)),o&&s&&(o.style.display="flex",s.innerHTML=`Active Filter: <span style="font-weight: 900;">TODAY'S FOLLOW-UPS</span>`);else if(this.currentFilter==="hot")n=n.filter(g=>g.priority==="Hot"&&g.status!=="Purchased"),o&&s&&(o.style.display="flex",s.innerHTML='Active Filter: <span style="font-weight: 900;">HIGH-INTENT VAULT</span>');else if(this.currentFilter==="short")o&&s&&(o.style.display="flex",s.innerHTML='Active Filter: <span style="font-weight: 900;">SHORT REGISTRY</span>');else if(this.currentFilter==="long")o&&s&&(o.style.display="flex",s.innerHTML='Active Filter: <span style="font-weight: 900;">LONG REGISTRY</span>');else if(this.currentFilter==="followup")n=n.filter(g=>g.status==="Follow-up"),o&&s&&(o.style.display="flex",s.innerHTML='Active Filter: <span style="font-weight: 900;">FOLLOW-UP PROTOCOL</span>');else if(this.currentFilter==="assigned")n=n.filter(g=>g.assigned_to===this.user.id),o&&s&&(o.style.display="flex",s.innerHTML='Active Filter: <span style="font-weight: 900;">ASSIGNED TO ME</span>');else if(o&&!this.selectedDate&&(!this.selectedMemberId||this.selectedMemberId==="all"))o.style.display="none";else if(o){o.style.display="flex";let g="REGISTRY";this.selectedDate&&(g+=` • ${this.selectedDate}`),s.innerHTML=`Active Filter: <span style="font-weight: 900;">${g}</span>`}i&&(n=n.filter(g=>{const v=(g.name||"").toLowerCase(),y=g.phone||"",I=(g.interest||"").toLowerCase();return v.includes(i)||y.includes(i)||I.includes(i)})),this.renderLeads(n,t)},renderLeads(t,e=!1){const i=document.getElementById("leads-container");if(!i)return;const r=this.user.role==="Admin"||this.user.role==="Supervisor",o=t.filter(d=>this.currentFilter==="showroom_success"||this.currentFilter==="showroom_recovery"||r?!0:d.owner===this.user.id||d.assigned_to===this.user.id||d.added_by===this.user.email),s=40,n=(this.leadsPage-1)*s,a=o.slice(n,n+s);if(a.length===0&&!e){i.innerHTML='<div style="padding: 100px 40px; text-align: center; font-weight: 950; opacity: 0.5;">NO MATCHING ENTRIES</div>';return}const l=a.map(d=>this.getLeadNodeHTML(d)).join("");if(e?i.insertAdjacentHTML("beforeend",l):i.innerHTML=l,n+s<o.length){const d=document.createElement("div");d.style.height="20px",d.id="leads-scroll-trigger",i.appendChild(d);const u=new IntersectionObserver(c=>{c[0].isIntersecting&&(u.disconnect(),d.remove(),this.leadsPage++,this.renderLeads(t,!0))},{rootMargin:"400px"});u.observe(d)}},getLeadNodeHTML(t){var s;const e=["Admin","Supervisor"].includes(this.user.role),i=(t.owner_name||t.added_by||"U")[0].toUpperCase(),r=t.priority==="Hot"&&t.status!=="Purchased",o=this.getRelativeTime(t.timestamp);return`
             <div class="executive-lead-node" onclick="app.viewLead('${String(t.id).trim()}')" style="background:#fff; border:1.5px solid ${r?"rgba(255,59,48,0.2)":"rgba(0,0,0,0.06)"}; border-radius:32px; padding:28px; transition:all 0.4s cubic-bezier(0.16,1,0.3,1); cursor:pointer; position:relative; display:flex; flex-direction:column; gap:20px; box-shadow: ${r?"0 15px 35px rgba(255,59,48,0.08)":"0 10px 30px rgba(0,0,0,0.02)"};">
               
               <!-- Top Context Bar -->
               <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div style="display:flex; align-items:center; gap:8px;">
                     <div style="width:24px; height:24px; background:${r?"rgba(255,59,48,0.1)":"rgba(0,0,0,0.05)"}; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:950; color:${r?"#FF3B30":"var(--text-muted)"};">
                        ${i}
                     </div>
                     <span style="font-size:9px; font-weight:950; color:var(--text-muted); opacity:0.6; text-transform:uppercase; letter-spacing:0.5px;">${t.owner_name||((s=t.added_by)==null?void 0:s.split("@")[0])||"VAULT"}</span>
                  </div>
                  <div style="font-size:9px; font-weight:900; color:var(--text-muted); opacity:0.5;">${o}</div>
               </div>

               <!-- Lead Main Body -->
               <div style="flex:1;">
                  <div style="display:flex; align-items:center; gap:10px; margin-bottom:14px;">
                     <span class="status-pulse ${t.priority==="Hot"?"pulse-hot":"pulse-cold"}" style="width:8px; height:8px;"></span>
                     <span style="font-size:10px; font-weight:950; color:${this.getPriorityColor(t.priority)}; text-transform:uppercase; letter-spacing:1px;">${t.priority} PRIORITY</span>
                  </div>
                  <div style="font-weight:950; font-size:22px; color:var(--text-primary); letter-spacing:-1px; line-height:1.1; margin-bottom:6px;">${t.name}</div>
                  <div style="color:var(--text-muted); font-weight:750; font-size:14px; letter-spacing:-0.2px; opacity:0.7;">${t.phone==="SHORT-REG"?"Internal Entry":t.phone}</div>
               </div>

                <!-- Requirement Snippet (Sanitized) -->
                ${t.enquiry_note?`
                <div style="margin-top: 4px; padding: 10px 14px; background: rgba(82, 18, 22, 0.03); border-radius: 14px; border: 1px solid rgba(82, 18, 22, 0.05);">
                   <div style="font-size: 8px; font-weight: 950; color: var(--accent); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; opacity: 0.6;">Primary Requirement</div>
                   <div style="font-size: 11px; font-weight: 600; color: var(--text-secondary); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">${this.escapeHTML(t.enquiry_note)}</div>
                </div>
                `:""}

                <!-- Advanced Action Indicator & Administrative Controls -->
                <div style="position:absolute; bottom:28px; right:28px; display: flex; gap: 12px; align-items: center;">
                  ${e?`
                    <button onclick="event.stopPropagation(); app.forceCloseLead('${String(t.id).trim()}')" style="background: rgba(0,0,0,0.03); color: var(--text-muted); width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1.5px solid rgba(0,0,0,0.06); cursor: pointer; transition: all 0.3s;" title="Executive Override: Force Close" onmouseover="this.style.background='var(--error)'; this.style.color='#fff'; this.style.borderColor='var(--error)';" onmouseout="this.style.background='rgba(0,0,0,0.03)'; this.style.color='var(--text-muted)'; this.style.borderColor='rgba(0,0,0,0.06)';">
                      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  `:""}
                  <div style="opacity:0.1; transition: opacity 0.3s;" class="lead-chevron">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </div>
              </div>
           `},getRelativeTime(t){if(!t)return"TIME UNKNOWN";const e=typeof t=="number"?t:new Date(t).getTime();if(isNaN(e))return"INVALID DATE";const i=Date.now()-e,r=Math.floor(i/6e4);if(r<1)return"JUST NOW";if(r<60)return`${r}M AGO`;const o=Math.floor(r/60);return o<24?`${o}H AGO`:new Date(e).toLocaleDateString([],{day:"numeric",month:"short"}).toUpperCase()},initLeadsObserver(t){const e=document.getElementById("leads-sentinel");if(e){if(this._leadsObserver&&this._leadsObserver.disconnect(),!t){e.style.display="none";return}e.style.display="block",this._leadsObserver=new IntersectionObserver(i=>{i[0].isIntersecting&&(clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>{this.leadsPage++,this.refreshLeads(!0)},200))},{threshold:.1}),this._leadsObserver.observe(e)}},async fetchLeadDetail(t){if(!t)return null;const e=String(t).trim();try{const{data:i,error:r}=await b.from("leads").select("*").eq("id",e).single();if(r)throw r;let o=null;if(typeof i.timestamp=="number")o=i.timestamp;else if(i.timestamp){const n=new Date(i.timestamp).getTime();isNaN(n)||(o=n)}!o&&i.history&&Array.isArray(i.history)&&i.history.length>0&&(o=i.history[0].time),o&&(i.timestamp=o);const s=this.leads.findIndex(n=>String(n.id).trim()===e);return s!==-1?(this.leads[s]={...this.leads[s],...i},this.leads[s]):i}catch(i){return console.error("Detail Retrieval Fault:",i),null}},async viewLead(t){if(!t||String(t).trim()===""){this.toast("Security Protocol: Identity Missing","warning");return}const e=String(t).trim();try{let i=this.leads.find(g=>g&&g.id&&String(g.id).trim()===e);if(i||(this.toast("Vault Uplink: Synchronizing Remote Dossier...","info"),i=await this.fetchLeadDetail(e)),!i){this.toast("Registry Fault: Entry not found in Vault","error");return}if(!i.history||i.history.length===0){this.toast("Retrieving Tactical History...","info");const g=await this.fetchLeadDetail(e);g&&(i=g)}const r=document.getElementById("lead-modal");r.dataset.activeLeadId=e;const o=r.querySelector(".modal-content"),s=String(i.id).trim(),n=String(i.phone||"").trim(),a=n.replace(/\D/g,""),l=["Admin","Supervisor"].includes(this.user.role),d=i.assigned_to===this.user.id||i.owner===this.user.id||i.added_by===this.user.id,u=g=>String(g||"").toLowerCase().replace(/[^a-z0-9]/g,"").trim(),c=g=>{const v=String(g||"").replace(/\D/g,"");return v.length>=10?v.slice(-10):null},h=c(i.phone),f=u(i.name),p=(this.qmsRegistry||[]).find(g=>{const v=c(g.phone||g.mobile||g.contact||g.p),y=u(g.name||g.customer_name||g.n);return h&&v===h||f&&y===f});let x="";if(p){const g=String(p.sale_status||p.status||p.entry_type||"Visited").toUpperCase(),v=g.includes("PURCHASED")||g.includes("SUCCESS")||p.converted,y=new Date(p.ts||p.timestamp||p.created_at||Date.now()).toLocaleString([],{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});x=`
          <div style="background: ${v?"rgba(52, 199, 89, 0.08)":"rgba(255, 149, 0, 0.08)"}; border: 2px solid ${v?"rgba(52, 199, 110, 0.3)":"rgba(255, 149, 0, 0.3)"}; border-radius: 32px; padding: 24px; margin-bottom: 32px; display: flex; align-items: center; gap: 20px; animation: pulse 2s infinite;">
            <div style="width: 54px; height: 54px; border-radius: 18px; background: ${v?"var(--success)":"#FF9500"}; color: #fff; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px ${v?"rgba(52, 199, 89, 0.3)":"rgba(255, 149, 0, 0.3)"};">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <div style="flex: 1;">
              <div style="font-size: 10px; font-weight: 950; color: ${v?"#1E6B34":"#945D00"}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;">Verified Showroom Interaction</div>
              <div style="font-size: 16px; font-weight: 900; color: #000;">Customer Visit Detected: <span style="color: ${v?"var(--success)":"#FF9500"};">${g}</span></div>
              <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); margin-top: 4px;">Last Entry: ${y} • Requirement: ${p.requirement||p.rq||"General Enquiry"}</div>
            </div>
            ${v?'<div style="font-size: 10px; font-weight: 950; background: var(--success); color: #fff; padding: 6px 12px; border-radius: 10px; text-transform: uppercase;">PROPER CONVERSION</div>':""}
          </div>
        `}document.getElementById("modal-body").innerHTML=`
            <div style="text-align: center; margin-bottom: 32px; position: relative;">
              <div style="position: absolute; top: 0; right: 0;">
                <button id="edit-toggle-btn" onclick="app.toggleEditLead('${s}')" style="background: rgba(82,18,22,0.05); border: none; padding: 10px 16px; border-radius: 14px; font-size: 10px; font-weight: 900; color: var(--accent); cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;">Edit Profile</button>
              </div>
              <div class="avatar-box" style="width: 84px; height: 84px; margin: 0 auto; font-size: 32px; background: linear-gradient(135deg, var(--accent), #7A1C22); color: #fff; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 750; box-shadow: 0 15px 35px rgba(82,18,22,0.25); border: 2px solid rgba(255,255,255,0.2);">${String(i.name||"U")[0]}</div>
              
              <div id="lead-display-name">
                <h2 style="font-size: 34px; font-weight: 950; color: var(--text-primary); margin-top: 20px; letter-spacing: -1.5px; line-height: 1;">${i.name||"Unknown Executive"}</h2>
              </div>
              <div id="lead-edit-name" style="display: none; margin-top: 20px;">
                <input type="text" id="edit-name-val" value="${i.name||""}" class="input" style="height: 54px; text-align: center; font-size: 24px; font-weight: 900; border-radius: 18px; width: 85%; margin: 0 auto; border: 2px solid var(--accent-soft);">
              </div>
              
              <div style="display: flex; justify-content: center; gap: 10px; margin: 16px 0;">
                <span style="font-size: 10px; font-weight: 950; background:rgba(0,0,0,0.04); padding: 6px 14px; border-radius: 10px; color: var(--text-muted); text-transform:uppercase; letter-spacing: 0.5px;">${i.status||"Active"}</span>
                <span style="font-size: 10px; font-weight: 950; background:${this.getPriorityColor(i.priority)}15; padding: 6px 14px; border-radius: 10px; color: ${this.getPriorityColor(i.priority)}; text-transform:uppercase; letter-spacing: 0.5px; border: 1px solid ${this.getPriorityColor(i.priority)}25;">${i.priority||"Standard"} RATING</span>
              </div>

              ${x}

              ${i.type==="short"||i.type==="Short"||i.type==="short-reg"?`
                <div style="background: linear-gradient(135deg, rgba(0, 122, 255, 0.08), rgba(88, 86, 214, 0.08)); border: 2px dashed rgba(0, 122, 255, 0.3); border-radius: 32px; padding: 24px; margin-bottom: 32px; text-align: center; position: relative; overflow: hidden;">
                  <div style="position: absolute; top: -10px; right: -10px; opacity: 0.1; transform: rotate(15deg);">
                    <svg width="100" height="100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
                  </div>
                  <div style="font-size: 10px; font-weight: 950; color: #007AFF; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Restricted Intelligence Entry</div>
                  <div style="font-size: 15px; font-weight: 900; color: #000; margin-bottom: 16px;">This is a Short-Form Rapid Capture</div>
                  <button onclick="app.upgradeLeadToLongForm('${s}')" style="background: linear-gradient(135deg, #007AFF, #5856D6); color: #fff; border: none; padding: 12px 28px; border-radius: 16px; font-size: 12px; font-weight: 950; cursor: pointer; box-shadow: 0 10px 25px rgba(0, 122, 255, 0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">UPGRADE TO FULL DOSSIER</button>
                </div>
              `:""}
            </div>

            <div class="milestone-bar" style="display: flex; justify-content: space-between; align-items: center; background: rgba(82, 18, 22, 0.03); backdrop-filter: blur(10px); padding: 28px; border-radius: 32px; border: 1.5px solid var(--accent-soft); margin-bottom: 40px; box-shadow: 0 12px 40px rgba(0,0,0,0.02);">
               <div style="flex: 1;">
                 <div style="font-size: 10px; font-weight: 950; color: var(--accent); margin-bottom: 14px; text-transform: uppercase; letter-spacing: 2.5px; opacity: 0.7;">Tactical Horizon Adjuster</div>
                 <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="position: relative; display: flex; align-items: center;">
                      <input type="date" id="horizon-recalc-date" value="${i.followup_date||i.followupDate||""}" style="border: 2px solid rgba(82,18,22,0.12); padding: 14px 20px; border-radius: 16px; font-size: 15px; font-weight: 900; color: var(--text-primary); outline: none; background: #fff; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);" onchange="app.recalibrateHorizon('${s}', this.value)" onfocus="this.style.borderColor='var(--accent)'; this.style.boxShadow='0 0 0 4px var(--accent-soft)'" onblur="this.style.borderColor='rgba(82,18,22,0.12)'; this.style.boxShadow='none'">
                    </div>
                    <div style="font-size: 12px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.6;">Next Strategic Milestone</div>
                 </div>
               </div>
               <div style="display: flex; gap: 14px;">
                 ${i.status==="Follow-up"?`<button onclick="app.markFollowUpDone('${s}')" style="background: linear-gradient(135deg, var(--accent), #7A1C22); color: #fff; border:none; padding: 16px 28px; border-radius: 20px; font-size: 13px; font-weight: 950; cursor:pointer; box-shadow: 0 12px 30px rgba(82,18,22,0.3); transition: all 0.4s ease;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">COMPLETE MISSION</button>`:""}
               </div>
            </div>

            <div style="background: rgba(255,255,255,0.6); backdrop-filter: blur(20px); border-radius: 32px; padding: 32px; border: 1px solid rgba(0,0,0,0.04); margin-bottom: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.02);">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 28px;">
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Identity / Phone</div>
                  <div id="lead-display-phone" style="font-weight: 850; font-size: 16px; color: var(--text-primary); letter-spacing: -0.5px;">${n}</div>
                  <div id="lead-edit-phone" style="display: none;">
                    <input type="tel" id="edit-phone-val" value="${n}" class="input" style="height: 40px; font-size: 14px; border-radius: 10px; padding: 0 12px; border: 1.5px solid var(--accent-soft);">
                  </div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Intent / Product</div>
                  <div id="lead-display-interest" style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${String(i.interest||"N/A").split(",").map(g=>`
                      <span style="font-weight: 900; font-size: 11px; color: var(--accent); background: var(--accent-soft); padding: 6px 12px; border-radius: 10px; text-transform: uppercase; border: 1px solid rgba(82,18,22,0.1); letter-spacing: 0.3px;">${g.trim()}</span>
                    `).join("")}
                  </div>
                  <div id="lead-edit-interest" style="display: none;">
                    <input type="text" id="edit-interest-val" value="${i.interest||""}" class="input" style="height: 40px; font-size: 14px; border-radius: 10px; padding: 0 12px; border: 1.5px solid var(--accent-soft); width: 100%;">
                  </div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Target Weight</div>
                  <div id="lead-display-weight" style="font-weight: 850; font-size: 16px; color: var(--text-primary); letter-spacing: -0.5px;">${i.weight||"N/A"}</div>
                  <div id="lead-edit-weight" style="display: none;">
                    <input type="text" id="edit-weight-val" value="${i.weight||""}" class="input" style="height: 40px; font-size: 14px; border-radius: 10px; padding: 0 12px; border: 1.5px solid var(--accent-soft); width: 100%;">
                  </div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">System Enrollment</div>
                  <div style="font-weight: 800; font-size: 13px; color: var(--text-primary);">${(()=>{const g=typeof i.timestamp=="number"?i.timestamp:i.timestamp?new Date(i.timestamp).getTime():null;if(!g||isNaN(g))return"Date Unavailable";const v=new Date(g);return`<span style="color:var(--accent); font-weight:900;">${this.getRelativeTime(g)}</span> • ${v.toLocaleDateString([],{month:"short",day:"numeric",year:"numeric"})} @ ${v.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}`})()}</div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Custodian / Assigned Member</div>
                  <div style="font-weight: 850; font-size: 14px; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.5px;">${i.owner_name||i.added_by||"Unassigned"}</div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Acquisition Source</div>
                  <div style="font-weight: 850; font-size: 14px; color: var(--accent); text-transform: uppercase; letter-spacing: 0.5px;">${i.source||"DIRECT"}</div>
                </div>
                <div>
                  <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;">Geographic Context</div>
                  <div id="lead-display-location" style="font-weight: 850; font-size: 14px; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.5px;">${i.location||"N/A"}</div>
                  <div id="lead-edit-location" style="display: none;">
                    <input type="text" id="edit-location-val" value="${i.location||""}" class="input" style="height: 40px; font-size: 14px; border-radius: 10px; padding: 0 12px; border: 1.5px solid var(--accent-soft);">
                  </div>
                </div>
                ${i.checklist&&i.checklist.length>0?`
                <div style="grid-column: span 2; margin-top: 16px; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.04);">
                   <div style="font-size: 9px; font-weight: 950; color: var(--accent); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.6;">Strategic Objectives</div>
                   <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                      ${i.checklist.map(g=>`
                        <div style="background: #fff; border: 1.5px solid rgba(82,18,22,0.1); color: var(--accent); padding: 10px 18px; border-radius: 14px; font-size: 11px; font-weight: 900; display: flex; align-items: center; gap: 10px; box-shadow: 0 6px 15px rgba(82,18,22,0.04); transition: all 0.3s ease;">
                           <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                           ${g}
                        </div>
                      `).join("")}
                   </div>
                </div>
                `:""}

                ${i.enquiry_note?`
                <div style="grid-column: span 2; margin-top: 16px; padding: 24px; background: rgba(82, 18, 22, 0.04); border: 2px solid var(--accent-soft); border-radius: 24px; position: relative; overflow: hidden;">
                   <div style="position: absolute; top: -10px; right: -10px; opacity: 0.05;">
                      <svg width="80" height="80" fill="var(--accent)" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path></svg>
                   </div>
                   <div style="font-size: 10px; font-weight: 950; color: var(--accent); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; position: relative; z-index: 1;">Primary Requirement Dossier</div>
                   <div style="font-size: 15px; font-weight: 750; color: var(--text-primary); line-height: 1.6; letter-spacing: -0.3px; position: relative; z-index: 1;">${this.escapeHTML(i.enquiry_note)}</div>
                </div>
                `:""}

                ${i.executive_comment?`
                <div style="grid-column: span 2; margin-top: 12px; padding: 24px; background: rgba(0, 122, 255, 0.04); border: 1.5px solid rgba(0, 122, 255, 0.1); border-radius: 24px;">
                   <div style="font-size: 10px; font-weight: 950; color: #007AFF; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px;">Executive Commentary</div>
                   <div style="font-size: 14px; font-weight: 750; color: var(--text-primary); line-height: 1.6;">${this.escapeHTML(i.executive_comment)}</div>
                </div>
                `:""}

                ${i.notes?`
                <div style="grid-column: span 2; margin-top: 12px; padding: 24px; background: rgba(0, 0, 0, 0.02); border: 1.5px dashed rgba(0, 0, 0, 0.1); border-radius: 24px;">
                   <div style="font-size: 10px; font-weight: 950; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 2px;">Technical Logs / Member Notes</div>
                   <div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); line-height: 1.6;">${this.escapeHTML(i.notes)}</div>
                </div>
                `:""}
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
                  <button onclick="app.logManualNote('${s}')" style="position: absolute; right: 8px; background: var(--accent); color: #fff; border: none; height: 40px; padding: 0 18px; border-radius: 14px; font-size: 10px; font-weight: 950; cursor: pointer; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(82,18,22,0.2);">LOG</button>
                </div>
              </div>

              <!-- Tactical Intelligence Timeline -->
              <div id="tactical-timeline" style="margin-top: 8px; margin-bottom: 32px; border-top: 1.5px solid rgba(0,0,0,0.04); padding-top: 24px;">
                <div style="font-size: 10px; font-weight: 950; color: var(--accent); margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.6; display: flex; align-items: center; gap: 10px;">
                  <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Tactical Intelligence Timeline
                </div>
                <div style="display: flex; flex-direction: column; gap: 18px; max-height: 280px; overflow-y: auto; padding-right: 8px; scrollbar-width: none;">
                  ${i.history&&i.history.length>0?[...i.history].reverse().map(g=>`
                    <div style="display: flex; gap: 16px; position: relative;">
                      <div style="display: flex; flex-direction: column; align-items: center; min-width: 12px;">
                        <div style="width: 10px; height: 10px; background: ${g.action.includes("Remark")?"var(--accent)":g.action.includes("Mission")?"var(--error)":"var(--text-muted)"}; border-radius: 50%; z-index: 1; border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.1);"></div>
                        <div style="flex: 1; width: 1.5px; background: rgba(0,0,0,0.06); margin: 4px 0;"></div>
                      </div>
                      <div style="flex: 1; padding-bottom: 4px;">
                        <div style="font-size: 13px; font-weight: 700; color: var(--text-primary); line-height: 1.5; letter-spacing: -0.2px;">${this.escapeHTML(g.action)}</div>
                        <div style="font-size: 9px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; margin-top: 6px; display: flex; align-items: center; gap: 6px;">
                          <span style="opacity: 0.5;">${this.getRelativeTime(g.time)}</span>
                          ${g.action.includes("Executive")?'<span style="color:var(--accent); background:var(--accent-soft); padding: 2px 6px; border-radius: 4px; font-size: 8px;">EXECUTIVE LOG</span>':""}
                        </div>
                      </div>
                    </div>
                  `).join(""):`
                    <div style="padding: 40px 20px; text-align: center; background: rgba(0,0,0,0.02); border-radius: 20px; border: 1.5px dashed rgba(0,0,0,0.06);">
                      <div style="font-size: 11px; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; opacity: 0.5;">No previous logs found in vault</div>
                    </div>
                  `}
                </div>
              </div>


              <!-- Executive Command Console -->
              <div style="display: flex; gap: 12px; justify-content: space-between; align-items: center;">
                <button class="btn-hub" id="save-edits-btn" onclick="app.saveLeadEdits('${s}')" style="display: none; background: var(--success); color: #fff; border: none; height: 52px; border-radius: 18px; font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.5px; gap: 8px; flex: 1; justify-content: center; align-items: center;">
                  <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                  Save Edits
                </button>
                
                <button onclick="app.initCall('${i.name.replace(/'/g,"\\'")}', '${n}')" style="flex: 1; height: 52px; background: rgba(52, 199, 89, 0.08); border: 1.5px solid rgba(52, 199, 89, 0.15); border-radius: 18px; color: #2D8C44; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s;" onmouseover="this.style.background='rgba(52, 199, 89, 0.15)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(52, 199, 89, 0.08)'; this.style.transform='translateY(0)'">
                  <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span style="font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.5px;">Call</span>
                </button>

                <button onclick="window.open('https://wa.me/${a}', '_blank')" style="flex: 1; height: 52px; background: rgba(37, 211, 102, 0.08); border: 1.5px solid rgba(37, 211, 102, 0.15); border-radius: 18px; color: #128C7E; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s;" onmouseover="this.style.background='rgba(37, 211, 102, 0.15)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(37, 211, 102, 0.08)'; this.style.transform='translateY(0)'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.55 4.197 1.594 6.015L0 24l6.135-1.582C7.904 23.45 9.904 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.897 0-3.753-.512-5.373-1.482l-.385-.229-3.664.945.961-3.513-.251-.4c-1.062-1.695-1.621-3.662-1.621-5.694 0-5.86 4.766-10.627 10.627-10.627 5.86 0 10.627 4.766 10.627 10.627S17.86 22 12 22z"/></svg>
                  <span style="font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.5px;">WhatsApp</span>
                </button>

                ${l||d?`
                <button onclick="app.forceCloseLead('${s}')" style="flex: 1; height: 52px; background: rgba(0,0,0,0.03); border: 1.5px solid rgba(0,0,0,0.08); border-radius: 18px; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.3s;" onmouseover="this.style.background='var(--error)'; this.style.color='#fff'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(0,0,0,0.03)'; this.style.color='var(--text-muted)'; this.style.transform='translateY(0)'">
                  <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg>
                  <span style="font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 0.5px;">${l?"Force Close":"Close"}</span>
                </button>
                `:""}
              </div>
            </div>
          `,r.style.display="flex",r.classList.add("active"),window.innerWidth<850&&(o.style.transform="translateY(0)"),o.scrollTop=0}catch(i){console.error("Dossier Activation Fault:",i),this.toast("Critical Dossier Glitch: Check Console","error")}},closeModal(t){if(t&&t.target.id!=="lead-modal"&&!t.target.closest(".modal-close-btn"))return;const e=document.getElementById("lead-modal");e.classList.remove("active"),setTimeout(()=>{e.style.display="none"},400)},async forceCloseLead(t){if(t)try{this.toast("Terminating Lead Protocol...","info");const e=String(t).trim(),i=this.leads.find(o=>String(o.id).trim()===e),r=i?i.history||[]:[];r.push({time:Date.now(),action:"Mission Aborted: Forced Close initiated by executive override."}),await V.updateLead(e,{status:"Closed",followup_date:null,priority:"Cold",history:r}),i&&(i.status="Closed"),this.toast("Lead Force-Closed 🔐","success"),this.closeModal(),this.refreshLeads()}catch(e){console.error("Force Close Fault:",e),this.toast("Registry Protocol Failure","error")}},toggleEditLead(t){const e=document.getElementById("lead-edit-name").style.display==="block";["name","phone","location","interest","weight"].forEach(r=>{document.getElementById(`lead-display-${r}`).style.display=e?"block":"none",document.getElementById(`lead-edit-${r}`).style.display=e?"none":"block"}),document.getElementById("edit-toggle-btn").textContent=e?"Edit Profile":"Cancel Edit",document.getElementById("save-edits-btn").style.display=e?"none":"flex"},async saveLeadEdits(t){try{const e=document.getElementById("edit-name-val").value.trim(),i=document.getElementById("edit-phone-val").value.trim(),r=document.getElementById("edit-location-val").value.trim(),o=document.getElementById("edit-interest-val").value.trim(),s=document.getElementById("edit-weight-val").value.trim();if(!e||!i)return this.toast("Registry Requirement: Name & Phone","warning");this.toast("Synchronizing Intelligence Vault...","info");const a=this.leads.find(d=>String(d.id)===String(t)).history||[];a.push({time:Date.now(),action:"Executive Dossier Modified: Product & Weight metrics recalibrated."}),await V.updateLead(t,{name:e,phone:i,location:r,interest:o,weight:s,history:a}),this.toast("Registry Updated Success ✅","success");const l=this.leads.find(d=>String(d.id)===String(t));l&&this.syncToSheets(l).catch(d=>console.error("Sheets Sync Fault:",d)),this.viewLead(t)}catch(e){console.error("Profile Edit Fault:",e),this.toast("Registry Protocol Failure","error")}},async updateStatus(t){const e=this.leads.find(o=>String(o.id)===String(t)),i=["New Inquiry","Contacted","Store Visit","Follow-up","Purchased","Closed"],r=i[(i.indexOf(e.status)+1)%i.length];try{await V.updateLead(t,{status:r,history:xt({time:Date.now(),action:`Status adjusted to ${r}`})}),this.toast("Registry Updated"),this.viewLead(t);const o=this.leads.find(s=>String(s.id)===String(t));o&&this.syncToSheets(o)}catch{this.toast("Status Update Failed","error")}},async recalibrateHorizon(t,e){try{const i=this.leads.find(s=>String(s.id)===String(t));if(!i)return;if(!(this.user.role===D.ADMIN||this.user.role===D.SUPERVISOR||i.owner===this.user.id||i.assigned_to===this.user.id))return this.toast("Strategic Override Denied","error");this.toast("Recalibrating Tactical Horizon...","info");const o=i.history||[];o.push({time:Date.now(),action:`Strategic Target Recalibrated to: ${e.split("-").reverse().join("/")}`}),await V.updateLead(t,{followup_date:e,history:o}),this.toast("Mission Critical Update: Horizon Recalibrated 📡","success"),this.viewLead(t)}catch(i){console.error("Horizon Recalibration Fault:",i),this.toast("Terminal Registry Communication Fault","error")}},async upgradeLeadToLongForm(t){var o;if(!t)return;this.toast("Uplink Initiated: Upgrading Intelligence Protocol...","info");const e=this.leads.findIndex(s=>String(s.id)===String(t));if(e===-1)return;const i=this.leads[e],r=i.history||[];r.push({time:Date.now(),action:"Intelligence Upgrade: Short Form converted to Long Form Dossier by "+(((o=this.user)==null?void 0:o.name)||"System")});try{const{error:s}=await b.from("leads").update({type:"long",history:r}).eq("id",t);if(s)throw s;this.leads[e]={...i,type:"long",history:r},this.toast("Intelligence Upgrade Complete: Dossier Unlocked","success"),this.updateNavStats(),this.viewLead(t),U.set("leads",this.leads.slice(0,2e3))}catch(s){console.error("Upgrade Fault:",s),this.toast("Upgrade Failure: Protocol Interrupted","error")}},async markFollowUpDone(t){try{if(!t)throw new Error("Missing Lead ID");this.toast("Synchronizing Tactical Registry...","info");const e=this.leads.find(o=>String(o.id)===String(t));if(!e)return;const i=e.history||[];i.push({time:Date.now(),action:"Strategic follow-up completed. Terminal Tag: 'Follow-up Done'."}),await V.updateLead(t,{status:"Follow-up Done",followup_date:null,history:i}),this.toast("Strategic Registry Synchronized 🔐"),this.closeModal(),this.viewFilteredRegistry(null);const r=this.leads.find(o=>String(o.id)===String(t));r&&this.syncToSheets(r)}catch(e){console.error("Follow-up Sync Master Fault:",e),this.toast(`Registry Fault: ${e.message}`,"error")}},async saveShortLead(){try{if(!this.user)return this.toast("Authentication Shield Triggered: Access Denied","error");const t=document.getElementById("short-lead-name").value,e=document.getElementById("short-lead-location").value,i=document.getElementById("short-lead-source").value,r=document.getElementById("short-lead-info").value,o=this.generateID(),s=r?`${i} (Quick) | Note: ${r}`:`${i} (Quick)`,n={id:o,name:t||"Unnamed Quick Lead",phone:"SHORT-REG",location:e||"Not Specified",interest:s,source:i,status:"New Inquiry",priority:"Warm",type:"short",timestamp:new Date().toISOString(),owner:this.user.id,owner_name:this.user.name,added_by:this.user.email||"terminal@vera.gold",history:[{time:Date.now(),action:"Short Lead Captured"}]};this.toast("Syncing Short Lead...","info");const{error:a}=await b.from("leads").insert([n]);if(a)throw a;this.fetchAndRenderLeads&&this.fetchAndRenderLeads(),this.toast("Short Lead Secure ✅","success"),document.getElementById("short-lead-name").value="",document.getElementById("short-lead-location").value="",document.getElementById("short-lead-info").value="",this.syncToSheets(n).catch(l=>console.error("Sheets Async Fault:",l))}catch(t){console.error("Short Entry Fault:",t);const e=t.details||t.hint||"Schema Mismatch";this.toast(`Critical Entry Fault: ${t.message} (${e})`,"error")}},async renderProfile(){const t=document.getElementById("profile-container");if(!t)return;const e=this.user,i=e.role||"Member",r=["Admin","Supervisor"].includes(i);this.activeProfileTab||(this.activeProfileTab="personal");const o=s=>{t.innerHTML=`<div style="padding: 60px 24px; text-align: center; color: var(--error); font-weight: 700;">TERMINAL ERROR: ${s}</div>`};try{if(!e||!e.id){t.innerHTML='<div style="padding: 120px 40px; text-align: center; opacity: 0.5; font-weight: 700;">Awaiting Biometric Authentication...</div>';return}const s=this.leads.filter(f=>f.assigned_to===e.id||f.owner===e.id),n=s.length,a=s.filter(f=>f.status==="Purchased").length,l=n>0?(a/n*100).toFixed(1):"0.0",d=s.filter(f=>f.priority==="Hot"&&f.status!=="Closed").length,u=(e.name||"E").charAt(0).toUpperCase();let c="";const h=`
                <div class="panoramic-grid grid-3-col" style="margin-top: 32px;">
                  
                  <!-- UNIT 1: CONVERSION VELOCITY -->
                  <div class="card elevated" style="padding: 32px; border-radius: 40px; background: var(--accent-gradient); color: #fff; display: flex; flex-direction: column; justify-content: space-between; min-height: 200px; box-shadow: 0 20px 40px rgba(82,18,22,0.15);">
                    <div style="font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8;">Conversion Velocity</div>
                    <div>
                      <div class="scale-big-stats" style="font-size: 64px; font-weight: 950; letter-spacing: -3.5px; line-height: 1;">${l}%</div>
                      <div style="font-size: 12px; font-weight: 850; opacity: 0.7; margin-top: 8px;">${a} Successes from ${n} Engagements</div>
                    </div>
                  </div>

                  <!-- UNIT 2: HOT PATH DEPTH -->
                  <div class="card elevated" style="padding: 32px; border-radius: 40px; background: #fff; border: 1.5px solid rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between; min-height: 200px;">
                    <div style="font-size: 11px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Hot Path Depth</div>
                    <div>
                      <div class="scale-big-stats" style="font-size: 64px; font-weight: 950; color: var(--error); letter-spacing: -3.5px; line-height: 1;">${d}</div>
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
            `;this.activeProfileTab==="personal"?c=`
                ${h}

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
                      <input type="tel" id="personal-calling-num" placeholder="e.g. 9876543210" value="${this.user.calling_number||""}" class="input" style="height: 52px; margin-top: 8px; border-radius: 16px; font-weight: 900;">
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
                    ${s.slice(0,6).map(f=>`
                      <div class="card elevated" onclick="app.viewLead('${f.id?String(f.id).trim():""}')" style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.02); cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); display: flex; flex-direction: column; gap: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                           <div style="width: 44px; height: 44px; background: ${f.priority==="Hot"?"rgba(255,59,48,0.08)":"rgba(0,122,255,0.08)"}; color: ${f.priority==="Hot"?"#FF3B30":"#007AFF"}; border-radius: 14px; display: flex; align-items: center; justify-content: center;">
                              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                           </div>
                           <span style="font-size: 9px; font-weight: 950; padding: 5px 10px; background: rgba(0,0,0,0.04); color: var(--text-muted); border-radius: 8px; text-transform: uppercase;">${f.status}</span>
                        </div>
                        <div>
                          <div style="font-weight: 950; font-size: 18px; color: var(--text-primary); letter-spacing: -0.5px;">${f.name}</div>
                          <div style="font-size: 11px; font-weight: 850; color: var(--text-muted); margin-top: 4px; text-transform: uppercase;">Channel: ${f.source}</div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                           <div style="width: 8px; height: 8px; background: ${f.priority==="Hot"?"#FF3B30":"#34C759"}; border-radius: 50%; box-shadow: 0 0 8px ${f.priority==="Hot"?"#FF3B3066":"#34C75966"};"></div>
                           <span style="font-size: 10px; font-weight: 950; color: ${f.priority==="Hot"?"#FF3B30":"#34C759"}; text-transform: uppercase;">${f.priority==="Hot"?"Critical":"Stable"} Priority</span>
                        </div>
                      </div>
                    `).join("")||`
                      <div style="grid-column: span 3; padding: 64px; text-align: center; background: rgba(0,0,0,0.015); border: 1.5px dashed rgba(0,0,0,0.05); border-radius: 32px;">
                        <div style="font-size: 32px; margin-bottom: 16px;">📋</div>
                        <div style="font-size: 13px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Operational Queue Vacant</div>
                      </div>
                    `}
                  </div>
                </div>
              `:c=`
                ${h}
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
                            ${Object.keys(this.goldRates).filter(f=>f.startsWith("2")||f==="18K"||f==="Coin"||f==="Old Gold").map(f=>`
                              <div>
                                <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">${f}</div>
                                <input type="number" id="rate-edit-${f}" value="${this.goldRates[f]}" class="input" style="height: 48px; border-radius: 14px; font-size: 16px; font-weight: 800; padding: 0 16px; background: rgba(0,0,0,0.02); border: 1.5px solid transparent; transition: all 0.3s ease;">
                              </div>
                            `).join("")}
                          </div>
                        </div>
                        
                        <!-- Silver Cluster -->
                        <div>
                          <h5 style="font-size: 10px; font-weight: 950; color: #A8A9AD; margin-bottom: 16px; letter-spacing: 1.5px; text-transform: uppercase;">ARGENTUM MATRIX</h5>
                          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            ${Object.keys(this.goldRates).filter(f=>f.startsWith("Silver")).map(f=>`
                              <div>
                                <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px;">${f}</div>
                                <input type="number" id="rate-edit-${f}" value="${this.goldRates[f]}" class="input" style="height: 48px; border-radius: 14px; font-size: 16px; font-weight: 800; padding: 0 16px; background: rgba(0,0,0,0.02); border: 1.5px solid transparent; transition: all 0.3s ease;">
                              </div>
                            `).join("")}
                          </div>
                        </div>
                     </div>
                  </div>
                </div>
              `,t.innerHTML=`
              <div style="padding: 40px; max-width: 1600px; margin: 0 auto;">
                
                <!-- SOVEREIGN HORIZONTAL HERO BAR -->
                <div class="card elevated hero-bar-stack" style="background: #fff; padding: 40px; border-radius: 48px; border: 1.5px solid rgba(0,0,0,0.02); margin-bottom: 32px; position: relative; overflow: hidden; display: flex; justify-content: space-between; align-items: center;">
                  <div style="position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: var(--accent-gradient);"></div>
                  
                  <div style="display: flex; align-items: center; gap: 32px;">
                    <div class="avatar-box" style="width: 100px; height: 100px; min-width: 100px; border-radius: 32px; background: var(--accent-gradient); color: #fff; font-size: 40px; font-weight: 950; display: flex; align-items: center; justify-content: center; box-shadow: 0 15px 35px rgba(82, 18, 22, 0.2);">${u}</div>
                    <div>
                      <h1 class="responsive-h1" style="font-size: 44px; font-weight: 950; color: var(--text-primary); margin: 0; letter-spacing: -2.2px; line-height: 1;">${(e.name||"Executive").toUpperCase()}</h1>
                      <div style="display: flex; gap: 10px; margin-top: 12px; flex-wrap: wrap;">
                        <span style="font-size: 11px; font-weight: 950; padding: 7px 16px; background: rgba(0,0,0,0.04); color: var(--text-primary); border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px;">${i} ID: ${e.id.slice(0,6)}</span>
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
                ${r?`
                  <div style="display: flex; background: rgba(0,0,0,0.035); padding: 8px; border-radius: 24px; margin-bottom: 40px; gap: 8px; width: 100%; max-width: 500px; margin-left: 0;">
                    <button onclick="app.activeProfileTab='personal'; app.renderProfile();" style="flex: 1; height: 48px; border: none; border-radius: 18px; font-size: 11px; font-weight: 950; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); background: ${this.activeProfileTab==="personal"?"#fff":"transparent"}; color: ${this.activeProfileTab==="personal"?"var(--text-primary)":"var(--text-muted)"}; box-shadow: ${this.activeProfileTab==="personal"?"0 8px 16px rgba(0,0,0,0.06)":"none"}; text-transform: uppercase; letter-spacing: 1px;">Personal Command Hub</button>
                    <button onclick="app.activeProfileTab='command'; app.renderProfile();" style="flex: 1; height: 48px; border: none; border-radius: 18px; font-size: 11px; font-weight: 950; cursor: pointer; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); background: ${this.activeProfileTab==="command"?"#fff":"transparent"}; color: ${this.activeProfileTab==="command"?"var(--text-primary)":"var(--text-muted)"}; box-shadow: ${this.activeProfileTab==="command"?"0 8px 16px rgba(0,0,0,0.06)":"none"}; text-transform: uppercase; letter-spacing: 1px;">Admin Console</button>
                  </div>
                `:""}

                ${c}

                <div style="margin-top: 80px; text-align: center; border-top: 1px solid rgba(0,0,0,0.03); padding-top: 32px;">
                  <p style="font-size: 10px; font-weight: 950; color: var(--text-muted); opacity: 0.4; letter-spacing: 3px; text-transform: uppercase;">Sovereign Executive Core v9.5 • Quantum Encrypted Port 8080</p>
                </div>
              </div>
            `}catch(s){console.error("CRITICAL_RENDER_FAIL:",s),o(s.message)}},togglePass(t){const e=document.getElementById(t);e.type=e.type==="password"?"text":"password"},checkAccess(){return this.user&&this.user.role===D.MEMBER?(this.toast("Security Access Restricted","error"),this.navigate("dashboard"),!1):!0},toggleAIChat(){const t=document.getElementById("ai-fab"),e=document.getElementById("ai-window");e.classList.contains("active")?(e.classList.remove("active"),t.style.opacity="1",t.style.pointerEvents="auto"):(e.classList.add("active"),t.style.opacity="0.3",document.getElementById("ai-input").focus())},async sendAIChat(){const t=document.getElementById("ai-input"),e=document.getElementById("ai-messages"),i=document.getElementById("ai-typing"),r=t.value.trim();if(r){t.value="",this.renderAIChatBubble(r,"user"),this.chatHistory.push({role:"user",content:r}),this.chatHistory.length>6&&this.chatHistory.shift(),i.style.display="flex",e.scrollTop=e.scrollHeight;try{const o=await this.callGrok(this.chatHistory);i.style.display="none",this.renderAIChatBubble(o,"ai"),this.chatHistory.push({role:"assistant",content:o})}catch{i.style.display="none",this.toast("Neural Stream Interrupted","error")}}},renderAIChatBubble(t,e){const i=document.getElementById("ai-messages"),r=document.createElement("div");r.className=`chat-msg msg-${e}`;const o=t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\n/g,"<br>");r.innerHTML=o,i.appendChild(r),i.scrollTop=i.scrollHeight},async hardReset(){if(this.toast("Initiating Strategic Wipe...","info"),"serviceWorker"in navigator){const t=await navigator.serviceWorker.getRegistrations();for(let e of t)await e.unregister()}localStorage.clear(),window.location.reload(!0)},updateNavStats(){try{const t=new Date,e=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime(),i=document.getElementById("island-yield");i&&(i.textContent=this.leads.filter(r=>r.status==="Purchased").length)}catch(t){console.warn("Nav Stats deferred:",t)}},systemPulse(){(async()=>{var t,e,i;try{const r=await V.getLeadCount(),o=`System Pulse Report:
- User: ${(t=this.user)==null?void 0:t.email}
- Role: ${(e=this.user)==null?void 0:e.role}
- Permission Count: ${r}
- Loaded in Memory: ${((i=this.leads)==null?void 0:i.length)||0}
- Sync Status: ${this._syncInitialized?"Active":"Offline"}
- Heartbeat: ${new Date().toLocaleTimeString()}`;alert(o),console.log("[SYSTEM PULSE] Detail:",this.leads)}catch(r){alert("Sync Block Detected: "+r.message+`
(This usually means RLS policies are blocking you or your session is invalid.)`)}})()},async renderAdminPanel(){const t=document.getElementById("admin-panel-container");if(!t)return;const e=this.user;if(e.role===D.ADMIN){t.innerHTML='<div style="padding: 80px 40px; text-align: center; opacity: 0.5; font-weight: 700;">Authorizing Tactical Uplink...</div>';try{const{data:i}=await b.from("staff").select("*"),r=this.leads.length,o=this.leads.filter(a=>a.status==="Purchased").length,s=r>0?(o/r*100).toFixed(1):0,n={Strategic:i.filter(a=>a.role==="Admin"),Tactical:i.filter(a=>a.role==="Supervisor"),Operational:i.filter(a=>a.role==="Member"||!a.role)};t.innerHTML=`
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
                    <div class="scale-big-stats" style="font-size: 56px; font-weight: 950; letter-spacing: -3px; margin-top: 12px;">${s}%</div>
                    <div style="font-size: 12px; color: rgba(255,255,255,0.7); font-weight: 850; margin-top: 8px;">Aggregate performance across all tactical sectors</div>
                  </div>
                  <div class="card elevated" style="background: #fff; padding: 40px; border-radius: 40px; border: 1px solid rgba(0,0,0,0.03);">
                    <div style="font-size: 11px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Active Personnel Fleet</div>
                    <div class="scale-big-stats" style="font-size: 56px; font-weight: 950; color: var(--text-primary); margin-top: 12px; letter-spacing: -3px;">${i.length}</div>
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
                  ${(()=>{const a=this.leads.reduce((l,d)=>(d.owner&&(l[d.owner]||(l[d.owner]={total:0,purchased:0}),l[d.owner].total++,d.status==="Purchased"&&l[d.owner].purchased++),l),{});return Object.entries(n).map(([l,d])=>{if(d.length===0)return"";let u="var(--accent)",c="OPERATIONAL CORPS";return l==="Strategic"?(c="STRATEGIC COMMAND",u="#FF3B30"):l==="Tactical"&&(c="TACTICAL COMMAND",u="#5856D6"),`
                        <div>
                          <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 32px;">
                            <h2 style="font-size: 12px; font-weight: 950; color: ${u}; letter-spacing: 2.5px; text-transform: uppercase; margin: 0;">${c}</h2>
                            <div style="flex: 1; height: 1px; background: ${u}; opacity: 0.15;"></div>
                            <div style="font-size: 10px; font-weight: 900; color: var(--text-muted);">${d.length} UNITS</div>
                          </div>

                          <div class="panoramic-grid grid-stack" style="grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr)); gap: 24px;">
                            ${d.map(h=>{const f=a[h.id]||{total:0,purchased:0},p=f.total>0?Math.round(f.purchased/f.total*100):0;return`
                              <div class="card elevated" style="background: #fff; border-radius: 32px; padding: 28px; border: 1.5px solid rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden;">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px;">
                                    <div style="display: flex; align-items: center; gap: 20px;">
                                        <div style="width: 52px; height: 52px; background: ${u}; color: #fff; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-weight: 950; font-size: 20px; box-shadow: 0 10px 20px ${u}33;">
                                            ${(h.name||h.id).charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style="font-weight: 950; font-size: 18px; letter-spacing: -0.8px; color: var(--text-primary);">${(h.name||h.id).toUpperCase()}</div>
                                            <div style="font-size: 11px; color: var(--text-muted); font-weight: 800; margin-top: 2px; opacity: 0.7;">${h.email||h.id+"@vera.gold"}</div>
                                        </div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-size: 20px; font-weight: 950; color: ${p>25?"var(--success)":u}; letter-spacing: -0.5px;">${p}%</div>
                                        <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); text-transform: uppercase;">VELOCITY</div>
                                    </div>
                                </div>
                                
                                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.04);">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="font-size: 10px; font-weight: 850; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Authorization</span>
                                        <div style="width: 6px; height: 6px; background: ${p>0?"var(--success)":"var(--text-muted)"}; border-radius: 50%;"></div>
                                    </div>
                                    
                                    <select 
                                        onchange="app.updateStaffRole('${h.id}', this.value)" 
                                        style="background: rgba(0,0,0,0.03); border: none; border-radius: 10px; font-size: 10px; font-weight: 950; padding: 10px 16px; color: ${u}; cursor: pointer; outline: none; appearance: none; text-align: center; text-transform: uppercase; letter-spacing: 0.5px;"
                                        ${h.id===e.id?"disabled":""}
                                    >
                                        <option value="${D.ADMIN}" ${h.role===D.ADMIN?"selected":""}>STRATEGIC ADMIN</option>
                                        <option value="${D.SUPERVISOR}" ${h.role===D.SUPERVISOR?"selected":""}>TACTICAL SUPERVISOR</option>
                                        <option value="${D.MEMBER}" ${h.role===D.MEMBER?"selected":""}>OPERATIONAL MEMBER</option>
                                    </select>
                                </div>
                            </div>
                          `}).join("")}
                        </div>
                      </div>
                    `}).join("")})()}
                </div>

                <div style="margin-top: 64px; text-align: center; cursor: pointer;" onclick="app.systemPulse()">
                  <div style="width: 100%; height: 1px; background: rgba(0,0,0,0.03); margin-bottom: 32px;"></div>
                  <p style="font-size: 10px; font-weight: 950; color: var(--text-muted); opacity: 0.5; letter-spacing: 3px; text-transform: uppercase;">Sovereign Administrative Terminal • Secured Uplink Active</p>
                  <p style="font-size: 8px; color: var(--accent); margin-top: 8px; font-weight: 800; opacity: 0.3;">[ CLICK FOR SYSTEM PULSE ]</p>
                </div>
              </div>
            `}catch(i){console.error("Admin Registry Fail:",i),t.innerHTML='<div style="padding: 60px; color: var(--error); text-align: center; font-weight: 850;">SYSTEM REGISTRY UPLINK FAILURE</div>'}}},async updateStaffRole(t,e){if(t===this.user.id)return this.toast("Security Protocol: Self-Demotion Blocked","warning");try{await b.from("staff").update({role:e}).eq("id",t),this.toast(`Registry Updated: ${t.toUpperCase()} is now ${e}`),document.getElementById("screen-admin-panel").classList.contains("active")?this.renderAdminPanel():this.renderProfile()}catch(i){console.error("Staff Update Error:",i),this.toast("Staff Registry Communication Fault","error")}},async downloadRegistryCSV(t="short"){try{this.toast(`Performing Fresh ${t.toUpperCase()} Database Sweep...`,"info");const{data:e,error:i}=await b.from("leads").select("*").order("timestamp",{ascending:!1});if(i||!e)throw new Error("Database Communication Failure");const r=t==="long"?e.filter(d=>d.type!=="short"&&d.type!=="short-reg"):e.filter(d=>d.type==="short"||d.type==="short-reg");if(r.length===0){this.toast(`No data found for ${t.toUpperCase()} segment.`,"warning");return}let o="\uFEFF";o+=["Timestamp","Name","Phone","Status","Priority","Location","Interest","Executive Note"].join(",")+`
`,r.forEach(d=>{const u=[`"${new Date(d.timestamp).toLocaleString()}"`,`"${(d.name||"N/A").replace(/"/g,'""')}"`,`"${(d.phone||"").replace(/"/g,'""')}"`,`"${(d.status||"").replace(/"/g,'""')}"`,`"${(d.priority||"").replace(/"/g,'""')}"`,`"${(d.location||"").replace(/"/g,'""')}"`,`"${(d.interest||"").replace(/"/g,'""')}"`,`"${(d.enquiry_note||"").replace(/"/g,'""')}"`];o+=u.join(",")+`
`});const n=new Blob([o],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(n),l=document.createElement("a");l.href=a,l.download=`VERA_${t.toUpperCase()}_FULL_REGISTRY_${new Date().toISOString().split("T")[0]}.csv`,l.click(),this.toast(`Extracted ${r.length} Entries Successfully`,"success")}catch(e){console.error("CSV Export Fault:",e),this.toast("Critical Extraction Fault","error")}},async exportUltimateAnalyticsPDF(){if(!["Admin","Supervisor"].includes(this.user.role))return;this.toast("Synchronizing 6,200+ Records for Mirror-UI Audit...","info");let t=[],e=0,i=999,r=!0;try{for(;r;){const{data:p,error:x}=await b.from("leads").select("*").range(e,i).order("timestamp",{ascending:!1});if(x)throw x;!p||p.length===0?r=!1:(t=t.concat(p),p.length<1e3?r=!1:(e+=1e3,i+=1e3))}}catch{this.toast("Sync Fault","error");return}const o=t.length,s=new Date,{jsPDF:n}=window.jspdf,a=new n("p","mm","a4"),l=t.filter(p=>p.status==="Purchased").length,d=o>0?l/o*100:0,u={};t.forEach(p=>{const x=(p.owner_name||p.added_by||"Vault").split("@")[0].toUpperCase();u[x]||(u[x]={n:x,t:0,c:0,h:0,w:0,f:0,p:{}}),u[x].t++,p.status==="Purchased"&&u[x].c++,p.priority==="Hot"&&u[x].h++,p.priority==="Warm"&&u[x].w++,p.status==="Follow-up"&&u[x].f++,p.interest&&(u[x].p[p.interest]=(u[x].p[p.interest]||0)+1)});const c=Object.values(u).sort((p,x)=>x.t-p.t);a.setFillColor(250,250,250),a.rect(0,0,210,297,"F"),a.setFontSize(32),a.setTextColor(0),a.setFont("helvetica","bold"),a.text("Executive Intelligence Hub",20,35),a.setFontSize(10),a.setTextColor(150),a.setFont("helvetica","normal"),a.text("Strategic demand distribution & personnel efficiency trajectories.",20,42);const h=(p,x,g,v,y,I,T,C=!1)=>{a.setFillColor(C?82:255,C?18:255,C?22:255),a.setDrawColor(230,230,230),a.roundedRect(p,x,g,v,8,8,"FD"),a.setFontSize(8),a.setTextColor(C?200:150),a.setFont("helvetica","bold"),a.text(y.toUpperCase(),p+10,x+15),a.setFontSize(28),a.setTextColor(C?255:0),a.text(I,p+10,x+30),a.setFontSize(9),a.setTextColor(C?200:100),a.setFont("helvetica","normal"),a.text(T,p+10,x+40)};h(20,55,80,50,"Registry Volume",o.toString(),"Active Operational Nodes"),h(110,55,80,50,"Verified Success",l.toString(),"Completed Transactions"),h(20,115,80,50,"Global Efficiency",`${d.toFixed(1)}%`,"Strategic Conversion Hub",!0),h(110,115,80,50,"Channel Depth","6","Active Entry Points"),a.addPage(),a.setFontSize(24),a.setTextColor(0),a.text("Personnel Tactics",20,35),a.autoTable({startY:45,head:[["Executive Officer","Total Volume","Hot Index","Yield (Closed)","Alpha Velocity"]],body:c.map(p=>[p.n,p.t,p.h,p.c,p.t>0?(p.c/p.t*100).toFixed(1)+"%":"0%"]),theme:"plain",headStyles:{textColor:[150,150,150],fontStyle:"bold",fontSize:8},styles:{fontSize:9,cellPadding:5}}),c.slice(0,15).forEach((p,x)=>{a.addPage(),a.setFillColor(250,250,250),a.rect(0,0,210,297,"F"),a.setFillColor(82,18,22),a.roundedRect(20,20,20,20,5,5,"F"),a.setFontSize(14),a.setTextColor(255),a.text(p.n.charAt(0),30,32,{align:"center"}),a.setFontSize(24),a.setTextColor(0),a.setFont("helvetica","bold"),a.text(p.n,45,30),a.setFillColor(82,18,22),a.roundedRect(45,34,15,4,1,1,"F"),a.setFontSize(6),a.setTextColor(255),a.text("MEMBER",52.5,37,{align:"center"}),a.setFontSize(8),a.setTextColor(150),a.setFont("helvetica","normal"),a.text(`ID: ${p.n.substring(0,5)}`,62,37);const g=(R,F,O,H,G,B=[0,0,0])=>{a.setFillColor(255),a.roundedRect(R,F,40,35,6,6,"FD"),a.setFontSize(7),a.setTextColor(150),a.setFont("helvetica","bold"),a.text(O.toUpperCase(),R+5,F+10),a.setFontSize(16),a.setTextColor(B[0],B[1],B[2]),a.text(H,R+5,F+22),a.setFontSize(7),a.setTextColor(150),a.setFont("helvetica","normal"),a.text(G,R+5,F+30)},v=p.t>0?(p.c/p.t*2.5+p.h/p.t*1.5+p.w/p.t*1).toFixed(1):"0.0",y=p.t>0?(p.c/p.t*100).toFixed(0)+"%":"0%",I=p.h+p.w;g(20,50,"Quality Score",v,"STRATEGIC INDEX"),g(65,50,"Conv. Precision",y,"YIELD RATIO"),g(110,50,"Registry Vol",p.t.toString(),"TOTAL CAPTURES"),g(155,50,"Engagement",I.toString(),"RICH DATA DEPTH",[52,199,89]);const T=(R,F,O,H,G,B)=>{a.setFontSize(7),a.setTextColor(150),a.text(H,R,F),a.setTextColor(B[0],B[1],B[2]),a.text(`${G}%`,R+O-5,F),a.setFillColor(240),a.roundedRect(R,F+2,O,2,1,1,"F"),a.setFillColor(B[0],B[1],B[2]),a.rect(R,F+2,G/100*O,2,"F")};a.setFillColor(255),a.roundedRect(20,100,80,100,8,8,"FD"),a.setFontSize(10),a.setTextColor(0),a.setFont("helvetica","bold"),a.text("Lead Intent Breakdown",30,115);const C=p.t>0?Math.round(p.h/p.t*100):0,E=p.t>0?Math.round(p.w/p.t*100):0,A=100-(C+E);T(30,130,60,"HOT PRIORITY",C,[52,199,89]),T(30,150,60,"WARM ENGAGEMENT",E,[255,149,0]),T(30,170,60,"COLD / GENERAL",A,[200,200,200]),a.setFillColor(255),a.roundedRect(110,100,80,100,8,8,"FD"),a.text("Product Focus Clusters",120,115),Object.entries(p.p).sort((R,F)=>F[1]-R[1]).slice(0,5).forEach((R,F)=>{const O=p.t>0?Math.round(R[1]/p.t*100):0;T(120,130+F*14,60,R[0].substring(0,18).toUpperCase(),O,[82,18,22])})});const f=a.internal.getNumberOfPages();for(let p=1;p<=f;p++)a.setPage(p),a.setFontSize(8),a.setTextColor(180),a.text(`VERA EXECUTIVE HUB • PAGE ${p} OF ${f}`,105,287,{align:"center"});a.save(`VERA_EXECUTIVE_DOSSIER_${s.toISOString().split("T")[0]}.pdf`),this.toast("Mirror-UI Dossier Dispatched","success")},async exportOwnerIntelPDF(){if(!["Admin","Supervisor"].includes(this.user.role))return;this.toast("Generating Strategic Owner Dossier...","info");const{data:t,error:e}=await b.from("leads").select("*");if(e||!t)return;const i=new Date,{jsPDF:r}=window.jspdf,o=new r("p","mm","a4");o.setFillColor(0,0,0),o.rect(0,0,210,60,"F"),o.setFontSize(36),o.setTextColor(255,255,255),o.setFont("helvetica","bold"),o.text("VERA",20,35),o.setFontSize(14),o.text("STRATEGIC OWNER DOSSIER",20,48),o.setFontSize(9),o.text(`REF: VERA-INTEL-${i.getFullYear()}-${Math.floor(Math.random()*9e3)+1e3}`,150,35),o.setFontSize(14),o.setTextColor(0),o.text("I. OPERATIONAL STATE OF THE UNION",20,80);const s=t.filter(c=>c.status==="Purchased").length,n=t.length>0?(s/t.length*100).toFixed(2):0;o.autoTable({startY:85,body:[["Global Registry Volume",t.length],["Sovereign Conversion Rate",`${n}%`],["Total Successful Closures",s],["Pipeline Value (Follow-ups)",t.filter(c=>c.status==="Follow-up").length]],theme:"striped",styles:{fontSize:11,cellPadding:5}}),o.addPage(),o.setFillColor(30,30,30),o.rect(0,0,210,20,"F"),o.setFontSize(10),o.setTextColor(255,255,255),o.text("II. PIPELINE DISTRIBUTION ANALYTICS",20,13);const a=t.reduce((c,h)=>(c[h.status]=(c[h.status]||0)+1,c),{}),l=Object.entries(a).map(([c,h])=>[c||"Uncategorized",h]);o.setFontSize(12),o.setTextColor(0),o.text("STAGES OF CONVERSION",20,35),o.autoTable({startY:40,head:[["Funnel Stage","Lead Volume"]],body:l,theme:"grid",headStyles:{fillColor:[0,0,0]}}),o.addPage(),o.setFillColor(30,30,30),o.rect(0,0,210,20,"F"),o.setFontSize(10),o.setTextColor(255,255,255),o.text("III. PERSONNEL COMMAND HIERARCHY",20,13);const d={};t.forEach(c=>{const h=c.owner_name||c.added_by||"Vault";d[h]||(d[h]={name:h,total:0,closed:0,hot:0}),d[h].total++,c.status==="Purchased"&&d[h].closed++,c.priority==="Hot"&&d[h].hot++});const u=Object.values(d).sort((c,h)=>h.total-c.total);o.autoTable({startY:30,head:[["Rank","Officer","Total Volume","Hot Leads","Closed Deals"]],body:u.map((c,h)=>[`#${h+1}`,c.name.toUpperCase(),c.total,c.hot,c.closed]),theme:"striped",headStyles:{fillColor:[0,0,0]}}),u.slice(0,15).forEach((c,h)=>{o.addPage(),o.setFillColor(82,18,22),o.rect(0,0,210,40,"F"),o.setFontSize(22),o.setTextColor(255,255,255),o.text(c.name.toUpperCase(),20,25),o.setFontSize(10),o.text(`EXECUTIVE PERFORMANCE DOSSIER • RANK #${h+1}`,20,33),o.setFontSize(14),o.setTextColor(0),o.text("INDIVIDUAL KPI SCORECARD",20,55);const f=c.total>0?(c.closed/c.total*100).toFixed(2):0;o.autoTable({startY:60,body:[["Total Leads Managed",c.total],["Individual Conversion Rate",`${f}%`],["High-Intent (Hot) Leads",c.hot],["Finalized Closures",c.closed],["Active Personnel Status","VERIFIED"]],theme:"grid",styles:{fontSize:11,cellPadding:8}});const p=o.lastAutoTable.finalY+20;o.setFontSize(12),o.text("TACTICAL ASSESSMENT",20,p),o.setFontSize(10),o.setTextColor(100);const x=`Officer ${c.name} is currently managing ${c.total} leads. Their performance shows a conversion efficiency of ${f}%. They have successfully secured ${c.closed} purchased missions and maintain ${c.hot} hot leads in their immediate pipeline.`;o.text(o.splitTextToSize(x,170),20,p+10)}),o.save(`VERA_OWNER_INTEL_${i.toISOString().split("T")[0]}.pdf`),this.toast("Owner Intel Dossier Complete","success")},async exportUltimateReport(t){if(!["Admin","Supervisor"].includes(this.user.role))return;this.toast(`Initializing Comprehensive ${t.toUpperCase()} Audit...`,"info");const{data:e,error:i}=await b.from("leads").select("*").order("timestamp",{ascending:!1});if(i||!e){this.toast("Database Synchronization Fault","error");return}const r=new Date,o=e.length,s=e.filter(x=>x.type!=="short"&&x.type!=="short-reg"),n=e.filter(x=>x.type==="short"||x.type==="short-reg"),a=e.filter(x=>x.status==="Follow-up").length,l=e.filter(x=>x.status==="Purchased").length,d=e.filter(x=>x.priority==="Hot").length,u=o>0?(l/o*100).toFixed(1):"0.0",c=[["Operational KPI","Audit Value"],["Total Database Entries",o],["Full-Dossier (Long) Registry",s.length],["Rapid-Capture (Short) Registry",n.length],["Active Hot Intent Leads",d],["Total Pipeline Follow-ups",a],["Aggregate Conversion Rate",`${u}%`]],h={};e.forEach(x=>{const g=x.owner_name||x.added_by||"Vault";h[g]||(h[g]={name:g,total:0,hot:0,closed:0,fup:0}),h[g].total++,x.priority==="Hot"&&h[g].hot++,x.status==="Purchased"&&h[g].closed++,x.status==="Follow-up"&&h[g].fup++});const f=Object.values(h).sort((x,g)=>g.total-x.total),p=[["Rank","Executive Officer","Total Volume","Hot Leads","Closed","Follow-ups"],...f.map((x,g)=>[`#${g+1}`,x.name.split("@")[0].toUpperCase(),x.total,x.hot,x.closed,x.fup])];if(t==="pdf"){const{jsPDF:x}=window.jspdf,g=new x("p","mm","a4");g.setFillColor(82,18,22),g.rect(0,0,210,50,"F"),g.setFontSize(32),g.setTextColor(255,255,255),g.setFont("helvetica","bold"),g.text("VERA",20,30),g.setFontSize(12),g.text("TOTAL OPERATIONAL AUDIT & INTEL DOSSIER",20,40),g.setFontSize(8),g.text(`GENERATED: ${r.toLocaleString()} | SECURITY CLEARANCE: ADMIN`,130,30),g.setFontSize(16),g.setTextColor(82,18,22),g.text("I. STRATEGIC VITALITY KPIs",20,65),g.autoTable({startY:70,head:[c[0]],body:c.slice(1),theme:"striped",headStyles:{fillColor:[82,18,22],fontSize:11},bodyStyles:{fontSize:10,fontStyle:"bold"},margin:{left:20,right:20}}),g.text("II. PERSONNEL PERFORMANCE HIERARCHY",20,g.lastAutoTable.finalY+20),g.autoTable({startY:g.lastAutoTable.finalY+25,head:[p[0]],body:p.slice(1),theme:"grid",headStyles:{fillColor:[82,18,22],fontSize:9},bodyStyles:{fontSize:9},margin:{left:20,right:20}}),g.addPage(),g.setFillColor(82,18,22),g.rect(0,0,210,20,"F"),g.setFontSize(10),g.setTextColor(255,255,255),g.text("III. FULL TACTICAL REGISTRY DATA (LONG FORM)",20,13);const v=s.map(y=>[new Date(y.timestamp).toLocaleDateString(),y.name||"N/A",y.phone||"",y.status||"",y.priority||"",y.location||""]);g.autoTable({startY:30,head:[["Date","Name","Phone","Status","Priority","Location"]],body:v,theme:"striped",headStyles:{fillColor:[82,18,22],fontSize:8},bodyStyles:{fontSize:7},margin:{left:10,right:10},didDrawPage:function(y){g.setFontSize(8),g.setTextColor(150),g.text(`VERA Operational Dossier - Page ${g.internal.getNumberOfPages()}`,85,285)}}),g.save(`VERA_TOTAL_AUDIT_${r.toISOString().split("T")[0]}.pdf`)}else{const x=XLSX.utils.book_new(),g=XLSX.utils.aoa_to_sheet([["VERA TOTAL AUDIT"],[`Generated: ${r.toLocaleString()}`],[],...c]);XLSX.utils.book_append_sheet(x,g,"Audit_Dashboard");const v=XLSX.utils.aoa_to_sheet(p);XLSX.utils.book_append_sheet(x,v,"Member_Performance");const y=s.map(E=>({Timestamp:new Date(E.timestamp).toLocaleString(),Name:E.name||"N/A",Phone:E.phone||"",Location:E.location||"",Status:E.status||"New",Priority:E.priority||"Cold",Interest:E.interest||"",Owner:E.owner_name||"","Enquiry Note":E.enquiry_note||""})),I=XLSX.utils.json_to_sheet(y);XLSX.utils.book_append_sheet(x,I,"Long_Registry_Full");const T=n.map(E=>({Timestamp:new Date(E.timestamp).toLocaleString(),Name:E.name||"N/A",Phone:E.phone||"",Status:E.status||"New","Added By":E.added_by||""})),C=XLSX.utils.json_to_sheet(T);XLSX.utils.book_append_sheet(x,C,"Short_Registry_Full"),XLSX.writeFile(x,`VERA_EXHAUSTIVE_DATABASE_${r.toISOString().split("T")[0]}.xlsx`)}this.toast("Audit Export Complete","success")},async editNeuralHub(){if(!this.checkAccess())return;let t="",e="";try{const{data:r,error:o}=await b.from("app_config").select("payload").eq("id","ai-config").single();r&&(t=r.payload.instructions||"",e=r.payload.trained_brain||"")}catch{}const i=`
            <div style="padding: 32px;">
              <h2 style="font-size: 24px; font-weight: 850; letter-spacing: -1.5px; color: var(--text-primary); margin-bottom: 8px;">Neural Training Hub</h2>
              <p style="font-size: 13px; color: var(--text-muted); font-weight: 600; margin-bottom: 32px;">Train VERA on your business protocols and knowledge base.</p>
              
              <div style="display: flex; flex-direction: column; gap: 24px;">
                <!-- Knowledge Preview -->
                ${e?`
                <div style="padding: 16px; background: rgba(0, 122, 255, 0.05); border-radius: 16px; border: 1px solid rgba(0, 122, 255, 0.1);">
                  <div style="font-size: 9px; font-weight: 850; color: #007AFF; text-transform: uppercase; margin-bottom: 8px;">Current Brain Awareness (Last Training)</div>
                  <div style="font-size: 11px; color: #007AFF; font-weight: 500; font-style: italic; max-height: 80px; overflow-y: auto; line-height: 1.4;">
                    ${e.substring(0,300)}...
                  </div>
                </div>
                `:""}

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
                  <textarea id="neural-directives" class="input" style="height: 120px; border-radius: 16px; padding: 16px; font-size: 13px; font-weight: 600;" placeholder="Example: Always mention our 10% discount on Antique jewelry for walk-in customers.">${t}</textarea>
                </div>

                <button id="neural-sync-btn" onclick="app.saveNeuralHub()" class="btn btn-primary" style="width: 100%; height: 56px; border-radius: 18px; font-weight: 850; box-shadow: 0 8px 24px rgba(82, 18, 22, 0.2);">
                  SYNCHRONIZE NEURAL CORE
                </button>
              </div>
            </div>
          `;this.renderModal(i)},async handleNeuralFile(t){const e=t.files[0];if(!e)return;const i=document.getElementById("neural-status"),r=document.getElementById("neural-raw-text"),o=document.getElementById("neural-extraction-preview"),s=document.getElementById("neural-sync-btn");i.textContent=`EXTRACTING: ${e.name.toUpperCase()}...`,i.style.color="var(--accent)";try{const n=await e.arrayBuffer(),a=await pdfjsLib.getDocument({data:n}).promise;let l="";for(let u=1;u<=a.numPages;u++){const h=await(await a.getPage(u)).getTextContent();l+=h.items.map(f=>f.str).join(" ")+`
`}if(!l.trim())throw new Error("No text found in PDF");o.style.display="block",r.textContent=l.substring(0,1e3)+"...",i.textContent="DISTILLING INTELLIGENCE...";const d=`Distill this business document into a high-fidelity system persona component. 
            RULES TO EXTRACT:
            - Pricing & Rates
            - Customer interaction protocols
            - Native Indian language specific idioms if present
            
            RAW DATA FROM DOCUMENT:
            ${l.slice(0,15e3)}`;this._tempTrainedBrain=await this.callGrok(d,!0),i.textContent="BRAIN READY FOR SYNC ✅",i.style.color="var(--success)",s.style.animation="pulse-sync 1.5s infinite",this.toast("Intelligence Distilled. Click SYNC to finalize. 🔐","success")}catch(n){console.error("Neural Error:",n),i.textContent="NEURAL PROCESSING FAULT",i.style.color="var(--error)",this.toast("Training Interrupted: "+n.message,"error")}},async saveNeuralHub(){const e={instructions:document.getElementById("neural-directives").value,updatedBy:this.user.name,time:Date.now()};this._tempTrainedBrain&&(e.trained_brain=this._tempTrainedBrain);try{await b.from("app_config").upsert([{id:"ai-config",payload:e,updated_at:new Date().toISOString()}]),this.toast("Neural Core Synchronized 🔐","success"),this.closeModal(),this._tempTrainedBrain=null}catch{this.toast("Registry Frequency Drift","error")}},async callGrok(t,e=!1){var a,l,d;const i="https://script.google.com/macros/s/AKfycbxNS6sZVdBI52Xncx9iL5XJT2c6Vgrbes2VPs_MPfvegDVG-WIjeIfJJ41WdrCmxgSu/exec";let r="",o="";try{const{data:u}=await b.from("app_config").select("payload").eq("id","ai-config").single();u&&(r=(u.payload.trained_brain||"").substring(0,8e3),o=(u.payload.instructions||"").substring(0,2e3))}catch{console.warn("Neural sync deferred")}const s=Object.entries(this.goldRates||{}).filter(([u,c])=>typeof c=="number"&&c>0).map(([u,c])=>`- ${u}: ₹${this.fmt(c)}/g`).join(`
`),n=e?"You are a professional knowledge distiller.":`
 IDENTITY: VERA "Executive Strategic Assistant".
 TAGLINE: "Gold You Can Trust. People You Can Believe In."

 MULTILINGUAL CAPABILITY: 
 - VERA is natively fluent in Hindi, Marathi, Gujarati, and Hinglish. 
 - Respond in the language used by the user. Switch fluently as needed.

 LIVE TERMINAL RATES (SYNCED):
 ${s}

 PRICING PROTOCOLS:
 - Formula: [Weight × Live Gold Rate] + [MC%] + [Other Charges].
 - Making Charges (MC): Classic: 12%, Antique: 14%, Premium: 16%, Italian: 20%.

 TRAINED BUSINESS KNOWLEDGE:
 ${r}

 ADMIN DIRECTIVES:
 ${o}

 INSTRUCTION: 
 - Act as an elite executive assistant. 
 - Use the LIVE TERMINAL RATES for calculations.
 - Keep responses concise and professional.
 `;try{let u=[];e?u=[{role:"system",content:n},{role:"user",content:t}]:u=[{role:"system",content:n},...Array.isArray(t)?t:[{role:"user",content:t}]];const c={action:"ai-chat",key:this._GROQ_KEY,messages:u},h=await fetch(i,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(c)});if(!h.ok)throw new Error("Bridge communication error");const f=await h.json();return f.error==="GROQ_API_ERROR"?f.status===429?`🛑 **Rate Limit Reached (Tokens Per Minute)**. 

Groq's free tier allows 6,000 tokens per minute. Since your "Business Brain" is detailed, we have hit the limit. 

**Solution:** Please wait 60 seconds before your next query.`:f.status===401?"⚠️ **AI Authentication Fault (401)**: Your Groq API Key is either invalid or has been revoked. Provide a fresh key in index.html line 4922.":`⚠️ **AI API Error (${f.status})**: 
${f.message.substring(0,150)}`:f.error==="BRIDGE_INTERNAL_ERROR"?`⚠️ **Google Bridge Fault**: 
${f.message}`:((d=(l=(a=f.choices)==null?void 0:a[0])==null?void 0:l.message)==null?void 0:d.content)||"Neural Stream Interrupted."}catch(u){return console.error("AL_BRIDGE_ERROR:",u),`Executive Bridge Fault: Could not reach AI. 

**Details:** ${u.message} 

1. Ensure your Code.gs is updated and **Deployed as New Deployment**. 
2. Verify your GROQ_API_KEY is active. 
3. Check your internet connection.`}},async executeStrategicMigration(){if(confirm("STRATEGIC MIGRATION: This will move all legacy Firebase records to Supabase and LOCK the legacy registry. Proceed?")){this.toast("Initiating Atomic Data Extraction...","info");try{console.log("MIGRATION: Fetching legacy staff..."),this.toast("Transferring Staff Accounts...","info");const e=(await Z(tt(W,"staff"))).docs.map(a=>{const l=a.data();return{id:a.id,name:l.name||"Legacy Staff",role:l.role||"Member",email:l.email||""}});if(console.log(`MIGRATION: Found ${e.length} staff records. Upserting...`),e.length>0){const{error:a}=await b.from("staff").upsert(e);if(a)throw new Error(`Staff Sync Fault: ${a.message}`)}console.log("MIGRATION: Fetching legacy leads..."),this.toast("Synchronizing Lead Registry...","info");const r=(await Z(tt(W,"leads"))).docs.map(a=>{const l=a.data();let d=l.timestamp;try{d&&d.toDate?d=d.toDate().toISOString():typeof d=="number"?d=new Date(d).toISOString():d=new Date().toISOString()}catch{d=new Date().toISOString()}return{id:a.id,name:l.name||"Legacy Entry",phone:l.phone||"000",location:l.location||"Not Specified",interest:l.interest||"",source:l.source||"Direct Channel",weight:l.weight||"0",followup_date:l.followupDate||l.followup_date||null,checklist:l.checklist||[],priority:l.priority||"Warm",status:l.status||"New Inquiry",owner:l.owner||null,owner_name:l.ownerName||l.owner_name||null,assigned_to:l.assignedTo||l.assigned_to||null,history:(()=>{const u=l.history||[],c=l.notes||l.note||l.shortNotes,h=l.followupNote||l.followup_note;return c&&u.push({time:l.timestamp||Date.now(),action:`Legacy Enquiry Note: ${c}`}),h&&u.push({time:l.timestamp||Date.now(),action:`Legacy Executive Remark: ${h}`}),u})(),type:l.type||"regular",timestamp:d}});if(console.log(`MIGRATION: Found ${r.length} lead records. Batched Upsert...`),r.length>0)for(let l=0;l<r.length;l+=50){const d=r.slice(l,l+50),{error:u}=await b.from("leads").upsert(d);if(u)throw new Error(`Lead Sync Chunk Fault: ${u.message}`)}console.log("MIGRATION: Migrating Meta Config..."),this.toast("Calibrating Pricing Norms...","info");const o=await at(st(W,"meta","goldRates"));o.exists()&&await b.from("app_config").upsert([{id:"goldRates",payload:o.data()}]);const s=await at(st(W,"meta","announcement"));s.exists()&&await b.from("app_config").upsert([{id:"announcement",payload:s.data()}]);const{error:n}=await b.from("app_config").upsert([{id:"migration_complete",payload:{active:!0,time:new Date().toISOString(),exec:this.user.name}}]);if(n)throw new Error(`Finalization Fault: ${n.message}`);this.legacyFrozen=!0,this.toast("MISSION COMPLETE: Sector Data Fully Synchronized 🛰️","success"),setTimeout(()=>location.reload(),2e3)}catch(t){console.error("Migration Critical Fault:",t),this.toast(`Migration Failed: ${t.message}`,"error")}}},toast(t,e="info"){let i=document.querySelector(".toast-container");i||(i=document.createElement("div"),i.className="toast-container",document.body.appendChild(i));const r=document.createElement("div");r.className=`toast toast-${e}`;let o="🔔";e==="error"&&(o="❌"),e==="success"&&(o="✅"),e==="info"&&(o="ℹ️"),r.innerHTML=`<span>${o}</span> <span>${t}</span>`,i.appendChild(r),setTimeout(()=>{r.style.opacity="0",r.style.transform="translateX(50px)",setTimeout(()=>r.remove(),500)},4e3)},getRelativeTime(t){if(!t)return"";const i=Date.now()-t,r=Math.floor(i/6e4);if(r<1)return"Just now";if(r<60)return`${r}m ago`;const o=Math.floor(r/60);return o<24?`${o}h ago`:new Date(t).toLocaleDateString([],{month:"short",day:"numeric"})},filterChatMembers(t){this.chatSearchQuery=t.toLowerCase(),this.renderChatMembers()},async renderChatMembers(){const t=document.getElementById("chat-contact-list");if(t)try{const{data:e,error:i}=await b.from("staff").select("*");if(i)throw i;let r=[];const{data:o,error:s}=await b.from("messages").select("*").order("timestamp",{ascending:!1});!s&&o?r=o:console.warn("Vera Comm-System: Message history unavailable or table missing.",s);const n={};r.forEach(l=>{if(l.chat_id.includes(this.user.id)){const u=l.chat_id.split("_").find(c=>c!==this.user.id)||this.user.id;n[u]||(n[u]={text:l.content,time:new Date(l.timestamp).getTime()})}});const a=e.filter(l=>l.id!==this.user.id).filter(l=>!this.chatSearchQuery||l.name.toLowerCase().includes(this.chatSearchQuery));t.innerHTML=a.map(l=>{const d=n[l.id],u=this.activeChat===l.id;let c="var(--accent-gradient)";return l.role==="Admin"?c="linear-gradient(135deg, #FF3B30, #FF9500)":l.role==="Supervisor"&&(c="linear-gradient(135deg, #5856D6, #007AFF)"),`
                <div class="contact-item ${u?"active":""}" onclick="app.openChat('${l.id}', '${l.name}')" style="display: flex; gap: 14px; padding: 16px 20px; cursor: pointer; transition: all 0.3s ease; border-left: 3px solid ${u?"var(--accent)":"transparent"}; background: ${u?"rgba(82,18,22,0.03)":"transparent"};">
                  <div class="staff-avatar" style="background: ${c};">
                    ${(l.name||"U").charAt(0).toUpperCase()}
                    <div class="status-dot"></div>
                  </div>
                  <div class="contact-info" style="flex: 1; min-width: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                      <div style="font-weight: 950; font-size: 15px; color: var(--text-primary); text-transform: capitalize; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; letter-spacing: -0.3px;">${(l.name||"").toLowerCase()}</div>
                      <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); opacity: 0.7;">${d?this.getRelativeTime(d.time):""}</div>
                    </div>
                    <div style="font-size: 11px; font-weight: 750; color: ${d?"var(--text-muted)":"var(--accent)"}; text-transform: ${d?"none":"uppercase"}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 4px; opacity: 0.8; letter-spacing: ${d?"0":"0.5px"};">
                      ${d?d.text:l.role}
                    </div>
                  </div>
                </div>`}).join("")||'<div style="padding: 60px; text-align: center; opacity: 0.4; font-size: 13px; font-weight: 850; letter-spacing: 1px;">NO EXECUTIVE CONTACTS DETECTED</div>'}catch(e){console.error("Vera Comm-System Fault:",e),t.innerHTML='<div style="padding: 20px; text-align: center; color: var(--error); font-weight: 850; letter-spacing: 0.5px;">Staff Registry Interrupted<br><span style="font-size: 10px; opacity: 0.7;">Check authentication / database schema</span></div>'}},async openChat(t,e){this.chatUnsubscribe&&this.chatUnsubscribe(),this.activeChat=t,window.innerWidth<=850&&document.querySelector(".chat-container").classList.add("mobile-active"),this.renderChatMembers(),document.getElementById("chat-empty-state").style.display="none",document.getElementById("chat-active-window").style.display="flex",document.getElementById("active-contact-name").textContent=e,document.getElementById("active-contact-avatar").innerHTML=`${e.charAt(0)}<div class="status-dot"></div>`;const i=[this.user.id,t].sort().join("_"),r=async()=>{const{data:s,error:n}=await b.from("messages").select("*").eq("chat_id",i).order("timestamp",{ascending:!0}),a=document.getElementById("chat-stream");if(n||!s||s.length===0){n&&console.warn("Vera Comm-System: Message history unavailable.",n),a.innerHTML='<div style="padding: 40px; text-align: center; color: var(--text-muted); opacity: 0.5; font-size: 12px; font-weight: 850; letter-spacing: 1px;">SECURE CHANNEL ESTABLISHED<br>NO TRANSMISSIONS DETECTED</div>';return}a.innerHTML=s.map(l=>{const d=l.sender_id===this.user.id;return`
                <div class="msg-bubble ${d?"msg-sent":"msg-received"}">
                  ${l.content}
                  <div class="msg-timestamp" style="text-align: ${d?"right":"left"}; color: ${d?"rgba(255,255,255,0.7)":"var(--text-muted)"}">
                    ${new Date(l.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}
                  </div>
                </div>`}).join(""),a.scrollTop=a.scrollHeight};r();const o=b.channel(`chat-${i}`).on("postgres_changes",{event:"INSERT",table:"messages",filter:`chat_id=eq.${i}`},s=>{r()}).subscribe();this.chatUnsubscribe=()=>b.removeChannel(o)},async sendChatMessage(){const t=document.getElementById("chat-input"),e=t.value.trim();if(!e||!this.activeChat)return;const r={chat_id:[this.user.id,this.activeChat].sort().join("_"),sender_id:this.user.id,content:e,timestamp:new Date().toISOString()};t.value="";try{const{error:o}=await b.from("messages").insert([r]);if(o)throw o}catch(o){console.error("Vera Comm-System: Transmission Failure",o),this.toast("Message Transmission Failed","error")}},async renderMessages(){const{data:t,error:e}=await b.from("staff").select("*");if(e){console.error("Staff Registry Error:",e);return}document.getElementById("admin-panel-container"),this.renderChatMembers()},async showAssignModal(t){const e=this.leads.find(s=>String(s.id)===String(t));if(!e)return;const r=(await Z(tt(W,"staff"))).docs.map(s=>s.data()),o=`
 <div style="text-align: center; margin-bottom: 32px;">
 <h2 style="font-size: 24px; font-weight: 800; letter-spacing: -1px;">Delegate Lead</h2>
 <p style="font-size: 13px; color: var(--text-muted); font-weight: 700; margin-top: 4px;">Select an executive to handle ${e.name}</p>
 </div>
 <div style="display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto; padding: 4px;">
 ${r.map(s=>`
 <div class="card elevated" onclick="app.assignLead('${t}', '${s.id}', '${s.name}')" style="padding: 18px 24px; display: flex; align-items: center; gap: 16px; cursor: pointer; border-radius: 20px; transition: all 0.3s ease; border: 1px solid rgba(0,0,0,0.03);">
 <div class="staff-avatar">${s.name.charAt(0)}</div>
 <div style="flex: 1;">
 <div style="font-weight: 800; font-size: 15px; color: var(--text-primary);">${s.name} ${s.id===this.user.id?"(You)":""}</div>
 <div style="font-size: 11px; font-weight: 700; color: var(--accent); text-transform: uppercase;">${s.role}</div>
 </div>
 <svg width="20" height="20" fill="none" stroke="var(--accent)" stroke-width="3" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
 </div>`).join("")}
 </div>`;this.renderModal(o)},formatMemberName(t){if(!t)return"Anonymous Exec";let e=t.split("@")[0].split(".")[0].split("_")[0];return e.charAt(0).toUpperCase()+e.slice(1).toLowerCase()},async viewMemberStats(t){this.toast("Decrypting Strategic Dossier...","info");const e=this.allStaff?this.allStaff.find(z=>z.id===t):null;let i="",r="Executive";if(e)i=e.email,r=e.name;else{const{data:z}=await b.from("staff").select("*").eq("id",t).single();z&&(i=z.email,r=z.name)}const o=this.leads.filter(z=>z.owner===t||z.assigned_to===t||z.added_by===i),s=o.length,n=o.filter(z=>z.priority==="Hot").length,a=o.filter(z=>z.priority==="Warm").length,l=o.filter(z=>z.priority==="Cold").length,d=o.filter(z=>z.status==="Purchased").length,u=o.filter(z=>z.notes||z.enquiry_note||z.executive_comment).length,c=o.filter(z=>z.checklist&&z.checklist.length>0).length,h=s+n*2+u*1+c*1,f=s>0?(h/s).toFixed(1):"0.0",p=s>0?Math.round(d/s*100):0,x=this.getFrequencyMap(o,"interest",6),g=x.length>0?x[0].name.split("|")[0].trim():"Omni-Product",v=s>0?(n/s*100).toFixed(0):0,y=s>0?(a/s*100).toFixed(0):0,I=s>0?(l/s*100).toFixed(0):0,T=document.createElement("div");T.id="dossier-overlay",T.style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(30px); z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 0; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);";const C=(r||"E").charAt(0).toUpperCase(),E=e?e.role:"Member";let A="var(--accent)";E==="Admin"?A="#FF3B30":E==="Supervisor"&&(A="#5856D6"),T.innerHTML=`
            <div class="glass-card" style="width: 95%; max-width: 1000px; padding: 56px; border-radius: 56px; background: rgba(255,255,255,0.95); border: 1.5px solid rgba(255,255,255,0.6); box-shadow: 0 60px 120px rgba(0,0,0,0.25); transform: translateY(40px) scale(0.95); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); max-height: 92vh; overflow-y: auto;">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 48px;">
                <div style="display: flex; gap: 32px; align-items: center;">
                  <div style="width: 110px; height: 110px; border-radius: 32px; background: ${A}; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 44px; font-weight: 950; box-shadow: 0 20px 45px ${A}55;">${C}</div>
                  <div>
                    <h2 style="font-size: 38px; font-weight: 950; letter-spacing: -2px; margin: 0; color: var(--text-primary);">${r.toUpperCase()}</h2>
                    <div style="display: flex; gap: 10px; margin-top: 12px;">
                      <span style="font-size: 11px; font-weight: 950; padding: 7px 14px; background: ${A}; color: #fff; border-radius: 12px; text-transform: uppercase; letter-spacing: 1px;">${E}</span>
                      <span style="font-size: 11px; font-weight: 950; padding: 7px 14px; background: rgba(0,0,0,0.05); color: var(--text-muted); border-radius: 12px; text-transform: uppercase;">ID: ${t.slice(0,8)}</span>
                    </div>
                  </div>
                </div>
                <button onclick="document.getElementById('dossier-overlay').style.opacity='0'; setTimeout(()=>document.getElementById('dossier-overlay').remove(), 500)" style="width: 56px; height: 56px; border-radius: 50%; background: rgba(0,0,0,0.05); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 28px; color: var(--text-muted); transition: all 0.3s ease;">&times;</button>
              </div>

              <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin-bottom: 48px;">
                <div style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-sm); text-align: center;">
                   <div style="font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Quality score</div>
                   <div style="font-size: 36px; font-weight: 950; color: ${f>2.5?"var(--success)":"var(--text-primary)"}; margin-top: 8px; letter-spacing: -1px;">${f}</div>
                   <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; font-weight: 850;">STRATEGIC INDEX</div>
                </div>
                <div style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-sm); text-align: center;">
                   <div style="font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Conv. Precision</div>
                   <div style="font-size: 36px; font-weight: 950; color: var(--accent); margin-top: 8px; letter-spacing: -1px;">${p}%</div>
                   <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; font-weight: 850;">YIELD RATIO</div>
                </div>
                <div style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-sm); text-align: center;">
                   <div style="font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Registry Vol</div>
                   <div style="font-size: 36px; font-weight: 950; color: var(--text-primary); margin-top: 8px; letter-spacing: -1px;">${s}</div>
                   <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; font-weight: 850;">TOTAL CAPTURES</div>
                </div>
                <div style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-sm); text-align: center;">
                    <div style="font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Engagement</div>
                    <div style="font-size: 36px; font-weight: 950; color: var(--success); margin-top: 8px; letter-spacing: -1px;">${u+c}</div>
                    <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px; font-weight: 850;">RICH DATA DEPTH</div>
                 </div>
                 <div style="padding: 24px; background: #fff; border-radius: 28px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: var(--shadow-sm); text-align: center;">
                    <div style="font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px;">Showroom Arrival</div>
                    <div style="font-size: 36px; font-weight: 950; color: #5856D6; margin-top: 8px; letter-spacing: -1px;">${o.filter(R=>{const F=String(R.phone||"").replace(/\D/g,"").slice(-10);return(this.qmsRegistry||[]).some(O=>{const H=String(O.phone||O.mobile||O.contact||"").replace(/\D/g,"").slice(-10);return H&&H===F})}).length}</div>
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
                          <span style="font-size: 11px; font-weight: 950; color: var(--success);">${v}%</span>
                        </div>
                        <div style="height: 10px; background: rgba(0,0,0,0.04); border-radius: 5px; overflow: hidden;">
                           <div style="width: ${v}%; height: 100%; background: var(--success); border-radius: 5px;"></div>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                          <span style="font-size: 11px; font-weight: 950; color: var(--warning);">WARM ENGAGEMENT</span>
                          <span style="font-size: 11px; font-weight: 950; color: var(--warning);">${y}%</span>
                        </div>
                        <div style="height: 10px; background: rgba(0,0,0,0.04); border-radius: 5px; overflow: hidden;">
                           <div style="width: ${y}%; height: 100%; background: var(--warning); border-radius: 5px;"></div>
                        </div>
                      </div>
                      <div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                          <span style="font-size: 11px; font-weight: 950; color: var(--text-muted);">COLD / GENERAL</span>
                          <span style="font-size: 11px; font-weight: 950; color: var(--text-muted);">${I}%</span>
                        </div>
                        <div style="height: 10px; background: rgba(0,0,0,0.04); border-radius: 5px; overflow: hidden;">
                           <div style="width: ${I}%; height: 100%; background: var(--text-muted); opacity: 0.3; border-radius: 5px;"></div>
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
                      ${x.map(z=>{const R=s>0?(z.count/s*100).toFixed(0):0;return`
                          <div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                              <span style="font-size: 11px; font-weight: 900; color: var(--text-primary); text-transform: uppercase;">${z.name.split("|")[0]}</span>
                              <span style="font-size: 11px; font-weight: 950; color: var(--accent);">${R}%</span>
                            </div>
                            <div style="height: 6px; background: rgba(0,0,0,0.05); border-radius: 3px; overflow: hidden;">
                               <div style="width: ${R}%; height: 100%; background: var(--accent); border-radius: 3px;"></div>
                            </div>
                          </div>
                        `}).join("")}
                      ${x.length===0?'<div style="opacity: 0.5; font-size: 12px; font-weight: 700; text-align: center; padding: 20px;">No Product Clusters Identified</div>':""}
                   </div>
                 </div>
              </div>

              <div style="background: var(--accent-gradient); padding: 48px; border-radius: 48px; color: #fff; box-shadow: 0 30px 60px rgba(82,18,22,0.15);">
                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                   <div>
                     <div style="font-size: 10px; font-weight: 950; opacity: 0.8; text-transform: uppercase; letter-spacing: 2px;">Executive Strategy Summation</div>
                     <div style="font-size: 28px; font-weight: 950; margin-top: 8px;">${g} Specialist</div>
                   </div>
                   <div style="padding: 12px 24px; background: rgba(255,255,255,0.1); border-radius: 16px; font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: 1px;">PRECISION: ${f}/5.0</div>
                 </div>
                 
                 <div style="font-size: 15px; line-height: 1.8; opacity: 0.95; font-weight: 700; letter-spacing: -0.2px;">
                    Personnel <b>${r}</b> demonstrates a ${f>2.5?"dominant":"steady"} acquisition profile within the <b>${g}</b> category. With an intentionality index of <b>${f}</b>, this executive prioritizes ${u>s/2?"rich descriptive intelligence":"high-velocity data capture"}. Historical trajectories indicate a conversion precision of ${p}% across the active operational registry.
                 </div>
              </div>
            </div>
          `,document.body.appendChild(T),T.offsetHeight,T.style.opacity="1",T.children[0].style.transform="translateY(0) scale(1)"},async renderAnalytics(){const t=document.getElementById("stats-container");if(t){t.innerHTML=`
            <div style="padding: 120px 40px; text-align: center;">
              <div class="spinner" style="margin: 0 auto 24px;"></div>
              <div style="opacity: 0.5; font-weight: 700; font-size: 14px; letter-spacing: 1px;">AGGREGATING STRATEGIC DATA...</div>
            </div>
          `;try{const{data:e,error:i}=await b.from("staff").select("*");if(i)throw i;const r=this.leads,o=e.map(c=>{const h=r.filter(A=>A.owner===c.id||A.assigned_to===c.id||A.added_by===c.email),f=h.length,p=h.filter(A=>A.priority==="Hot").length,x=h.filter(A=>A.status==="Purchased").length,g=h.filter(A=>A.notes||A.enquiry_note).length,v=h.filter(A=>A.checklist&&A.checklist.length>0).length,y=f+p*2+g*1+v*1,I=f>0?(y/f).toFixed(1):"0.0",T=f>0?(x/f*100).toFixed(1):"0.0",C=this.getFrequencyMap(h,"interest",1),E=C.length>0?C[0].name.split("|")[0].trim():"Omni-Product";return{...c,total:f,hot:p,qualityScore:I,topInterest:E,ratio:T,displayName:(c.name||c.id).toUpperCase()}}).sort((c,h)=>h.total-c.total),s=this.getFrequencyMap(r,"source",6),n=r.length,a=r.filter(c=>c.status==="Purchased").length,l=n>0?(a/n*100).toFixed(1):"0.0",d=this.getFrequencyMap(r,"location",12),u={Admin:o.filter(c=>c.role==="Admin"),Supervisor:o.filter(c=>c.role==="Supervisor"),Member:o.filter(c=>c.role==="Member"||!c.role)};t.innerHTML=`
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
                  <div style="font-size: 48px; font-weight: 950; color: var(--text-primary); margin-top: 12px; letter-spacing: -2px;">${n}</div>
                  <div style="font-size: 12px; color: var(--accent); font-weight: 850; margin-top: 8px;">Active Operational Nodes</div>
                </div>
                <div class="card elevated" style="padding: 32px; border-radius: 36px; background: #fff;">
                  <div style="font-size: 11px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Verified Success</div>
                  <div style="font-size: 48px; font-weight: 950; color: var(--success); margin-top: 12px; letter-spacing: -2px;">${a}</div>
                  <div style="font-size: 12px; color: var(--text-muted); font-weight: 850; margin-top: 8px;">Completed Transactions</div>
                </div>
                <div class="card elevated" style="padding: 32px; border-radius: 36px; background: var(--accent-gradient); color: #fff;">
                  <div style="font-size: 11px; font-weight: 950; opacity: 0.8; text-transform: uppercase; letter-spacing: 2px;">Global Efficiency</div>
                  <div style="font-size: 48px; font-weight: 950; margin-top: 12px; letter-spacing: -2px;">${l}%</div>
                  <div style="font-size: 12px; opacity: 0.9; font-weight: 850; margin-top: 8px;">Strategic Conversion Hub</div>
                </div>
                <div class="card elevated" style="padding: 32px; border-radius: 36px; background: #fff;">
                  <div style="font-size: 11px; font-weight: 950; color: var(--text-muted); text-transform: uppercase; letter-spacing: 2px;">Channel Depth</div>
                  <div style="font-size: 48px; font-weight: 950; color: #007AFF; margin-top: 12px; letter-spacing: -2px;">${s.length}</div>
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
                    ${Object.entries(u).map(([c,h])=>{if(h.length===0)return"";let f=c==="Admin"?"COMMAND NODE":c==="Supervisor"?"TACTICAL NODE":"OPERATIONAL NODE",p=c==="Admin"?"#FF3B30":c==="Supervisor"?"#5856D6":"var(--accent)";return`
                        <div>
                          <div style="font-size: 10px; font-weight: 950; color: ${p}; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;">${f}</div>
                          <div style="display: flex; flex-direction: column; gap: 12px;">
                            ${h.map(x=>`
                              <div class="contact-item" onclick="app.viewMemberStats('${x.id}')" style="display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; background: rgba(0,0,0,0.015); border-radius: 22px; border: 1.5px solid rgba(0,0,0,0.02); cursor: pointer;">
                                <div style="display: flex; align-items: center; gap: 20px;">
                                  <div style="width: 48px; height: 48px; background: ${p}; color: #fff; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-weight: 950;">${x.displayName[0]}</div>
                                  <div>
                                    <div style="font-weight: 950; font-size: 17px; color: var(--text-primary);">${x.displayName}</div>
                                    <div style="font-size: 9px; font-weight: 950; color: var(--accent); margin-top: 4px;">${x.topInterest} • ${x.total} CAPTURES</div>
                                  </div>
                                </div>
                                <div style="text-align: right;">
                                  <div style="font-size: 20px; font-weight: 950; color: ${x.qualityScore>2.5?"var(--success)":"var(--text-primary)"};">${x.qualityScore}</div>
                                  <div style="font-size: 8px; font-weight: 950; color: var(--text-muted);">QUALITY SCORE</div>
                                </div>
                              </div>
                            `).join("")}
                          </div>
                        </div>
                      `}).join("")}
                  </div>
                </div>

                <div class="card elevated" style="background: #fff; border-radius: 40px; padding: 40px;">
                  <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin-bottom: 24px;">Channel Quality Index</h3>
                  <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                     ${s.map(c=>{const h=Math.min(100,Math.round(c.count/n*200));return`
                       <div style="padding: 24px; background: rgba(0,122,255,0.03); border-radius: 24px;">
                          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 16px;">
                             <div style="font-size: 18px; font-weight: 950;">${c.name}</div>
                             <div style="font-size: 18px; font-weight: 950; color: #007AFF;">${c.count} <span style="font-size: 10px; color: var(--text-muted);">UNITS</span></div>
                          </div>
                          <div style="width: 100%; height: 10px; background: rgba(0,0,0,0.04); border-radius: 5px; overflow: hidden;">
                             <div style="width: ${h}%; height: 100%; background: #007AFF;"></div>
                          </div>
                       </div>
                     `}).join("")}
                  </div>
                </div>
              </div>

              <!-- CUSTOMER STRATEGIC DISTRIBUTION -->
              <div class="panoramic-grid" style="grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); gap: 32px; margin-bottom: 48px;">
                <div class="card elevated" style="background: #fff; border-radius: 40px; padding: 40px;">
                  <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin-bottom: 12px;">Location Strategic Reach</h3>
                  <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-bottom: 32px; letter-spacing: 1px;">Geographic Demand Concentration</p>
                  
                  <div style="display: flex; flex-direction: column; gap: 16px;">
                    ${d.map(c=>{const h=Math.round(c.count/n*100);return`
                        <div style="display: flex; align-items: center; gap: 20px;">
                          <div style="width: 120px; font-size: 13px; font-weight: 800; color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${c.name}</div>
                          <div style="flex: 1; height: 8px; background: rgba(0,0,0,0.04); border-radius: 4px; overflow: hidden;">
                             <div style="width: ${h}%; height: 100%; background: var(--accent); opacity: 0.8; border-radius: 4px;"></div>
                          </div>
                          <div style="width: 40px; font-size: 11px; font-weight: 950; color: var(--accent); text-align: right;">${h}%</div>
                        </div>
                      `}).join("")}
                    ${d.length===0?'<div style="opacity: 0.5; font-size: 13px; padding: 20px; text-align: center;">No Geographic Data Found</div>':""}
                  </div>
                </div>

                <div class="card elevated" style="background: #fff; border-radius: 40px; padding: 40px;">
                  <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin-bottom: 12px;">Product Demand Clusters</h3>
                  <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-bottom: 32px; letter-spacing: 1px;">Strategic Category Velocity</p>
                  
                  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
                    ${this.getFrequencyMap(r,"interest",8).map(c=>`
                        <div style="padding: 20px; background: rgba(52, 199, 89, 0.04); border-radius: 24px; border: 1.5px solid rgba(52, 199, 89, 0.08);">
                           <div style="font-size: 10px; font-weight: 900; color: #34C759; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">${c.name.split("|")[0].trim()}</div>
                           <div style="font-size: 28px; font-weight: 950; color: var(--text-primary); letter-spacing: -1px;">${c.count}</div>
                           <div style="font-size: 9px; font-weight: 850; color: var(--text-muted); margin-top: 4px;">ACTIVE REQUESTS</div>
                        </div>
                      `).join("")}
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
                    ${["Hot","Warm","Cold"].map(c=>{const h=r.filter(x=>x.priority===c).length,f=n>0?Math.round(h/n*100):0;return`
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                           <div style="display: flex; align-items: center; gap: 12px;">
                              <div style="width: 12px; height: 12px; background: ${c==="Hot"?"#FF3B30":c==="Warm"?"#FF9500":"#8E8E93"}; border-radius: 4px;"></div>
                              <div style="font-size: 14px; font-weight: 900; color: var(--text-primary);">${c.toUpperCase()}</div>
                           </div>
                           <div style="display: flex; align-items: baseline; gap: 6px;">
                              <div style="font-size: 20px; font-weight: 950;">${h}</div>
                              <div style="font-size: 10px; font-weight: 850; color: var(--text-muted);">${f}%</div>
                           </div>
                        </div>
                      `}).join("")}
                  </div>
                </div>

                <!-- OPERATIONAL VELOCITY -->
                <div class="card elevated" style="background: #fff; border-radius: 40px; padding: 40px;">
                  <h3 style="font-size: 24px; font-weight: 950; color: var(--text-primary); margin-bottom: 8px;">Operational Mix</h3>
                  <p style="font-size: 11px; color: var(--text-muted); font-weight: 850; text-transform: uppercase; margin-bottom: 32px; letter-spacing: 1px;">Short vs Registry Trajectory</p>
                  
                  <div style="height: 120px; display: flex; align-items: flex-end; gap: 12px; margin-bottom: 24px;">
                    ${(()=>{const c=r.filter(x=>x.type==="short").length,h=n-c,f=n>0?c/n*100:0,p=n>0?h/n*100:0;return`
                        <div style="flex: 1; height: ${f}%; background: rgba(0,0,0,0.05); border-radius: 12px; position: relative; transition: height 1s ease;">
                           <div style="position: absolute; top: -30px; left: 0; right: 0; text-align: center; font-size: 11px; font-weight: 950; color: var(--text-muted);">${Math.round(f)}%</div>
                           <div style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center; font-size: 9px; font-weight: 950; color: var(--text-muted); text-transform: uppercase;">Short</div>
                        </div>
                        <div style="flex: 1; height: ${p}%; background: var(--accent); border-radius: 12px; position: relative; transition: height 1s ease;">
                           <div style="position: absolute; top: -30px; left: 0; right: 0; text-align: center; font-size: 11px; font-weight: 950; color: var(--accent);">${Math.round(p)}%</div>
                           <div style="position: absolute; bottom: -24px; left: 0; right: 0; text-align: center; font-size: 9px; font-weight: 950; color: var(--accent); text-transform: uppercase;">Full</div>
                        </div>
                      `})()}
                  </div>
                </div>

                <!-- KEYWORD INTELLIGENCE -->
                <div class="card elevated" style="background: var(--text-primary); border-radius: 40px; padding: 40px; color: #fff;">
                  <h3 style="font-size: 24px; font-weight: 950; margin-bottom: 8px;">Aspect Intelligence</h3>
                  <p style="font-size: 11px; opacity: 0.6; font-weight: 850; text-transform: uppercase; margin-bottom: 32px; letter-spacing: 1px;">Minute Demand Indicators</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${(()=>{const c=r.map(f=>(f.enquiry_note||"")+" "+(f.notes||"")).join(" ").toLowerCase();return["gift","wedding","investment","gold","silver","birthday","anniversary","custom","urgent","budget"].map(f=>{const p=(c.match(new RegExp(f,"g"))||[]).length;return p===0?"":`<span style="font-size: ${Math.min(24,12+p/n*50)}px; font-weight: 900; opacity: ${.4+p/n*2}; margin-right: 8px; text-transform: uppercase;">${f}</span>`}).join("")})()}
                  </div>
                  <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 10px; font-weight: 700; opacity: 0.5;">UPLINKING REAL-TIME SENTIMENT...</div>
                </div>
              </div>

              <div style="margin-top: 60px; text-align: center; opacity: 0.3; font-size: 11px; font-weight: 950; letter-spacing: 3px;">
                VERA STRATEGIC ANALYTICS CORE • DEEP-SPACE v9.5 • ENCRYPTED
              </div>
            `}catch(e){console.error("Analytics Engine Fault:",e),t.innerHTML=`<div class="card elevated" style="padding: 40px; text-align: center; color: var(--error);">MODAL ANALYTICS ENGINE OFFLINE: ${e.message}</div>`}}},getFrequencyMap(t,e,i){const r={};return t.forEach(o=>{const s=o[e]||"Unknown";r[s]=(r[s]||0)+1}),Object.entries(r).map(([o,s])=>({name:o,count:s})).sort((o,s)=>s.count-o.count).slice(0,i)},async assignLead(t,e,i){var r;try{const{error:o}=await b.from("leads").update({assigned_to:e,history:[...((r=this.leads.find(s=>String(s.id)===String(t)))==null?void 0:r.history)||[],{time:Date.now(),action:`Assigned case to ${i} for strategic follow-up.`}]}).eq("id",t);if(o)throw o;this.toast(`Module Assigned to ${i} ✅`,"success"),this.closeModal(),this.viewLead(t)}catch(o){console.error("Delegation Protocol Fault:",o),this.toast("Delegation Protocol Fault","error")}},renderMigrationPortal(){console.log("[VERA] Initiating Strategic Migration Portal..."),this.renderModal(`
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
          `)},async startMigrationProcedure(){const t=document.getElementById("migrate-old-url").value.trim(),e=document.getElementById("migrate-old-key").value.trim(),i=document.getElementById("migration-log"),r=document.getElementById("btn-start-migration");if(!t||!e)return this.toast("Missing Tactical Credentials","error");r.style.opacity="0.5",r.disabled=!0,i.style.display="block";const o=s=>{i.innerHTML+=`<div>> ${s}</div>`,i.scrollTop=i.scrollHeight};try{o("ESTABLISHING SOURCE BRIDGE...");const s=Q(t,e);o("SYNCHRONIZING STAFF REGISTRY...");const{data:n,error:a}=await s.from("staff").select("*");if(a)throw a;o(`FOUND ${n.length} STAFF NODES.`);const{error:l}=await b.from("staff").upsert(n);if(l)throw l;o("STAFF REGISTRY STABLE."),o("SYNCHRONIZING APP CONFIGURATION...");const{data:d,error:u}=await s.from("app_config").select("*");if(u)throw u;const{error:c}=await b.from("app_config").upsert(d);if(c)throw c;o("CONFIGURATION STABLE."),o("RELOCATING LEAD VAULT...");let h=0;const f=1e3;let p=!0,x=0;const g=["id","name","phone","location","interest","source","status","priority","timestamp","owner","owner_name","added_by","assigned_to","type","followup_date","checklist","history","weight","enquiry_note","executive_comment","notes"];for(;p;){const{data:v,error:y}=await s.from("leads").select("*").range(h*f,(h+1)*f-1).order("timestamp",{ascending:!1});if(y)throw y;if(!v||v.length===0){p=!1;break}o(`SCANNING ${v.length} VECTORS (PAGE ${h+1})...`);const I=v.map(C=>{const E={};return g.forEach(A=>{if(C.hasOwnProperty(A))E[A]=C[A];else{const R={followup_date:"followupDate",enquiry_note:"enquiryNote",executive_comment:"executiveComment",added_by:"addedBy",assigned_to:"assignedTo"}[A];R&&C.hasOwnProperty(R)&&(E[A]=C[R])}}),!E.enquiry_note&&C.interest&&C.interest.includes("| Note:")&&(E.enquiry_note=C.interest.split("| Note:")[1].trim()),E}),T=100;for(let C=0;C<I.length;C+=T){const E=I.slice(C,C+T),{error:A}=await b.from("leads").upsert(E);if(A)throw A;x+=E.length,o(`SECURED ${x} VECTORS...`)}v.length<f?p=!1:h++}o("VAULT REGISTRY SYNCHRONIZED."),o("MIGRATION COMPLETE. RELOADING TERMINAL..."),this.toast("Strategic Migration Success ✅","success"),setTimeout(()=>window.location.reload(),2e3)}catch(s){o(`CRITICAL ERROR: ${s.message}`),console.error("Migration Fault:",s),this.toast("Migration Protocol Fault","error"),r.style.opacity="1",r.disabled=!1}},renderModal(t){const e=document.getElementById("lead-modal"),i=e.querySelector(".modal-content"),r=document.getElementById("modal-body");!e||!r||(r.innerHTML=t,e.style.display="flex",e.classList.add("active"),window.innerWidth<850&&i&&(i.style.transform="translateY(0)"))},setAuditFilter(t,e){this.auditFilters[t]=e,this.renderAuditHub()},async renderAuditHub(){var o;const t=document.getElementById("audit-container");if(!t)return;const e=this.user.role==="Admin",i=this.user.role==="Supervisor",r=e||i;t.innerHTML=`
          <div style="padding: 100px 40px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px;">
            <div style="width: 40px; height: 40px; border: 3px solid rgba(0,0,0,0.1); border-top-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <div style="margin-top: 24px; font-size: 11px; font-weight: 950; color: var(--accent); letter-spacing: 2px; text-transform: uppercase;">Initializing Sentinel Protocols...</div>
          </div>
        `;try{const{data:s}=await b.from("staff").select("*");let n=b.from("audit_logs").select("*").order("timestamp",{ascending:!1});this.auditFilters.status!=="all"&&(n=n.eq("status",this.auditFilters.status)),e?this.auditFilters.member&&(n=n.eq("member_id",this.auditFilters.member)):n=n.eq("member_id",this.user.id);const{data:a,error:l}=await n;if(l&&(l.code==="PGRST116"||(o=l==null?void 0:l.message)!=null&&o.includes("not found"))){t.innerHTML=`
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
            `;return}const d=a.filter(c=>c.status==="pending"),u=a.filter(c=>c.severity==="critical"&&c.status==="pending").length;t.innerHTML=`
            <div style="padding: 40px 20px; max-width: 1600px; margin: 0 auto;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 64px;">
                <div>
                  <div style="display: inline-flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.04); padding: 8px 16px; border-radius: 100px; margin-bottom: 24px;">
                    <div style="width: 8px; height: 8px; background: ${u>0?"#FF3B30":"#34C759"}; border-radius: 50%;"></div>
                    <span style="font-size: 10px; font-weight: 950; color: #000; letter-spacing: 2px; text-transform: uppercase;">${u>0?"CRITICAL FAULTS DETECTED":"SYSTEM STATUS: NOMINAL"}</span>
                  </div>
                  <h1 style="font-size: 72px; font-weight: 950; letter-spacing: -4px; color: #000; margin: 0; line-height: 0.85;">Quality <span style="color: var(--accent);">Sentinel</span></h1>
                </div>
                <div style="display: flex; gap: 24px;">
                  <div style="background: #000; color: #fff; padding: 24px 32px; border-radius: 32px; display: flex; align-items: center; gap: 20px;">
                    <div style="text-align: right;">
                      <div style="font-size: 32px; font-weight: 950; line-height: 1;">${d.length}</div>
                      <div style="font-size: 9px; font-weight: 900; color: rgba(255,255,255,0.4); text-transform: uppercase;">Open Cases</div>
                    </div>
                    <div style="width: 1px; height: 40px; background: rgba(255,255,255,0.1);"></div>
                    <div>
                      <div style="font-size: 32px; font-weight: 950; line-height: 1; color: #FF3B30;">${u}</div>
                      <div style="font-size: 9px; font-weight: 900; color: rgba(255,255,255,0.4); text-transform: uppercase;">Critical</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style="display: flex; gap: 8px; margin-bottom: 40px;">
                <button onclick="app.setAuditFilter('status', 'pending')" style="background: ${this.auditFilters.status==="pending"?"#000":"#eee"}; color: ${this.auditFilters.status==="pending"?"#fff":"#666"}; border: none; padding: 12px 24px; border-radius: 16px; font-weight: 900; cursor: pointer;">ACTIVE</button>
                <button onclick="app.setAuditFilter('status', 'completed')" style="background: ${this.auditFilters.status==="completed"?"#000":"#eee"}; color: ${this.auditFilters.status==="completed"?"#fff":"#666"}; border: none; padding: 12px 24px; border-radius: 16px; font-weight: 900; cursor: pointer;">RESOLVED</button>
                <button onclick="app.setAuditFilter('status', 'all')" style="background: ${this.auditFilters.status==="all"?"#000":"#eee"}; color: ${this.auditFilters.status==="all"?"#fff":"#666"}; border: none; padding: 12px 24px; border-radius: 16px; font-weight: 900; cursor: pointer;">ARCHIVE</button>
              </div>

              <div style="display: grid; grid-template-columns: ${r?"420px 1fr":"1fr"}; gap: 48px; align-items: start;">
                ${r?`
                <div style="background: #fff; border-radius: 42px; padding: 40px; border: 1.5px solid rgba(0,0,0,0.03); box-shadow: 0 40px 100px rgba(0,0,0,0.05); position: sticky; top: 120px;">
                  <div style="font-size: 12px; font-weight: 950; color: var(--accent); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 40px;">Issue Performance Flag</div>
                  <div style="display: flex; flex-direction: column; gap: 24px;">
                    <div>
                      <label style="font-size: 9px; font-weight: 950; color: #999; text-transform: uppercase; margin-bottom: 8px; display: block;">Responsible Personnel</label>
                      <select id="audit-member" style="width: 100%; height: 56px; background: #f9f9f9; border: 1.5px solid #eee; border-radius: 18px; padding: 0 16px; font-weight: 900;">
                        <option value="">Select ID...</option>
                        ${s.sort((c,h)=>(c.name||"").localeCompare(h.name||"")).map(c=>`<option value="${c.id}">${(c.name||c.id).toUpperCase()}</option>`).join("")}
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
                `:""}

                <div style="display: flex; flex-direction: column; gap: 20px;">
                  ${a.length===0?`
                    <div style="padding: 100px 40px; text-align: center; border-radius: 42px; background: #f9f9f9; border: 2px dashed #eee; color: #999;">No logs found.</div>
                  `:a.map(c=>{const h=s.find(p=>p.id===(e||i?c.member_id:c.supervisor_id))||{name:"Unknown"},f=c.severity==="critical"?"#FF3B30":c.severity==="warning"?"#FFBF00":"#007AFF";return`
                      <div style="background: #fff; border-radius: 32px; padding: 28px; border: 1.5px solid #eee; display: flex; gap: 24px; align-items: start; position: relative;">
                        ${c.screenshot_url?`
                          <div style="width: 100px; height: 100px; border-radius: 20px; overflow: hidden; cursor: pointer;" onclick="app.viewAuditEvidence('${c.id}')">
                            <img src="${c.screenshot_url}" style="width: 100%; height: 100%; object-fit: cover;">
                          </div>
                        `:""}
                        <div style="flex: 1;">
                          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                            <div>
                              <div style="font-size: 18px; font-weight: 950; color: #000;">${h.name.toUpperCase()}</div>
                              <div style="font-size: 9px; font-weight: 900; color: #999; text-transform: uppercase;">${new Date(c.timestamp).toLocaleDateString()}</div>
                            </div>
                            <div style="background: ${f}15; color: ${f}; padding: 4px 12px; border-radius: 8px; font-size: 9px; font-weight: 950; text-transform: uppercase;">${c.severity||"WARNING"}</div>
                          </div>
                          <div style="font-size: 14px; font-weight: 700; color: #444; line-height: 1.5;">${c.reason}</div>
                          ${c.status==="pending"?`
                            <div style="display: flex; gap: 12px; margin-top: 20px;">
                              <button onclick="app.resolveAudit('${c.id}', 'completed')" style="padding: 10px 20px; background: #34C759; color: #fff; border: none; border-radius: 12px; font-size: 10px; font-weight: 950; cursor: pointer;">RESOLVE</button>
                              <button onclick="app.resolveAudit('${c.id}', 'cancelled')" style="padding: 10px 20px; background: #eee; color: #666; border: none; border-radius: 12px; font-size: 10px; font-weight: 950; cursor: pointer;">VOID</button>
                            </div>
                          `:`
                            <div style="margin-top: 12px; font-size: 9px; font-weight: 900; color: #999; text-transform: uppercase;">STATUS: ${c.status.toUpperCase()}</div>
                          `}
                        </div>
                      </div>
                    `}).join("")}
                </div>
              </div>
            </div>
          `}catch(s){console.error("Sentinel Registry Fail:",s),t.innerHTML='<div style="padding: 100px; color: var(--accent); text-align: center; font-weight: 950;">SYSTEM OFFLINE</div>'}},handleAuditScreenshot(t){const e=document.getElementById("audit-preview");if(t.files&&t.files[0]){const i=new FileReader;i.onload=r=>{e.innerHTML=`<img src="${r.target.result}" style="width:100%; height:100%; object-fit:cover;">`,e.style.display="block",this._pendingAuditImage=r.target.result},i.readAsDataURL(t.files[0])}},async submitAuditReport(){const t=document.getElementById("audit-member").value,e=document.getElementById("audit-reason").value;if(!t||!e)return this.toast("Registry Requirement: Member & Description","warning");this.toast("Uplinking Incident Evidence...","info");let i=null;if(this._pendingAuditImage)try{const r=new FormData;r.append("file",this._pendingAuditImage),r.append("upload_preset",this.CLD_PRESET);const o=await fetch(`https://api.cloudinary.com/v1_1/${this.CLD_CLOUD}/image/upload`,{method:"POST",body:r});if(!o.ok)throw new Error("Cloudinary Handshake Failure");i=(await o.json()).secure_url}catch(r){console.error("Cloudinary Uplink Fail:",r),this.toast("Evidence Uplink Fault - Using Local Buffer","warning"),i=this._pendingAuditImage}try{await b.from("audit_logs").insert([{supervisor_id:this.user.id,member_id:t,reason:e,severity:this._selectedSeverity||"warning",screenshot_url:i,timestamp:Date.now(),status:"pending"}]),this.toast("QA Incident Broadcasted 🛰️"),this._pendingAuditImage=null,this.renderAuditHub()}catch(r){console.error("Audit Insert Fail:",r),this.toast("Database Logic Error","error")}},async viewAuditEvidence(t){try{const{data:e}=await b.from("audit_logs").select("*").eq("id",t).single();if(!e)return;const i=`
            <div style="padding: 40px;">
              <h2 style="font-size: 32px; font-weight: 900; margin-bottom: 24px;">Evidence Review</h2>
              ${e.screenshot_url?`<img src="${e.screenshot_url}" style="width: 100%; border-radius: 24px; margin-bottom: 24px;">`:""}
              <div style="background: #f9f9f9; padding: 24px; border-radius: 24px; font-size: 18px; font-weight: 700;">${e.reason}</div>
              <div style="margin-top: 32px; display: flex; gap: 16px;">
                <button onclick="app.resolveAudit('${e.id}', 'completed'); app.closeModal();" class="btn" style="padding: 20px; background: var(--success); color: #fff; border-radius: 16px; font-weight: 900;">RESOLVE</button>
                <button onclick="app.closeModal();" class="btn" style="padding: 20px; background: #eee; color: #666; border-radius: 16px; font-weight: 900;">CLOSE</button>
              </div>
            </div>
          `;this.renderModal(i)}catch(e){console.error("Evidence Bridge Fault:",e)}},async resolveAudit(t,e){try{this.toast(`Updating: ${e.toUpperCase()}...`,"info");const{error:i}=await b.from("audit_logs").update({status:e}).eq("id",t);if(i)throw i;this.toast("Audit Resolved ✅","success"),this.renderAuditHub()}catch(i){console.error("Resolution Protocol Fault:",i),this.toast("Resolution Protocol Fault","error")}},renderTrajectoryChart(){const t=document.getElementById("trajectory-chart");if(!t)return;const e=[],i=[],r=[];for(let a=6;a>=0;a--){const l=new Date;l.setDate(l.getDate()-a);const d=l.toISOString().split("T")[0];e.push(l.toLocaleDateString([],{weekday:"short",day:"numeric"}));const u=this.leads.filter(c=>{const h=typeof c.timestamp=="number"?c.timestamp:new Date(c.timestamp).getTime();return new Date(h).toISOString().split("T")[0]===d});i.push(u.length),r.push(u.filter(c=>c.status==="Purchased").length)}this.trajectoryChartInstance&&this.trajectoryChartInstance.destroy();const o=t.getContext("2d"),s=getComputedStyle(document.body).getPropertyValue("--accent").trim()||"#521216",n=getComputedStyle(document.body).getPropertyValue("--success").trim()||"#34C759";this.trajectoryChartInstance=new Chart(o,{type:"line",data:{labels:e,datasets:[{label:"Leads Captured",data:i,borderColor:s,backgroundColor:s+"15",fill:!0,tension:.4,borderWidth:3,pointRadius:4,pointBackgroundColor:"#fff",pointBorderWidth:2},{label:"Sales Secured",data:r,borderColor:n,backgroundColor:"transparent",fill:!1,tension:.4,borderWidth:2,borderDash:[5,5],pointRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!0,position:"top",labels:{usePointStyle:!0,font:{size:10,weight:"900"},color:"var(--text-primary)"}},tooltip:{mode:"index",intersect:!1,backgroundColor:"rgba(0,0,0,0.85)",titleFont:{size:12,weight:"bold"},bodyFont:{size:11,weight:"600"},padding:12,cornerRadius:16}},scales:{y:{beginAtZero:!0,grid:{color:"rgba(0,0,0,0.03)"},ticks:{font:{size:10,weight:"700"},color:"var(--text-muted)"}},x:{grid:{display:!1},ticks:{font:{size:10,weight:"700"},color:"var(--text-muted)"}}}}})},startVoiceCapture(t){const e=window.SpeechRecognition||window.webkitSpeechRecognition;if(!e){this.toast("Registry Protocol: Voice Engine Not Supported","warning");return}const i=document.getElementById(t);if(!i)return;const r=new e;r.lang="en-IN",r.interimResults=!1,r.maxAlternatives=1,this.toast("Uplink Active: Listening...","info"),window.navigator.vibrate&&window.navigator.vibrate(50),r.start(),r.onresult=o=>{const s=o.results[0][0].transcript,n=i.value.trim();i.value=(n?n+" ":"")+s,this.toast("Intelligence Logged ✅","success"),window.navigator.vibrate&&window.navigator.vibrate([30,50])},r.onerror=o=>{console.error("Speech Recognition Error:",o.error),this.toast(`Signal Lost: ${o.error}`,"error")}}};window.addEventListener("scroll",()=>{const t=document.getElementById("header-island");window.scrollY>20?t.classList.add("scrolled"):t.classList.remove("scrolled")});setInterval(()=>{typeof K.updateIslandTimer=="function"&&K.updateIslandTimer(),typeof K.updateIslandStatus=="function"&&K.updateIslandStatus()},1e3);K.init();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").then(t=>console.log("[PWA] Tactical Speed Engine Registered:",t.scope)).catch(t=>console.warn("[PWA] Service Worker Fault:",t))});
