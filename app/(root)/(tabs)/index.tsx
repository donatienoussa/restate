import { Cards, FeaturedCards } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResult from "@/components/NoResult";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/contexts/global-provider";
import { useSupabase } from "@/hooks/useSupabase";
import { getLatestProperties, getProperties } from "@/lib/supabase";
import greeting from "@/lib/utils/greet";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ filter?: string, query?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } = useSupabase({
    fn: getLatestProperties
  });

  const { data: properties, loading: propertiesLoading, refetch } = useSupabase({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6
    },
    skip: true
  });

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6
    });
  }, [params.query, params.filter]);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-white dark:bg-black h-full w-full">
        <FlatList
          data={properties}
          renderItem={({ item }) => (
            <Cards property={item} onPress={() => handleCardPress(item.id)} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerClassName="pb-32"
          columnWrapperClassName="flex gap-5 px-5"
          ListEmptyComponent={
            propertiesLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <NoResult />
            )
          }
          ListHeaderComponent={
            <View className="mt-5 px-5">
              <View className="flex flex-row justify-between items-center mt-5">
                <View className="flex flex-row items-center gap-3">
                  <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
                  <View className="flex flex-col">
                    <Text className="font-rubik-light text-black dark:text-white">{greeting()}</Text>
                    <Text className="font-rubik-bold text-black dark:text-white">{user?.name}</Text>
                  </View>
                </View>
                <Image source={icons.bell} className="size-6" />
              </View>

              <Search />

              <View className="mt-5">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-black dark:text-white font-rubik-bold text-2xl">En vedette</Text>
                  <TouchableOpacity>
                    <Text className="text-primary-300 font-rubik-bold text-2xl">Voir tout</Text>
                  </TouchableOpacity>
                </View>

                {latestPropertiesLoading ? (
                  <ActivityIndicator size="large" className="text-primary-300" />
                ) : !latestProperties || latestProperties.length === 0 ? (
                  <NoResult />
                ) : (
                  <FlatList
                    data={latestProperties}
                    renderItem={({ item }) => (
                      <FeaturedCards property={item} onPress={() => handleCardPress(item.id)} />
                    )}
                    horizontal
                    keyExtractor={(item) => item.id}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex gap-5 mt-5"
                  />
                )}
              </View>

              <View className="mt-5">
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-black dark:text-white font-rubik-bold text-2xl">Nos recommandations</Text>
                  <TouchableOpacity>
                    <Text className="text-primary-300 font-rubik-bold text-2xl">Voir tout</Text>
                  </TouchableOpacity>
                </View>

                <Filters />
              </View>
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );

 
}
