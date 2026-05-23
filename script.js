/**
 * BUCCANEER LARP 2027: script.js
 * Interactive scripts for the Player Guide Site mockup
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navigation Active Link & Scroll Highlight
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Sound Control Toggle (Micro-interaction Mockup)
  const soundToggle = document.getElementById('ambient-toggle');
  let isSoundOn = false;

  soundToggle.addEventListener('click', () => {
    isSoundOn = !isSoundOn;
    const icon = soundToggle.querySelector('.sound-icon');
    const text = soundToggle.querySelector('.sound-text');

    if (isSoundOn) {
      icon.textContent = '🔔';
      text.textContent = 'SOUND ON';
      soundToggle.style.borderColor = '#d4af37';
      soundToggle.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.4)';
      // Web Audio API to play a beautiful crystal bell sound
      playBellSound();
    } else {
      icon.textContent = '🔕';
      text.textContent = 'SOUND OFF';
      soundToggle.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      soundToggle.style.boxShadow = 'none';
    }
  });

  // Web Audio API synthesizer for the bell sound (wow effect!)
  function playBellSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1200, audioCtx.currentTime); // High overtone

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 1.5);
      osc2.stop(audioCtx.currentTime + 1.5);
    } catch (e) {
      console.log('Audio Context not allowed or supported by browser.');
    }
  }

  // 3. Character Flip Cards Logic
  const charCards = document.querySelectorAll('.char-card');

  charCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

  // 4. Character Filtering Logic
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      charCards.forEach(card => {
        const tier = card.getAttribute('data-tier');

        // Reset flip state before filtering to avoid UI bugs
        card.classList.remove('flipped');

        if (filterValue === 'all') {
          card.classList.remove('hidden');
          // Animation trigger
          card.style.animation = 'fadeInUp 0.6s ease';
        } else if (filterValue === 'rich' && tier === 'rich') {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.6s ease';
        } else if (filterValue === 'middle' && tier === 'middle') {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.6s ease';
        } else if (filterValue === 'poor' && tier === 'poor') {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.6s ease';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 5. Interactive Checklist with LocalStorage
  const checklistItems = document.querySelectorAll('.checklist-item');

  // Load saved checked states
  checklistItems.forEach(item => {
    const itemId = item.getAttribute('id');
    const isChecked = localStorage.getItem(`buccaneer_checklist_${itemId}`) === 'true';

    if (isChecked) {
      item.classList.add('checked');
    }

    item.addEventListener('click', () => {
      item.classList.toggle('checked');
      const checkedState = item.classList.contains('checked');
      localStorage.setItem(`buccaneer_checklist_${itemId}`, checkedState);
    });
  });

});
