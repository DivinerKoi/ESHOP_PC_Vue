<template>
    <div class="editAddressBox">
      <div class="editArea itemStyle">
        <span><i>*</i>所在地区：</span>
        <div class="rightForm">
          <el-cascader
            size="large"
            :options="options"
            :props="{value:'label',label:'label'}"
            v-model="$store.state.areaCode"
            @change="addressChange">
          </el-cascader>
        </div>
      </div>
      <div class="itemStyle">
        <span><i>*</i>详细地址：</span>
        <div class="rightForm">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入地址"
            resize="none"
            v-model="newAddress.address">
          </el-input>
        </div>
      </div>
      <div class="itemStyle">
        <span><i>*</i>收货人姓名：</span>
        <div class="rightForm">
          <el-input v-model="newAddress.receiveName" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="itemStyle">
        <span><i>*</i>手机号码：</span>
        <div class="rightForm">
          <el-input v-model="newAddress.receivePhone" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <div class="itemStyle">
        <span></span>
        <div class="rightForm">
          <el-checkbox v-model="newAddress.defult">设置为默认收货地址</el-checkbox>
        </div>
      </div>
      <div class="dialogFooter">
        <el-button type="primary" @click="newAddressData">确 定</el-button>
        <el-button @click="cancelAdd">取 消</el-button>
      </div>
    </div>
</template>

<script>
import {listSearchMixin} from '@/config/mixin'
import { mapGetters, mapMutations } from 'vuex'
import api from '@/api'
export default {
name: 'addAddress',
mixins: [listSearchMixin],
data () {
    return {
      options: [],
      areaData: ''
    }
},
computed: {
    ...mapGetters([
      'newAddress' // 新增修改收货地址
    ])
},
created () {
    this.getArea()
},
methods: {
    ...mapMutations({
      seNewAddress: 'SET_NEWADDRESS', // 新增修改收货地址
      setAreacode: 'SET_AREACODE' // 新增地区编码
    }),
    getArea () {
      let self = this
      let params = {
        url: api.getArea,
        method: 'GET'
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.options = res.data
        }
      })
    },
    addressChange (arr) {
      this.areaData = `${arr[0]}-${arr[1]}-${arr[2]}`
    },
    newAddressData () {
      if (this.newAddress.receiveAdress !== '') {
        if (this.newAddress.address === '') {
          this.$message.error('请填写详细地址!')
        } else if (this.newAddress.receiveName === '') {
          this.$message.error('请填写收件人姓名!')
        } else if (this.newAddress.receivePhone === '') {
          this.$message.error('请填写手机号码!')
        } else {
          let reg = /^1[13456789]\d{9}$/
          if (!reg.test(this.newAddress.receivePhone)) {
            this.$message.error('手机号格式错误')
            return
          }
          if (this.areaData !== '') {
            this.newAddress.receiveAdress = this.areaData
          }
          this.$emit('hideAddDialog')
        }
      } else {
        if (this.areaData === '') {
          this.$message.error('请选择地区!')
        } else if (this.newAddress.address === '') {
          this.$message.error('请填写详细地址!')
        } else if (this.newAddress.receiveName === '') {
          this.$message.error('请填写收件人姓名!')
        } else if (this.newAddress.receivePhone === '') {
          this.$message.error('请填写手机号码!')
        } else {
          let reg = /^1[13456789]\d{9}$/
          if (!reg.test(this.newAddress.receivePhone)) {
            this.$message.error('手机号格式错误')
            return
          }
          this.newAddress.receiveAdress = this.areaData
          this.$emit('hideAddDialog')
        }
      }
    },
    cancelAdd () {
      this.$emit('cancelAdd')
    }
}
}
</script>

<style lang="scss" scoped>
.editAddressBox {
  padding: 0 50px;
  .itemStyle {
    display: flex;
    margin-bottom: 20px;
    span {
      width: 100px;
      margin-right: 20px;
      text-align: right;
      padding-top: 5px;
    }
    i {
      color: red;
      margin-right: 3px;
    }
    .rightForm {
      flex: 1;
      >>> .el-cascader {
        width: 100%;
      }
      >>> .el-checkbox__label {
        font-size: 12px;
        color: #666666;
      }
    }
  }
    .dialogFooter {
      display: flex;
      justify-content: center;
      width: 100%;
      button {
        width: 120px;
      }
    }
}
</style>
