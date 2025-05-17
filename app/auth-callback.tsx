import { Redirect } from 'expo-router';
import { useGlobalContext } from '@/contexts/global-provider';

export default function AuthCallback() {
  
    return <Redirect href="/" />; // ✅ redirige vers la Home après login
}
