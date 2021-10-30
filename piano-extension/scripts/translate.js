(function (window) {
    const TRAN_TABLE = {
        "1": [
            "Browse",
            "Главаная"
        ],
        "2": [
            "My Scripts",
            "Мои скрипты"
        ],
        "3":[
            "Account",
            "Аккаунт"
        ],
        "4":[
            "Settings",
            "Настройки"
        ],
        "5":[
            "Have a problem? ",
            "Есть проблема? "
        ],
        "6":[
            "Send Feedback.",
            "Отправьте отзыв."
        ],
        "7":[
            "Verified only.",
            "Только проверенные."
        ],
        "8":[
            "New Script",
            "Новый скрипт"
        ],
        "9":[
            "Script",
            "Скрипт"
        ],
        "10":[
            "Info",
            "Инфо"
        ],
        "11":[
            "Stats",
            "Статистика"
        ],
        "12":[
            "Request removal",
            "Запрос на удаление"
        ],
        "13":[
            "Approved!",
            "Одобрено!"
        ],
        "14":[
            "Create MPP Script",
            "Создать МПП скрипт"
        ],
        "15":[
            "Name*",
            "Название*"
        ],
        "16":[
            "Description*",
            "Описание*"
        ],
        "17":[
            "Script*",
            "Скрипт*"
        ],
        "18":[
            "Image",
            "Изображение"
        ],
        "19":[
            "Publish",
            "Опубликовать"
        ],
        "20":[
            "Cancel",
            "Отмена"
        ],
        "21":[
            "Nickname",
            "Имя пользователя"
        ],
        "22":[
            "Description",
            "Описание"
        ],
        "23":[
            "Save",
            "Сохранить"
        ],
        "24":[
            "Settings will be supplemented",
            "Настройки будут дополняться"
        ],
        "25":[
            "Drak mode",
            "Темный режим"
        ],
        "26":[
            "Create MPP Script",
            "Создать MPP скрипт"
        ],
        "27":[
            "Name for your script.",
            "Название вашего скрипта."
        ],
        "28":[
            "Description of your script (HTML SUPPORTED).",
            "Описание вашего скрипта (HTML поддерживается)"
        ],
        "29":[
            "Paste script here.",
            "Вставьте код скрипта сюда."
        ],
        "30":[
            "Your nickname here.",
            "Ваш никнейм здесь."
        ],
        "31":[
            "Description about you.",
            "Опишите себя."
        ],
        "32":[],
        "33":[],
        "34":[],
        "35":[],
        
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
                    if (!element.matches(`textarea[t="${id}"]`)) {
                        if (!element.matches(`input[t="${id}"]`)){
                            element.innerText =  translateResult[languageIndex];
                            console.log(element)
                        }
                    };
                    element.placeholder = translateResult[languageIndex];
                };
        };

        return true;
    };

    const language = navigator.language.substr(0, 2);
    /* Note we are ignoring localization for now */
    setLanguage(language);

    window.setLanguage = setLanguage;
})(window)