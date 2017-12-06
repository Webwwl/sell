<template>
  <div id="app">
    <sell-head></sell-head>
    <div class="nav">
      <router-link to='/goods'>商品</router-link>
      <router-link to='/comment'>评价</router-link>
      <router-link to='/seller'>商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import sellHead from './components/header/head.vue'
// import sellData from '../data.json'
export default {
  name: 'app',
  components:{sellHead},
  created(){
          this.$http.get('/api/db.json')
          .then(res => {
            this.data = res.body
            console.log(res.body)
          },res => {
            console.log('resource err')
          })
         },
  data(){
    return {
         data:{}
    }
  },  
  mounted(){
    // console.log(this.data)
  }
}
</script>

<style>
.nav .active{
  color: rgb(240,20,20)
}
.nav{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  position:relative;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}

.nav a{
  flex: 1;
  display: block;
  text-align:center;
  font-size: 14px;
  color:rgb(77,85,93);
}





/**
 * Eric Meyer's Reset CSS v2.0 (http://meyerweb.com/eric/tools/css/reset/)
 * http://cssreset.com
 */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: normal;
    vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, menu, nav, section {
    display: block;
}

body {
    line-height: 1;
}

blockquote, q {
    quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

/* custom */
a {
    color: #7e8c8d;
    text-decoration: none;
    -webkit-backface-visibility: hidden;
}

li {
    list-style: none;
}

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

::-webkit-scrollbar-track-piece {
    background-color: rgba(0, 0, 0, 0.2);
    -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:vertical {
    height: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:horizontal {
    width: 5px;
    background-color: rgba(125, 125, 125, 0.7);
    -webkit-border-radius: 6px;
}

html, body {
    width: 100%;
    font-weight: 200;
    font-family: 'PingFang SC','STHeitiSC-Light';
}

body {
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
