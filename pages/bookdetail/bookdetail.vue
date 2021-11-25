<template>
	<view>
		<view class="type">
			<view @click="typeHandler" :class="type_id == index ? 'active' :'' " v-for="(item,index) in types"
				:data-id="index">
				{{item}}
			</view>
		</view>
		<view class="cat">
			<scroll-view :scroll-x="true" style=" white-space: nowrap;">
				<view @click="catHandler" :class="cat_id == index ? 'active' :'' " v-for="(item,index) in cat"
					:data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<block v-if="book.length!=0">
			<view class="cell" v-for="item in book" :key="item._id">
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
		</block>
		<block v-else>
			<view class="none">暂无书籍</view>
		</block>
	</view>
</template>

<script>
	import {
		requestGet,
		bookCityDetailURL,
		bookCityCatURL
	} from '@/utils/http.js';
	export default {
		data() {
			return {
				gender: [],
				query: [],
				active: 1,
				cat: [],
				types: ['热门', '新书', '好评', '完结'],
				book: [],
				cat_id: 0,
				type_id: 0,
			}
		},
		onLoad: function(options) {
			this.gender = options.gender;
			this.query = options.query;
			console.log(this.query, this.gender)
			this.type = 'hot';
			this.limit = 20;
			uni.setNavigationBarTitle({
				title: options.query
			})
			this.getBookCatData();
			this.getBookDetailData();
		},
		onReachBottom: function() {
			this.limit += 20
			this.getBookDetailData();
		},
		methods: {
			async getBookCatData() {
				const result = await requestGet(bookCityCatURL);
				for (var i = 0; i < result[this.gender].length; i++) {
					if (result[this.gender][i].major == this.query) {
						this.catAll = result[this.gender][i].mins
						this.cat = result[this.gender][i].mins
						// console.log(this.cat, 'xxxx')
					}
				}
			},
			async getBookDetailData() {
				uni.showToast({
					title: `加载中`,
					icon: 'none',
					duration: 1000
				})
				const result = await requestGet(
					`${bookCityDetailURL}limit=${this.limit}&gender=${this.gender}&query=${this.query}&type=${this.type}&cat=`
				);
				this.book = result.books
				console.log(result)
				// Toast.clear();
			},
			
			typeHandler: function(e) {
				console.log(e)
				var _this = this
				this.typeAll = ['hot', 'new', 'reputation', 'over']
				// console.log(this.typeAll[e.currentTarget.dataset.id]);
				this.type = this.typeAll[e.currentTarget.dataset.id]
				this.type_id= e.currentTarget.dataset.id
				uni.request({
					url: `${bookCityDetailURL}limit=20&gender=${this.gender}&query=${this.query}&type=${this.typeAll[e.currentTarget.dataset.id]}&cat=`, //仅为示例，并非真实的接口地址
					data: {
			  	x: '',
						y: ''
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success(res) {
						console.log(res.data)
						_this.book=res.data.books
					}
				})
			},
			catHandler: function(e) {
				var _this=this
			 // console.log(this.catAll[e.currentTarget.dataset.id]);
				// this.cat=this.catAll[e.currentTarget.dataset.id]
				  this.cat_id=e.currentTarget.dataset.id
				uni.request({
				  url: `${bookCityDetailURL}limit=20&gender=${this.gender}&query=${this.query}&type=&cat=${this.catAll[e.currentTarget.dataset.id]}`, //仅为示例，并非真实的接口地址
				  data: {
				    x: '',
				    y: ''
				  },
				  header: {
				    'content-type': 'application/json' // 默认值
				  },
				  success (res) {
				      console.log(res.data,'asdasfsa')
				       _this.book=res.data.books
				  }
				})
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
					flex: 1;
					font-size: 32rpx;
					padding: 20rpx;
					color: rgb(59, 58, 58);
				}

				.book_about {
					flex: 3;
					font-size: 28rpx;
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

	.type {
		display: flex;
		margin: 10rpx;
		padding: 20rpx;
		border-bottom: 1px solid #ccc;

		view {
			flex: 1;
			text-align: center;
			margin: 0 40rpx;
			font-size: 14px;
			color: rgb(139, 139, 139);
			border-radius: 20rpx;

		}

		.active {
			color: red;
			border: 1px solid red;
		}
	}

	.cat {
		display: flex;
		margin: 10rpx;
		padding: 20rpx;
		border-bottom: 1px solid #ccc;

		scroll-view {
			view {
				flex: 1;
				width: 150rpx;
				text-align: center;
				font-size: 14px;
				display: inline-block;
				color: rgb(139, 139, 139);
				border-radius: 20rpx;

			}

			.active {
				color: red;
				border: 1px solid red;

			}
		}


	}

	.none {
		font-size: 30px;
		text-align: center;
		margin-top: 50rpx;
		margin-bottom: 150rpx;
		color: #ccc;
	}
</style>
