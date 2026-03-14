document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // Change icon between bars and times (X)
        const icon = hamburger.querySelector("i");
        if(navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.querySelector("i").classList.replace("fa-times", "fa-bars");
        });
    });

    // 2. Intersection Observer for Scroll Animations (Slide Up / Fade In)
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach(el => scrollObserver.observe(el));


    // 3. Animated Number Counter Logic (Section 6)
    const counters = document.querySelectorAll(".stat-number");
    let hasAnimated = false; // Flag to ensure animation runs only once

    const animateCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const current = +counter.innerText;
                // Increment value (adjust divisor for speed)
                const increment = target / 50; 

                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Observe Transparency section for number counting
    const statsSection = document.querySelector("#transparency");
    
    if(statsSection){
        const statsObserver = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !hasAnimated) {
                animateCounters();
                hasAnimated = true; // Prevents re-animating
            }
        }, { threshold: 0.5 }); // Trigger when 50% is visible

        statsObserver.observe(statsSection);
    }
});