(function (window) {
    const AuthStorageKey = "OAUTH2MPPE";
    var submitImage = null;

    async function createScript(event) {
        event.preventDefault()
        const token = (await chromeStorageGet(AuthStorageKey))[AuthStorageKey];

        if (!token)
            return;

        let payload = {};
        var content = $("form").serializeArray();

        for (let i = 0; i < content.length; i++) {
            var field = content[i];
            payload[field.name] = field.value;
        };

        payload['image'] = submitImage;

        const result = (await mppews.callback({
            request: 'new_script',
            payload: { script: payload },
            token: token
        })).response;

    };

    window.createScript = createScript;

    $("form").submit(createScript);

    $(".modal-exit").click(function () {
        $(".submit").toggleClass("is-loading", false);
        submitImage = null;
    });

    $('input[type="file"]').on("change", function (event) {
        var file = event.target.files[0];
        if (file) {
            $(".submit").toggleClass("is-loading", true);
            var reader = new FileReader();
            reader.onload = function (event) {
                $(".submit").toggleClass("is-loading", false);
                submitImage = event.target.result
            };
            reader.readAsDataURL(file);
        } else {
            submitImage = null;
        };
    });
})(window);