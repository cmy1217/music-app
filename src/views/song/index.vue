<template>
    <div class="c-song">
      <Scroll>
        <div class="c-bg"></div>
        <div class="c-in"></div>

        <div class="scheme">
          <div class="c-disc">
            <div class="m-song-turn">
              <div class="m-song-rollwrap ">
                <img ref="routeImg" :src="getUrl" alt="" class="s-route">
              </div>
              <div class="m-song-lgour">

              </div>
            </div>
          </div>
        </div>

        <div class="s_lricy" >
          <div  ref="lyirc" class="ico_s">
            <ul class="s_ul"  v-for="(item,index) in this.jsLricy[this.song]" :key="index">
              {{setSongTime(item)}}
              <li 
              v-for="(lyric,index) in item" 
              :key="index" 
              :class="lyric.t>songTime?'':'lineHigh'">
                {{lyric.c}}
              </li>
            </ul>
          </div>

        </div>

        <div class="s_info">
          <h2>
            <span>{{getName}}</span>
            <i>—</i>
            <b>{{getAuther}}</b>
          </h2>
        </div>


        <div class="s-menu">
          <div class="s-fun">
            <img src="../../assets/img/loop.png" alt="" 
            @click="loop" :class="{'l-route':isloop}">
            <img src="../../assets/img/pre.png" alt=""
            @click="preSong"
            >
            <div class="s-play" @click="handelPlay">
              <img v-if="this.playing" src="../../assets/img/s-playing.png" alt="">
              <img v-else  src="../../assets/img/mplay.png" alt="">
            </div>
            <img src="../../assets/img/next.png" alt=""
            @click="nextSong"
            >
            <img src="../../assets/img/list.png" alt="" @click="handelList">
          </div>
        </div>
      </Scroll>
      <PlayListS @handelSong="handelSong" ref="playList"></PlayListS>
    </div>
</template>

<script>
import Scroll from '../../components/scroll/index'
import PlayListS from './palyList'
import {playSong,getLyric} from '../../api'
import {createLrcObj} from '../../utils'
import {mapGetters} from 'vuex'
export default {
    components:{
      Scroll,
      PlayListS
    },
    data() {
      return {
        play:true,
        id:0,
        info:{},
        isloop:false,
        loopTime:[],
        loopRows:0
      };
    },
    props:{
      song:{
        type:Number,
        default:()=>0
      },
      songTime:{
        type:Number,
        default:()=>0
      },
      duration:{
        type:Number,
        default:()=>0
      },
      playing:{
        type:Boolean,
        default:()=>false
      }
    },
    created() {
      this.goHome()
    },
    mounted() {
    
    },
    methods: {
      handelPlay(){
        if(!this.playing){
          this.sImg.style.webkitAnimationPlayState = "running"
        }else{
          this.sImg.style.webkitAnimationPlayState = "paused"
        }
        this.$emit('playSong')
      },
      async getSong() {
        if(this.id == this.$route.query.id){
        }else{
          let arr= this.$store.state.songInfo
          if(arr.length===0){
            this.$router.go(-1)
          }else{
            this.id = this.$route.query.id
            const result = await playSong(this.$route.query.id)
            const lyric = await getLyric(this.$route.query.id)
            this.$store.commit('playSong',result.data[0].url)
            if(lyric.lrc){
              this.$store.commit('songLricy',createLrcObj(lyric.lrc.lyric))
            }else{
              this.$store.commit('songLricy','')
            }
           
            this.loopRows = 0
          }
        }
      },
      loop(){
        const newLoop = this.isloop
        this.isloop = !newLoop
        this.$emit('loop')
      },
      nextSong(){
        this.$emit('nextSong')
        setTimeout(()=>{
          this.info = this.$store.state.songInfo[this.song]
          this.loopRows = 0          
        },200)
      },
      preSong(){
        this.$emit('preSong')
        setTimeout(()=>{
          this.info = this.$store.state.songInfo[this.song]
          this.loopRows = 0          
        },200)       
      },
      handelSong(index){
        this.$emit('handelSong',index)
        setTimeout(()=>{
          this.info = this.$store.state.songInfo[this.song]
          this.loopRows = 0
          },500)
      },
      handelChange(){
        this.info = this.$store.state.songInfo[this.song]
      },
      handelList(){
        this.$refs.playList.handelShow()
      },
      goHome(){
        let arr= this.$store.state.songInfo
        if(arr.length===0){
          this.$router.push('/').catch(err=>{})
          console.log('gohome');
        }        
      },
      setSongTime(time){
        if(Array.isArray(time)){
          let arr = []  
          time.map(item=>{
            arr.push(item.t)
          })
          this.loopTime = arr 
        }
      },
      lyircMove(){
        this.$refs.lyirc.style.transform = `translateY(-${this.loopRows*20}px)`
      },
      lyircTop(){
        this.$refs.lyirc.style.transform = `translateY(0px)`
         this.loopRows = 0
      }
    },
    activated() {
      this.$emit('noBar')
      this.info = this.$store.state.songInfo[this.song]
      this.sImg  = this.$refs.routeImg
      this.getSong()
    },
    deactivated() {
      this.$emit('Bar')
    },
    computed: {
      ...mapGetters(['jsLricy']),
      getUrl(){
        if(this.$store.state.songInfo.length>0){
          return this.$store.state.songInfo[this.song].url
        }
        return 1
      },
      getName(){
        if(this.$store.state.songInfo.length>0){
          return this.$store.state.songInfo[this.song].name          
        }
        return 1
      },
      getAuther(){
        if(this.$store.state.songInfo.length>0){
          return this.$store.state.songInfo[this.song].auther
        }
        return 1
      },

    },
    watch: {
      'songTime':function(value){
        if(value>=this.loopTime[this.loopRows]){
          this.lyircMove()
          this.loopRows = this.loopRows +1
        }
        if(value>=this.duration){
          this.lyircTop()
        }
      },
      'song':function(value){
        this.lyircTop()
      },
      'playing':function(value){
        if(value){
          this.sImg.style.webkitAnimationPlayState = "running"
        }else{
          this.sImg.style.webkitAnimationPlayState = "paused"
        }
      }
    },

};
</script>

<style scoped lang="less">
  .c-song{
    position: relative;
    height: 100vh;
    
  }
  .c-bg{
    background-color: 	#101010;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    transform-origin: center top;
    
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1;
  }
  .c-disc{
    position: relative;
    width: 248px;
    height: 248px;
    margin: 0 auto;
  }
  .scheme{
    padding-top: 63px;
    height: 100vh;
  }
  .m-song-turn{
    width: 100%;
    height: 100%;
  }
  .m-song-turn::before{
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    background: url(https://s3.music.126.net/mobile-new/img/disc.png?d3bdd1080a72129346aa0b4b4964b75f=);
    background-size: contain;    
  }
  .m-song-lgour{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 3;
    background: url(//s3.music.126.net/mobile-new/img/disc_light.png?2bb24f3…=) no-repeat;
    background-size: contain;    
  }
  .m-song-rollwrap{
    position: absolute;
    width: 150px;
    height: 150px;
    left: 50%;
    top: 50%;
    z-index: 1;
    margin: -75px 0 0 -75px;
    img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    }
  }
  .c-in{
    position: absolute;
    width: 168px;
    height: 126px;
    left: 144px;
    z-index: 99;
    background: url(https://s3.music.126.net/mobile-new/img/needle.png?702cf6d95f29e2e594f53a3caab50e12=) no-repeat;
    background-size: contain;
  }
  .c-play{
    position: absolute;
    z-index: 999;
    width: 50px;
    height: 50px;
    border: 1px solid white;
    border-radius: 50%;
    left: 136px;
    top: 155px;
    background: black;
    opacity: 0.7;
    img{
      width: 100%;
      display: inline-block;
    }
  }
  .s-menu{
    position: fixed;
    bottom: 10px;
    width: 100%;
    z-index: 99;
  }
  .s-fun{
    height: 50px;
    display: inline-block;
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;
    left: 50%;
    transform: translateX(-50%);
    img{
      width: 20px;
      height: 20px;

      margin: 0 20px;
      display: inline-block;
    }
  }
  .s-play{
    display: inline-block;
    border: 1px solid white;
    border-radius: 50%;
    background: black;
    width: 40px;
    height: 40px;
    transform: translateY(-10px);
    img{
      width: 40px;
      height: 40px;
      transform: translate(-1px,0);
      margin: 0 0;
    }
  }
  .s_info{
    position: absolute;
    top: 68%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    h2{
    text-align: center;
    font-size: 15px;
    line-height: 1.1;
    color: #fefefe;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family:"微软雅黑","黑体","宋体"; 
    span{
    display: inline-block;
    text-align: center;
    font-size: 14px;
    line-height: 1.1;
    color: #fefefe;
    transform: translateY(1px);
    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    max-width: 184px;
    overflow: hidden;  
    }      
    b{
    margin-left: 4px;
    display: inline-block;
    max-width: 100px;
    font-size: 13px;
    color: hsla(0,0%,100%,.6); 
         
    }
    }    
  }
  .s-route{
    animation: identifier 20s linear infinite;
  }
  .l-route{
    
    animation: identifier 10s linear infinite;
  }
  .s_lricy{
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    width: 80%;
    height: 60px;
    z-index: 99999;
    overflow: hidden;
   
  }
  .s_ul{
    color: white;
    font-family: "Times New Roman", Times, serif;
    display: none;
    li{
      line-height: 20px;
      font-size: 14px;
      text-align: center;
    }
  }
  .ico_s{
    transition-duration: 600ms
  }
  .s_ul:last-child{
    display: block!important;
  }
  .s_ul .lineHigh{
    color: green;
  }

  @keyframes identifier {
    0%{
      transform: rotate(0) ;
    }
    100%{
      transform: rotate(360deg) ;
    }
  }
</style>
