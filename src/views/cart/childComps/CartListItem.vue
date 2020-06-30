<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <Check-button :is-checked="product.isChecked" @click.native="isCheckedChange(product.iid)"></Check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt />
    </div>

    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">{{"￥ "+product.price}}</div>
        <div class="item-count right">{{'X'+product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    isCheckedChange(id) {

      // this.product.isChecked = !this.product.isChecked
      // console.log("sss");
      this.$store.commit("isCheckedChange",id);
    }
  }
};
</script>

<style>
.cart-list-item {
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.info-bottom {
  position: absolute;
  bottom: 5px;
  left: 10px;
  right: 10px;
  color: orangered;
}
.info-bottom .item-count {
  color: black;
}
</style>