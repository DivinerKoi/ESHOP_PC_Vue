<template>
  <div class="addressBox">
    <div class="addAddressBox">
      <span class="addAddressBtn" @click="addAddressBtn">新增收货地址</span>
    </div>
    <div class="addressList clearfix sub-main" v-loading="loading" v-if="flag">
      <div class="addressItem" :class="{active:item.defult}" v-for="(item) of addressData" :key="item.receiveId">
        <div class="listItemInfoBox">
          <div class="isDefault">
            <span>设为默认地址</span>
            <el-switch
              v-model="item.isDefault"
              :active-value='1'
              :inactive-value='0'
              @change="changeDefultAd(item)"
              active-color="#FF7800"
              inactive-color="#c1c1c1">
            </el-switch>
          </div>
          <div class="addressInfo">
            <div class="infoItem">收货人：{{item.realName}}</div>
            <div class="infoItem">所在地区：{{item.province + item.city + item.district}}</div>
            <div class="infoItem">详细地址：{{item.detail}}</div>
            <div class="infoItem">手机号：{{item.phone}}</div>
          </div>
        </div>
        <div class="addressChange">
          <span @click="showDelete(item)"><i class="iconfont">&#xe62c;</i>删除</span>
          <span @click="changeAddress(item)"><i class="iconfont">&#xe605;</i>修改</span>
          <div v-show="item.isDefault === 1" class="iconfont defaultActive">&#xe612;</div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="nothing sub-main" v-else>
      <img src="../../../../static/image/nothing@2x.png" alt="">
      <p class="fs20 font-color-999">你还没有收货地址～</p>
    </div>
    <el-dialog
      title="新建收货地址"
      :visible.sync="addAddressShow"
      width="30%">
      <add-address @hideAddDialog="hideAddDialog" @cancelAdd="closeAdd"></add-address>
    </el-dialog>
    <el-dialog
      title="是否删除此项"
      :visible.sync="showDeleteAdd"
      width="30%">
      <div class="deleteAddInfo">
        <p>收货人： {{delCurrentAdd.realName}}</p>
        <p>手机号码： {{delCurrentAdd.phone}}</p>
        <p>收货地址： {{delCurrentAdd.province + delCurrentAdd.city + delCurrentAdd.district}} {{delCurrentAdd.detail}}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteAdd" v-throttle>确 定</el-button>
        <el-button @click="showDeleteAdd = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addAddress from '../../../components/orderInfo/addAddress'
import api from '@/api'
import { listSearchMixin } from '@/config/mixin'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'signingAddress',
  mixins: [listSearchMixin],
  components: {
    addAddress
  },
  data () {
    return {
      isDefault: false,
      showDeleteAdd: false,
      addAddressShow: false,
      addressData: [],
      delCurrentAdd: {},
      loading: false,
      flag: true
    }
  },
  mounted () {
    this.getAddressList()
  },
  computed: {
    ...mapGetters([
      'newAddress' // 新增修改收货地址
    ])
  },
  methods: {
    ...mapMutations({
      seNewAddress: 'SET_NEWADDRESS', // 新增修改收货地址
      setAreacode: 'SET_AREACODE' // 新增修改收货地址
    }),
    // 获取地址列表
    getAddressList () {
      let self = this
      self.loading = true
      let params = {
        url: api.aaddressList,
        method: 'GET'
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.addressData = res.data
          if (res.data.length === 0) {
            self.flag = false
          } else {
            self.flag = true
          }
          self.loading = false
        } else {
          self.$message.warning(res.msg)
        }
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.getAddressList()
    },
    showDelete (item) {
      this.showDeleteAdd = true
      this.delCurrentAdd = item
    },
    // 删除地址
    deleteAdd () {
      let self = this
      let params = {
        url: api.delAddress,
        method: 'POST',
        data: {
          id: self.delCurrentAdd.id
        }
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.showDeleteAdd = false
          self.$message({
            message: '删除成功',
            type: 'success'
          })
          self.addressData = []
          self.getAddressList()
        } else {
          self.$message.error(res.msg)
        }
      })
      self.showDeleteAdd = false
    },
    // 修改默认地址
    changeDefultAd (item) {
      let obj = {
        receiveId: item.id,
        receiveName: item.realName,
        receivePhone: item.phone,
        receiveAdress: item.province + '-' + item.city + '-' + item.district,
        address: item.detail,
        defult: item.isDefault === 1
      }
      this.seNewAddress(obj)
      this.updateAddressFun()
    },
    // 修改地址信息
    changeAddress (item) {
      let areaData = []
      areaData.push(item.province)
      areaData.push(item.city)
      areaData.push(item.district)
      let obj = {
        receiveId: item.id,
        receiveName: item.realName,
        receivePhone: item.phone,
        receiveAdress: item.province + '-' + item.city + '-' + item.district,
        address: item.detail,
        defult: item.isDefault === 1
      }
      this.seNewAddress(obj)
      this.setAreacode(areaData)
      this.addAddressShow = true
    },
    addAddressBtn () {
      let obj = {
        receiveName: '',
        receivePhone: '',
        receiveAdress: '',
        address: '',
        defult: false
      }
      this.setAreacode([])
      this.seNewAddress(obj)
      this.addAddressShow = true
    },
    // 新增地址
    hideAddDialog () {
      this.addAddressShow = false
      if (this.newAddress.receiveId) {
        this.updateAddressFun()
      } else {
        let self = this
        let address = self.newAddress.receiveAdress.split('-')
        let params = {
          url: api.editAddress,
          method: 'POST',
          data: {
            real_name: self.newAddress.receiveName,
            phone: self.newAddress.receivePhone,
            detail: self.newAddress.address,
            address: {
              province: address[0],
              city: address[1],
              district: address[2]
            },
            is_default: self.newAddress.defult.toString()
          }
        }
        self.sendReq(params, (res) => {
          if (res.status === 200) {
            self.$message({
              message: '地址添加成功',
              type: 'success'
            })
            self.addressData = []
            self.setAreacode([])
            self.getAddressList()
          } else {
            self.$message.error(res.msg)
          }
        })
      }
    },
    // 修改地址
    updateAddressFun () {
      let self = this
      self.addAddressShow = false
      let address = self.newAddress.receiveAdress.split('-')
      let params = {
        url: api.editAddress,
        method: 'POST',
        data: {
          id: self.newAddress.receiveId,
          real_name: self.newAddress.receiveName,
          phone: self.newAddress.receivePhone,
          detail: self.newAddress.address,
          address: {
            province: address[0],
            city: address[1],
            district: address[2]
          },
          is_default: self.newAddress.defult.toString()
        }
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.$message({
            message: '地址修改成功！',
            type: 'success'
          })
          self.addressData = []
          self.setAreacode([])
          self.getAddressList()
        } else {
          self.$message.error(res.msg)
        }
      })
    },
    closeAdd () {
      this.addAddressShow = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.addressBox {
  padding: 30px;
  border: 1px solid #E5E5E5;
  min-height: 500px;
  .addAddressBtn {
    font-size: 16px;
    color: $mainColor;
    height: 32px;
    line-height: 32px;
    background: #FFFFFF;
    border: 1px solid #FF7800;
    border-radius: 4px;
    padding: 4px 20px;
    cursor: pointer;
  }
  .addressList {
    margin-top: 20px;
    .addressItem {
      &:nth-child(2n) {
        margin-right: 0;
      }
      width: 477px;
      border: 2px solid #DDDDDD;
      border-radius: 4px;
      box-sizing: border-box;
      margin-right: 20px;
      margin-bottom: 20px;
      float: left;
      .listItemInfoBox {
        padding: 20px;
        .isDefault {
          display: flex;
          align-items: center;
          height: 35px;
          justify-content: flex-end;
          span {
            color: #333333;
            font-size: 16px;
            margin-right: 5px;
          }
        }
        .addressInfo {
          .infoItem {
            color: #333333;
            font-size: 16px;
            margin-bottom: 30px;
          }
          .infoItem:last-child {
            margin-bottom: 0;
          }
        }
      }
      .addressChange {
        border-top: #CCCCCC solid 1px;
        height: 45px;
        line-height: 45px;
        position: relative;
        i {
          margin-right: 5px;
        }
        .defaultActive {
          position: absolute;
          right: -1px;
          bottom: -3px;
          width: 46px;
          height: 46px;
          color: $mainColor;
          font-size: 46px;
        }
        span {
          display: block;
          float: left;
          width: 50%;
          color: #666666;
          text-align: center;
          cursor: pointer;
        }
        span:nth-child(2) {
          border-left: 1px solid #CCCCCC;
          color: $mainColor;
          box-sizing: border-box;
        }
      }
    }
    .active {
      border: 2px solid $mainColor;
    }
  }
  >>> .el-dialog {
    width: 33% !important;
    .el-dialog__body {
      background: #F8F8F8;
    }
    .el-dialog__header {
      text-align: center;
    }
    .dialog-footer {
      display: flex;
      justify-content: center;
      width: 100%;
      button {
        height: 45px;
        width: 120px;
      }
    }
  }
  .deleteAddInfo {
    width: 70%;
    margin: 0 auto;
    p {
      line-height: 30px;
    }
  }
  >>> .el-pagination {
    text-align: right;
  }
}
.sub-main{
  min-height: 400px;
}
.nothing{
  width: 100%;
  text-align: center;
  min-height: 400px;
  p{
    margin-bottom: 20px;
  }
  .el-button{
    background-color: #FF7800;
    color: #FFFFFF;
    font-weight: normal;
    border-radius: 0;
  }
}
</style>
