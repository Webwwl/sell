<template>
	<div class="star-wrapper">
		<span v-for='item in stars' 
		:class='item'></span>
	</div>
</template>
<script>
	export default{
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			stars(){
				let starArr = []
				for(let i = 0;i<Math.floor(this.score);i++)
					starArr.push('active')
				while(starArr.length<5){
					starArr.push('off')
				}
				console.log(starArr)
				console.log(this.score)
				return starArr
			}
		}
	}
</script>
<style scoped>
    span{
      display: inline-block;
      width:24px;height: 24px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      margin-right: 4px;
    }
	.active{
		background:url('./star36_on@2x.png');
	}
    .off{
    	background: url('./star36_off@2x.png');
    }
</style>