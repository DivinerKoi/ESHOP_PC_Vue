<template>
  <div
    v-loading.fullscreen.lock="canvasLoading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 1)"
  >
  </div>
</template>

<script>
	import store from '../config/mixin/store'
	export default {
		name: 'loading-toast',
		data() {
			return {
				canvasLoading: true
			}
		},
		computed: {
			loadNum() {
				return store.state.loadNum
			}
		},
		watch: {
			loadNum(newVal, oldVal) {
				if (newVal === 0) {
					this.canvasLoading = false
				}
			}
		},
		methods: {
			setCanvasLoading(status) {
				this.canvasLoading = status
			}
		}
	}
</script>

<style lang="scss" scoped>
	.loading-box{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #fff;
		top: 0;
		left: 0;
		z-index: 99;
	}
</style>
