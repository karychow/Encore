(function () {
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  navToggle.addEventListener('click', function () {
    var isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  primaryNav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  var rolePills = document.querySelectorAll('.role-pill');
  var roleField = document.getElementById('roleField');

  rolePills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      rolePills.forEach(function (p) {
        p.classList.remove('is-active');
        p.setAttribute('aria-checked', 'false');
      });
      pill.classList.add('is-active');
      pill.setAttribute('aria-checked', 'true');
      roleField.value = pill.dataset.role;
    });
  });

  var form = document.getElementById('waitlistForm');
  var emailRow = document.getElementById('emailRow');
  var joinedMsg = document.getElementById('joinedMsg');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('hero-email');
    if (!email.checkValidity()) {
      email.reportValidity();
      return;
    }
    try {
      var entries = JSON.parse(localStorage.getItem('encore_waitlist') || '[]');
      entries.push({ email: email.value, role: roleField.value, at: new Date().toISOString() });
      localStorage.setItem('encore_waitlist', JSON.stringify(entries));
    } catch (err) {}
    emailRow.hidden = true;
    joinedMsg.hidden = false;
  });
})();
