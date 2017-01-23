(function() {
    'use strict';
    const ATTR_JSON = "data-json";
    const ATTR_TYPE = "data-type";
    let INPUT = null;
    //
    window.customElements.define('multi-language-input', class extends HTMLElement {
        static get observedAttributes() {
            return [ATTR_JSON];
        }
        attributeChangedCallback(attr, oldValue, newValue) {
            if (attr === ATTR_JSON) {
                this.render(this);
            }
        }
        constructor() {
            super();
            this.innerHTML = document.querySelector('link[href*="multi.language.input.html"]').import.querySelector("template").innerHTML;
            //
            if (!this.getAttribute(ATTR_JSON)) {
                this.setAttribute(ATTR_JSON, "{}");
            }
            //
            if (this.getAttribute(ATTR_TYPE) === "textarea") {
                this.querySelector(":scope > input").remove();
                this.querySelector(":scope > textarea").placeholder = this.title;
                INPUT = this.querySelector(":scope > textarea");
            } else {
                this.querySelector(":scope > textarea").remove();
                this.querySelector(":scope > input").placeholder = this.title;
                INPUT = this.querySelector(":scope > input");
            }
            //
            this.eventize();
            this.render(this);
        }
        eventize() {
            let self = this;
            self.querySelector(":scope > select").addEventListener("change", function() { self.render(self); });
            INPUT.addEventListener("blur", () => {
                let json = JSON.parse(self.getAttribute(ATTR_JSON));
                let lang = self.querySelector(":scope > select").value;
                json[lang] = INPUT.value;
                self.setAttribute(ATTR_JSON, JSON.stringify(json));
            });
        }
        render(self) {
            let json = JSON.parse(self.getAttribute(ATTR_JSON));
            let lang = self.querySelector(":scope > select").value;
            INPUT.value = json[lang] || "";
        }
    });
}());
