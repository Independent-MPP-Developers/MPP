var link = document.getElementById("theme-link");

function ChangeTheme(event)
{
    console.log("dark yes");
    var theme = event.detail ? 'https://unpkg.com/bulma-prefers-dark' : '../styles/bulma.css';
    link.setAttribute("href", theme);
}

window.addEventListener('colorMode', ChangeTheme);