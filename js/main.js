(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav?.querySelectorAll('.nav-item').forEach((item) => {
    const label = item.querySelector('.nav-label');
    if (!label || !item.querySelector('.nav-dropdown')) return;
    label.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 980px)').matches) {
        e.preventDefault();
        item.classList.toggle('is-open');
      }
    });
  });

  nav?.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 980px)').matches) {
        nav.classList.remove('is-open');
        header.classList.remove('menu-open');
        toggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });


  /* Timed hero slides + collapsible story video */
  (() => {
    const root = document.querySelector('[data-hero]');
    if (!root) return;

    const slides = [...root.querySelectorAll('[data-hero-slide]')];
    const thumbs = [...root.querySelectorAll('[data-hero-goto]')];
    const titleEl = root.querySelector('[data-hero-title]');
    const ledeEl = root.querySelector('[data-hero-lede]');
    const story = root.querySelector('[data-hero-story]');
    const storyVideo = root.querySelector('[data-hero-story-video]');
    const storyTag = root.querySelector('[data-hero-story-tag]');
    const storyTitle = root.querySelector('[data-hero-story-title]');
    const DURATION = 6500;
    root.style.setProperty('--hero-duration', `${DURATION}ms`);
    const indexEl = root.querySelector('[data-hero-index]');
    const metricValues = [...root.querySelectorAll('[data-metric-value]')];
    const metricLabels = [...root.querySelectorAll('[data-metric-label]')];

    const formatNum = (n, format) => {
      if (format === 'km') return Math.round(n).toLocaleString('en-IN');
      return Math.round(n).toLocaleString('en-IN');
    };

    const animateMetric = (el, to, suffix, format, duration = 900) => {
      const start = performance.now();
      const from = 0;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = from + (to - from) * eased;
        el.textContent = formatNum(val, format) + (suffix || '');
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = formatNum(to, format) + (suffix || '');
      };
      requestAnimationFrame(tick);
    };

    const applyMetrics = (metrics) => {
      metrics.forEach((m, i) => {
        const el = metricValues[i];
        const label = metricLabels[i];
        if (!el) return;
        const parent = el.closest('.hero-metric');
        parent?.classList.remove('is-swap');
        void parent?.offsetWidth;
        parent?.classList.add('is-swap');
        if (label) label.textContent = m.label;
        if (m.text) {
          el.textContent = m.text;
          return;
        }
        if (reduceMotion) el.textContent = formatNum(m.to, m.format) + (m.suffix || '');
        else animateMetric(el, m.to, m.suffix || '', m.format || 'int');
      });
    };


    const COPY = [
      {
        title: 'Engineering infrastructure for nations &amp; generations.',
        lede: 'Technically robust design and end-to-end project management — engineered to perform on site.',
        tag: 'Rail & Metro',
        story: 'Corridors that carry nations',
        index: '01 / 04 · Rail',
        metrics: [
          { to: 4000, suffix: '+', label: 'Employees' },
          { to: 35, suffix: '+', label: 'Years' },
          { to: 20, suffix: '+', label: 'Countries' },
          { to: 20000, suffix: ' km', label: 'Railway lines designed', format: 'km' },
        ],
      },
      {
        title: 'Highways and bridges built to be delivered.',
        lede: 'From metropolitan ring roads to long-span crossings — design that survives site reality.',
        tag: 'Highways & Bridges',
        story: 'Systems that move cities',
        index: '02 / 04 · Highways',
        metrics: [
          { to: 4000, suffix: '+', label: 'Employees' },
          { to: 35, suffix: '+', label: 'Years' },
          { to: 20, suffix: '+', label: 'Countries' },
          { text: 'ORR', label: 'Hyderabad Outer Ring Road · Detailed Design' },
        ],
      },
      {
        title: 'Ports and logistics that keep trade flowing.',
        lede: 'Deep-water berths, terminals and multimodal links engineered for operational reliability.',
        tag: 'Ports & Logistics',
        story: 'Gateways for national trade',
        index: '03 / 04 · Ports',
        metrics: [
          { to: 4000, suffix: '+', label: 'Employees' },
          { to: 35, suffix: '+', label: 'Years' },
          { to: 20, suffix: '+', label: 'Countries' },
          { text: 'Ports', label: 'Vizag · Kandla · Krishnapatnam programmes' },
        ],
      },
      {
        title: 'Water systems that feed regions and cities.',
        lede: 'Lift irrigation and multipurpose programmes shaped by multidisciplinary judgement.',
        tag: 'Irrigation & Water',
        story: 'Water systems that endure',
        index: '04 / 04 · Water',
        metrics: [
          { to: 4000, suffix: '+', label: 'Employees' },
          { to: 35, suffix: '+', label: 'Years' },
          { to: 20, suffix: '+', label: 'Countries' },
          { text: 'Lift', label: 'Kaleshwaram · basin-scale irrigation' },
        ],
      },
    ];

    let index = 0;
    let timer = null;
    let storyOpen = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setSlide = (i, { restart = true } = {}) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((slide, n) => {
        const on = n === index;
        slide.classList.toggle('is-active', on);
        slide.hidden = !on;
      });
      thumbs.forEach((thumb, n) => {
        const on = n === index;
        thumb.classList.toggle('is-active', on);
        thumb.setAttribute('aria-selected', String(on));
        const bar = thumb.querySelector('.hero-thumb-progress i');
        if (bar) {
          bar.style.animation = 'none';
          // reflow to restart CSS animation
          void bar.offsetWidth;
          if (on && restart && !storyOpen && !reduceMotion) {
            bar.style.animation = '';
          }
        }
      });
      const copy = COPY[index];
      if (titleEl) titleEl.innerHTML = copy.title;
      if (ledeEl) ledeEl.textContent = copy.lede;
      if (indexEl) indexEl.textContent = copy.index || '';
      if (copy.metrics) applyMetrics(copy.metrics);
      if (restart && !storyOpen && !reduceMotion) armTimer();
    };

    const armTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setSlide(index + 1), DURATION);
    };

    const pause = () => {
      clearTimeout(timer);
      root.classList.add('is-paused');
    };
    const resume = () => {
      root.classList.remove('is-paused');
      if (!storyOpen && !reduceMotion) armTimer();
      // restart progress visual
      const bar = thumbs[index]?.querySelector('.hero-thumb-progress i');
      if (bar && !reduceMotion) {
        bar.style.animation = 'none';
        void bar.offsetWidth;
        bar.style.animation = '';
      }
    };

    const storyFrame = root.querySelector('[data-hero-story-frame]');
    const HERO_REEL_URL = 'https://www.instagram.com/reel/DVgR_j_D9HD/';
    const HERO_REEL_EMBED = 'https://www.instagram.com/reel/DVgR_j_D9HD/embed/?cr=1&v=14&wp=400';
    const openStory = () => {
      const copy = COPY[index];
      if (!story) return;
      pause();
      storyOpen = true;
      root.classList.add('story-open');
      story.hidden = false;
      if (storyTag) storyTag.textContent = 'Instagram · @aarvee_engg';
      if (storyTitle) storyTitle.textContent = (copy && copy.story) || 'Aarvee story';
      const ig = story.querySelector('[data-hero-story-ig]');
      if (ig) ig.href = HERO_REEL_URL;
      // Instagram often plays audio in iframes while hiding video — open the real reel,
      // and still mount the embed for viewers where Instagram allows it.
      if (storyFrame) {
        storyFrame.src = 'about:blank';
        requestAnimationFrame(() => { storyFrame.src = HERO_REEL_EMBED; });
      }
      window.open(HERO_REEL_URL, '_blank', 'noopener,noreferrer');
      root.querySelector('[data-hero-story-close]')?.focus();
    };

    const closeStory = () => {
      if (!story) return;
      storyOpen = false;
      story.hidden = true;
      root.classList.remove('story-open');
      if (storyFrame) storyFrame.src = 'about:blank';
      resume();
    };

    root.querySelector('[data-hero-watch]')?.addEventListener('click', openStory);
    story.querySelectorAll('[data-hero-story-close]')?.forEach((btn) => {
      btn.addEventListener('click', closeStory);
    });
    story?.addEventListener('click', (e) => {
      if (e.target === story) closeStory();
    });
    root.querySelector('[data-hero-prev]')?.addEventListener('click', () => {
      closeStory();
      setSlide(index - 1);
    });
    root.querySelector('[data-hero-next]')?.addEventListener('click', () => {
      closeStory();
      setSlide(index + 1);
    });
    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        closeStory();
        setSlide(Number(thumb.dataset.heroGoto || 0));
      });
    });

    root.addEventListener('mouseenter', () => { if (!storyOpen) pause(); });
    root.addEventListener('mouseleave', () => { if (!storyOpen) resume(); });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && storyOpen) closeStory();
    });

    setSlide(0);
  })();

  try {
  // Project spotlights
  const stageImgs = [...document.querySelectorAll('[data-spotlight-image]')];
  const stageCaption = document.querySelector('[data-spotlight-caption]');
  const listBtns = [...document.querySelectorAll('[data-spotlight]')];
  const activateSpotlight = (id) => {
    const btn = listBtns.find((b) => b.dataset.spotlight === id);
    if (!btn) return;
    listBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
    stageImgs.forEach((img) => img.classList.toggle('is-active', img.dataset.spotlightImage === id));
    if (stageCaption) {
      const tag = stageCaption.querySelector('.tag');
      const title = stageCaption.querySelector('h3');
      const desc = stageCaption.querySelector('[data-spotlight-desc]') || stageCaption.querySelectorAll('p')[1];
      if (tag) tag.textContent = btn.dataset.tag || '';
      if (title) title.textContent = btn.dataset.title || '';
      if (desc) desc.textContent = btn.dataset.desc || '';
    }
  };
  listBtns.forEach((btn) => {
    const go = () => activateSpotlight(btn.dataset.spotlight);
    btn.addEventListener('mouseenter', go);
    btn.addEventListener('focus', go);
    btn.addEventListener('click', go);
  });
  if (listBtns[0]) activateSpotlight(listBtns[0].dataset.spotlight);

  // Services
  const serviceVisual = document.querySelector('[data-service-visual]');
  const serviceCaption = document.querySelector('[data-service-caption]');
  document.querySelectorAll('.service-tab').forEach((tab) => {
    tab.querySelector('button')?.addEventListener('click', () => {
      document.querySelectorAll('.service-tab').forEach((t) => t.classList.remove('is-open'));
      tab.classList.add('is-open');
      if (serviceVisual && tab.dataset.image) {
        serviceVisual.src = tab.dataset.image;
        if (serviceCaption) serviceCaption.textContent = tab.dataset.caption || '';
      }
    });
  });


  } catch (err) { console.error(err); }

  const LEADERS = {
  "chakrapani": {
    "name": "R. V. Chakrapani",
    "role": "Managing Director",
    "image": "https://cdn.prod.website-files.com/68d289093e21650556f496a0/691580d182a97245e7ac82b1_aarvee-team-img-6.avif",
    "bio": [
      "R. V. Chakrapani is the Founder and Managing Director of Aarvee and a respected leader in the global infrastructure consulting industry. An alumnus of the Indian Institute of Technology (IIT) Madras, he holds a Bachelor’s degree in Civil Engineering and a Master’s degree in Structural Engineering.",
      "Since founding Aarvee in 1989, Mr. Chakrapani has led its evolution from a small engineering practice into a globally recognised multidisciplinary infrastructure consultancy. His vision has been to build an organisation rooted in engineering excellence, innovation, and delivery integrity.",
      "He has received several recognitions including the Outstanding Concrete Engineer Award by the India Concrete Institute and the Distinguished Alumnus Award from IIT Madras."
    ]
  },
  "venkatesh": {
    "name": "B. Venkateshwar Reddy",
    "role": "Director — Buildings, Irrigation, Geospatial & Power",
    "image": "https://cdn.prod.website-files.com/68d289093e21650556f496a0/691581304b1bab62036bc283_aarvee-team-img-5.avif",
    "bio": [
      "Venkateshwar Reddy Banda is a Whole-time Director at Aarvee with over 36 years of experience in infrastructure consulting. He holds Bachelor’s and Master’s degrees in Technology from Jawaharlal Nehru Technological University, Hyderabad.",
      "As one of the earliest members of the organisation, he has been closely associated with Aarvee’s growth since its formative years, helping expand capabilities across multiple infrastructure sectors.",
      "He currently oversees buildings, irrigation, geospatial, urban infrastructure, and power."
    ]
  },
  "kishore": {
    "name": "M. Kishore Kumar",
    "role": "Director — Highways",
    "image": "https://cdn.prod.website-files.com/68d289093e21650556f496a0/69158118d17c900e020e0948_aarvee-team-img-4.avif",
    "bio": [
      "Mekala Kishore Kumar is a Whole-time Director at Aarvee with more than 38 years of experience in transportation infrastructure. He holds a Bachelor’s degree in Engineering from Nagpur University and has been associated with Aarvee since 2009.",
      "He leads Aarvee’s highways sector, overseeing design, project management, and operations and maintenance assignments across India and international markets.",
      "Recognised for highway engineering and contract management, he brings deep insight into project execution, dispute resolution, and claims management."
    ]
  },
  "murthy": {
    "name": "M. Murthy",
    "role": "Director — Rail & Metro Rail",
    "image": "https://cdn.prod.website-files.com/68d289093e21650556f496a0/69158bc8ed45d0b4349577e3_aarvee-team-img-1.avif",
    "bio": [
      "Malladi Murthy is a Whole-time Director at Aarvee with nearly four decades of experience in rail and infrastructure engineering. He holds a Bachelor’s degree in Engineering from the College of Engineering, Kakinada, and a Master’s degree from IIT Madras.",
      "He leads Aarvee’s Rail and Transit sector, which has grown under his leadership into one of the organisation’s largest business verticals, expanding into ports, airports, and ropeways.",
      "He is widely respected for mentorship and high-quality outcomes across complex infrastructure programmes."
    ]
  },
  "sneha": {
    "name": "Sneha Redla",
    "role": "Director — Global Operations",
    "image": "https://cdn.prod.website-files.com/68d289093e21650556f496a0/69158bfce93d91a76b05b33f_aarvee-team-img-3.avif",
    "bio": [
      "Sneha Redla represents the next generation of leadership at Aarvee, driving the company’s strategic evolution into a globally integrated, technology-enabled infrastructure consultancy. She holds a Bachelor’s degree in Engineering from Osmania University and a Master’s in Structural Engineering from the University of Illinois.",
      "She leads corporate strategy and international expansion across Australia and the United Kingdom, while advancing digital engineering, data centres, and airport infrastructure.",
      "Her leadership centres on positioning Aarvee for the future through global growth and multidisciplinary integration."
    ]
  },
  "anand": {
    "name": "Anand Mohan",
    "role": "Head — Water & Environment",
    "image": "https://cdn.prod.website-files.com/68d289093e21650556f496a0/69158c27f612c5bbf7b9eff3_aarvee-team-img-2.avif",
    "bio": [
      "T. Anand Mohan heads Aarvee’s Water and Environment sector, one of the organisation’s fastest-growing business verticals. He holds a Bachelor’s degree in Engineering from Osmania University, Hyderabad, and has been associated with Aarvee since 2017.",
      "Under his leadership, the division has delivered large-scale programmes across water supply, wastewater, urban infrastructure, and environmental engineering.",
      "With nearly three decades of experience across India and international markets, he brings strong technical expertise and integrated project delivery insight."
    ]
  }
};

  const modal = document.querySelector('[data-leader-modal]');
  const modalImg = modal?.querySelector('[data-modal-img]');
  const modalRole = modal?.querySelector('[data-modal-role]');
  const modalName = modal?.querySelector('[data-modal-name]');
  const modalBio = modal?.querySelector('[data-modal-bio]');

  const openModal = (id) => {
    const person = LEADERS[id];
    if (!modal || !person) return;
    modalImg.src = person.image;
    modalImg.alt = person.name;
    modalRole.textContent = person.role;
    modalName.textContent = person.name;
    modalBio.innerHTML = person.bio.map((p) => `<p>${p}</p>`).join('');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
  };

  const closeModal = () => {
    modal?.classList.remove('is-open');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  window.__openLeader = openModal;
  document.querySelectorAll('[data-leader-id]').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.leaderId));
  });
  modal?.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });



  /* Sector-tagged proof media (YouTube long + Instagram short hub) */
  (() => {
    const grid = document.querySelector('[data-media-grid]');
    const lightbox = document.querySelector('[data-media-lightbox]');
    const frame = document.querySelector('[data-media-lightbox-frame]');
    if (!grid) return;

    const FALLBACK = null; // loaded from JSON
    let items = [];
    let sector = 'all';
    let format = 'all';

    const sectorLabel = {
      rail: 'Rail & Metro',
      highways: 'Highways & Bridges',
      irrigation: 'Irrigation',
      urban: 'Urban',
      people: 'People',
      brand: 'Brand',
    };

    const render = () => {
      const filtered = items.filter((item) => {
        const sOk = sector === 'all' || item.sector === sector;
        const fOk = format === 'all' || item.format === format;
        return sOk && fOk;
      });
      grid.innerHTML = filtered.map((item) => {
        const isIg = item.source === 'instagram';
        const badge = item.format === 'short' ? 'Short' : 'Long';
        const play = isIg
          ? `<a class="media-card" href="${item.url}" target="_blank" rel="noopener" data-sector="${item.sector}" data-format="${item.format}">`
          : `<button type="button" class="media-card" data-media-play="${item.youtubeId}" data-sector="${item.sector}" data-format="${item.format}" data-title="${item.title.replace(/"/g, '&quot;')}" data-blurb="${(item.blurb || '').replace(/"/g, '&quot;')}">`;
        const close = isIg ? '</a>' : '</button>';
        return `
          ${play}
            <div class="media-card-thumb">
              <div class="media-badges">
                <span class="media-badge format-${item.format}">${badge}</span>
                <span class="media-badge">${isIg ? 'Instagram' : 'YouTube'}</span>
              </div>
              <img src="${item.thumb}" alt="" loading="lazy" />
              <span class="play" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z"/></svg></span>
            </div>
            <div class="media-card-body">
              <span class="sector">${sectorLabel[item.sector] || item.sector}</span>
              <strong>${item.title}</strong>
              <p>${item.blurb || ''}</p>
            </div>
          ${close}`;
      }).join('') || '<p class="media-empty">No films in this filter — try All.</p>';
    };

    const openLightbox = (id, title, blurb, sec) => {
      if (!lightbox || !frame || !id) return;
      frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      lightbox.querySelector('[data-media-lightbox-sector]').textContent = sectorLabel[sec] || sec || '';
      lightbox.querySelector('[data-media-lightbox-title]').textContent = title || '';
      lightbox.querySelector('[data-media-lightbox-blurb]').textContent = blurb || '';
      lightbox.hidden = false;
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('[data-media-lightbox-close]')?.focus();
    };

    const closeLightbox = () => {
      if (!lightbox) return;
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      if (frame) frame.src = '';
      document.body.style.overflow = '';
    };

    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-media-play]');
      if (!btn) return;
      openLightbox(btn.dataset.mediaPlay, btn.dataset.title, btn.dataset.blurb, btn.dataset.sector);
    });

    document.querySelectorAll('[data-media-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        sector = btn.dataset.mediaFilter;
        document.querySelectorAll('[data-media-filter]').forEach((b) => b.classList.toggle('is-active', b === btn));
        render();
      });
    });
    document.querySelectorAll('[data-media-format]').forEach((btn) => {
      btn.addEventListener('click', () => {
        format = btn.dataset.mediaFormat;
        document.querySelectorAll('[data-media-format]').forEach((b) => b.classList.toggle('is-active', b === btn));
        render();
      });
    });

    document.querySelectorAll('[data-jump-media]').forEach((a) => {
      a.addEventListener('click', () => {
        const s = a.dataset.jumpMedia;
        const filterBtn = document.querySelector(`[data-media-filter="${s}"]`);
        if (filterBtn) filterBtn.click();
      });
    });

    lightbox?.querySelectorAll('[data-media-lightbox-close]').forEach((el) => el.addEventListener('click', closeLightbox));
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
    });

    const boot = (data) => {
      items = data.items || [];
      render();
      // honor hash like #media? not needed; support ? already via jump
      const params = new URLSearchParams(location.search);
      const s = params.get('sector');
      if (s) {
        const filterBtn = document.querySelector(`[data-media-filter="${s}"]`);
        filterBtn?.click();
      }
    };

    fetch('data/media-catalog.json')
      .then((r) => r.json())
      .then(boot)
      .catch(() => {
        // inline minimal fallback if fetch fails on file://
        boot({ items: [] });
        grid.innerHTML = `<p>Open via local server to load the media library. Meanwhile: <a href="https://www.instagram.com/aarvee_engg/reels/" target="_blank" rel="noopener">Instagram Reels</a> · <a href="https://www.youtube.com/@aarvee_engg" target="_blank" rel="noopener">YouTube</a></p>`;
      });
  })();


  document.querySelector('.cta-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = e.currentTarget.querySelector('.form-note');
    if (note) note.textContent = 'Thanks — prototype form only. Email aarvee@aarvee.net for real enquiries.';
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach((el) => el.classList.add('is-in'));
})();
