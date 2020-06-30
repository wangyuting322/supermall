<template>
  <div class="home-swiper">
    <el-carousel height="150px" arrow="always">
      <el-carousel-item  v-for="(item,index) in banners" :key="index">
       <a :href="item.link">
        <img :src="item.image" @load="imageLoad" />
      </a>
      </el-carousel-item>
    </el-carousel>
  </div>

</template>

<script>

export default {
  name: "HomeSwiper",
  data() {
      return {
        isLoad: false
      }
    },
  props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
 methods: {
      imageLoad() {
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
};
</script>
<style scoped>
img{
  width: 100%;
}
</style>