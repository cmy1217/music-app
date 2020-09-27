<template>
    <div class="search">
      <Scroll ref="scroll">
        <div class="s-form">
          <div class="s-div">
              <img src="../../assets/img/search.png" alt="">
            <input type="text" 
            @input="Sinput" 
            v-model="sText"
            placeholder="搜索歌曲、歌手、专辑">
          </div>
        </div>
        <div class="hotS" v-show="hotList">
          <h3>热门搜素</h3>
          <ul>
            <li 
            v-for="item in hots" 
            :key="item.first"
            @click="handelHot(item.first)"
            >
            {{item.first}}
            </li>
          </ul>
        </div>
        <Song :song="song" @getTop="refresh" @palySong="palySong"></Song>
      </Scroll>
    </div>
</template>

<script>
import Scroll from '../../components/scroll/index'
import {songSearch,hotSong} from '../../api'
import {debounce} from '../../utils'
import Song from './newSong'
export default {
    components:{
      Scroll,
      Song
    },
    data() {
        return {
            hots:[],
            hotList:true,
            song:[],
            sText:''
        };
    },
    created() {
      this.dSearch = debounce(this.searchS,500)
     
      this.hotSong()
    },
    mounted() {
        this.dRefresh = debounce(this.$refs.scroll.refresh,200)
    },
    methods: {
      Sinput(e) {
        this.dSearch(e.target.value)
      },
      async searchS(info) {
        if(info){
         this.hotList = false
         const result  = await songSearch(info)
         this.song = result.result.songs
        }else{
            this.song = []
            this.hotList = true
        }           
      },
      async hotSong() {
        const result = await hotSong()
        this.hots = result.result.hots
      },
      refresh(){
        this.dRefresh()
      },
      handelHot(str){
        this.sText = str
        this.dSearch(str)
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
 .search{
     margin-top: 40px;
    height: calc(100vh - 74px - 40px);
 }
 .s-div{
    position: relative;
    width: 100%;
    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 30px;
    input{
    width: 100%;
    height: 30px;
    line-height: 18px;
    background: rgba(0,0,0,0);
    font-size: 14px;
    color: #333;
    border-radius: 0;
    border: 0;
    outline: 0;
    z-index: 10;
    touch-action: none;
    }
    img{
    display: inline-block;
    position: absolute;
    height: 13px;
    width: 13px;
    left: 11px;
    top: 9px;
    }

 }
 input::placeholder{
    color: #c9c9c9;
 }
 
.s-form{
 padding: 15px 10px;
 position: relative;
 border-bottom: 1px solid #E8E8E8;
}
.hotS{
    padding: 15px 10px 0;
    h3{
    font-size: 12px;
    line-height: 12px;
    color: #666;
    }
    ul{
        margin: 10px 0 7px;
        li{
          display: inline-block;
          height: 32px;
          margin-right: 8px;
          margin-bottom: 8px;
          padding: 0 14px;
          font-size: 14px;
          line-height: 32px;
          color: #333;
          position: relative;
          border: 1px solid #E8E8E8;
          border-radius: 24px;            
        }
    }
}
</style>
