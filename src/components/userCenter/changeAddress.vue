<template>
  <div class="editAddressBox">
    <div class="editArea itemStyle">
      <span><i>*</i>所在地区：</span>
      <div class="rightForm">
        <el-cascader
          size="large"
          :options="options"
          v-model="areaCode"
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
        <el-input v-model="newAddress.name" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="itemStyle">
      <span><i>*</i>手机号码：</span>
      <div class="rightForm">
        <el-input v-model="newAddress.phone" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="itemStyle">
      <span></span>
      <div class="rightForm">
        <el-checkbox v-model="newAddress.isDefault">设置为默认收货地址</el-checkbox>
      </div>
    </div>
    <div class="dialogFooter">
      <el-button type="primary" @click="newAddressData">确 定</el-button>
      <el-button @click="cancelAdd">取 消</el-button>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'addAddress',
  data () {
    return {
      options: regionData,
      selectedOptions: [],
      addAddressDialog: false,
      newAddress: {
        isDefault: false,
        name: '',
        area: '',
        address: '',
        phone: '',
        isShow: false
      }
    }
  },
  computed: {
    ...mapGetters([
      'newAddress', // 新增修改收货地址
      'areaCode' // 区域地址
    ])
  },
  methods: {
    ...mapMutations({
      seNewAddress: 'SET_NEWADDRESS' // 新增修改收货地址
    }),
    addressChange (arr) {
      // console.log(arr)
      // console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]])
      this.newAddress.area = `${CodeToText[arr[0]]}-${CodeToText[arr[1]]}-${CodeToText[arr[2]]}`
    },
    newAddressData () {
      if (this.newAddress.area === '') {
        this.$message.error('请选择地区!')
      } else if (this.newAddress.area === '') {
        this.$message.error('请选择地区!')
      } else if (this.newAddress.address === '') {
        this.$message.error('请填写详细地址!')
      } else if (this.newAddress.phone === '') {
        this.$message.error('请填写手机号码!')
      } else {
        this.$emit('hideAddDialog', this.newAddress)
        this.newAddress = {isDefault: false,
          name: '',
          area: '',
          address: '',
          phone: ''}
        this.selectedOptions = []
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
  padding: 0 100px;
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
      height: 25px;
      width: 120px;
    }
  }
}
</style>
