<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" @click="back">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="center">
        <div
          :class="{'active':currentIndex==index}"
          v-for="(item,index) in titles"
          @click="tagClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
 
 
  methods: {
    tagClick(index) {
      this.currentIndex = index;
      // console.log(index);
      this.$emit("tagClick", index);
    },
    back() {
      // this.$router.back();
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.detail-nav-bar img {
  vertical-align: middle;
}
.center {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
}
.center div {
  flex: 1;
}
.center .active {
  color: var(--color-tint);
}
</style>