<template>
    <!--统计数据弹出框-->
    <div class="show_windows" id="m_countinfo" style="display: none; height: 500px;">
        <a style="float: right"><i class="show_windows_title_close" id="m_countinfo_close"></i></a>
        <div class="show_windows_title" style="margin-top: 5px;">
            <p>景点统计</p>
        </div>
        <div class="show_windows_content_padding">
            <div class="count_info_content_line d-flex j-center a-center">
                <div class="count_info_content count_info_content_bg1">
                    <div class=" d-flex j-center a-end" style="width: 100%; height: 95%;">
                        景点: &nbsp;<b style="color: #04d8db;">90个</b>
                    </div>
                </div>
                <div class="count_info_content count_info_content_bg2">
                    <div class=" d-flex j-center a-end" style="width: 100%; height: 95%;">
                        文化保护: &nbsp;<b style="color: #04d8db;">35个</b>
                    </div>
                </div>
                <div class="count_info_content count_info_content_bg3">
                    <div class=" d-flex j-center a-end" style="width: 100%; height: 95%;">
                        其它: &nbsp;<b style="color: #04d8db;">25个</b>
                    </div>
                </div>
            </div>
        </div>

        <div class="show_windows_title margin-top-5">
            <p>区域分布</p>
        </div>
        <div class="show_windows_content_padding">
            <div class="count_info_content_area_line d-flex j-center a-center">
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title" style="white-space: nowrap;">东西湖区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">12个</td>
                        </tr>
                    </table>
                </div>
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">洪山区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">21个</td>
                        </tr>
                    </table>
                </div>
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">江夏区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">9个</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="count_info_content_area_line d-flex j-center a-center">
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">江汉区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">24个</td>
                        </tr>
                    </table>
                </div>
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">硚口区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">21个</td>
                        </tr>
                    </table>
                </div>
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">黄陂区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">13个</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="count_info_content_area_line d-flex j-center a-center">
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">青山区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">7个</td>
                        </tr>
                    </table>
                </div>
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">汉南区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">2个</td>
                        </tr>
                    </table>
                </div>
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">武昌区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">11个</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="count_info_content_area_line d-flex j-center a-center">
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">蔡甸区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">2个</td>
                        </tr>
                    </table>
                </div>
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">新洲区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">6个</td>
                        </tr>
                    </table>
                </div>
                <div class="count_info_content_area">
                    <table>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_title">江岸区</td>
                        </tr>
                        <tr>
                            <td width="45%"></td>
                            <td width="55%" class="count_info_content_area_td_value">22个</td>
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
    methods: {
        initShowWindow() { //初始化弹出窗的功能
            //统计信息图层弹出窗口的关闭事件
            $(document).on("click", "#m_countinfo_close", function (event) {
                event.preventDefault();
                $("#m_countinfo").hide();
                $(".top-menu-bar").find("div").attr("class", "menu-bt-bg");
            });
        },
    },
    mounted() {
        this.initShowWindow();
    }
}

</script>