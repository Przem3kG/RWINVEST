document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Obsługa rozwijanego menu FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.maxHeight;

            // Zamknij wszystkie inne otwarte
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.maxHeight = null;
                ans.style.padding = "0 25px";
                if(ans.previousElementSibling) {
                    ans.previousElementSibling.classList.remove('active');
                    ans.previousElementSibling.querySelector('.icon').textContent = '+';
                }
            });

            // Otwórz kliknięty element
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 40 + "px"; 
                answer.style.padding = "0 25px 25px 25px";
                question.classList.add('active');
                question.querySelector('.icon').textContent = '+'; 
            }
        });
    });

    // 2. Scroll Reveal Animations (Animacje pojawiania się elementów)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Obsługa Galerii (Lightbox ze strzałkami)
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    let currentIndex = 0; // Śledzimy, które zdjęcie jest aktualnie otwarte

    if (galleryItems.length > 0 && lightbox) {
        
        // Funkcja aktualizująca zdjęcie w lightboxie
        const updateLightboxImage = (index) => {
            let highResUrl = galleryItems[index].src.replace('w=600', 'w=1200'); // W razie użycia placeholdera
            lightboxImg.src = highResUrl;
            currentIndex = index;
        };

        // Otwieranie lightboxa
        galleryItems.forEach((item, index) => {
            item.parentElement.addEventListener('click', () => {
                updateLightboxImage(index);
                lightbox.style.display = 'flex';
                setTimeout(() => lightbox.style.opacity = '1', 10);
            });
        });

        // Przycisk "Następny"
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Blokuje kliknięcie w tło (które by zamknęło galerię)
            let newIndex = (currentIndex + 1) % galleryItems.length;
            updateLightboxImage(newIndex);
        });

        // Przycisk "Poprzedni"
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightboxImage(newIndex);
        });

        // Zamykanie galerii
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => lightbox.style.display = 'none', 300);
        };

        closeBtn.addEventListener('click', closeLightbox);

        // Zamykanie po kliknięciu w czarne tło wokół zdjęcia
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Obsługa strzałek na klawiaturze
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === "Escape") {
                    closeLightbox();
                } else if (e.key === "ArrowRight") {
                    let newIndex = (currentIndex + 1) % galleryItems.length;
                    updateLightboxImage(newIndex);
                } else if (e.key === "ArrowLeft") {
                    let newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                    updateLightboxImage(newIndex);
                }
            }
        });
    }

    // 4. Obsługa mobilnego menu (Hamburger)
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        // Otwieranie/zamykanie po kliknięciu w hamburgera
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Automatyczne zamykanie menu po kliknięciu w dowolny link
        document.querySelectorAll('.nav-menu li a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

});