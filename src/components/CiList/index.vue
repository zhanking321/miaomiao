<template>
    <div class="cinema_body">
		<loading v-if="isLoading"></loading>
		<scroller v-else>
				<ul>
					<li v-for="data in datalist" :key="data.cinemaId">
						<div>
							<span>{{data.name}}</span>
							<span class="q"><span class="price">{{data.lowPrice}}</span> 元起</span>
						</div>
						<div class="address">
							<span>{{data.address}}</span>
							<span>{{data.Distance.toFixed(1)}}5km</span>
						</div>
						<div class="card">
                			<div>小吃</div>
                			<div>折扣卡</div>
       					</div>
					</li>
					
				</ul>
		</scroller>
	</div>
</template>
<script>
export default {
	name: 'CiList',
	data () {
		return {
			datalist: [],
			isLoading: true,
			preCityId: -1
		}
	},
	activated () {
		var cityId = this.$store.state.city.cityId
		console.log(cityId)
		console.log(this.preCityId)
		if(cityId == this.preCityId) {return}
		this.isLoading = true
		this.axios({
			url: `https://m.maizuo.com/gateway?cityId=${cityId}&ticketFlag=1&k=8125285`,
			headers: {
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596859969114795885887490","bc":"440300"}',
				'X-Host': 'mall.film-ticket.cinema.list'
			}
			}).then(res => {
				this.datalist = res.data.data.cinemas
				// console.log(this.datalist)
				this.isLoading = false
				this.preCityId = cityId
				
				
			// this.$nextTick(() => {
			// 	/* eslint-disable no-new */
			// 	new BetterScroll('.cinema', {
			// 	scrollbar: {
			// 		fade: true,
			// 		interactive: false
			// 	}
			// 	})
			// })
			})
	}
}
</script>
<style scoped>
#content .cinema_body{ overflow:auto; height: 600px;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>