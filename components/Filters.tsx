import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native';
import { categories } from '@/constants/data';

const Filters = () => {

    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || 'Tout');
  
    const handleCategory = (category: string) => {
        
        if (selectedCategory === category) {
            setSelectedCategory('Tout');
            router.setParams({ filter: 'Tout' });
            return;
        }

        setSelectedCategory(category);
        router.setParams({ filter: category });
    }

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3 mb-2"
        >
            {categories.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => handleCategory(item.category)}
                    className={`flex flex-col items-start mr-4 px-4 py-3 border-2 border-gray-200 rounded-full ${item.category === selectedCategory ? 'bg-primary-300' : 'bg-primary-100 border border-primary-200'}`}
                >
                    <Text className={`${item.category === selectedCategory ? 'text-white font-rubik-bold mt-0.5' : 'text-black-300 font-rubik'} text-sm` }>{item.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
  )
}

export default Filters