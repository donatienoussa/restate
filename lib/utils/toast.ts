// components/ToastMessenger.tsx
import { View, Text } from 'react-native';
import type { ToastProps, ToastType } from 'react-native-toast-message';
import Toast from 'react-native-toast-message';

export const toast = (text1: string, text2?: string, type?: ToastType, props?: ToastProps) => {
    return Toast.show({
        type: type ? type: 'success',
        text1,
        text2,
        ...props,
    });
};