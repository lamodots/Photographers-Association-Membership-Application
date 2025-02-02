import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate } from "react-router-dom";
import { date } from "yup";

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
  profile: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  loading: boolean;
  fetchCurrentUser: () => void;
  handleLogout: () => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

interface AuthContextProps {
  children: ReactNode;
}

// const API_URL = process.env.REACT_APP_CLIENT_URL;
const API_URL = "https://membership-application-cms.onrender.com";

export const AuthContext = ({ children }: AuthContextProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [profile, setProfile] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/v1/secure/profile`, {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 304) {
        console.log("Server returned 304; resource not modified.");
        return; // Or utilize previously fetched data from a state/cache
      }
      if (res.ok) {
        const data: CurrentUser = await res.json();

        setCurrentUser(data);
        setProfile(data);
      } else {
        setCurrentUser(null);
        setProfile(null);
      }
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setCurrentUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  async function handleLogout() {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1200));
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
    <CurrentUserContext.Provider
      value={{
        currentUser,
        loading,
        profile,
        setCurrentUser,
        fetchCurrentUser,
        handleLogout,
      }}
    >
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
