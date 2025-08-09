Instruksi deploy & Firebase
1) Ekstrak folder ini.
2) Buat repository baru di GitHub (public) lalu upload semua file:
   index.html, style.css, script.js, admin.html, admin.js, README.txt
3) Aktifkan GitHub Pages: Settings -> Pages -> Branch: main -> Folder: / (root) -> Save
4) Buka website: https://<username>.github.io/<repo>/
5) Buka panel admin: https://<username>.github.io/<repo>/admin.html (password: putra123)
6) Di Firebase Console -> Realtime Database, pastikan rules mengizinkan read/write untuk user/testing:
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
7) Setelah simpan di admin, data tersimpan di Firebase (siteData) dan website utama otomatis menampilkan data terbaru.
Note: Jangan masukkan data sensitif di panel; client-side password hanya untuk kemudahan, bukan keamanan tinggi.
