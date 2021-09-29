(function (window) {
    /*
        This script allows us to control the order
        of which all the other scripts are run. If we don't
        do this, the run order is controlled by the browser.
    */

    const scripts = chrome.runtime.getManifest()['web_accessible_resources'];
    const extension = chrome.extension;

    function appendScript (element){
        const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
        head.insertBefore(element, head.lastChild);
    };

    for (let i = 0; i < scripts.length; i++) {
        const script = document.createElement('script');
        const name = scripts[i];
        script.setAttribute('src', extension.getURL(name));
        appendScript(script);
    };

})(window);