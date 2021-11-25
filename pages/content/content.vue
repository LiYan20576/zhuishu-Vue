<template>
	<view>
		<view class="content">
			<text class="text">{{content.cpContent}}</text>
		</view>
		<block v-if="content.order==1">
			<uni-nav-bar right-text="下一章" @clickRight="onClickRight(content.order)">
				<view slot="title">
					<navigator open-type="navigateBack">
						<text>目录</text>
					</navigator>
				</view>
			</uni-nav-bar>
		</block>
		<block v-else>
			<uni-nav-bar left-text="上一章" right-text="下一章" @clickLeft="onClickLeft(content.order)"
				@clickRight="onClickRight(content.order)" :data-id="content.order">
				<view slot="title">
					<navigator open-type="navigateBack">
						<text>目录</text>
					</navigator>
				</view>
			</uni-nav-bar>
		</block>
	</view>
</template>

<script>
	import {
		requestGet,
		bookContentURL,
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
				content: [],
				id:''

			}
		},
		computed: {
			...mapState(['url', 'books'])

		},
		onLoad: function(options) {
			var _this = this;
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				_this.id = data.id
				console.log(data, 'sssssssss')
			})
			this.getContentData();

		},
		methods: {
			...mapMutations(['addTourl']),
			async getContentData() {
				const result = await requestGet(`${bookContentURL}${this.url}`);
				// console.log(result)
				uni.setNavigationBarTitle({
					title: result.chapter.title
				})
				this.content = result.chapter
				// console.log(`${bookContentURL}${this.url}`)
				// console.log(this.books)

			},
			onClickLeft: function(order) {
				uni.showToast({
					title: `加载中`,
					icon: 'none',
					duration:1000
				})
				var _this = this;
				var order = order - 2
				console.log(this.id)
				uni.request({
					url: `${bookChapter1URL}${this.id}${bookChapter2URL}`,
					data: {
						
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						console.log(res)
						console.log(res.data.chapters[order].link)
						_this.addTourl(encodeURIComponent(res.data.chapters[order].link))
						_this.getContentData()
						uni.pageScrollTo({
							scrollTop: 0
						})
						
					}
				})
			},
			onClickRight: function(order) {
				uni.showToast({
					title: `加载中`,
					icon: 'none',
					duration:1000
				})
				var _this = this;
				var order = order
				console.log(this.id)
				uni.request({
					url: `${bookChapter1URL}${this.id}${bookChapter2URL}`,
					data: {
						
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						if (res.data.chapters[order].isVip) {
						          uni.showToast({
						          		title: `暂无资源`,
						          		icon: 'none'
						          })
						         } else {
						         _this.addTourl(encodeURIComponent(res.data.chapters[order].link))
						         _this.getContentData()
						         uni.pageScrollTo({
						         	scrollTop: 0
						         })
						        }
					}
				})
			},
		}
	}
</script>

<style>

</style>
