// screen-short.js
window.addEventListener('keydown', function(e) {
    if (e.key === 'PrintScreen') {
        e.preventDefault();
    }

    if (e.key === 'PrintScreen' || (e.key === 'ctrl' && e.ctrlKey && e.shiftKey === 'S')) {
        e.preventDefault();
    }
});

// Mobile-specific prevention (experimental)
window.addEventListener('touchstart', function(e) {
    if (e.touches.length >= 2) { // Check for two or more touch points
        e.preventDefault(); 
        // Additional actions to discourage screenshot attempts on mobile
        alert("Screenshots and screen recordings are disabled."); 
    }
});

