<template>
    <div class="tab">
      <router-link :to="{path:'/sings'}" class="tab-link">
        <div class="tabtxt">
          <span>推荐音乐</span>
        </div>
      </router-link>
      
      <router-link :to="{path:'/sings/hot'}" class="tab-link">
        <div class="tabtxt">
          <span>热歌榜</span>
        </div>
      </router-link>

      <router-link :to="{path:'/sings/search'}" class="tab-link">
        <div class="tabtxt">
          <span>搜索</span>
        </div>
      </router-link>      

    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="less">
  .tab{
    position: fixed;
    top: 74px;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 40px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid 	#D0D0D0;
    color: black;
  }
  .tab-link{
    flex: 1;
    display: block;
    width: 30%;
    height: 100%;
    text-align: center;
    cursor: pointer;
    
  }
  .tabtxt{
    position: relative;
    display: inline-block;
    max-width: 100%;
    height: 100%;
    padding: 0 5px;
    box-sizing: border-box;
    color: #333;
    font-size: 15px;
    line-height: 40px;
  }
  .router-link-exact-active{
    div{
      border-bottom: 2px solid #dd001b;
      span{
        color: #dd001b;
      }
    }
  }
</style>
