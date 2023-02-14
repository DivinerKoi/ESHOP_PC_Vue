<template>
    <div class='pop-ceil'>
        <div class='pop-box'>
            <header>
                <span @click="close" class='close-btn'> X</span>
            </header>
            <div class='pop-content'>
                <p><span/> 确定要删除此商品吗?</p>
                <p>删除后购物车将不存在该商品，确定要删除吗？</p>
            </div>
            <div class='pop-btns'>
                <p @click='confirm' v-throttle>确定</p>
                <p @click="close">取消</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        deleteOpt: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {

        }
    },
    created () {
        this.forbidScroll()
    },
    methods: {
        forbidScroll () {
            const body = document.querySelector('body')
            body.style.overflow = 'hidden'
        },
        close () {
            this.$emit('close')
        },
        confirm () {
            this.$emit('confirm', this.deleteOpt)
        },
        scrollBar () {
            const body = document.querySelector('body')
            body.style.overflow = 'auto'
        }
    },
    beforeDestroy () {
        this.scrollBar()
    }
}
</script>

<style lang='scss' scoped>
.pop-ceil {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.5);
    z-index: 9999;
    .pop-box {
        width: 600px;
        height: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -300px;
        margin-top: -150px;
        background: #fff;
        border-radius: 2px;
        color: #333;
        .close-btn {
            position: absolute;
            display: inline-block;
            right: 10px;
            top:10px;
            &:hover {
                cursor: pointer;
            }
        }
        .pop-content {
            p {
                text-align: center;
                &:nth-child(1) {
                    font-size: 22px;
                    line-height: 30px;
                    margin-top: 20px;
                }
                &:nth-child(1) {
                    font-size: 18px;
                    line-height: 100px;
                }
            }

        }
        .pop-btns {
            overflow: hidden;
            width: 360px;
            margin: 40px auto 0;
            p {
                width: 160px;
                text-align: center;
                height: 48px;
                line-height: 48px;
                border-radius: 2px;
                box-sizing: border-box;
                float: left;
                &:nth-child(1) {
                    background: #FF7800;
                    margin-right: 20px;
                    color: #fff;
                }
                &:nth-child(2) {
                    border: 1px solid #FF7800;
                    color: #FF7800;
                }
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
