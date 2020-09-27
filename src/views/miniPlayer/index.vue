<template>

    <div class="mini-player" v-if="this.getInfo.length" @click="toSong">
      <div class="icon">
        <img :src="this.getInfo[this.song].url" alt="">
      </div>
      <div class="text">
        <h2>{{this.getInfo[this.song].auther}}</h2>
        <span>{{this.getInfo[this.song].name}}</span>
      </div>
      <div class="player" @click.stop="miniPlay">
        <div v-if="this.playing"><img src="../../assets/img/miniplay.svg" alt=""></div>
        <div v-else><img src="../../assets/img/player.svg" alt=""></div>
      </div>
      <div class="mini-control"><img src="../../assets/img/gedan.svg" alt=""></div>
    </div>      


</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
          
        };
    },
    props:{
      song:{
        type:Number,
        default:()=>0
      },
      playing:{
        type:Boolean,
        default:()=>false
      }      
    },
    created() {

    },
    mounted() {

    },
    methods: {
      miniPlay(){
        this.$emit('miniPlay')
      },
      toSong(){
        this.$router.push('/sings/song')
      }
    },
    computed: {
      ...mapGetters(['getInfo'])
    },
};
</script>

<style scoped lang="less">
  .mini-player{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 99999;
    background: white;
    display: flex;
    align-items: center;
    border: none;
    border-top: 1px solid 	#F0F0F0;
    box-shadow: 0 0 2px #E0E0E0;
    div{
      flex:1;
      display: inline-block;
      height: 40px;
    }
  }
  .icon{
    img{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-left: 20px;
    }
  }
  .player{
    div{
      margin-left: 40px;
      img{
        width: 40px;
      }
    }
  }
  .mini-control{
    height: 30px!important;
    flex: 0 0 40px!important;
  
    img{
      width: 30px;
      display: none;
    }
  }
  .text{
    h2{
      margin-bottom: 2px;
      line-height: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
      color: #2e3030;
      
    }
    span{
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 11px;
      color: #2e3030;
      display: inline-block;
       width: 100px!important;
    }
  }
</style>
