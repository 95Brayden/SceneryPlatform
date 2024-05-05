<template>
    <div class="top-bar">
        <div class="top_menu_con d-flex j-start a-center">
            <div class="top_menu_bt_s d-flex j-center a-center" type="menu_1">
              <router-link to="/home" active-class="active">景点概览</router-link>
            </div>

            <div class="top_menu_bt d-flex j-center a-center" type="menu_3">
              <router-link to="/monitor" active-class="active">景点数据</router-link>
            </div>

            <div class="top_menu_bt d-flex j-center a-center" type="menu_3">
              <a href="https://admin.spicyboy.cn/#/dataScreen" class="active">数据可视化大屏</a>
            </div>
        </div>

        <div class="top-bar-right d-flex j-end a-center">
            <div class="time">2024-4-28</div>
            <div class="week">星期天</div>
            <div class="weather"><img src="@/assets/images/header/sun.png" alt="" width="50px"></div>
            <div class="weather">晴天 19℃-26℃</div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import dayjs from "dayjs";

export default {
    name: 'header',
    methods: {
        initTopMenu() {  //初始化顶部标题栏
            $(document).on('click', '.top_menu_con div', function (event) {
                var event_type = event.type;
                var type = $(this).attr('type');
                $(".top_menu_con").find("div").attr("class", "top_menu_bt d-flex j-center a-center");
                $(this).attr('class', 'top_menu_bt_s d-flex j-center a-center');

            });
            const now = dayjs();
            let time = now.format("YYYY-MM-DD");
            $(".time").text(time);
            $(".week").text("星期" + "日一二三四五六".charAt(now.day()));
        }

    },
    mounted() {
        this.initTopMenu();
    }
}

</script>