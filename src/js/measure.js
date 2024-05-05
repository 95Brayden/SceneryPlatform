import Draw from 'ol/interaction/Draw'

import {
    unByKey
} from 'ol/Observable.js'
import Overlay from 'ol/Overlay'
import {
    getArea,
    getLength
} from 'ol/sphere.js'
import {
    Point,
    LineString,
    Polygon
} from 'ol/geom.js'
import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Style
} from 'ol/style.js'

import {
    Vector as VectorLayer
} from 'ol/layer'
import {
    Vector as VectorSource
} from 'ol/source'

export default {

    measure(map, measureType, draw) {

        /**
         * Currently drawn feature.
         * @type {import("../src/ol/Feature.js").default}
         */
        var sketch;


        /**
         * The help tooltip element.
         * @type {HTMLElement}
         */
        var helpTooltipElement;


        /**
         * Overlay to show the help messages.
         * @type {Overlay}
         */
        var helpTooltip;


        /**
         * The measure tooltip element.
         * @type {HTMLElement}
         */
        var measureTooltipElement;


        /**
         * Overlay to show the measurement.
         * @type {Overlay}
         */
        var measureTooltip;


        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        // var continuePolygonMsg = '单击此处可继续绘制多边形';
        var continuePolygonMsg = '';


        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        // var continueLineMsg = '单击此处继续绘制线条';
        var continueLineMsg = '';




        /**
         * Handle pointer move.
         * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
         */
        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = '';
            // var helpMsg = '点击开始绘制';

            if (sketch) {
                var geom = sketch.getGeometry();
                if (geom instanceof Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof LineString) {
                    helpMsg = continueLineMsg;
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);

            helpTooltipElement.classList.remove('hidden');
        };

        map.on('pointermove', pointerMoveHandler);

        map.getViewport().addEventListener('mouseout', function () {
            helpTooltipElement.classList.add('hidden');
        });

        

        /**
         * Format length output.
         * @param {LineString} line The line.
         * @return {string} The formatted length.
         */
        var formatLength = function (line) {
            var sourceProj = map.getView().getProjection(); // 获取投影坐标系
            var length = getLength(line, {
                projection: sourceProj
            });
            var output;
            if (length > 100) {
                output = (Math.round(length / 1000 * 100) / 100) +
                    ' ' + 'km';
            } else {
                output = (Math.round(length * 100) / 100) +
                    ' ' + 'm';
            }
            return output;
        };


        /**
         * Format area output.
         * @param {Polygon} polygon The polygon.
         * @return {string} Formatted area.
         */
        var formatArea = function (polygon) {
            var sourceProj = map.getView().getProjection(); // 获取投影坐标系
            var area = getArea(polygon, {
                projection: sourceProj
            });
            var output;
            if (area > 10000) {
                output = (Math.round(area / 1000000 * 100) / 100) +
                    ' ' + 'km<sup>2</sup>';
            } else {
                output = (Math.round(area * 100) / 100) +
                    ' ' + 'm<sup>2</sup>';
            }
            return output;
        };

        // 将画好的 VectorLayer 图层添加到 map 中
        var source = new VectorSource()
        var vector = new VectorLayer({
            source: source,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: '#ffcc33',
                    width: 4
                }),
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({
                        color: '#ffcc33'
                    })
                })
            }),
            zIndex: 9,
            name: 'vector'
        })
        map.addLayer(vector)
        for (let layerTmp of map.getLayers().getArray()) {
            if (layerTmp.get("name") == "feature") {
                layerTmp.setSource(null)
                source = layerTmp.getSource();
            }
        }

        function addInteraction() {
            //移除绘制图形
            if(draw != null){
                map.removeInteraction(draw);
            }
            

            draw = new Draw({
                source: source,
                type: measureType,
                style: new Style({
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new CircleStyle({
                        radius: 5,
                        stroke: new Stroke({
                            color: 'rgba(0, 0, 0, 0.7)'
                        }),
                        fill: new Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        })
                    })
                })
            });
            map.addInteraction(draw);

            createMeasureTooltip();
            createHelpTooltip();

            var listener;
            draw.on('drawstart',
                function (evt) {
                    // set sketch
                    sketch = evt.feature;

                    let type = sketch.getGeometry()
                    if (type instanceof Point) {
                        // 如果是绘制点
                        let pointCoordinates = sketch.getGeometry().flatCoordinates
                        measureTooltipElement.innerHTML = pointCoordinates;
                        measureTooltip.setPosition(pointCoordinates);
                    } else {
                        // 如果是绘制线和面
                        var tooltipCoord = evt.coordinate;
                        listener = sketch.getGeometry().on('change', function (evt) {
                            var geom = evt.target;
                            var output;
                            if (geom instanceof Polygon) {
                                output = formatArea(geom);
                                tooltipCoord = geom.getInteriorPoint().getCoordinates();
                            } else if (geom instanceof LineString) {
                                output = formatLength(geom);
                                tooltipCoord = geom.getLastCoordinate();
                            }
                            measureTooltipElement.innerHTML = output;
                            measureTooltip.setPosition(tooltipCoord);
                        });
                    }
                });

            draw.on('drawend',
                function () {
                    measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                    measureTooltip.setOffset([0, -7]);
                    // unset sketch
                    sketch = null;
                    // unset tooltip so that a new one can be created
                    measureTooltipElement = null;
                    createMeasureTooltip();
                    unByKey(listener);
                    map.un('pointermove', pointerMoveHandler);
                    map.removeInteraction(draw);
                    helpTooltipElement.classList.add('hidden');
                });
        }

        /**
         * Creates a new help tooltip
         */
        function createHelpTooltip() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'ol-tooltip hidden';
            helpTooltip = new Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left'
            });
            map.addOverlay(helpTooltip);
        }


        /**
         * Creates a new measure tooltip
         */
        function createMeasureTooltip() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
            measureTooltip = new Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            map.addOverlay(measureTooltip);
        }

        addInteraction();

    },

}