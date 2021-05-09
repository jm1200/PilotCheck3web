import { createContext, useContext, useEffect, useState } from "react";
import {
  EmailPasswordInput,
  MeDocument,
  MeQuery,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRegisterMutation,
} from "../generated/graphql";
import { Signin, Signout, Signup } from "../types";

function useProvideAuth() {
  const { data: meData, loading: meLoading } = useMeQuery();

  const [me, setMe] = useState(meData);

  useEffect(() => {
    setMe(meData);
  }, [meData]);

  //Auth API
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const [register] = useRegisterMutation();

  const signin = async (values: EmailPasswordInput) => {
    const response = await login({
      variables: values,
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.login.user,
          },
        });
        //   cache.evict({ fieldName: "posts:{}" });
      },
    });

    return response;
  };

  const signup = async (values: EmailPasswordInput) => {
    const response = await register({
      variables: { options: values },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: "Query",
            me: data?.register.user,
          },
        });
      },
    });

    return response;
  };

  const signout = () => {
    setMe({
      __typename: "Query",
      me: null,
    });
    logout();
  };

  return {
    user: me,
    loadingAuth: meLoading,
    signin,
    signout,
    signup,
  };
}

interface AuthContext {
  user: MeQuery | undefined;
  loadingAuth: boolean;
  signin?: Signin;
  signup?: Signup;
  signout?: Signout;
}

const defaultAuthContext: AuthContext = {
  loadingAuth: false,
  user: undefined,
};

const authContext = createContext<AuthContext>(defaultAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  console.log("AuthProvider.tsx 96 AUTHUSER:", auth);
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
