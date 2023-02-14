<template>
  <div>
    <cere-header :componentContent="componentContent"></cere-header>
    <div class="flex-box hom-content-top pc-warp">
      <cere-classification :componentContent="componentContent"></cere-classification>
      <cere-banner :componentContent="componentContent"></cere-banner>
    </div>
  </div>
</template>

<script>
  import CereClassification from './classification'
  import CereBanner from './banner'
  import CereHeader from './header'
  export default {
    name: 'shopHeader',
    components: { CereHeader, CereBanner, CereClassification },
    props: {
      componentContent: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hom-content-top{
    padding-bottom: 20px;
  }
  .pc-warp{
    width: 1250px;
    margin: 0 auto;
    max-width: 96%;
  }
</style>
