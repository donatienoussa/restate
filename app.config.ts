import { ConfigContext, ExpoConfig } from "expo/config";


const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';


const getUniqueIdentifier = () => {
    if (IS_DEV) {
        return 'com.dholmesodb.restate.dev';
    }

    if (IS_PREVIEW) {
        return 'com.dholmesodb.restate.preview';
    }

    return 'com.dholmesodb.restate';
};

const getAppName = () => {
    if (IS_DEV) {
        return 'Restate (Dev)';
    }

    if (IS_PREVIEW) {
        return 'Restate (Preview)';
    }

    return 'Restate';
};


export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config, 
    "name": getAppName(),
    "slug": "Restate",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "restate",
    "platforms":["android", "ios", "web"],
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
        "supportsTablet": true, 
        bundleIdentifier: getUniqueIdentifier()
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/icon.png",
        "backgroundColor": "#ffffff"
        },
      "package": getUniqueIdentifier(),
      "config": {
        "googleMaps": {
          "apiKey": process.env.EXPO_GOOGLE_MAPS_API_KEY
        }
      } 
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "resizeMode": "cover",
          "backgroundColor": "#ffffff"
        }
      ],
      [
        "expo-font",
        {
          "fonts": [
            "./assets/fonts/Rubik-Bold.ttf",
            "./assets/fonts/Rubik-ExtraBold.ttf",
            "./assets/fonts/Rubik-Light.ttf",
            "./assets/fonts/Rubik-Medium.ttf",
            "./assets/fonts/Rubik-Regular.ttf",
            "./assets/fonts/Rubik-SemiBold.ttf"
          ]
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "892124e5-d454-4ab5-ab31-447aefad7df9"
      }
    },
    "owner": "dholmesodb"
})