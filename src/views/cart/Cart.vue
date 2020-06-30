<template>
 <div class="cart">
   <nav-bar class="cart-nav-bar">
      <div slot="left"></div>
      <!-- <div slot="center">购物车({{cartLength}})</div> -->
      <div slot="center">购物车({{cartNumber}})</div>
      <div slot="right"></div>
    </nav-bar>
<cart-list>
  
</cart-list>
 <cart-bottom-bar>

 </cart-bottom-bar>
 </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
// import Scroll from "components/common/scroll/Scroll";

import { mapGetters} from "vuex";


  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      // cartLength(){
      //   return this.$store.getters.cartLength
      // }
      // ...mapGetters(['cartLength'])
      ...mapGetters({
        cartNumber:'cartLength'
      })
    }
  }
</script>

<style scoped>
.cart-nav-bar {
  background-color: var(--color-tint);
  color: rgb(255, 255, 255);
  /* 现在滚动scroll，不滚动原生页面，不用fixed */
  /* width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9; */
}
</style>
