<template>
  <div class="evaluate">
    <div class="banxin">
      <div class='head'>
        <router-link to="/myOrder">
          <div class='all'>我的订单</div>
        </router-link>
        <div class='arrow'></div>
        <div class='keyword'>评价</div>
      </div>
      <div class="content">
        <div class="top" v-for="(item, index) of product.cartInfo" :key="index" v-show="item.isReply !== 1">
          <div class="left">
            <div class="box">
              <img :src="$api.BASEURL + item.productInfo.image" alt="">
              <p class="name">{{item.productInfo.productName}}</p>
              <div class="price">
                <span class="currency">¥</span>
                <span class="money">{{item.productInfo.price}}</span>
              </div>
              <p class="size"><span>{{item.productInfo.attrInfo.sku}}</span></p>
            </div>
          </div>
          <div class="right">
            <div class="title">填写商品评价：</div>
            <el-form ref="form" label-width="80px">
              <el-form-item label="商品评分" style="display:flex;align-items: center;">
                <el-rate style="margin-left:110px;" :colors=colors v-model="item.productScore" @change="changeScore"></el-rate>
              </el-form-item>
              <el-form-item label="服务评分" style="display:flex;align-items: center;">
                <el-rate style="margin-left:110px;" :colors=colors v-model="item.serviceScore" @change="changeScore"></el-rate>
              </el-form-item>
              <el-form-item label="评价晒单">
                <el-input
                  type="textarea"
                  placeholder="请输入您的评语"
                  v-model="item.text"
                  rows=5
                  resize=none
                  @input="changeScore"
                ></el-input>
                <br>
                <el-upload
                  :action="action"
                  list-type="picture-card"
                  :limit="5"
                  :on-success="(res,file)=>{return handSuccess(res, file, index)}"
                  :on-remove="(file, fileList)=>{return handleRemove(file, fileList, index)}">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <div class="imgNum">
                  共<span class="text">{{item.imgNum}}</span>张，还可以上传<span class="text">{{5-(item.imgNum)}}</span>张
                </div>
              </el-form-item>
            </el-form>
            <div class="bottom">
              <el-button plain @click="addComment(item)" v-throttle>提交评价</el-button>
            </div>
          </div>

        </div>
      </div>
      <el-dialog
        :visible.sync="centerDialogVisible"
        width="30%"
        :show-close="false"
        center>
        <div>
          <img src="../../../static/image/wancheng@2x.png" alt="">
          <p>您的评价已成功提交</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button class="back" @click="$router.push('/')">返回首页</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import api from '../../api'
import {listSearchMixin} from '../../config/mixin'
export default {
  mixins: [listSearchMixin],
  data () {
    return {
      text: '',
      product: {},
      colors: [
        '#FF7800',
        '#FF7800',
        '#FF7800'
      ],
      urls: [],
      dialogVisible: false,
      disabled: false,
      centerDialogVisible: false,
      action: api.upload
    }
  },
  created () {
    this.product = JSON.parse(this.$route.query.product)
    this.product.cartInfo.map(item => {
      this.$set(item, 'imgNum', 0)
    })
    this.product.cartInfo.map(j => {
      j['text'] = ''
      j['serviceScore'] = 5
      j['productScore'] = 5
      j['urls'] = []
    })
  },
  methods: {
    // 添加评论
    addComment (data) {
      let flag = true
      if (data.text === '' || data.text === undefined) {
        this.$message({
          showClose: true,
          message: '评价内容不能为空',
          type: 'warning'
        })
        flag = false
      }
      if (flag) {
        let params = {
          unique: data.unique,
          productScore: data.productScore,
          serviceScore: data.serviceScore,
          pics: data.urls.join(','),
          comment: data.text
        }
        let params1 = {
          url: api.orderComment,
          method: 'POST',
          data: params
        }
        this.sendReq(params1, (res) => {
          if (res.status === 200) {
            this.centerDialogVisible = true
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'warning'
            })
          }
        })
      }
    },
    // 删除上传的图片
    handleRemove (file, fileList, index) {
      this.product.cartInfo[index].urls = []
      for (var i in fileList) {
        this.product.cartInfo[index].urls.push(fileList[i].response.data[0])
      }
      this.product.cartInfo[index].imgNum = this.product.cartInfo[index].urls.length
    },
    // 上传图片
    handSuccess (res, file, index) {
      this.product.cartInfo[index].urls.push(res.data[0])
        this.product.cartInfo[index].imgNum = this.product.cartInfo[index].urls.length
    },
    changeScore () {
      this.$forceUpdate()
    }
  }
}
</script>
<style lang = "scss" scoped>
.evaluate{
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  padding-bottom: 143px;
  text-align: center;
  .banxin{
    width: 1252px;
    margin: 0 auto;
    height: 100%;
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
    .content{
      width: 100%;
      background-color: #FFFFFF;
      .top{
        width: 100%;
        display: flex;
        border-bottom: 1px solid #E5E5E5;
        .left{
          border-right: 1px solid #EAEAEA;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          .box{
            width: 260px;
            img{
              width: 240px;
              max-height: 300px;
              margin-bottom: 23px;
            }
            .name{
              margin-bottom: 20px;
              font-size: 14px;
            }
            .price{
              margin-bottom: 23px;
              .currency{
                font-size: 12px;
              }
              .money{
                font-size: 18px;
              }
            }
            .size{
              font-size: 12px;
              color: #999999;
              span{
                margin-right: 10px;
              }
              span:last-child{
                margin-right: 0;
              }
            }
          }
        }
        .right{
          flex: 2;
          padding: 36px 36px 0;
          box-sizing: border-box;
          .title{
            width: 100%;
            padding-bottom: 12px;
            text-align: left;
            border-bottom: 1px dashed #EAEAEA;
          }
          >>>.el-form{
              text-align: left;
              padding-top: 20px;
            .el-form-item{
              display: flex;
              .el-form-item__label{
                flex: 1;
                text-align: left;
                color: #999999;
              }
              .el-form-item__content{
                margin-left: 10px !important;
                flex: 6;
                .el-rate{
                  margin-left: 10px;
                  transform: scale(1.4);
                }
                .tag{
                  display: inline-block;
                  width: 100px;
                  box-sizing: border-box;
                  text-align: center;
                  border: 1px solid #EAEAEA;
                  margin: 0 10px 10px 0;
                  cursor: pointer;
                }
                .active{
                  border-color: #FF7800;
                }
                .el-textarea{
                  margin-bottom: 20px;
                }
                p{
                  font-size: 14px;
                }
                img{
                  width: 80px;
                  height: 80px;
                  margin-right: 15px;
                }
                .el-upload--picture-card,.el-upload-list--picture-card{
                  width: 80px;
                  height: 80px;
                  line-height: 80px;
                  .el-upload-list__item-actions,.el-upload-list__item{
                    width: 80px;
                    height: 80px;
                  }
                  i{
                    line-height: 2.1;
                  }
                  .el-icon-delete,.el-icon-zoom-in{
                    font-size: 20px;
                  }
                  .el-icon-upload-success{
                    line-height: 1;
                  }
                }
                .imgNum{
                  display: inline-block;
                  height: 60px;
                  margin-top: 50px;
                  color: #999999;
                  .text{
                    color: #FF7800;
                  }
                }
              }
            }
          }
        }
      }
      .bottom{
        width: 100%;
        padding: 10px 0;
        margin-top: 2px;
        /* border-top: 1px solid #EAEAEA; */
        .el-button{
          width: 25%;
          font-size: 18px;
          background-color: #FF7800;
          padding: 10px 0;
          color: #FFFFFF;
        }
      }
    }
    >>>.el-dialog{
      .el-dialog__body{
        display: flex;
        justify-content: center;
        div{
          text-align: center;
          img{
            width: 80px;
            height: 80px;
            margin-bottom: 40px;
          }
          p{
            font-size: 22px;
          }
        }
      }
      .el-dialog__footer{
        .again{
          background-color: #FF7800;
          border: 1px solid #FF7800;
          color: #FFFFFF;
          border-radius: 0;
        }
        .back{
          color: #FF7800;
          border: 1px solid #FF7800;
          background-color: #FFFFFF;
          box-sizing: border-box;
          border-radius: 0;
        }
      }
    }
  }
}
</style>
