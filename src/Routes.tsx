import { Flex } from "@chakra-ui/layout";
import { Route, RouteProps, Switch, useHistory } from "react-router-dom";
import { Wrapper } from "./components/Wrapper";
import { useMeQuery } from "./generated/graphql";
import { Checklist } from "./pages/Checklist";
import { EditPage } from "./pages/EditPage";
import { Login } from "./pages/login";
import { ProtectedHome } from "./pages/ProtectedHome";
import { PublicHome } from "./pages/PublicHome";
import { Register } from "./pages/register";

function ProtectedPage() {
  return <h3>Protected</h3>;
}

export const Routes = () => {
  return (
    <Flex flex={1}>
      <Switch>
        <Route exact path="/">
          <PublicHome />
        </Route>
        <CustomRoute path="/login">
          <Wrapper>
            <Login />
          </Wrapper>
        </CustomRoute>
        <CustomRoute path="/register">
          <Wrapper>
            <Register />
          </Wrapper>
        </CustomRoute>
        <PrivateRoute path="/home">
          <ProtectedHome />
        </PrivateRoute>
        <PrivateRoute path="/protected">
          <ProtectedPage />
        </PrivateRoute>
        <PrivateRoute>
          <EditPage />
        </PrivateRoute>
        <PrivateRoute path="/checklist">
          <Checklist xml="" />
        </PrivateRoute>
      </Switch>
    </Flex>
  );
};

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { data, loading } = useMeQuery();
  const history = useHistory();

  if (loading) {
    return null;
  }

  if (!loading && !data?.me) {
    history.push("/login", history.location.pathname);
  }

  return <Route {...rest}>{children}</Route>;
};

const CustomRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { data, loading } = useMeQuery();
  const history = useHistory();

  if (loading) {
    return null;
  }

  if (!loading && data?.me) {
    history.push("/home", history.location.pathname);
  }

  return <Route {...rest}>{children}</Route>;
};
