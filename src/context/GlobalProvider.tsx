'use client'
import { ProductType } from "@/lib/types";
import { useRouter } from "@tanstack/react-router";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";

type GlobalContextType = {
  posts: ProductType[] | null;
  // setUser: React.Dispatch<React.SetStateAction<User | null>>;
};


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
   const router = useRouter()
     const [posts, setPosts] = useState<ProductType[] | []>([])
     
    const fetchPosts = async () => {
      try {
        const accessToken = Cookies.get('access_token')
    
        if (!accessToken) {
          router.navigate({ to: '/login' })
          return
        }
    
        console.log('Sending request...')
    
        const datares = await axios.get(
          'https://talk-l955.onrender.com/api/v1/products/marketplace/list-products/',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
    
        console.log("Fetched posts:", datares)
        const res = datares.data.results.data
        setPosts(res)
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status
    
          if (status === 401 || status === 403) {
            // Invalid or expired token
            Cookies.remove('access_token') // Optional: clean the token
            router.navigate({ to: '/login' })
          } else {
            console.error(`API Error [${status}]:`, error.response?.data || error.message)
          }
        } else {
          console.error('Unexpected error:', error)
        }
      }
    }
    
      useEffect(() => {
        fetchPosts()
      }, [])
    

  return (
    <GlobalContext.Provider value={{ posts }}>
      {children}
    </GlobalContext.Provider>
  );
};


export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used inside GlobalProvider");
  }
  return context;
};