<template>
  <div class="home-tab-control">
    <div
      v-for="(item,index) in titles"
      class="tab-control-item"
      :class="{'active':index == currentIndex}"
      @click="tabClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        titles: [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>

<style>
.home-tab-control {
  display: flex;
  width: 100%;
  justify-content: space-around;
  height: 40px;
  align-items: center;
  /* position: sticky;
  top: 44px; */
  background-color: var(--color-background);
}
.home-tab-control .tab-control-item {
  border-bottom: 2px solid #ffffff;
  padding-bottom: 2px;
  font-size: 14px;
}
.home-tab-control .active {
  color: var(--color-tint);
  border-bottom: 2px solid var(--color-tint);
}
</style>