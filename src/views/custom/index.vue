<template>
  <canvas-page :terminal="4" :typeId="2"></canvas-page>
</template>

<script>
import CanvasPage from '../../components/canvasShow/canvasShowPage'
export default {
  name: 'custom',
  components: { CanvasPage },
  data () {
    return {
      canvasData: []
    }
  },
  mounted () {
    this.shopId = this.$route.query.shopId
  }
}
</script>
