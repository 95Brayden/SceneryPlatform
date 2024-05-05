<template>
    <!--底图图层弹出框-->
    <div class="show_windows" id="m_baselayer" style="display: none; height: 380px;">
        <a style="float: right"><i class="show_windows_title_close" id="m_baselayer_close"></i></a>
        <div class="show_windows_title">
            <p>底图图层</p>
        </div>

        <div class="show_windows_content baselayer_select">
            <div class="content_line d-flex j-center a-center">
                <div class="menu_con" id="tianditu_image_only">
                    <div class="map_item"><img src="@/assets/images/map/tdt_image.jpg" width="100" height="60" /></div>
                    <div class="map_title">天地影像图</div>
                </div>
                <div class="menu_con" id="tianditu_image">
                    <div class="map_item"><img src="@/assets/images/map/tdt_image1.jpg" width="100%" height="100%" /></div>
                    <div class="map_title">天地影像图(标注)</div>
                </div>
                <div class="menu_con" id="tianditu_vector">
                    <div class="map_item"><img src="@/assets/images/map/tdt_normal1.jpg" width="100%" height="100%" /></div>
                    <div class="map_title">天地道路图</div>
                </div>
            </div>
            <div class="content_line d-flex j-center a-center">
                <div class="menu_con" id="tianditu_terrain">
                    <div class="map_item"><img src="@/assets/images/map/tdt_reflet1.jpg" width="100%" height="100%" /></div>
                    <div class="map_title">天地地形图</div>
                </div>
                <div class="menu_con menu_con_select" id="esri_worldimagery">
                    <div class="map_item"><img src="@/assets/images/map/arcgis_image.jpg" width="100%" height="100%" />
                    </div>
                    <div class="map_title">ArcGIS影像图</div>
                </div>
                <div class="menu_con" id="esri_darkgreycanvas">
                    <div class="map_item"><img src="@/assets/images/map/arcgis_blue.jpg" width="100%" height="100%" /></div>
                    <div class="map_title">ArcGIS深蓝图</div>
                </div>
            </div>
            <div class="content_line d-flex j-center a-center">
                <div class="menu_con" id="geoq_purplishblue">
                    <div class="map_item"><img src="@/assets/images/map/zt_blue.jpg" width="100%" height="100%" /></div>
                    <div class="map_title">智图深蓝图</div>
                </div>
                <div class="menu_con" id="geoq_gray">
                    <div class="map_item"><img src="@/assets/images/map/zt_grey.jpg" width="100%" height="100%" /></div>
                    <div class="map_title">智图灰色图</div>
                </div>
                <div class="menu_con" id="gaode_img">
                    <div class="map_item"><img src="@/assets/images/map/gd_image1.jpg" width="100%" height="100%" /></div>
                    <div class="map_title">高德影像图</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
    name: 'basemap_menu',
    methods: {
        initShowWindow() { //初始化弹出窗的功能
            let that = this;
            $(document).on("click", ".baselayer_select .menu_con", function (event) {
                event.preventDefault();
                var type = $(this).attr("id");
                $('.baselayer_select .menu_con').attr('class', 'menu_con');
                $(this).attr("class", "menu_con menu_con_select");
                that.$parent.changeBaseMap(type);
            });
            //底图图层弹出窗口的关闭事件
            $(document).on("click", "#m_baselayer_close", function (event) {
                event.preventDefault();
                $("#m_baselayer").hide();
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
            });
        },
    },
    mounted() {
        this.initShowWindow();
    }
}
</script>