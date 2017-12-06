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
      width:30px;height: 30px;
      background-size: 30px 30px;
      background-repeat: no-repeat;
      margin-right: 8px;
    }
	.active{
		background:url('./star36_on@2x.png');
	}
    .off{
    	background: url('./star36_off@2x.png');
    }
</style>