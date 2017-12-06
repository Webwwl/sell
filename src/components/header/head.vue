<template>
	<div class="header" >
		<div class="wrapper">
            <div class="avatar">
                <img :src="seller.avatar" alt="" v-if='seller'>       	
            </div>
            <div class="context">
            	<div class="title">
            		<span class="brand"></span>
            		<span class="name">{{seller.name}}</span>
            	</div>
            	<div class="description">
            		{{seller.description}}/{{seller.deliveryTime}}分钟送达
            	</div>
            	<div class="support" v-if='seller.supports'>
            		<span class="icon" :class='imgClass[seller.supports[0]
            		.type]'></span>
            		<span class="text">{{seller.supports[0].description}}</span>
            	</div>
            	<div class="count" @click='toggleShow'>
            		{{seller.supports.length}}个
            	</div>
            </div>
		</div>
		<div class="bulletin" @click='toggleShow'>
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
		</div>
		<div class="background">
			<img :src="seller.avatar" alt="" >
		</div >
		<transition name='detail'>
		<div class="detail" v-show='showDetail'>
			<div class="detail-wrapper">
				<div class="detail-main">
					<p>{{seller.name}}</p>	
 					<div class="star-wrap">
					<star :score='seller.score'></star>
					</div>	
					<div class="ac-title">
						<div class="line"></div>
						<div class="title-text">优惠信息</div>
						<div class="line"></div>
					</div>
					<div class="activityList">
				     <ul>
				     	<li v-for='(item,index) in seller.supports'>
				     	<img :class='imgClass[index]' alt="">
				     		{{item.description}}
				     	</li>
				     </ul>
					</div>
					<div class="sellerNotice">
						<div class="line"></div>
						<div class="title-text">
						   商家公告
						</div>
						<div class="line"></div>
					</div>
					<p class="detail-bulletin">
						{{seller.bulletin}}
					</p>
				</div>
			</div>
			<div class="detail-cancel" @click='showDetail=!showDetail'>
				X
			</div>
		</div>
		</transition>
	</div>
</template>
<script>
import star from '../header/star/star.vue'
	export default {
		 components:{
		 	star
		 },
         created(){
           this.$http.get('/api/db.json')
           .then( (res) =>{
            this.seller = res.body.seller
           },(res) => {
            console.log('get Error')
           })
         },
         data(){
         	return {
         		imgClass:['decrease','discount','special','ticket','safe'],
         		showDetail:false,
                seller:{}
         	}
         },
         methods:{
         	toggleShow(){
         		this.showDetail = !this.showDetail
         	}
         }
	}
</script>
<style scoped>
    .detail-enter-active,.detail-leave-active{
    	transition: all 1s ease;
    }
    .detail-enter{
    	opacity: 0;
    }
    .detail-enter-to{
    	opacity: 1;
    }
    .detail-leave-to{
    	opacity: 0;
    }
    .header{
    	position: relative;
    	background: rgba(7,17,27,0.5);
    	overflow: hidden;
    }
	.wrapper{
		color:#fff;
		width: 100%;
        padding: 24px 0 8px 0;
    	position: relative;
	}
	.avatar{
		width: 64px;height: 64px;
		display: inline-block;
		vertical-align: top;
		margin-left: 24px;
	}
	.avatar img{
		width:64px;height: 64px;
		border-radius: 2px;
	}
    .context{
    	display: inline-block;
    	padding-left: 16px;

    }
     .title{
    	font-weight: bold;
    	font-size: 16px;
    	padding: 2px 6px 8px 0;
    }
    .title .brand{
    	display: inline-block;
    	width: 30px;height: 18px;
    	background-image: url('./brand@2x.png');
    	background-size: 30px 18px;
    	background-repeat: no-repeat;
    	vertical-align: top;
    }
    .title .name{
        font-size: 16px;
        font-weight: bold;
        line-height: 18px;
    }
    .description{{
        	font-size: 12px;
        	line-height:12px;
        	margin-bottom: 10px; 
        }
        
        .support .icon{
        	width:12px;height: 12px;
        	display: inline-block;
        	margin: 0 4px 2px 0;
        	background-size: 12px 12px;
        	background-repeat: no-repeat;
        	vertical-align: bottom;
        }
        .support .text{
        	font-size: 10px;
        	line-height: 12px;
        	vertical-align: top;
        }}
    .count {
    	position: absolute;
    	right: 12px;bottom: 18px;
    	padding: 5px;
    	height: 24px;
    	background: rgba(0,0,0,0.2);
    	text-anchor: center;
    	font-size: 10px;
    	border-radius: 10px;
    	line-height: 25px;;
    }
    .decrease{
    	background: url('./decrease_1@2x.png');
    }
    .discount{
    	background: url('./discount_1@2x.png');
    }
    .special{
    	background: url('./special_1@2x.png');
    }
    .ticket{
    	background: url('./invoice_1@2x.png');
    }
    .safe{
    	background: url('./guarantee_1@2x.png');
    }
    .bulletin{
    	height:28px;
    	line-height: 28px;
    	padding: 0 12px 10px 12px;
    	color:#fff; 
    }
    .bulletin-title{
    	width:12px;height: 12px;
    	display: inline-block;
    	background-image: url('./brand@2x.png');
    	margin-bottom: 6px;
    	background-size: 12px 12px;
    }
    .bulletin-text{
    	width:90%;
    	display: inline-block;
    	white-space: nowrap;
    	overflow: hidden;
    	text-overflow: ellipsis;
    	line-height: 28px;
    	height: 28px;
    	margin-top: 8px;
    }
    .background{
    	position: absolute;
    	width: 100%;height: 100%;
    	z-index: -1;
    	left: 0;top: 0;
    	filter:blur(10px);
    }
    .background img{
    	width: 100%;height: 100%;
    }
    /*浮层*/
    .detail{
    	position: fixed;
    	z-index: 200;
    	width: 100%;height: 100%;
    	top: 0;
    	background: rgba(7,17,27,0.8);
    	filter: (10px);
    	overflow: auto;
    	color:#fff;
    	font-weight: bold;
    }
    .detail-wrapper{
    	min-height: 100%;
    	padding-top: 1px;
    }
    .detail-main{
    	margin-top: 64px;
    	padding-bottom: 64px;
    }
    .detail p{
    	font-size: 20px;
    	text-align: center;
    }
    .star-wrap{
    	text-align: center;
    	padding: 16px 0 28px 0;
    }
    .ac-title{
    	display: flex;
    	width: 80%;
    	margin: 28px auto 24px auto ;
    	height: 24px;
    	line-height: 24px;
    }
    .line{
    	flex: 1;
    	border-bottom: 1px solid rgba(255,255,255,0.2);
    	top: -10px;
    	position: relative;
    }
    .title-text{
    	text-align: center;
    	padding: 0 12px;
    	line-height: 24px;
    }
    .activityList{
       width: 80%;
       margin: 0 auto;
    }
    .activityList img{
    	vertical-align: bottom;
    	width: 24px;height: 24px;
    	margin:0 6px;
    }
    .activityList li{
        margin-bottom: 12px;
        line-height: 26px;
    }
    .sellerNotice{
    	display: flex;
    	width: 80%;
    	margin: 28px auto 24px auto ;
    	height: 24px;
    	line-height: 24px;
    }
    p.detail-bulletin {
       font-size: 12px;
       line-height: 24px;
       width: 80%;
       margin: 0 auto;
       text-align:left;
    }
    .detail-cancel{
    	margin-top: -64px;
    	height: 64px;
    	line-height: 64px;
    	position: relative;
    	clear:both;
    	font-size: 32px;
    	color: rgba(255,255,255,0.5);
    	text-align: center;
    }
</style>