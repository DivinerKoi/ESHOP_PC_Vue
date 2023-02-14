<template>
  <div class="category-list warp" :class="'terminal' + terminal">
    <h2 class="hom-title" :style="{textAlign:componentContent.textAlign}">{{componentContent.title}}</h2>
    <div class="content-warp">
      <ul class="clearfix" :class="{number5: componentContent.categoryData.length === 5}">
        <li v-for="(item) of componentContent.categoryData" :key="item.id">
            <a class="item a-link" @click="jumpCategory(item)">
            <div class="imgBox">
               <img ref="getHeight" :src="item.img" v-show="item.img" :alt="item.name">
            </div>
            </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'categoryList',
    props: {
      terminal: {
        type: Number,
        default: 4
      },
      componentContent: {
        type: Object
      }
    }
  }
</script>
<style lang="scss" scoped>
  .category-list{
    padding: 20px 0;
    .hom-title{
      font-size: 22px;
      color: #333;
      line-height: 1em;
      margin-bottom: 23px;
      font-weight: bold;
      text-align: center;
    }
    .content-warp{
      display: flex;
      ul{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li{
          flex: 1;
          padding: 10px 0 0 10px;
          .item{
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .imgBox {
              padding-bottom: 80%;
              background-color: #cacaca;
              position: relative;
            }
            img {
              max-width: 100%;
              height: 100%;
              max-height: 100%;
              position: absolute;
              margin: auto;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
            }
          }
        }
      }
      .number5 {
        display: block;
        li {
          width: 25%;
          float: left;
        }
        li:nth-child(1) {
          width: 50%;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .category-list .content-warp ul li{
      flex: 0 0 50%;
      width: 0;
    }
  }
  .terminal1,.terminal2,.terminal3{
    &.category-list .content-warp ul{
      margin: -15px 0 0 -15px;
      li{
        flex: 0 0 50%;
        width: 0;
        &:nth-child(1){
          width: 0;
        }
      }
    }
  }
</style>
