<template>
  <div class="classification"  v-show="componentContent.categoryShow">
    <ul>
      <li v-for="(item,index) in componentContent.category" :key="index">
        <div class="item">{{item.categoryName}}<i class="icon el-icon-arrow-right"></i></div>
        <div class="hoverBox">
          <dl v-for="(subItem) in item.childs" :key="subItem.id">
            <dt>{{subItem.categoryName}}</dt>
            <dd>
              <a class="a-link" v-for="(threeItem) in subItem.childs" :key="threeItem.id" @click="jumpCategory(threeItem)">
                {{threeItem.categoryName}}
              </a>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {funMixin} from '../../config/mixin'
  export default {
    name: 'cereClassification',
    mixins: [funMixin],
    props: {
      componentContent: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
  .classification{
    width: 238px;
    height: 470px;
    padding: 25px 0;
    background-color: #2D2D31;
    color: #fff;
    margin-right: 10px;
    position: relative;
    ul{
      li{
        height: 42px;
        line-height: 42px;
        .item{
          cursor: pointer;
          padding:0 20px 0 30px;
        }
        .icon{
          float: right;
          line-height: 42px;
        }
        .hoverBox{
          position: absolute;
          width: 500px;
          padding:10px 25px;
          height: 100%;
          left: 100%;
          top: 0;
          z-index: 3;
          display: none;
          background-color: #fff;
          color: #333;
          border: 2px solid $mainColor;
          dl{
            margin-bottom: 5px;
            dt{
              height: 34px;
              line-height: 34px;
              font-size: 16px;
              color: #333;
              font-weight: bold;
            }
            dd{
              line-height: 26px;
              margin-left: 0;
              a{
                margin-right: 12px;
                &:hover{
                  color: $mainColor;
                }
              }
            }
          }
        }
        &:hover{
          color: $mainColor;
          .hoverBox{
            display: block;
          }
        }
      }
    }
  }
</style>
