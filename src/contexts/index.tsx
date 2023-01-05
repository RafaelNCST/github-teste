import { createContext, useState } from "react";
import { MainContextProps } from "./types";
import { ChildrenTypes } from "./types";

export const MainContext = createContext({} as MainContextProps);

export const MainContextProvider = ({ children }: ChildrenTypes) => {
  const [userInfos, setUserInfos] = useState<any>(
    JSON.parse(sessionStorage.getItem("user") as string) || {}
  );
  const [actualPage, setActualPage] = useState<number>(
    Number(sessionStorage.getItem("page")) || 1
  );

  return (
    <MainContext.Provider
      value={{ userInfos, setUserInfos, actualPage, setActualPage }}
    >
      {children}
    </MainContext.Provider>
  );
};
