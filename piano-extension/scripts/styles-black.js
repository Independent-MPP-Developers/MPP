var link = document.getElementById("theme-link");
$("#Dark-mode-btn").click(function(){dispatchEvent(new CustomEvent("colorMode", {detail: true}))});

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
    localStorage.setItem("theme", theme);
}

window.onload=function(){
    var currTheme = link.getAttribute("href");
    let lightTheme = "../styles/bulma.css";
    let darkTheme = "https://jenil.github.io/bulmaswatch/darkly/bulmaswatch.min.css";
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
