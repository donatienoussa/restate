import { View, Text, Image } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import icons from '@/constants/icons'
import { Ionicons } from '@expo/vector-icons'
import { ImageSourcePropType } from 'react-native'


const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik-bold"
        } text-xs w-full font-rubik text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);


const TabLayout = () => {
  
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, 
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute', 
          borderColor: '#0061FF1A', 
          borderTopWidth: 1,
          minHeight:60
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false, 
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Accueil"/>
          )
        }}         
      /> 
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.search} title="Explorer"/>
          )
        }}
      /> 
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} icon={icons.person} title="Profil"/>
          )
        }}
      /> 
    </Tabs>
  )
}

export default TabLayout