<template>
  <div class="totop">
    <img src="~assets/img/common/top.png" alt />
  </div>
</template>
<script>
export default {
  name:'ToTop'
};
</script>
<style scoped>
.totop{
 position: fixed;
bottom: 50px;
right: 5px;
width: 40px;
z-index: 10;
}
.totop img{
  width: 100%;
}
</style>