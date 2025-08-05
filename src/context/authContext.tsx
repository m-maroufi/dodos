import { supabase } from "@/supabase/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";

type AuthResult = { sucsses: true; data: any } | { sucsses: false; error: any };
type AuthContextType = {
  session: Session | null; // می‌تونی اینو دقیق‌تر تعریف کنی اگه ساختار session مشخصه
  signUp: (payload: PayloadType) => Promise<AuthResult>;
  signIn: (payload: PayloadType) => Promise<AuthResult>;
  signOut: () => Promise<AuthResult>;
  loading: boolean;
};
const defaultValue: AuthContextType = {
  session: null,
  signUp: async () => ({ sucsses: false, error: null }),
  signIn: async () => ({ sucsses: false, error: null }),
  signOut: async () => ({ sucsses: false, error: null }),
  loading: true,
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
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    if (error) {
      if (error.status === 400) {
        console.error("Bad request:", error.message);
        return {
          sucsses: false,
          error: "کاربری با این مشخصات یافت نشد",
        };
      } else {
        console.error("Unexpected error:", error.message);
        return {
          sucsses: false,
          error: "ارسال با شکست مواجهه شد",
        };
      }
    }
    setSession(data.session);
    return { sucsses: true, data: data };
  };
  const signOut = async (): Promise<AuthResult> => {
    // Implement sign-out logic here
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error("مشکلی پیش آمد");
      } else {
        return { sucsses: true, data: null };
      }
    } catch (error) {
      return { sucsses: false, error: "اوه!،مشکلی پیش آمد" };
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    console.log(session);
  }, []);

  return (
    <authContext.Provider value={{ session, signUp, signIn, signOut, loading }}>
      {children}
    </authContext.Provider>
  );
}
