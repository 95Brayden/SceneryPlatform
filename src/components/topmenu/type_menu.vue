<template>
    <!--选择标注弹出框-->
    <div class="show_windows" id="m_selectmarker" style="display: none; height: 300px;">
        <a style="float: right"><i class="show_windows_title_close" id="m_selectmarker_close"></i></a>
        <div class="show_windows_title">
            <p>选择标注</p>
        </div>
        <div class="show_windows_content_padding select_marker_type">
            <div class="show_windows_select_bt_line d-flex j-center a-center">
                <div class="show_windows_select_content" id="all">
                    <table>
                        <tr>
                            <td><img src="@/assets/images/marker/type_select_0.png" width="100" height="75" /></td>
                        </tr>
                        <tr>
                            <td>全部</td>
                        </tr>
                    </table>
                </div>
                <div class="show_windows_select_content" id="scenic">
                    <table>
                        <tr>
                            <td><img src="@/assets/images/marker/type_select_1.png" width="100" height="75" /></td>
                        </tr>
                        <tr>
                            <td>景区</td>
                        </tr>
                    </table>
                </div>
                <div class="show_windows_select_content" id="protection">
                    <table>
                        <tr>
                            <td><img src="@/assets/images/marker/type_select_2.png" width="100" height="75" /></td>
                        </tr>
                        <tr>
                            <td>文保</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="show_windows_select_bt_line d-flex j-center a-center" style="margin-top: 10px;">
                <div class="show_windows_select_content" id="other">
                    <table>
                        <tr>
                            <td><img src="@/assets/images/marker/type_select_3.png" width="100" height="75" /></td>
                        </tr>
                        <tr>
                            <td>其它</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

    </div>

</template>
<script>
import $ from 'jquery';

export default {
    name: 'type_menu',
    components: {

    },
    data() {

    },
    methods: {
        initShowWindow() { //初始化弹出窗的功能
            let that = this;
            $(document).on("click", ".select_marker_type .show_windows_select_content", function (event) {
                event.preventDefault();
                var type = $(this).attr("id");
                console.log(type);
                $('.select_marker_type .show_windows_select_content').attr('class', 'show_windows_select_content');
                $(this).attr("class", "show_windows_select_content menu_con_select");
                that.$parent.rendStationInfoData(type);
            });

            //选择标注图层弹出窗口的关闭事件
            $(document).on("click", "#m_selectmarker_close", function (event) {
                event.preventDefault();
                $("#m_selectmarker").hide();
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
            });

        },


    },
    mounted() {
        this.initShowWindow();
    }
}

</script>


<style></style>
