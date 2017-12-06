<template>
	<div class="cartCount">
		<transition name='slide' >
		<div class="decrease iconfont icon-minus" @click='decrease'
		v-show='count>0'></div>
		</transition>
		<transition name='slide' >
		<div class="count " v-show='count>0'>{{count}}</div>
	  </transition>
		<div class="add iconfont icon-add" @click='addCount'></div>
	</div>
</template>
<script>
import vue from 'vue'
	export default {
		props:{
			foodName:{
				type:String		
				},
			goodName:{
				type:String
			}
		},
		methods:{
			addCount(){
				this.count++
				this.$emit('sendCount',this.count,this.goodName,this.foodName)
			},
			decrease(){
				if(this.count>0){
					this.count--
					this.$emit('sendCount',this.count,this.goodName,this.foodName)
				}
			}
		},
		data(){
			return {
				count:0
			}
		}

	}
</script>
<style scoped>
    .slide-enter,.slide-leave-to{
    	transform: translateX(40px);
    	opacity: 0;
    }
    .slide-enter-active,.slide-leave-active{
    	transition: all 0.5s ease;
    }

	.decrease{
		display: inline-block;
		padding: 6px;
		background: url('./decrease.png');
		width: 20px;height: 20px;
		background-size: 20px 20px;
		background-repeat: no-repeat;
		background-position: center;
	}
	.count{
		display: inline-block;
		padding: 6px;
		width: 20px;height: 20px;
		line-height: 20px;
		font-size: 16px;
		vertical-align: top;
	}
	.add{
		display: inline-block;				
		padding: 6px;
		background: url('./add.png');
		width: 20px;height: 20px;
		background-size: 20px 20px;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>