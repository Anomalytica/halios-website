// AI Lifecycle Animation Script
document.addEventListener('DOMContentLoaded', function() {
    const lifecyclePhases = document.querySelectorAll('.lifecycle-phase');
    const codePhases = document.querySelectorAll('.code-phase');
    const codeContainer = document.querySelector('.code-animation-container');
    
    let currentPhase = 0;
    let isAutoPlaying = true;
    let autoPlayInterval;
    
    // Initialize the animation
    function initLifecycleAnimation() {
        // Set initial state
        setActivePhase(0);
        
        // Start auto-cycling
        startAutoCycle();
        
        // Add click handlers for manual control
        lifecyclePhases.forEach((phase, index) => {
            phase.addEventListener('click', () => {
                stopAutoCycle();
                setActivePhase(index);
                // Resume auto-cycle after 8 seconds of inactivity
                setTimeout(() => {
                    if (!isAutoPlaying) {
                        startAutoCycle();
                    }
                }, 8000);
            });
        });
        
        // Pause auto-cycle on hover
        const lifecycleSection = document.querySelector('.ai-lifecycle-content');
        if (lifecycleSection) {
            lifecycleSection.addEventListener('mouseenter', stopAutoCycle);
            lifecycleSection.addEventListener('mouseleave', () => {
                setTimeout(startAutoCycle, 1000);
            });
        }
    }
    
    function setActivePhase(phaseIndex) {
        currentPhase = phaseIndex;
        
        // Update phase buttons
        lifecyclePhases.forEach((phase, index) => {
            phase.classList.toggle('active', index === phaseIndex);
        });
        
        // Update code display
        codePhases.forEach((codePhase, index) => {
            if (index === phaseIndex) {
                codePhase.style.opacity = '1';
                codePhase.style.transform = 'translateY(0)';
                codePhase.style.zIndex = '10';
            } else {
                codePhase.style.opacity = '0';
                codePhase.style.transform = 'translateY(20px)';
                codePhase.style.zIndex = '1';
            }
        });
        
        // Add typing animation effect for code
        const activeCodePhase = codePhases[phaseIndex];
        if (activeCodePhase) {
            animateCodeTyping(activeCodePhase);
        }
    }
    
    function animateCodeTyping(codePhase) {
        const pre = codePhase.querySelector('pre');
        if (!pre) return;
        
        const originalContent = pre.innerHTML;
        pre.innerHTML = '';
        
        // Add content gradually with typing effect
        let charIndex = 0;
        const typingSpeed = 15; // milliseconds per character
        
        function typeChar() {
            if (charIndex < originalContent.length) {
                pre.innerHTML = originalContent.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        }
        
        // Start typing after a brief delay
        setTimeout(typeChar, 300);
    }
    
    function startAutoCycle() {
        if (isAutoPlaying) return;
        
        isAutoPlaying = true;
        autoPlayInterval = setInterval(() => {
            currentPhase = (currentPhase + 1) % lifecyclePhases.length;
            setActivePhase(currentPhase);
        }, 4000); // 4 seconds per phase
    }
    
    function stopAutoCycle() {
        isAutoPlaying = false;
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Initialize when DOM is ready
    if (lifecyclePhases.length > 0 && codePhases.length > 0) {
        initLifecycleAnimation();
    }
    
    // Add intersection observer for performance
    const lifecycleSection = document.querySelector('.ai-lifecycle');
    if (lifecycleSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!isAutoPlaying) startAutoCycle();
                } else {
                    stopAutoCycle();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(lifecycleSection);
    }
});
