(function (window) {
    var START_INDEX = 0;
    var END_INDEX = 5;

    async function getImageAssetSRC(asset){
        var content = (await mppews.callback({
            request: "get_asset",
            payload: { id: asset }
        })).response;
        
        var file = content.file
        var encoded = file.startsWith("data:image/png;base64,") || file.startsWith("data:image/jpeg;base64,") || file.startsWith("data:image/jpg;base64,");
        var source = encoded ? file : "data:image/png;base64," + btoa(file);

        return source;
    };

    function formatDate(date){
        date = new Date(date);
        var time = date.toLocaleTimeString();

        var broken = time.split(" ")[0].split(":")
        var hrmn = broken.slice(0, 2).join(":") + " " + time.split(" ")[1];

        return hrmn + " - " + date.toDateString();
    }
    
    async function createScriptNode(scriptInfo){
        var self = $("#script-template").clone();
        
        self.find(".script-verification").toggleClass("is-hidden", !scriptInfo.creatorVerified);
        self.find(".script-title").text(scriptInfo.name);
        self.find(".script-username").text("@" + scriptInfo.creator).attr("data-id", scriptInfo.creatorID);
        self.find(".script-description").html(scriptInfo.description);
        self.find(".script-use").text(scriptInfo.uses.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
        // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
        self.find("time").text(formatDate(scriptInfo.date));
        
        self.appendTo("#script-container");
        self.toggleClass("is-hidden");

        self.find(".script-image").attr("src", await getImageAssetSRC(scriptInfo.image));
        self.find(".script-creator-image").attr("src", await getImageAssetSRC(scriptInfo.creatorImage));
        return self;
    };
    
    async function fetchScripts(){
        $(".script-card").remove("");

        let result = (await mppews.callback({
            request: "get_scripts",
            payload: { start_index: START_INDEX, end_index: END_INDEX }
        })).response;

        if (result){
            var scripts = result.scripts
            for (let i = 0; i < scripts.length ; i++){
                var script = scripts[i];
                var scriptNode = await createScriptNode(script);

                scriptNode.toggleClass("script-card");
            };
        }else{
            // Failed to fetch :/
        };

    };

    OnOpen.push(fetchScripts);
})(window)