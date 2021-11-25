<template>
	<view class="contain">
		<uni-search-bar @confirm="search" @input="input"></uni-search-bar>
		<swiper  previous-margin="50rpx" next-margin="20rpx"   :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="item in imgUrls" :key="item.link">
				<image :src="item.img" mode="widthFix" />
			</swiper-item>
		</swiper>
		<view class="cell" v-for="item in series" :key="item._id">
			<view class="van-cell__title">{{item.title}}</view>
			<!-- <view :title="item.title" is-link value="查看更多" link-type="switchTab" url="/pages/bookcity/bookcity" /> -->
			<navigator class="book" v-for="item2 in item.books" :key="item2._id" :url="`/pages/book/book?id=`+item2._id">
				<view class="image">
					<image class="icon" :src="item2.cover" mode="widthFix" />
				</view>
				<view class="about">
					<text class="book_name">{{item2.title}}</text>
					<text class="book_about">{{item2.shortIntro}}</text>
					<view class="book_author">
						<text class="author_name">{{item2.author}}</text>
						<view class="book_score">
							<text>{{item2.majorCate}}</text>
							<text>{{item2.rating.score}}分</text>
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
		indexURL
	} from '@/utils/http.js'
	export default {
		data() {
			return {
				imgUrls: [],
				series: [],
				boook: []
			}
		},
		onLoad() {
			this.getSwiperData();
			this.getCell1Data();
		},
		methods: {
			async getSwiperData() {
				const result = await requestGet(indexURL);
				this.imgUrls = result.data.spread[0].advs
			},
			async getCell1Data() {
				const result = await requestGet(indexURL);
				this.series = result.data.nodes
			},
			search: function(e) {
				console.log(e)
				uni.navigateTo({
					url: '/pages/booksearch/booksearch',
					events: {
						acceptDataFromOpenedPage: function(data) {
							console.log(data)
						},
						someEvent: function(data) {
							console.log(data)
						}
					},
					success: function(res) {
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data: e.value
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
.cell{
  // background-color: red;
  margin-bottom: 30rpx;
  .van-cell__title{
    font-size: 30px!important;
  }
  .book{
      width: 100%;
      height: 250rpx;
      // border: 1px solid red;
      display: flex;
      // background-color: red;
    .image{
      flex: 1;
      image{
        width: 165rpx;
        margin: 20rpx;
      }
    }
    .about{
      flex: 3;
      display: flex;
      flex-direction:column;
      .book_name{
        flex: 2;
        font-size: 40rpx;
        padding: 20rpx;
        color: rgb(59, 58, 58);
      }
      .book_about{
        flex: 3;
        font-size: 24rpx;
        padding: 18rpx;
        color: rgb(129, 112, 112);
        overflow: hidden;
      }
      .book_author{
        flex: 2;
        font-size: 24rpx;
        padding: 20rpx;
        color: rgb(129, 112, 112);
        display: flex;
        .icon{
          flex: 1;
        }
        .author_name{
          flex: 6;
        }
        .book_score{
          flex: 6;
          text{
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
