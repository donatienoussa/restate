import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import icons from '@/constants/icons';
import { Redirect } from 'expo-router';
import { useGlobalContext } from '@/contexts/global-provider';
import { supabase } from '@/lib/supabase';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { toast } from '@/lib/utils/toast';

export default function SignIn() {
    const { isLogged, loading, refetch } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/" />;

    const handler = async () => {
        try {
            const redirectUri = AuthSession.makeRedirectUri({
                path: 'auth-callback',
            });

            const { error, data } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: redirectUri,
                },
            });

            if (error) {
                //Alert.alert('Erreur de connexion', error.message);
                toast(error.message);
            }

            const result = await WebBrowser.openAuthSessionAsync(data.url!, redirectUri);

            if (result.type === 'success' && result.url) {
                const url = new URL(result.url);
                const hash = url.hash;
                const params = new URLSearchParams(hash.substring(1));

                const access_token = params.get('access_token');
                const refresh_token = params.get('refresh_token');

                if (access_token && refresh_token) {
                    await supabase.auth.setSession({
                        access_token,
                        refresh_token,
                    });
                }

                refetch();

                return <Redirect href="/" />;
            } else {
                //Alert.alert('Erreur', 'La connexion a échoué ou a été annulée.');
                toast('Erreur', 'La connexion a échoué ou a été annulée.');
            }
        } catch (error) {
            console.error(error);
            //Alert.alert('Erreur', 'Une erreur est survenue pendant la connexion.');
            toast('Erreur', 'Une erreur est survenue pendant la connexion.', 'error');
        }
    };


    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-white dark:bg-black">
                <ScrollView contentContainerClassName="h-full">
                    <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain" />

                    <View className="px-10">
                        <Text className="font-rubik-extrabold text-center uppercase text-2xl dark:text-white">
                            BIENVENUE SUR REAL SCOUT
                        </Text>
                        <Text className="font-rubik text-3xl text-center text-black dark:text-white">
                            Acheter votre {'\n'}
                            <Text className="text-primary"> votre maison de rêve</Text>
                        </Text>
                        <Text className="text-center text-base text-zinc-700 dark:text-zinc-300 mt-3">
                            Connectez-vous à Real Scout avec Google
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={handler}
                        className="shadow-md shadow-zinc-300 dark:shadow-zinc-700 rounded-full w-full py-4 mt-5"
                    >
                        <View className="flex flex-row items-center justify-center bg-white dark:bg-zinc-900 p-3 m-5 rounded-lg">
                            <Image source={icons.google} className="w-5 h-5" resizeMode="contain" />
                            <Text className="text-lg font-rubik ml-2 text-black dark:text-white">
                                Continuer avec Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
