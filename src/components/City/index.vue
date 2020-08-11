<template>
<div class="cbody">
				<div class="city_list">
					<div class="city_hot">
						<h2>热门城市</h2>
						<ul class="clearfix">
							<li v-for="data in datalist.hotlist" :key="data.cityId">
								{{data.name}}
							</li>
						</ul>
					</div>
					<div class="city_sort" ref="city_sort">
						<div v-for="item in datalist.newlist" :key="item.index">
							<h2>{{ item.index }}</h2>
							<ul>
								<li v-for="data in item.list" :key="data.cityId">{{ data.name }}</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="city_index">
					<ul>
						<li v-for="(data, index) in datalist.newlist" :key="data.index" @touchstart='handleIndex(index)'>
							{{data.index}}
						</li>
					</ul>
				</div>
			</div>
</template>
<script>
export default {
	name: 'city',
	data () {
		return {
			datalist: {newlist:[], hotlist:[]}
		}
	},
	methods: {
		handleIndex (index) {
			var h2 = this.$refs.city_sort.getElementsByTagName('h2')
			this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
			console.log(this.$refs.city_sort.parentNode.scrollTop)
		},
		handleCity (citylist) {
			var letters = []
			for (var i = 65; i < 91; i++) {
				letters.push(String.fromCharCode(i))
			}
			var newlist = []
			var hotlist = []
			for (var j = 0; j < letters.length; j++) {
				var arr = citylist.filter(item => item.pinyin.substring(0, 1) === letters[j].toLowerCase())
				// console.log(arr)
				if (arr.length > 0) {
				newlist.push({
					index: letters[j],
					list: arr
				})
				}
			}
			hotlist = citylist.filter(item => item.isHot)
			return {newlist, hotlist}
			}
	},
	mounted () {
		this.axios({
			url: 'https://m.maizuo.com/gateway?k=8030594',
			headers: {
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596859969114795885887490","bc":"440300"}',
				'X-Host': 'mall.film-ticket.city.list'
			}
			}).then(res => {
			this.datalist = this.handleCity(res.data.data.cities)
			console.log(this.datalist)
			})
	}
}
</script>
<style scoped>
#content .cbody{ margin-top: 45px;  display: flex; width:100%; position: relative; top: -20px; bottom: 0px; height: 460px;}
.cbody .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.cbody .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.cody .city_hot{ margin-top: 20px;}
.cbody .city_hot h2{ padding-left: 15px; line-height: 50px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.cbody .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.cbody .city_sort div{ margin-top: 20px;}
.cbody .city_sort h2{ padding-left: 15px; line-height: 35px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.cbody .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.cbody .city_sort ul li{ line-height: 30px; line-height: 30px;}
.cbody .city_index{ width:20px; display: flex; flex-direction:column; /* justify-content:center; */ text-align: center; border-left:1px #e6e6e6 solid;}

</style>