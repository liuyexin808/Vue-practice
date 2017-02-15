<template>
  <div id="app">
    <header class="header">
      <h1 class="header-title">问卷管理</h1>
      <div class="header-nav">
        <router-link to="/manage">我的问卷</router-link>
      </div>
    </header>
    <div class="content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$router.push('manage')
  }
}
</script>

<style lang='scss'>
@import './common/scss/mixin';
  $bc: #EE7419;
  .header {
    position: fixed;
    line-height: 45px;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 45px;
    background-color: $bc;
    color: #fff;
    z-index: 80;

    .header-title {
      display: inline-block;
      margin-left: 12.5%;
      font-size: 20px;
      &::before {
        display: inline-block;
        line-height: 20px;
        text-align: center;
        content: '?';
        height: 20px;
        width: 20px;
        border-radius: 50%;
        color: $bc;
        background-color: #fff;
        margin-right: 5px;
      }
    }

    .header-nav {
      display: inline-block;
      margin-left: 4%;
    }
  }
  .content {
    width: 1055px;
    margin: 125px auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 6px rgba(0,0,0,.5);
    @media only screen and (max-width:737px) {
      width: 90%;
      .manage {
        font-size: 14px;
        .list-header{
          .item {
            font-size: 16px;
            padding: 5px 0;
          }
          .btn {
            @include bd(75px,25px)
          }
        }
        .list-content {
          .text {
            padding: 10px 0;
            &:last-child {
              font-size:0;
            }
            &:nth-child(2) {
              width: 30%;
            }
            &:nth-child(3){
              width: 100px
            }
          }
        }
        .list-foot {
          .all-select {
            padding: 10px 0
          }
        }
        .btn {
          @include bd(65px,25px);
          font-size: 10px;
          margin: 0;
        }
      }
    }
  }
</style>

