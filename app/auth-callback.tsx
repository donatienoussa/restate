import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useGlobalContext } from '@/contexts/global-provider';

export default function AuthCallback() {
    const { refetch, user, isLogged } = useGlobalContext();
    

    console.log("logged", isLogged);


    useEffect(() => {
        refetch(); // recharge les données utilisateur
    }, []);

    return <Redirect href="/" />; // ✅ redirige vers la Home après login
}
