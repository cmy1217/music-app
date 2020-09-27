<template>
    <div class="hot"> 
      <Scroll ref="scroll">
        <div class="hot_bg">
          <img src="https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=" alt="">
          <div class="hoticon"></div>
          <div class="hot_up">更新日期:{{time}}</div>
        </div>
        <HotSong @getTop="refresh" @palySong="palySong" />
      </Scroll>
    </div>
</template>

<script>
import Scroll from '../../components/scroll/index'
import HotSong from './newSong'
import {debounce,getData} from '../../utils'
export default {
    components:{
      Scroll,
      HotSong
    },
    data() {
        return {
          time:''
        };
    },
    created() {
      this.getTime()
    },
    mounted() {
      this.cros()
    },
    methods: {
      refresh(){
        this.dRefresh()
      },
      cros(){
        this.dRefresh = debounce(this.$refs.scroll.refresh,200)
      },
      getTime(){
        this.time = getData()
      },
      palySong(){
      this.$emit('play')
      }
    },
    activated() {
      this.refresh()
    },
    
};
</script>

<style scoped lang="less">
  .hot{
    margin-top: 40px;
    height: calc(100vh - 74px - 40px);
  }
  .hot_bg{
      img{
          display: block;
          position: absolute;
          max-width: 100%;
          z-index: -1;
      }
  }
  .hoticon{
    z-index: 10;
    width: 158px;
    height: 73px;
    background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=) -8px -24px;
    background-size: 166px 97px;
  }
  .hot_up{
    margin-top: 10px;
    font-size: 12px;
    transform: scale(.91);
    color: hsla(0,0%,100%,.8);
  }
</style>
