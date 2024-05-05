<template>
  <div class="show_windows1" id="m_addsite" style="display: none; height: 300px;">
    <a style="float: right"><i class="show_windows_title_close" id="m_addsite_close"></i></a>
    <div class="show_windows_title" >
      <p>填写站点信息</p>
    </div>
    <div class="form_content">
      <form @submit.prevent="submitForm">
        <div>
          <label class="label" for="net_code">地区代码:</label>
          <input class="input-field" type="text" id="net_code_upload" v-model="formData.net_code" @input="checkInput">
        </div>
        <div>
          <label class="label" for="sta_code">景点代码:</label>
          <input type="text" class="input-field" id="sta_code_upload" v-model="formData.sta_code" @input="checkInput">
        </div>
        <div>
          <label class="label" for="sta_type">景点类型:</label>
          <input type="radio" id="sta_type1_upload" value="景区" v-model="formData.sta_type" @input="checkInput"> 景区
          <input type="radio" id="sta_type2_upload" value="文保" v-model="formData.sta_type" @input="checkInput"> 文保
        </div>
        <div>
          <label class="label" for="dev_type">开放类型:</label>
          <input type="text" class="input-field" id="dev_type_upload" v-model="formData.dev_type" @input="checkInput">
        </div>
        <div>
          <label class="label" for="dev_ip">开放IP:</label>
          <input type="text" class="input-field" id="dev_ip_upload" v-model="formData.dev_ip" @input="checkInput">
        </div>
        <div>
          <label class="label" for="out_port">外端口:</label>
          <input type="number" class="input-field" id="out_port_upload" v-model="formData.out_port" @input="checkInput">
        </div>
        <div>
          <label class="label" for="in_port">内端口:</label>
          <input type="number" class="input-field" id="in_port_upload" v-model="formData.in_port" @input="checkInput">
        </div>
        <div>
          <label class="label" for="sta_lon">经度:</label>
          <input type="number" class="input-field" id="sta_lon_upload" step="any" v-model="formData.sta_lon" @input="checkInput">
        </div>
        <div>
          <label class="label" for="sta_lat">纬度:</label>
          <input type="number" class="input-field" id="sta_lat_upload" step="any" v-model="formData.sta_lat" @input="checkInput">
        </div>
        <div>
          <label class="label" for="sta_name">景点名称:</label>
          <input type="text" class="input-field" id="sta_name_upload" v-model="formData.sta_name" @input="checkInput">
        </div>
        <div>
          <label class="label" for="site_level">景点级别:</label>
          <select class="input-field" id="site_level_upload" v-model="formData.site_level" @input="checkInput">
            <option value="未评级">未评级</option>
            <option value="1A景区">1A景区</option>
            <option value="2A景区">2A景区</option>
            <option value="3A景区">3A景区</option>
            <option value="4A景区">4A景区</option>
            <option value="5A景区">5A景区</option>
          </select>
        </div>
        <div>
          <label class="label" for="sta_address">景区地址:</label>
          <input type="text" class="input-field" id="sta_address_upload" v-model="formData.sta_address" @input="checkInput">
        </div>
        <div>
          <label class="label" for="site_pic">相关图片:</label>
          <input type="file" class="input-field" id="site_pic_upload" @change="handleFileUpload">
        </div>
        <div>
          <label class="label" for="site_range">所属区域:</label>
          <input type="text" class="input-field" id="site_range_upload" v-model="formData.site_range" @input="checkInput">
        </div>
        <div>
          <label class="label" for="site_adress">景点地址:</label>
          <input type="text" class="input-field" id="site_address_upload" v-model="formData.site_adress" @input="checkInput">
        </div>
        <div>
          <label class="label" for="site_instroduce">景区简介:</label>
          <textarea id="site_introduce_upload" class="input-field1" v-model="formData.site_instroduce" @input="checkInput"></textarea>
        </div>
        <button class="input-field2" type="submit">提交</button>
      </form>
      <div v-if="showIncompleteMessage" class="incomplete-message">
        请完整填写表单内容！
      </div>
    </div>

  </div>
</template>

<script>
import $ from "jquery";
import axios from 'axios';

export default {
  data() {
    return {
      showIncompleteMessage: true,// 控制提示信息的显示
      fileUploaded: false, // 文件是否已上传
      formData: {
        net_code: 'WH',
        sta_code: '00001',
        sta_type: '景区', // 修改：添加默认值
        dev_type: '无',
        dev_ip: '192.168.213.198',
        out_port: '8080',
        in_port: '80',
        sta_lon: '114.31799922895671',
        sta_lat: '30.548187845686403',
        sta_name: '黄鹤楼',
        site_level: '5A景区',
        sta_address: '湖北省武汉市武昌区蛇山西山坡特1号',
        site_pic_upload: '00009.jpg',
        site_range: '武昌区',
        site_adress: '湖北省武汉市武昌区',
        site_instroduce: '黄鹤楼,位于湖北省武汉市武昌区蛇山之巅,是中国三大名楼之一。建于三国时期,历经数次修葺,成为一座集中国古建筑、文学、诗词等于一体的名胜古迹。黄鹤楼以雄伟壮观的建筑风格和悠久深厚的历史文化内涵而闻名于世。登楼远眺,可俯瞰整个武汉城及长江风光,是游览武汉的必到之地。'
      }
    };
  },
  methods: {
    initShowWindow() {
      $(document).on("click", "#m_addsite_close", (event) => {
        event.preventDefault();
        $("#m_addsite").hide();
      });
    },
    handleFileUpload(event) {
      // 检查文件是否存在
      if (event.target.files.length > 0) {
        this.fileUploaded = true;
      } else {
        this.fileUploaded = false;
        this.showIncompleteMessage = true; // 文件不存在时显示提示信息
      }
      // 检查表单完整性
      this.checkInput();
      this.formData.site_pic_upload = event.target.files[0];
    },
    checkInput() {
      // 检查每个输入框是否有内容，如果有一个输入框没有内容，则显示提示信息
      for (let key in this.formData) {
        if (!this.formData[key]) {
          this.showIncompleteMessage = true;
          return;
        }
      }
      // 如果所有输入框都有内容且文件已上传，则隐藏提示信息
      if (this.fileUploaded) {
        this.showIncompleteMessage = false;
      }
    },
    submitForm() {
      // 在提交表单时再次检查输入框的内容，以防止用户在提示信息显示时点击提交按钮
      this.checkInput();
      if (!this.showIncompleteMessage) {
        const formData = new FormData();
        Object.keys(this.formData).forEach(key => {
          formData.append(key, this.formData[key]);
        });

        axios.post('http://localhost:8080/add_site', formData)
            .then(response => {
              console.log(response.data);
              alert('数据添加成功');
            })
            .catch(error => {
              console.error(error);
              alert('请求失败: ' + error.message);
            });
      }
    },
  },
  mounted() {
    this.initShowWindow();
  }
};
</script>

<style scoped>

</style>
