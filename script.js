window.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.querySelector(".menu-icon");
  // console.log("icon: ", menuIcon);
  const menu = document.querySelector(".menu");
  // console.log("menu: ", menu);
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav-link");
  // console.log("navlinks: ", navLinks);
  const navButton = document.querySelector(".navbar-primary-button");

  function toggleMenu() {
    menu.classList.toggle("open");
    if (menu.classList.contains("open")) {
      menu.classList.remove("close");
      body.style.overflow = "hidden";
      menuIcon.innerHTML = "&#10005;";
      navButton.style.display = "none";
      // menu.style.display = "flex";
      // setTimeout(() => {
      //   menu.style.display = "flex";
      // }, 3000);
    } else {
      menu.classList.add("close");
      menu.classList.remove("open");
      body.style.overflow = "auto";
      menuIcon.innerHTML = "&#9776;";
      navButton.style.display = "block";
      // setTimeout(() => {
      //   // menu.style.display = "none";
      // }, 3000);
    }
  }

  function closeMenu() {
    menu.classList.add("close");
    menu.classList.remove("open");
    // menu.style.display = "none";
    body.style.overflow = "auto";
    menuIcon.innerHTML = "&#9776;";
    navButton.style.display = "block";
  }

  menuIcon.addEventListener("click", toggleMenu);

  navLinks.forEach(function (link) {
    // console.log("link:", link);
    link.addEventListener("click", function (event) {
      setTimeout(closeMenu, 100);
    });
  });
});
