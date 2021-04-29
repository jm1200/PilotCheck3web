import { Flex, ListItem, List, Link } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

export const Sidebar = () => {
  const { data, loading } = useMeQuery();

  let authUser: Boolean = !loading && !!data?.me;

  return (
    <Flex w="200px" bgColor="gray.700" h="100vh">
      <List>
        <ListItem>
          <Link as={RouterLink} to={authUser ? "/home" : "/"} mr={2}>
            Home
          </Link>
        </ListItem>

        {authUser ? (
          <>
            <ListItem>
              <Link as={RouterLink} to="/protected" mr={2}>
                protected
              </Link>
            </ListItem>
            <ListItem>
              <Link as={RouterLink} to="/edit-page" mr={2}>
                Edit Page
              </Link>
            </ListItem>
            <ListItem>
              <Link as={RouterLink} to="/checklist" mr={2}>
                Checklist
              </Link>
            </ListItem>
          </>
        ) : null}
      </List>
    </Flex>
  );
};
