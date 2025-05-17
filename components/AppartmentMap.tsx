import React from 'react';
import { Platform, Text, View } from 'react-native';
import { AppleMaps, GoogleMaps } from 'expo-maps';

type ApartmentMapProps = {
    geoString: string; // Exemple : "geo:6.3725,2.3911"
};

const parseGeoString = (geoString: string): { latitude: number; longitude: number } | null => {
    if (!geoString.startsWith('geo:')) return null;
    const parts = geoString.replace('geo:', '').split(',');
    const latitude = parseFloat(parts[0]);
    const longitude = parseFloat(parts[1]);

    if (isNaN(latitude) || isNaN(longitude)) return null;

    return { latitude, longitude };
};

export default function ApartmentMap({ geoString }: ApartmentMapProps) {
    const coords = parseGeoString(geoString);

    if (!coords) {
        return (
            <View className="h-72 items-center justify-center bg-red-100 rounded-xl">
                <Text className="text-red-600 font-semibold">Coordonnées invalides</Text>
            </View>
        );
    }

    const commonProps = {
        className: "h-72 rounded-xl overflow-hidden",
        initialCamera: {
            center: {
                latitude: coords.latitude,
                longitude: coords.longitude,
            },
            zoom: 15,
        },
    };

    if (Platform.OS === 'ios') {
        return (
            <AppleMaps.View {...commonProps}>
                <AppleMaps.Marker
                    coordinate={coords}
                    title="Appartement"
                />
            </AppleMaps.View>
        );
    } else if (Platform.OS === 'android') {
        return (
            <GoogleMaps.View {...commonProps}>
                <GoogleMaps.Marker
                    coordinate={coords}
                    title="Appartement"
                />
            </GoogleMaps.View>
        );
    } else {
        return (
            <View className="h-72 items-center justify-center bg-gray-100 rounded-xl">
                <Text className="text-gray-700">Cartes non disponibles sur cette plateforme</Text>
            </View>
        );
    }
}
