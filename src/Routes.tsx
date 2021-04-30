import { Switch, Route, RouteProps, useHistory } from "react-router-dom";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Wrapper } from "./components/Wrapper";
import { Flex } from "@chakra-ui/layout";
import { EditPage } from "./pages/EditPage";
import { ProtectedHome } from "./pages/ProtectedHome";
import { PublicHome } from "./pages/PublicHome";
import { Checklist } from "./pages/Checklist";
import { useMeQuery } from "./generated/graphql";

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
        <PrivateRoute path="/edit-page">
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
