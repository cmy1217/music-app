<template>
    <div class="tag">
      <div class="tags">
        标签: <em class="lstit_tag" v-for="(item,index) in tags" :key="index">{{item}}</em>
      </div>
      <div class="sing_desc">
        <span>{{description}}</span>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    props:{
      tags:{
        type:Array,
        default:[]
      },
      description:{
        type:String,
        default:''
      }
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
  .tag{
    position: relative;
    margin: 0 10px 0 15px;
    padding-top: 10px;
    line-height: 19px;
    color: #666;
  }
  .tags{
    margin-bottom: 10px;
    line-height: 20px;
    margin-right: -10px;
  }
  .lstit_tag{
    display: inline-block;
    margin-right: 6px;
    padding: 1px 8px;
    font-size: 12px;
    position: relative;
    font-weight: 400;
    font-style: normal;
  }
  .sing_desc{
    position: relative;
    padding-bottom: 18px;
    line-height: 19px;
    color: #666;

  }
  em{
    border: 1px solid #E8E8E8;
    border-radius: 24px;
  }
</style>
