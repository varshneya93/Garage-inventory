I'll help you turn this Webflow export into a clean, standalone website. Let me extract and organize the essential parts into a proper website structure.

Ryan - Digital Designer

```
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzY1OWNlNyIvPgo8cGF0aCBkPSJNOSAxMGgxNHYySDl2LTJ6bTE0IDBoMTR2MmgxNHYtMnoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="/>

<link rel="stylesheet" href="styles.css"/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

```

[](#)

```
            <nav class="navigation">
                <div class="nav-container-items">
                    <a href="#home" class="nav-link active">Home</a>
                    <a href="#about" class="nav-link">About me</a>
                    <div class="nav-link-wrap">
                        <a href="#work" class="nav-link">Work</a>
                        <span class="nav-number">04</span>
                    </div>
                </div>
            </nav>
            
            <div class="nav-button">
                <a href="#contact" class="main-button">
                    <div class="button-content">
                        <span class="button-text">Get in touch</span>
                        <svg class="button-arrow" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"/>
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    </div>
</nav>

<main class="main-wrapper">
    <!-- Hero Section -->
    <section class="hero-section" id="home">
        <div class="hero-grid">
            <div class="hero-content">
                <div class="title-wrap top">
                    <h1 class="hero-title">Digital</h1>
                </div>
                
                <div class="hero-image-container">
                    <div class="hero-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                             alt="Digital Design Work" 
                             class="hero-image"/>
                    </div>
                </div>
                
                <div class="title-wrap bottom">
                    <h1 class="hero-title">Designer</h1>
                    <div class="copyright-symbol">ⓞ</div>
                </div>
            </div>
            
            <div class="header-sidebar">
                <div class="social-wrapper">
                    <a href="#" target="_blank" class="social-link">
                        <svg class="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.6874 3.0625L12.6907 8.77425L8.37045 3.0625H2.11328L9.58961 12.8387L2.50378 20.9375H5.53795L11.0068 14.6886L15.7863 20.9375H21.8885L14.095 10.6342L20.7198 3.0625H17.6874ZM16.6232 19.1225L5.65436 4.78217H7.45745L18.3034 19.1225H16.6232Z"/>
                        </svg>
                    </a>
                    <a href="#" target="_blank" class="social-link">
                        <svg class="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915Z"/>
                        </svg>
                    </a>
                    <a href="#" target="_blank" class="social-link">
                        <svg class="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.9887 11.5716C19.9029 9.94513 19.3313 8.44745 18.4163 7.22097C18.1749 7.48407 17.8785 7.7698 17.4957 8.09159C16.5881 8.85458 15.4887 9.54307 14.1834 10.101C14.3498 10.4506 14.5029 10.7899 14.6376 11.1098L14.6388 11.1125C14.6652 11.1742 14.6879 11.2306 14.7321 11.3418C14.7379 11.3562 14.7433 11.3697 14.7485 11.3825C16.2621 11.2122 17.8576 11.2749 19.4049 11.4845C19.6106 11.5123 19.805 11.5415 19.9887 11.5716Z"/>
                        </svg>
                    </a>
                    <a href="#" target="_blank" class="social-link">
                        <svg class="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.44262 5.34998C8.08197 5.34998 8.67213 5.39945 9.21311 5.54786C9.7541 5.6468 10.1967 5.84468 10.5902 6.09203C10.9836 6.33938 11.2787 6.68566 11.4754 7.13089C11.6721 7.57612 11.7705 8.12029 11.7705 8.71393C11.7705 9.40651 11.623 10.0002 11.2787 10.4454C10.9836 10.8906 10.4918 11.2864 9.90164 11.5832C10.7377 11.8305 11.377 12.2758 11.7705 12.8694C12.1639 13.463 12.4098 14.2051 12.4098 15.0461C12.4098 15.7387 12.2623 16.3323 12.0164 16.827C11.7705 17.3217 11.377 17.7669 10.9344 18.0638C10.4918 18.3606 9.95082 18.6079 9.36066 18.7563C8.77049 18.9047 8.18033 19.0037 7.59016 19.0037H1V5.34998H7.44262Z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        
        <!-- Scroll Down Indicator -->
        <div class="scroll-indicator">
            <div class="scroll-circle"></div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-section" id="about">
        <div class="scrolling-text-wrapper">
            <div class="scrolling-text-block">
                <h2 class="scrolling-text">Crafting ©visual</h2>
                <h2 class="scrolling-text">stories ✺</h2>
                <h2 class="scrolling-text">Crafting ©visual</h2>
                <h2 class="scrolling-text">stories ✺</h2>
            </div>
        </div>
        
        <div class="container">
            <div class="about-grid">
                <div class="about-intro">
                    <p>• I'm Ryan</p>
                </div>
                
                <div class="about-content">
                    <p>A digital designer passionate about crafting visual experiences that blend creativity, strategy, and technology. My work focuses on turning ideas into intuitive designs that connect with people and elevate brands.</p>
                    
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-number" data-target="5">0</div>
                            <div class="stat-label">Years of experience in digital design.</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number" data-target="50">0</div>
                            <div class="stat-label">Projects delivered for global clients.</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number" data-target="12">0</div>
                            <div class="stat-label">Design awards for creativity and innovation.</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="divider"></div>
        </div>
    </section>

    <!-- Work Section -->
    <section class="work-section" id="work">
        <div class="container">
            <div class="work-header">
                <div class="work-year">2025©</div>
                <div class="work-titles">
                    <h2 class="section-title">Selected</h2>
                    <h2 class="section-title">Work</h2>
                </div>
                <div class="work-number">04</div>
            </div>
            
            <div class="work-grid">
                <div class="work-item">
                    <a href="#" class="work-link">
                        <div class="work-image-wrap">
                            <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                 alt="Metal Project" 
                                 class="work-image"/>
                            <div class="work-overlay">
                                <div class="view-text">VIEW</div>
                            </div>
                        </div>
                        <div class="work-content">
                            <div class="work-name">Metal</div>
                            <div class="work-category">Brand Identity</div>
                            <div class="work-year">2025</div>
                        </div>
                    </a>
                </div>
                
                <div class="work-item">
                    <a href="#" class="work-link">
                        <div class="work-image-wrap">
                            <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                 alt="Open Project" 
                                 class="work-image"/>
                            <div class="work-overlay">
                                <div class="view-text">VIEW</div>
                            </div>
                        </div>
                        <div class="work-content">
                            <div class="work-name">Open</div>
                            <div class="work-category">Motion Graphics</div>
                            <div class="work-year">2024</div>
                        </div>
                    </a>
                </div>
                
                <div class="work-item">
                    <a href="#" class="work-link">
                        <div class="work-image-wrap">
                            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                 alt="Sticker Project" 
                                 class="work-image"/>
                            <div class="work-overlay">
                                <div class="view-text">VIEW</div>
                            </div>
                        </div>
                        <div class="work-content">
                            <div class="work-name">Sticker</div>
                            <div class="work-category">Social Graphics</div>
                            <div class="work-year">2023</div>
                        </div>
                    </a>
                </div>
                
                <div class="work-item">
                    <a href="#" class="work-link">
                        <div class="work-image-wrap">
                            <img src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                 alt="Aeron Project" 
                                 class="work-image"/>
                            <div class="work-overlay">
                                <div class="view-text">VIEW</div>
                            </div>
                        </div>
                        <div class="work-content">
                            <div class="work-name">Aeron</div>
                            <div class="work-category">Graphic Design</div>
                            <div class="work-year">2022</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonial Section -->
    <section class="testimonial-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Featured</h2>
                <h2 class="section-title">Clients</h2>
            </div>
            
            <div class="testimonial-slider">
                <div class="testimonial-track">
                    <div class="testimonial-slide">
                        <blockquote class="testimonial-quote">
                            "Incredible eye for detail and usability — our app looks amazing."
                        </blockquote>
                        <div class="testimonial-author">
                            <div class="author-info">
                                <div class="author-name">David Kim</div>
                                <div class="author-role">Product Manager</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="testimonial-slide">
                        <blockquote class="testimonial-quote">
                            "Professional, creative, and always one step ahead. Highly recommend!"
                        </blockquote>
                        <div class="testimonial-author">
                            <div class="author-info">
                                <div class="author-name">Sarah Mitchell</div>
                                <div class="author-role">Marketing Manager</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="testimonial-slide">
                        <blockquote class="testimonial-quote">
                            "Delivered exactly what we envisioned — fresh, clean, and right on brand."
                        </blockquote>
                        <div class="testimonial-author">
                            <div class="author-info">
                                <div class="author-name">Mark Lewis</div>
                                <div class="author-role">Startup Founder</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="divider"></div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Services</h2>
                <h2 class="section-title">& Skills</h2>
            </div>
            
            <div class="services-grid">
                <div class="service-item">
                    <div class="service-number">01//</div>
                    <h3 class="service-title">Brand Identity</h3>
                    <p class="service-description">Build a Visual Voice - I help craft distinctive brand identities that tell your story at a glance. From memorable logos to cohesive color palettes and typography.</p>
                </div>
                
                <div class="service-item">
                    <div class="service-number">02//</div>
                    <h3 class="service-title">Graphic Design</h3>
                    <p class="service-description">Designs That Communicate - I design custom graphics that make your message stand out, whether it's marketing materials, web visuals, or digital ads.</p>
                </div>
                
                <div class="service-item">
                    <div class="service-number">03//</div>
                    <h3 class="service-title">Motion Graphics</h3>
                    <p class="service-description">Bring Ideas to Life - I add movement and energy to your visuals with engaging motion graphics and animations that tell stories and guide users.</p>
                </div>
                
                <div class="service-item">
                    <div class="service-number">04//</div>
                    <h3 class="service-title">UI/UX Design</h3>
                    <p class="service-description">Design for Humans - I craft intuitive, user-friendly interfaces that balance form and function through thoughtful UX strategy and clean UI design.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="cta-banner">
            <h2 class="cta-text">Let's Create Together ✺</h2>
        </div>
        
        <div class="container">
            <div class="cta-content">
                <p>Ready to bring your vision to life? Let's collaborate to create designs that inspire, engage, and deliver results — Get in touch and let's start building something remarkable together.</p>
                
                <a href="#contact" class="main-button">
                    <div class="button-content">
                        <span class="button-text">Get in touch</span>
                        <svg class="button-arrow" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"/>
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    </section>
</main>

<!-- Footer -->
<footer class="footer" id="contact">
    <div class="container">
        <div class="footer-content">
            <div class="footer-top">
                <a href="#" class="footer-logo">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="8" fill="#659CE7"/>
                        <path d="M9 10h14v2H9v2zm14 0h2v2h-2v-2z" fill="white"/>
                    </svg>
                </a>
                
                <div class="footer-nav">
                    <a href="#home" class="footer-link">Home</a>
                    <a href="#about" class="footer-link">About me</a>
                    <a href="#work" class="footer-link">Work</a>
                </div>
                
                <div class="footer-social">
                    <div class="social-wrapper">
                        <a href="#" class="social-link">
                            <svg class="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.6874 3.0625L12.6907 8.77425L8.37045 3.0625H2.11328L9.58961 12.8387L2.50378 20.9375H5.53795L11.0068 14.6886L15.7863 20.9375H21.8885L14.095 10.6342L20.7198 3.0625H17.6874ZM16.6232 19.1225L5.65436 4.78217H7.45745L18.3034 19.1225H16.6232Z"/>
                            </svg>
                        </a>
                        <a href="#" class="social-link">
                            <svg class="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915Z"/>
                            </svg>
                        </a>
                        <a href="#" class="social-link">
                            <svg class="social-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.9887 11.5716C19.9029 9.94513 19.3313 8.44745 18.4163 7.22097C18.1749 7.48407 17.8785 7.7698 17.4957 8.09159C16.5881 8.85458 15.4887 9.54307 14.1834 10.101C14.3498 10.4506 14.5029 10.7899 14.6376 11.1098L14.6388 11.1125C14.6652 11.1742 14.6879 11.2306 14.7321 11.3418C14.7379 11.3562 14.7433 11.3697 14.7485 11.3825C16.2621 11.2122 17.8576 11.2749 19.4049 11.4845C19.6106 11.5123 19.805 11.5415 19.9887 11.5716Z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="newsletter">
                <h3>Subscribe to my Newsletter</h3>
                <form class="newsletter-form">
                    <input type="email" placeholder="Your email here" required/>
                    <button type="submit">Subscribe</button>
                </form>
                <p>Receive valuable insights on strategy, culture, and brand delivered weekly to your inbox.</p>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-legal">
                    <span>Designed by Flowsuit</span>
                    <span>Powered by Webflow</span>
                </div>
                <div class="footer-links">
                    <a href="#">Style Guide</a>
                    <a href="#">Licenses</a>
                    <a href="#">Changelog</a>
                </div>
            </div>
        </div>
    </div>
</footer>

<script src="script.js"></script>

```

/* Reset and Base Styles */ * { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; background: #fff; overflow-x: hidden; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

/* Navigation */ .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(0, 0, 0, 0.1); }

.nav-container { max-width: 1400px; margin: 0 auto; padding: 1rem 2rem; }

.nav-grid { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 2rem; }

.logo-link img { height: 40px; width: auto; }

.navigation { display: flex; align-items: center; }

.nav-container-items { display: flex; align-items: center; gap: 3rem; }

.nav-link { text-decoration: none; color: #333; font-weight: 500; transition: all 0.3s ease; position: relative; }

.nav-link:hover, .nav-link.active { color: #659CE7; }

.nav-link-wrap { display: flex; align-items: center; gap: 0.5rem; }

.nav-number { font-size: 0.8rem; color: #999; font-weight: 300; }

.main-button { display: inline-flex; align-items: center; padding: 0.75rem 1.5rem; background: #333; color: white; text-decoration: none; border-radius: 50px; transition: all 0.3s ease; font-weight: 500; }

.main-button:hover { background: #659CE7; transform: translateY(-2px); }

.button-content { display: flex; align-items: center; gap: 0.5rem; }

.button-arrow { width: 20px; height: 20px; }

/* Hero Section */ .hero-section { min-height: 100vh; display: grid; grid-template-columns: 1fr auto; align-items: center; padding: 8rem 2rem 4rem; position: relative; }

.hero-grid { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 4rem; width: 100%; }

.hero-content { display: flex; flex-direction: column; gap: 4rem; }

.title-wrap { position: relative; }

.hero-title { font-size: clamp(4rem, 12vw, 8rem); font-weight: 700; line-height: 0.9; letter-spacing: -0.02em; }

.hero-title.secondary { color: #659CE7; }

.copyright-symbol { position: absolute; top: 50%; right: -3rem; transform: translateY(-50%); font-size: 1.5rem; opacity: 0.5; }

.hero-image-container { position: relative; }

.hero-image-wrapper { position: relative; width: 400px; height: 500px; border-radius: 20px; overflow: hidden; }

.hero-image { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }

.header-sidebar { display: flex; flex-direction: column; align-items: center; gap: 2rem; }

.social-wrapper { display: flex; flex-direction: column; gap: 1rem; }

.social-link { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 50%; background: #f5f5f5; color: #333; text-decoration: none; transition: all 0.3s ease; }

.social-link:hover { background: #659CE7; color: white; transform: scale(1.1); }

.social-icon { width: 20px; height: 20px; }

/* Scroll Indicator */ .scroll-indicator { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 1rem; }

.scroll-circle { width: 32px; height: 32px; border: 2px solid #333; border-radius: 50%; position: relative; animation: scroll-bounce 2s infinite; }

.scroll-circle::after { content: ''; position: absolute; top: 8px; left: 50%; width: 4px; height: 8px; background: #333; border-radius: 2px; transform: translateX(-50%); }

@keyframes scroll-bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }

/* About Section */ .about-section { padding: 8rem 0; background: #f8f9fa; }

.scrolling-text-wrapper { overflow: hidden; margin-bottom: 4rem; }

.scrolling-text-block { display: flex; gap: 3rem; animation: scroll-text 30s linear infinite; }

.scrolling-text { font-size: 3rem; font-weight: 700; white-space: nowrap; color: #659CE7; }

.scrolling-text.alternate-text { color: #333; }

@keyframes scroll-text { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }

.about-grid { display: grid; grid-template-columns: auto 1fr; gap: 4rem; align-items: start; }

.about-intro p { font-size: 1.1rem; font-weight: 500; }

.about-content p { font-size: 1.2rem; line-height: 1.8; margin-bottom: 3rem; color: #666; }

.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }

.stat-item { text-align: center; }

.stat-number { font-size: 3rem; font-weight: 700; color: #659CE7; margin-bottom: 0.5rem; }

.stat-label { font-size: 0.9rem; color: #666; line-height: 1.4; }

.divider { height: 1px; background: #ddd; margin: 4rem 0; }

/* Work Section */ .work-section { padding: 8rem 0; }

.work-header { display: grid; grid-template-columns: auto 1fr auto; align-items: end; gap: 2rem; margin-bottom: 4rem; }

.work-year { font-size: 1.1rem; font-weight: 500; }

.work-titles { text-align: center; }

.section-title { font-size: 3rem; font-weight: 700; line-height: 0.9; margin: 0; }

.work-number { font-size: 2rem; font-weight: 700; color: #999; opacity: 0.5; }

.work-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; }

.work-item { position: relative; }

.work-link { text-decoration: none; color: inherit; display: block; }

.work-image-wrap { position: relative; border-radius: 20px; overflow: hidden; margin-bottom: 1.5rem; aspect-ratio: 4/3; }

.work-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }

.work-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(101, 156, 231, 0.9); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }

.view-text { color: white; font-size: 1.2rem; font-weight: 600; letter-spacing: 2px; }

.work-link:hover .work-image { transform: scale(1.05); }

.work-link:hover .work-overlay { opacity: 1; }

.work-content { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 1rem; }

.work-name { font-size: 1.3rem; font-weight: 600; }

.work-category { font-size: 0.9rem; color: #666; }

/* Testimonial Section */ .testimonial-section { padding: 8rem 0; background: #f8f9fa; }

.section-header { text-align: center; margin-bottom: 4rem; }

.testimonial-slider { overflow: hidden; }

.testimonial-track { display: flex; animation: slide-testimonials 15s ease-in-out infinite; }

.testimonial-slide { min-width: 100%; text-align: center; padding: 2rem; }

.testimonial-quote { font-size: 1.5rem; line-height: 1.6; margin-bottom: 2rem; color: #333; font-style: italic; }

.author-name { font-size: 1.1rem; font-weight: 600; color: #333; }

.author-role { font-size: 0.9rem; color: #666; }

@keyframes slide-testimonials { 0%, 25% { transform: translateX(0); } 33%, 58% { transform: translateX(-100%); } 66%, 91% { transform: translateX(-200%); } 100% { transform: translateX(0); } }

/* Services Section */ .services-section { padding: 8rem 0; }

.services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; margin-top: 4rem; }

.service-item { padding: 2rem; border-radius: 20px; background: white; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease; }

.service-item:hover { transform: translateY(-5px); }

.service-number { font-size: 0.9rem; color: #999; margin-bottom: 1rem; }

.service-title { font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem; }

.service-description { color: #666; line-height: 1.6; }

/* CTA Section */ .cta-section { padding: 8rem 0; background: #333; color: white; }

.cta-banner { text-align: center; margin-bottom: 4rem; overflow: hidden; }

.cta-text { font-size: clamp(2rem, 8vw, 4rem); font-weight: 700; white-space: nowrap; animation: slide-cta 20s linear infinite; }

@keyframes slide-cta { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }

.cta-content { text-align: center; max-width: 600px; margin: 0 auto; }

.cta-content p { font-size: 1.2rem; line-height: 1.6; margin-bottom: 2rem; color: #ccc; }

.cta-content .main-button { background: #659CE7; }

.cta-content .main-button:hover { background: #4a8bc8; }

/* Footer */ .footer { background: #f8f9fa; padding: 4rem 0 2rem; }

.footer-content { display: flex; flex-direction: column; gap: 3rem; }

.footer-top { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 2rem; }

.footer-nav { display: flex; gap: 2rem; }

.footer-link { text-decoration: none; color: #333; font-weight: 500; transition: color 0.3s ease; }

.footer-link:hover { color: #659CE7; }

.newsletter { text-align: center; max-width: 400px; margin: 0 auto; }

.newsletter h3 { margin-bottom: 1rem; font-size: 1.3rem; }

.newsletter-form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }

.newsletter-form input { flex: 1; padding: 0.75rem 1rem; border: 1px solid #ddd; border-radius: 25px; font-size: 1rem; }

.newsletter-form button { padding: 0.75rem 1.5rem; background: #659CE7; color: white; border: none; border-radius: 25px; cursor: pointer; font-weight: 500; transition: background 0.3s ease; }

.newsletter-form button:hover { background: #4a8bc8; }

.newsletter p { font-size: 0.9rem; color: #666; }

.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 2rem; border-top: 1px solid #ddd; font-size: 0.9rem; color: #666; }

.footer-legal { display: flex; gap: 2rem; }

.footer-links { display: flex; gap: 2rem; }

.footer-links a { color: #666; text-decoration: none; transition: color 0.3s ease; }

.footer-links a:hover { color: #659CE7; }

/* Responsive Design */ @media (max-width: 1024px) { .nav-grid { grid-template-columns: auto 1fr auto; }

```
.nav-container-items {
    gap: 2rem;
}

.hero-section {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 6rem 2rem 4rem;
}

.hero-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
}

.copyright-symbol {
    position: static;
    transform: none;
}

.about-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
}

.stats-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
}

.work-grid {
    grid-template-columns: 1fr;
}

.services-grid {
    grid-template-columns: 1fr;
}

.footer-top {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
}

.footer-nav {
    justify-content: center;
}

```

}

@media (max-width: 768px) { .container { padding: 0 1rem; }

```
.nav-container {
    padding: 1rem;
}

.nav-grid {
    gap: 1rem;
}

.nav-container-items {
    gap: 1rem;
}

.hero-section {
    padding: 4rem 1rem 2rem;
}

.hero-image-wrapper {
    width: 300px;
    height: 400px;
}

.scrolling-text {
    font-size: 2rem;
}

.hero-title {
    font-size: 3rem;
}

.section-title {
    font-size: 2rem;
}

.footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
}

```

}

@media (max-width: 480px) { .nav-link { font-size: 0.9rem; }

```
.hero-image-wrapper {
    width: 250px;
    height: 320px;
}

.hero-title {
    font-size: 2.5rem;
}

.section-title {
    font-size: 1.8rem;
}

.work-content {
    grid-template-columns: 1fr;
    gap: 0.5rem;
}

.service-item {
    padding: 1.5rem;
}

```

}

// Wait for DOM to be fully loaded document.addEventListener('DOMContentLoaded', function() { // Initialize all animations and interactions initScrollAnimations(); initStatCounters(); initSmoothScrolling(); initNavigation(); initTestimonialSlider(); });

// Scroll animations using GSAP function initScrollAnimations() { gsap.registerPlugin(ScrollTrigger);

```
// Animate hero content
gsap.from('.hero-content .title-wrap', {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out'
});

gsap.from('.hero-image-container', {
    opacity: 0,
    x: 100,
    duration: 1,
    delay: 0.5,
    ease: 'power2.out'
});

// Animate sections on scroll
gsap.utils.toArray('.about-content, .work-item, .service-item').forEach((element) => {
    gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Parallax effect for hero section
gsap.to('.hero-image', {
    yPercent: -20,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

```

}

// Animated stat counters function initStatCounters() { const statNumbers = document.querySelectorAll('.stat-number');

```
statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
            animateCounter(stat, target, 2000);
        }
    });
});

```

}

function animateCounter(element, target, duration) { let start = 0; const increment = target / (duration / 16);

```
function updateCounter() {
    start += increment;
    if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
    } else {
        element.textContent = target;
    }
}

updateCounter();

```

}

// Smooth scrolling for navigation links function initSmoothScrolling() { const navLinks = document.querySelectorAll('a[href^="#"]');

```
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

```

}

// Active navigation highlighting function initNavigation() { const sections = document.querySelectorAll('section[id]'); const navLinks = document.querySelectorAll('.nav-link');

```
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

```

}

// Testimonial slider auto-rotation function initTestimonialSlider() { const slides = document.querySelectorAll('.testimonial-slide'); let currentSlide = 0;

```
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function updateSlider() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${currentSlide * 100}%)`;
    });
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

```

}

// Mobile menu toggle (if needed) function initMobileMenu() { const menuButton = document.querySelector('.menu-button'); const navigation = document.querySelector('.navigation');

```
if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        navigation.classList.toggle('active');
        menuButton.classList.toggle('active');
    });
}

```

}

// Intersection Observer for fade-in animations function initIntersectionObserver() { const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

```
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements that should fade in
document.querySelectorAll('.work-item, .service-item').forEach(el => {
    observer.observe(el);
});

```

}

// Form submission handling function initContactForm() { const form = document.querySelector('.newsletter-form');

```
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your backend
        console.log('Newsletter subscription:', email);
        
        // Show success message
        showMessage('Thank you for subscribing!', 'success');
        
        // Reset form
        this.reset();
    });
}

```

}

function showMessage(message, type = 'info') { // Create message element const messageEl = document.createElement('div'); messageEl.className =  `message message-${type}`; messageEl.textContent = message;

```
// Add styles
Object.assign(messageEl.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 1.5rem',
    background: type === 'success' ? '#4CAF50' : '#2196F3',
    color: 'white',
    borderRadius: '4px',
    zIndex: '10000',
    opacity: '0',
    transform: 'translateY(-20px)',
    transition: 'all 0.3s ease'
});

// Add to page
document.body.appendChild(messageEl);

// Animate in
setTimeout(() => {
    messageEl.style.opacity = '1';
    messageEl.style.transform = 'translateY(0)';
}, 100);

// Remove after 3 seconds
setTimeout(() => {
    messageEl.style.opacity = '0';
    messageEl.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        document.body.removeChild(messageEl);
    }, 300);
}, 3000);

```

}

// Performance optimization: Debounce scroll events function debounce(func, wait) { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; }

// Apply debounce to scroll handlers const debouncedScrollHandler = debounce(() => { // Handle scroll events here if needed }, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);
