<template>
    <div id="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
import betterScroll from 'better-scroll'
export default {
    name: 'scroll',
    props: {
        handleToScroll: {
            type: Function,
            default: function(){}
        },
        handleToEnd: {
            type: Function,
            default: function(){}
        }
    },
    mounted () {
        this.$nextTick(() => {
				var scroll = new betterScroll(this.$refs.wrapper, {
								tap : true,
                                probeType: 1
                })
                this.scroll = scroll
                scroll.on('scroll', (pos) => {
                    this.handleToScroll(pos)
                })
                scroll.on('touchEnd', (pos) => {
                    this.handleToEnd(pos)
                })
		})
    },
    methods: {
        toScrollTop(y){
            this.scroll.scrollTo(0, y)
        }
    }
}
</script>
<style scoped>
#wrapper{height: 100%;}
</style>