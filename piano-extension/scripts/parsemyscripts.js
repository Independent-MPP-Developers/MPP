(function (window) {
    const AuthStorageKey = "OAUTH2MPPE";

    async function getScriptObjects (scriptList){
        var objects = (await mppews.callback({
            request: 'get_scripts',
            payload: { scripts: scriptList }
        })).response;
        return objects
    };

    function createScriptNode(scriptObject){
        var self = $(".script-template").clone();

        self.toggleClass("script-template");
        self.toggleClass("script-node")

        var sourceCode = scriptObject.source;
        if (sourceCode.length > 200){
            sourceCode = sourceCode.substr(0, 200) + "\n...";
        };

        self.find(".script-title").text(scriptObject.name);
        self.find("code").text(sourceCode);
        self.find("code").text(scriptObject.name);
        self.toggleClass("is-hidden");

        $(".script-container").append(self);
        return self;
    };

    async function fetchPersonalScripts (){
        const token = (await chromeStorageGet(AuthStorageKey))[AuthStorageKey];
        if (!token) return;

        const response = (await mppews.callback({
            request: 'my_scripts',
            payload: { },
            token: token
        })).response;

        var scripts = response.scripts;
        if (scripts){
            var scriptObjects = (await getScriptObjects(scripts))?.scripts || [];
            console.log(scriptObjects.length)
            for (let i = 0 ; i < scriptObjects.length ; i++){
                var object = scriptObjects[i];
                createScriptNode(object);
            }
        };
    };

    OnOpen.push(fetchPersonalScripts);
})(window)