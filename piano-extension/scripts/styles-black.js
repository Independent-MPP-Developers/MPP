var link = document.getElementById("theme-link");

function ChangeTheme(event)
{
    var theme = event.detail ? 'styles-dark.css' : 'styles.css';
    link.setAttribute("href", theme);
}

window.addEventListener('colorMode', ChangeTheme);