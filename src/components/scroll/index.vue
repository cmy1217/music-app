<template>
    <div class="scroll-sing" ref="scroll">
      <div>
        <slot></slot>
      </div>
    </div>
</template>

<script>
import scroll from 'better-scroll'

export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {
      this.$nextTick(()=>{
        this.scroll = new scroll(this.$refs.scroll,
        {click:true,mouseWheel:true,disableMouse:false,disableTouch:false}
        )
      })
     
    },
    methods: {
      backTop(x,y,time=300){
        this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        this.scroll.refresh()
      },
    }
};
</script>

<style scoped lang="less">
  .scroll-sing{
    height: 100%;
    overflow: hidden;
  
  }

</style>
