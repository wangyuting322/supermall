<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="left"></div>
      <div slot="center">购物街</div>
      <div slot="right"></div>
    </nav-bar>

    <tab-control
      ref="tabControl2"
      class="fake-tab-control"
      :titles="titles"
      @tabClick="tabClick"
      v-show="isTabFixed"
    ></tab-control>
    <!-- 驼峰要用probe-type，要用v-bind不然就是字符 -->
    <scroll
      ref="scroll"
      :probe-type="3"
      @scrollposition="scrollposition"
      :pull-up-load="true"
      @pullingup="loadMore"
    >
      <home-swiper ref="swiper" :banners="banners" @imageLoad="imageLoad"></home-swiper>
      <home-recommend :recommends="recommends" @imageLoad="imageLoad"></home-recommend>
      <feature-views></feature-views>
      <tab-control ref="tabControl1" :titles="titles" @tabClick="tabClick"></tab-control>
      <goods-list :goodslist="showgoodslist"></goods-list>
    </scroll>
    <!-- native可以给原生组件添加一个事件响应 -->
    <to-top @click.native="totopclick" v-show="isshow"></to-top>
  </div>
</template>

<script >
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/good/GoodsList";
// import GoodsListItem from "components/content/good/GoodsListItem";
import Scroll from "components/common/scroll/Scroll";
// import ToTop from "components/content/totop/ToTop";

// 请求数据
import { getHomeMultidata, getHomeGoods } from "network/home";

import HomeSwiper from "./childComps/HomeSwiper";
// import HomeSwiper from "./childComps/HomeSwiper copy.vue";
import HomeRecommend from "./childComps/HomeRecommend";
import FeatureViews from "./childComps/FeatureViews";

// 引入方法
// import { debounce } from "common/utils.js";
import { itemImgListenerMixin, toTopMixin } from "common/mixin.js";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureViews,
    TabControl,
    GoodsList,
    Scroll,
    // ToTop
  },
  mixins: [itemImgListenerMixin,toTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currenttype: "pop",
      // isshow: false,
      isTabFixed: false,
      tabControlHeight: 0
      // saveY:0,
      // itemImgListener:null
    };
  },
  computed: {
    showgoodslist() {
      return this.goods[this.currenttype].list;
    }
  },
  created() {
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  // mounted() {
  //   const refresh = debounce(this.$refs.scroll.refresh, 500);
  //   this.itemImgListener = () => {
  //     refresh();
  //   };
  // this.$bus.$on("imgLoad", () => {
  //   refresh();
  // });
  //   this.$bus.$on("imgLoad", this.itemImgListener);
  // },
  //   activated(){
  // this.$refs.scroll.toscrollPositon(0,this.saveY,0)
  // this.$refs.scroll.imgRefresh()
  //   },
  //   deactivated(){
  // this.saveY = this.$refs.scroll.getScrollY()
  //   },
  deactivated() {
    this.$bus.$off("imgLoad", this.itemImgListener);
    // console.log("首页deactivated");
  },
  methods: {
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        // console.log(this.bannerlist);
        this.recommends = res.data.recommend.list;
        // console.log(this.recommendlist);
        console.log('接口地址是错误的，请添加coderwhy老师微信');
        
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // const list = res.data.data.banner.list;
        // for (const item of list) {
        //   this.goods[type].list.push(item)
        // }
        // console.log(res);

        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
    // 事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currenttype = "pop";
          // console.log(index);

          break;
        case 1:
          this.currenttype = "new";
          // console.log(index);
          break;
        case 2:
          this.currenttype = "sell";
          // console.log(index);
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // totopclick() {
    //   // 找到组件，并调用里面的toscrollPositon方法
    //   this.$refs.scroll.toscrollPositon(0, 0, 500);
    // },
    scrollposition(position) {
      // console.log(position);
      // this.isshow = position.y < -450;
      // mixin中引入
     this.isshowToTop(position) ;
      this.isTabFixed = position.y < -this.tabControlHeight;
    },
    loadMore() {
      // console.log("加载更多");
      this.getHomeGoods(this.currenttype);
    },
    imageLoad() {
      this.tabControlHeight = this.$refs.tabControl1.$el.offsetTop;
    }
  }
};
</script>

<style>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav-bar {
  background-color: var(--color-tint);
  color: rgb(255, 255, 255);
  /* 现在滚动scroll，不滚动原生页面，不用fixed */
  /* width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9; */
}
.fake-tab-control {
  position: relative;
  top: 0px;
  left: 0px;
  z-index: 99;
}

.scroll-wrapper {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>
