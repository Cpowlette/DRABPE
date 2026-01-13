<!-- put Swiper library first -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" defer></script>

<!-- script that initializes Swiper and other behavior -->
<script src="./script.js" defer></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            
            /* --- 1. PARTNER LOGO CAROUSEL --- */
            new Swiper(".partnerSwiper", {
                loop: true,
                speed: 1000,
                autoplay: { delay: 2000, disableOnInteraction: false },
                slidesPerView: 2,
                spaceBetween: 20,
                breakpoints: {
                    500: { slidesPerView: 3, spaceBetween: 30 },
                    768: { slidesPerView: 4, spaceBetween: 40 },
                    1024: { slidesPerView: 5, spaceBetween: 50 },
                }
            });

            /* --- 2. MAIN IMAGE CAROUSEL --- */
            new Swiper(".mySwiper", {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                speed: 1000,
                autoplay: { delay: 5000, disableOnInteraction: false },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                effect: "slide"
            });

            /* --- 3. SCROLL REVEAL ANIMATIONS --- */
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target); 
                    }
                });
            }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

            /* --- 4. STATS COUNTER ANIMATION --- */
            const statsSection = document.getElementById('stats-section');
            let statsStarted = false;

            const startCounting = () => {
                document.querySelectorAll('.stat-number').forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const prefix = counter.getAttribute('data-prefix') || "";
                    const suffix = counter.getAttribute('data-suffix') || "";
                    const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
                    
                    const duration = 2000; 
                    const frameRate = 16; 
                    const increment = target / (duration / frameRate);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = prefix + current.toFixed(decimals) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = prefix + target.toFixed(decimals) + suffix;
                        }
                    };
                    updateCounter();
                });
            };

            const statsObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !statsStarted) {
                    startCounting();
                    statsStarted = true;
                }
            }, { threshold: 0.3 });

            if(statsSection) statsObserver.observe(statsSection);
        });
    </script>
