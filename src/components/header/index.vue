<template>
    <div class="sing-header">
        <div class="header-icon"> <img src="../../assets/img/m-music3.png" alt=""></div>
        <h2 class="header-text">Y.u—音乐</h2>
    </div>
</template>

<script>
export default {
    name:'headerSing',
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
 .sing-header{
    position: relative;
    height: 74px;
    width: 100%;
    text-align: center;
    background: #d44439;
 }
 .header-text{
   position: absolute;
   left: 30%;
   top: 50%;
   width: 100px;
   height: 55px;
   font-size: 20px;
   line-height: 55px;
   transform: translate3d(-50%,-50%,0);
   color: #f1f1f1; 
 }
 .header-icon{
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translate3d(-50%,-50%,0);
    display: inline-block;
    height: 25px;
    width: 25px;
    z-index: 10;
    border-radius: 50%;
    background: white;
    img{
        display: inline-block;
        height: 24px;
        width: 24px;
        margin-top: 2px;
    }
 }
</style>
