/* 
Dynamic compass svg

 possibly make shadow dynamic ?
*/
import './extensions/sgv-extensions';
import { createSVGNode, formatSVGValue } from './utils/svg-utils';

// Designed as a square element
const SVG_SIZE = 1000;

// Compass
function createCompassSVG(
    degrees: number,
    size: 'default' | 'small' = 'default'): SVGElement {
    const width = SVG_SIZE;
    const height = SVG_SIZE;
    const center = {
        x: width / 2,
        y: height / 2,
    }
    const colorLight = '#FCF4F1';
    const colorDark = '#444444';
    const compassRadius = SVG_SIZE / 4;
    const compassOutlineWidth = compassRadius / 4;

    const compassSVG = createSVGNode('svg').setSVGAttributes({
        'viewBox': `0 0 ${width} ${height}`,
        'preserveAspectRatio': 'xMidYMid meet',
        'xmlns': 'http://www.w3.org/2000/svg',
        'role': 'img',
        'aria-label': `Compass`
    });

    function createDefs() {
        const defs = createSVGNode('defs');

        const filter = createSVGNode('filter').setSVGAttributes({ 'id': 'dropShadow' });

        const shadow = createSVGNode('feDropShadow').setSVGAttributes({
            'dx': formatSVGValue(SVG_SIZE / 40),
            'dy': formatSVGValue(SVG_SIZE / 40),
            'stdDeviation': '0.5',
            'flood-color': colorDark,
            'flood-opacity': '0.25'
        })

        filter.appendChild(shadow);
        defs.appendChild(filter);

        return defs;
    }

    function createMarkers() {
        const numberOfMarkers = 16;
        const centerOffset = compassRadius / 3;
        const largeMarkerWidth = SVG_SIZE / 50;
        const largeMarkerHeight = compassRadius + compassRadius / 4;
        const mediumMarkerWidth = SVG_SIZE / 60;
        const meduimMarkerHeight = compassRadius - centerOffset;
        const meduimMarkerHeightOffset = compassRadius - centerOffset;
        const smallMarkerWidth = SVG_SIZE / 90;
        const smallMarkerHeight = compassRadius / 1.8;
        const smallMarkerHeightOffset = compassRadius - centerOffset;

        function getMarkerVaribles(i: number) {
            let width = 0;
            let height = 0;
            let yOffset = 0;
            let fillColor = colorLight;

            if (i % 2 !== 0) {
                width = smallMarkerWidth;
                height = smallMarkerHeight;
                yOffset = smallMarkerHeightOffset;
                fillColor = `${colorLight}cc`;
            }

            if (i % 2 === 0) {
                width = mediumMarkerWidth;
                height = meduimMarkerHeight;
                yOffset = meduimMarkerHeightOffset;
            }

            if (i % 4 === 0) {
                width = largeMarkerWidth;
                height = largeMarkerHeight;
                yOffset = 0;
            }
            return { width, height, yOffset, fillColor }
        }

        const group = createSVGNode('g');

        for (let i = 0; i < numberOfMarkers; i++) {
            const { width, height, yOffset, fillColor } = getMarkerVaribles(i);
            const rect = createSVGNode('rect').setSVGAttributes({
                'x': formatSVGValue(center.x - width / 2),
                'y': formatSVGValue(center.y + yOffset),
                'width': formatSVGValue(width),
                'height': formatSVGValue(height),
                'fill': fillColor,
                'rx': formatSVGValue(width),
                'transform': `rotate(${i * 90 / 4}, ${center.x}, ${center.y})`,
            });
            group.appendChild(rect);
        }

        return group;
    }

    function createCompassRing() {
        const group = createSVGNode('g');

        const compassOutline = createSVGNode('circle').setSVGAttributes({
            'cx': formatSVGValue(center.x),
            'cy': formatSVGValue(center.y),
            'r': formatSVGValue(compassRadius),
            'fill': 'none',
            'stroke': colorLight,
            'stroke-width': formatSVGValue(compassOutlineWidth),
        });

        const compassOutlineInnerStroke = createSVGNode('circle').setSVGAttributes({
            'cx': formatSVGValue(center.x),
            'cy': formatSVGValue(center.y),
            'r': formatSVGValue(compassRadius),
            'fill': 'none',
            'stroke': colorDark,
            'stroke-width': formatSVGValue(compassOutlineWidth / 4),
            'opacity': '0.5',
        });

        group.appendChild(compassOutline);
        group.appendChild(compassOutlineInnerStroke);
        return group
    }

    function createDirectionLabels() {
        const fontSize = SVG_SIZE / 7.5;
        const strokeColor = colorDark;
        const strokeWidth = fontSize / 75;
        const letterFill = colorLight;
        const labels = [
            {
                label: 'N',
                x: center.x,
                y: center.y - compassRadius - compassOutlineWidth - fontSize / 1.5
            },
            {
                label: 'E',
                x: center.x - fontSize / 1.5 - compassRadius - compassOutlineWidth,
                y: center.y
            },
            {
                label: 'S',
                x: center.x,
                y: center.y + fontSize / 1 + compassRadius + compassOutlineWidth
            },
            {
                label: 'W',
                x: center.x + fontSize / 1.5 + compassRadius + compassOutlineWidth,
                y: center.y
            },
        ]

        const labelGroup = createSVGNode('g');

        for (let label of labels) {
            const directionTextElement = createSVGNode('text').setSVGAttributes({
                'x': formatSVGValue(label.x),
                'y': formatSVGValue(label.y),
                'font-family': 'Arial',
                'font-size': formatSVGValue(fontSize),
                'text-anchor': 'middle',
                'dominant-baseline': 'middle',
                'fill': letterFill,
                'stroke': strokeColor,
                'stroke-width': formatSVGValue(strokeWidth),
            });
            directionTextElement.textContent = label.label;
            labelGroup.appendChild(directionTextElement);
        }

        return labelGroup;
    }

    function createPointer() {
        const pointerStrokeWidth = compassOutlineWidth / 4;
        const pointerWingX = compassRadius / 1.75;
        const pointerWingY = compassRadius / 1.75;
        const pointerVertexY = compassRadius / 3;
        const pointerFillColor = colorLight;
        const pointerStrokeColor = colorDark;
        const pointerTip = `${center.x},${center.y + compassRadius}`;
        const pointerRightWing = `${center.x - pointerWingX},${center.y - pointerWingY} `
        const pointerLeftWing = `${center.x + pointerWingX},${center.y - pointerWingY} `
        const pointerInnerTip = `${center.x},${center.y - pointerVertexY} `;

        const pointer = createSVGNode('polygon').setSVGAttributes({
            'points': `${pointerTip} ${pointerLeftWing} ${pointerInnerTip} ${pointerRightWing}`,
            'fill': pointerFillColor,
            'stroke': pointerStrokeColor,
            'stroke-width': formatSVGValue(pointerStrokeWidth),
            'transform': `rotate(${degrees}, ${center.x}, ${center.y})`,
            'filter': `url(#dropShadow)`,
        });
        return pointer;
    }

    compassSVG.appendChild(createDefs());
    if (size !== 'small') {
        compassSVG.appendChild(createMarkers());
        compassSVG.appendChild(createDirectionLabels());
    }
    compassSVG.appendChild(createCompassRing());
    compassSVG.appendChild(createPointer());

    return (
        compassSVG
    )
}

export default createCompassSVG;