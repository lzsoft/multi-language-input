{
    'use strict';
    const ATTR_JSON = "data-json";
    const ATTR_TYPE = "data-type";
    window.customElements.define('multi-language-input', class extends window.HTMLTinplateElement {
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
        }
        connectedCallback() {
            if (this.getAttribute(ATTR_TYPE) === "textarea") {
                this.querySelector(":scope > input").remove();
                this.querySelector(":scope > textarea").placeholder = this.title;
            } else {
                this.querySelector(":scope > textarea").remove();
                this.querySelector(":scope > input").placeholder = this.title;
            }
            //
            this.eventize();
        }
        eventize() {
            let self = this;
            let INPUT = self.querySelector(":scope > input") || self.querySelector(":scope > textarea");
            self.querySelector(":scope > select").addEventListener("change", function() { self.render(self); });
            INPUT.addEventListener("blur", () => {
                let json = JSON.parse(self.getAttribute(ATTR_JSON)) || {};
                let lang = self.querySelector(":scope > select").value;
                json[lang] = INPUT.value;
                self.setAttribute(ATTR_JSON, JSON.stringify(json));
                self.dispatchEvent(new Event("blur"));
            });
        }
        render(self) {
            let INPUT = self.querySelector(":scope > input") || self.querySelector(":scope > textarea");
            let json = {};
            try {
                json = JSON.parse(self.getAttribute(ATTR_JSON)) || {};
            } catch (e) {
                json = {};
            }
            let lang = self.querySelector(":scope > select").value;
            INPUT.value = json[lang] || "";
        }
    });
}
