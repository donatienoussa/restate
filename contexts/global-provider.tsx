import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface User {
    id: string;
    name?: string;
    email?: string;
    avatar?: string;
}

interface GlobalContextType {
    isLogged: boolean;
    user: User | null;
    loading: boolean;
    refetch: () => void;
    fetchUser: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        const {
            data: { session },
        } = await supabase.auth.getSession();


        if (session?.user) {
            const { id, email, user_metadata } = session.user;
            setUser({
                id,
                email,
                name: user_metadata?.name ?? '',
                avatar: user_metadata?.avatar_url ?? '',
            });
        } else {
            setUser(null);
        }

        setLoading(false);
    };

    const refetch = () => {
        fetchUser();
    };

    useEffect(() => {
        fetchUser();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                const { id, email, user_metadata } = session.user;
                setUser({
                    id,
                    email,
                    name: user_metadata?.name ?? '',
                    avatar: user_metadata?.avatar_url ?? '',
                });

            
            } else {
                setUser(null);
            }
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const isLogged = !!user;

    return (
        <GlobalContext.Provider value={{ isLogged, user, loading, refetch, fetchUser }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error("useGlobalContext must be used within a GlobalProvider");

    return context;
};

export default GlobalProvider;










// import React, { createContext, useContext, ReactNode } from "react";

// import { getCurrentUser } from "@/lib/appwrite";
// import { useAppwrite } from "@/hooks/useAppwrite";

// interface User {
//     $id: string;
//     name: string;
//     email: string;
//     avatar: string;
// }


// interface GlobalContextType {
//     isLogged: boolean;
//     user: User | null;
//     loading: boolean;
//     refetch: () => void;
// }

// const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// interface GlobalProviderProps {
//     children: ReactNode;
// }

// export const GlobalProvider = ({ children }: GlobalProviderProps) => {
//     const {
//         data: user,
//         loading,
//         refetch,
//     } = useAppwrite({
//         fn: getCurrentUser,
//     });

//     const isLogged = !!user;

//     console.log('USER INFO', JSON.stringify(user, null, 2));

//     return (
//         <GlobalContext.Provider
//             value={{
//                 isLogged,
//                 user,
//                 loading,
//                 refetch,
//             }}
//         >
//             {children}
//         </GlobalContext.Provider>
//     );
// };

// export const useGlobalContext = (): GlobalContextType => {
//     const context = useContext(GlobalContext);
//     if (!context)
//         throw new Error("useGlobalContext must be used within a GlobalProvider");

//     return context;
// };

// export default GlobalProvider;