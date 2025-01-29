
fetch('assets/header.html')
  .then(response => response.text())
  .then(data => {
    // Insert the content from header.html into the div with id "header"
    document.getElementById('header').innerHTML = data;

    // Extract CSS <link> tags from the header.html content
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const cssLinks = doc.querySelectorAll('link[rel="stylesheet"]');

    // Append the CSS <link> tags to the <head> of the current document
    cssLinks.forEach(link => {
      document.head.appendChild(link);
    });
  })
  .catch(error => console.error('Error loading HTML:', error));


fetch('assets/footer.html')
  .then(response => response.text())
  .then(data => {
    // Insert the content from header.html into the div with id "header"
    document.getElementById('footer').innerHTML = data;

    // Extract CSS <link> tags from the header.html content
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const cssLinks = doc.querySelectorAll('link[rel="stylesheet"]');

    // Append the CSS <link> tags to the <head> of the current document
    cssLinks.forEach(link => {
      document.head.appendChild(link);
    });
  })
  .catch(error => console.error('Error loading HTML:', error));



window.onload = function () {
  var homeLink = document.getElementById("homeLink");
  var shopLink = document.getElementById("shopLink");
  var aboutLink = document.getElementById("aboutLink");
  var contactLink = document.getElementById("contactLink");

  function updateLinks() {
    // Check if the current page is not the home page
    if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
      homeLink.href = "/";  // Adjust if needed to match your site's home URL
    }

    // Update shopLink if the current page is shop page
    if (window.location.pathname === "/shop.html") {
      shopLink.href = "/index.htmlshop"; // Or another link if you're on the shop page
    }
  }

  // Initial update on page load
  updateLinks();

  // Listen for changes in the URL (e.g., back or forward button clicks)
  window.addEventListener('popstate', updateLinks);
};

