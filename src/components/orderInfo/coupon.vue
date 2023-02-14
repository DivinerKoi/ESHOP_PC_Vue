<template>
  <div class="couponList">
    <div class="couponItem active">
      <div class="couponItemTop">
        <img src="../../assets/images/indexLogo.png" alt="">
        <span><i>￥</i>88</span>
        <span>使用条件：满20.00</span>
        <span>有效期：2020.12.30-2021.12.30</span>
        <div class="couponType">平台卷</div>
      </div>
      <div class="couponItemBot">
        限店铺使用
        <span class="iconfont">&#xe612;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'coupon'
}
</script>

<style lang="scss" scoped>
 .couponList {
   margin-bottom: 30px;
   padding: 20px;
   .couponItem {
     width: 230px;
     border: 1px solid #EEEEEE;
     border-radius: 18px;
     overflow: hidden;
     .couponItemTop {
       background: #fd5b5b;
       color: #ffffff;
       padding: 20px;
       box-sizing: border-box;
       position: relative;
       img {
         opacity: 0.2;
         position: absolute;
         top: 40%;
       }
       .couponType {
         position: absolute;
         top: 1px;
         right: -33px;
         width: 100px;
         transform: rotate(45deg);
         background: #FFFFFF;
         color: #fd5b5b;
         text-align: center;
         height: 40px;
         line-height: 50px;
       }
       span {
         font-size: 12px;
         display: block;
         margin-bottom: 18px;
         cursor: pointer;
         i {
           margin-right: 5px;
           font-style: normal;
           font-size: 14px;
         }
       }
       span:nth-child(1) {
         font-size: 28px;
       }
       span:nth-child(4) {
         margin-bottom: 0;
       }
     }
     .couponItemBot {
       height: 40px;
       line-height: 40px;
       color: #fd5b5b;
       position: relative;
       text-align: center;
       background: #f3f3f3;
       span {
         position: absolute;
         right: 0;
         bottom: 0px;
         font-size: 40px;
         color: $mainColor;
       }
     }
   }
   .active {
     border: 1px solid $mainColor;
   }
 }
</style>
