<template>
	<view class="contain">
		<view class="cell">
			<view class="book">
				<view class="image">
					<image class="icon" :src="`http://statics.zhuishushenqi.com`+book.cover" mode="widthFix" />
				</view>
				<view class="about">
					<view class="name">
						<text>{{book.title}}</text>
					</view>
					<view class="star">
						<text>{{star?star:0}}</text>
						<uni-rate readonly :value="star" color="#ffd21e" />
					</view>
					<view class="author">
						<text>{{book.author}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="news">
			<view class="word">
				<text class="number">{{wordCount}}万</text>
				<text class="class">总字数</text>
			</view>
			<view class="ratio">
				<text class="number">{{book.retentionRatio}}%</text>
				<text class="class">读者留存</text>
			</view>
			<view class="follower">
				<text class="number">{{follower}}万</text>
				<text class="class">粉丝数</text>
			</view>
		</view>
		<uni-collapse class="info" :value=" activeNames " @change="onChange" :open="true">
			<uni-collapse-item title="简介" name="1">{{book.longIntro}}</uni-collapse-item>
		</uni-collapse>
		<block v-if="review.length!=0">
			<view class="cell">
				<text>热门评论</text>
				<view class="review" v-for="item in review" :key="item._id">
					<uni-card :title="item.author.nickname"
						:thumbnail="`http://statics.zhuishushenqi.com`+item.author.avatar" :isFull="true"
						:extra="item.updated">
						<text>{{item.content}}</text>
					</uni-card>
				</view>
			</view>
		</block>
		<block v-else>
			<view class="none">暂无评论</view>
		</block>
		<!-- <van-goods-action>
			<van-goods-action-button :click="onClickJoin" :text="joinbook" type="warning" :color="color" />
			<van-goods-action-button bindtap="onClickBegin" text="开始阅读" />
		</van-goods-action> -->
		<uni-goods-nav class="goodnav" :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
			@buttonClick="buttonClick" />
		<van-toast id="van-toast" />
	</view>
</template>

<script>
	import {
		requestGet,
		bookURL,
		reviewURL,
		bookKeyURL
	} from '@/utils/http.js'
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				options: [{
					icon: 'cart',
					text: '书架',
					info: 2
				}],
				buttonGroup: [{
						text: '加入书架',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '开始阅读',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				],
				book: [],
				review: [],
				star: null,
				wordCount: null,
				activeNames: ['1'],
				follower: null,
				joinbook: '加入书架',
				color: []
			}
		},
		onLoad: function(options) {
			this.id = options.id;
			this.limit = 3;
			console.log(this.id,'iddddddddddddddddddddd')
			this.options[0].info = this.books.length
			for (var i = 0; i < this.books.length; i++) {
				console.log('shujiashujai5151616')
				if (this.books[i].id == this.id) {
					this.buttonGroup[0].text = '移除书架'
					this.buttonGroup[0].backgroundColor = '#ccc'
				} else {
					this.buttonGroup[0].text = '加入书架'
					this.buttonGroup[0].backgroundColor = '#ff0000'
				}
			}
			this.getBookIdData();
			this.getBookData();
			this.getReviewData();
		},
		// onReachBottom: function() {
		// 	this.limit += 3
		// 	this.getReviewData()
		// },
		onReady: function() {

		},
		// onShow: function() {
		// 	for (var i = 0; i < app.globalData.userInfo.length; i++) {
		// 		if (this.id == app.globalData.userInfo[i].id) {
		// 			this.joinbook = '移出书架'
		// 			this.color = '#ccc'
		// 		}
		// 	}
		// },
		computed: {
			...mapState(['books'])

		},
		methods: {
			...mapMutations(['addTocart', 'delFromcart','addTobookid']),
			onChange(event) {
				this.activeNames = event.detail
			},
			async getBookData() {
				const result1 = await requestGet(`${bookURL}${this.id}`);
				this.source = result1.enSource
				this.author = result1.author
				this.cover = result1.cover
				this.title = result1.title
				uni.setNavigationBarTitle({
					title: result1.title
				})
				for (var i = 0, count = 0, num = 0; i < result1.starRatings.length; i++) {
					count += result1.starRatings[i].count
					num += result1.starRatings[i].star * result1.starRatings[i].count
				}
				this.book = result1,
					this.star = (num / count).toFixed(1),
					this.wordCount = (result1.wordCount / 10000).toFixed(2),
					this.follower = (result1.totalFollower / 10000).toFixed(0)
			},
			async getBookIdData() {
				const result = await requestGet(`${bookKeyURL}${this.id}`);
				this.bookid = result[0]._id
			},
			async getReviewData() {
				const result2 = await requestGet(`${reviewURL}${this.id}&limit=${this.limit}`);
				console.log(result2, 'ssssssssssssssssssss')
				for (var i = 0; i < result2.reviews.length; i++) {
					result2.reviews[i].updated = result2.reviews[i].updated.substring(0, 10)
				}
				this.review = result2.reviews
				// console.log(this.review,'8888888888888888888')
				// console.log(result2,'8888888888888888888')
				// Toast.clear();
			},

			onClick() {
				uni.switchTab({
					url: '/pages/bookshelf/bookshelf'
				})
			},
			buttonClick(e) {
				var _this = this
				// console.log(e.index, 'dadasdasd')
				if (e.index === 1) {
					this.addTobookid(this.bookid)
					if (this.source == null) {
						uni.navigateTo({
							url: '/pages/detail/detail?id=' + _this.id,
							// events: {
							// 	acceptDataFromOpenedPage: function(data) {
							// 		console.log(data, 'acceptDataFromOpenedPage')
							// 	},
							// 	someEvent: function(data) {
							// 		console.log(data, 'someEvent')
							// 	}
							// },
							// success: function(res) {
							// 	res.eventChannel.emit('acceptDataFromOpenerPage', {
							// 		data: _this.bookid
							// 	})
							// }
						})
					} else {
						uni.showToast({
							title: `暂无资源`,
							icon: 'none'
						})
					}
				} else if (e.index == 0) {
					console.log(e.content.text)
					if (e.content.text == '加入书架') {
						var info = {
							id: this.id,
							cover: this.cover,
							author: this.author,
							title: this.title
						}
						this.addTocart(info)
						this.options[0].info = this.books.length
					} else if (e.content.text == '移除书架') {
						this.delFromcart(this.id)
						this.options[0].info = this.books.length
					}
					if(this.books.length==0){
						this.buttonGroup[0].text = '加入书架'
						this.buttonGroup[0].backgroundColor = '#ff0000'
					}
					for (var i = 0; i < this.books.length; i++) {
						if (this.books[i].id == this.id) {
							this.buttonGroup[0].text = '移除书架'
							this.buttonGroup[0].backgroundColor = '#ccc'
						} else {
							this.buttonGroup[0].text = '加入书架'
							this.buttonGroup[0].backgroundColor = '#ff0000'
						}
					}
				}
			},
		}
	}
</script>

<style lang="less">
	.cell {
		// background-color: red;
		margin-bottom: 30rpx;

		.book {
			width: 100%;
			height: 300rpx;
			// border: 1px solid red;
			display: flex;

			// background-color: red;
			.image {
				flex: 1;

				image {
					width: 200rpx;
					margin: 20rpx;
				}
			}

			.about {
				flex: 3;
				display: flex;
				flex-direction: column;

				.name {
					font-size: 20px;
					padding: 20rpx;
					color: rgb(59, 58, 58);
					flex: 1;
				}

				.star {
					text {
						font-size: 20px;
						padding: 20rpx;
						color: #ffd21e;
					}

					flex: 1;
				}

				.author {
					font-size: 12px;
					padding: 20rpx;
					color: rgb(129, 112, 112);
					flex: 1;
				}
			}
		}
	}

	.news {
		display: flex;
		height: 160rpx;

		// background-color: #ffd21e;
		.word {
			background-color: rgb(243, 243, 243);
			flex: 1;
			display: flex;
			flex-direction: column;

			.number {
				text-align: center;
				line-height: 80rpx;
				flex: 1;
				color: rgb(129, 112, 112);
			}

			.class {
				text-align: center;
				line-height: 80rpx;
				flex: 1;
				font-size: 16px;
				color: rgb(129, 112, 112);
			}
		}

		.ratio {
			background-color: rgb(243, 243, 243);
			flex: 1;
			display: flex;
			flex-direction: column;

			.number {
				text-align: center;
				line-height: 80rpx;
				flex: 1;
				color: rgb(129, 112, 112);
			}

			.class {
				text-align: center;
				line-height: 80rpx;
				flex: 1;
				font-size: 16px;
				color: rgb(129, 112, 112);
			}
		}

		.follower {
			background-color: rgb(243, 243, 243);
			flex: 1;
			display: flex;
			flex-direction: column;

			.number {
				text-align: center;
				line-height: 80rpx;
				flex: 1;
				color: rgb(129, 112, 112);
			}

			.class {
				text-align: center;
				line-height: 80rpx;
				flex: 1;
				font-size: 16px;
				color: rgb(129, 112, 112);
			}
		}

	}

	.cell {
		padding-bottom: 100rpx;

		.review {


			/* #ifdef H5 */
			/deep/ uni-image {
				img {
					user-select: none;
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 17% !important;
					opacity: 1 !important;
				}
			}

			/* #endif */
			/* #ifdef MP-WEIXIN */
			.uni-card__header-avatar {
				.uni-card__header-avatar-image {
					height: 40px !important;

				}
			}

			/* #endif */

		}
	}

	.none {
		font-size: 30px;
		text-align: center;
		margin-top: 50rpx;
		margin-bottom: 150rpx;
		color: #ccc;
	}

	.goodnav {
		position: fixed;
		z-index: 100;
		bottom: 0;
		width: 100%;
	}
</style>
