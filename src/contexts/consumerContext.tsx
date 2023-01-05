import { useContext } from "react";
import { MainContext } from ".";

export const ConsumerMainContext = () => {
  if (!MainContext) {
    throw "Não é possível usar este método fora de MainContextProvider";
  }

  return useContext(MainContext);
};
