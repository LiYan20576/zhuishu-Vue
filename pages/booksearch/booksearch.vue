<template>
	<view class="cell">
		<view class="book" v-for="item in book" :key="item._id">
			<navigator class="book" :url="`/pages/book/book?id=`+item._id">
				<view class="image">
					<image class="icon" :src="`http://statics.zhuishushenqi.com`+item.cover" mode="widthFix" />
				</view>
				<view class="about">
					<text class="book_name">{{item.title}}</text>
					<text class="book_about">{{item.shortIntro}}</text>
					<view class="book_author">
						<van-icon name="manager" class="icon" />
						<text class="author_name">{{item.author}}</text>
						<view class="book_score">
							<text>{{item.retentionRatio}}存留</text>
						</view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		searchBookURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				book: []
			}
		},
		onLoad: function(options) {
			this.limit = 20;
			var _this = this;
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				console.log(data.data, '1111111')
				_this.query = data.data
			})
			this.getSearchData();
		},
		methods: {
			async getSearchData() {
				uni.showToast({
					title: `加载中`,
					icon: 'none',
					duration: 1000
				})
				const result = await requestGet(
					`${searchBookURL}&model.limit=${this.limit}&model.query=${this.query}`);
				console.log(result, `${searchBookURL}&model.limit=${this.limit}&model.query=${this.query}`)
				console.log(this.query)
				this.book = result.books
			},
		},
		onReachBottom: function() {
			this.limit += 20
			this.getSearchData();
		},
	}
</script>

<style lang="less">
	.cell {
		// background-color: red;
		margin-bottom: 30rpx;

		.book {
			width: 100%;
			height: 250rpx;
			// border: 1px solid red;
			display: flex;

			// background-color: red;
			.image {
				flex: 1;

				image {
					width: 165rpx;
					margin: 20rpx;
				}
			}

			.about {
				flex: 3;
				display: flex;
				flex-direction: column;

				.book_name {
					flex: 2;
					font-size: 16px;
					padding: 20rpx;
					color: rgb(59, 58, 58);
				}

				.book_about {
					flex: 3;
					font-size: 14px;
					padding: 18rpx;
					color: rgb(129, 112, 112);
					overflow: hidden;
				}

				.book_author {
					flex: 2;
					font-size: 12px;
					padding: 20rpx;
					color: rgb(129, 112, 112);
					display: flex;

					.author_name {
						flex: 6;
					}

					.book_score {
						flex: 4;

						text {
							margin-left: 10rpx;
							padding: 0 10rpx;
							background-color: #cccccc;
							border-radius: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
