<template>
  <div class="home-recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("imageLoad");        
        this.isLoad = true;
      }
    }
  }
};
</script>

<style>
.home-recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 10px 0px 20px 0px;
  border-bottom: 10px solid rgba(100, 100, 100, 0.1);
}
.recommend-item {
  flex: 1 0;
  width: 25%;
  font-size: 14px;
}
.recommend-item img {
  width: 85%;
}
</style>