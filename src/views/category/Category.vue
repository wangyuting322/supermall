<template>
  <!-- 容器里面只能有一个元素，但是这个元素里面可以有其他元素 
  如果容器里面有多个元素，只滚动一个-->
  <div class="wrapper" ref="aaa">
    <div>
    <button @click="btnclick">按钮</button>
    <div @click="difsdfclick">div按钮</div>
    <ul>
      <li>分类</li>
      <li>ds2</li>
      <li>ds3</li>
      <li>ds4</li>
      <li>ds5</li>
      <li>ds6</li>
      <li>ds7</li>
      <li>ds8</li>
      <li>ds9</li>
      <li>ds10</li>
      <li>ds11</li>
      <li>ds12</li>
      <li>ds13</li>
      <li>ds14</li>
      <li>ds15</li>
      <li>ds16</li>
      <li>ds17</li>
      <li>ds18</li>
      <li>ds19</li>
      <li>ds20</li>
      <li>ds21</li>
      <li>ds22</li>
      <li>ds23</li>
      <li>ds24</li>
      <li>ds25</li>
      <li>ds26</li>
      <li>ds27</li>
      <li>ds28</li>
      <li>ds29</li>
      <li>ds30</li>
      <li>ds31</li>
      <li>ds32</li>
      <li>ds33</li>
      <li>ds34</li>
      <li>ds35</li>
      <li>ds36</li>
      <li>ds37</li>
      <li>ds38</li>
      <li>ds39</li>
      <li>ds40</li>
      <li>ds41</li>
      <li>ds42</li>
      <li>ds43</li>
      <li>ds44</li>
      <li>ds45</li>
      <li>ds46</li>
      <li>ds47</li>
      <li>ds48</li>
      <li>ds49</li>
      <li>ds50</li>
    </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    };
  },
  // created的时候，不能获取dom元素
  // created(){
  //   this.scroll = new BScroll('.wrapper')
  // }
  mounted() {
    // this.scroll = new BScroll(document.querySelector('.wrapper'),{

    // })

    //  this.scroll = new BScroll(this.$refs.aaa,{

    //  })

    // this.scroll =  new BScroll('.wrapper',{

    //  })

    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      probeType:3,
      // button的事件一直可以，不管click是否为true，但是其它元素，div等一定要是true才可以
    click:true,
    // pullUpLoad为true,probeType无效
    pullUpLoad:true
    });
    //监听滑动事件时 有一个参数position
    this.scroll.on('scroll',(position) => {
      console.log(position);

    });
    //监听上拉事件时 没有参数
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
      // setTimeout(()=>{
      this.scroll.finishPullUp();

      // },2000)
    });
  },
  methods: {
    btnclick() {
      console.log("button");
    },
    difsdfclick() {
      console.log("div");
    }
  }
};
</script>

<style scoped>
.wrapper {
  background-color: tomato;
  height: 150px;
  overflow: hidden;
}
</style>
