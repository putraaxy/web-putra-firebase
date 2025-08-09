// Accessible mobile nav toggle and reveal animations
const btnNav = document.getElementById('btnNav');
const nav = document.getElementById('primaryNav');
if(btnNav){
  btnNav.addEventListener('click', () => {
    const expanded = btnNav.getAttribute('aria-expanded') === 'true';
    btnNav.setAttribute('aria-expanded', String(!expanded));
    nav.setAttribute('aria-expanded', String(!expanded));
  });
}

// IntersectionObserver untuk reveal animations
const reveals = document.querySelectorAll('.reveal');
if(reveals.length){
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(el => io.observe(el));
}
