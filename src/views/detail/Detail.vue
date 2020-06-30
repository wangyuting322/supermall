<template>
  <div class="detail">
    <detail-nav-bar ref="navbar" @tagClick="tagClick" :new-index="currentIndex"></detail-nav-bar>
    <scroll ref="scroll" :probe-type="3" @scrollposition="scrollposition">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo" @imageLoad="imageLoad"></detail-param-info>
      <detail-comment-info ref="comments" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="goods" :goodslist="recommends"></goods-list>
    </scroll>
    <to-top @click.native="totopclick" v-show="isshow"></to-top>

    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
// 组件导入
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
// import DetailSwiper from "./childComps/DetailSwiper copy";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/good/GoodsList";
import ToTop from "components/content/totop/ToTop";

// 请求数据
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
  Comments
} from "network/detail.js";
// import {getDetail} from 'network/detail.js';
import { debounce } from "common/utils.js";
import { itemImgListenerMixin, toTopMixin } from "common/mixin.js";
import {
   mapActions
} from 'vuex'

export default {
  name: "Detail",
  data() {
    return {
      itemid: null,
      // iid: null,
      topImages: [],
      // 要写{}，不要写null
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      // itemImgListener:null
      themeTopYs: null,
      getthemeTopYs: null,
      // mytop:[0,1000,2000,3000],
      currentIndex: 0
      // isshow: false,
    };
  },
  mixins: [itemImgListenerMixin, toTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
    // ToTop
  },
  created() {
    this.itemid = this.$route.query.itemid;

    getDetail(this.itemid).then(res => {
      // console.log(res);
      const data = res.result;
      // console.log('res:'+res);
      // console.log("data:", data);
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论内容
      if (data.rate.cRate != 0) {
        this.commentInfo = new Comments(data.rate);
      }
    });

    getRecommend().then(res => {
      console.log("getrecommend", res);
      this.recommends = res.data.list;
      // console.log(this.recommends);
    });

    this.getthemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comments.$el.offsetTop || 0);
      this.themeTopYs.push(this.$refs.goods.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 500);
  },

  methods: {
    ...mapActions(['addCart']),
    // imageLoad() {
    //   this.$refs.scroll.refresh();
    imageLoad() {
      // mixin中定义refresh为scroll.refresh()的防抖函数
      this.refresh();
      // created中定义getthemeTopYs为navbar各模块的高度的防抖函数
      this.getthemeTopYs();
    },
    tagClick(index) {
      this.$refs.scroll.toscrollPositon(0, -this.themeTopYs[index], 500);
      this.currentIndex = index;
    },
    scrollposition(position) {
      // console.log(position.y);
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          this.currentIndex != i &&
          -position.y >= this.themeTopYs[i] &&
          -position.y < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
        this.isshowToTop(position);
      }
    },
    addToCart() {
      // 1.获取购物车需要展示的数据
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.itemid;
      // 2.将商品添加到购物车里
      // this.$store.commit("addCart",product)

      // this.$store.dispatch("addCart",product).then(res=>{
      //   console.log(res);
      // });
this.addCart(product).then(res =>{
  // console.log(res);
  this.$toast.show(res,2000)
})
    }
  },
  destroyed() {
    this.$bus.$off("imgLoad", this.itemImgListener);
    // console.log("detail被destory");
  }
};
</script>
<style>
.detail #tab-bar {
  z-index: 1;
  visibility: hidden;
}
.detail .scroll-wrapper {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  z-index: 8;
  background-color: white;
}
</style>