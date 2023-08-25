// ==UserScript==
// @name   pickle
// @version 0.1.4
// @match  https://picrew.me/*/image_maker/*
// @icon   https://www.google.com/s2/favicons?sz=64&domain=picrew.me
// @grant  GM_addStyle
// @run-at document-start
// ==/UserScript==
const root = document.createElement("div");
root.setAttribute("id", "pickle-app");
root.style = "position: absolute; top: 0; left: 0;";
document.body.appendChild(root);