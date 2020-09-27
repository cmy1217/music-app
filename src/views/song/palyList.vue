<template>
    <div :class="this.SongsShow?'play_list list_show':'play_list list_no'">
      <div class="list_header">
        <h2>循环播放</h2>
      </div>
      <Scroll ref="scroll" class="list_bottom">
        
        <div class="list_song" 
        v-for="(item,index) in playList" 
        :key="index"
        @click="handelSong(index)"
         >
          <h3>{{item.auther}}</h3>
          <span>  - {{item.name}}</span>
        </div>
      </Scroll>
      <div class="play_foot" @click="handelClose">
        <h2>关闭</h2>
      </div>
    </div>
</template>

<script>
import Scroll from '../../components/scroll/index'
export default {
    data() {
        return {
          playList:[],
          songs:[],
          SongsShow:false
        };
    },
    components:{
      Scroll
    },
    created() {

    },
    mounted() {
      this.playList = this.$store.state.songInfo
      this.songs = this.$store.state.songs
    },
    methods: {
      handelSong(index){
        this.$emit('handelSong',index)
      },
      handelClose(){
        this.SongsShow = false
      },
      handelShow(){
        this.SongsShow = true
        setTimeout(()=>this.$refs.scroll.refresh(),2000)
        this.$refs.scroll.refresh()
      }
    }
};
</script>

<style scoped lang="less">
  .play_list{
    position: fixed;
    bottom: 0;
    height: 75vh;
    width: 100%;
    background: black;
    opacity: 0.9;
    z-index: 9999999;
    color: white;
  }
  .list_header{
    position: relative;
    border-bottom: 1px solid 	#383838;
    h2{
      font-size: 14px;
      line-height: 50px;
      height: 50px;
      padding-left: 35px;
      color: green;
    }
  }
  .list_song{
    height: 100%;
    padding-left: 15px;
    line-height: 40px;
    border-bottom: 1px  solid #383838;
    h3{
      display: inline-block;
      font-size: 13px;
    }
    span{
      font-size: 13px;
      color: 	#909090;
    }
  }

  .play_foot{
    position: fixed;
    bottom: 0;
    width: 100%;
    opacity: 1;
    z-index: 9999;
    background: black;
    h2{
      text-align: center;
      font-size: 16px;
      line-height: 50px;
      border-top: 1px solid #383838;

    }
  }
  .list_no{
    animation: listNo 300ms linear forwards;
  }
  .list_show{
    animation: listShow 300ms linear forwards;
  }
  .list_bottom{
   height: calc(100% - 51px - 51px);
  }
  @keyframes listNo{
    0%{
      opacity: 0;
      transform: translateY(0);
    }
    100%{
      opacity: 0;
      transform: translateY(100%);
    }
  }
  @keyframes listShow{
    0%{
      opacity: 0;
      transform: translateY(100%);
    }
    100%{
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
