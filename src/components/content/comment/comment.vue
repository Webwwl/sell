<template>
	<div class="comment">
		<div class="comprehensive">
			<div class="comprehensive-left">
				<div class="count">{{seller.score}}</div>
				<div class="count-des">综合评分</div>
				<div class="rankRate">高于周边{{seller.rankRate}}%商家</div>
			</div>
			<div class="comprehensive-right">
				<div class="service">
					<span>服务态度</span>
					<span class="score">{{seller.serviceScore}}分</span>
					<!-- span class="star-wrapper">
						<star :score='seller.serviceScore'></star>
					</span> -->
				</div>
				<div class="delivery">
					<span>配送时间</span>
					<span class="score">{{seller.foodScore}}分</span>
					<!-- <span class="star-wrapper">
						<star :score='seller.serviceScore'></star>
					</span> -->
				</div>
				<div class="deliveryTime">
					送达时间
					<span class="score">{{seller.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
		<div class="space"></div>
		<div class="chooseType">
			<span class="all" @click= 'showList = allList'>全部</span>
			<span class="yes" @click= 'showList = yesList'>满意</span>
			<span class="no" @click= 'showList = noList'>不满意</span>
		</div>
		<div class="showList">
			<ul>
				<li v-for='item in showList' class="rate">
					<div class="buyer">
						<div class="avatar">
							<img :src="item.avatar" alt="">
						</div>
						<div class="message">
							<p>{{item.username}}</p>
							<p>{{item.rateTime}}</p>
						</div>
					</div>
					<div class="text">
						{{item.text}}
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import star from './star/star.vue'
	export default {
		data(){
			return {
				db:{},
				showList:[]
			}
		},
		// props:{
		// 	db:{
  //              type:Object
		// 	}
		// },
		components:{star},
		created(){
			  // this.$nextTick( () => {
			  // 	this.$http.get('/api/db')
		   //      .then( (res) => {
     //                this.db = res.body
		   //      }, (res) => {
		   //        console.log('resource err')
		   //      })
			  // })  
			  this.$http.get('/api/db.json')
		        .then( (res) => {
		        	console.log('comment ok')
                    this.db = res.body
                    this.showList = this.allList 
		        }, (res) => {
		          console.log('resource err')
		        }) 

	      },
		computed:{
			allList(){
				return this.db.ratings
			},
			yesList(){
				let arr = []
				arr = this.db.ratings.filter( (rate) => {
					return rate.rateType === 0
				})
				return arr
			},
			noList(){
				let arr = []
				arr = this.db.ratings.filter( (rate) => {
					return rate.rateType === 1
				})
				return arr
			},
			seller(){
				return this.db.seller
			}
		}
	}
</script>
<style scoped>
    .comprehensive{
    	width: 100%;
    	display: flex;
    	padding: 18px 0;
    }
	.comprehensive-left{
         flex: 0 0 132px;
         width: 132px;
         text-align: center;
         border-right: 1px solid rgba(130, 32, 32, 0.38);
	}
	.count{
		font-size: 24px;
		line-height: 28px;
		color: rgb(255,153,0);
		margin-bottom: 6px;
	}
	.count-des{
		font-size: 12px;
		line-height: 12px;
		margin-bottom: 8px;		
		color:rgb(7,17,27);
	}
	.rankRate{
		font-size: 10px;
		line-height: 10px;
		color: rgba(7,17,27,0.4);
	}
	.comprehensive-right{
          flex: 1;
          font-size: 12px;
          list-style: 18px;
          padding: 0 0 0 24px;
	}
	.score{
		    margin: 0 0 0 32px;
            color: rgb(255,153,0)
	}
	.service{
		margin:4px 0 8px 0;
	}
	.delivery{
		margin-bottom: 8px;
	}
	.star-wrapper{
		display: inline-block;
	}
	.space{
		height: 16px;
		background: rgba(7,17,27,0.2);
	}
	.chooseType{
		height: 64px;
        border-bottom: 1px solid rgba(7,17,27,0.2);
	}
	.chooseType span{
		display: inline-block;
		height: 20px;line-height: 20px;
		margin:18px 6px 0 18px;
		padding: 8px 12px;
		font-size: 16px;
		margin-top: 10px;
		text-align: center;	
		border-radius: 7px;
	}
	.all{
		background: #00a0dc;
	}
	.yes{
		background: #ccecf8;
	}
	.no{
		background: #e9ebec;
	}
	.choose{
		color:#fff;
	}
	.rate{
		border-bottom: 1px solid rgba(7,17,27,0.1);
		padding-bottom: 18px;
	}
	.buyer{
		display: flex;
	}
	.avatar{
		flex: 0 0 28px;
		width: 28px;height: 28px;
		display: inline-block;
		margin: 18px 12px 0 18px;
	}
    .avatar img{
    	width: 28px;height: 28px;
    }
    .message{
    	flex: 1;
    	padding: 18px 0 0 0;
    }
    .message p{
    	margin-bottom: 0;
    }
    .text{
    	font-weight: 700;
    	padding: 6px 0 0 58px;
    }
</style>