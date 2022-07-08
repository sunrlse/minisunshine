import Taro from '@tarojs/taro'
import { useState, useEffect, useReducer } from 'react'
import config from '../config'

function fetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        isError: false
      }
    case 'FETCH_SUCCESS':
      console.log(action.payload)
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    case 'FETCH_FAILED':
      return {
        ...state,
        loading: false,
        isError: true
      }
    default:
      return { ...state }
  }
}

const useFetch = (defaultOption = {}, defaultData = {}) => {
  const [option, setOption] = useState(defaultOption)
  const [state, dispatch] = useReducer(fetchReducer, {
    loading: false,
    isError: false,
    data: { ...defaultData }
  })

  useEffect(() => {
    let didCancel = false
    let timer = null
    const getData = () => {
      dispatch({ type: 'FETCH_START' })
      const url = config.apiHost + '/api' + option.url
      Taro.request({
        url,
        method: option.method || 'get',
        // header: {
        //   'content-type': 'application/x-www-form-urlencoded'
        // },
        data: option.data || option.params || {},
        success: res => {
          console.log('request succ ', res)
          if (didCancel) return
          dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
        },
        fail: () => {
          dispatch({ type: 'FETCH_FAILED' })
        }
      })
    }

    getData()

    return () => {
      console.log('销毁--', didCancel)
      didCancel = true
      // Warning: Can't perform a React state update on an unmounted component.
      // This is a no-op, but it indicates a memory leak in your application.
      // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
      // 关于react中切换路由时报以上错误，实际的原因是因为在组件挂载（mounted）之后进行了异步操作，比如ajax请求或者设置了定时器等，
      // 而你在callback中进行了setState操作。当你切换路由时，组件已经被卸载（unmounted）了，
      // 此时异步操作中callback还在执行，因此setState没有得到值
      // 本例，这里需要清除定时器
      clearTimeout(timer)
      console.log('销毁==', didCancel)
    }
  }, [option])

  function doFetch(opt = {}) {
    setOption({ ...option, ...opt })
  }

  return {
    doFetch,
    ...state
  }
}

export {
  useFetch
}