<template>
  <div class="home">
    <Scroll ref="scroll">
      <h2 class="home-recomd">推荐歌单</h2>
      <RecomSing/>
      <h2 class="home-recomd">最新音乐</h2>
      <NewSong  @getTop="refresh" @palySong="palySong" />
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../../components/scroll/index'
import RecomSing from './recomed'
import NewSong from './newSong'
import {debounce} from '../../utils'
export default {
  name: 'Home',
  components: {
    Scroll,
    RecomSing,
    NewSong
  },
  methods: {
    refresh(){
      this.dRefresh()
    },
    cros(){
      this.dRefresh = debounce(this.$refs.scroll.refresh,200)
    },
    palySong(){
      this.$emit('play')
    }
  },
  created() {
    
  },
  mounted() {
    this.cros()
  },
  activated() {
    this.refresh()
  },
}
</script>

<style  lang="less">
  .home{
    margin-top: 40px;
    height: calc(100vh - 74px - 40px);
  }
  .home-recomd{
    position: relative;
    padding-left: 9px;
    font-size: 17px;
    height: 40px;
    line-height: 40px;
  }
  
  .home-recomd::after{
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -9px;
    width: 2px;
    height: 16px;
    background-color: #d33a31;
  }
  html{
    touch-action: none;
  }

</style>
