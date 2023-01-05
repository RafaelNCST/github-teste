import { Dispatch, SetStateAction } from "react";

export interface ChildrenTypes {
  children: React.ReactNode;
}

export interface MainContextProps {
  userInfos: any;
  setUserInfos: Dispatch<SetStateAction<any>>;
  actualPage: number;
  setActualPage: Dispatch<SetStateAction<number>>;
}
