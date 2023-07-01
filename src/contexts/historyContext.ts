import { createContext } from "react";

// Context to store the current history of the user
const historyContext = createContext<{ isBack: boolean }>({ isBack: false });
export default historyContext;
