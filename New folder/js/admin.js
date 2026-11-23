/* =========================================================
   ANAS PORTFOLIO — ADMIN PANEL
   Client-side CMS. Reads/writes the same localStorage content
   store used by content.js, so saves here appear instantly on
   the live pages in this same browser.
   ========================================================= */

(function () {
  "use strict";

  var C = window.ANASContent;
  var content = C.getContent();

  var SESSION_KEY = "anas_admin_session_v1";

  /* ---------------------------------------------------------
     AUTH
  --------------------------------------------------------- */
  var loginScreen = document.getElementById("loginScreen");
  var dashboard = document.getElementById("dashboard");
  var loginForm = document.getElementById("loginForm");
  var loginError = document.getElementById("loginError");
  var logoutBtn = document.getElementById("logoutBtn");

  function isLoggedIn() {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  }

  function showDashboard() {
    loginScreen.style.display = "none";
    dashboard.style.display = "flex";
    initDashboard();
  }

  function showLogin() {
    dashboard.style.display = "none";
    loginScreen.style.display = "flex";
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var u = document.getElementById("loginUser").value.trim();
    var p = document.getElementById("loginPass").value;
    var auth = C.getAuthConfig();
    if (u === auth.username && p === auth.password) {
      sessionStorage.setItem(SESSION_KEY, "1");
      loginError.classList.remove("show");
      showDashboard();
    } else {
      loginError.textContent = "Incorrect username or password.";
      loginError.classList.add("show");
    }
  });

  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem(SESSION_KEY);
    showLogin();
  });

  if (isLoggedIn()) showDashboard(); else showLogin();

  /* ---------------------------------------------------------
     SHARED HELPERS
  --------------------------------------------------------- */
  function save() {
    C.saveContent(content);
    toast("Saved — the live site has been updated.");
  }

  var toastEl = document.getElementById("adminToast");
  var toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  function uid(prefix) {
    return prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function fileToCompressedDataUrl(file, maxDim, quality) {
    maxDim = maxDim || 1000;
    quality = quality || 0.82;
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onerror = reject;
      reader.onload = function () {
        var img = new Image();
        img.onerror = reject;
        img.onload = function () {
          var scale = Math.min(1, maxDim / Math.max(img.width, img.height));
          var w = Math.round(img.width * scale);
          var h = Math.round(img.height * scale);
          var canvas = document.createElement("canvas");
          canvas.width = w; canvas.height = h;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);
          try {
            resolve(canvas.toDataURL("image/jpeg", quality));
          } catch (e) { reject(e); }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------------------------------------------------
     NAV / PANEL SWITCHING
  --------------------------------------------------------- */
  var navButtons, panels;
  function initNav() {
    navButtons = document.querySelectorAll(".admin-nav-btn");
    panels = document.querySelectorAll(".admin-panel-section");
    navButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        navButtons.forEach(function (b) { b.classList.remove("active"); });
        panels.forEach(function (p) { p.classList.remove("active"); });
        btn.classList.add("active");
        document.getElementById(btn.dataset.panel).classList.add("active");
        document.getElementById("mobileAdminNav") && (document.getElementById("mobileAdminNav").value = btn.dataset.panel);
      });
    });
  }

  /* ---------------------------------------------------------
     INIT DASHBOARD (runs once, on first successful login)
  --------------------------------------------------------- */
  var dashboardInited = false;
  function initDashboard() {
    if (dashboardInited) return;
    dashboardInited = true;
    content = C.getContent(); // refresh in case another tab changed it
    initNav();
    renderOverview();
    renderBranding();
    renderHomePanel();
    renderAboutPanel();
    renderServicesPanel();
    renderPortfolioPanel();
    renderAwardsPanel();
    renderContactPanel();
    renderThemePanel();
    renderSecurityPanel();
  }

  /* ---------------------------------------------------------
     OVERVIEW
  --------------------------------------------------------- */
  function renderOverview() {
    document.getElementById("ov-projects-count").textContent = content.projects.length;
    document.getElementById("ov-services-count").textContent = content.services.items.length;
    document.getElementById("ov-awards-count").textContent = content.awards.length;
    document.getElementById("ov-theme").textContent = C.THEMES[C.getTheme()].label;
  }

  /* ---------------------------------------------------------
     BRANDING + PROFILE PHOTO
  --------------------------------------------------------- */
  function renderBranding() {
    var panel = document.getElementById("panel-branding");
    var photoPreview = panel.querySelector("#brandingPhotoPreview");
    photoPreview.src = content.profilePhoto || C.placeholders.profile;

    panel.querySelector("#brandingTagline").value = content.brand.tagline;

    panel.querySelector("#brandingPhotoInput").addEventListener("change", function (e) {
      var file = e.target.files[0];
      if (!file) return;
      fileToCompressedDataUrl(file, 1000, 0.85).then(function (dataUrl) {
        content.profilePhoto = dataUrl;
        photoPreview.src = dataUrl;
        save();
      }).catch(function () { toast("Could not process that image — try a smaller file."); });
    });

    panel.querySelector("#brandingPhotoReset").addEventListener("click", function () {
      content.profilePhoto = null;
      photoPreview.src = C.placeholders.profile;
      save();
    });

    panel.querySelector("#brandingSave").addEventListener("click", function () {
      content.brand.tagline = panel.querySelector("#brandingTagline").value.trim() || content.brand.tagline;
      save();
    });
  }

  /* ---------------------------------------------------------
     HOME PAGE PANEL
  --------------------------------------------------------- */
  function renderHomePanel() {
    var panel = document.getElementById("panel-home");
    panel.querySelector("#homeHeroIntro").value = content.home.heroIntro;

    var statsWrap = panel.querySelector("#homeStatsEditor");
    statsWrap.innerHTML = content.home.stats.map(function (s, i) {
      return (
        '<div class="admin-stat-row">' +
        '<input class="form-control" data-stat="label" data-i="' + i + '" value="' + esc(s.label) + '" placeholder="Label">' +
        '<input class="form-control" data-stat="value" data-i="' + i + '" value="' + esc(s.value) + '" placeholder="Value" style="max-width:100px;">' +
        '<input class="form-control" data-stat="suffix" data-i="' + i + '" value="' + esc(s.suffix) + '" placeholder="+/%" style="max-width:80px;">' +
        '</div>'
      );
    }).join("");

    panel.querySelector("#homeSave").addEventListener("click", function () {
      content.home.heroIntro = panel.querySelector("#homeHeroIntro").value.trim();
      statsWrap.querySelectorAll("[data-stat]").forEach(function (input) {
        var i = parseInt(input.dataset.i, 10);
        var field = input.dataset.stat;
        if (field === "value") content.home.stats[i].value = parseFloat(input.value) || 0;
        else content.home.stats[i][field] = input.value;
      });
      save();
    });
  }

  /* ---------------------------------------------------------
     ABOUT PAGE PANEL
  --------------------------------------------------------- */
  function renderAboutPanel() {
    var panel = document.getElementById("panel-about");
    panel.querySelector("#aboutHeroIntro").value = content.about.heroIntro;
    panel.querySelector("#aboutStory0").value = content.about.story[0];
    panel.querySelector("#aboutStory1").value = content.about.story[1];
    panel.querySelector("#aboutStory2").value = content.about.story[2];
    panel.querySelector("#aboutClosing").value = content.about.storyClosing;

    panel.querySelector("#aboutSave").addEventListener("click", function () {
      content.about.heroIntro = panel.querySelector("#aboutHeroIntro").value.trim();
      content.about.story[0] = panel.querySelector("#aboutStory0").value.trim();
      content.about.story[1] = panel.querySelector("#aboutStory1").value.trim();
      content.about.story[2] = panel.querySelector("#aboutStory2").value.trim();
      content.about.storyClosing = panel.querySelector("#aboutClosing").value.trim();
      save();
    });
  }

  /* ---------------------------------------------------------
     SERVICES PANEL (add / remove / edit / price)
  --------------------------------------------------------- */
  function iconOptions(selected) {
    return Object.keys(C.ICONS).map(function (k) {
      return '<option value="' + k + '"' + (k === selected ? " selected" : "") + '>' + k + "</option>";
    }).join("");
  }

  function renderServicesPanel() {
    var panel = document.getElementById("panel-services");
    var list = panel.querySelector("#servicesList");

    function draw() {
      list.innerHTML = content.services.items.map(function (s, i) {
        return (
          '<div class="admin-card" data-idx="' + i + '">' +
          '<div class="admin-card-head"><strong>Service ' + (i + 1) + '</strong>' +
          '<button type="button" class="admin-remove-btn" data-remove-service="' + i + '">Remove</button></div>' +
          '<div class="admin-field-grid">' +
          '<label>Title<input class="form-control" data-svc="title" value="' + esc(s.title) + '"></label>' +
          '<label>Icon<select class="form-control" data-svc="icon">' + iconOptions(s.icon) + '</select></label>' +
          '<label class="full">Description<textarea class="form-control" data-svc="desc" rows="2">' + esc(s.desc) + '</textarea></label>' +
          '<label class="full">Deliverables (comma-separated)<input class="form-control" data-svc="deliverables" value="' + esc((s.deliverables || []).join(", ")) + '"></label>' +
          '<label>Starting Price<input class="form-control" data-svc="price" value="' + esc(s.price) + '" placeholder="Starting at $50 / part"></label>' +
          '<label>CTA Button Text<input class="form-control" data-svc="cta" value="' + esc(s.cta) + '"></label>' +
          '</div></div>'
        );
      }).join("");
    }
    draw();

    panel.querySelector("#addServiceBtn").addEventListener("click", function () {
      content.services.items.push({ id: uid("svc"), icon: "generic", title: "New Service", desc: "Describe this service.", deliverables: [], price: "Starting at $0", cta: "Request Service" });
      draw();
    });

    list.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-remove-service]");
      if (!btn) return;
      var idx = parseInt(btn.getAttribute("data-remove-service"), 10);
      if (confirm("Remove this service? This can't be undone after you save.")) {
        content.services.items.splice(idx, 1);
        draw();
      }
    });

    panel.querySelector("#servicesSave").addEventListener("click", function () {
      list.querySelectorAll(".admin-card").forEach(function (card) {
        var i = parseInt(card.dataset.idx, 10);
        var s = content.services.items[i];
        if (!s) return;
        s.title = card.querySelector('[data-svc="title"]').value.trim();
        s.icon = card.querySelector('[data-svc="icon"]').value;
        s.desc = card.querySelector('[data-svc="desc"]').value.trim();
        s.deliverables = card.querySelector('[data-svc="deliverables"]').value.split(",").map(function (x) { return x.trim(); }).filter(Boolean);
        s.price = card.querySelector('[data-svc="price"]').value.trim();
        s.cta = card.querySelector('[data-svc="cta"]').value.trim();
      });
      save();
    });
  }

  /* ---------------------------------------------------------
     PORTFOLIO PANEL (add / remove / edit / image upload / featured)
  --------------------------------------------------------- */
  function categoryOptions(selected) {
    var opts = [["cad", "3D CAD Modeling"], ["sheet-metal", "Sheet Metal Design"], ["assemblies", "Mechanical Assemblies & Drawings"]];
    return opts.map(function (o) {
      return '<option value="' + o[0] + '"' + (o[0] === selected ? " selected" : "") + '>' + o[1] + "</option>";
    }).join("");
  }

  function renderPortfolioPanel() {
    var panel = document.getElementById("panel-portfolio");
    var list = panel.querySelector("#projectsList");

    function draw() {
      list.innerHTML = content.projects.map(function (p, i) {
        var img = p.image || (C.placeholders[p.category === "sheet-metal" ? "sheetMetal" : p.category] || C.placeholders.cad);
        return (
          '<div class="admin-card" data-idx="' + i + '">' +
          '<div class="admin-card-head"><strong>' + esc(p.title) + '</strong>' +
          '<button type="button" class="admin-remove-btn" data-remove-project="' + i + '">Remove</button></div>' +
          '<div class="admin-field-grid">' +
          '<div class="full admin-thumb-row">' +
          '<img class="admin-thumb-preview" src="' + img + '" alt="">' +
          '<div><input type="file" accept="image/*" data-project-image="' + i + '"><div class="form-note">Upload a real render to replace this placeholder.</div></div>' +
          '</div>' +
          '<label>Title<input class="form-control" data-proj="title" value="' + esc(p.title) + '"></label>' +
          '<label>Category<select class="form-control" data-proj="category">' + categoryOptions(p.category) + '</select></label>' +
          '<label class="full">Short Description (card)<textarea class="form-control" data-proj="desc" rows="2">' + esc(p.desc) + '</textarea></label>' +
          '<label class="full">Full Description (lightbox)<textarea class="form-control" data-proj="full" rows="3">' + esc(p.full) + '</textarea></label>' +
          '<label>Software<input class="form-control" data-proj="software" value="' + esc(p.software) + '"></label>' +
          '<label>Design Type<input class="form-control" data-proj="type" value="' + esc(p.type) + '"></label>' +
          '<label class="full">Output<input class="form-control" data-proj="output" value="' + esc(p.output) + '"></label>' +
          '<label class="checkbox-label"><input type="checkbox" data-proj="featured"' + (p.featured ? " checked" : "") + '> Show in Home Page Featured Projects</label>' +
          '</div></div>'
        );
      }).join("");
    }
    draw();

    panel.querySelector("#addProjectBtn").addEventListener("click", function () {
      content.projects.push({ id: uid("p"), category: "cad", categoryLabel: "3D CAD Modeling", title: "New Project", desc: "Short project description.", full: "Full project description for the lightbox view.", software: "SolidWorks", type: "3D Part Modeling", output: "3D Model + Drawing", image: null, featured: false });
      draw();
    });

    list.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-remove-project]");
      if (!btn) return;
      var idx = parseInt(btn.getAttribute("data-remove-project"), 10);
      if (confirm("Remove this project? This can't be undone after you save.")) {
        content.projects.splice(idx, 1);
        draw();
      }
    });

    list.addEventListener("change", function (e) {
      var fileInput = e.target.closest("[data-project-image]");
      if (!fileInput || !fileInput.files[0]) return;
      var idx = parseInt(fileInput.getAttribute("data-project-image"), 10);
      fileToCompressedDataUrl(fileInput.files[0], 900, 0.82).then(function (dataUrl) {
        content.projects[idx].image = dataUrl;
        var img = fileInput.closest(".admin-thumb-row").querySelector(".admin-thumb-preview");
        img.src = dataUrl;
        toast("Image ready — click \"Save Portfolio Changes\" to publish it.");
      }).catch(function () { toast("Could not process that image — try a smaller file."); });
    });

    panel.querySelector("#projectsSave").addEventListener("click", function () {
      var catLabels = { cad: "3D CAD Modeling", "sheet-metal": "Sheet Metal Design", assemblies: "Mechanical Assemblies & Drawings" };
      list.querySelectorAll(".admin-card").forEach(function (card) {
        var i = parseInt(card.dataset.idx, 10);
        var p = content.projects[i];
        if (!p) return;
        p.title = card.querySelector('[data-proj="title"]').value.trim();
        p.category = card.querySelector('[data-proj="category"]').value;
        p.categoryLabel = catLabels[p.category];
        p.desc = card.querySelector('[data-proj="desc"]').value.trim();
        p.full = card.querySelector('[data-proj="full"]').value.trim();
        p.software = card.querySelector('[data-proj="software"]').value.trim();
        p.type = card.querySelector('[data-proj="type"]').value.trim();
        p.output = card.querySelector('[data-proj="output"]').value.trim();
        p.featured = card.querySelector('[data-proj="featured"]').checked;
      });
      save();
      draw();
    });
  }

  /* ---------------------------------------------------------
     AWARDS PANEL
  --------------------------------------------------------- */
  function renderAwardsPanel() {
    var panel = document.getElementById("panel-awards");
    var list = panel.querySelector("#awardsList");

    function draw() {
      if (!content.awards.length) {
        list.innerHTML = '<p class="form-note">No awards yet — add your first one below.</p>';
        return;
      }
      list.innerHTML = content.awards.map(function (a, i) {
        return (
          '<div class="admin-card" data-idx="' + i + '">' +
          '<div class="admin-card-head"><strong>' + esc(a.title) + '</strong>' +
          '<button type="button" class="admin-remove-btn" data-remove-award="' + i + '">Remove</button></div>' +
          '<div class="admin-field-grid">' +
          '<label>Title<input class="form-control" data-award="title" value="' + esc(a.title) + '"></label>' +
          '<label>Year<input class="form-control" data-award="year" value="' + esc(a.year) + '" style="max-width:120px;"></label>' +
          '<label>Issuer / Organization<input class="form-control" data-award="issuer" value="' + esc(a.issuer) + '"></label>' +
          '<label class="full">Description<textarea class="form-control" data-award="desc" rows="2">' + esc(a.desc) + '</textarea></label>' +
          '</div></div>'
        );
      }).join("");
    }
    draw();

    panel.querySelector("#addAwardBtn").addEventListener("click", function () {
      content.awards.push({ id: uid("a"), title: "New Award or Achievement", issuer: "Organization Name", year: String(new Date().getFullYear()), desc: "Describe this achievement." });
      draw();
    });

    list.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-remove-award]");
      if (!btn) return;
      var idx = parseInt(btn.getAttribute("data-remove-award"), 10);
      if (confirm("Remove this award?")) {
        content.awards.splice(idx, 1);
        draw();
      }
    });

    panel.querySelector("#awardsSave").addEventListener("click", function () {
      list.querySelectorAll(".admin-card").forEach(function (card) {
        var i = parseInt(card.dataset.idx, 10);
        var a = content.awards[i];
        if (!a) return;
        a.title = card.querySelector('[data-award="title"]').value.trim();
        a.year = card.querySelector('[data-award="year"]').value.trim();
        a.issuer = card.querySelector('[data-award="issuer"]').value.trim();
        a.desc = card.querySelector('[data-award="desc"]').value.trim();
      });
      save();
      draw();
    });
  }

  /* ---------------------------------------------------------
     CONTACT & SOCIAL PANEL
  --------------------------------------------------------- */
  function renderContactPanel() {
    var panel = document.getElementById("panel-contact");
    panel.querySelector("#contactEmail").value = content.contact.email;
    panel.querySelector("#contactWhatsapp").value = content.contact.whatsapp;
    panel.querySelector("#contactInstagram").value = content.contact.instagram;
    panel.querySelector("#contactYoutube").value = content.contact.youtube;
    panel.querySelector("#contactLinkedin").value = content.contact.linkedin;

    panel.querySelector("#contactSave").addEventListener("click", function () {
      content.contact.email = panel.querySelector("#contactEmail").value.trim() || content.contact.email;
      content.contact.whatsapp = panel.querySelector("#contactWhatsapp").value.trim();
      content.contact.instagram = panel.querySelector("#contactInstagram").value.trim();
      content.contact.youtube = panel.querySelector("#contactYoutube").value.trim();
      content.contact.linkedin = panel.querySelector("#contactLinkedin").value.trim();
      save();
    });
  }

  /* ---------------------------------------------------------
     THEME PANEL
  --------------------------------------------------------- */
  function renderThemePanel() {
    var panel = document.getElementById("panel-theme");
    var grid = panel.querySelector("#themeGrid");
    var current = C.getTheme();

    function draw() {
      current = C.getTheme();
      grid.innerHTML = Object.keys(C.THEMES).map(function (key) {
        var t = C.THEMES[key];
        var active = key === current;
        return (
          '<button type="button" class="theme-card' + (active ? " active" : "") + '" data-theme-key="' + key + '">' +
          '<span class="theme-swatches">' +
          '<span class="sw" style="background:' + t.vars["--bg"] + '"></span>' +
          '<span class="sw" style="background:' + t.vars["--orange"] + '"></span>' +
          '<span class="sw" style="background:' + t.vars["--blue"] + '"></span>' +
          '<span class="sw" style="background:' + t.vars["--panel"] + '"></span>' +
          '</span>' +
          '<span class="theme-name">' + t.label + '</span>' +
          (active ? '<span class="theme-active-badge">Active</span>' : '') +
          '</button>'
        );
      }).join("");
    }
    draw();

    grid.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-theme-key]");
      if (!btn) return;
      C.setTheme(btn.getAttribute("data-theme-key"));
      draw();
      renderOverview();
      toast("Theme updated across the whole live site.");
    });
  }

  /* ---------------------------------------------------------
     SECURITY PANEL
  --------------------------------------------------------- */
  function renderSecurityPanel() {
    var panel = document.getElementById("panel-security");
    var auth = C.getAuthConfig();
    panel.querySelector("#secUsername").value = auth.username;

    panel.querySelector("#securityForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var newUser = panel.querySelector("#secUsername").value.trim();
      var currentPass = panel.querySelector("#secCurrentPass").value;
      var newPass = panel.querySelector("#secNewPass").value;
      var confirmPass = panel.querySelector("#secConfirmPass").value;
      var msgEl = panel.querySelector("#secMsg");
      var authNow = C.getAuthConfig();

      if (currentPass !== authNow.password) {
        msgEl.textContent = "Current password is incorrect.";
        msgEl.className = "form-msg error show";
        return;
      }
      if (!newUser) {
        msgEl.textContent = "Username can't be empty.";
        msgEl.className = "form-msg error show";
        return;
      }
      if (newPass && newPass.length < 6) {
        msgEl.textContent = "New password should be at least 6 characters.";
        msgEl.className = "form-msg error show";
        return;
      }
      if (newPass && newPass !== confirmPass) {
        msgEl.textContent = "New password and confirmation don't match.";
        msgEl.className = "form-msg error show";
        return;
      }

      C.setAuthConfig({ username: newUser, password: newPass || authNow.password });
      msgEl.textContent = "Login details updated. Use them next time you log in.";
      msgEl.className = "form-msg success show";
      panel.querySelector("#secCurrentPass").value = "";
      panel.querySelector("#secNewPass").value = "";
      panel.querySelector("#secConfirmPass").value = "";
    });
  }

})();
