import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const Saved = () => {
  return (
    <View className='bg-primary flex-1 px-4'>
          <View className='flex items-center flex-row gap-3 mt-10 py-2 px-4 bg-accent rounded-lg'>
            <Image
              source={icons.save}
              className='size-6'
              tintColor='#ffffff'
            />
            <Text className='text-white text-xl'>Saved</Text>
          </View>
        </View>
  )
}

export default Saved