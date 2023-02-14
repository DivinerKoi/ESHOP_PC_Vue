<template>
  <div class="evaluationBox">
    <div class="evaluateType">
      <span :class="{typeActive: currentType === 0}"
            @click="changeEvaType('全部', 0)">全部（{{ evaluateData.sumCount }}）</span>
      <span :class="{typeActive: currentType === 1}"
            @click="changeEvaType('好评', 1)">好评（{{ evaluateData.goodCount }}）</span>
      <span :class="{typeActive: currentType === 2}"
            @click="changeEvaType('中评', 2)">中评（{{ evaluateData.inCount }}）</span>
      <span :class="{typeActive: currentType === 3}"
            @click="changeEvaType('差评', 3)">差评（{{ evaluateData.poorCount }}）</span>
    </div>
    <div class="evaluateList">
      <div class="evaluateItem" v-for="(item,index) of evaluateList" :key="index">
        <div class="leftAvatarBox">
          <img src="../../assets/images/avatar.png" alt="">
          <span>{{ item.nickname }}</span>
        </div>
        <div class="evaluateInfo">
          <p>{{ item.comment }}</p>
          <div class="evaluateImgList">
            <div class="imgItemBox" v-for="(imgItem, index) of item.picturesArr" :key="index">
              <el-image
                style="width: 100px; height: 100px"
                :src="$api.BASEURL+imgItem"
                :preview-src-list="[$api.BASEURL+imgItem]">
              </el-image>
            </div>
          </div>
          <div class="evaluateTime">{{ item.createTime }}</div>
        </div>
      </div>
      <el-pagination
        v-if="evaluateList.length > 0"
        class="evaluationPage"
        background
        layout="prev, pager, next, jumper"
        :page-size="5"
        :current-page="listPage"
        @current-change="handleCurrentChange"
        :total="pageTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '../../api'
import {listSearchMixin} from '../../config/mixin'

export default {
  name: 'evaluation',
  mixins: [listSearchMixin],
  props: {
    evaluateParam: Object
  },
  data () {
    return {
      evaluateTotal: 0,
      evaluateList: [],
      evaluateData: {},
      currentType: 0,
      listPage: 1,
      currentWord: '全部',
      pageTotal: 0
    }
  },
  mounted () {
    this.getEvaluateData()
    this.getEvaluateList()
  },
  methods: {
    // 获取商品评价数据
    getEvaluateData () {
      let self = this
      let params = {
        url: api.getEvaluateData + self.evaluateParam.id,
        method: 'GET'
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.evaluateData = res.data
        } else {
          self.$message.warning(res.msg)
        }
      })
    },
    // 获取商品评价列表
    getEvaluateList () {
      let self = this
      let params = {
        url: api.getEvaluateList + self.evaluateParam.id,
        method: 'GET',
        payload: {
          page: self.listPage,
          limit: 5,
          type: self.currentType
        }
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.evaluateList = res.data
        } else {
          self.$message.warning(res.msg)
        }
      })
    },
    // 切换评价类型
    changeEvaType (item, index) {
      this.listPage = 1
      this.currentType = index
      switch (index) {
        case 0:
          this.pageTotal = this.evaluateData.sumCount
          break
        case 1:
          this.pageTotal = this.evaluateData.goodCount
          break
        case 2:
          this.pageTotal = this.evaluateData.inCount
          break
        case 3:
          this.pageTotal = this.evaluateData.poorCount
          break
      }
      this.getEvaluateList()
    },
    // 翻页
    handleCurrentChange (val) {
      this.listPage = val
      this.getEvaluateList()
    }
  }
}
</script>

<style lang="scss" scoped>
.evaluationBox {
  .evaluateType {
    display: flex;

    span {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      border: 1px solid #999999;
      text-align: center;
      font-size: 14px;
      color: #333333;
      font-weight: 400;
      margin-right: 20px;
      cursor: pointer;
    }

    .typeActive {
      border: 1px solid $mainColor;
      color: $mainColor;
    }
  }

  .evaluateList {
    margin-top: 25px;
    border-top: 1px solid #E5E5E5;
    margin-right: 8px;

    .evaluateItem {
      padding: 20px;
      margin-bottom: 15px;
      display: flex;
      border-bottom: 1px solid #E5E5E5;

      .leftAvatarBox {
        width: 100px;
        float: left;
        text-align: center;
        margin-right: 20px;

        img {
          width: 64px;
          height: 64px;
        }

        span {
          margin-top: 10px;
          color: #333333;
          font-size: 16px;
          display: block;
        }
      }

      .evaluateInfo {
        flex: 1;

        p {
          line-height: 25px;
          font-size: 16px;
          color: #333333;
          margin-bottom: 15px;
        }

        .evaluateTime {
          color: #999999;
          font-size: 16px;
          margin-bottom: 20px;
        }

        .addToEvaInfo {
          padding-top: 20px;
          border-top: 1px solid #E5E5E5;
          display: flex;
          margin-bottom: 15px;

          span {
            color: #999999;
            font-size: 16px;
            line-height: 25px;
          }

          span:nth-child(1) {
            margin-right: 15px;
          }

          span:nth-child(2) {
            flex: 1;
            color: #333333;
          }
        }

        .receiptTime {
          color: #999999;
          font-size: 16px;
        }
      }

      .evaluateImgList {
        display: flex;
        margin-bottom: 20px;

        .imgItemBox {
          width: 100px;
          height: 100px;
          background: #EEEEEE;
          display: flex;
          align-items: center;
          margin-right: 20px;
          overflow: hidden;

          img {
            width: 100%;
          }
        }
      }
    }
  }

  .evaluationPage {
    margin-top: 30px;
  }
}
</style>
