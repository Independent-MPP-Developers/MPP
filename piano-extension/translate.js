(function (window) {
    const TRAN_TABLE = {
        "1": [
            "Multiplayer Piano Extension",
            "Расширение для многопользовательского пианино"
        ],
        "2": [
            "Activate the extension",
            "Активировать расширение"
        ]
    };
    const languages = ["en", "ru"]

    function setLanguage (lang){
        const languageIndex = languages.indexOf(lang);
        if (languageIndex === -1)
            return false; // Unsuported language

        for(const id in TRAN_TABLE){
            const translateResult = TRAN_TABLE[id];
            const translateElement = document.querySelector(`[t="${id}"]`);

            translateElement.innerText =  translateResult[languageIndex];
        };

        return true;
    };

    const language = navigator.language.substr(0, 2);
    setLanguage(language);

    window.setLanguage = setLanguage;
})(window)