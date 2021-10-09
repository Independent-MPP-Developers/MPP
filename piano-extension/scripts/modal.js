$(".new-butt").click(async function () {
    var token = (await chromeStorageGet("OAUTH2MPPE"))["OAUTH2MPPE"];
    if (!token){
        var menu = $("#main-nav");
        return !menu.hasClass("is-active") && menu.click();
    };

    var target = $(this).data("target");
    $(target).addClass("is-active");
});

$(".modal-exit").click(function () {
    var target = $(this).data("target");
    $(target).removeClass("is-active");
});