// returns saved data

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

    document.getElementById("nick_input").value = localStorage.getItem("save_changes_nick");
    document.getElementById("description_input").value = localStorage.getItem("save_changes_description");
    document.getElementById("img_avatar").src = localStorage.getItem("save_img_avatar");
}

var link = document.getElementById("theme-link");
$("#Dark-mode-btn").click(function(){dispatchEvent(new CustomEvent("colorMode", {detail: true}))});

window.addEventListener('colorMode', ChangeTheme);

var lightTheme = "../styles/bulma.css";
var darkTheme = "../styles/bulma-darkly.css";
var currTheme = link.getAttribute("href");
var theme = "";

// mode change function

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

$(".change").on("keyup", function () {
    if ($(this).val() == '') {
    } else {
        $('#infochange').removeClass("is-static");
    }

});

// function for saving changes <input>

$("#infochange").on("click", function () {
    localStorage.setItem("save_changes_nick", document.getElementById("nick_input").value);
    localStorage.setItem("save_changes_description", document.getElementById("description_input").value);
    $('#infochange').addClass("is-static");
});

myfile.onchange = function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            img_avatar.src = e.target.result;
            localStorage.setItem("save_img_avatar", e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
    };
};