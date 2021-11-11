
// returns saved data
const AuthStorageKey = "OAUTH2MPPE";

async function updateUser(user_username, user_description, user_profileImage) {
    const token = (await chromeStorageGet(AuthStorageKey))[AuthStorageKey];
    if (!token) return;
    mppews.send(JSON.stringify({ request: "update_user", payload: { userUsername: user_username, userDescription: user_description, userprofileImage: user_profileImage }, token: token }));

}


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

$(".change").on("keydown", function () {
    if ($(this).val() == '') {
    } else {
        $('#infochange').removeClass("is-static");
    }

});

// function for saving changes <input>

$("#infochange").on("click", function () {
    localStorage.setItem("save_changes_nick", document.getElementById("nick_input").value);
    localStorage.setItem("save_changes_description", document.getElementById("description_input").value);
    var user_username = document.getElementById("nick_input").value;
    var user_description = document.getElementById("description_input").value;
    var user_profileImage = document.getElementById("img_avatar").src;
    updateUser(user_username, user_description, user_profileImage);
    $('#infochange').addClass("is-static");
});

myfile.onchange = function () {
    if (this.files && this.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            localStorage.setItem("save_changes_nick", document.getElementById("nick_input").value);
            localStorage.setItem("save_changes_description", document.getElementById("description_input").value);
            img_avatar.src = e.target.result;
            var user_username = document.getElementById("nick_input").value;
            var user_description = document.getElementById("description_input").value;
            localStorage.setItem("save_img_avatar", e.target.result);
            user_profileImage = e.target.result;
            updateUser(user_username, user_description, user_profileImage);
        };
        reader.readAsDataURL(this.files[0]);
    };
};