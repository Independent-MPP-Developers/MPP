(function (window){
    const storage = window.chrome.storage; // Grab chrome storage
    var inputButtons = $('input[save=""]');

    function chromeStorageSet(object){ // Set chrome storage object via promise
        const asyncPromise = new Promise((resolve) => {
            storage.sync.set(object, () => { resolve(true) });
        });
        return asyncPromise
    };
    
    function chromeStorageGet(key){ // Get chrome storage object via promise
        const asyncPromise = new Promise((resolve) => {
            storage.sync.get(key, (result) => { resolve(result) });
        });
        return asyncPromise
    };

    async function setState(buttons, custom){
        buttons = Array.from(buttons);
        for(let i = 0; i < buttons.length ; i++){
            let button = buttons[i];
            var key = button.id;
            var state = custom || (await chromeStorageGet(key))[key];

            button.checked = state || false;
        };
    }

    function newState(event){
        var button = event.target;
        var state = button.checked;
        var key = button.id

        chromeStorageSet({ [key]: state });
        setState(button, state);
    };
    
    inputButtons.on('change', newState);
    setState(inputButtons);

    window.chromeStorageGet = chromeStorageGet; /* "Export" promise functions for use in other scripts */
    window.chromeStorageSet = chromeStorageSet;
})(window);