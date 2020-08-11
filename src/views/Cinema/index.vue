<template>
    <div id="main">
        <Header title="喵喵影院"></Header>
        <div id="content">
			<div class="cinema_menu" :class="isFixed? 'fixed' : ''">
				<div class="city_switch">
					全城 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="brand_swtich">
					品牌 <i class="iconfont icon-lower-triangle"></i>
				</div>
				<div class="feature_switch">
					特色 <i class="iconfont icon-lower-triangle"></i>
				</div>
			</div>
            <CiList/>
        </div>
        <TabBar></TabBar>
    </div>
</template>
<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import CiList from '@/components/CiList'
export default {
    name: 'cinema',
    data () {
        return {
            isFixed: false
        }
    },
    components: {
        Header,
        TabBar,
        CiList
    }, methods: {
        handleScroll () {
        var top = 50
        if (document.documentElement.scrollTop >= top) {
            this.isFixed = true
        } else {
            this.isFixed = false
        }
        }
    },
    mounted () {
        window.onscroll = this.handleScroll
    }
}
</script>
<style scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
.fixed{ position: fixed; top: 0; left: 0;}
</style>
