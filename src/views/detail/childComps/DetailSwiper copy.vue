<template>
  <div class="detail-swiper">
    <el-carousel height="300px" arrow="always">
      <el-carousel-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>
