// Password sederhana — jangan simpan password sensitif di client-side
const ADMIN_PASSWORD = 'putra123';

const loginBox = document.getElementById('login-box');
const editor = document.getElementById('editor');
const btnLogin = document.getElementById('btnLogin');
const pw = document.getElementById('pw');
const msg = document.getElementById('msg');

function showEditor(){
  loginBox.style.display = 'none';
  editor.style.display = 'block';
  document.getElementById('admin-heading').textContent = 'Panel Admin';
  loadForm();
  // listen for remote updates to reflect in form
  db.ref('siteData').on('value', snap => {
    const data = snap.val();
    if(data) populateForm(data);
  });
}

// cek password
btnLogin.addEventListener('click', () => {
  if(pw.value === ADMIN_PASSWORD){
    showEditor();
  } else {
    msg.textContent = 'Password salah.';
  }
});

// form elements
const siteTitle = document.getElementById('siteTitle');
const brand = document.getElementById('brand');
const title = document.getElementById('title');
const description = document.getElementById('description');
const aboutTitle = document.getElementById('aboutTitle');
const aboutDesc = document.getElementById('aboutDesc');
const accent = document.getElementById('accent');
const footer = document.getElementById('footer');
const btnSave = document.getElementById('btnSave');
const btnReset = document.getElementById('btnReset');
const btnLogout = document.getElementById('btnLogout');

function getDefault(){
  return {
    siteTitle: 'Website Responsive Animasi — Siap Deploy',
    brand: 'MyWeb',
    title: 'Selamat Datang — Website Responsive & Animasi',
    description: 'Contoh website ringan: HTML, CSS, JavaScript. Responsive, smooth-scroll, dan animasi saat elemen muncul.',
    aboutTitle: 'Tentang Website',
    aboutDesc: 'Halaman ini dibuat agar mudah dikembangkan. Struktur file simple — cocok untuk GitHub Pages, Netlify, atau Vercel.',
    accent: '#0072ff',
    footer: '© 2025 MyWeb — Siap deploy'
  };
}

function populateForm(data){
  siteTitle.value = data.siteTitle || '';
  brand.value = data.brand || '';
  title.value = data.title || '';
  description.value = data.description || '';
  aboutTitle.value = data.aboutTitle || '';
  aboutDesc.value = data.aboutDesc || '';
  accent.value = data.accent || '#0072ff';
  footer.value = data.footer || '';
}

function loadForm(){
  db.ref('siteData').once('value').then(snap => {
    const data = snap.val();
    if(data) populateForm(data); else populateForm(getDefault());
  }).catch(e => {
    console.error('Gagal load data', e);
    populateForm(getDefault());
  });
}

btnSave.addEventListener('click', () => {
  const data = {
    siteTitle: siteTitle.value || getDefault().siteTitle,
    brand: brand.value || getDefault().brand,
    title: title.value || getDefault().title,
    description: description.value || getDefault().description,
    aboutTitle: aboutTitle.value || getDefault().aboutTitle,
    aboutDesc: aboutDesc.value || getDefault().aboutDesc,
    accent: accent.value || getDefault().accent,
    footer: footer.value || getDefault().footer
  };
  // tulis ke Firebase
  db.ref('siteData').set(data).then(() => {
    msg.textContent = 'Tersimpan ke server.';
  }).catch(err => {
    console.error(err);
    msg.textContent = 'Gagal menyimpan: ' + err.message;
  });
});

btnReset.addEventListener('click', () => {
  // reset di server ke default
  const def = getDefault();
  db.ref('siteData').set(def).then(() => {
    populateForm(def);
    msg.textContent = 'Di-reset ke default di server.';
  }).catch(err => {
    console.error(err);
    msg.textContent = 'Gagal reset: ' + err.message;
  });
});

btnLogout.addEventListener('click', () => {
  editor.style.display = 'none';
  loginBox.style.display = 'block';
  pw.value = '';
  msg.textContent = 'Logged out.';
});
