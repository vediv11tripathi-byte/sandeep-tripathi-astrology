const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const faqItems = document.querySelectorAll('.faq-item');
const directionButtons = document.querySelectorAll('.direction');
const directionTitle = document.getElementById('directionTitle');
const directionText = document.getElementById('directionText');
const year = document.getElementById('year');

const directionInfo = {
  North: 'North is traditionally associated with growth, opportunity and a positive flow of resources in many traditional Vastu perspectives. This zone is often explored in relation to career direction, visibility and forward movement.',
  'North-East': 'North-East is often discussed in relation to clarity, learning, spiritual openness and planning. It is commonly associated with intention, freshness and thoughtful progress.',
  East: 'East is often connected with light, initiative, visibility and timely action. Traditional perspectives frequently relate this direction to communication, new beginnings and positive orientation.',
  'South-East': 'South-East often draws attention to energy, action, financial movement and resource management in traditional Vastu discourse. It may be linked with practical decisions and momentum.',
  South: 'South is often associated with stability, focus and strong grounding. In traditional Vastu conversation, it may be explored in relation to energy, discipline and personal resilience.',
  'South-West': 'South-West is often associated with steadiness, emotional grounding and domestic stability. It is commonly discussed in contexts of comfort, security and long-term consistency.',
  West: 'West is often linked with observation, reflection, relationships and closure. Traditional perspectives may view it as connected to quality of life and reflective decision-making.',
  'North-West': 'North-West is frequently connected with networks, support systems, movement in society and external relationships. It may be explored in the context of guidance, partnerships and change.'
};

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  if (!button) return;

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    faqItems.forEach((faq) => faq.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

directionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    directionButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.direction;
    directionTitle.textContent = selected;
    directionText.textContent = directionInfo[selected] || 'Traditional directional principles may vary by context and should be interpreted carefully.';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

if (year) {
  year.textContent = new Date().getFullYear();
}

function digitRoot(value) {
  let total = value;
  while (total > 9) {
    total = total
      .toString()
      .split('')
      .reduce((sum, char) => sum + Number(char), 0);
  }
  return total;
}

function nameNumber(name) {
  const map = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  };

  const letters = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
  const total = letters.reduce((sum, letter) => sum + (map[letter] || 0), 0);
  return digitRoot(total) || 0;
}

const birthNumberBtn = document.getElementById('birthNumberBtn');
const destinyBtn = document.getElementById('destinyBtn');
const nameNumberBtn = document.getElementById('nameNumberBtn');

birthNumberBtn?.addEventListener('click', () => {
  const date = document.getElementById('birthNumberDate').value;
  if (!date) {
    document.getElementById('birthNumberResult').textContent = 'Please select a valid date of birth.';
    return;
  }

  const digits = date
    .replace(/-/g, '')
    .split('')
    .filter((char) => /\d/.test(char))
    .map(Number)
    .reduce((sum, number) => sum + number, 0);

  const result = digitRoot(digits);
  document.getElementById('birthNumberResult').textContent = `Birth Number: ${result}. This is an educational numerology interpretation based on basic digit reduction.`;
});

destinyBtn?.addEventListener('click', () => {
  const date = document.getElementById('destinyDate').value;
  if (!date) {
    document.getElementById('destinyResult').textContent = 'Please select a valid date of birth.';
    return;
  }

  const digits = date
    .replace(/-/g, '')
    .split('')
    .filter((char) => /\d/.test(char))
    .map(Number);

  const total = digits.reduce((sum, number) => sum + number, 0);
  const result = digitRoot(total);
  document.getElementById('destinyResult').textContent = `Life Path / Destiny Number: ${result}. This is a traditional numerological interpretation for educational purposes.`;
});

nameNumberBtn?.addEventListener('click', () => {
  const name = document.getElementById('nameNumberInput').value.trim();
  if (!name) {
    document.getElementById('nameNumberResult').textContent = 'Please enter a name.';
    return;
  }

  const result = nameNumber(name);
  document.getElementById('nameNumberResult').textContent = `Name Number: ${result}. This is an educational numerology interpretation and not a guarantee of any outcome.`;
});

document.getElementById('businessNameForm')?.addEventListener('submit', (event) => {
  event.preventDefault();

  const businessName = document.getElementById('businessNameInput').value.trim();
  const founderName = document.getElementById('founderNameInput').value.trim();
  const birthDate = document.getElementById('birthDateInput').value;

  const resultBox = document.getElementById('businessResultBox');
  if (!businessName && !founderName && !birthDate) {
    resultBox.innerHTML = '<p>Please enter at least business name details to explore a basic interpretation.</p>';
    return;
  }

  const businessTotal = nameNumber(businessName || 'Business');
  const founderTotal = nameNumber(founderName || 'Founder');
  const dateTotal = birthDate ? digitRoot(birthDate.replace(/-/g, '').split('').filter((char) => /\d/.test(char)).reduce((sum, char) => sum + Number(char), 0)) : 0;

  resultBox.innerHTML = `
    <p><strong>Business Name Number:</strong> ${businessTotal}</p>
    <p><strong>Founder Name Number:</strong> ${founderTotal}</p>
    <p><strong>Birth-based numeric reference:</strong> ${dateTotal}</p>
    <p>Traditional numerological interpretation suggests that businesses often benefit from examining name energy, founder identity and timing context together. This is for educational and informational purposes only.</p>
  `;
});

document.getElementById('contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const btn = event.currentTarget.querySelector('button[type="submit"]');
  if (btn) {
    btn.textContent = 'Submitted';
    btn.disabled = true;
  }

  const success = document.createElement('p');
  success.textContent = 'Thank you. Your request has been received. This platform is intended for knowledge-based and informational guidance.';
  success.style.color = '#f3d18d';
  success.style.marginTop = '16px';
  event.currentTarget.appendChild(success);
});

const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mainNav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});
