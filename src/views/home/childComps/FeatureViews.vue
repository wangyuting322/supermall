<template>
  <diV class="home-feature">
    <a>
    <img src="~assets/img/home/recommend_bg.jpg" alt="" @load="imageLoad">
    </a>
  </diV>
</template>

<script>
export default{
  name:'FeatureViews',
  methods: {
    imageLoad() {     
        this.$emit("imageLoad");               
    }
  }
}
</script>

<style>
.home-feature{
  width: 100%;
}
.home-feature img{
  width: 100%;
}
</style>