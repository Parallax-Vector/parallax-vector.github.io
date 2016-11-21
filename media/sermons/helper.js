var root = location.protocol + "//" + location.host;
var sidebarJS = root + "/sidebar.js";
var navbarJS = root + "/header.js";

var head = document.getElementsByTagName("head")[0];
var sidebar = document.createElement("script");
var navbar = document.createElement("script");
sidebar.type = "text/javascript";
navbar.type = "text/javascript";
sidebar.src = sidebarJS;
navbar.src = navbarJS;
head.appendChild(sidebar)
head.appendChild(navbar)