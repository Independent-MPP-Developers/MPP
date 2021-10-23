var link = document.getElementById("theme-link");
$("button").click(function(){dispatchEvent(new CustomEvent("colorMode", {detail: true}))});

window.addEventListener('colorMode', ChangeTheme);




function ChangeTheme()
{
    let lightTheme = "../styles/bulma.css";
    let darkTheme = "https://jenil.github.io/bulmaswatch/darkly/bulmaswatch.min.css";
    var currTheme = link.getAttribute("href");
    var theme = "";
    if(currTheme == lightTheme)
    {
   	    currTheme = darkTheme;
   	    theme = "dark";
    }
    else
    {    
   	    currTheme = lightTheme;
   	    theme = "light";
    }
    link.setAttribute("href", currTheme);
} 