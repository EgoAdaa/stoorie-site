// Stoorie marketing site interactivity. Vanilla JS, no build step, no
// frameworks. Each init function is a no-op when its markup is not on the
// page, so this one file is safe to include on every page.
(function () {
  'use strict';

  // Public project URL + anon key (same as mobile/src/lib/supabase.ts). The
  // anon key is safe to ship client-side; RLS and per-function checks protect
  // the data. No Supabase auth session is ever created from this site.
  var SUPABASE_URL = 'https://guesmpqlggyeyfnlkktw.supabase.co';
  var SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1ZXNtcHFsZ2d5ZXlmbmxra3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzNTc4NTksImV4cCI6MjA5NjkzMzg1OX0.ApWMYY3DU0l7L_EDtSbGGaElblKllGRjkRSKhys5j-M';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  // ---- What to keep checklist ----------------------------------------------
  function initChecklist() {
    var items = document.querySelectorAll('.check-item');
    if (!items.length) return;
    var sub = document.querySelector('[data-tally-sub]');
    var count = document.querySelector('[data-score-count]');
    var word = document.querySelector('[data-score-word]');
    var ring = document.querySelector('[data-score-ring]');

    function update() {
      var n = document.querySelectorAll('.check-item.on').length;
      if (count) count.textContent = String(n);
      if (word) word.textContent = n === 1 ? 'example worth keeping' : 'examples worth keeping';
      if (ring) ring.style.background = 'conic-gradient(#638A35 ' + Math.round(n / items.length * 100) + '%, #DCDFCC 0)';
      if (sub) {
        sub.textContent = n === 0
          ? 'Tick the things that sound familiar. Most people have more evidence than they realise.'
          : 'These can become evidence for an appraisal, interview, CV update or promotion conversation.';
      }
    }
    items.forEach(function (item) {
      item.addEventListener('click', function () {
        item.classList.toggle('on');
        update();
      });
    });
    update();
  }

  // ---- Try Stoorie demo ------------------------------------------------------
  function initDemo() {
    var form = document.querySelector('[data-demo-form]');
    if (!form) return;
    var textarea = form.querySelector('textarea');
    var submitBtn = form.querySelector('[data-demo-submit]');
    var output = document.querySelector('[data-demo-output]');
    var micBtn = document.querySelector('[data-demo-mic]');
    var micNote = document.querySelector('[data-demo-mic-note]');
    var entry = document.querySelector('.demo-entry');
    var rail = document.querySelector('[data-demo-stage]');
    var examples = {
      problem: [
        'I work in a hospital team where the morning handover covers patients moving between wards. For several weeks the handover kept running late, and information was being repeated in different spreadsheets, emails and handwritten notes. Nobody owned the complete picture. This meant nurses were phoning around to confirm details that should already have been available, transport bookings were sometimes missed, and patients were waiting longer than necessary before they could move. People were frustrated, but everyone was busy and the workaround had become normal.',
        'I started by spending a week noting where the delays happened and asking the people involved what information they actually needed. I found that three teams were recording almost the same details in different formats. The most important fields were patient name, destination, clinical checks, medication, transport and the person responsible for the next action. I brought the three team leads together for twenty minutes and showed them the duplication. I suggested replacing the separate lists with one shared tracker that used those six fields and a simple red, amber and green status.',
        'I built a first version in the software we already had, so there was no cost or new login. I tested it with two handovers, watched how people used it and changed the wording where it caused confusion. I also added a short note at the top explaining who updated each field and when. A colleague was worried that another tracker would create more work, so I sat with her during the next handover and showed that the same update now covered all three teams. I then wrote a one page guide and asked the shift coordinators to raise any problems in the first fortnight.',
        'Within three weeks the morning handover was regularly finishing about twenty minutes earlier. Staff stopped maintaining the separate spreadsheets, missed transport bookings reduced, and the receiving ward could see what was outstanding without making extra calls. The tracker was adopted for the afternoon handover as well. My manager asked me to show the approach at the monthly operations meeting so another service could adapt it. Six weeks later I checked the tracker with the coordinators and confirmed that the new process was still being used without extra prompting. The main thing I learned was that the technical part was straightforward. The useful work was listening to what each team needed, making ownership visible and testing the change with the people who would use it.'
      ].join(' '),
      improved: [
        'I coordinate a small community programme that runs workshops with local schools. When I joined, bookings were managed through a mixture of email threads, calendar notes and a spreadsheet that only one person fully understood. Schools often sent the same information more than once, facilitators did not always receive changes to access requirements, and the team spent a lot of Friday afternoon checking the following week manually. We had not had a serious failure, but the process depended on people remembering details and it was getting harder as the programme grew.',
        'I mapped the booking journey from the first school enquiry to the feedback email after a session. I spoke to the programme manager, two facilitators and an administrator, then listed every decision and handoff. That showed we were asking schools for information in four separate messages and copying the answers into three places. I proposed one booking form, one central schedule and an automatic summary for the assigned facilitator. Before changing anything, I checked which information was genuinely necessary and removed questions that nobody used.',
        'I built the form and schedule using tools already covered by our organisation. I created required fields for dates, year group, contact details, accessibility, safeguarding arrangements and equipment. I added a status column so everyone could see whether a booking was awaiting confirmation, ready or complete. I then set up a short automatic email that sent the facilitator the confirmed brief five working days before delivery. To avoid disrupting live bookings, I ran the new process alongside the old one for a month. Each week I collected problems, adjusted the form and documented the final steps in plain language.',
        'After the trial, the team agreed to retire the old spreadsheet and email checklist. The administrator estimated that preparation for the weekly schedule had fallen from around three hours to less than one. Facilitators reported fewer last minute surprises because access and equipment needs appeared in the same place as the booking. Schools received fewer follow up emails, and the programme manager could see capacity without asking someone to produce a separate report. Over the next term we delivered more sessions without adding administrative hours. I also trained a colleague to maintain the process, so it did not become something only I understood. What made the improvement stick over time was treating it as a shared team workflow rather than simply introducing a new form.'
      ].join(' '),
      feedback: [
        'I was asked to present the first findings from a customer research project to senior colleagues. I had interviewed twelve customers and analysed support tickets, so I knew the material well, but it was my first time presenting directly to that group. I prepared a detailed deck covering the research method, individual themes and supporting quotes. The meeting was useful, but I ran over time and reached the recommendation with only a few minutes left. The director thanked me for the depth of the work, then said the main message was difficult to find because I had taken the audience through my entire process before telling them what decision I needed.',
        'My first reaction was disappointment because I had put a lot of care into being thorough. I asked the director if she could give me a specific example of where she lost the thread. She pointed to a section with eight slides of evidence and explained that the evidence was strong, but the group needed the conclusion first and the detail available for questions. I wrote down her feedback and asked two colleagues who attended what they had understood. Their answers confirmed that they remembered the customer quotes but were less clear about the priority action.',
        'For the next update I rebuilt the presentation around one sentence: customers were abandoning setup because the instructions assumed knowledge they did not have. I opened with that finding, showed the impact, proposed three changes and then used only the strongest evidence for each one. I moved the research method and additional quotes into an appendix. I also rehearsed with a colleague who knew nothing about the project. Every time she asked what a slide meant, I simplified it. I timed the presentation at twelve minutes so there would be space for discussion.',
        'At the second meeting, the group understood the recommendation quickly and approved a trial of the revised setup guidance. The director commented that the presentation was much clearer and that I had responded thoughtfully to the earlier feedback. Two weeks later she asked me to help another team structure an evidence based update. The product trial subsequently reduced the number of setup related support tickets during its first month. I kept both versions of the deck and the notes from the conversation because they show more than a polished final presentation. They show that I sought clarification, separated useful feedback from my initial emotional reaction, changed my approach and produced a clearer decision for the audience.'
      ].join(' '),
      result: [
        'Our charity planned a public information event for families who were struggling to access local support. I was responsible for coordinating partners, communications and the event schedule. The original target was to bring together six organisations and attract at least eighty visitors. Four weeks before the event, two partners withdrew because of staffing problems, advance registrations were low and the venue told us that one of the rooms would no longer be available. Cancelling would have damaged trust with the families who had registered, but continuing with the original format would have left obvious gaps.',
        'I reviewed what people had said they wanted from the event rather than trying to preserve every planned activity. The strongest need was a simple way to speak privately with advisers and understand which service to contact next. I contacted the remaining partners individually, explained the changed situation and asked what they could realistically provide. Together we replaced the separate presentations with a shared advice area and shorter rotating sessions. I negotiated use of the venue foyer at no extra cost, redrew the floor plan and created a timed schedule so specialist staff could cover more than one topic without clashing.',
        'To improve attendance, I rewrote the promotional message in plain language and focused on what families could leave with, rather than listing organisations. I gave schools, community groups and housing officers a short message they could forward directly. I also set up a telephone registration option for people who were not comfortable with the online form. During the final week I held fifteen minute daily check ins, kept one live action list and confirmed accessibility, safeguarding and translation arrangements. On the day, I briefed volunteers before the doors opened and assigned one person to monitor queues so we could move advisers when demand changed.',
        'The event went ahead with nine participating services because three smaller organisations joined the shared format. One hundred and thirty seven people attended, including fifty two who had not registered in advance. Every family who requested a private conversation was seen, and the average wait stayed below fifteen minutes. Feedback forms showed that most respondents left knowing which service to contact next. Three partner organisations asked to repeat the shared advice model, and the venue offered us the same space for a follow up event. My manager used the attendance and feedback figures in the funding report and asked me to document the revised format. The result mattered, but so did how it was achieved: I narrowed the event to its real purpose, rebuilt the plan with partners and kept delivery controlled when several original assumptions had changed.'
      ].join(' ')
    };

    function setStage(stage) {
      if (!rail) return;
      rail.setAttribute('data-demo-stage', String(stage));
      rail.querySelectorAll('.stage-node').forEach(function (node, i) {
        node.classList.toggle('done', i < stage);
        node.classList.toggle('active', i === stage);
      });
    }

    function showOutput() {
      if (entry) entry.hidden = true;
      output.hidden = false;
    }

    function showEntry() {
      if (entry) entry.hidden = false;
      output.hidden = true;
      setStage(0);
    }

    document.querySelectorAll('[data-example]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        textarea.value = examples[chip.getAttribute('data-example')] || '';
        textarea.focus();
      });
    });

    if (micBtn) {
      micBtn.addEventListener('click', function () {
        if (micNote) micNote.textContent = 'The microphone works in the Stoorie app. For this demonstration, type it in here.';
      });
    }

    function renderLoading() {
      showOutput();
      setStage(1);
      output.innerHTML = '<div class="demo-loading"><div class="demo-loading-bars"><i></i><i></i><i></i><i></i><i></i></div><span>Organising what you said into an example...</span></div>';
    }
    function renderError(msg) {
      showOutput();
      output.innerHTML = '<div class="demo-error">' + escapeHtml(msg) + '</div>';
    }
    function keepCta() {
      return '<div class="keep-cta">' +
        '<a class="pill pill-act" href="download.html">Keep examples like this in Stoorie</a>' +
        '<button type="button" class="text-btn" data-try-another>Try another example</button>' +
        '</div>';
    }
    function renderResult(data) {
      setStage(2);
      if (data.mode === 'note') {
        var message = data.message ||
          'There is not enough detail here to shape a useful example yet. Add what happened, what you did and what changed, then try again.';
        var html = '<div class="result-block"><p>' + escapeHtml(message) + '</p></div>';
        html += keepCta();
        output.innerHTML = html;
      } else {
        var out = '<div class="result-success"><span>&#10003;</span>Kept as an example you can return to</div><div class="result-grid">';
        out += block('What happened', data.happened);
        out += block('What you did', data.did);
        out += block('What changed', data.changed);
        out += block(data.shows_label || 'Why keep this', data.shows);
        out += '</div>' + keepCta();
        output.innerHTML = out;
      }
      var again = output.querySelector('[data-try-another]');
      if (again) again.addEventListener('click', function () {
        textarea.value = '';
        showEntry();
      });
    }
    function block(label, text) {
      return '<div class="result-block"><span class="rlabel">' + escapeHtml(label) + '</span><p>' + escapeHtml(text || '') + '</p></div>';
    }
    function escapeHtml(s) {
      var d = document.createElement('div');
      d.textContent = String(s == null ? '' : s);
      return d.innerHTML;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = (textarea.value || '').trim();
      if (text.length < 8) {
        renderError('Add a sentence or two about something you did, then try again.');
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Working...';
      renderLoading();
      fetch(SUPABASE_URL + '/functions/v1/public-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ text: text }),
      })
        .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, body: j }; }); })
        .then(function (r) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'See what this shows <span aria-hidden="true">&#8594;</span>';
          if (!r.ok) {
            renderError(r.body && r.body.error ? r.body.error : 'Something went wrong organising that. Please try again in a moment.');
            return;
          }
          renderResult(r.body);
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'See what this shows <span aria-hidden="true">&#8594;</span>';
          renderError('Something went wrong organising that. Please try again in a moment.');
        });
    });

    showEntry();
  }

  // ---- Contact form ----------------------------------------------------------
  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;
    var card = form.closest('.contact-form');
    var errorEl = form.querySelector('[data-contact-error]');
    var submitBtn = form.querySelector('[data-contact-submit]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var message = form.querySelector('[name="message"]').value.trim();
      var company = form.querySelector('[name="company"]').value;
      if (errorEl) errorEl.textContent = '';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      fetch(SUPABASE_URL + '/functions/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ name: name, email: email, message: message, company: company }),
      })
        .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, body: j }; }); })
        .then(function (r) {
          if (!r.ok) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send message';
            if (errorEl) errorEl.textContent = r.body && r.body.error ? r.body.error : 'Something went wrong sending that. Please try again in a moment.';
            return;
          }
          if (card) {
            card.innerHTML = '<div class="form-success">' +
              '<span class="check"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg></span>' +
              '<h3>Thank you. Your message is on its way.</h3>' +
              '<p>We will reply to the email address you gave us as soon as we can.</p>' +
              '</div>';
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send message';
          if (errorEl) errorEl.textContent = 'Something went wrong sending that. Please try again in a moment.';
        });
    });
  }

  ready(function () {
    initChecklist();
    initDemo();
    initContactForm();
  });
})();
