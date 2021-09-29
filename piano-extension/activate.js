(async function (window){
    const storage = window.chrome.storage; // Grab chrome storage
    const activateStorageKey = 'mp-A_STATE'; // Storage key for whether run scripts or not
    const activationButton = document.getElementById('mp-activate');
    const defaultState = true;

    function chromeStorageSet(object){ // Set chrome storage object via promise
        const asyncPromise = new Promise((resolve) => {
            chrome.storage.sync.set(object, () => { resolve(true) });
        });
        return asyncPromise
    };
    
    function chromeStorageGet(key){ // Get chrome storage object via promise
        const asyncPromise = new Promise((resolve) => {
            storage.sync.get(key, (result) => { resolve(result) });
        });
        return asyncPromise
    };

    function setScriptState(){
        const scriptActivated = activationButton.checked
        chromeStorageSet({ [activateStorageKey]: scriptActivated });
        dispatchEvent(new CustomEvent('mp-activate', { detail: scriptActivated })); // Change later..? idk how were doing the logic right now
    };

    const buttonState = (await chromeStorageGet([activateStorageKey]))[activateStorageKey];
    if (buttonState === undefined) // First time loaded
        await chromeStorageSet({ [activateStorageKey]: defaultState });
    
    activationButton.checked = buttonState || false;
    activationButton.addEventListener('change', setScriptState);

    window.chromeStorageGet = chromeStorageGet; /* "Export" promise functions for use in other scripts */
    window.chromeStorageSet = chromeStorageSet;
})(window);