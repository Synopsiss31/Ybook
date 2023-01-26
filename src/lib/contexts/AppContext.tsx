import { createContext, useContext, useReducer } from "react";


export const Pages = {
  Home: 0,
  Profile: 1,
  Chat:3,
  Settings: 3,
  //...
}


interface IState {
  page: number;
}

interface IAction {
  type: string;
  payload: any;
}

interface IAppContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}


const AppContext = createContext<IAppContext>({
  state: {
    page: Pages.Home,
  },
  dispatch: () => { },
});

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}

const AppContextProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    page: Pages.Home,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }
  return context;
}

export { AppContextProvider, useAppContext };


