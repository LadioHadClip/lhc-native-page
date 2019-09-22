import { Router } from '../../utils/router.mjs';

// var nav_tabs = document.getElementsByClassName('nav-bar-tab');

// Array.from(nav_tabs).forEach(element => {
//     element.addEventListener("click", (e) => {
//         window.alert(element.childNodes[0].text);
//         if(element.childNodes[0].text == "Articles"){
//             handleArticles();
//         }else if(element.childNodes[0].text == "Animations"){
//             handleAnimations();
//         }
//         e.preventDefault();
//     })
// });
// handleArticles();

function handleArticles() {
    let test_md = 'resources/files/test.md';
    return fetch(test_md)
        .then(data => data.text())
        .then(text => marked(text))
}

function handleAnimations() {
    let test_html = 'midautumn.html';
    let container_node = document.getElementsByClassName('main-content-container')[0];
    let container_style = window.getComputedStyle(container_node);
    let width = container_style.width;
    let height = "1200px";

    return `<iframe src="${test_html}" title="iframe example 1" width="${width}" height="${height}"></iframe>`;
}

window.Router = new Router({ mode: 'hash' });
window.Router.mount(document.querySelector(".main-content-container"));
window.Router.register_equal(
    '', '#/Articles'
);
window.Router.register(
    '#/Articles', handleArticles, 'promise'
);
window.Router.register(
    '#/Animations', handleAnimations, 'handle'
);
// window.location.hash = '#/';