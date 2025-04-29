import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {

    const pathname = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);

    //This make the system wait for 500ms before sending the request
    const debouncedSearch = useDebouncedCallback(
        (text: string) => router.setParams({ query: text }), 500
    );

    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    }
  
    return (
        <View className="flex flex-row justify-between items-center border border-gray-200 rounded-lg px-3 py-2 mt-5">
            <View className="flex-1 flex-row items-center gap-3 z-50">
                <Image source={icons.search} className="size-6" />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder="Rechercher ..."
                    className="w-[83%] font-rubik text-sm text-black-300"
                    
                />
            </View>
            <TouchableOpacity onPress={() => {}}>
                <Image source={icons.filter} className="size-6" />
            </TouchableOpacity>
        </View>
  )
}

export default Search