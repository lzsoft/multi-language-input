(function () {
    'use strict';
    const AF_JSON = "data-json";
    window.customElements.define('multi-language-input', class extends HTMLElement {
        constructor() {
            super();
            //
            let userInput = null;
            this.innerHTML = document.querySelector('link[href*="multi.language.input.html"]').import.querySelector("template").innerHTML;
            if (this.getAttribute("data-type") === "textarea") {
                this.querySelector(":scope > input").remove();
                this.querySelector(":scope > textarea").placeholder = this.title;
                userInput = this.querySelector(":scope > textarea");
            } else {
                this.querySelector(":scope > textarea").remove();
                this.querySelector(":scope > input").placeholder = this.title;
                userInput = this.querySelector(":scope > input");
            }
            this.querySelector(":scope > select").addEventListener("change", () => {
                userInput.value = this.currentLanguageVal;
            });
            userInput.addEventListener("blur", (e) => {
                this.currentLanguageVal = userInput.value;
                this.dispatchEvent(new Event("blur"));
            });
        }
        get currentLanguageVal() {
            let data = {};
            try {
                data = JSON.parse(this.getAttribute(AF_JSON) || "{}") || {};
            } catch (e) {
                console.error("The string multi-language-input try to parse is not a valid JSON: " + this.getAttribute(AF_JSON));
            }
            let lang = this.querySelector(":scope > select").value;
            return data[lang] || "";
        }
        set currentLanguageVal(value) {
            let data = {};
            try {
                data = JSON.parse(this.getAttribute(AF_JSON) || "{}") || {};
            } catch (e) {
                console.error("The string multi-language-input try to parse is not a valid JSON: " + this.getAttribute(AF_JSON));
            }
            let lang = this.querySelector(":scope > select").value;
            data[lang] = value;
            this.setAttribute(AF_JSON, JSON.stringify(data));
        }
    });
}());
