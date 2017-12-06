<template>
	<div>
	   <div class="totality">
	   	   <p>{{seller.name}}</p>
	   	   <span class="star-wrapper">
	   	   	  <star :score='seller.score'></star>
	   	   </span>
	   	   <span class="monthCount">月售{{sellCountMonth}}</span>
	   </div>
	   <div class="base-message">
	   	   <ul>
	   	   	   <li>
	   	   	   	   <div class="messageType">起送价</div>
	   	   	   	   <div class="detailMessage">{{seller.minPrice}}</div>
	   	   	   </li>
	   	   	   <li>
	   	   	   	   <div class="messageType">配送费</div>
	   	   	   	   <div class="detailMessage">{{seller.deliveryPrice}}</div>
	   	   	   </li>
	   	   	   <li class="deliveryTime">
	   	   	   	   <div class="messageType">平均配送时间</div>
	   	   	   	   <div class="detailMessage">{{seller.deliveryTime}}</div>
	   	   	   </li>
	   	   </ul>
	   </div>
	   <div class="space"></div>
	   <div class="noticeAndActivity">
	   	    <h3>公告和活动</h3>
	   	    <p>{{seller.bulletin}}</p>
   	         <ul class="activityList">
   	         	<li v-for='(item,index) in seller.supports'>
   	         	<img :class='imgClass[index]' alt="">
   	         		{{item.description}}
   	         	</li>
   	         </ul>
	   </div>
	   <div class="space"></div>
	   <div class="sellerView">
	   	  
	   </div>
	   <div class="sellerMessage">
	   	  <h2>商家信息</h2>
	   	  <ul>
	   	  	<li v-for='item in seller.infos'>
	   	  		<p>{{item}}</p>
	   	  	</li>
	   	  </ul>
	   </div>
	</div>
</template>
<script>
import star from './star/star.vue'
	export default {
		created(){
		        this.$http.get('/api/db.json')
		        .then(res => {
		          this.seller = res.body.seller
		          this.goods = res.body.goods
		        },res => {
		          console.log('resource err')
		        })
		       },
		components:{star},
		computed:{
			sellCountMonth(){
				let count = 0
				this.goods.forEach( (good) => {
					good.foods.forEach( (food) =>{
						count += food.sellCount
					})
				})
				return count
			}
		},
		data(){
			return {
				imgClass:['decrease','discount','special','ticket','safe'],
				seller:{},
				goods:[]
			}
		}
	}
</script>
<style rel='stylesheet/sass' lang='sass' scoped>
    @import ../../../assets/css/common.sass
    .totality
      p
        font-size: 16px
        line-height: 18px
        margin: 18px 0 8px 18px
      span.star-wrapper
        display: inline-block
        margin: 0 8px 18px 18px
      .monthCount
        color:rgba(7,17,27,0.4)
    .base-message
      width: 90%
      margin: 0 auto
      ul
        width: 100%
        margin-top: 18px
        li
          display: inline-block
          width: 32%
          border-right: 1px solid rgba(7,17,27,0.4)
          .messageType
            text-align: center
            font-size: 10px
            line-height: 10px
            color: rgb(147,153,159)
            margin-bottom: 4px
          .detailMessage
            text-align: center
            font-size: 24px
            font-weight: 300
            line-height: 24px
            color: rgb(7,17,27)
        .deliveryTime
          border-right: none
    .space
      height: 18px
      background: rgba(7,17,27,0.2)
      margin-top: 18px
    .noticeAndActivity
      h3
        font-size: 20px
        margin: 18px 0 8px 18px
        font-weight: 500
      p
        width: 80%
        margin: 0 auto
        font-size: 12px
        line-height: 24px
        width: 85%
        color: rgb(240,20,20)
        margin-top: 16px
        padding: 0 18px
      .activityList
        padding: 0 0 0 18px
        margin-top: 18px
        img
          width: 24px
          height: 24px
          background-repeat: no-repeat
          vertical-align: bottom
        li
          font-size: 16px
          line-height: 16px
          padding: 16px 0
          border-top: 1px solid rgba(7,17,27,0.2)
    .sellerMessage
      width: 90%
      margin: 0 auto
      color: rgb(7,17,27)
      h2
        font-size: 18px
        padding: 18px 0 12px 12px
        font-weight: 500
        color: #000
      li
        border-top: 1px solid rgba(7,17,27,0.2)
        padding: 8px 0
      p
        line-height: 24px   
</style>