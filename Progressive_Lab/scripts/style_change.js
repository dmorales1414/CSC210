// When the page loads, grab the elements
const themeToggleBtn = document.getElementById('theme-toggle');
const themeLink = document.getElementById('theme-stylesheet');

// Add click event listener to toggle the stylesheet
themeToggleBtn.addEventListener('click', () => {
const currentHref = themeLink.getAttribute('href');

// Toggle between style.css and style2.css
if (currentHref === 'styles/style.css') {
    themeLink.setAttribute('href', 'styles/style2.css');
} else {
    themeLink.setAttribute('href', 'styles/style.css');
}
});
