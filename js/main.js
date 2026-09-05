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
