<template>
	<view class="cell">
		<button @click="onClick" type="warn">清空书架</button>
		<navigator class="book" v-for="item2 in books" :key="item2.id" :url="`/pages/book/book?id=`+item2.id">
			<view class="image">
				<image class="icon" :src="`http://statics.zhuishushenqi.com`+item2.cover" mode="widthFix" />
			</view>
			<view class="about">
				<text class="book_name">{{item2.title}}</text>
				<view class="book_author">
					<van-icon name="manager" class="icon" />
					<text class="author_name">{{item2.author}}</text>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['books'])
		},
		methods: {
			...mapMutations(['clearcart']),
			onClick: function() {
				this.clearcart()
			}
		}
	}
</script>

<style lang="less">
	.cell {
		// background-color: red;
		margin-bottom: 30rpx;

		.van-cell__title {
			font-size: 30px !important;
		}

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
					font-size: 40rpx;
					padding: 20rpx;
					color: rgb(59, 58, 58);
				}

				.book_about {
					flex: 3;
					font-size: 24rpx;
					padding: 18rpx;
					color: rgb(129, 112, 112);
					overflow: hidden;
				}

				.book_author {
					flex: 2;
					font-size: 24rpx;
					padding: 20rpx;
					color: rgb(129, 112, 112);
					display: flex;

					.icon {
						flex: 1;
					}

					.author_name {
						flex: 6;
					}

					.book_score {
						flex: 6;

						text {
							margin-left: 10rpx;
							padding: 0 10rpx;
							background-color: #ccc;
							border-radius: 20rpx;
						}
					}
				}
			}
		}
	}
</style>
