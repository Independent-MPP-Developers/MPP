(async function (window) {
    /*
        The current api for content-script <-> extension
        communication is unecesarily complicated.
        Promises would be nice...
    */

    var LoadedScripts = {};
    var Websocket = null;

    const SCRIPT_LOCATION = '__.mppe.scripts';
    const IDENTIFIER = 'script_dump';

    const MANIFEST = chrome.runtime.getManifest();

    const WS_URI = MANIFEST['ws_uri'];
    const WS_RECON = MANIFEST['ws_reconnection_time']

    function Load() {
        let Scripts = JSON.parse(localStorage[SCRIPT_LOCATION] || '[]');
        let Request = JSON.stringify({ request: "get_scripts", payload: { scripts: Scripts }, GUID: IDENTIFIER });
        Websocket.send(Request);
    };

    function Dump({ data: WebSocketMessage }) {
        const { GUID, scripts: Scripts } = JSON.parse(WebSocketMessage);
        if (GUID === IDENTIFIER){
            Scripts.forEach((Script) => {
                if (LoadedScripts[Script.hash])
                    return;
                LoadedScripts[Script.Hash] = true;
                new Function(Script.source).bind(window.MPP)();
            });
        };
    };

    new (function () {
        Websocket = new WebSocket(WS_URI);
        Websocket.addEventListener('close', () => { setTimeout(this, WS_RECON) });
        Websocket.addEventListener('open', Load);
        Websocket.addEventListener('message', Dump);
    });

    console.log(localStorage[SCRIPT_LOCATION])

})(window);