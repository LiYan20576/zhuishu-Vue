<template>
	<view>
		<view class="title" v-for="item in chapter">
			<block v-if="item.isVip">
				<uni-notice-bar mode="link" :scrollable="false" :single="true" is-link color="#cccccc"
					:text="item.title" @click="typeHandler(item.link)" />
			</block>
			<block v-else>
				<uni-notice-bar mode="link" :scrollable="false" :single="true" :text="item.title" is-link
					@click="typeHandler(item.link)" />
			</block>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		bookChapter1URL,
		bookChapter2URL
	} from '@/utils/http.js'
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				chapter: [],
			}
		},
		onLoad: function(options) {
			this.id = options.id
			var _this = this;
			this.num = 20
			const eventChannel = this.getOpenerEventChannel()
			// eventChannel.on('acceptDataFromOpenerPage', function(data) {
			// 	console.log(data.data,'11111111111111111111')
			// 	_this.bookid = data.data

			// })
			this.getChapterData();

		},
		computed: {
			...mapState(['bookid'])

		},
		onReachBottom: function() {
			this.num += 20
			this.getChapterData();
			uni.showToast({
				title: `加载中`,
				icon: 'none',
				duration:5000
			})
		},
		methods: {
			...mapMutations(['addTourl']),
			async getChapterData() {
				console.log(`${bookChapter1URL}${this.bookid}${bookChapter2URL}`, '11111')
				const result = await requestGet(`${bookChapter1URL}${this.bookid}${bookChapter2URL}`);
				this.chapter = result.chapters.slice(0, this.num)
				console.log(result)
			},
			typeHandler: function(link) {
				var _this = this
				console.log(link, '123123123123')
				// console.log(link.length,'123123123123')
				if (link.length < 150) {
					this.addTourl(encodeURIComponent(link))
					uni.navigateTo({
						url: '/pages/content/content',
						events: {
							acceptDataFromOpenedPage: function(data) {
								console.log(data)
							},
							someEvent: function(data) {
								console.log(data)
							}
						},
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('acceptDataFromOpenerPage', {
								id: _this.bookid
							})
						}
					})
				} else {
					uni.showToast({
						title: `暂无资源`,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>

</style>
