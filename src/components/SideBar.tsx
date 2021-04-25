import { Flex, ListItem, List, Link } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <Flex w="300px" bgColor="gray.700" h="100vh">
      <List>
        <ListItem>
          <Link as={RouterLink} to="/" mr={2}>
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/protected" mr={2}>
            protected
          </Link>
        </ListItem>
        <ListItem>
          <Link as={RouterLink} to="/login" mr={2}>
            login
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
};
