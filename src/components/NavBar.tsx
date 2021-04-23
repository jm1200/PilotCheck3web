import React from "react";
import { Box, Link, Flex, Button, Heading } from "@chakra-ui/react";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = () => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery();

  console.log(data, loading);

  let body = null;

  // data is loading
  if (loading) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <Link as={RouterLink} to="/login" mr={2}>
          login
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
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <RouterLink to="/">
          <Heading>LiReddit</Heading>
        </RouterLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
