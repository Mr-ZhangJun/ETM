<template>
  <div class="login-container">
    <vue-particles
      color="#FFFFFF"
      :particleOpacity="0.4"
      :particlesNumber="120"
      shapeType="circle"
      :particleSize="5"
      linesColor="#FFFFFF"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <el-row class="row">
      <el-col :md="14" class="hidden-xs-only titles">
        <div class="grid-content bg-purple">
          <span>
            欢迎使用
            <strong>英福金银花智慧校园</strong>
          </span>
          <ul>
            <li>
              <i class="fa fa-arrow-circle-o-right"></i>推荐使用Google、火狐浏览器
            </li>
            <li>
              <i class="fa fa-arrow-circle-o-right"></i>学生默认帐号密码为学生学号
            </li>
            <li>
              <i class="fa fa-arrow-circle-o-right"></i>登录系统后请立即修改密码并绑定邮箱，以便于遗失密码后找回
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :md="10" :xs="24">
        <div class="grid-content bg-purple">
          <el-form
            :model="ruleForm2"
            status-icon
            ref="ruleForm2"
            label-position="left"
            label-width="0px"
            class="demo-ruleForm login-page"
          >
            <h3 class="title">英福金银花校园平台</h3>
            <el-form-item prop="username">
              <el-input
                type="text"
                v-model="ruleForm2.username"
                auto-complete="off"
                placeholder="用户名/邮箱/手机号"
                suffix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                suffix-icon="el-icon-lock"
                v-model="ruleForm2.password"
                auto-complete="off"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-row :gutter="10">
                <el-col :span="14">
                  <el-form-item prop="code">
                    <el-input
                      v-model="ruleForm2.code"
                      suffix-icon="el-icon-key"
                      auto-complete="off"
                      placeholder="验证码"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                    <div class="code" @click="refreshCode">
                      <SIdentify :identifyCode="identifyCode"></SIdentify>
                    </div>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-radio v-model="radio" label="1">教师</el-radio>
              <el-radio v-model="radio" label="2">学生</el-radio>
              <el-radio v-model="radio" label="3">家长</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                style="width:100%;"
                @click="handleSubmit"
                :loading="logining"
              >登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SIdentify from "./identify/identify";
import axios from "axios";
export default {
  components: {
    SIdentify: SIdentify
  },
  name: "identify",
  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "2864",
      radio: "1",
      logining: false,
      ruleForm2: {
        username: "",
        password: ""
      },
      checked: false
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    handleSubmit(event) {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          if (
            this.ruleForm2.username === "admin" &&
            this.ruleForm2.password === "123456"
          ) {
            this.logining = false;
            sessionStorage.setItem("user", this.ruleForm2.username);
            this.$router.push({ path: "/index" });
          } else {
            this.logining = false;
            this.$alert("用户名与密码不匹配", "提示", {
              confirmButtonText: "确定"
            });
          }
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      // console.log(this.identifyCode);
    },
    getUsers() {
      axios.get("../../static/menu.json").then(
        response => {
          console.log(response.data);
        },
        response => {
          console.log("error");
        }
      );
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 0 auto;
  padding: 35px 35px 15px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  color: #FFFFFF;
}
#particles-js {
  background-color: #16a085;
  z-index: -1;
  width: 100%;
  height: 100%;
  position: fixed;
  justify-content: center;
}
ul li {
  list-style-type: none;
}
ul {
  padding: 0;
}
.titles {
  color: #ffffff;
}
.row{
    width: 750px;
    margin: 0 auto;
    padding-top: 10%;
}
.el-form-item__content{
  line-height: 0;
}
.s-canvas{
  line-height: 0;
}
.el-radio__input .is-checked+ .el-radio__label{
  color: #FFFFFF;
}
.el-radio{
  color: #FFFFFF;
}
</style>