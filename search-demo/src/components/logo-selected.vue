<template>
  <div class="logo-selected">
    <img :src="imgData[index].src">
    <span class="btn" @click="toggle"></span>
    <transition name="fade" v-cloak>
      <ul v-show="flag">
        <li
          v-for='(img,index) in imgData'
          @click="selectLogo(index)"
          >
          <img :src="img.src">
        </li>
      </ul>
    </transition>

  </div>
</template>

<script >
  export default {
    data(){
      return {
        index:0,
        flag:false,
        imgData:[{
          src:"src/assets/360_logo.png",
        },{
          src:"src/assets/baidu_logo.png",
        },{
          src:"src/assets/sougou_logo.png"
        }]
      }
    },
    methods:{
      //开关控制logo列表出现和消失
      toggle(){
        this.flag = !this.flag
      },
      //改变index并触发事件把参数传递给父组件
      selectLogo(index){
        this.index = index;
        this.toggle();
        this.$emit("get-index",this.index)
      }
    }
  }
</script>




<style >
.logo-selected {
  position: relative;
  text-align: center;
}

.logo-selected .btn {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 14px solid black;
    position: absolute;
    cursor: pointer;
    top:65px;
}

.logo-selected ul {
  margin-bottom:10px;
  z-index: 1000;
  position: absolute;
  left:60%;
  top:60%;
}

.logo-selected li {
  list-style: none;
  border: 1px solid #c4c4c4 ;
  width:200px;
}

.logo-selected li img{
  width: 200px;
  height: 70px;
  background-color: #fff;
  vertical-align: bottom;
  transition: all 0.5s;
  cursor:pointer;
}
.logo-selected li img:hover{
  background-color: #dbdddd;
}
.fade-enter,.fade-leave-active{
  opacity: 0;
  margin-top:12px;
}
.fade-enter-active,.fade-leave-active{
 transition: all 0.5s

}
</style>