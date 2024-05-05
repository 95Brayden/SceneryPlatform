import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { XYZ, Vector } from "ol/source";
import { Group as LayerGroup } from 'ol/layer.js';
import { Style, Stroke, Fill, Circle, Text, Icon } from "ol/style";
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import {map} from "core-js/internals/array-iteration";

export default {
    getBaseMapLayerGroup(type) {  //获取底图图层
        var tiandiImg = new TileLayer({
            name: "天地图影像图层",
            source: new XYZ({
                url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                wrapX: false
            })
        });
        var tiandiImgMarker = new TileLayer({
            name: "天地图影像注记图层",
            source: new XYZ({
                url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                wrapX: false
            })
        });
        var tiandiImgGroup = new LayerGroup({ layers: [tiandiImg, tiandiImgMarker] });
        var tiandiImgOnlyGroup = new LayerGroup({ layers: [tiandiImg] });

        var tiandiVector = new TileLayer({
            source: new XYZ({
                url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                wrapX: false
            }),
            name: "天地图矢量图层",
        });

        var tiandiVectorMarker = new TileLayer({
            source: new XYZ({
                url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                wrapX: false
            }),
            name: "天地图矢量图层注记",
        });
        var tiandiVectorGroup = new LayerGroup({ layers: [tiandiVector, tiandiVectorMarker] });

        var tiandiTerrain = new TileLayer({
            source: new XYZ({
                url: "http://t{0-7}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                wrapX: false
            }),
            name: "地形图矢量图层",
        });

        var tiandiTerrainMarker = new TileLayer({
            source: new XYZ({
                url: "http://t{0-7}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk=cd7516c53e2e5bee9bad989b63db6ce4",
                wrapX: false
            }),
            name: "地形图矢量图层注记",
        });
        var tiandiTerrainGroup = new LayerGroup({ layers: [tiandiTerrain, tiandiTerrainMarker] });

        var gaodeVector = new TileLayer({
            source: new XYZ({
                url: 'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
                wrapX: false
            }),
            name: "高德地图矢量图层",
        });
        var gaodeVectorGroup = new LayerGroup({ layers: [gaodeVector] });

        var gaodeImg = new TileLayer({
            source: new XYZ({
                url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                wrapX: false
            }),
            name: "高德地图影像图层",
        });
        var gaodeImgMarker = new TileLayer({
            source: new XYZ({
                url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
                wrapX: false
            }),
            name: "高德地图影像标记图层",
        });
        var gaodeImgGroup = new LayerGroup({ layers: [gaodeImg, gaodeImgMarker] });

        var geoqPurplishBlue = new TileLayer({
            source: new XYZ({
                url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
                wrapX: false
            }),
            name: "智图深蓝图层",
        });
        var geoqPurplishBlueGroup = new LayerGroup({ layers: [geoqPurplishBlue] });

        var geoqGray = new TileLayer({
            source: new XYZ({
                url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
                wrapX: false
            }),
            name: "智图灰度图层",
        });
        var geoqGrayGroup = new LayerGroup({ layers: [geoqGray] });

        var esriWorldImagery = new TileLayer({
            source: new XYZ({
                url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg',
                wrapX: false
            }),
            name: "ArcGIS影像图",
        });
        var esriWorldImageryGroup = new LayerGroup({ layers: [esriWorldImagery] });

        var Esri_DarkGreyCanvas = new TileLayer({
            source: new XYZ({
                url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
                wrapX: false
            }),
            name: "ArcGIS深蓝图层",
        });
        var esriDarkGreyCanvasGroup = new LayerGroup({ layers: [Esri_DarkGreyCanvas] });


        if (type == 'tianditu_image') {  //天地图影像图及标记
            return tiandiImgGroup;
        } else if (type == 'tianditu_image_only') {  //仅是天地图影像
            return tiandiImgOnlyGroup;
        } else if (type == 'tianditu_vector') {  //天地图矢量图及标记
            return tiandiVectorGroup;
        } else if (type == 'tianditu_terrain') {  //天地图地形图及标记
            return tiandiTerrainGroup;
        } else if (type == 'gaode_vector') {  //高德地图矢量图及标记
            return gaodeVectorGroup;
        } else if (type == 'gaode_img') {  //高德地图影像标记图层
            return gaodeImgGroup;
        } else if (type == 'geoq_purplishblue') {  //智图深蓝图层
            return geoqPurplishBlueGroup;
        } else if (type == 'geoq_gray') {  //智图灰度图层
            return geoqGrayGroup;
        } else if (type == 'esri_worldimagery') {  //ArcGIS影像图
            return esriWorldImageryGroup;
        } else if (type == 'esri_darkgreycanvas') {  //ArcGIS深蓝图层
            return esriDarkGreyCanvasGroup;
        }
    },
    styleFunction(feature, resolution) { //根据要素类型设置几何要素的样式
        var image = new Circle({
            radius: 5,
            fill: null,
            stroke: new Stroke({ color: 'red', width: 1 })
        });
        var styles = {
            'Point': [
                new Style({
                    //点样式
                    image: image
                })
            ],
            'LineString': [
                new Style({
                    stroke: new Stroke({
                        //线的边界样式
                        color: 'green',
                        width: 1
                    })
                })
            ],
            'MultiLineString': [
                new Style({
                    stroke: new Stroke({
                        //多线的边界样式
                        color: 'green',
                        width: 1
                    })
                })
            ],
            'MultiPoint': [
                new Style({
                    //多点的点样式
                    image: image
                })
            ],
            'MultiPolygon': [
                new Style({
                    stroke: new Stroke({
                        //多区的边界样式
                        color: 'yellow',
                        width: 2
                    }),
                    fill: new Fill({
                        //多区的填充样式
                        color: 'rgba(255, 255, 0, 0)'
                    })
                })
            ],
            'Polygon': [
                new Style({
                    stroke: new Stroke({
                        //区的边界样式
                        color: 'blue',
                        lineDash: [4],
                        width: 3
                    }),
                    fill: new Fill({
                        //区的填充样式
                        color: 'rgba(0, 0, 255, 0)'
                    })
                })
            ],
            'GeometryCollection': [
                new Style({
                    stroke: new Stroke({
                        //集合要素的边界样式
                        color: 'magenta',
                        width: 2
                    }),
                    fill: new Fill({
                        //集合要素的填充样式
                        color: 'magenta'
                    }),
                    image: new Circle({
                        //集合要素的点样式
                        radius: 10,
                        fill: null,
                        stroke: new Stroke({
                            color: 'magenta'
                        })
                    })
                })
            ],
            'Circle': [
                new Style({
                    stroke: new Stroke({
                        //圆的边界样式
                        color: 'red',
                        width: 2
                    }),
                    fill: new Fill({
                        //圆的填充样式
                        color: 'rgba(255,0,0,0.2)'
                    })
                })
            ]
        };
        return styles[feature.getGeometry().getType()];
    },
    is_show_station(sta, select_sta_type) { //判断景点是否为当前可显示的类型
        var filerSign = true;
        if (select_sta_type == "all") {
            filerSign = false;
        } else if (select_sta_type == "scenic") {
            if (sta.sta_type == "景区") {
                filerSign = false;
            }
        } else if (select_sta_type == "protection") {
            if (sta.sta_type == "文保") {
                filerSign = false;
            }
        } else if (select_sta_type == "other") {
            if (sta.sta_type == "其它") {
                filerSign = false;
            }
        }
        return filerSign;
    },
    initMarkerByIntValue(data) { //根据烈度数值获取图标颜色
        var data = data;
        var iconColor = "#afafaf"; //灰色
        if (data < 0) {
            iconColor = "#afafaf"; //灰色
        } else if (data < 1) {
            var iconColor = "#60af38";
        } else if (data < 2) {
            var iconColor = "#f3e45e";
        } else if (data < 3) {
            var iconColor = "#f29438";
        } else if (data < 4) {
            var iconColor = "#ff5c49";
        } else if (data >= 4) {
            var iconColor = "#a704c8";
        }
        return iconColor;
    },
    buildStationDivMarker(opt) { //构建自定义景点图标
        var latLon = [parseFloat(opt.sta_lon), parseFloat(opt.sta_lat)];
        var point = new Point(latLon);
        var feature = new Feature(point);
        feature.type = 'click_station';
        feature.setId(opt.net_code + "." + opt.sta_code);
        feature.setStyle(new Style({
            image: new Circle({
                radius: 12,
                stroke: new Stroke({
                    color: 'gray'
                }),
                fill: new Fill({
                    color: this.initMarkerByIntValue(opt.channels[0].comp.int)
                })
            }),
            text: new Text({
                //位置
                textAlign: 'center',
                //基准线
                textBaseline: 'middle',
                //文字样式
                font: 'normal 14px 微软雅黑',
                //文本内容
                text: opt.sta_code,
                //文本填充样式（即文字颜色）
                fill: new Fill({ color: 'gray' }),
                offsetY: 24,
                scale: 1,
                stroke: new Stroke({ color: 'gray', width: 1 })
            })
        }));
        return feature;

    },
    buildStationImageMarker(opt) { //构建图片景点图标
        var latLon = [parseFloat(opt.sta_lon), parseFloat(opt.sta_lat)];
        var point = new Point(latLon);
        var feature = new Feature(point);
        feature.type = 'click_station';
        feature.setId(opt.net_code + "." + opt.sta_code);

        feature.setStyle(new Style({
            image: new Icon(
                ({
                    anchor: [0.5, 40],
                    anchorOrigin: 'top-left',
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    offsetOrigin: 'top-right',
                    // offset:[0,10],
                    //图标缩放比例
                    // scale:0.5,
                    //透明度
                    opacity: 1,
                    //图标的url
                    src: '/static/images/marker/marker.png'
                })),
            text: new Text({
                //位置
                textAlign: 'center',
                //基准线
                textBaseline: 'middle',
                //文字样式
                font: 'normal 14px 微软雅黑',
                //文本内容
                text: opt.sta_name,
                //文本填充样式（即文字颜色）
                fill: new Fill({ color: '#008eff' }),
                offsetY: 12,
                scale: 1,
                stroke: new Stroke({ color: '#ffcc33', width: 2 })
            })
        }));
        return feature;
    },
    buildStationVectorMarker(opt) {  //构建矢量景点图标
        var latLon = [parseFloat(opt.sta_lon), parseFloat(opt.sta_lat)];
        var point = new Point(latLon);
        var feature = new Feature(point);
        feature.type = 'click_station';
        feature.setId(opt.net_code + "." + opt.sta_code);
        var f_color = "green";
        var f_radius = 10;
        var image = new Circle({
            radius: f_radius,
            fill: new Fill({
                color: f_color
            }),
            stroke: new Stroke({
                color: 'black',
                width: 1
            })
        });

        feature.setStyle([new Style({
            image: image,
            text: new Text({
                text: "",
                offsetY: 1,
                scale: 0.9,
                fill: new Fill({
                    color: "black"
                })
            })
        })]);
        return feature;

    }

}

