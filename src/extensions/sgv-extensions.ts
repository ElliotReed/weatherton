SVGElement.prototype.setSVGAttributes = function setSVGAttributes(attributes: Record<string, string>) {
    Object.keys(attributes).forEach(key => {
        this.setAttribute(key, attributes[key])
    });
    return this;
}
