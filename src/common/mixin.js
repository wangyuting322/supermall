import { debounce } from "./utils.js";
import ToTop from "components/content/totop/ToTop";


export const itemImgListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      this.refresh();
    };
    this.$bus.$on("imgLoad", this.itemImgListener);
    // console.log('我是mixin中的函数');

  },
}

export const toTopMixin = {
  components: {
    ToTop
  },
  data() {
    return {
      isshow: false
    }
  },

  methods: {
    totopclick() {
      // 找到组件，并调用里面的toscrollPositon方法
      this.$refs.scroll.toscrollPositon(0, 0, 500);
    },
    isshowToTop(position) {
      this.isshow = position.y < -450;
    }
  }
}