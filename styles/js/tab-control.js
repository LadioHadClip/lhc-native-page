var nav_tabs = document.getElementsByClassName('nav-bar-tab');

Array.from(nav_tabs).forEach(element => {
    element.addEventListener("click", (e) => {
        window.alert(element.childNodes[0].text);
        if(element.childNodes[0].text == "Articles"){
            handleArticles();
        }else if(element.childNodes[0].text == "Animations"){
            handleAnimations();
        }
        e.preventDefault();
    })
});
handleArticles();

function handleArticles() {
    let test_md = 'resources/files/test.md';
    fetch(test_md).then(
        data => {
            data.text().then(
                text =>{
                    document.getElementsByClassName('main-content-container')[0].innerHTML = marked(text);
                }
            )
        }
    )
}

function handleAnimations() {
    let test_html = 'midautumn.html';
    let container_node = document.getElementsByClassName('main-content-container')[0];
    let container_style = window.getComputedStyle(container_node);
    let width = container_style.width
    let height = "1200px";

    document.getElementsByClassName('main-content-container')[0].innerHTML = 
        `<iframe src="${test_html}" title="iframe example 1" width="${width}" height="${height}"></iframe>`;
}