<template>
  <div class="goods-list-item" @click="itemClick">
    <!-- <img :src="showImages" @load="imgLoad" /> -->
    <img v-lazy="showImages" @load="imgLoad" />
    <div class="goods-list-info">
      <p>{{goodslistitem.title}}</p>
      <span class="price">{{goodslistitem.price}}</span>
      <span class="collect">{{goodslistitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodslistitem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed:{
showImages(){
  // return this.goodslistitem.show.img||this.goodslistitem.image ;
  return this.goodslistitem.image||this.goodslistitem.show.img ;
}
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("imgLoad");
    },
    itemClick() {

      // query方式：
      this.$router.push({
        path: "/detail",
        query: {
          itemid: this.goodslistitem.iid
        }
      });

      // params方式
      // this.$router.push('/detail/' + this.goodslistitem.iid)
     
  }
}
}
</script>

<style scoped>
.goods-list-item {
  width: 48%;
  font-size: 14px;
  text-align: center;
  padding-bottom: 5px;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-list-info p {
  overflow: hidden;
  /* 规定段落中的文本不进行换行 */
  white-space: nowrap;
  /* 以省略号展现超出部分 */
  text-overflow: ellipsis;
}

.goods-list-info .price {
  color: var(--color-high-text);
  margin-right: 10px;
}
.goods-list-info .collect::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>