window.onload=function(){
    if(localStorage.getItem("theme") == "light")
    {
        currTheme = lightTheme;
    }
    else
    {
        currTheme = darkTheme;
    }
    link.setAttribute("href", currTheme);
}

var link = document.getElementById("theme-link");
$("#Dark-mode-btn").click(function(){dispatchEvent(new CustomEvent("colorMode", {detail: true}))});

window.addEventListener('colorMode', ChangeTheme);

var lightTheme = "../styles/bulma.css";
var darkTheme = "../styles/bulma-darkly.css";
var currTheme = link.getAttribute("href");
var theme = "";


function ChangeTheme()
{
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
    localStorage.setItem("theme", theme);
}