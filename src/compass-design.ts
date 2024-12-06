import createCompassSVGElement from "./compassSVG";
const app = document.getElementById('compass-design');

function init() {
    const numberOfIcons = 32;
    for (let i = 0; i < numberOfIcons; i++) {
        const width = 16 + i * 16;
        const div = document.createElement('div');
        div.setAttribute('style', `width: ${width}px`);

        div.append(createCompassSVGElement(i * 20, i * 20 < 200 ? 'small' : undefined));

        if (!app) return;
        app.append(div);
    }
}

init();