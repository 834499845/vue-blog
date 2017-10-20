<template>
  <div id="app" class="views">
    <router-view class="view" keep-alive></router-view>
  </div>
</template>

<script>
  // require('/static/jia.js')
  import { mapActions, mapState } from 'vuex'
  export default {
    name: 'views',
    data() {
      return {
      }
    },
    created: function () {
      var self = this
      var varNum = sessionStorage.getItem('varNum')
      if (varNum == null) {
        self.getVisitNum({
        }).then((data) => {
          if (data.status == 200) {
            console.log('访客数增加成功')
          } else {
            console.log('访客数增加失败')
          }
        }).catch(msg => {
          console.log(msg)
        })
      } else {

      }
      sessionStorage.setItem('varNum', 112132)

    },
    mounted() {
    },
    methods: {
       ...mapActions(['getVisitNum'])
    }
  }

</script>
<style>
  a {
    text-decoration: none;
  }
  
  [v-cloak] {
    display: none;
  }
  
  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    list-style: none;
  }
  
  .mint-button {
    height: 5rem;
  }
  
  p {
    margin: 0;
    padding: 0;
  }
  
  a,
  button,
  input,
  optgroup,
  select,
  textarea,
  div {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  body,
  html {
    margin: 0;
    padding: 0;
    font-family: "Microsoft YaHei", Arial, "Helvetica Neue", Helvetica, sans-serif;
    /*background: url('/static/img/timg.jpg') no-repeat;
    background-size: 100% 100%;
    background-position: center center;*/
    background-color: #f5f8f9 !important;
    min-width: 370px;
    height: 100%;
  }
  
  input,
  textarea {
    -webkit-appearance: none;
    outline: none;
  }
  
  a,
  img {
    -webkit-touch-callout: none;
  }
</style>