<template>
  <div class="cart-bottom-bar">
    <div class="all-check-button">
      <check-button :isChecked="isCheckedAll" @click.native="isCheckedAllChange"></check-button>
      <div class="all-check-text">全选</div>
    </div>
    <div class="totalPrice">合计：￥{{totalPrice}}</div>
    <div class="checkLength">已选择商品数： {{checkLength}}</div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => {
          return item.isChecked == true;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0);
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        return item.isChecked == true;
      }).length;
    },
    isCheckedAll() {
      if (this.$store.state.cartList.length == 0) {
        return false;
      }
      // 1.filter（性能会低一点，会遍历全部）
      // return this.$store.state.cartList.filter(item=>{
      //   return !item.isChecked
      // }).length ==0
      // 2.find（性能会高一点，找到没勾选的就true）
      return !this.$store.state.cartList.find(item => {
        return !item.isChecked;
      });
      // 3.已勾选的和全部的数量是否一致
      // return this.$store.state.cartList.filter(item=>{
      //   return item.isChecked
      // }).length ==this.$store.state.cartList.length
    }
  },
  methods:{
    isCheckedAllChange() {
      if (this.isCheckedAll) {
        //如果是全选，则改为全不选
         this.$store.commit("allNotCheck");
      } else {
        //部分选中或全不选，则改为全选      
        this.$store.commit("allCheck");
          }
    }
  }
};
</script>

<style>
.cart-bottom-bar {
  width: 100%;
  height: 40px;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  position: fixed;
  bottom: 50px;
  display: flex;
  font-size: 15px;
  align-items: center;
  justify-content: space-around;
}
.cart-bottom-bar .all-check-button {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-right: 15px;
}
.all-check-text,
.checkLength,
.totalPrice {
  height: 40px;
  line-height: 40px;
}
.checkLength,
.totalPrice,
.all-check-button {
  flex-grow: 1;
  text-align: center;
}
.checkLength {
  background-color: var(--color-tint);
}
</style>
