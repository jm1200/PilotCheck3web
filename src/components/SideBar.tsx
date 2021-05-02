import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import { useMeQuery } from "../generated/graphql";
import { Folder } from "../types";
import { Directories } from "./Directories/Directories";

const defaultDirectories: Folder[] = [
  {
    id: "0",
    open: false,
    folderName: "Checklists",
    order: 0,
    contents: { folders: [], files: [] },
    editable: false,
  },
  {
    id: "1",
    open: false,
    folderName: "Notes",
    order: 0,
    contents: { folders: [], files: [] },
    editable: false,
  },
  {
    id: "2",
    open: false,
    folderName: "Memory Items",
    order: 0,
    contents: { folders: [], files: [] },
    editable: false,
  },
];

export const Sidebar = () => {
  const { data, loading } = useMeQuery();
  const [directories, setDirectories] = useState(defaultDirectories);

  let authUser: Boolean = !loading && !!data?.me;

  return (
    <Flex w="300px" bgColor="gray.700" h="100vh" direction="column">
      {/* <List>
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
      </List> */}
      {authUser && (
        <Directories
          subDirectories={directories}
          topLevelDirectories={directories}
          depth={0}
          setDirectories={setDirectories}
        />
      )}
    </Flex>
  );
};
