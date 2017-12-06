<template>
	<div class="shopCart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper" >
					<div :class='{logoHeighlight:totalCount>0}' class="logo" >
						<i class="logo-icon"></i>
						<div class="totalCount" v-show='totalCount>0'>{{totalCount}}</div>
					</div>
				</div>
				<div class="message">
					<div class="price" :class='{priceHeighlight:totalCount>0}'>
					     ￥{{totalPrice}}元
					</div>
					<div class="desc">
						配送费{{deliveryPrice}}元
					</div>
				</div>
			</div>
			<div class="content-right" :class='{payHeighlight:totalPrice>=0}'>
				<div class="pay" v-show='totalPrice<20'>
					{{minPrice}}元起送
				</div>
				<div class="decidePay" v-show='totalPrice>=20'>
					确认付款
				</div>
			</div>			
		</div>
	</div>
</template>
<script>
	export default{
		name:'shopCart',
		props:{
			deliveryPrice:{
				type:Number
			},
			minPrice:{
				type:Number
			},
			selectedFoods:{
				type:Array,
				default(){
					return [
					 {
					 	price:10,
					 	count:0
					 }
					]
				}
			}
		},
		computed:{
			totalPrice(){
				let price = 0
				this.selectedFoods.forEach( (food) => {
					price += food.price * food.count
				})
				return price
			},
			totalCount(){
				let count = 0
				this.selectedFoods.forEach( (food) => {
					count += food.count
				})
				return count
			}
		}
	}
</script>
<style scoped>
    .logo-wrapper .logoHeighlight{
    	color:#fff;
    }
    .message .priceHeighlight{
    	color: #fff;
    }
    .payHeighlight{
         background: #00b43c;
    	color: #fff;
    }
	.shopCart{
		position: fixed;
		left: 0;bottom: 0;
		height: 64px;width: 100%;
		z-index: 50;
	}
	.content{
		display: flex;
		background: #141d27;
		background: #000;
	}
	.content-left{
        flex: 1;
	}
	.logo-wrapper{
		display: inline-block;
        position: relative;
        top: -8px;
        padding: 6px;
        margin: 0 0 12px 0
        ;
        background: #000;
        border-radius: 50%;
        width:56px;height: 56px;
        vertical-align: top;  
	}
	.logo{
		margin: 0 auto;
		width: 44px;height: 44px;
		border-radius: 50%;
		background: #2b343c;
		text-align: center;
        background: url('./shopcart.png');
        background-size: 30px 30px;
        background-repeat: no-repeat;
        background-position: center;
	}
	.totalCount{
		width: 20px;height: 20px;
		position: absolute;
		right: 0;top: 0;
		background: red;
		border-radius: 8px;
		color: #fff;
		font-weight: 700;
		background: red;
		font-size: 13px;
        line-height: 16px
	}
	.logo-icon{
	   line-height: 44px;
       background: url('./shopping_cart.svg');
       background: #80858a;
	}
	.message{
		display: inline-block;
		line-height: 64px;
	}
	.price{
		display: inline-block;
		padding: 0 12px 0 0;
		margin: 12px 0;
		font-size: 16px;
		height: 20px;
		line-height: 20px;
		color:rgba(255,255,255,0.4);
		border-right: 1px solid rgba(255,255,255,0.2);
	}
	.desc{
		display: inline-block;
		padding: 0 12px;
		margin: 12px 0;
		font-size: 16px;
		height: 20px;line-height: 20px;
		color: rgba(255,255,255,0.4);
	}
	.pay{
		padding: 0 3px;
		margin-top: 22px;
		font-size: 16px;
		height: 20px;line-height: 20px;
		color: rgba(255,255,255,0.4);
	}
	.decidePay{
		padding: 0 3px;
		margin-top: 22px;
		font-size: 16px;
		height: 20px;line-height: 20px;
		color: rgba(255,255,255,0.4);
	}
	.content-right{
        flex: 0 0 100px;
        width: 100px;
        text-align: center;
	}
</style>