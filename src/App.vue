<template>
  <div id="app">
    <HeaderSing v-show="path" />
    <Tab v-show="path" />
    <audio :src="$store.state.songs[song]" ref="audio" :loop="loop" />
    <keep-alive>
       <router-view 
       @noBar="noBar" 
       @Bar="Bar"
       @playSong="handelPlaySong"
       @play="autoPlay"
       @loop="looping"
       @nextSong="nextSong"
       @preSong="preSong"
       @handelSong="handelSong"
       :song="song"
       :songTime="songTime"
       :duration="duration"
       :playing="playing"
       >
       </router-view>
    </keep-alive>
    <MiniPlayer 
    v-show="this.miniPlays"
    :song="song" 
    :playing="playing" 
    @miniPlay="miniPlay"/>
  </div>
</template>
<script>
import HeaderSing from './components/header/index'
import Tab from './components/tab/index'
import MiniPlayer from './views/miniPlayer/index'
let timer = null
export default {
  components:{
    HeaderSing,
    Tab,
    MiniPlayer
  },
  data() {
    return {
      path:true,
      song:0,
      loop:false,
      songTime:0,
      duration:0,
      playing:false,
      miniPlays:true
    }
  },
  methods: {
    fn(){
      if(window.location.pathname==='/playlist'){
        this.path = false
      }else{
        this.path = true
      }
    },
    noBar(){
      this.path = false
      this.miniPlays = false
    },
    Bar(){
      this.path = true
      this.miniPlays = true
    },
    handelPlaySong(){
      if(!this.playing){
        this.playSong()        
      }else{
        this.pasueSong()
      }

    },
    autoPlay(){
      setTimeout(()=>{
        this.playSong()
        if(this.audio.paused){
          setTimeout(()=>this.autoPlay(),200)
        }
      },700)
    },
    playSong(){
      setTimeout(()=>{
        let audioPromise = this.audio.play()
        if(audioPromise){
          audioPromise.then(()=>{
            this.autoNext()
            this.playing = true
          }).catch((err)=>{
            console.log(err);
          })
        }         
      },500)
     
    },
    pasueSong(){
      this.audio.pause()
      this.playing = false
    },
    looping(){
      const newLoop = this.loop
      this.loop = !newLoop   
    },
    nextSong(){
      const length = this.$store.state.songs.length-1
      if(this.song>=length){
        this.song = 0
        setTimeout(()=>{
          this.playSong()
          this.autoNext()
        },500)
        
      }else{
        this.song = this.song +1
        setTimeout(()=>{
          this.playSong()
          this.autoNext()
        },500)
      }
    },
    preSong(){
      const length = this.$store.state.songs.length-1
      if(this.song===0){
        this.song = length
        setTimeout(()=>{
          this.playSong()
          this.autoNext()
        },500)
        
      }else{
        this.song = this.song -1
        setTimeout(()=>{
          this.playSong()
          this.autoNext() 
        },500)
      }      
    },
    handelSong(index){
      this.song = index
      setTimeout(()=>{
        this.playSong()
      },500)      
    },
    autoNext(){
      if(timer)clearTimeout(timer)
      timer = setTimeout(()=>{
        this.audio.onended=()=>{
          this.nextSong()
        }             
      })
    },
    getSongTime(){
      this.songTime = this.audio.currentTime
    },
    setDuration(){
      this.duration = this.audio.duration
    },
    miniPlay(){
      const playing = this.playing
      if(playing){
        this.pasueSong()
      }else{
        this.playSong()
      }
    }
  },
  mounted() {
    this.fn()
    this.audio = this.$refs.audio
    this.audio.ontimeupdate = this.getSongTime
    this.audio.oncanplay = this.setDuration 
  },

}
</script>

<style lang="less">
  @import './assets/css/style.css';


</style>
