(function () {
    'use strict';
    const AF_JSON = "data-json";
    const EV_DEJSONIZE = "dejsonize";
    window.customElements.define('multi-language-input', class extends HTMLElement {
        constructor() {
            super();
            //
            let self = this;
            let userInput = null;
            self.innerHTML = document.querySelector('link[href*="multi.language.input.html"]').import.querySelector("template").innerHTML;
            if (self.getAttribute("data-type") === "textarea") {
                self.querySelector(":scope > input").remove();
                self.querySelector(":scope > textarea").placeholder = self.title;
                userInput = self.querySelector(":scope > textarea");
            } else {
                self.querySelector(":scope > textarea").remove();
                self.querySelector(":scope > input").placeholder = self.title;
                userInput = self.querySelector(":scope > input");
            }
            self.querySelector(":scope > select").addEventListener("change", () => {
                userInput.value = self.currentLanguageVal;
            });
            userInput.addEventListener("blur", (e) => {
                self.currentLanguageVal = userInput.value;
                self.dispatchEvent(new Event("blur"));
            });
            self.addEventListener(EV_DEJSONIZE, function () {
                self.querySelector(":scope > select").dispatchEvent(new Event("change"));
            });
        }
        get currentLanguageVal() {
            let self = this;
            let data = {};
            try {
                data = JSON.parse(self.getAttribute(AF_JSON) || "{}") || {};
            } catch (e) {
                console.error("The string multi-language-input try to parse is not a valid JSON: " + self.getAttribute(AF_JSON));
            }
            let lang = self.querySelector(":scope > select").value;
            return data[lang] || "";
        }
        set currentLanguageVal(value) {
            let self = this;
            let data = {};
            try {
                data = JSON.parse(self.getAttribute(AF_JSON) || "{}") || {};
            } catch (e) {
                console.error("The string multi-language-input try to parse is not a valid JSON: " + self.getAttribute(AF_JSON));
            }
            let lang = self.querySelector(":scope > select").value;
            data[lang] = value;
            self.setAttribute(AF_JSON, JSON.stringify(data));
        }
    });
}());
