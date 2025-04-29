import { View, Text, Image, ScrollView, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import { useGlobalContext } from '@/contexts/global-provider'
import { settings } from '@/constants/data'
import { supabase } from '@/lib/supabase'
import { toast } from '@/lib/utils/toast'
import { useColorScheme } from '@/hooks/useColorScheme.web'

type SettingItemProps = {
  icon: ImageSourcePropType,
  title: string,
  onPress?: () => void,
  textStyle?: string,
  showArrow?: boolean, 
  isDark: boolean
}

const SettingItem = ({ icon, title, onPress, textStyle, showArrow = true, isDark=false }: SettingItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row justify-between items-center py-3">
      <View className="flex flex-row items-center gap-3">
        <Image source={icon} className="size-6" tintColor={isDark ? '#fff' : '#000'} />
        <Text className={`font-rubik-bold text-sm text-black dark:text-white ${textStyle}`}>{title}</Text>
      </View>

      {showArrow && (
        <Image source={icons.rightArrow} className="size-5" />
      )}
    </TouchableOpacity>
  )
}

export default function Profile() {
  const { user, refetch } = useGlobalContext();
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === 'dark';

  const handleLogout = async () => {
    try {
      const result = await supabase.auth.signOut();

      if (result) {
        toast("Vous êtes déconnecté.");
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast("Impossible de se déconnecter.");
    }
  }

  const editProfile = () => { }

  return (
    <SafeAreaProvider className="w-full bg-white dark:bg-black">
      <SafeAreaView className="w-full">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32 px-7"
        >
          <View className="flex flex-row justify-between items-center mt-5">
            <Text className="font-rubik-bold text-xl text-black dark:text-white">Profil</Text>

            <Image source={icons.bell} className="size-6" />
          </View>

          <View className="flex justify-center items-center">
            <View className="flex flex-col items-center relative mt-5">
              <Image
                source={{ uri: user?.avatar }}
                className="size-44 rounded-full relative mt-7"
              />

              <TouchableOpacity
                onPress={editProfile}
                className="absolute bottom-0 right-0 flex flex-row justify-center items-center mt-7"
              >
                <Image source={icons.edit} className="size-12" />
              </TouchableOpacity>
            </View>
            <Text className="font-rubik-bold text-2xl mt-3 text-black dark:text-white">{user?.name}</Text>
          </View>

          <View className="flex flex-col mt-5">
            <SettingItem
              icon={icons.calendar}
              title="Mes réservations"
              onPress={() => { }}
              isDark={isDarkMode}
            />

            <SettingItem
              icon={icons.wallet}
              title="Mes paiements"
              onPress={() => { }}
              isDark={isDarkMode}
            />
          </View>

          <View className="flex flex-col border-t pt-5 border-gray-300 dark:border-gray-600">
            {settings.slice(2).map((item, index) => (
              <SettingItem key={index} {...item} isDark={isDarkMode} />
            ))}
          </View>

          <View className="flex flex-col border-t pt-5 border-gray-300 dark:border-gray-600">
            <SettingItem
              title="Se déconnecter"
              textStyle="text-danger-100"
              icon={icons.logout}
              onPress={handleLogout}
              showArrow={false}
              isDark={isDarkMode}
            />
          </View>

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
