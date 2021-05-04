import { createContext, useContext, useEffect, useState } from "react";

import { useUserDataQuery } from "../generated/graphql";
interface DataProviderProps {}

const DataContext = createContext({
  userData: "",
  userDataLoading: false,
});

const useProvideData = () => {
  const {
    data: userData,
    error,
    loading: userDataLoading,
  } = useUserDataQuery();

  if (error) {
    console.log("DataProvider.tsx 13 error:", error);
  }

  const [data, setData] = useState("");

  useEffect(() => {
    if (userData?.userData?.directories) {
      setData(userData?.userData?.directories);
    }
  }, [userData]);

  return {
    userData: data,
    userDataLoading,
  };
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const value = useProvideData();
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};
