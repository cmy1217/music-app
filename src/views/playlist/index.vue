<template>
    <div class="playlist">
      <Scroll ref="scroll">
        <div class="sing_list_top">
          <img class="sing_bg" :src="top.coverImgUrl" alt="">
          <div class="sing_list_in">
            <div class="sing_left">
              <img :src="top.coverImgUrl" alt="">
              <span class="lsthd_icon">歌单</span>
              <i class="u-earp lsthd_num">{{top.playCount}}</i>
            </div>
            <div class="sing_right">
              <h2 class="lsthd_title">{{top.name}}</h2>
            </div>
          </div>
        </div>
        <Tag :tags="tags"  :description="description"/>
        <h3 class="list_text">歌曲列表</h3>
        <List :song ="song" @getTop="refresh" @palySong="palySong" />
      </Scroll>
    </div>
</template>

<script>
import Scroll from '../../components/scroll/index'
import Tag from './tag'
import List from './newSong'
import {getList} from '../../api'
import {debounce} from '../../utils'
export default {
    components:{
      Scroll,
      Tag,
      List
    },
    data() {
      return {
        top:{},
        tags:[],
        description:'',
        song:[]
      };
    },
    created() {
      this.getList()
    },
    mounted() {
      this.cros()
    },
    methods: {
      async getList() {
        const result = await getList(this.$route.query.id)
        let {name,playCount,coverImgUrl} = result.playlist
        this.description = result.playlist.description
        this.tags = result.playlist.tags
        this.top = {name,playCount,coverImgUrl}
        this.song = result.playlist.tracks
      },
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
    activated() {
      this.$emit('noBar')

      this.getList()
    },
    deactivated() {
      this.top = {}
      this.tags = []
      this.description = ''
      this.song = []
      this.$emit('Bar')
    },
    
};
</script>

<style scoped lang="less">
  .playlist{
    height: 100vh;
    position: relative;
  }
  .sing_list_top{
    position: relative;
    width: 100%;
    height: 170px;
    overflow: hidden;
    padding: 30px 10px 30px 15px;
  }
  .sing_list_top::after{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    content: " ";
    background-color: rgba(0,0,0,.25);
  }
  .sing_left{
    z-index: 10;
    position: relative;
    width: 114px;
    height: 114px;
    background-color: #e2e2e3;
    img{
      width: 100%;
      vertical-align: middle;
      z-index: 999999;
     
    }
  }
  .sing_list_in{
    display: flex;
    position: relative;
    z-index: 99999!important;
  }
  .sing_bg{
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    z-index: 1;
     filter: blur(20px);
  }
  .lsthd_icon{
    position: absolute;
    z-index: 3;
    top: 10px;
    left: 0;
    padding: 0 8px;
    height: 17px;
    color: #fff;
    font-size: 9px;
    text-align: center;
    line-height: 17px;
    background-color: rgba(217,48,48,.8);
    border-top-right-radius: 17px;
    border-bottom-right-radius: 17px;
  }
  .u-earp {
    position: absolute;
    right: 2px;
    top: 0;
    z-index: 3;
    padding-left: 15px;
    color: #fff;
    font-size: 12px;
    background-position: 0;
    background-repeat: no-repeat;
    background-size: 11px 10px;
    text-shadow: 1px 0 0 rgba(0,0,0,.15);
  }
  .lsthd_num{
    background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
  }
  .lsthd_title{
    padding-top: 1px;
    font-size: 17px;
    line-height: 1.3;
    color: #fefefe;
    height: 44px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }
  .sing_right{
    margin-left: 16px;
    flex: 1 1 auto;
    width: 1%;
  }
  .list_text{
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    font-size: 12px;
    color: #666;
    background-color: #eeeff0;
    display: block;
  }
</style>
