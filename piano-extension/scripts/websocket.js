function GUID() {
    // @broofa
    // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid

    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

/**
 * This function helps to mimic a fetch request but with websockets. 
 * Works just like normal WebSocket.send(), but returns a promise with server response 
 * instead of undefined.
 * @param {string | ArrayBufferView | ArrayBufferLike | Blob} payload payload - Data to be sent to websocket.
 * @param {number} timeout timeout - Request response timeout.
 * 
 * @return {Promise<Object>} Response object from websocket server.
*/
function Callback(payload, timeout) {
    const m_id = GUID();
    if (!this._CBTable) {
        this._CBTable = {};
    };

    timeout = typeof timeout === "number" ? timeout : 5;

    return new Promise((resolve, reject) => {
        try {
            var invalid = "GUID" in payload;
            if (invalid)
                return resolve({ error: 'Payload cannot contain "GUID" keyword.' });
        } catch (e) { }; // Not object? Either way safe.

        var begin = new Date();
        this._CBTable[m_id] = { r: null };

        function intercept({ data }) {
            try {
                data = JSON.parse(data);
            } catch (e) { return; };

            const { GUID } = data;

            if (GUID === m_id) { //* Server responded *//
                this.removeEventListener("message", intercept); // Disconnect
                this._CBTable[m_id] = { r: data };
            };
        };

        try {
            var parsed_payload = JSON.stringify({ ...payload, GUID: m_id });
            this.send(parsed_payload);
            this.addEventListener('message', intercept)
        } catch (error) {
            delete this._CBTable[m_id];
            return resolve({ error });
        };

        function check() {
            var result = this._CBTable[m_id].r;
            var current = new Date();

            if (!result) {
                if ((current - begin) / 1000 >= timeout) {
                    return resolve({ error: 'Timeout' });
                };
                requestAnimationFrame(check.bind(this));
            } else {
                resolve({ response: result });
                delete this._CBTable[m_id];
            };
        };

        requestAnimationFrame(check.bind(this));
    });
};

// Would use Object.defineProperty but weird binding issues with "this".
WebSocket.prototype.callback = Callback;

; /*  WebSocket Logic  */;

const MANIFEST = chrome.runtime ? chrome.runtime.getManifest() : {};
const WS_URI = MANIFEST.ws_uri || "ws://localhost:3030/";
const WS_RECON_TIME = MANIFEST.ws_reconnection_time || 3000;
function connectMPPEWS() {
    window.mppews = new WebSocket(WS_URI);
    mppews.onclose = () => setTimeout(connectMPPEWS, WS_RECON_TIME);
    mppews.onopen = () => { console.log('Websocket open') };
    mppews.onmessage = ({ data }) => { };
    mppews.onerror = (error) => { };

    for (let i = 0 ; i < OnOpen.length ; i++){
        var func = OnOpen[i];
        mppews.addEventListener("open", func);
    };
};

connectMPPEWS();