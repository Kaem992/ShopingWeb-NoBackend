function openNav() {
  if (window.innerWidth <= 768) {
    document.getElementById("myNav").style.width = "100%";
  }
  else {  // For larger screens (e.g., tablets or desktops)
    window.location.href = '/';  // Redirects to the homepage
  }
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}



