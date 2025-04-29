import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import { FlatList, Image, Modal, Pressable, Text, View } from "react-native";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
    gallery: any
}>;

export default function Gallery({ isVisible, onClose, gallery }: Props) {
    return (
        <View>
            <Modal animationType="slide" transparent={true} visible={isVisible}>
                <View className="absolute bottom-0 w-full h-1/3 bg-[#25292e] rounded-t-2xl">
                    {/* Header */}
                    <View className="h-[16%] bg-[#464C55] rounded-t-xl px-5 flex-row items-center justify-between">
                        <Text className="text-white text-base">Images Gallery</Text>
                        <Pressable onPress={onClose}>
                            <MaterialIcons name="close" color="#fff" size={22} />
                        </Pressable>
                    </View>

                    {/* Gallery list */}
                    <FlatList
                        data={gallery}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        contentContainerClassName="p-16 pt-10 gap-5"
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item.image }}
                                className="w-full h-full mr-4 rounded-lg"
                                resizeMode="cover"
                            />
                        )}
                    />
                </View>
            </Modal>
        </View>
    );
}
