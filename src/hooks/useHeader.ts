import type { Session } from "@supabase/supabase-js";

import { supabase } from "@utils/supabase";
import { useEffect, useState } from "react";

const useHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
   
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
        setError(error);
        setLoading(false);
        return;
      }

      setData(data.session);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
    

      setData(session);
    });


    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error);
      setError(error);
      return;
    }

    setData(null);
  };

  return {
    isOpen,
    setIsOpen,
    handleLogout,
    data,
    loading,
    error,
  };
};

export default useHeader;
