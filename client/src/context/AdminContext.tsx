import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const API_URL = process.env.REACT_APP_CLIENT_URL;
// interface CurrentUser {
//   firstname: string;
//   lastname: string;
//   userId: string;
//   role: string;
// }
interface SocialLink {
  facebook?: string;
  linkedIn?: string;
}

interface User {
  _id: string;
  image: string;
  firstname: string;
  lastname: string;
  email: string;
  Dob: Date;
  phone: string;
  location: string;
  address: string;
  aboutuser: string;
  social: SocialLink[];
  interest: string[];
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Plan {
  _id: string;
  name: string;
  interval: string;
  amount: number;
  description: string;
}

interface Subscription {
  _id: string;
  userId: string;
  planId: Plan;
  startDate: Date;
  expiryDate: Date;
  status: string;
}

interface CurrentUser {
  user: User;
  subscription: Subscription;
}

interface CurrentUserContextType {
  currentUser: CurrentUser | null;
  handleLogout: () => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = ({ children }: AuthContextProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  console.log("HEY FROM CONTEXT", currentUser);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("/api/v1/secure/profile", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data: CurrentUser = await res.json();
          setCurrentUser(data);
        } else {
          setCurrentUser(null); // Handle unauthorized access
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setCurrentUser(null);
      }
    };
    fetchCurrentUser();
  }, []);

  async function handleLogout() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const res = await fetch(`${API_URL}/api/v1/secure/auth/logout`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        setCurrentUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <CurrentUserContext.Provider value={{ currentUser, handleLogout }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within an AuthContext");
  }
  return context;
};
