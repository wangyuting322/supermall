<template>
  <div class="cart-list">
    <scroll ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :product="item" :key="index"></cart-list-item>
      
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh();
    // console.log("ffff");
  }
};
</script>