export function createSVGNode(element: string): SVGElement {
    return document.createElementNS("http://www.w3.org/2000/svg", element);
}

export function setSVGAttributes(svgNode: SVGElement, attributes: Record<string, string>) {
    const keys = Object.keys(attributes);
    for (let key of keys) {
        svgNode.setAttribute(key, attributes[key])
    }
}