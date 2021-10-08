$(".modal-enter").click(function () {
    var target = $(this).data("target");
    $(target).addClass("is-active");
});

$(".modal-exit").click(function () {
    var target = $(this).data("target");
    $(target).removeClass("is-active");
});