// darkmode.js
console.log('Theme switch clicked!');
document.querySelector('.theme-switch').addEventListener('click', () => {
  document.querySelector('body').classList.toggle('dark');
  document.querySelector('.wallpaper-container').classList.toggle('dark'); // Toggle the "night" class on the wallpaper container
  
  

  // Store the user's preference in localStorage
  if (document.querySelector('body').classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Get the user's theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.querySelector('body').classList.add('dark');
    document.querySelector('.wallpaper-container').classList.add('dark'); // Toggle the "night" class on the wallpaper container

  } else {
    document.querySelector('body').classList.remove('dark');
    document.querySelector('.wallpaper-container').classList.remove('dark'); // Toggle the "night" class on the wallpaper container

  }
});