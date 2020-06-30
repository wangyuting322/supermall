<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="info-header">
      <span class="header-title">用户评论</span>
      <span class="header-more">更多</span>
    </div>

    <div class="info-user">
      <img :src="commentInfo.userimage" alt />
      <div>
       {{commentInfo.username}}
      </div>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
    </div>
    <div class="info-other">
      <span>{{commentInfo.createdtime | showDate}}</span>
      <span>{{commentInfo.style}}</span>
    </div>
    <div class="info-images">
      <img
        v-show="commentInfo.commentimages"
        v-for="(item,index) in commentInfo.commentimages"
        :src="item"
        alt
      />
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils.js";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    // 时间戳转成其它时间格式
    showDate(value) {
      const date = new Date(value * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped>
.comment-info {
  padding: 0px 15px;
  border-bottom: 5px solid #f2f5f8;
}

.info-header {
  height: 40px;
  line-height: 40px;
  position: relative;
  font-size: 14px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
}
.info-header .header-more {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 12px;
}
.info-user {
  display: flex;
  /* align-items:flex-end; */
  align-items: center;

  padding: 10px 0px;
  font-size: 14px;
  font-weight: 700;
}
.info-user img {
  width: 10%;
  border-radius: 50%;
  margin-right: 10px;
}
.info-detail p {
  font-size: 14px;
  line-height: 1.5;
}
.info-other {
  color: rgba(100, 100, 100, 0.7);
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  margin-top: 0px;
  border: none;
}
.info-other span {
  margin-right: 15px;
}
.info-images {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 5px auto 15px auto;
}
.info-images img {
  width: 30%;
}
</style>
