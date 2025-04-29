import { Cards, FeaturedCards } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResult from "@/components/NoResult";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useSupabase } from "@/hooks/useSupabase";
import { getProperties } from "@/lib/supabase";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{ filter?: string, query?: string }>();

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
      limit: 20
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
            <View className="px-5">
              <View className="flex flex-row items-center justify-between">
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="flex flex-row bg-primary-200 size-11 rounded-full items-center justify-center"
                >
                  <Image
                    source={icons.backArrow}
                    className="size-5"
                  />
                </TouchableOpacity>

                <Text className="text-base text-center mr-2 font-rubik-medium text-black dark:text-white">
                  Recherchez votre maison idéale
                </Text>

                <Image
                  source={icons.bell}
                  className="size-6" />
              </View>
              <Search />
              <Filters />
              <View className="mt-5">
                <Text className="text-xl font-rubik-bold text-black dark:text-white mt-5">
                  {properties?.length} propriétés trouvées
                </Text>
              </View>
            </View>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
