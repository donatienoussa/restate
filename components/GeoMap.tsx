import { View, Text } from 'react-native'
import React from 'react'

export default function GeoMap() {
  return (
    <View>
      <Text>GeoMap</Text>
    </View>
  )
}




// import React from 'react';
// import { View } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// type GeoMapProps = {
//     latitude: number;
//     longitude: number;
// };

// const GeoMap = ({ latitude, longitude }: GeoMapProps) => {
//     return (
//         <View className="flex-1 rounded-2xl overflow-hidden">
//             <MapView
//                 className="w-full h-full"
//                 initialRegion={{
//                     latitude,
//                     longitude,
//                     latitudeDelta: 0.05,
//                     longitudeDelta: 0.05,
//                 }}
//             >
//                 <Marker
//                     coordinate={{ latitude, longitude }}
//                     title="Position"
//                     description={`Lat: ${latitude}, Lng: ${longitude}`}
//                 />
//             </MapView>
//         </View>
//     );
// };

// export default GeoMap;
