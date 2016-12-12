<template>
  <div class="search-component">
    <!-- 子组件传递的事件 -->
    <logo @get-index="getIndex"></logo>
    <!-- v-model实质是语法糖,本质就是:value和@input,因为需要在input事件中请求数据,所以拆开来写 -->
    <div class="search-input" v-cloak>
      <input type="text"
        :value="message"
        @input="getTip($event)"
        @keydown.up.prevent="selectKey(-1)"
        @keydown.down="selectKey(1)"
        @keydown.enter="searchStart"
        @blur = "changeFlag(false)"
        @focus = "changeFlag(true)"
        autofocus>

      <span class="search-reset"
        @click="clear"
        v-show="message !=''">
      &times;
      </span>

      <div class="search-start" @click="searchStart">搜索一下</div>
      <!-- 列表的过渡动画 ,可以自定义标签名-->
      <transition-group
      tag="ul"
      name="list"
      class="search-tip"
      v-show = "flag"
      v-cloak>
      <!-- 因为提示信息列表不包括输入的内容，所以index和selectIndex不一样，需要+1 -->
        <li
          v-for="(tip,index) in tipData"
          :key="tip"
          :class="{hover:index === selectIndex - 1}"
          @mouseover="selectMouse(index+1)"
          @mouseout="selectMouse(0)"
          @click="searchStart"
          >
        {{tip}}
        </li>
      </transition-group>

      </div>
    </div>
  </div>
</template>

<script >
import logo from './logo-selected.vue'

export default{
  data(){
    return {
      message:"",           //最终搜索的内容
      defaultMessage:"",   //默认输入的内容
      tipData:[],         //提示消息的数据
      selectIndex:0,
      logoIndex:0,
      flag:true,
      searchLogo:[{
        url:"https://www.so.com/s?ie=utf-8&shb=1&src=360sou_newhome&q="
      },
      {
        url:"https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd="
      },{
         url:"https://www.sogou.com/web?query="
      }]
    }
  },
  methods:{
    //获取提示信息数据
    getTip(event){
      this.message = event.target.value;
      this.defaultMessage = this.message;
      //vue-resource用jsonp跨域获取数据
      this.$http.jsonp("https://sug.so.360.cn/suggest?encodein=utf-8&encodeout=utf-8&word="+this.message).then(function(text){
        this.tipData= text.data.s;
      });
    },
    //键盘上下移动改变index
    selectKey(index){
      var len = this.searchData.length;
      if(this.selectIndex + index < 0) {
        this.selectIndex = len ;
      }
      this.selectIndex = (this.selectIndex + index) % len;
    },
    //鼠标移动改变index
    selectMouse(index){
      this.selectIndex = index;
    },
    //打开搜索的页面
    searchStart(){
      window.open(this.searchLogo[this.logoIndex].url + this.message)
    },
    //获取子组件logo的index
    getIndex(index){
      this.logoIndex = index;
    },
    //清除搜索内容和提示内容
    clear(){
      this.message = "";
      this.tipData = [];
    },
    //异步推迟焦点事件,防止点击的同时触发失去焦点事件,导致失败
    changeFlag(flag){
      setTimeout(()=>{ this.flag = flag;},100)
    },
  },
  watch:{
    //监听index并改变搜索的内容
    selectIndex:function(val){
      this.message = this.searchData[val];
    }
  },
  computed:{
    //所要搜查的内容数据
    searchData(){
     return [this.defaultMessage,...this.tipData]
    },
  },
  components:{
    logo
  },
}
</script>

<style >

.search-component{
  text-align: center;
}

.search-input {
  display: inline-block;
  position: relative;
  width: 600px;
  height: 40px;
}
.search-input input{
  font:20px/40px "微软雅黑";
  box-sizing: border-box;
  border:0.5px solid #c4c4c4;
  width: 500px;
  height: 40px;
  text-indent:20px
}
.search-reset{
  position: absolute;
  font:bold 22px "微软雅黑";
  top:5px;
  left:480px;
  cursor:pointer;
}
.search-start {
  float: right;
  font:18px/40px "微软雅黑";
  width:100px;
  height: 40px;
  background-color:#726dd1;
  color: #fff;
  vertical-align: bottom;
  cursor: pointer;
}
.search-tip {
  position: absolute;
  top:40px;
  left:0;
  padding:0;
  margin: 0;
  box-sizing: border-box;
  border: .5px solid #c4c4c4;
  text-align: left;
}
.search-tip .hover{
  background: #EFEFEF;
}
.search-tip li{
  list-style: none;
  font:18px/30px "微软雅黑";
  width: 499.5px;
  height:30px;
  padding-bottom: 5px;
  background: #fff;
  text-indent: 20px;
  transition: all .5s;
  cursor: pointer;
}

.list-enter,.list-leave-active {
    opacity: 0;
    transform: translateY(40px)
}
.list-leave-active {
  position: absolute;
}
</style>
