document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById('openLetterBtn');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.close-btn');
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const bgMusic = document.getElementById('bgMusic');

    // Putar musik saat user mengklik halaman
    window.addEventListener('click', () => {
        bgMusic.play().catch(e => console.log("Autoplay diblokir:", e));
    }, { once: true });

    openBtn.addEventListener('click', () => {
        // Animasi membuka surat
        letter.classList.add('opened');
        envelope.classList.add('opened');

        setTimeout(() => {
            modal.classList.add('active'); // Tampilkan modal dengan efek
        }, 800); // Tunggu selesai animasi
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active'); // Sembunyikan modal
    });
});