import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useReducer } from 'react';

// eslint-disable-next-line import/no-cycle
import AppContextModal from '@/components/appContextModal/AppContextModal';

interface IPage {
  name: string;
  path: string;
  value: number;
}

export const Pages = {
  Home: {
    name: 'Home',
    path: '/',
    value: 0,
  },
  Profile: {
    name: 'Profile',
    path: '/profile',
    value: 1,
  },
  Chat: {
    name: 'Chat',
    path: '/chat',
    value: 2,
  },
  Settings: {
    name: 'Settings',
    path: '/settings',
    value: 3,
  },
  // ...
};

interface IModal {
  name: string;
  value: number;
}

export const Modals = {
  None: {
    name: 'None',
    value: 0,
  },
  CreatePublication: {
    name: 'CreatePublication',
    value: 1,
  },
  // ...
};

interface IState {
  page: IPage;
  modal: IModal;
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
    modal: Modals.None,
  },
  dispatch: () => {},
});

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'SET_MODAL':
      return {
        ...state,
        modal: action.payload,
      };
    default:
      return state;
  }
};

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    page: Pages.Home,
    modal: Modals.None,
  });

  const router = useRouter();

  useEffect(() => {
    router.push(state.page.path);
  }, [state.page]);

  useEffect(() => {
    switch (router.pathname) {
      case Pages.Home.path:
        dispatch({ type: 'SET_PAGE', payload: Pages.Home });
        break;
      case Pages.Profile.path:
        dispatch({ type: 'SET_PAGE', payload: Pages.Profile });
        break;
      case Pages.Chat.path:
        dispatch({ type: 'SET_PAGE', payload: Pages.Chat });
        break;
      case Pages.Settings.path:
        dispatch({ type: 'SET_PAGE', payload: Pages.Settings });
        break;
      default:
        break;
    }
  }, [router.pathname]);

  useEffect(() => {}, [state.modal]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <AppContextModal />
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};

export { AppContextProvider, useAppContext };
