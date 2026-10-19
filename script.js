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

  var demoQuestions = [
    {
      prompt: "Did you fuel around today's rehearsal?",
      options: ["Yes, properly", "A bit, not enough", "Skipped it"]
    },
    {
      prompt: "How's your energy this week?",
      options: ["Good", "Okay", "Low"]
    },
    {
      prompt: "Any changes to your cycle?",
      options: ["On time, as usual", "Late or lighter", "Not tracking it"]
    },
    {
      prompt: "Any niggles or injuries since last check-in?",
      options: ["None", "A niggle", "Something more"]
    }
  ];

  var demoStep = 0;
  var demoQuestionEl = document.getElementById('demoQuestion');
  var demoProgressEl = document.getElementById('demoProgress');
  var demoProgressDots = demoProgressEl ? demoProgressEl.querySelectorAll('span') : [];

  function renderDemoProgress() {
    demoProgressDots.forEach(function (dot, i) {
      dot.classList.remove('is-done', 'is-current');
      if (i < demoStep) dot.classList.add('is-done');
      else if (i === demoStep && demoStep < demoQuestions.length) dot.classList.add('is-current');
    });
  }

  function renderDemoQuestion() {
    renderDemoProgress();

    if (demoStep >= demoQuestions.length) {
      demoQuestionEl.innerHTML =
        '<div class="demo-result">' +
        '<div class="demo-result-badge">' +
        '<div class="dial"><div class="dial-inner">Steady</div></div>' +
        '<div><div class="label-caps" style="opacity:.85">Fuel balance</div><div>Well fuelled around training this week.</div></div>' +
        '</div>' +
        '<p>Long rehearsal tomorrow, so let\'s keep it that way. No numbers, just a plan.</p>' +
        '<p class="fine-print">Illustrative example. Your real check-in is reviewed over time, alongside your wearable data and, if you choose, your care team.</p>' +
        '<button type="button" class="demo-replay" id="demoReplay">Try the check-in again</button>' +
        '</div>';
      var replay = document.getElementById('demoReplay');
      if (replay) {
        replay.addEventListener('click', function () {
          demoStep = 0;
          renderDemoQuestion();
        });
      }
      return;
    }

    var q = demoQuestions[demoStep];
    var html = '<div class="demo-question"><h3>' + q.prompt + '</h3>';
    q.options.forEach(function (opt) {
      html += '<button type="button" class="answer-pill" data-opt="' + opt + '">' + opt + '</button>';
    });
    html += '</div>';
    if (demoStep > 0) {
      html += '<button type="button" class="demo-back" id="demoBack">Back</button>';
    }
    demoQuestionEl.innerHTML = html;

    var pills = demoQuestionEl.querySelectorAll('.answer-pill');
    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        demoStep += 1;
        renderDemoQuestion();
      });
    });
    var back = document.getElementById('demoBack');
    if (back) {
      back.addEventListener('click', function () {
        demoStep = Math.max(0, demoStep - 1);
        renderDemoQuestion();
      });
    }
  }

  if (demoQuestionEl) {
    renderDemoQuestion();
  }

  var wearableToggle = document.getElementById('wearableToggle');
  var wearableCard = wearableToggle ? wearableToggle.closest('.wearable-card') : null;
  var wearableNote = document.getElementById('wearableNote');

  if (wearableToggle) {
    wearableToggle.addEventListener('click', function () {
      var isOn = wearableToggle.classList.toggle('is-on');
      wearableToggle.setAttribute('aria-checked', String(isOn));
      if (wearableCard) wearableCard.classList.toggle('is-off', !isOn);
      if (wearableNote) {
        wearableNote.textContent = isOn
          ? 'Updates quietly in the background while you answer. No wearable? The check-in alone is enough.'
          : 'No wearable connected. That\'s completely fine, your check-in alone is enough to run.';
      }
    });
  }
})();
