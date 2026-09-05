(() => {
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-solid', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  /* Landmark work tabs */
  const tabs = [...document.querySelectorAll('[data-work-tab]')];
  const panels = [...document.querySelectorAll('[data-work-panel]')];
  const setWork = (i) => {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.workTab === String(i))));
    panels.forEach((p) => {
      const on = p.dataset.workPanel === String(i);
      p.hidden = !on;
      p.classList.toggle('is-active', on);
    });
  };
  tabs.forEach((t) => t.addEventListener('click', () => setWork(t.dataset.workTab)));
  tabs.forEach((t) => t.addEventListener('mouseenter', () => {
    if (window.matchMedia('(hover: hover)').matches) setWork(t.dataset.workTab);
  }));

  /* Practice accordion + image swap */
  const practiceImgs = [
    'assets/practice-design.jpg',
    'assets/construction.jpg',
    'assets/practice-digital.jpg',
    'assets/practice-advisory.jpg',
  ];
  const practiceItems = [...document.querySelectorAll('[data-practice-i]')];
  const practiceImg = document.querySelector('[data-practice-img]');
  practiceItems.forEach((item) => {
    item.addEventListener('click', () => {
      practiceItems.forEach((el) => {
        const on = el === item;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-expanded', String(on));
      });
      const i = Number(item.dataset.practiceI || 0);
      if (practiceImg) practiceImg.src = practiceImgs[i] || practiceImgs[0];
    });
  });

  /* Leadership bios — on-page modal */
  const LEADERS = {
    chakrapani: {
      name: 'R. V. Chakrapani',
      role: 'Managing Director',
      img: 'https://cdn.prod.website-files.com/68d289093e21650556f496a0/691580d182a97245e7ac82b1_aarvee-team-img-6.avif',
      bio: [
        'R. V. Chakrapani is the Founder and Managing Director of Aarvee and a respected leader in the global infrastructure consulting industry. An alumnus of the Indian Institute of Technology (IIT) Madras, he holds a Bachelor’s degree in Civil Engineering and a Master’s degree in Structural Engineering.',
        'Since founding Aarvee in 1989, Mr. Chakrapani has led its evolution from a small engineering practice into a globally recognised multidisciplinary infrastructure consultancy. His vision has been to build an organisation rooted in engineering excellence, innovation, and delivery integrity.',
        'Under his leadership, Aarvee has expanded across multiple infrastructure sectors while establishing a growing international presence across Australia, the United Kingdom, the Middle East, Africa, and Asia. He has received recognitions including the Outstanding Concrete Engineer Award by the India Concrete Institute and the Distinguished Alumnus Award from IIT Madras.',
      ],
    },
    venkatesh: {
      name: 'B. Venkateshwar Reddy',
      role: 'Director — Buildings, Irrigation, Geospatial & Power',
      img: 'https://cdn.prod.website-files.com/68d289093e21650556f496a0/691581304b1bab62036bc283_aarvee-team-img-5.avif',
      bio: [
        'Venkateshwar Reddy Banda is a Whole-time Director at Aarvee with over 36 years of experience in infrastructure consulting. He holds Bachelor’s and Master’s degrees in Technology from Jawaharlal Nehru Technological University, Hyderabad.',
        'As one of the earliest members of the organisation, he has been closely associated with Aarvee’s growth since its formative years, helping expand capabilities across multiple infrastructure sectors.',
        'He currently oversees buildings, irrigation, geospatial, urban infrastructure, and power — bringing holistic perspective to complex multidisciplinary programmes.',
      ],
    },
    kishore: {
      name: 'M. Kishore Kumar',
      role: 'Director — Highways',
      img: 'https://cdn.prod.website-files.com/68d289093e21650556f496a0/69158118d17c900e020e0948_aarvee-team-img-4.avif',
      bio: [
        'Mekala Kishore Kumar is a Whole-time Director at Aarvee with more than 38 years of experience in transportation infrastructure. He holds a Bachelor’s degree in Engineering from Nagpur University and has been associated with Aarvee since 2009.',
        'He leads Aarvee’s highways sector across design, project management, and operations assignments in India and international markets.',
        'Recognised for expertise in highway engineering and contract management, he is frequently invited to support institutional capacity building beyond Aarvee’s assignments.',
      ],
    },
    murthy: {
      name: 'M. Murthy',
      role: 'Director — Rail & Metro Rail',
      img: 'https://cdn.prod.website-files.com/68d289093e21650556f496a0/69158bc8ed45d0b4349577e3_aarvee-team-img-1.avif',
      bio: [
        'Malladi Murthy is a Whole-time Director at Aarvee with nearly four decades of experience in rail and infrastructure engineering. He holds a Bachelor’s degree from the College of Engineering, Kakinada, and a Master’s from IIT Madras.',
        'He leads Aarvee’s Rail and Transit sector, which has grown under his leadership into one of the organisation’s largest verticals, with expansion into ports, airports, and ropeways.',
        'Known for clarity of thought and openness to innovation, he is widely respected for mentorship and high-quality outcomes across complex programmes.',
      ],
    },
    sneha: {
      name: 'Sneha Redla',
      role: 'Director — Global Operations',
      img: 'https://cdn.prod.website-files.com/68d289093e21650556f496a0/69158bfce93d91a76b05b33f_aarvee-team-img-3.avif',
      bio: [
        'Sneha Redla represents the next generation of leadership at Aarvee, driving the company’s evolution into a globally integrated, technology-enabled infrastructure consultancy. She holds a Bachelor’s from Osmania University and a Master’s in Structural Engineering from the University of Illinois.',
        'She leads corporate strategy and international expansion across markets including Australia and the United Kingdom, while advancing platforms such as digital engineering, data centres, and airport infrastructure.',
        'Her leadership centres on positioning Aarvee for the future through global growth, multidisciplinary integration, and next-generation infrastructure solutions.',
      ],
    },
    anand: {
      name: 'Anand Mohan',
      role: 'Head — Water & Environment',
      img: 'https://cdn.prod.website-files.com/68d289093e21650556f496a0/69158c27f612c5bbf7b9eff3_aarvee-team-img-2.avif',
      bio: [
        'T. Anand Mohan heads Aarvee’s Water and Environment sector. He holds a Bachelor’s degree in Engineering from Osmania University, Hyderabad, and has been associated with Aarvee since 2017.',
        'Under his leadership, the division has expanded across water supply, wastewater, urban infrastructure, and environmental engineering — including major city-scale planning and project management engagements.',
        'With nearly three decades of experience across public and private projects in India and international markets, he strengthens Aarvee’s capabilities in sustainable infrastructure delivery.',
      ],
    },
  };

  const modal = document.getElementById('leader-modal');
  const modalImg = document.getElementById('modal-img');
  const modalRole = document.getElementById('modal-role');
  const modalName = document.getElementById('modal-name');
  const modalBio = document.getElementById('modal-bio');
  let lastFocus = null;

  const openModal = (id) => {
    const person = LEADERS[id];
    if (!person || !modal) return;
    lastFocus = document.activeElement;
    modalImg.src = person.img;
    modalImg.alt = person.name;
    modalRole.textContent = person.role;
    modalName.textContent = person.name;
    modalBio.innerHTML = person.bio.map((p) => `<p>${p}</p>`).join('');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
  };

  const closeModal = () => {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };

  window.__openLeader = openModal;
  document.querySelectorAll('[data-leader-id]').forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.leaderId));
  });
  modal?.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();
