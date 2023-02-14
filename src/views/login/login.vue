<template>
  <div class="login">
      <div class="loginTop">
        <div class="loginLogo warp">
          <div class="loginImgBox" @click="goToIndex">
            <img src="@/assets/images/cereshop/home/eshop.png" alt="">
          </div>
          <span>欢迎来到PC商城</span>
        </div>
      </div>
      <div class="loginCent">
        <div class="loginBox warp">
          <div class="loginForm">
            <div class="loginTit" v-text="isRegistered == '1' ? '注册' : '登录'"></div>
            <div class="loginFormBox">
              <div class="inputBox">
                <label>手机号码</label>
                <el-input v-model="userName" placeholder="请输入您的手机号码"></el-input>
              </div>
              <div class="inputBox" v-if="isRegistered === '1'">
                <label>验证码</label>
                <el-input v-model="verificationCode" placeholder="请输入验证码"></el-input>
                <span class="codeBtn" @click="getCode">{{ codeCountNum }}</span>
              </div>
              <div class="inputBox" v-if="isRegistered === '1'">
                <label>昵称</label>
                <el-input v-model="nickName" placeholder="请输入昵称"></el-input>
              </div>
              <div class="inputBox">
                <label>密码</label>
                <el-input v-model="password" show-password placeholder="请输入密码"></el-input>
              </div>
              <div class="inputBox" v-if="isRegistered === '1'">
                <label>确认密码</label>
                <el-input v-model="repassword" show-password placeholder="请输入确认密码"></el-input>
              </div>
              <div class="noLogin" :class="{registered: isRegistered === '1'}" >
                <el-checkbox v-show="isRegistered === '2'" v-model="isNoLogin">七天免登录</el-checkbox>
                <span @click="registered" v-text="isRegistered === '1' ? '登录' : '用户注册'"></span>
              </div>
              <div class="loginBtn" @click="login" v-text="isRegistered === '1' ? '注册' : '立即登录'">立即登录</div>
            </div>
            <div class="loginProtocol" v-if="isRegistered === '1'">
              <el-checkbox v-model="haveRead"></el-checkbox>
              <span>阅读并同意</span>
              <span @click="readAgreement">《eshop 服务协议》</span>
            </div>
          </div>
        </div>
      </div>
    <el-dialog
      title="服务协议"
      :visible.sync="dialogAgreement"
      width="50%">
      这是服务协议
    </el-dialog>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import api from '../../api'
import { listSearchMixin } from '../../config/mixin'
import {mapMutations} from 'vuex'
export default {
  name: 'login',
  mixins: [listSearchMixin],
  data () {
    return {
      userName: '',
      nickName: '',
      password: '',
      repassword: '',
      verificationCode: '',
      isNoLogin: false,
      haveRead: false,
      codeCountNum: '获取验证码',
      dialogAgreement: false,
      isRegistered: '2'
    }
  },
  mounted () {
    if (this.$route.query.type) {
      this.isRegistered = this.$route.query.type
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'SET_USERINFO' // 修改用户信息
    }),
    getUserInfo () {
      let self = this
      let params = {
        url: api.getUser,
        method: 'GET'
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.setUserInfo(res.data)
        }
      })
    },
    getCode () {
      let self = this
      let reg = /^1[13456789]\d{9}$/
      if (!reg.test(self.userName)) {
        self.$message.error('手机号格式错误')
        return
      }
      if (self.codeCountNum !== '获取验证码') {
        return
      }
      let params = {
        url: api.vCode,
        method: 'POST',
        data: {
          phone: self.userName
        }
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          this.codeCountNum = res.data
          this.$message.success('验证码获取成功')
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    // 阅读协议
    readAgreement () {
      this.dialogAgreement = true
    },
    goToIndex () {
      this.$router.push({path: '/'})
    },
    login () {
      let self = this
      if (self.isRegistered === '2') {
        this.getLogin()
      } else if (this.haveRead) {
        this.getRegister()
      } else {
        this.$message.warning('请阅读并同意服务协议')
      }
    },
    getLogin () {
      let self = this
      let reg = /^1[13456789]\d{9}$/
      if (!reg.test(self.userName)) {
        self.$message({
          message: '手机号码格式错误'
        })
        return
      }
      if (self.userName === '' || self.password === '') {
        self.$message({
          message: '请输入完整信息'
        })
        return
      }
      let params = {
        url: api.login,
        method: 'POST',
        data: {
          username: self.userName,
          password: self.password
        }
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          if (self.isNoLogin) {
            Cookie.set('token', res.data.token, { expires: 7 })
          } else {
            Cookie.set('token', res.data.token, { expires: 1 })
          }
          this.getUserInfo()
          this.$message.success('登录成功')
          this.$router.push({path: '/'})
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    getRegister () {
      let self = this
      let reg = /^1[13456789]\d{9}$/
      if (!reg.test(self.userName)) {
        self.$message({
          message: '手机号码格式错误'
        })
        return
      }
      if (self.verificationCode === '' || self.nickName === '' || self.password === '') {
        self.$message({
          message: '请输入完整信息'
        })
        return
      }
      if (self.password !== self.repassword) {
        self.$message({
          message: '两次密码不一致'
        })
        return
      }
      let params = {
        url: api.register,
        method: 'POST',
        data: {
          account: self.userName,
          captcha: self.verificationCode,
          nickname: self.nickName,
          password: self.password
        }
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          this.$message.success('注册成功')
          this.registered()
        } else {
          this.codeCountNum = '获取验证码'
          this.$message.warning(res.msg)
        }
      })
    },
    registered () {
      this.userName = ''
      this.verificationCode = ''
      this.nickName = ''
      this.password = ''
      this.repassword = ''
      if (this.isRegistered === '1') {
        this.isRegistered = '2'
      } else {
        this.isRegistered = '1'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    min-height: 768px;
    .loginTop {
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
      position: relative;
      z-index: 999;
      flex-shrink: 0;
      .loginLogo {
        display: flex;
        align-items: center;
        height: 88px;
        img {
          width: 180px;
          margin-right: 30px;
        }
        span {
          font-size: 18px;
          color: $fontColor;
        }
        .loginImgBox {
          width: 180px;
          height: 40px;
          align-items: center;
          display: flex;
          margin-right: 20px;
          margin-left: -50px;
          cursor: pointer;
          img {
            width: 100%;
          }
        }
      }
    }
    .loginCent {
      background: url('../../assets/images/loginBg.jpg') no-repeat;
      flex-grow: 1;
      background-size: cover;
      display: flex;
      align-items: center;
      .loginBox {
        display: flex;
        align-items: center;
        margin: 0 auto;
      }

      .loginForm {
        width: 540px;
        background: #ffffff;
        box-shadow: 0px 15px 14px 2px rgba(162, 87, 20, 0.15);
        border-radius: 10px;
        margin: 0 auto;
        .loginTit {
          height: 50px;
          display: flex;
          align-items: center;
          font-size: 30px;
          color: $mainColor;
          width: 100%;
          justify-content: center;
          margin: 30px 0;
          &:before {
            content: '';
            height: 2px;
            width: 98px;
            display: block;
            background: url("../../assets/images/dzuo.png") no-repeat;
            margin-right: 27px;
          }
          &:after {
            content: '';
            height: 2px;
            width: 98px;
            display: block;
            background: url("../../assets/images/dyou.png") no-repeat;
            margin-left: 27px;
          }
        }
        .loginFormBox {
          padding: 0 60px;
          .inputBox {
            position: relative;
            margin: 10px 0 10px 0;
            label {
              color: $fontColor;
              font-weight: 500;
            }
            >>> .el-input__inner {
              height: 32px;
              font-size: 16px;
              border: none;
              margin: 10px 0 10px 0;
              border-bottom: 1px solid #EEEEEE;
              color: #666666;
              padding-left: 0;
            }

            .codeBtn {
              width: 140px;
              height: 48px;
              background: #EEEEEE;
              border-radius: 4px;
              display: block;
              line-height: 48px;
              text-align: center;
              position: absolute;
              right: 0;
              bottom: 20px;
              cursor: pointer;
            }
            .codeCount {
              color: #999999;
            }
          }
          .noLogin {
            color: #333333;
            font-size: 18px;
            margin:20px 0 30px 0;
            height: 30px;
            align-items: center;
            display: flex;
            justify-content: space-between;
            >>> .el-checkbox__label {
              font-size: 16px;
              color: #333333;
              font-weight: 400;
            }
            span {
              cursor: pointer;
              font-size: 16px;
              text-decoration: underline;
              color: #666666;
            }
          }
          .registered {
            justify-content: flex-end;
          }
          .loginBtn {
            width: 100%;
            background: $mainColor;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 20px;
            color: #ffffff;
            margin-bottom: 60px;
            cursor: pointer;
          }
        }
        .loginProtocol {
          padding: 0 60px;
          display: flex;
          align-items: center;
          height: 80px;
          line-height: 80px;
          border-top: 1px solid #EEEEEE;
          span {
            margin-left: 10px;
          }
          span:nth-child(3) {
            color: #426BEA;
            cursor: pointer;
          }
        }
        >>> .el-checkbox__inner {
          width: 20px;
          height: 20px;
          &:after {
            height: 10px;
            left: 7px;
            width: 4px;
          }
        }
      }
    }
    >>> .el-dialog__body {
      max-height: 500px;
      min-height: 300px;
      overflow: auto;
    }
  }
</style>
