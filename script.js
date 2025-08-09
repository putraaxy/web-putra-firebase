// mobile nav toggle
const btnNav = document.getElementById('btnNav');
const nav = document.getElementById('primaryNav');
if(btnNav){
  btnNav.addEventListener('click', () => {
    const expanded = btnNav.getAttribute('aria-expanded') === 'true';
    btnNav.setAttribute('aria-expanded', String(!expanded));
    nav.setAttribute('aria-expanded', String(!expanded));
  });
  // close nav when clicking link
  document.querySelectorAll('#primaryNav a').forEach(a => a.addEventListener('click', () => {
    if(window.innerWidth <= 640){
      btnNav.setAttribute('aria-expanded','false');
      nav.setAttribute('aria-expanded','false');
    }
  }));
}

// reveal on scroll using IntersectionObserver (better performance)
const reveals = document.querySelectorAll('.reveal');
if(reveals.length){
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(el => io.observe(el));
}

// small accessibility: show focus outlines when tabbing
document.addEventListener('keydown', (e) => {
  if(e.key === 'Tab') document.documentElement.classList.add('user-is-tabbing');
});

