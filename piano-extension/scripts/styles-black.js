var link = document.getElementById("theme-link");

function ChangeTheme(event)
{
    console.log("dark mode yes");
    var theme = event.detail ? 'https://jenil.github.io/bulmaswatch/darkly/bulmaswatch.min.css' : '../styles/bulma.css';
    link.setAttribute("href", theme);
}

window.addEventListener('colorMode', ChangeTheme);
$("button").click(function(){dispatchEvent(new CustomEvent("colorMode", {detail: true}))})