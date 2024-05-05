<template>
    <div class="ol_map" id="ol_map"></div>
    <div class="left_menu_bar">
        <div class="left_bt_item" type="bt" action="zoom_in">地图放大</div>
        <div class="left_bt_item" type="bt" action="zoom_out">地图缩小</div>
        <div class="left_bt_item" type="add" @click="toggleAddSiteForm">添加站点</div>
        <div class="left_bt_item" type="mesure" action="mesure_line">测量距离</div>
        <div class="left_bt_item" type="mesure" action="mesure_area">测量面积</div>
        <div class="left_bt_item" type="theme" action="cluster_layer">聚合图层</div>
        <div class="left_bt_item" type="theme" action="heat_layer">热力图层</div>
    </div>

    <div id="div_xy"></div>
    <div class="top-menu-bar d-flex j-center a-center">
        <div class="menu-bt-bg" type="baselayer"><img src="@/assets/images/topmenu/top_baselayer.png" width="40"
                height="40" /></div>
        <div class="menu-bt-bg" type="rangelayer"><img src="@/assets/images/topmenu/top_range.png" width="40" height="40" />
        </div>
        <div class="menu-bt-bg" type="marker"><img src="@/assets/images/topmenu/top_marker.png" width="40" height="40" />
        </div>
        <div class="menu-bt-bg" type="countinfo"><img src="@/assets/images/topmenu/top_count.png" width="40" height="40" />
        </div>
    </div>

    <basemap_menu></basemap_menu>
    <range_menu></range_menu>
    <type_menu></type_menu>
    <count_menu></count_menu>
    <add-site></add-site>

    <!--景点基本信息弹出框-->
    <div class="show_windows_900" id="m_site_info" style="display: block; height: 850px;">
        <a style="float: right"><i class="show_windows_title_close" id="m_site_info_close"></i></a>
        <div class="show_windows_title">
            <p>基本信息</p>
        </div>
        <div class="show_windows_content_padding">
            <table class="table_default">
                <tr class="tr_title">
                    <td>景点名称</td>
                    <td>景点类型</td>
                    <td>景点级别</td>
                </tr>
                <tr class="tr_content">
                    <td>
                        <p id="sta_name">黄鹤楼</p>
                    </td>
                    <td>
                        <p id="sta_type">文化保护单位</p>
                    </td>
                    <td>
                        <p id="site_level">全国重点</p>
                    </td>
                </tr>
                <tr class="tr_title">
                    <td>所属区域</td>
                    <td colspan="2">景点地址</td>
                </tr>
                <tr class="tr_content">
                    <td>
                        <p id="site_range">武昌区</p>
                    </td>
                    <td colspan="2">
                        <p id="site_adress">湖北省武汉市武昌区蛇山西山坡1号</p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="show_windows_title margin-top-5">
            <p>景点信息</p>
        </div>
        <div class="show_windows_content_padding">
            <table class="table_default">
                <tr class="tr_title">
                    <td>区域代码</td>
                    <td>景点代码</td>
                    <td>景点位置</td>
                </tr>
                <tr class="tr_content">
                    <td>
                        <p id="net_code">WL</p>
                    </td>
                    <td>
                        <p id="sta_code">WLL06</p>
                    </td>
                    <td>
                        <p id="loc">114.306439,30.544481</p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="show_windows_title margin-top-5">
            <p>景区简介</p>
        </div>
        <div class="show_windows_content_padding">
            <div class="show_windows_content_pic" id="site_pic">
                <img src="/static/images/show/00009.jpg" width="100%">
            </div>
            <div class="show_windows_content_introduce" id="site_introduce">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;黄鹤楼位于湖北省武汉市武昌区蛇山西山坡，是国家5A级旅游景区，为中国古代四大名楼之一。楼高五层，主体建筑高度达到51.4米，是集古代建筑艺术与长江美景于一体的旅游胜地。
            </div>
        </div>
      <div class="show_windows_title margin-top-5">
        <p>景点详情</p>
      </div>
      <div class="show_windows_content_padding" id="site_url">
        <button v-if="siteUrl" class="left_bt_item" @click="goToSite">点击查看景区详情</button>
        <p v-else   class="show_windows_content_introduce"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂无官方网址</p>
      </div>
    </div>
</template>

<script>
import $ from 'jquery';
import 'ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Cluster, Vector as VectorSource} from 'ol/source';
import {Heatmap as HeatmapLayer, Vector as VectorLayer} from "ol/layer";
import { format } from 'ol/coordinate';
import { Style, Stroke, Fill, Circle as CircleStyle, Text, Icon } from "ol/style";
import MousePosition from "ol/control/MousePosition.js";
import {ScaleLine} from 'ol/control.js';
import Measure from "@/js/measure" // 空间测量

import mapcommon from '@/js/mapcommon';
import basemap_menu from '@/components/topmenu/basemap_menu.vue';
import range_menu from '@/components/topmenu/range_menu.vue';
import type_menu from '@/components/topmenu/type_menu.vue';
import count_menu from '@/components/topmenu/count_menu.vue';
import AddSite from '@/components/topmenu/add_site.vue'; // 导入 add_site.vue 组件
import {Feature} from "ol";
import {Point} from "ol/geom";

export default {
    name: 'home',
    components: {
        basemap_menu,
        range_menu,
        type_menu,
        count_menu,
        AddSite
    },
    data() {
        return {
            map: null,  //地图对象
            cur_basemap_select: null, //当前选择的底图图层
            cur_basemap_type: "esri_worldimagery", //当前选择的底图图层名称
            rangeLayer: null, //边界图层
            select_sta_type: "all", //当前选择的显示景点类型
            stationinfo_data_list: null,  //景点数据列表
            cur_top_menu_select: null,  //当前顶部选择的菜单
            staVectorSource: null,  //景点图标数组
            staVectorLayer: null, //景点图标图层
            cur_select_range_type: "all",
            select_mesure_type : null, //当前选择的测量类型
            siteUrl: "http://www.cnhhl.com/index.php?m=History&a=index&id=71", // 添加一个变量来保存官方网址
            showAddSite: false,//是否显示添加站点框


          //从event新增的data
          select_theme_type: null,  //当前选择的专题图层
          real_strong_data_list: null, //景点实时观测数据列表
          real_strong_data_dict: {}, //各景点的最新强震动参数Hash数组
          imageLayer: null, //图片图层
          option_heatmap: {
            blur: 43,
            radius: 30
          },
          heatMapLayer: {},  //热力图层
          heatData: {
            type: "FeatureCollection",
            features: [
              /**
               {
               type: "Feature",
               geometry: { type: "Point", coordinates: [112.4, 31.19] },
               properties: { weight: 0.9 }
               }
               */
            ]
          },
          clusterLayer: null,  //聚合图层对象
          draw: null,
        }
    },
    methods: {
        toggleAddSiteForm() {
          // 切换 showAddSite 变量的状态来控制显示或隐藏 add_site.vue 组件
          this.showAddSite = !this.showAddSite;
          console.log(this.showAddSite); // 检查 showAddSite 的值
        },
        initMap() {  //初始化地图
            this.map = new Map({
                target: 'ol_map',
                layers: [],
                view: new View({
                    projection: "EPSG:4326",
                    center: [114.365248, 30.53786],
                    zoom: 10,
                }),
            });
            this.cur_basemap_select = mapcommon.getBaseMapLayerGroup(this.cur_basemap_type);
            this.map.addLayer(this.cur_basemap_select);

            //鼠标获取坐标控件
            const mousePositionControl = new MousePosition({
                coordinateFormat: function (coordinate) {
                    return format(coordinate, '经纬度:{x},{y}', 4);
                },
                projection: 'EPSG:4326',
                className: 'custom-mouse-position',
                target: document.getElementById('div_xy'),
                undefinedHTML: ' '
            });
            this.map.addControl(mousePositionControl);

            //实例化比例尺控件（ScaleLine）
            var scaleLineControl = new ScaleLine({
                //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
                units: "metric"
            });
            this.map.addControl(scaleLineControl);
        },
        changeBaseMap(type) { //更改底图图层
            console.log(type);
            if(type != ""){
                this.cur_basemap_type = type;
            }
            if (this.cur_basemap_select != null) {
                this.map.removeLayer(this.cur_basemap_select);
            }
            this.cur_basemap_select = mapcommon.getBaseMapLayerGroup(this.cur_basemap_type);
            this.map.addLayer(this.cur_basemap_select);
            this.addForestry(this.cur_select_range_type);

        },
        addForestry(type) { //添加边界
            if(type != ""){
                this.cur_select_range_type = type;
            }
            var m_url = "/static/data/map/region.json?t=" + new Date().getTime();
            var m_weight = 3;
            if (this.cur_select_range_type == 'city') {
                m_url = "/static/data/map/city.json?t=" + new Date().getTime();
                m_weight = 3;
            } else if (this.cur_select_range_type == 'country') {
                m_url = "/static/data/map/region.json?t=" + new Date().getTime();
                m_weight = 2;
            } else {
                m_url = "/static/data/map/province.json?t=" + new Date().getTime();
                m_weight = 1;
            }
            if (this.rangeLayer != null || this.rangeLayer == "undefined") {
                //移除已有矢量图层
                this.map.removeLayer(this.rangeLayer);
            }
            var vectorSource = new VectorSource({
                url: m_url,
                format: new GeoJSON()
            });
            this.rangeLayer = new VectorLayer({
                //矢量数据源
                source: vectorSource,
                //样式设置
                style: mapcommon.styleFunction
            });


            //将矢量图层加载到地图中
            this.map.addLayer(this.rangeLayer);

            this.rendStationInfoData(this.select_sta_type);

        },
        changeOneMarkerStatus(id, name, statusSign) {
            var feature = this.staVectorSource.getFeatureById(id);
            var img_url = '/static/images/marker/marker.png';
            var fiil_color = '#008eff';
            if (statusSign == 1) {
                img_url = '/static/images/marker/marker_s.png';
                fiil_color = 'red';
            } else {
                img_url = '/static/images/marker/marker.png';
                fiil_color = '#008eff';
            }
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
                        src: img_url
                    })),
                text: new Text({
                    //位置
                    textAlign: 'center',
                    //基准线
                    textBaseline: 'middle',
                    //文字样式
                    font: 'normal 14px 微软雅黑',
                    //文本内容
                    text: name,
                    //文本填充样式（即文字颜色）
                    fill: new Fill({ color: fiil_color }),
                    offsetY: 12,
                    scale: 1,
                    stroke: new Stroke({ color: '#ffcc33', width: 2 })
                })
            }));

        },
        selectStation(select_sta_id) {  //选中某个景点
            for (var i = 0; i < this.stationinfo_data_list.length; i++) {
                var m = this.stationinfo_data_list[i];
                var sta_id = m.net_code + "." + m.sta_code;
                var name = m.sta_name;
                var statusSign = 0;
                if (select_sta_id == sta_id) {
                    statusSign = 1;

                    $('#sta_name').text(m.sta_name);
                    $('#sta_type').text(m.sta_type);
                    $('#site_level').text(m.site_level);
                    $('#site_range').text(m.site_range);
                    $('#site_adress').text(m.site_adress);

                    $('#net_code').text(m.net_code);
                    $('#sta_code').text(m.sta_code);
                    $('#loc').text(m.sta_lon + ',' + m.sta_lat);
                    $('#site_pic').html('<img src="/static/images/show/' + m.site_pic + '" width="100%" height="240"/>');
                    $('#site_introduce').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + m.site_instroduce);
                  // 如果景点信息中包含官方网址，则将它保存到按钮的 data-url 属性中
                  // 获取景点官方网址
                  var siteUrl = m.site_url;

                  // 如果存在官方网址，则保存到组件的数据属性中
                  if (siteUrl) {
                    this.siteUrl = siteUrl;
                  } else {
                    // 如果不存在官方网址，则置为null，按钮将不显示
                    this.siteUrl = null;
                  }
                    $("#m_site_info").show();
                }
                this.changeOneMarkerStatus(sta_id, name, statusSign);
            }
        },
        goToSite() {
        // 获取当前选定景点的官方网站链接
        var siteUrl = this.siteUrl;

        // 如果链接存在，则进行跳转
        if (siteUrl) {
          window.open(siteUrl, '_blank');
        } else {
          alert('未找到景点官方网站链接！');
        }
        },
        rendStationInfoData(type) {  //显示景点
            this.select_sta_type = type;
            if (this.staVectorLayer != null) {
                this.map.removeLayer(this.staVectorLayer);
            }

            this.staVectorSource = new VectorSource({
                features: []
            });
            this.staVectorLayer = new VectorLayer({
                source: this.staVectorSource
            });
            this.map.addLayer(this.staVectorLayer);

            if(this.stationinfo_data_list == null){
                return
            }

            for (var i = 0; i < this.stationinfo_data_list.length; i++) {
                var m = this.stationinfo_data_list[i];
                console.log(m);
                var filerSign = mapcommon.is_show_station(m, this.select_sta_type);
                if (filerSign) {
                    continue;
                }
                var sta01 = mapcommon.buildStationImageMarker(m);
                this.staVectorSource.addFeature(sta01);
            }

            //为地图容器添加单击事件监听
            let that = this;
            that.map.on('click', function (event) {
                let feature = that.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
                    return feature;
                })
                if (feature) {
                    console.log(feature.getId());
                    that.selectStation(feature.getId());
                }
            });


        },
      rendStationInfoData11(type) {  //显示各景点的强震动参数
        this.select_sta_type = type;
        if (this.staVectorLayer != null) {
          this.map.removeLayer(this.staVectorLayer);
        }

        this.staVectorSource = new VectorSource({
          features: []
        });
        this.staVectorLayer = new VectorLayer({
          source: this.staVectorSource
        });
        this.map.addLayer(this.staVectorLayer);

        if(this.real_strong_data_list == null){
          return
        }

        var curIndex = 1;
        for (var i = 0; i < this.real_strong_data_list.length; i++) {
          var m = this.real_strong_data_list[i];
          console.log(m);
          var filerSign = mapcommon.is_show_station(m, this.select_sta_type);
          if (filerSign) {
            continue;
          }
          var sta01 = mapcommon.buildStationDivMarker(m);
          //console.log(sta01);
          this.staVectorSource.addFeature(sta01);

          curIndex += 1;
        }
         //为地图容器添加单击事件监听
         let that = this;
            that.map.on('click', function (event) {
                let feature = that.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
                    return feature;
                })
                if (feature) {
                    console.log(feature.getId());
                    that.selectStation(feature.getId());
                }
            });
      },
      clusterStyle() {  //聚合标注样式
        return (feature, solution) => {
          var total = 0;
          feature.get("features").forEach((value, index) => {
            total += value.get("value");
          });
          var style = new Style({
            image: new CircleStyle({
              radius: 15,
              stroke: new Stroke({
                color: "blue"
              }),
              fill: new Fill({
                color: "rgba(24,144,255,100)"
              })
            }),
            text: new Text({
              text: total.toString(),
              fill: new Fill({
                color: "#FFF"
              }),
              font: "12px Calibri,sans-serif",
              stroke: new Stroke({
                color: "red",
                width: 5
              })
            })
          });
          return style;
        };
      },
      initCluster(visiable) { //添加聚合图层

        if (visiable) {

          if (this.staVectorLayer != null) {
            this.map.removeLayer(this.staVectorLayer);
          }
          if (this.clusterLayer != null) {
            this.map.removeLayer(this.clusterLayer);
          }

          let source = new VectorSource();
          let clusterSource = new Cluster({
            distance: parseInt(20, 10),
            source: source
          });
          this.clusterLayer = new VectorLayer({
            source: clusterSource,
            style: this.clusterStyle.call(this)
          });
          this.map.addLayer(this.clusterLayer);
          for (var i = 0; i < this.stationinfo_data_list.length; i++) {
            var m = this.stationinfo_data_list[i];
            var latLon = [parseFloat(m.sta_lon), parseFloat(m.sta_lat)];
            var f = new Feature({
              geometry: new Point(latLon)
            });
            f.set("name", m.sta_code);
            f.set("value", 1);
            source.addFeature(f);
          }
        } else {
          if (this.clusterLayer != null) {
            this.map.removeLayer(this.clusterLayer);
            this.rendStationInfoData(this.select_sta_type);
          }
        }

      },
      //热力图
      initHeatMapLayer(visiable) {   //显示热力图
        if (visiable) {
          if (this.heatData.features.length == 0)
            for (var i = 0; i < this.stationinfo_data_list.length; i++) {
              var m = this.stationinfo_data_list[i];
              var latLon = [parseFloat(m.sta_lon), parseFloat(m.sta_lat)];
              var data = {
                type: "Feature",
                geometry: { type: "Point", coordinates: latLon },
                properties: { weight: 1 }
              };
              this.heatData.features.push(data);
            }

          if (this.heatMapLayer != null) {
            this.map.removeLayer(this.heatMapLayer);
          }
          this.heatMapLayer = new HeatmapLayer({
            source: new VectorSource({
              features: new GeoJSON().readFeatures(this.heatData)
            }),
            blur: this.option_heatmap.blur,
            radius: this.option_heatmap.radius,
            weight: (e) => {
              return e.values_.weight;//根据权重展示热力图！关键点，weight范围为：0-1！！！
            },
          });
          this.map.addLayer(this.heatMapLayer);
          this.rendStationInfoData11(this.select_sta_type);
        } else {
          if (this.heatMapLayer != null) {
            this.map.removeLayer(this.heatMapLayer);
            this.rendStationInfoData11(this.select_sta_type);
          }
        }
      },
        initLeftMenu() {  //初始化左侧菜单
            let that = this;
            $(document).on('click', '.left_menu_bar div', function (event) {
                var event_type = event.type;
                var type = $(this).attr('type');
                var action = $(this).attr('action');
                if (type == 'bt') {
                    if (action == 'zoom_in') {
                        var view = that.map.getView();
                        var zoom = view.getZoom();
                        view.setZoom(zoom + 1);
                    } else {
                        var view = that.map.getView();
                        var zoom = view.getZoom();
                        view.setZoom(zoom - 1);
                    }
                }
                else if(type=='add'){
                  $("#m_select_range").hide();
                  $("#m_countinfo").hide();
                  $("#m_selectmarker").hide();
                  $("#m_baselayer").hide();
                  $("#m_addsite").show();
                }
                else if (type == 'mesure') {
                    if(that.select_mesure_type == null || that.select_mesure_type != action){

                        that.select_mesure_type = action;
                        $(".left_menu_bar").find("div").attr("class", "left_bt_item");
                        $(this).attr('class', 'left_bt_item_s');
                        if(action == 'mesure_line'){
                            that.measureFun('LineString')

                        }else if(action == 'mesure_area'){
                            that.measureFun('Polygon')
                        }
                    }else{
                        that.select_mesure_type = null;
                        $(".left_menu_bar").find("div").attr("class", "left_bt_item");
                        if(action == 'mesure_line'){

                        }else if(action == 'mesure_area'){

                        }
                    }
                }
                else if (type == 'theme') {
                  if (that.select_theme_type == null || that.select_theme_type != action) {
                    that.select_theme_type = action;

                    // $(".right_menu_bar").find("div").attr("class", "right_bt_item");
                    // $(this).attr('class', 'right_bt_item_s');
                    /*此处有修改！！！！！！！！！！！！！！！！！！！！！！！111*/
                    $(".left_menu_bar").find("div").attr("class", "left_bt_item");
                    $(this).attr('class', 'left_bt_item_s');
                    if (action == 'image_layer') {
                    } else if (action == 'heat_layer') {
                      that.initHeatMapLayer(true);
                    } else if (action == 'cluster_layer') {
                      that.initCluster(true);
                    }
                  }
                  else {
                    that.select_theme_type = null;
                    $(".right_menu_bar").find("div").attr("class", "right_bt_item");
                    if (action == 'image_layer') {
                      that.initImageLayer(false);
                    } else if (action == 'heat_layer') {
                      that.initHeatMapLayer(false);
                    } else if (action == 'cluster_layer') {
                      that.initCluster(false);
                    }
                  }
                }
            });
        },
        initTopMenu() {  //初始化顶部菜单
            let that = this;
            $(document).on('click', '.top-menu-bar div', function (event) {
                var event_type = event.type;
                var type = $(this).attr('type');
                that.cur_top_menu_select = type;
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
                $(this).attr('class', 'menu-bt-bg-s');

                if (type == 'baselayer') {
                    $("#m_select_range").hide();
                    $("#m_countinfo").hide();
                    $("#m_selectmarker").hide();
                    $("#m_addsite").hide();
                    $("#m_baselayer").show();
                } else if (type == 'countinfo') {
                    $("#m_select_range").hide();
                    $("#m_baselayer").hide();
                    $("#m_selectmarker").hide();
                    $("#m_addsite").hide();
                    $("#m_countinfo").show();
                } else if (type == 'marker') {
                    $("#m_select_range").hide();
                    $("#m_countinfo").hide();
                    $("#m_baselayer").hide();
                    $("#m_addsite").hide();
                    $("#m_selectmarker").show();
                } else if (type == 'rangelayer') {
                    $("#m_select_range").show();
                    $("#m_countinfo").hide();
                    $("#m_baselayer").hide();
                    $("#m_selectmarker").hide();
                    $("#m_addsite").hide();
                }
            });


            //底图图层弹出窗口的关闭事件
            $(document).on("click", "#m_baselayer_close", function (event) {
                event.preventDefault();
                $("#m_baselayer").hide();
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
            });

            //选择边界图层弹出窗口的关闭事件
            $(document).on("click", "#m_select_range_close", function (event) {
                event.preventDefault();
                $("#m_select_range").hide();
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
            });

            //选择标注图层弹出窗口的关闭事件
            $(document).on("click", "#m_selectmarker_close", function (event) {
                event.preventDefault();
                $("#m_selectmarker").hide();
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
            });

            //统计信息图层弹出窗口的关闭事件
            $(document).on("click", "#m_countinfo_close", function (event) {
                event.preventDefault();
                $("#m_countinfo").hide();
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
            });

            //站点信息图层弹出窗口的关闭事件
            $(document).on("click", "#m_site_info_close", function (event) {
                event.preventDefault();
                $("#m_site_info").hide();
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
            });

        },
        initShowWindow() { //初始化弹出窗的功能
            let that = this;
            $(document).on("click", ".baselayer_select .menu_con", function (event) {
                event.preventDefault();
                var type = $(this).attr("id");
                $('.baselayer_select .menu_con').attr('class', 'menu_con');
                $(this).attr("class", "menu_con menu_con_select");

                that.changeBaseMap(type);
            });

            $(document).on("click", ".select_range_type .show_windows_select_content", function (event) {
                event.preventDefault();
                var type = $(this).attr("id");
                $('.select_range_type .show_windows_select_content').attr('class', 'show_windows_select_content');
                $(this).attr("class", "show_windows_select_content menu_con_select");
                that.addForestry(type);
            });

            $(document).on("click", ".select_marker_type .show_windows_select_content", function (event) {
                event.preventDefault();
                var type = $(this).attr("id");
                console.log(type);
                $('.select_marker_type .show_windows_select_content').attr('class', 'show_windows_select_content');
                $(this).attr("class", "show_windows_select_content menu_con_select");
                that.rendStationInfoData(type);
            });

        },
      initData() {  //初始化数据
        let that = this;
        $.ajax({
          type: "get",
          url: "/static/data/stationinfo.json?time=" + new Date().getTime(),
          dataType: "json",
          error: function () {
            alert("获取数据失败！");
          },
          success: function (resp) {
            that.stationinfo_data_list = resp.data;
            console.log(that.stationinfo_data_list);
            that.select_sta_type = "all";
            if (that.staVectorLayer != null) {
              that.map.removeLayer(that.staVectorLayer);
            }
            that.staVectorSource = new VectorSource({
              features: []
            });
            that.staVectorLayer = new VectorLayer({
              source: that.staVectorSource
            });
            that.map.addLayer(that.staVectorLayer);

            var curIndex = 1;
            for (var i = 0; i < that.stationinfo_data_list.length; i++) {
              var m = that.stationinfo_data_list[i];
              var filerSign = mapcommon.is_show_station(m, that.select_sta_type);
              if (filerSign) {
                continue;
              }
              var sta01 = mapcommon.buildStationImageMarker(m);
              that.staVectorSource.addFeature(sta01);
              curIndex += 1;
            }
          }
        });
      },
      measureFun(option) { // 空间测量
            switch (option) {
                case 'Point':
                    Measure.measure(this.map, 'Point')
                    break
                case 'LineString':
                    Measure.measure(this.map, 'LineString')
                    break
                case 'Polygon':
                    Measure.measure(this.map, 'Polygon')
                    break
            }
        },
    },
    mounted() {
        this.initData();
        this.initMap();
        this.initTopMenu();
        this.initLeftMenu();
        this.initShowWindow();
        this.addForestry("city");
    }
}
</script>
