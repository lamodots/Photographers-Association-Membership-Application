import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CurrentUser {
  firstname: string;
  lastname: string;
  userId: string;
  role: string;
}
interface CurrentUserContextType {
  currentUser: CurrentUser | null;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = ({ children }: AuthContextProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("/api/v1/secure/auth/currentUser", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data: CurrentUser = await res.json();
          setCurrentUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

// export const useCurrentUser = () => useContext(CurrentUserContext);
export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error("useCurrentUser must be used within an AuthContext");
  }
  return context;
};
