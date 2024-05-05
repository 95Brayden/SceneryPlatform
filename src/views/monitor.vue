<template>
    <div class="ol_map" id="ol_map"></div>
    <div style="display:none;">
        <div id="popup" class="tooltip_style2">
            <table width="100%" height="100%">
                <tbody>
                    <tr style="text-align: center;">
                        <td rowspan="5" width="60"><img src="/static/images/show/00009.jpg" width="60" height="60">
                        </td>
                        <td>景区代码</td>
                        <td>00020</td>
                        <td>-</td>
                    </tr>
                    <tr style="text-align: center;">
                        <td>景区人数</td>
                        <td>425</td>
                        <td>-</td>
                    </tr>
                    <tr style="text-align: center;">
                        <td>景区名称</td>
                        <td>黄鹤楼</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div id="div_xy"></div>

    <div class="top-menu-bar d-flex j-center a-center">
        <div class="menu-bt-bg" type="baselayer"><img src="@/assets/images/topmenu/top_baselayer.png" width="40" height="40" /></div>
        <div class="menu-bt-bg" type="rangelayer"><img src="@/assets/images/topmenu/top_range.png" width="40" height="40" /></div>
        <div class="menu-bt-bg" type="marker"><img src="@/assets/images/topmenu/top_marker.png" width="40" height="40" /></div>
        <div class="menu-bt-bg" type="countinfo"><img src="@/assets/images/topmenu/top_count.png" width="40" height="40" /></div>
    </div>

    <basemap_menu></basemap_menu>
    <range_menu></range_menu>
    <type_menu></type_menu>


    <!--所有景点参数弹出框-->
    <div class="show_windows_strong_600" id="m_all_strong_info" style="display: block; height: 800px; width: 600px;">
        <a style="float: right"><i class="show_windows_title_close" id="m_all_strong_close"></i></a>
        <div class="show_windows_title_600">
            <p>景点热度数据（每隔1h更新）</p>
        </div>
        <div class="show_windows_content_padding" id="tab_stationinfo_data">
        <table class="table_default">
            <thead>
                <tr class="tr_title">
                    <td>景区代码</td>
                    <td>景区名称</td>
                    <td>景区人数</td>
                    <td>时间</td>
                </tr>
            </thead>
            <tbody>
            <tr class="tr_content">
              <td>WLL07</td>
              <td>武汉黄鹤楼</td>
              <td>306人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL08</td>
              <td>江汉路步行街</td>
              <td>255人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_content">
              <td>WLL09</td>
              <td>武汉东湖风景区</td>
              <td>230人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL10</td>
              <td>武汉大学</td>
              <td>186人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_content">
              <td>WLL11</td>
              <td>汉口江滩</td>
              <td>162人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL12</td>
              <td>武汉博物馆</td>
              <td>148人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_content">
              <td>WLL13</td>
              <td>汉正街</td>
              <td>146人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL14</td>
              <td>武汉动物园</td>
              <td>146人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_content">
              <td>WLL15</td>
              <td>长江大桥</td>
              <td>144人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL16</td>
              <td>楚河汉街</td>
              <td>130人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_content">
              <td>WLL17</td>
              <td>宝通寺</td>
              <td>112人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL18</td>
              <td>武汉园博园</td>
              <td>104人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_content">
              <td>WLL19</td>
              <td>武汉欢乐谷</td>
              <td>102人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL20</td>
              <td>武汉天地</td>
              <td>100人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_content">
              <td>WLL21</td>
              <td>武汉植物园</td>
              <td>96人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL22</td>
              <td>解放公园</td>
              <td>83人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_content">
              <td>WLL21</td>
              <td>武汉归元禅寺</td>
              <td>76人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL22</td>
              <td>玫瑰街</td>
              <td>75人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_content">
              <td>WLL21</td>
              <td>户部巷</td>
              <td>66人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL22</td>
              <td>昙华林</td>
              <td>56人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_content">
              <td>WLL21</td>
              <td>紫薇花海</td>
              <td>45人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
            <tr class="tr_strongtitle">
              <td>WLL22</td>
              <td>玫瑰街</td>
              <td>75人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>            <tr class="tr_content">
              <td>WLL21</td>
              <td>逸夫博物馆</td>
              <td>23人</td>
              <td>2024-04-28 15:00:00</td>
            </tr>
                <!-- 假设下面还有更多类似的行 -->
            </tbody>
        </table>
    </div>


    </div>

    <!--点击显示可视化弹出框-->
    <div class="show_windows_600" id="m_select_sta_strong" style="display: block; height: 680px;">
        <a style="float: right"><i class="show_windows_title_close" id="m_select_sta_strong_close"></i></a>
        <div class="show_windows_title">
            <p>类型统计</p>
        </div>
        <div class="show_windows_content_padding">
            <div class="count_info_content_line d-flex j-center a-center">
                <div class="count_info_content count_info_content_bg1">
                    <div class=" d-flex j-center a-end" style="width: 100%; height: 20%;">

                    </div>
                    <div class=" d-flex j-center a-end" style="width: 100%; height: 78%;">
                        <b style="color: #04d8db;" id="e_count">90个</b>
                    </div>
                </div>
                <div class="count_info_content count_info_content_bg2">
                    <div class=" d-flex j-center a-end" style="width: 100%; height: 20%;">

                    </div>
                    <div class=" d-flex j-center a-end" style="width: 100%; height: 78%;">
                        &nbsp;<b style="color: #04d8db;" id="e_date_len">35个</b>
                    </div>
                </div>
                <div class="count_info_content count_info_content_bg3">
                    <div class=" d-flex j-center a-end" style="width: 100%; height: 20%;">
                    </div>
                    <div class=" d-flex j-center a-end" style="width: 100%; height: 78%;">
                        <b style="color: #04d8db;" id="e_rate">15个</b>
                    </div>
                </div>
            </div>

        </div>
        <div class="show_windows_title margin-top-5">
            <p>相关数据</p>
        </div>
        <div class="show_windows_content_padding" id="e_table">
            <table class="table_default">
                <tr class="tr_title">
                    <td>景区评级</td>
                    <td>景区数量</td>
                    <td>比例(%)</td>
                </tr>
                <tr class="tr_content" style="color: #4eff01;">
                    <td>
                        <p id="sta_name">未评级</p>
                    </td>
                    <td>
                        <p id="sta_type">43</p>
                    </td>
                    <td>
                        <p id="site_level">13.16%</p>
                    </td>
                </tr>
                <tr class="tr_title" style="color: #0091ff;">
                    <td>
                        <p id="sta_name">特色景区</p>
                    </td>
                    <td>
                        <p id="sta_type">54</p>
                    </td>
                    <td>
                        <p id="site_level">26.31%</p>
                    </td>
                </tr>
                <tr class="tr_content" style="color: #bbbb13;">
                    <td>
                        <p id="sta_name">3A景区</p>
                    </td>
                    <td>
                        <p id="sta_type">13</p>
                    </td>
                    <td>
                        <p id="site_level">39.47%</p>
                    </td>
                </tr>
                <tr class="tr_title" style="color: #fd8b06;">
                    <td>
                        <p id="sta_name">4A景区</p>
                    </td>
                    <td>
                        <p id="sta_type">12</p>
                    </td>
                    <td>
                        <p id="site_level">15.79%</p>
                    </td>
                </tr>
                <tr class="tr_content" style="color: #f20ab8;">
                    <td>
                        <p id="sta_name">5A景区</p>
                    </td>
                    <td>
                        <p id="sta_type">8</p>
                    </td>
                    <td>
                        <p id="site_level">3.95%</p>
                    </td>
                </tr>
                <tr class="tr_title" style="color: #ff0000;">
                    <td>
                        <p id="sta_name">全国重点景区</p>
                    </td>
                    <td>
                        <p id="sta_type">10</p>
                    </td>
                    <td>
                        <p id="site_level">1.32%</p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="show_windows_title margin-top-5">
            <p>数据统计</p>
        </div>
        <div class="show_windows_content_padding">
            <div id="echart_l_3" style="width: 100%; height: 300px;"></div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import 'ol/ol.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from "ol/layer";
import { format } from 'ol/coordinate';
import MousePosition from "ol/control/MousePosition.js";
import { ScaleLine } from 'ol/control.js';
import Overlay from 'ol/Overlay.js';
import * as echarts from "echarts";

import mapcommon from '@/js/mapcommon';
import basemap_menu from '@/components/topmenu/basemap_menu.vue';
import range_menu from '@/components/topmenu/range_menu.vue';
import type_menu from '@/components/topmenu/type_menu.vue';

export default {
    name: 'home',
    components: {
        basemap_menu,
        range_menu,
        type_menu,
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
        }
    },
    methods: {
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

            // 用户点击地图就会弹出来的窗口（弹窗）
            const popup = new Overlay({
                element: document.getElementById('popup')
            });
            this.map.addOverlay(popup);

            // 为地图绑定click事件，使用户点击地图就能在对应处弹窗
            let that = this;
            that.map.on('click', function (event) {
                let feature = that.map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
                    return feature;
                })
                if (feature && feature.getId()) {
                    console.log(feature.getId());
                    let element = popup.getElement();       // 获取充当弹窗的DOM元素
                    let coordinate = event.coordinate;      // 获取鼠标点击处的坐标
                    popup.setPosition(coordinate);          // 将弹窗位置设置为鼠标点击处
                    //element.innerHTML = '<p>The location you clicked was:</p><code>1234</code>';
                } else {
                    popup.setVisible(false);
                }

            });
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
            var m_url = "/static/data/map/city.json?t=" + new Date().getTime();
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
        initTopMenu() {  //初始化顶部菜单
            let that = this;
            $(document).on('click', '.top-menu-bar div', function (event) {
                var event_type = event.type;
                var type = $(this).attr('type');
                that.cur_top_menu_select = type;
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
                $(this).attr('class', 'menu-bt-bg-s');

                if (type == 'baselayer') {
                    $("#m_select_sta_strong").hide();
                    $("#m_select_range").hide();
                    $("#m_countinfo").hide();
                    $("#m_selectmarker").hide();
                    $("#m_baselayer").show();
                } else if (type == 'countinfo') {
                    $("#m_select_range").hide();
                    $("#m_baselayer").hide();
                    $("#m_selectmarker").hide();
                    $("#m_all_strong_info").show();
                    $("#m_select_sta_strong").show();
                } else if (type == 'marker') {
                    $("#m_select_sta_strong").hide();
                    $("#m_select_range").hide();
                    $("#m_countinfo").hide();
                    $("#m_baselayer").hide();
                    $("#m_selectmarker").show();
                } else if (type == 'rangelayer') {
                    $("#m_select_sta_strong").hide();
                    $("#m_select_range").show();
                    $("#m_countinfo").hide();
                    $("#m_baselayer").hide();
                    $("#m_selectmarker").hide();
                }
            });

            //弹出窗口的关闭事件
            $(document).on("click", "#m_all_strong_close", function (event) {
                event.preventDefault();
                $("#m_all_strong_info").hide();
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
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

            console.log(resp);

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
              console.log(m);
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

        rendStationInfoData(type) {  //显示各景点
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

            var tab_stationinfo_data = '<table class="table_default">';
            tab_stationinfo_data += '<tr class="tr_title"><td>景区代码</td><td>景区名称</td><td>时间</td></tr>'

            if(this.stationinfo_data_list == null){
                return
            }

            var curIndex = 1;

            for (var i = 0; i < this.stationinfo_data_list.length; i++) {
                var m = this.stationinfo_data_list[i];
                console.log(m);
                var filerSign = mapcommon.is_show_station(m, this.select_sta_type);
                //console.log(filerSign);
                if (filerSign) {
                    continue;
                }

                var iconColor = null;

                var trClass = 'tr_content'
                if (curIndex % 2 == 0) {
                    trClass = 'tr_strongtitle'
                }

                var sta_stationinfo_data = '';
                sta_stationinfo_data = '<tr class="' + trClass + '"><td>' + m.sta_code + '</td><td>' + m.sta_name + '</td><td>' +  m.time + '</td></tr>'

                if (curIndex < 25) {
                    tab_stationinfo_data += sta_stationinfo_data;
                }

                var sta01 = mapcommon.buildStationDivMarker(m);
                //console.log(sta01);
                this.staVectorSource.addFeature(sta01);

                curIndex += 1;
            }

            tab_stationinfo_data += '</table>';
            $('#tab_stationinfo_data').html(tab_stationinfo_data);
        },


        initL_3_Chart() {  //初始化左三的图表
            // 基于准备好的dom，初始化echarts实例
            var data_list = [
                { name: '全国重点景区', value: 10 },
                { name: '未评级', value: 28 },
                { name: '特色景区', value: 38 },

                { name: '3A景区', value: 16 },
                { name: '4A景区', value: 24 },
                { name: '5A景区', value: 3 },
            ];
            var namedata = [];
            for (var i = 0; i < data_list.length; i++) {
                namedata.push(data_list[i]['name']);
            }
            var myChart = echarts.init(document.getElementById('echart_l_3'));
            var option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    left: 10,
                    bottom: 0,
                    height: 30,
                    itemWidth: 10,
                    itemHeight: 10,
                    itemGap: 10,
                    textStyle: {
                        color: 'rgba(255,255,255,.6)',
                        fontSize: 12
                    },
                    orient: 'horizontal',
                    data: namedata
                },
                calculable: true,
                series: [
                    {
                        name: ' ',
                        color: ['#4eff01', '#0091ff', '#bbbb13', '#fd8b06', '#f20ab8', '#ff0000', '#c9c862', '#c98b62', '#c962b9', '#7562c9', '#c96262', '#c25775', '#00b7be'],
                        type: 'pie',
                        radius: [30, 70],
                        center: ['50%', '45%'],
                        roseType: 'radius',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },

                        lableLine: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },

                        data: data_list
                    },
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    },
    mounted() {
        this.initMap();
        this.initTopMenu();
        this.addForestry("city");
        this.initData();
        this.initL_3_Chart();
    }
}

</script>