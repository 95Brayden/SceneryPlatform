<template>
    <el-container class="login-container">
      <el-form ref="loginForm" :model="loginForm" class="login-form" label-position="top">
        <h1 class="title">登录</h1>
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="login-button">登录</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </template>

  <script>
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        }
      };
    },
    methods: {
      handleLogin() {
        console.log(this.loginForm);
        this.$message.success('登录成功！欢迎来到武汉市旅游景点可视化平台\n即将跳转到首页...');  // 显示成功消息
        setTimeout(() => {
          this.$router.push('/home');  // Navigation to home after successful login
        }, 2000);  // 延迟2秒后跳转，给用户时间看提示消息
      }
    }
  }
  </script>

  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('../assets/images/背景.jpg'); /* 使用指定的背景图片 */
    background-size: cover;  /* 覆盖整个容器 */
    background-position: center;
  }

  .login-form {
    width: 400px;  /* 登录框宽度增加到400px */
    padding: 30px;  /* 内边距增加，使框更大 */
    border-radius: 10px;  /* 边角圆滑 */
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    background-color: white;
    opacity: 0.95;  /* 轻微透明，看起来更有层次感 */
  }

  .title {
    text-align: center;
    color: #043927;  /* 主题颜色，暗绿 */
  }

  .login-button {
    width: 100%;
    background-color: #043927;  /* 按钮颜色 */
    border-color: #043927;
  }
  </style>
