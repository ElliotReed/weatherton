declare global {
    interface SVGElement {
        setSVGAttributes(attributes: Record<string, string>): this;
    }
}

export { };