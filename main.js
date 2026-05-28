  tailwind.config = {
    theme: {
      extend: {
        colors: {
          void:    '#0d0f13',
          surface: '#111318',
          panel:   '#161a22',
          border:  '#1e2330',
          muted:   '#2a3040',
          dim:     '#4a5568',
          ghost:   '#6b7891',
          soft:    '#94a3b8',
          blue:    '#c8ff47',
          blue:    '#6366f1',
          cyan:    '#47d9ff',
          amber:   '#ffb347',
          rose:    '#ff6b8a',
        },
        fontFamily: {
          display: ['Syne', 'sans-serif'],
          mono:    ['DM Mono', 'monospace'],
          serif:   ['Instrument Serif', 'serif'],
        },
      }
    }
  }

  // Custom cursor
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    cursor.style.transform = `translate(${mx-5}px,${my-5}px)`;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx-18}px,${ry-18}px)`;
    requestAnimationFrame(animCursor);
  }
  animCursor();

  // Typewriter
  const phrases = [
    'npx create-next-app@latest',
    'docker compose up --build',
    'git push origin main',
    'kubectl apply -f deployment.yml',
    'cargo run --release',
  ];
  let pi = 0, ci = 0, del = false;
  const tw = document.getElementById('typewriter');
  function typeNext() {
    const phrase = phrases[pi];
    if (!del) {
      tw.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { del = true; setTimeout(typeNext, 1800); return; }
    } else {
      tw.textContent = phrase.slice(0, --ci);
      if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(typeNext, del ? 40 : 70);
  }
  typeNext();

  // Intersection observer for reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.08 });
  reveals.forEach(el => io.observe(el));

  // Mobile menu
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
    document.getElementById('mobile-menu').classList.toggle('flex');
  });

  // Render tech tag strip
  const tags = ['Php','Laravel','Python','Django','WordPress', 'Webflow','Vue.js','Javascript','TypeScript','Redis','Docker', 'Celery', 'Tailwind CSS','Vite','GitHub Actions'];
  document.querySelectorAll('[id^="tags"]').forEach(() => {});
  const strip = document.querySelector('.flex.flex-wrap.justify-center.gap-3');
  if (strip) {
    strip.innerHTML = tags.map((t,i) =>
      `<span class="tag ${i%3===1?'tag-cyan':i%3===2?'tag-amber':''}">${t}</span>`
    ).join('');
  }
