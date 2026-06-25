/* ═══════════════════════════════════════════════════════════════
   ANUP DAS — PORTFOLIO JAVASCRIPT
   All animations, dynamic content, and interactions
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── LOADER ───
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 800);
  });

  // ─── NAVBAR ───
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = navLinks.querySelectorAll('a');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navAnchors.forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Active link tracking
  const sections = document.querySelectorAll('.section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      const top = s.offsetTop - 120;
      if (window.scrollY >= top) current = s.getAttribute('id');
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });

  // ─── BACK TO TOP ───
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── HERO SOCIAL ICONS — POP IN ───
  const socialIcons = document.querySelectorAll('.hero-social a');
  setTimeout(() => {
    socialIcons.forEach((icon, i) => {
      setTimeout(() => icon.classList.add('pop-in'), 1200 + i * 200);
    });
  }, 0);

  // ═══════════════════════════════════════════════════════════════
  // INTERSECTION OBSERVER — SCROLL ANIMATIONS
  // ═══════════════════════════════════════════════════════════════

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  // Generic animate-in observer
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        animateObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // About section
  const aboutPhoto = document.getElementById('aboutPhoto');
  const aboutText = document.getElementById('aboutText');
  const missionCard = document.getElementById('missionCard');
  const visionCard = document.getElementById('visionCard');
  [aboutPhoto, aboutText, missionCard, visionCard].forEach(el => {
    if (el) animateObserver.observe(el);
  });

  // Experience cards
  document.querySelectorAll('.exp-card').forEach(card => animateObserver.observe(card));

  // Experience bullet stagger
  const expBulletObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bullets = entry.target.querySelectorAll('li');
        bullets.forEach((li, i) => {
          setTimeout(() => li.classList.add('animate-in'), 150 * i);
        });
        expBulletObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.exp-right').forEach(el => expBulletObserver.observe(el));

  // Education cards
  document.querySelectorAll('.edu-card').forEach(card => animateObserver.observe(card));

  // Education typewriter bullets
  const eduBulletObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bullets = entry.target.querySelectorAll('li');
        bullets.forEach((li, i) => {
          setTimeout(() => li.classList.add('typewriter-in'), 120 * i);
        });
        eduBulletObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.edu-right').forEach(el => eduBulletObserver.observe(el));

  // Project cards
  document.querySelectorAll('.project-card').forEach(card => animateObserver.observe(card));

  // Outcome boxes pop-in
  const outcomeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const boxes = entry.target.querySelectorAll('.outcome-box');
        boxes.forEach((box, i) => {
          setTimeout(() => box.classList.add('pop-in'), 200 * i);
        });
        outcomeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.project-outcomes').forEach(el => outcomeObserver.observe(el));

  // Tech pill bounce-in
  const techPillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pills = entry.target.querySelectorAll('.tech-pill');
        pills.forEach((pill, i) => {
          setTimeout(() => pill.classList.add('bounce-in'), 80 * i);
        });
        techPillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.project-tech').forEach(el => techPillObserver.observe(el));

  // Skill categories — grid wave
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.skill-category');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('animate-in');
            // Animate bars
            card.querySelectorAll('.skill-bar-fill').forEach(bar => {
              const target = bar.getAttribute('data-percent');
              bar.style.width = target + '%';
            });
            // Animate counters
            card.querySelectorAll('.skill-percent').forEach(counter => {
              const target = parseInt(counter.getAttribute('data-target'));
              animateCounter(counter, 0, target, 1000);
            });
          }, 100 * i);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) skillObserver.observe(skillsGrid);

  // Certification cards — waterfall
  const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.cert-card');
        cards.forEach((card, i) => {
          const randomRot = (Math.random() * 4 - 2).toFixed(1);
          card.style.setProperty('--random-rot', randomRot + 'deg');
          setTimeout(() => card.classList.add('animate-in'), 150 * i);
        });
        certObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  const certGrid = document.getElementById('certGrid');
  if (certGrid) certObserver.observe(certGrid);

  // Achievement cards
  document.querySelectorAll('.ach-card').forEach(card => animateObserver.observe(card));

  // Stat counters
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, 0, target, 1500);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const achievementStats = document.getElementById('achievementStats');
  if (achievementStats) statObserver.observe(achievementStats);

  // Contact panels
  const contactFormPanel = document.getElementById('contactFormPanel');
  const contactInfoPanel = document.getElementById('contactInfoPanel');
  if (contactFormPanel) animateObserver.observe(contactFormPanel);
  if (contactInfoPanel) animateObserver.observe(contactInfoPanel);

  // Send button pulse after form animates
  const contactSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          const btn = document.getElementById('btnSend');
          if (btn) btn.classList.add('pulse-once');
        }, 1200);
        contactSectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  if (contactFormPanel) contactSectionObserver.observe(contactFormPanel);

  // ═══════════════════════════════════════════════════════════════
  // UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  function animateCounter(el, start, end, duration) {
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * (end - start) + start) + (end > 5 ? '+' : '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ═══════════════════════════════════════════════════════════════
  // CERTIFICATION MOUSE-FOLLOW TILT
  // ═══════════════════════════════════════════════════════════════

  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.cert-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const tiltX = ((x / rect.width) - 0.5) * 8;
        const tiltY = ((y / rect.height) - 0.5) * -8;
        card.style.setProperty('--tilt-x', tiltX + 'deg');
        card.style.setProperty('--tilt-y', tiltY + 'deg');
      }
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // DYNAMIC CONTENT — SKILLS
  // ═══════════════════════════════════════════════════════════════

  const skillsData = [
    {
      category: 'Cloud & AWS',
      icon: '☁️',
      skills: [
        { name: 'Amazon EC2', percent: 88 },
        { name: 'Amazon VPC', percent: 90 },
        { name: 'AWS IAM', percent: 87 },
        { name: 'Amazon S3', percent: 85 },
        { name: 'Amazon DynamoDB', percent: 80 },
        { name: 'Amazon CloudWatch', percent: 86 },
        { name: 'Elastic Load Balancing', percent: 83 },
        { name: 'Auto Scaling', percent: 82 },
        { name: 'AWS Fargate', percent: 75 },
        { name: 'Amazon ECR', percent: 74 },
      ]
    },
    {
      category: 'Infrastructure & DevOps',
      icon: '⚙️',
      skills: [
        { name: 'Terraform (IaC)', percent: 90 },
        { name: 'Linux Administration', percent: 88 },
        { name: 'Bash / Shell Scripting', percent: 85 },
        { name: 'CI/CD & GitHub Actions', percent: 82 },
        { name: 'Infrastructure Automation', percent: 87 },
        { name: 'Cloud Architecture', percent: 85 },
        { name: 'Cloud Operations', percent: 84 },
        { name: 'Cloud Security', percent: 83 },
      ]
    },
    {
      category: 'Networking & Security',
      icon: '🔒',
      skills: [
        { name: 'VPC Architecture', percent: 90 },
        { name: 'TCP/IP & Subnetting', percent: 85 },
        { name: 'CIDR & Route Tables', percent: 86 },
        { name: 'Security Groups & NACLs', percent: 88 },
        { name: 'NAT / Internet Gateway', percent: 84 },
        { name: 'Load Balancing', percent: 83 },
        { name: 'SSH & Network Security', percent: 87 },
        { name: 'DNS', percent: 78 },
      ]
    },
    {
      category: 'SRE & Reliability',
      icon: '🛡️',
      skills: [
        { name: 'Troubleshooting & RCA', percent: 87 },
        { name: 'Incident Response', percent: 83 },
        { name: 'Observability & Monitoring', percent: 85 },
        { name: 'High Availability', percent: 84 },
        { name: 'Fault Tolerance', percent: 82 },
        { name: 'Disaster Recovery', percent: 80 },
        { name: 'Failure Simulation', percent: 85 },
        { name: 'Performance Optimization', percent: 80 },
      ]
    },
    {
      category: 'Programming & Tools',
      icon: '💻',
      skills: [
        { name: 'Python', percent: 85 },
        { name: 'C++', percent: 82 },
        { name: 'SQL', percent: 80 },
        { name: 'Git & GitHub', percent: 90 },
        { name: 'Version Control', percent: 88 },
        { name: 'Technical Documentation', percent: 86 },
        { name: 'Front-End Development', percent: 78 },
        { name: 'Agile Development', percent: 80 },
      ]
    },
    {
      category: 'Research & Soft Skills',
      icon: '🧠',
      skills: [
        { name: 'Problem Solving', percent: 92 },
        { name: 'Analytical Thinking', percent: 90 },
        { name: 'Communication Skills', percent: 88 },
        { name: 'Team Collaboration', percent: 90 },
        { name: 'Leadership', percent: 82 },
        { name: 'Quantum-Inspired Computing', percent: 78 },
        { name: 'Continuous Learning', percent: 95 },
        { name: 'Attention to Detail', percent: 90 },
      ]
    }
  ];

  function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;

    skillsData.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'skill-category';
      card.innerHTML = `
        <div class="skill-cat-header">
          <div class="skill-cat-icon">${cat.icon}</div>
          <span class="skill-cat-name">${cat.category}</span>
        </div>
        ${cat.skills.map(s => `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${s.name}</span>
              <span class="skill-percent" data-target="${s.percent}">0%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-bar-fill" data-percent="${s.percent}"></div>
            </div>
          </div>
        `).join('')}
      `;
      grid.appendChild(card);
    });
  }

  renderSkills();

  // ═══════════════════════════════════════════════════════════════
  // DYNAMIC CONTENT — CERTIFICATIONS
  // ═══════════════════════════════════════════════════════════════

  const certifications = [
    {
      name: 'Introduction to Internet of Things',
      provider: 'NPTEL',
      image: 'Certificates/nptel_iot.jpg'
    },
    {
      name: 'The Joy of Computing using Python',
      provider: 'NPTEL',
      image: 'Certificates/nptel_python.jpg'
    },
    {
      name: 'Cybersecurity',
      provider: 'NIELIT',
      image: 'Certificates/nielit_cybersecurity.jpg'
    },
    {
      name: 'Data Analysis with Python',
      provider: 'freeCodeCamp',
      image: 'Certificates/freecodecamp_data_analysis.jpg'
    },
    {
      name: 'Quantum Computing',
      provider: 'CDAC & IIT Roorkee',
      image: 'Certificates/cdac_quantum.jpg'
    },
    {
      name: 'SQL (Advanced) Skill Certificate',
      provider: 'HackerRank',
      image: 'Certificates/hackerrank_sql.jpg'
    }
  ];

  function renderCertifications() {
    const grid = document.getElementById('certGrid');
    if (!grid) return;

    certifications.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'cert-card';
      card.innerHTML = `
        <div class="cert-image-wrapper">
          <img src="${cert.image}" alt="${cert.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="cert-image-placeholder" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;">📜</div>
        </div>
        <div class="cert-body">
          <span class="cert-provider">${cert.provider}</span>
          <div class="cert-name">${cert.name}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderCertifications();

  // ═══════════════════════════════════════════════════════════════
  // DYNAMIC CONTENT — ACHIEVEMENTS
  // ═══════════════════════════════════════════════════════════════

  const achievements = [
    {
      category: 'Professional',
      year: '2026',
      title: 'McKinsey.org Forward Program',
      institution: 'McKinsey.org',
      description: 'McKinsey',
      image: 'Achievements/Forward2026.png',
      trophy: '🏆'
    },
     {
      category: 'Professional',
      year: '2025',
      title: 'Introduction to Strategy Consulting',
      institution: 'BCG',
      description: 'BCG',
      image: 'Achievements/BCG.jpg',
      trophy: '🏆'
    },
     {
      category: 'Professional',
      year: '2024',
      title: 'Ideation Hackathon Winner',
      institution: 'AMTRON',
      description: 'Won the Ideation Hackathon organized by Assam Electronics Development Corporation (AMTRON), showcasing innovative problem-solving and technical skills in building a technology solution pitch.',
      image: 'Achievements/amtron_hackathon.jpg',
      trophy: '🏆'
    },
    {
      category: 'Academic',
      year: '2024',
      title: 'RBI@90 National Quiz Participant',
      institution: 'Reserve Bank of India',
      description: 'Participated in the RBI@90 National Quiz organized by the Reserve Bank of India, demonstrating strong analytical and general knowledge across economics, finance, and current affairs domains.',
      image: 'Achievements/rbi_quiz.jpg',
      trophy: '🎓'
    }
  ];

  function renderAchievements() {
    const grid = document.getElementById('achievementGrid');
    if (!grid) return;

    achievements.forEach(ach => {
      const card = document.createElement('div');
      card.className = 'ach-card';
      const catClass = ach.category.toLowerCase();
      card.innerHTML = `
        <span class="ach-trophy">${ach.trophy}</span>
        <div class="ach-image-wrapper">
          <img src="${ach.image}" alt="${ach.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          <div class="cert-image-placeholder" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;font-size:3rem;opacity:0.3;">${ach.trophy}</div>
        </div>
        <div class="ach-body">
          <span class="ach-category-badge ${catClass}">${ach.category}</span>
          <div class="ach-year">${ach.year}</div>
          <div class="ach-title">${ach.title}</div>
          <div class="ach-institution">${ach.institution}</div>
          <p class="ach-description">${ach.description}</p>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  renderAchievements();

  document.querySelectorAll('.ach-card').forEach(card => animateObserver.observe(card));

  // ═══════════════════════════════════════════════════════════════
  // CONTACT FORM — Sequential underline animation
  // ═══════════════════════════════════════════════════════════════

  const contactFormObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lines = entry.target.querySelectorAll('.form-line');
        lines.forEach((line, i) => {
          setTimeout(() => {
            line.style.width = '100%';
            setTimeout(() => { line.style.width = '0'; }, 600);
          }, 400 * i);
        });
        contactFormObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactFormObserver.observe(contactForm);

}); // end DOMContentLoaded
