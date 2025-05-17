import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import * as WebBrowser from 'expo-web-browser';
WebBrowser.maybeCompleteAuthSession();


const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.

// AppState.addEventListener('change', (state) => {
//     if (state === 'active') {
//         supabase.auth.startAutoRefresh()
//     } else {
//         supabase.auth.stopAutoRefresh()
//     }
// });



export const getLatestProperties = async () => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`*, reviews(*), galleries(*)`)
      .order('created_at', { ascending: true })
      .limit(5);

    if (error) {
      throw error;
    }

    return data;
  } catch (err) {
    console.error('Erreur lors de la récupération des dernières propriétés :', err);
    return [];
  }
};


export const getProperties = async ({
    filter,
    query,
    limit,
}: {
    filter: string;
    query: string;
    limit?: number;
}) => {
    try {
        let queryBuilder = supabase
            .from('properties')
            .select(`*, reviews(*), galleries(*)`)
            .order('created_at', { ascending: false });

        // Filtrage par type de propriété (si spécifié)
        if (filter && filter !== 'Tout') {
            queryBuilder = queryBuilder.eq('type', filter);
        }

        // Recherche dans les champs 'name', 'address', et 'description'
        if (query) {
            queryBuilder = queryBuilder.ilike('name', `%${query}%`)
                .or(`address.ilike.%${query}%,description.ilike.%${query}%`);
        }

        // Limite des résultats
        if (limit) {
            queryBuilder = queryBuilder.limit(limit);
        }

        // Exécution de la requête
        const { data, error } = await queryBuilder;

        if (error) {
            console.error('Erreur lors de la récupération des propriétés:', error);
            return [];
        }

        return data; // Retourne les données des propriétés

    } catch (error) {
        console.error('Erreur lors de la récupération des propriétés:', error);
        return [];
    }
};


export const getPropertyById = async ({ id }: { id: string }) => {

    
    try{
        const result = await supabase
            .from('properties')
            .select(`*, reviews(*), galleries(*), agent:agent_id(id, name, avatar)`)
            .eq('id', id)
            .single();
        
        if (result) return result['data']; //because result is like {count: value, data: value}
        
        return null;

    }catch(error){
        console.log(error)
        return null; 
    }
}