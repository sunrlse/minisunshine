import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image } from '@tarojs/components'
import { useFetch } from '../../utils/useRequestWithReducer'
// import SearchBar from '../../components/SearchBar/SearchBar'
import Loading from '../../components/Loading/Loading'
import NoData from '../../components/NoData/NoData'
import '../../assets/style/bookgrid.scss'
import './index.scss'

const BookStore = () => {
  const option = {
    url: '/bn/list'
  }
  const { loading, isError, data, doFetch } = useFetch(option, {})
  console.log('index page ', data)
  let list = Array.isArray(data.data) ? data.data : []
  console.log('list ', list)

  function handleClickBook(book) {
    let cacheRemoved = Taro.getStorageSync('r_remove') || ''
    let cacheRemovedArr = cacheRemoved.split(',')
    if (cacheRemovedArr.length > 0) {
      cacheRemovedArr = cacheRemovedArr.filter(el => {
        let flag = el !== ('' + book.id)
        return flag
      })
      Taro.setStorageSync('r_remove', cacheRemovedArr.join(','))
    }
  }

  // function handleSearch(kw) {
  //   doFetch({ params: { kw }})
  // }

  function refreshList() {
    console.log('refresh')
  }


  return (
    <View className='bookstore'>
      {/* <SearchBar onSearch={handleSearch}></SearchBar> */}
      {loading && <Loading />}
      {isError && <NoData msg='呀，加载失败了.. ' textBtn='刷新' onTextBtnClick={refreshList} />}
      <View className='con'>
        <View className='grid'>
          {list.map(item =>
            <View
              key={item.id}
              className='book'
              onClick={() => handleClickBook(item)}
            >
              {item.orderd &&
                <View className='orderd'>持有</View>
              }
              <Image className='cover' src={item.cover} mode='heightFix' />
              <View className='name'>{item.name}</View>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default BookStore