<template>
    <div class="new_song">
      <router-link 
      v-for="item in song" 
      :key="item.id" 
      :to="{path:'/sings/song',query:{id:item.id}}"
      class="new_sing">
        <div class="sing_li" @click="playSong(item.picUrl,item.name,item.song.artists[0].name)" >
          <div class="sing_left">
            <div class="newsong_text">{{item.name}}</div>
            <div class="sginfo">
              <i class="u-hmsprt"></i>
              {{item.song.artists[0].name}}
            </div>
          
          </div>
          <div class="sgchfr">
            <div class="span-img">
            <img 
            class="new_song_icon dark-gray" 
            @load="imgLoad" 
            src="../../assets/img/play.png"
            />               
            </div>
          </div>
        </div>
      </router-link>
    </div>
</template>

<script>
import {getNewSong} from '../../api'

export default {
    data() {
        return {
          song:[]
        };
    },
    created() {
      this.getNewSong()
    },
    mounted() {

    },
    methods: {
      async getNewSong () {
        const result = await getNewSong()
        this.song = result.result
      },
      imgLoad(){
        this.$emit('getTop')
      },
      playSong(url,name,auther){
        this.$emit('palySong')
        this.$store.commit('songInfo',{url,name,auther})
      }
    }
};
</script>

<style scoped lang="less">
  .new_song{
    position: relative;
    min-height: 20px;
  }
  .new_sing{
    color: #333;
    display: flex;
    padding-left: 10px;
  }
  .sing_li{
    position: relative;
    flex: 1 1 auto;
    display: flex;
  }
  .newsong_text{
    font-size: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
    line-height: 31px;
  }
  .sginfo{
    font-size: 12px;
    color: #888;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
  }
  .u-hmsprt{
    background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=) no-repeat;
    background-size: 166px 97px;
    display: inline-block;
    width: 12px;
    height: 8px;
    margin-right: 4px;
  }
  .sgchfr{
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a{
    text-decoration: none;
  }
  .sing_left{
    padding: 6px 0;
    width: 0;
    flex: 1 1 auto;
  }
  .new_song_icon{
    display: inline-block;
    width: 22px;
    height: 22px;
    background-position: -24px 0;
   
  }
  .span-img{
    position: relative;
    width: 30px;
    height: 30px;
    overflow: hidden;
  }

</style>
