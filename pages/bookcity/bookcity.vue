<template>
	<view>
		<view class="grid">
			<view class="type">男生</view>
			<uni-grid column-num="2" :showBorder="false">
				<uni-grid-item use-slot v-for="item in male" :key="item">
					<navigator :url="`/pages/bookdetail/bookdetail?gender=male&query=`+item.name">
						<view class="class">
							<view class="img">
								<image :src="`http://statics.zhuishushenqi.com`+item.bookCover[0]" class="img_left"
									mode="widthFix" />
								<image :src="`http://statics.zhuishushenqi.com`+item.bookCover[1]" class="img_center"
									mode="widthFix" />
								<image :src="`http://statics.zhuishushenqi.com`+item.bookCover[2]" class="img_right"
									mode="widthFix" />
							</view>
							<view class="mag">
								<text class="name">{{item.name}}</text>
								<text class="count">{{item.bookCount}}本</text>
							</view>
						</view>
					</navigator>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="grid">
			<view class="type">女生</view>
			<uni-grid column-num="2" :showBorder="false" @change="choosefemale">
				<uni-grid-item use-slot v-for="item in female" :key="item">
					<navigator :url="`/pages/bookdetail/bookdetail?gender=female&query=`+item.name">
						<view class="class">
							<view class="img">
								<image :src="`http://statics.zhuishushenqi.com`+item.bookCover[0]" class="img_left"
									mode="widthFix" />
								<image :src="`http://statics.zhuishushenqi.com`+item.bookCover[1]" class="img_center"
									mode="widthFix" />
								<image :src="`http://statics.zhuishushenqi.com`+item.bookCover[2]" class="img_right"
									mode="widthFix" />
							</view>
							<view class="mag">
								<text class="name">{{item.name}}</text>
								<text class="count">{{item.bookCount}}本</text>
							</view>
						</view>
					</navigator>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="grid">
			<view class="type">经典</view>
			<uni-grid column-num="2" :showBorder="false" @change="choosepress">
				<uni-grid-item use-slot v-for="item in press" :key="item">
					<navigator :url="`/pages/bookdetail/bookdetail?gender=press&query=`+item.name">
						<view class="class">
							<view class="img">
								<image :src="`http://statics.zhuishushenqi.com`+item.bookCover[0]" class="img_left"
									mode="widthFix" />
								<image :src="`http://statics.zhuishushenqi.com`+item.bookCover[1]" class="img_center"
									mode="widthFix" />
								<image :src="`http://statics.zhuishushenqi.com`+item.bookCover[2]" class="img_right"
									mode="widthFix" />
							</view>
							<view class="mag">
								<text class="name">{{item.name}}</text>
								<text class="count">{{item.bookCount}}本</text>
							</view>
						</view>
					</navigator>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	import {
		requestGet,
		bookCityURL
	} from '@/utils/http.js';
	export default {
		data() {
			return {
				male: [],
				female: [],
				press: [],
			}
		},
		onLoad() {
			this.getBookSeriesData();
		},
		methods: {
			async getBookSeriesData() {
				const result = await requestGet(bookCityURL);
				console.log(result)
				this.male = result.male
				this.female = result.female
				this.press = result.press
			},
			// choosemale(name,gender) {
			// 	console.log(name,gender)
			// 	uni.navigateTo({
			// 		// url: `/pages/gooddetail/gooddetail?id=${id}`
			// 		url: `/pages/bookdetail/bookdetail?gender=male&query=${name}`
			// 	});
			// },
			// choosefemale(name,gender) {
			// 	console.log(name,gender)
			// 	uni.navigateTo({
			// 		url: `/pages/bookdetail/bookdetail?gender=female&query=${name}`
			// 	});
			// },
			// choosepress(name,gender) {
			// 	console.log(name,gender)
			// 	uni.navigateTo({
			// 		url: `/pages/bookdetail/bookdetail?gender=press&query=${name}`
			// 	});
			// }
		}
	}
</script>

<style lang="less">
	.grid {
		.type {
			width: 100%;
			font-size: 20px;
			color: #777575;
			text-align: center;
		}

		.class {
			overflow: hidden;
			display: flex;
			width: 100%;
			height: 130rpx;

			.img {
				flex: 2;
				position: relative;

				.img_left {
					position: absolute;
					width: 100rpx;
					left: 0rpx;
					top: 10rpx;
					z-index: 0;
				}

				.img_center {
					position: absolute;
					width: 100rpx;
					z-index: 2;
					left: 40rpx;
				}

				.img_right {
					position: absolute;
					width: 100rpx;
					left: 60rpx;
					z-index: 0;
					top: 20rpx;
				}
			}

			.mag {
				flex: 1;
				display: flex;
				flex-direction: column;

				.name {
					flex: 1;
					font-size: 12px;
					color: #777575;
					text-align: center;
				}

				.count {
					flex: 1;
					font-size: 12px;
					color: #777575;
					text-align: center;
				}
			}
		}
	}
</style>
