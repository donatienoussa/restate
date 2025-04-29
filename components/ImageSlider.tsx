import { Modal, Pressable, Text, View, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { MaterialIcons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { Image } from "react-native";
import { useCallback } from "react";

type Props = {
    isVisible: boolean;
    onClose: () => void;
    images: string[];
};

export default function ImageSlider({ isVisible, onClose, images }: Props) {
    const { width } = useWindowDimensions();
    const height = Dimensions.get("window").height * 0.5;

    const renderItem = useCallback(({ item }: { item: string }) => (
        <View className="items-center justify-center rounded-2xl overflow-hidden">
            <Image
                source={{ uri: item }}
                className="w-full h-full rounded-2xl"
                resizeMode="cover"
            />
        </View>
    ), []);

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View className="flex-1 bg-black/80 justify-center items-center px-4">
                {/* Close button */}
                <Pressable onPress={onClose} className="absolute top-12 right-6 z-10">
                    <MaterialIcons name="close" size={28} color="#fff" />
                </Pressable>

                {/* Carousel */}
                <View className="rounded-3xl overflow-hidden shadow-2xl" style={{ width, height }}>
                    <Carousel
                        width={width}
                        height={height}
                        data={images}
                        renderItem={renderItem}
                        autoPlay={false}
                        scrollAnimationDuration={500}
                        style={{ borderRadius: 24 }}
                    />
                </View>
            </View>
        </Modal>
    );
}
