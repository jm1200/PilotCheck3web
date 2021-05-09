import { Flex, Text } from "@chakra-ui/layout";
import {
  Redirect,
  Route,
  RouteProps,
  Switch,
  useHistory,
} from "react-router-dom";
import { propTypes } from "react-spinkit";
import { Wrapper } from "./components/Wrapper";
import { useMeQuery } from "./generated/graphql";
import { Checklist } from "./pages/Checklist";
import { EditPage } from "./pages/EditPage";
import { Login } from "./pages/login";
import { ProtectedHome } from "./pages/ProtectedHome";
import { PublicHome } from "./pages/PublicHome";
import { Register } from "./pages/register";
import { useAuth } from "./Providers/AuthProvider";

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
  const { user, loadingAuth } = useAuth();

  if (!loadingAuth && user?.me) {
    return <Route {...rest}>{children}</Route>;
  }

  if (!loadingAuth && !user?.me) {
    return <Redirect to={{ pathname: "/home" }} />;
  }

  return <Text>Loading</Text>;
};

const CustomRoute: React.FC<RouteProps> = ({ children, location, ...rest }) => {
  const { user, loadingAuth } = useAuth();

  if (!loadingAuth && user?.me) {
    return <Redirect to={{ pathname: "/home" }} />;
  }

  if (!loadingAuth && !user?.me) {
    return <Route {...rest}>{children}</Route>;
  }

  return <Text>Loading</Text>;
};
