<template>
  <div class="demo">hello!<i class="iconfont icon-xuanzhongjiaobiao"></i></div>
</template>

<script>
  import api from '../../api'
  import {listSearchMixin} from '../../config/mixin'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'index',
    mixins: [listSearchMixin],
    components: {},
    data () {
      return {
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      ...mapMutations({
        setMseId: 'SET_MSEID'
      }),
      // 获取左侧告警
      getData () {
        let params = {
          url: api.login,
          method: 'POST',
          data: {
            username: 'username',
            password: 'password',
            code: 'code'
          }
        }
        this.sendReq(params, (res) => {
          if (res.code === 0) {
          }
        })
      }
    },
    beforeDestroy () {

    },
    computed: {
      ...mapGetters([
        'mseId'
      ])
    },
    watch: {
      mseId: function (newVal) {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
