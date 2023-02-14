export default (BSEURL) => {
    return {
        // 添加购物车
        addGoods: `${BSEURL}/cart/addCart`,
        // 购物车查询
        getTrolleyList: `${BSEURL}/cart/list`,
        // 选中商品
        selectGood: `${BSEURL}/cart/selected`,
        //  删除购物车商品
        deleteGoods: `${BSEURL}/cart/del`,
        // 清空购物车
        clearTrolley: `${BSEURL}/cart/deleteAll`,
        // 修改购物车商品数量
        updateGoodNum: `${BSEURL}/cart/num`
    }
}
