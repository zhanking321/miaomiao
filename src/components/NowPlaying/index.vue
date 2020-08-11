<template>
    <div class="movie_body cinema" ref="movie_body" id="mbody">
		<loading v-if="isLoading"></loading>
		<scroller v-else :handleToScroll='handleToScroll' :handleToEnd='handleToEnd'>
				<ul>
					<li class="pullDown">{{pullDownMsg}}</li>
					<li v-for="data in datalist" :key="data.filmId">
						<div class="pic_show" @tap='handleTab()'><img :src="data.poster"></div>
						<div class="info_list">
							<h2>{{data.name}} <img v-if="data.filmType.value == 2" src="@/assets/maxs.png"> </h2>
							<p v-if="data.grade">观众评分 <span class="grade">{{data.grade}}</span></p>
							<p v-else>暂无评分</p>
							<p>主演: {{ data.actors | actorFilter}}</p>
							<p>放映时长：{{ data.runtime }} 分钟</p>
						</div>
						<div class="btn_mall">
							购票
						</div>
					</li>
				</ul>
		</scroller>
	</div>
</template>
<script>
import Vue from 'vue'
Vue.filter ('actorFilter', function(data) {
	return data.map(item => item.name).join(" ")
})
export default {
	name: 'now',
	data () {
		return {
			datalist: [],
			pullDownMsg: '',
			isLoading: true,
			preCityId: -1
		}
	},
	methods: {
		handleTab(){
			console.log("aaa")	
		},
		handleToScroll(pos){
			if(pos.y > 10){
				this.pullDownMsg = '-------------------正在更新中-----------------'	
			}
		},
		handleToEnd(pos){
			if(pos.y > 10){
				this.axios({
					url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.city.cityId}&pageNum=2&pageSize=10&type=1&k=8040807`,
					headers: {
							'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596859969114795885887490"}',
							'X-Host': 'mall.film-ticket.film.list'
					}
				}).then(res => {
					this.pullDownMsg = '--------------------更新成功------------------'
					setTimeout(() => {
						this.datalist = res.data.data.films
						this.pullDownMsg = ''
					}, 1000)					
				})
			}
		}
	},
	activated () {
		var cityId = this.$store.state.city.cityId
		if(cityId == this.preCityId) {return}
		this.isLoading = true
		this.axios({
			url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=1&k=8040807`,
			headers: {
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596859969114795885887490"}',
				'X-Host': 'mall.film-ticket.film.list'
			}
		}).then(res => {
			this.datalist = res.data.data.films
			this.isLoading = false
			this.preCityId = cityId
			console.log(cityId)
			/* this.$nextTick(() => {
				var scroll = new betterScroll(this.$refs.movie_body, {
								tap : true,
								probeType: 1
				})
				scroll.on('scroll', (pos) => {
					if(pos.y > 10){
						this.pullDownMsg = '-------------------正在更新中-----------------'	
					}
					
				})
				scroll.on('touchEnd', (pos) => {
					if(pos.y > 10){
						this.axios({
							url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=2&pageSize=10&type=1&k=8040807',
							headers: {
								'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596859969114795885887490"}',
								'X-Host': 'mall.film-ticket.film.list'
							}
							}).then(res => {
								this.pullDownMsg = '--------------------更新成功------------------'
								setTimeout(() => {
									this.datalist = res.data.data.films
									this.pullDownMsg = ''
								}, 1000)
									
							})
					}
				})
			}) */
			
		})
  	}
}
</script>
<style scoped>
.movie_body{ height: 520px; overflow: auto;}
.movie_body ul{ margin:0 12px; overflow: hidden; }
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{ margin:0; padding:0; border:none;}
</style>