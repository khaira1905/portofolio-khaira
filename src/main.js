import './style.css'
import { db } from './firebase.js'
import { collection, getDocs } from 'firebase/firestore'

// 1. Render Tampilan Utama
document.querySelector('#app').innerHTML = `
  <!-- Floating Navbar -->
  <nav class="navbar">
    <a href="#" class="logo">Portofolio Khaira</a>
    <ul class="nav-links">
      <li><a href="#about">Tentang</a></li>
      <li><a href="#projects">Proyek</a></li>
      <li><a href="#certificates">Sertifikat</a></li>
      <li><a href="#contact">Kontak</a></li>
    </ul>
  </nav>

  <!-- Hero Section -->
  <section class="hero" id="about">
    <div class="hero-text">
      <div class="badge-status">
        <span class="dot"></span> Rekayasa Perangkat Lunak
      </div>
      <h1>Khaira Naura Khalishah</h1>
      <p>Halloo, saya Khaira, siswi kelas XII RPL di SMKN 4 Bandung dengan minat di bidang pengembangan web dan UI/UX. Saya memiliki kemampuan dalam HTML, CSS, PHP, dan JavaScript, dan melalui portofolio ini saya ingin menunjukkan beberapa proyek yang pernah saya kerjakan. Silakan hubungi saya melalui kontak di bawah untuk informasi lebih lanjut.</p>
      <div class="cta-buttons">
        <a href="#projects" class="btn-primary">Lihat Proyek</a>
        <a href="#contact" class="btn-secondary">Kontak</a>
      </div>
    </div>

    <!-- Visual Profil Kanan -->
    <div class="hero-visual">
      <div class="profile-card">
        <div class="avatar-placeholder">K</div>
        <h3>Khaira Naura K.</h3>
        <span>SMKN 4 Bandung</span>
        <div class="tech-tags">
          <span class="tag">HTML/CSS</span>
          <span class="tag">PHP</span>
          <span class="tag">JavaScript</span>
          <span class="tag">UI/UX</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Section Projects -->
  <section class="projects-section" id="projects">
    <div class="section-header">
      <span class="section-subtitle">Karya & Pengalaman</span>
      <h2 class="section-title">Proyek Pilihan</h2>
    </div>

    <!-- Container tempat data proyek dari Firebase akan muncul -->
    <div class="projects-grid" id="projects-container">
      <p style="color: #94a3b8;">Memuat proyek dari database...</p>
    </div>
  </section>

  <!-- Section Certificates -->
  <section class="certificates-section" id="certificates">
    <div class="section-header">
      <span class="section-subtitle">Prestasi & Penghargaan</span>
      <h2 class="section-title">Sertifikat & Pencapaian</h2>
    </div>

    <!-- Container tempat data sertifikat dari Firebase akan muncul -->
    <div class="projects-grid" id="certificates-container">
      <p style="color: #94a3b8;">Memuat sertifikat dari database...</p>
    </div>
  </section>
`

// 2. Fungsi Mengambil Data Proyek dari Firestore
async function loadProjects() {
  const container = document.querySelector('#projects-container')
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'))
    
    if (querySnapshot.empty) {
      container.innerHTML = `<p style="color: #94a3b8;">Belum ada proyek yang ditambahkan di Firebase.</p>`
      return
    }

    let cardsHTML = ''
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      cardsHTML += `
        <div class="project-card">
          <img src="${data.imageUrl || 'https://via.placeholder.com/400x200'}" alt="${data.title}" class="project-img">
          <div class="project-info">
            <h3>${data.title || 'Judul Proyek'}</h3>
            <p>${data.description || 'Deskripsi singkat proyek.'}</p>
            <div class="project-tech">
              ${(data.tech || []).map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            <div class="project-links">
              ${data.demoUrl ? `<a href="${data.demoUrl}" target="_blank" class="project-link">Live Demo ↗</a>` : ''}
              ${data.githubUrl ? `<a href="${data.githubUrl}" target="_blank" class="project-link">GitHub ↗</a>` : ''}
            </div>
          </div>
        </div>
      `
    })

    container.innerHTML = cardsHTML
  } catch (error) {
    console.error("Gagal mengambil data proyek:", error)
    container.innerHTML = `<p style="color: #f87171;">Gagal memuat proyek. Cek console browser.</p>`
  }
}

// 3. Fungsi Mengambil Data Sertifikat dari Firestore (Layout disamakan persis dengan Proyek)
async function loadCertificates() {
  const container = document.querySelector('#certificates-container')
  try {
    const querySnapshot = await getDocs(collection(db, 'certificates'))
    
    if (querySnapshot.empty) {
      container.innerHTML = `<p style="color: #94a3b8;">Belum ada sertifikat yang ditambahkan di Firebase.</p>`
      return
    }

    let cardsHTML = ''
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      cardsHTML += `
        <div class="project-card">
          <img src="${data.imageUrl || '/sertifikat-technova.jpg'}" alt="${data.title || 'Sertifikat'}" class="project-img">
          <div class="project-info">
            <h3>${data.title || 'Judul Sertifikat'}</h3>
            <p>${data.description || 'Deskripsi sertifikat.'}</p>
            <div class="project-tech">
              ${(data.tech || []).map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
            ${data.credentialUrl ? `
              <div class="project-links">
                <a href="${data.credentialUrl}" target="_blank" class="project-link">Lihat Sertifikat ↗</a>
              </div>
            ` : ''}
          </div>
        </div>
      `
    })

    container.innerHTML = cardsHTML
  } catch (error) {
    console.error("Gagal mengambil data sertifikat:", error)
    container.innerHTML = `<p style="color: #f87171;">Gagal memuat sertifikat. Cek console browser.</p>`
  }
}

// Jalankan pemanggilan data
loadProjects()
loadCertificates()