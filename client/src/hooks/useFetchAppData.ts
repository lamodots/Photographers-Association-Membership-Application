import { useState, useEffect } from "react";

// const API_URL = process.env.REACT_APP_CLIENT_URL;
const API_URL = "https://membership-application-cms.onrender.com";

interface ValuesProps {
  appname: string;
  appname_acronym: string;
  paymentapi: string;
  whatsappapi: string;
  pagelink: string[];
  applogo: File | null;
  sendgridapi: string;
}

const useFetchAppData = () => {
  const [appData, setAppData] = useState<ValuesProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function getAppSettings() {
    try {
      const res = await fetch(`${API_URL}/api/v1/secure/settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Error fetching App settings`);
      }
      const { appDetails } = await res.json();
      setAppData(appDetails[0]);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch app settings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAppSettings();
  }, []);

  return { appData, error, loading };
};

export default useFetchAppData;
