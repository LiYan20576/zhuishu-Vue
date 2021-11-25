import {
	createStore
} from "vuex"

const store = createStore({
	state: {
		books: uni.getStorageSync("books") || [],
		url: uni.getStorageSync("url") || '',
		bookid: uni.getStorageSync("bookid") || '',
	},
	mutations: {
		addTocart(state, payload) {
			var isFind = false;
			state.books.map((item, index) => {
				if (item.id === payload.id) {
					isFind = true;
				}
			})
			if (isFind === false) {
				state.books.push(payload)
				uni.showToast({
					title: `加入书架`,
					icon: 'none'
				})
			}
			uni.setStorageSync("books", state.books)
		},
		delFromcart(state, payload) {
			for(var i=0;i<state.books.length;i++){
				if(state.books[i].id==payload){
					uni.showToast({
						title: `移除书架`,
						icon: 'none'
					})
					state.books.splice(i,1)
				}
			}
			uni.setStorageSync("books", state.books)
		},
		clearcart(state, payload) {
			state.books.splice(0,state.books.length)
			uni.setStorageSync("books", state.books)
		},
		addTourl(state, payload) {
			state.url = payload
			console.log(state.url, 'state.url')
			uni.setStorageSync("url", state.url)

		},
		addTobookid(state, payload) {
			state.bookid = payload
			console.log(state.bookid, 'state.bookid')
			uni.setStorageSync("bookid", state.bookid)

		}
	}
})

export default store
