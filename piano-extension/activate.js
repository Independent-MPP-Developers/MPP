(function (window) {
    const storage = window.chrome.storage; // Grab chrome storage
    var inputButtons = $('input[save=""]');

    function chromeStorageSet(object) { // Set chrome storage object via promise
        return new Promise(resolve => {
            storage.sync.set(object, _ => resolve(true));
        });
    };

    function chromeStorageGet(key) { // Get chrome storage object via promise
        return new Promise(resolve => {
            storage.sync.get(key, result => resolve(result));
        });
    };

    function handleEvent(name, detail) {
        if (!name) { return; };
        var event = new CustomEvent(name, { detail });
        dispatchEvent(event);
    };

    async function setState(buttons, custom) {
        buttons = Array.from(buttons);
        for (let i = 0; i < buttons.length; i++) {
            let button = buttons[i];
            var key = button.id;
            var event = button.getAttribute('event');
            var state = custom || (await chromeStorageGet(key))[key] || false;

            button.checked = state;
            handleEvent(event, state);
        };
    }

    function newState(event) {
        var button = event.target;
        var state = button.checked;
        var event = button.getAttribute('event');
        var key = button.id

        chromeStorageSet({ [key]: state });
        setState(button, state);
        handleEvent(event, state);
    };

    inputButtons.on('change', newState);
    setState(inputButtons);

    window.chromeStorageGet = chromeStorageGet; /* "Export" promise functions for use in other scripts */
    window.chromeStorageSet = chromeStorageSet;
})(window);