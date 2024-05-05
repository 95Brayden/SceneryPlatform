<template>
    <!--选择边界弹出框-->
    <div class="show_windows" id="m_select_range" style="display: none; height: 300px;">
        <a style="float: right"><i class="show_windows_title_close" id="m_select_range_close"></i></a>
        <div class="show_windows_title">
            <p>选择边界</p>
        </div>
        <div class="show_windows_content_padding select_range_type">
            <div class="show_windows_select_bt_line d-flex j-center a-center">
                <div class="show_windows_select_content menu_con_select" id="city">
                    <table>
                        <tr>
                            <td><img src="@/assets/images/range/range_select_2.png" width="100" height="75" /></td>
                        </tr>
                        <tr>
                            <td>市边界</td>
                        </tr>
                    </table>
                </div>
                <div class="show_windows_select_content" id="country">
                    <table>
                        <tr>
                            <td><img src="@/assets/images/range/range_select_1.png" width="100" height="75" /></td>
                        </tr>
                        <tr>
                            <td>区县界</td>
                        </tr>
                    </table>
                </div>
                <div class="show_windows_select_content" id="provice">
                    <table>
                        <tr>
                            <td><img src="@/assets/images/range/range_select_3.png" width="100" height="75" /></td>
                        </tr>
                        <tr>
                            <td>省边界</td>
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
    name: 'range_menu',
    methods: {
        initShowWindow() { //初始化弹出窗的功能
            let that = this;
            $(document).on("click", ".select_range_type .show_windows_select_content", function (event) {
                event.preventDefault();
                var type = $(this).attr("id");
                $('.select_range_type .show_windows_select_content').attr('class', 'show_windows_select_content');
                $(this).attr("class", "show_windows_select_content menu_con_select");
                that.$parent.addForestry(type);
            });
            //选择边界图层弹出窗口的关闭事件
            $(document).on("click", "#m_select_range_close", function (event) {
                event.preventDefault();
                $("#m_select_range").hide();
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
            });
        },
    },
    mounted() {
        this.initShowWindow();
    }
}

</script>