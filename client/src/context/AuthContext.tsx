import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";

interface State {
  id: string | null;
  email: string | null;
  expiresAt: Number | null;
}

interface Action {
  type: "setAuth";
  payload: State;
}

interface ContextProps {
  setAuthState: ({ type, payload }: Action) => void;
  authState: {};
}

const AuthContext = createContext({} as ContextProps);
const { Provider } = AuthContext;

const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setAuth":
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        expiresAt: action.payload.expiresAt,
      };
    default:
      throw new Error("Invalid 'action.type'");
  }
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);

  // Will check to see if a user is already logged in
  useEffect(() => {
    const fetchUser = () => {
      if (!localStorage.getItem("user")) return;

      setUser(JSON.parse(localStorage.getItem("user") || ""));
    };

    fetchUser();
  }, []);

  const [state, dispatch] = useReducer(authReducer, {
    id: null,
    email: null,
    expiresAt: null,
  });

  return (
    <Provider value={{ setAuthState: dispatch, authState: user || state }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider, authReducer };
