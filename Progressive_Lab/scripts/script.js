let slideIndex = 0;
const slides = ["images/background_test.jpg", "images/background_image.jpg", "images/webmaster-website.gif"];

// Quote of the day method
window.onload = () => {
  fetch('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/today')
    .then(res => res.json())
    .then(data => {
        const quote = data[0].q;
        const author = data[0].a;
        document.getElementById("quote-text").textContent = `"${quote}"`;
        document.getElementById("quote-author").textContent = `– ${author}`;
    })
    .catch(error => {
      document.getElementById('quote').innerText = "Could not load quote.";
      console.error('Error fetching quote:', error);
    });
};


// Slideshow Method
setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    document.getElementById("slide").src = slides[slideIndex];
}, 3000);

