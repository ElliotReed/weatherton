import './extensions/sgv-extensions';
import { createSVGNode, formatSVGValue } from './utils/svg-utils';

/*
Design: canvas is split into 2 halves
the info is centered in the first half
the marker and barometer are in the second half,
spaced on thirds with the GRID_SIZE
*/

// Everything is proportional to the SVG_SIZE, it's value doesn't really matter
const SVG_SIZE = 100;
const GRID_SIZE = 6;
const colors = {
    light: '#fcfcfc',
    dark: '#444444',
    mercury: '#441414',
    glass: '#ddd',
}

function createBarometerSVG(pressure: number): SVGElement {
    const canvasWidth = SVG_SIZE;
    const canvasHeight = SVG_SIZE;
    const gridOffset = SVG_SIZE / GRID_SIZE;
    const fontSize = SVG_SIZE / 5;

    /*
    measuringHeight represents the active part of the barometer. 
    It is the fill, marker and info range 
    measuringHeight is 2/3 of the canvas, the bottomY coordinate is
    1/2 of the remaining third
    */
    const measuringHeight = canvasHeight * 2 / 3;
    const measureBottomY = canvasHeight - canvasHeight / 6;

    // millibars range from 950 - 1050
    const percentPressure = (pressure - 950) * 0.01;
    const pressureHeight = measuringHeight * percentPressure;

    // The board represents the backing wooden board that holds the  mercury tube
    // The width of the verticle 'board', not counting the bulb 
    const boardWidth = canvasWidth / 12;
    const boardBulbRadius = boardWidth * 3.5 / 3;
    const boardHeight = measuringHeight + boardBulbRadius / 2;

    // The  mercury tube represents the glass containing the mercury
    const mercuryTubeWidth = boardWidth - boardWidth / 2;
    const mercuryTubeHeight = boardHeight - boardWidth / 3;
    const mercuryBulbRadius = boardBulbRadius - boardWidth / 4;

    // The  mercury fill represents the amount of mercury
    const mercuryFillWidth = mercuryTubeWidth - mercuryTubeWidth / 3;

    // The marker is the horizontal line showing the pressure
    const markerWidth = boardWidth;

    // Info is the text of the pressure
    const infoCenterX = (canvasWidth / 2) / 2;

    const barometer = {
        centerX: gridOffset * 5 - boardWidth / 2,
        bottomY: measureBottomY,
    }

    const barometerSVG = createSVGNode('svg').setSVGAttributes({
        'viewBox': `0 0 ${canvasWidth} ${canvasHeight}`,
        'preserveAspectRatio': 'xMidYMid meet',
        'xmlns': 'http://www.w3.org/2000/svg',
        'font-family': 'inherit',
        'role': 'img',
        'aria-label': `Barometer showing pressure: ${pressure} mbar`
    });

    function createDefs() {
        const defs = createSVGNode('defs');

        const filter = createSVGNode('filter').setSVGAttributes({
            'id': 'dropShadow',
            'x': '-50%',
            'y': '-50%',
            'width': '200%',
            'height': '200%',
        });

        const shadow = createSVGNode('feDropShadow').setSVGAttributes({
            'dx': '0.5',
            'dy': '0.5',
            'stdDeviation': '0.75',
            'flood-color': '#000',
            'flood-opacity': '0.05'
        });

        filter.appendChild(shadow);
        defs.appendChild(filter);

        return defs;
    }

    function createBarometerImage(): SVGElement {
        const barometerImageGroup = createSVGNode('g').setSVGAttributes({ 'class': 'barometer-image' });

        function createBoardGroup() {
            const boardGroup = createSVGNode('g').setSVGAttributes({
                'id': 'board',
                'filter': `url(#dropShadow)`,
            });

            const barometerBoard = createSVGNode('rect').setSVGAttributes({
                'x': formatSVGValue(barometer.centerX - boardWidth / 2),
                'y': formatSVGValue(measureBottomY - boardHeight),
                'width': formatSVGValue(boardWidth),
                'height': formatSVGValue(boardHeight),
                'fill': colors.light,
                'rx': formatSVGValue(boardWidth / 2),
            });

            const boardBulb = createSVGNode('circle').setSVGAttributes({
                'cx': formatSVGValue(barometer.centerX),
                'cy': formatSVGValue(measureBottomY),
                'r': formatSVGValue(boardBulbRadius),
                'fill': colors.light,
            });

            boardGroup.appendChild(barometerBoard);
            boardGroup.appendChild(boardBulb);

            return boardGroup;
        }

        function createTubeGroup() {
            const tubeGroup = createSVGNode('g').setSVGAttributes({
                'id': 'tube',
                'filter': `url(#dropShadow)`,
            });

            const mercuryTube = createSVGNode('rect').setSVGAttributes({
                'x': formatSVGValue(barometer.centerX - mercuryTubeWidth / 2),
                'y': formatSVGValue(barometer.bottomY - mercuryTubeHeight),
                'width': formatSVGValue(mercuryTubeWidth),
                'height': formatSVGValue(mercuryTubeHeight),
                'fill': colors.glass,
                'rx': formatSVGValue(mercuryTubeWidth / 2),
            });

            const mercuryBulb = createSVGNode('circle').setSVGAttributes({
                'cx': formatSVGValue(barometer.centerX),
                'cy': formatSVGValue(measureBottomY),
                'r': formatSVGValue(mercuryBulbRadius),
                'fill': colors.glass,
            });

            tubeGroup.appendChild(mercuryTube);
            tubeGroup.appendChild(mercuryBulb);

            return tubeGroup;
        }

        function createMercuryFillGroup() {
            const mercuryFillGroup = createSVGNode('g').setSVGAttributes({ 'id': 'mercury-fill' });

            const mercuryTubeFill = createSVGNode('rect').setSVGAttributes({
                'x': formatSVGValue(barometer.centerX - mercuryFillWidth / 2),
                'y': formatSVGValue(barometer.bottomY - pressureHeight),
                'width': formatSVGValue(mercuryFillWidth),
                'height': formatSVGValue(pressureHeight),
                'fill': colors.mercury,
            });

            const mercuryBulbFill = createSVGNode('circle').setSVGAttributes({
                'cx': formatSVGValue(barometer.centerX),
                'cy': formatSVGValue(barometer.bottomY),
                'r': formatSVGValue(mercuryBulbRadius - mercuryBulbRadius / 8),
                'fill': colors.mercury,
            });

            mercuryFillGroup.appendChild(mercuryTubeFill);
            mercuryFillGroup.appendChild(mercuryBulbFill);

            return mercuryFillGroup;
        }

        barometerImageGroup.appendChild(createBoardGroup());
        barometerImageGroup.appendChild(createTubeGroup());
        barometerImageGroup.appendChild(createMercuryFillGroup());

        return barometerImageGroup;
    }

    function createBarometerMarker(): SVGElement {
        const strokeWidth = SVG_SIZE / 80;
        const markerGridOffset = gridOffset * 4;
        const markerWidthOffset = markerWidth / 2;

        const marker = createSVGNode('line').setSVGAttributes({
            'x1': formatSVGValue(markerGridOffset - markerWidthOffset),
            'x2': formatSVGValue(markerGridOffset + markerWidthOffset),
            'y1': formatSVGValue(measureBottomY - pressureHeight),
            'y2': formatSVGValue(measureBottomY - pressureHeight),
            'stroke-width': formatSVGValue(strokeWidth),
            'stroke': colors.light,
            'stroke-linecap': 'round',
        });

        return marker;
    }

    function createBarometerInfo(): SVGElement {
        const strokeWidth = '0.0025em';
        const strokeColor = colors.dark;

        const labelGroup = createSVGNode('g');

        const pressureText = createSVGNode('text').setSVGAttributes({
            'x': formatSVGValue(infoCenterX),
            'y': formatSVGValue(measureBottomY - pressureHeight),
            'font-family': 'inherit',
            'class': 'barometer-info',
            'font-size': formatSVGValue(fontSize),
            'font-weight': 'bold',
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            'fill': colors.light,
            'stroke': strokeColor,
            'stroke-width': strokeWidth,
            'filter': `url(#dropShadow)`,
        });
        pressureText.innerHTML = `${pressure}`;

        const unitLabel = createSVGNode('text').setSVGAttributes({
            'x': formatSVGValue(infoCenterX),
            'y': formatSVGValue(measureBottomY - pressureHeight + fontSize / 1.5),
            'class': 'barometer-info',
            'font-size': formatSVGValue(fontSize * 0.6),
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            'fill': colors.light,
            'stroke': strokeColor,
            'stroke-width': strokeWidth,
        });
        unitLabel.innerHTML = 'mbar';

        labelGroup.appendChild(pressureText);
        labelGroup.appendChild(unitLabel);

        return labelGroup;
    }

    barometerSVG.append(
        createDefs(),
        createBarometerImage(),
        createBarometerInfo(),
        createBarometerMarker()
    );

    return barometerSVG;
}

export default createBarometerSVG;