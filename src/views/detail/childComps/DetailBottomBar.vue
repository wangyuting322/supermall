<template>
  <div class="detail-bottom-bar">
    <div class="bar-item left-bar">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item right-bar">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  props: {},
  methods: {
    addToCart() {
      this.$emit("addToCart");
    }
  }
};
</script>

<style>
.detail-bottom-bar {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: white;
  height: 49px;
  z-index: 9;
  display: flex;
}
.detail-bottom-bar .bar-item {
  line-height: 49px;
}
.left-bar .icon {
  display: block;
  width: 20px;
  height: 20px;
  margin: 5px auto 0px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}
.bar-item {
  flex-grow: 1;
  display: flex;
}
.bar-item > div {
  flex-grow: 1;
  text-align: center;
}
.left-bar .text {
  font-size: 12px;
  position: relative;
  bottom: 13px;
}
.left-bar .service {
  background-position: 0 -48px;
}
.left-bar .shop {
  background-position: 0 -89px;
}
.left-bar .select {
  background-position: 0 -135px;
}
.right-bar {
  font-size: 15px;
  text-align: center;
  line-height: 58px;
}
.right-bar .cart {
  background-color: #ffe817;
  color: rgba(100, 100, 100, 1);
}
.right-bar .buy {
  background-color: palevioletred;
  color: white;
}
</style>