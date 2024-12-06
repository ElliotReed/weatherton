export function createSVGNode(element: string): SVGElement {
    return document.createElementNS("http://www.w3.org/2000/svg", element);
}

export function formatSVGValue(value: number) {
    return value.toFixed(2);
}