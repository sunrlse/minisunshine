import React from 'react'
import { View, Text } from '@tarojs/components'
import './nodata.scss'

const NoData = (props) => {
  return (
    <View className='no-data'>
      <Text>{props.msg || '空空如也~'}</Text> 
      {props.textBtn &&
        <Text className='text-btn'
          onClick={() => { props.onTextBtnClick && props.onTextBtnClick() }}
        >{props.textBtn}</Text>
      }
    </View>
  )
}

export default NoData