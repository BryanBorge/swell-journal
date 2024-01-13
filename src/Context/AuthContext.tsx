import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
type AuthContextType = {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const defaultContext: AuthContextType = {
  user: undefined,
  setUser: () => {},
  loading: false,
  setLoading: () => {},
};

export const AuthContext = createContext(defaultContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let unsubscribe: any;
    unsubscribe = onAuthStateChanged(auth, currentUser => {
      setLoading(false);
      if (!!currentUser) {
        setUser(currentUser);
      } else {
        setUser(undefined);
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
