import { useGlobalContext } from "@/contexts/global-provider";
import { Redirect, Slot, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout() {

    const { loading, isLogged } = useGlobalContext();

    if (loading) {

        return (
            <SafeAreaView className="bg-white flex-1 w-full justify-center items-center">
                <ActivityIndicator className="text-primary" size="large" />
            </SafeAreaView>
        );
    }

    if (!isLogged) {
        return <Redirect href="/sign-in" />
    }

    return <Slot />; {/** Meaning current screen */ }
}