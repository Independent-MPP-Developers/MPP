(function (window) {
    const TRAN_TABLE = {
        "1": [
            "Multiplayer Piano Extension",
            "Расширение для многопользовательского пианино"
        ],
        "2": [
            "Activate the extension",
            "Активировать расширение"
        ],
        "3":[
            "Extension settings",
            "Настройки расширения"
        ],
        "4":[
            "Activate dark mode",
            "Активировать темный режим"
        ]
    };
    const languages = ["en", "ru"]

    function setLanguage (lang){
        const languageIndex = languages.indexOf(lang);
        if (languageIndex === -1)
            return false; // Unsuported language

        for(const id in TRAN_TABLE){
            const translateResult = TRAN_TABLE[id];
            const translateList = document.querySelectorAll(`[t="${id}"]`);
            
            for(const element of translateList){
                element.innerText =  translateResult[languageIndex];
            };
        };

        return true;
    };

    const language = navigator.language.substr(0, 2);
    /* Note we are ignoring localization for now */
    setLanguage(language);

    window.setLanguage = setLanguage;
})(window)