import { Switch, Route, Redirect, RouteProps } from "react-router-dom";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Wrapper } from "./components/Wrapper";
import { useMeQuery } from "./generated/graphql";
import { Box, Flex } from "@chakra-ui/layout";

function ProtectedPage() {
  return <h3>Protected</h3>;
}

export const Routes = () => {
  return (
    <Flex flex={1}>
      <Switch>
        <Route path="/login">
          <Wrapper>
            <Login />
          </Wrapper>
        </Route>
        <Route path="/register">
          <Wrapper>
            <Register />
          </Wrapper>
        </Route>
        <PrivateRoute path="/protected">
          <ProtectedPage />
        </PrivateRoute>
      </Switch>
    </Flex>
  );
};

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { data, loading } = useMeQuery();
  console.log("outside useEffect", data, loading);

  if (!data || loading) {
    //loading screen
    return null;
  }

  if (!data.me) {
    // user not logged in
    return <Redirect to="/login" />;
  }

  return <Route {...rest}>{children}</Route>;
};
