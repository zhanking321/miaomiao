<template>
    <div id="detailContainer" class="slide_enter">
        <header id="header" :class="isFixed? 'fixed3' : ''">
			<i class="iconfont icon-right" @touchstart="handleToBack"></i><h1>影片详情</h1>
		</header>
        <loading v-if="isLoading"></loading>
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.poster" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{detailMovie.name}}</h2>
						<p>{{detailMovie.nation}}</p>
						<p>{{detailMovie.category}}</p>
						<p>中国大陆 / {{detailMovie.runtime}}分钟</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{detailMovie.synopsis}}</p>
			</div>
            <p style="padding-left:10px">演职人员</p>
			<div class="detail_player swiper-container">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(data, index) in detailMovie.actors" :key="index">
						<div>
							<img :src="data.avatarAddress" alt="">
						</div>
						<p>{{data.name}}</p>
						<!-- <p>{{data.role}}</p> -->
					</li>
				</ul>
			</div>
            <p style="padding-left:10px">剧照</p>
			<div class="detail_player swiper-container">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(data,index) in detailMovie.photos" :key="index">
						<div>
							<img :src="data" alt="">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import Header from '@/components/Header'
export default {
    name: "detail",
    data(){
        return {
            detailMovie: {},
            isFixed: false,
            isLoading: true
        }
    },
    props: ["id"],
    methods: {
        handleToBack(){
            this.$router.back()
        },
        handleScroll () {
            var top = 50
            if (document.documentElement.scrollTop >= top) {
                this.isFixed = true
            } else {
                this.isFixed = false
            }
        }
    },
    mounted() {
        // window.onscroll = this.handleScroll
        this.axios({
            url: `https://m.maizuo.com/gateway?filmId=${this.id}&k=5319310`,
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596859969114795885887490","bc":"310100"}',
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res => {
            console.log(res.data)
            if(res.data.msg == 'ok'){
                this.isLoading = false
                this.detailMovie = res.data.data.film
                this.$nextTick(() => {
                    new Swiper('.detail_player' , {
                        slidesPerView : 'auto',
                        freeMode : true,
                        freeModeSticky: true
                    });
                })
            }
        })
    }
}
</script>
<style scoped>
#header{width:100%; height:50px; color: #fff; background: #e54847; border-bottom: 1px solid #e54847; position: relative;}
#header h1{ font-size: 18px; text-align: center; line-height: 50px; font-weight: normal; }
#header i{ position: absolute; left: 5px; top: 50%; margin-top: -13px; font-size: 26px;}
#detailContainer{background: white; z-index: 100; position: absolute; left: 0; top: 0; width: 100%; min-height: 100%;}
.slide_enter{animation: .3s slideMove;}
@keyframes slideMove{
    0% {transform: translateX(100%);}
    100% {transform: translateX(0);}
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: url(/images/movie_1.jpg) 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
.fixed3{ position: fixed; top: 0; left: 0;}
</style>