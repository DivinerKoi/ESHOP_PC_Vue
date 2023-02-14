<template>
  <div class='shopping-trolley sub-main'>
    <div class='trolley-list warp'>
      <div class='total-pro'>全部商品 {{ cartNumber > 0 ? cartNumber : '' }}</div>
      <div class='trolley-title'>
        <p>
          <el-checkbox v-model="selectAll" @change='getAllProduct' :true-label='1' :false-label='0'/>
          全选
        </p>
        <p><b>商品名称</b></p>
        <p>商品属性</p>
        <p>单价</p>
        <p>数量</p>
        <p>小计</p>
        <p>操作</p>
      </div>
      <div class='trolley-body'>
        <div v-if="noGoods==false">
          <div class='main-list'>
            <div class='pro-list'>
              <div class='pro-item' v-for='(item, index) in list' :key='index'>
                <div class='item'>
                  <el-checkbox v-model="item.checked" @change='selectProduct()' :true-label='1' :false-label='0'/>
                </div>
                <div class='item'>
                  <img :src="$api.BASEURL + item.productInfo.image" alt="" @click="goToProductDetail(item.productInfo.id)">
                  <div class='pro-des'>
                    <div>
                      <p @click="goToProductDetail()">{{ item.productInfo.storeName }}</p>
                      <p>
                        <span>{{ item.productInfo.attrInfo.sku }}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class='item'>
                  <p>¥ {{ item.productInfo.attrInfo.price }}</p>
                </div>
                <div class='item'>
                  <el-input-number v-model="item.cartNum" @change="handleChange(item)" :min="1"
                                   :max="item.productInfo.attrInfo.stock" :step=1 label="描述文字"
                                   size='small'></el-input-number>
                </div>
                <div class='item'>
                  <p v-if="item.productInfo.isShow === 1">¥ {{ item.cartNum * item.productInfo.attrInfo.price }}</p>
                  <p v-else class="fs20">(已下架)</p>
                </div>
                <div class='item'>
                  <p @click='confirDelete(item.id)' v-throttle>删除</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="noproduct" v-else>
          <img src="../../../static/image/noorder@2x.png" alt="">
          <p class="fs20 font-color-999">你的购物车还没有宝贝哦～</p>
        </div>

        <div class='trolley-footer'>
          <div class='item'>
            <span @click='confirDelete(list,true)' class='hover' v-throttle>删除</span>
          </div>
          <div class='item'>
          </div>
          <div class='item'>
            已选商品
            <span>{{ selectedNum }}</span>
            件
          </div>
          <div class='item'>
            <p>
              合计 (不含运费) :
              <span> ¥ {{ totalProice }}</span>
            </p>
          </div>
          <div class="item hover" @click='submitOrder' v-throttle>
            结算
          </div>
        </div>
      </div>
    </div>
    <delete-goods :delete-opt='deleteOpt' @close='closePop' v-if='deleteOpt.visiable' @confirm='deleteGood'/>
  </div>
</template>

<script>
import {listSearchMixin} from '../../config/mixin'
import api from '@/api'
import CereHeader from '../../components/canvasShow/cereshop/pc/header'
import DeleteGoods from './deleteGoods.vue'
import {mapGetters, mapMutations} from 'vuex'
import Cookie from 'js-cookie'

export default {
  components: {CereHeader, DeleteGoods},
  mixins: [listSearchMixin],
  data () {
    return {
      deleteOpt: {
        visiable: false
      },
      selectAll: 0,
      playDiscount: false,
      list: [],
      selectedNum: 0,
      // 商品总价
      totalProice: 0,
      noGoods: false
    }
  },
  created () {
    if (!Cookie.get('token')) {
      this.$message.warning('请先登录')
      this.$store.commit('resetVuex')
      this.$router.push({path: '/login'})
    } else {
      this.getTrolleyList()
    }
    // this.initList()
  },
  computed: {
    ...mapGetters([
      'cartNumber'
    ])
  },
  methods: {
    ...mapMutations({
      setShoppingCart: 'SET_SHOPPINGCART',
      setCartNumber: 'SET_CARTNUMBER'
    }),
    // 购物车列表
    async getTrolleyList () {
      const rLoading = this.openLoading()
      const vm = this
      const params = {
        url: api.getTrolleyList,
        method: 'GET'
      }
      vm.sendReq(params, res => {
        const d = res.data.valid
        if (res.data.valid.length) {
          this.noGoods = false
        } else {
          this.noGoods = true
        }
        this.setShoppingCart(d)
        if (d.length) {
          let cartList = d.map((item) => {
            item.checked = 0
            return item
          })
          this.list = cartList
          this.getTotalPrice() // 计算总价
        }
        this.setCartNumber(d.length)
        rLoading.close()
      })
    },
    // 选择商品
    selectProduct (index) {
      this.getTotalPrice()
    },
    // 全选
    getAllProduct () {
      const checked = this.selectAll
      const list = this.list
      list.forEach((item) => {
        item.checked = checked
      })
      this.getTotalPrice()
    },
    // 计算商品总价
    getTotalPrice () {
      let list = this.list
      let total = 0
      let checked = 1
      let selectedNum = 0
      list.forEach((item) => {
        if (item.checked === 1) {
          selectedNum += 1
          total += item.productInfo.attrInfo.price * item.cartNum
        } else {
          checked = 0
        }
      })
      this.selectedNum = selectedNum
      this.selectAll = checked
      this.totalProice = Number(total.toFixed(2))
    },
    // 确认是否删除商品
    confirDelete (info, flag) {
      if (flag && !info.length) return this.$message.warning('请选中需要删除的商品')
      this.deleteOpt = {
        visiable: true,
        info,
        all: flag
      }
    },
    // 删除商品
    deleteGood (data) {
      let ids = []
      if (data.all) {
        let list = this.list
        list.forEach((item) => {
          if (item.checked === 1) {
            ids.push(item.id)
          }
        })
        if (ids.length === 0) {
          this.$message('请至少选择一件商品！')
          return
        }
      } else {
        ids.push(data.info)
      }
      let params
      params = {
        url: api.deleteGoods,
        method: 'POST',
        data: {
          ids: ids
        }
      }
      this.sendReq(params, res => {
        if (res.status === 200) {
          this.getTrolleyList()
          this.$message.success('删除成功')
        } else {
          return this.$message.warning(res.msg)
        }
      })
      this.closePop()
    },
    // 修改购物车商品数量
    handleChange (item) {
      const params = {
        url: api.updateGoodNum,
        method: 'POST',
        data: {
          id: item.id,
          number: item.cartNum
        }
      }
      this.sendReq(params, res => {
        if (res.status === 200) {
          this.$message.success('修改成功')
          this.getTrolleyList()
        } else {
          return this.$message.warning(res.msg)
        }
      })
    },
    // 结算
    submitOrder () {
      let list = this.list
      let cartIds = []
      list.forEach((item) => {
        if (item.checked === 1) {
          cartIds.push(item.id)
        }
      })
      if (cartIds.length === 0) {
        return this.$message.warning('请至少选中一件商品')
      }
      cartIds = cartIds.join(',')
      return this.$router.push({
        name: 'placeOrder',
        query: {
          cartId: cartIds
        }
      })
    },
    closePop () {
      this.deleteOpt = {
        visiable: false
      }
    },
    // 跳转到商品详情
    goToProductDetail (id) {
      let data = {
        productId: id
      }
      this.$router.push({
        path: '/productDetail',
        query: {
          proData: JSON.stringify(data)
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.shopping-trolley {
  width: 80%;
  margin: 20px auto;

  .hover:hover {
    cursor: pointer;
  }

  .trolley-list {
    .total-pro {
      font-size: 20px;
      font-weight: bold;
      color: #FF7800;
      margin-bottom: 20px;
    }

    .trolley-title {
      display: flex;
      background-color: #F1F2F7;
      height: 54px;
      line-height: 54px;
      padding: 0 0px;

      p {
        margin: 0;
        color: #333;
        font-size: 16px;
        flex: 1;
        text-align: center;

        &:nth-child(2) {
          flex: 3;
          text-align: left;

          b {
            font-weight: normal;
            padding-left: 60px;
          }
        }

        &:nth-child(3) {
          flex: 1;
          text-align: left;
        }
      }

      > > > .el-checkbox {
        margin-right: 5px;
      }
    }

    .trolley-body {
      .main-list {
        .main-shop {
          color: #333;
          font-size: 16px;
          margin: 20px 0 32px;
          padding-left: 30px;

          .goToStore {
            cursor: pointer;
          }

          .discount {
            color: #FF7800;
            font-size: 14px;
            padding: 8px 9px;
            display: inline-block;
            border: 1px #FF7800 dashed;
            margin-left: 20px;
            position: relative;

            &:hover {
              cursor: pointer;
            }

            .pop-box {
              position: absolute;
              left: 0;
              top: 25px;
              z-index: 2;
              padding-top: 30px;

              .box-content {
                background: #fff;
                padding: 20px;
                border-radius: 4px;
                border: .5px #FF7800 solid;
                min-height: 200px;
                min-width: 500px;
                position: relative;

                &::before {
                  position: absolute;
                  content: '';
                  width: 0;
                  height: 0;
                  border-bottom: 12px solid #FF7800;
                  border-left: 8px solid transparent;
                  border-right: 8px solid transparent;
                  top: -13px;
                  left: 25px;
                }

                &::after {
                  position: absolute;
                  content: '';
                  width: 0;
                  height: 0;
                  border-bottom: 11px solid #fff;
                  border-left: 7px solid transparent;
                  border-right: 7px solid transparent;
                  top: -10px;
                  left: 25.5px;
                }

                .title {
                  font-size: 14px;
                  color: #333;
                }

                ul {
                  li {
                    height: 40px;
                    line-height: 40px;
                    margin-top: 20px;
                    // overflow: hidden;
                    p {
                      float: left;

                      &:nth-child(1) {
                        width: 80px;
                        height: 40px;
                        text-align: center;
                        border: 1px solid #FD5B5B;
                        border-radius: 4px;
                        color: #FD5B5B;
                        font-size: 16px;
                        font-weight: bold;
                        box-sizing: border-box;
                      }

                      &:nth-child(2) {
                        span {
                          display: block;
                          line-height: 20px;
                          color: #666;
                          font-size: 14px;
                        }
                      }

                      &:nth-child(3) {
                        width: 80px;
                        height: 40px;
                        text-align: center;
                        color: #fff;
                        font-size: 16px;
                        font-weight: bold;
                        background: #FD5B5B;
                        border-radius: 4px;
                      }

                      &:nth-child(n+2) {
                        margin-left: 20px;
                      }
                    }
                  }
                }
              }
            }
          }
        }

        .pro-list {
          border: 1px solid #E5E5E5;

          .pro-item {
            display: flex;
            padding: 36px 0;

            &:nth-child(n+2) {
              border-top: 1px solid #E5E5E5;
            }

            .item {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              p {
                text-align: center;
              }

              &:nth-child(1) {
                display: flex;
                align-items: center;
                justify-content: center;
              }

              &:nth-child(2) {
                p {
                  text-align: left;
                  cursor: pointer;
                }

                flex: 4;

                img, .pro-des {
                  float: left;
                }

                img {
                  width: 100px;
                  height: 100px;
                  box-sizing: border-box;
                  cursor: pointer;
                }

                .pro-des {
                  width: calc(100% - 100px);
                  box-sizing: border-box;
                  padding-left: 20px;
                  height: 100%;
                  position: relative;
                  div {
                    p {
                      float: left;
                      overflow: hidden;
                      margin-top: 9%;
                      &:nth-child(1) {
                        width: 65%;
                        color: #333;
                        font-size: 16px;
                        padding-right: 30px;
                        box-sizing: border-box;
                      }

                      &:nth-child(2) {
                        width: 35%;

                        span {
                          display: block;
                          font-size: 16px;
                          color: #999;
                        }
                      }
                    }
                  }

                  p.discounts {
                    position: absolute;
                    bottom: 0;
                    left: 20px;
                    clear: both;
                    background: #FFF2ED;
                    font-size: 14px;
                    color: #FF7800;
                    border-radius: 2px;
                    padding: 4px 7px;
                    display: inline-block;
                  }
                }
              }

              &:nth-child(5) {
                color: #FF7800;
                font-weight: bold;
              }

              &:last-child {
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }

      .noproduct {
        width: 100%;
        text-align: center;
        padding: 200px 0;
      }
    }

    .trolley-footer {
      margin: 60px 0 100px;
      background-color: #F1F2F7;
      height: 80px;
      display: flex;
      font-size: 16px;
      align-items: center;
      color: #333;

      .item {
        flex: 1;

        .clearBtn {
          cursor: pointer;
        }

        &:nth-child(1) {
          padding-left: 40px;
        }

        &:nth-child(4) {
          span {
            color: #FF7800;
            font-size: 20px;
          }
        }

        &:nth-child(4) {
          flex: 3;
          padding-right: 15px;

          p {
            text-align: right;
            line-height: normal;

            span {
              color: #FF7800;
              font-size: 20px;
            }
          }
        }

        &:nth-child(n-2) {
          line-height: 40px;
        }

        &:last-child {
          width: 100px;
          text-align: center;
          font-size: 20px;
          color: #fff;
          background-color: #FF7800;
          line-height: 80px;
        }

        > > > .el-checkbox {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
