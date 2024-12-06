import createBarometerSVG from "./barometerSVG";
const app = document.getElementById('barometer-design');

let mbars = 950;
let direction: 'asc' | 'desc' = 'asc';

function init() {
    const numberOfIcons = 32;

    for (let i = 0; i < numberOfIcons; i++) {
        const width = 16 + i * 16;
        const div = document.createElement('div');
        div.setAttribute('style', `width: ${width}px`);

        const barometerSVG = createBarometerSVG(mbars);

        if (direction === 'asc') {
            mbars += 10;
        } else {
            mbars -= 10;
        }

        div.append(barometerSVG);
        if (mbars === 1050) {
            direction = 'desc';
        }
        if (mbars === 950) {
            direction = 'asc';
        }

        if (!app) return;
        app.append(div);
    }
}

init();