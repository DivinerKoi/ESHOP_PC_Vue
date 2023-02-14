<template>
  <div class="category">
    <div class='banxin'>
      <div class='head'>
        <div class='all'>全部结果</div>
        <div class='arrow'></div>
        <div class='keyword'>{{classifyName}}</div>
        <div class='arrow'></div>
      </div>
      <div class="content">
        <div class='sort'>
          <div>排序：</div>
          <div class='default' :class="index=='1'?'active':''" @click="defaultSort()">默认</div>
          <div class='price' :class="index=='2'?'active':''" @click="priceSort()">
              价格
              <div class='arr'>
                <div class='up' :class="priceOrder=='asc'?'low':''"></div>
                <div class='down' :class="priceOrder=='desc'?'high':''"></div>
              </div>
          </div>
        </div>
        <div class="proList" v-loading="loading">
            <div v-if="noProduct==false">
              <h3 style="margin-bottom:80px;margin-top:50px;">{{classifyName}}</h3>
              <ProductList :productList='productList'></ProductList>
            </div>
            <div v-else class="noproduct">
              <img src="../../../static/image/noorder@2x.png" alt="">
              <p class="fs20 font-color-999">该分类没有商品～</p>
            </div>
        </div>
        <el-pagination v-if="noProduct==false" :current-page="page" :page-size="12" @current-change="handleCurrentChange" background layout='prev, pager, next' :total='total'></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../api'
import {listSearchMixin} from '../../config/mixin'
import ProductList from '../../components/base/productList'
export default {
  mixins: [listSearchMixin],
  components: {
    ProductList
  },
  data () {
    return {
      page: 1,
      index: '1',
      priceOrder: '',
      total: 0,
      classifyId: 0,
      classifyName: '',
      noProduct: false,
      productList: [],
      loading: false
    }
  },
  mounted () {
    var classifyData = JSON.parse(this.$route.query.classifyData)
    this.classifyName = classifyData.cateName
    this.classifyId = classifyData.id
    this.getClaasifyProducts()
  },
  methods: {
    // 获取分类商品
    getClaasifyProducts () {
      let self = this
      self.loading = true
      let params = {
          url: api.getProducts,
          method: 'GET',
          payload: {
            sid: self.classifyId,
            priceOrder: self.priceOrder,
            page: self.page,
            limit: '12'
          }
        }
        self.sendReq(params, (res) => {
          if (res.status === 200) {
            self.productList = res.data.content
            self.total = res.data.totalElements
            if (res.data.content.length < 1) {
              self.noProduct = true
            } else {
              self.noProduct = false
            }
            self.loading = false
          } else {
              self.$message({
                message: res.msg,
                type: 'warning'
              })
            }
        })
    },
    // 分页器跳转
    handleCurrentChange (val) {
      this.page = val
      this.getClaasifyProducts()
    },
    // 默认排序
    defaultSort () {
      this.priceOrder = ''
      this.index = '1'
      this.page = 1
      this.getClaasifyProducts()
    },
    // 价格排序
    priceSort () {
      if (this.priceOrder !== 'desc') {
        this.priceOrder = 'desc'
      } else {
        this.priceOrder = 'asc'
      }
      this.page = 1
      this.index = '2'
      this.getClaasifyProducts()
    }
  }
}
</script>
<style lang = "scss" scoped>
.category{
    width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  padding-bottom: 143px;
  text-align: center;
  .banxin {
    width: 1252px;
    height: 100%;
    margin: 0 auto;
    .head {
      width: 100%;
      height: 64px;
      line-height: 64px;
      font-size: 16px;
      display: flex;
      align-items: center;
      .all {
        margin-right: 20px;
      }
      .keyword {
        margin: 0 20px;
        color: #ff7800;
      }
      .arrow {
        background-image: url('../../../static/image/xiangyou@2x.png');
        width: 5px;
        height: 10px;
      }
    }
    .banner{
        width: 100%;
        height: 356px;
        margin-bottom: 25px;
    }
    .content{
        background-color: #FFFFFF;
        width: 100%;
        padding: 0 45px 30px;
        box-sizing: border-box;
        .sort {
        width: 100%;
        height: 63px;
        line-height: 27px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f1f1f1;
        color: #666666;
        .default {
          margin-left: 20px;
          cursor: pointer;
        }
        .sales {
          cursor: pointer;
          img{
            width: 9px;
            height: 16px;
            vertical-align: middle;
          }
        }
        .price {
          display: flex;
          margin: 0 20px;
          cursor: pointer;
          .arr {
            vertical-align: middle;
            width: 12px;
            margin-left: 3px;
            .up {
              width: 0;
              height: 0;
              border: 6px solid transparent;
              border-bottom-color: #999999;
            }
            .down {
              width: 0;
              height: 0;
              border: 6px solid transparent;
              border-top-color: #999999;
              margin-top: 3px;
            }
          }
        }
        .active{
            color: #FF7800;
            .arr{
              .high{
                border-top-color: #FF7800;
              }
              .low{
                border-bottom-color: #FF7800;
              }
            }
          }
       }
       h3{
           font-size: 24px;
           font-weight: bold;
           margin-bottom: 30px;
       }
       .noproduct{
          width: 100%;
          text-align: center;
          padding: 200px 0;
       }
      >>>.el-pagination{
        text-align: right;
        .el-pager{
          li:not(.disabled):hover{
            color: #FF7800;
          }
          li:not(.disabled).active{
            background-color: #FF7800;
          }
          li:not(.disabled).active:hover{
            color: #F4F4F5;
          }
        }
      }
    }
  }
  .proList{
    min-height: 500px;
  }
}
</style>
