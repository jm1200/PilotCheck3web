import React from "react";
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/react";
import { useApolloClient } from "@apollo/client";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import { TestIdWrapper } from "./TestIdWrapper";
import { useMeQuery } from "../generated/graphql";

let Spinner = require("react-spinkit");

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  // const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { signout } = useAuth();
  const apolloClient = useApolloClient();
  const history = useHistory();
  const { data, loading } = useMeQuery();

  let body = null;

  // data is loading
  if (loading) {
    body = (
      <Box>
        <Spinner name="circle" color="white" />
      </Box>
    );
  } else if (!data?.me) {
    body = (
      <>
        <Link as={RouterLink} to="/login" mr={2}>
          <TestIdWrapper id="loginLink">login</TestIdWrapper>
        </Link>

        <Link as={RouterLink} to="/register" mr={2}>
          register
        </Link>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex align="center">
        <Box mr={2}>{data.me.email}</Box>
        <Link as={RouterLink} to="/protected" mr={2}>
          protected
        </Link>
        <Button
          onClick={async () => {
            // await logout();
            signout!();
            history.push("/");
            await apolloClient.resetStore();
          }}
          // isLoading={logoutFetching}
          variant="link"
        >
          <TestIdWrapper id="logoutButton">logout</TestIdWrapper>
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <RouterLink to="/">
          <Heading size="md">PilotCheck</Heading>
        </RouterLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
