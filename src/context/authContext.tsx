import { supabase } from "@/supabase/supabaseClient";
import { createContext, useEffect, useState } from "react";

type AuthResult = { sucsses: true; data: any } | { sucsses: false; error: any };
type AuthContextType = {
  session: any; // می‌تونی اینو دقیق‌تر تعریف کنی اگه ساختار session مشخصه
  signUp: (payload: PayloadType) => Promise<AuthResult>;
  signIn: (payload: PayloadType) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};
const defaultValue: AuthContextType = {
  session: null,
  signUp: async () => ({ sucsses: false, error: null }),
  signIn: async () => ({ sucsses: false, error: null }),
  signOut: async () => {},
};
export const authContext = createContext<AuthContextType>(defaultValue);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type PayloadType = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [session, setSession] = useState<any>(null);
  const signUp = async (payload: PayloadType): Promise<AuthResult> => {
    // Implement sign-up logic here
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          displayName: payload.name,
        },
      },
    });
    if (error) {
      if (error.status === 400) {
        console.error("Bad request:", error.message);
      } else if (error.status === 422) {
        return {
          sucsses: false,
          error: "کاربری با این ایمیل قبلا ثبت نام شده است.",
        };
      } else {
        console.error("Unexpected error:", error.message);
      }
      return { sucsses: false, error: error.message };
    }
    setSession(data?.session);
    return { sucsses: true, data: data };
  };
  const signIn = async (payload: PayloadType): Promise<AuthResult> => {
    return { sucsses: false, error: null }; // موقتی
  };
  const signOut = async () => {
    // Implement sign-out logic here
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    console.log(session);
  }, []);

  return (
    <authContext.Provider value={{ session, signUp, signIn, signOut }}>
      {children}
    </authContext.Provider>
  );
}
