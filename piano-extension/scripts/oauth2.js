(async function (window) {
    const AuthStorageKey = "OAUTH2MPPE"
    const M_SIGNIN = `<span class="icon"><i class="fab fa-google"></i></span>Log in with <strong>&nbsp;Google</strong>`
    const M_SIGNOUT = `<span class="icon"><i class="fab fa-google"></i></span>Log out with <strong>&nbsp;Google</strong>`

    var clientID = encodeURIComponent('1054187376334-b1oujbk5a837nt6o8vcfo6e5bbrpv1og.apps.googleusercontent.com');
    var IDToken = encodeURIComponent('id_token');
    var redirect = encodeURIComponent('https://ifacgfmfdlghfdpohnjfncnkhjbnekog.chromiumapp.org/pages/browse.html');
    var scope = encodeURIComponent('openid');
    var state = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));
    var prompt = encodeURIComponent('consent');

    var SIGNED_IN = (await chromeStorageGet(AuthStorageKey))[AuthStorageKey]
    SIGNED_IN = SIGNED_IN !== undefined && SIGNED_IN !== null;

    var IN_FLOW = false;

    function updateButton(authState) {
        $("#OAuth2").html(authState ? M_SIGNOUT : M_SIGNIN);
        $("#OAuth2").toggleClass("is-success", !authState);
        $("#OAuth2").toggleClass("is-danger", authState);
    };

    var toggleLoad = (state) => {
        $("#OAuth2").toggleClass("is-loading", state);
    };

    const authUrl = () => {
        var nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
        return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&response_type=${IDToken}&redirect_uri=${redirect}&scope=${scope}&state=${state}&nonce=${nonce}&prompt=${prompt}`
    };

    function OAuth2() {
        if (IN_FLOW) {
            return false;
        };
        
        async function Auth(authenticationURI) {
            var chromeError = chrome.runtime.lastError;
            var tokenOffset = 9;
            
            if (chromeError) {
                console.error('Error in initiating authentication flow: ', chromeError.message)

                updateButton(false);
                toggleLoad(false);

                IN_FLOW = false;
                return false;
            } else {
                var token = authenticationURI.substring(authenticationURI.indexOf("id_token=") + tokenOffset);
                token = token.substring(0, token.indexOf("&"));
                var result = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split(".")[1]));
                
                await chromeStorageSet({ [AuthStorageKey]: result }); // ahhhh
                updateButton(true);
                toggleLoad(false);

                SIGNED_IN = true
                IN_FLOW = false;
                
                return true;
            };
        };
        
        async function DeAuth() {
            await chromeStorageSet({ [AuthStorageKey]: null }); // Handle errors ...?
            window.location.reload();
        };
        
        toggleLoad(true);
        IN_FLOW = true;

        if (!SIGNED_IN) {
            chrome.identity.launchWebAuthFlow({ "url": authUrl(), "interactive": true }, Auth);
        } else {
            chrome.identity.launchWebAuthFlow({ "url": "https://accounts.google.com/logout" }, DeAuth);
        };
    };

    updateButton(SIGNED_IN);
    $("#OAuth2").click(OAuth2);
})(window);