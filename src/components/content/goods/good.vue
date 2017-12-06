<template>
	<div class="goods" >
		<div class="menu-wrapper" ref='menu'>
			<ul >
				<li v-for='(item,index) in goods' class="menu-item" 
				:class='{scrollActive:index===currentIndex}'
				 @click='menuClick(index)'>
					<span class="menu-text">{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref='goods'>
			<ul >
				<li v-for='(item,index) in goods' class="goodsList heightList"
				>
					<div class='good-title'>{{item.name}}</div>
					<ul>
						<li v-for='(food,index) in item.foods' class="food-item">
							<div class="food-icon">
							   <img :src="food.icon" alt="">		
							</div>
							<div class="content">
								<div class="food-name">{{food.name}}</div>
								<div class="food-description" 
								v-show='food.description'>{{food.description}}</div>
								<div class="extra">
									<span>月售{{food.sellCount}}</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now-price">￥{{food.price}}</span>
									<span v-show='food.oldPrice' class="old-price">
									￥{{food.oldPrice}}</span>
								</div>
                <div class="cartCount-wrapper">
                   <cart-count @sendCount='setSelectedFoods' :foodName='food.name'
                   :goodName='item.name'></cart-count>
                </div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
    <shopcart :deliveryPrice='seller.deliveryPrice' 
    :minPrice='seller.minPrice' :selectedFoods='selectedFoods'></shopcart>
	</div>
</template>
<style scoped>
    .goods{
        display: flex;
        position: absolute;
        width: 100%;
        top: 174px;
        bottom: 64px;
        overflow: hidden;
    }
	.menu-wrapper{
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.menu-item{
		display: table;
		width: 100%;height: 54px;
        line-height: 14px;
        margin: 0 auto;
        border-bottom: 1px solid rgba(7,17,27,0.2)
	}
	.menu-text{
		width:56px;
		display: table-cell;
		vertical-align: middle;
		font-size: 12px;
		text-align:center;
	}
	.icon{
		display: inline-block;
		width: 12px;height: 12px;
		background: url('./special_3@2x.png');
		background-size:12px 12px;
		background-repeat: no-repeat; 
	}
	.good-title{
		height: 26px;
		line-height: 26px;
		font-size: 12px;
		color:rgb(147,153,159);
		line-height: 26px;
		background: #f3f7f9;
		padding-left: 14px;
		border-left: 2px solid #d9dde1;
	}
	.goodsList{
		padding:1px 0;
	}
	.food-item{
		display: flex;
		margin: 18px 0;
		padding-bottom: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.food-icon{
		flex: 0 0 57px;
		width: 57px;
		margin:0 10px 0 18px;
		height: 57px;
	}
	.food-icon img{
		width: 100%;height: 100%;
	}
	.content{
		flex: 1;
    position: relative;
	}
	.food-name{
		font-size: 14px;
		line-height: 14px;height: 14px;
		color: rgb(7,17,27);
		margin-bottom: 8px;
	}
	.food-description{
		font-size: 10px;
		height: 14px;line-height: 14px;
		color:rgb(147,153,159);
		margin-bottom: 8px;
	}
	.extra{
		font-size: 10px;
		height: 12px;line-height: 12px;
		color:rgb(147,153,159);
	}
	.price{
		font-size: 12px;
		font-weight: 700px;
		line-height: 14px;
		height: 14px;
		margin-top: 4px;
	}
	.now-price{
        font-size: 14px;
        color:rgb(255,10,10);
	}
	.old-price{
		margin-left: 8px;
		color: rgb(147,153,159);
	}
  .cartCount-wrapper{
    position: absolute;
    right: 0;bottom: 0;
/*    width: 60px;height: 60px;*/
  }
	.scrollActive{
		font-weight: 700;
		background: #fff;
	}
</style>
<script>
import Bscroll from 'better-scroll'
import shopcart from './shopCart/shopCart.vue'
import cartCount from './cartCount/cartCount.vue'
import vue from 'vue'
	export default {
		props:{
		   
		},
	  created(){
        this.$http.get('/api/db.json')
        .then( (res) => {
          this.goods = res.body.goods
          this.seller = res.body.seller
          this.$nextTick( () => {
          this.initScroll()
          this.initHeightList()
       })
        }, (res) => {
          console.log('get Error')
        })	  
		},
    // mounted(){
    //      this.$nextTick( () => {
    //       this.initScroll()
    //       this.initHeightList() 
    //      })       
    // },
    components:{shopcart,cartCount},
		methods:{
		   initScroll(){
              this.menuScroll = new Bscroll(this.$refs.menu,{
              	click:true
              })
              this.goodScroll = new Bscroll(this.$refs.goods,{
                click:true,
              	probeType:3
              })
              this.goodScroll.on('scroll',(pos) => {
                   this.scrollY = Math.abs(Math.round(pos.y))
              })  
		   },
           initHeightList(){
           	  let goodItem = this.$refs.goods.getElementsByClassName('heightList')
              let height = 0
              this.heightList.push(height)
              for(let i = 0;i<goodItem.length;i++){
              	height += goodItem[i].clientHeight
              	this.heightList.push(height)
              }
           },
           menuClick(index){
           	let height = this.heightList[index]

           	// this.scrollY = height
           	let goodItem = this.$refs.goods.getElementsByClassName('heightList')
           	let el = goodItem[index]
           	this.goodScroll.scrollToElement(el,300)
           },
           setSelectedFoods(count,goodName,foodName){
                // let theFood = {}
                this.goods.forEach( (good) => {
                  if(good.name === goodName){
                    good.foods.forEach( (food) =>{
                      if(food.name === foodName){
                        vue.set(food,'count',count)
                      }                 
                    })
                   } 
                 })                  
           }
		},
		computed:{
			currentIndex(){
                 for(let i = 0;i<this.heightList.length;i++){
                 	let height1 = this.heightList[i]
                 	let height2 = this.heightList[i+1]
                 	if(!height2 || (this.scrollY>=height1 && this.scrollY<height2))
                 		return i
                 }
                 return 0
			},
      selectedFoods(){
        let foods = []
        this.goods.forEach( (good) => {
          good.foods.forEach( (food) => {
              if(food.count)
                foods.push(food)
          })
        })
        return foods
      }
		},
		data(){
			return {
				heightList:[],
				scrollY:0,
        goods:[],
        seller:{}
      }
    }
  }
</script>