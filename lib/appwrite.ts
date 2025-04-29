import { Client, Account, ID, OAuthProvider, Avatars, Databases, Query } from 'react-native-appwrite';
import * as Linking from 'expo-linking'
import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session'
import { openAuthSessionAsync } from 'expo-web-browser';


export const config = {
    platform: 'com.donatien.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!, 
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLLECTION_ID!,
    galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLLECTION_ID!,
    reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLLECTION_ID!,
    propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLLECTION_ID!,

}

export const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);


const account = new Account(client);
const avatars = new Avatars(client);
export const databases = new Databases(client);


export async function login2() {
    try {
        
        //Lorsque je serai en mode Dev build, je vais revenir pour gérer la redirection
        const redirectUri = AuthSession.makeRedirectUri({
            scheme: 'restate',
        });

        console.log("Redirection", redirectUri)

        const response = account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri,
        );
        if (!response) throw new Error("Create OAuth2 token failed");

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        );
        if (browserResult.type !== "success")
            throw new Error("Create OAuth2 token failed");

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();
        if (!secret || !userId) throw new Error("Create OAuth2 token failed");

        const session = await account.createSession(userId, secret);
        if (!session) throw new Error("Failed to create session");

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}



//This function is used to authenticated a user by his Google Account
export const login = async () => {
   
    try {
        // Create a deep link that works across Expo environments
        // Ensure localhost is used for the hostname to validation error for success/failure URLs
        const deepLink = new URL(makeRedirectUri({ preferLocalhost: true }));
        if (!deepLink.hostname) {
            deepLink.hostname = 'localhost';
        }
        const scheme = `${deepLink.protocol}//`; // e.g. 'exp://' or 'playground://'

        console.log("Redirection", scheme)
       
        const loginUrl = account.createOAuth2Session(
            OAuthProvider.Google,
            `${deepLink}`,
            `${deepLink}`,
        );

        if (!loginUrl) throw new Error('Create OAuth token failed.');

        const browserResult = await openAuthSessionAsync(`${loginUrl}`,scheme);

        if (browserResult.type != "success") {
            throw new Error('Create OAuth token failed.');
        }

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();
        if (!secret || !userId) throw new Error('Create OAuth token failed.');

        const session = account.createSession(userId, secret);
        if (!session) throw new Error('Failed to create SEssion');

        return true;
    
    } catch (error) {
        console.error(error);     
        return false;
    }
}

export const logout = async () => {
    try {
        const result = await account.deleteSession('current'); 
        return result;

    } catch (error) {
        console.error(error); 
        return false;
    }
}

/**
 * This function get informations about current user. 
 * If the user is find, the function return infos about him. 
 * If not, it return null
 */
export const getCurrentUser = async () => {
    
    try {
        const result = await account.get(); 
        
        if (result.$id) {
            const userAvatar = avatars.getInitials(result.name); 

            return { 
                ...result, 
                avatar: userAvatar.toString()
            }
        }

        return null;
    } catch (error) {
        console.error(error); 
        return null; 
    }
}


export const getLatestProperties = async () => {
    
    try {
        const result = await databases.listDocuments(
            config.databaseId,
            config.propertiesCollectionId,
            [
                Query.orderAsc("$createdAt"),
                Query.limit(5)
            ]
        );

        return result.documents; 
        
    }catch(error){
        console.log(error);
        return [];
    }
}

export const getProperties = async ({ filter, query, limit }: { filter: string; query: string;  limit?:number}) => {
    
    try {

        const buildQuery = [Query.orderDesc("$createdAt")]; 

        if (filter && filter !== 'All') {
            buildQuery.push(Query.equal('type', filter));    
        }

        if (query) {
            buildQuery.push(
                Query.or([
                    Query.search('name', query),
                    Query.search('address', query),
                    Query.search('filter', query)
                ])
            );
        }

        if (limit) {
            buildQuery.push(Query.limit(limit));
        }

        const result = await databases.listDocuments(
            config.databaseId,
            config.propertiesCollectionId,
            buildQuery
        );

        return result.documents;

    } catch (error) {
        console.log(error); 
        return [];
    }
}

export const getProperty = async ({ id }: { id: string }) => {

    
    try{
        const result = await databases.getDocument(
            config.databaseId,
            config.propertiesCollectionId, id
        );
        
        if (result) return result;
        
        return null;

    }catch(error){
        console.log(error)
        return null; 
    }
}