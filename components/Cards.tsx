import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import icons from '@/constants/icons';
//import { Models } from 'react-native-appwrite';

type Props = {
  property: any;
  onPress?: () => void;
}
export const FeaturedCards = ({property, onPress}: Props) => {
  
  return (
    <TouchableOpacity onPress={onPress} className="flex flex-col items-start w-60 h-80 relative">
      <Image source={{uri: property.image}} className='size-full rounded-2xl' />
      <Image source={images.cardGradient} className="absolute size-full rounded-2xl bottom-0" />

      <View className='absolute top-3 right-3 flex flex-row items-center gap-1 bg-white/90 px-3 py-1.5 rounded-full'>
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold">{ property.rating}</Text>
      </View>

      <View className="flex flex-col items-start absolute inset-x-3 bottom-5">
        <Text className="text-xl font-rubik-extrabold text-white">{property.name}</Text>
        <Text className='text-base font-rubik text-white'>{property.address}</Text>
        
        <View className="w-full  flex flex-row items-center justify-between gap-3">
          <Text className="text-white font-rubik-extrabold">${property.price}</Text>
          <Image source={icons.heart} className='size-6'/>
        </View>

      </View>
    </TouchableOpacity>
  )
}


export const Cards = ({property, onPress}:Props)  => {
  
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >

      <View className='z-50 absolute top-6 right-5 flex flex-row items-center gap-1 bg-white/90 px-3 py-1.5 rounded-full'>
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold">{property.rating}</Text>
      </View>

      <Image source={{ uri: property.image }} className="w-full h-40 rounded-lg" />

      <View className="flex flex-col mt-2">
        <Text className="text-xl font-rubik-bold text-black">{property.name}</Text>
        <Text className='text-base font-rubik text-black-200'>{property.address}</Text>

        <View className="w-full flex flex-row items-center justify-between gap-3">
          <Text className="text-black-200 font-rubik-extrabold">${property.price}</Text>
          <Image source={icons.heart} className='size-6' tintColor={'#191D31'} />
        </View>
      </View>

    </TouchableOpacity>
  )
}