import { Flex, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Directories } from "./Directories/Directories";

// import { defaultDirectories } from "../data/data";
// import { useData } from "../Providers/DataProvider";
import { Folder } from "../types";
import { useAuth } from "../Providers/AuthProvider";

export const Sidebar = () => {
  const { loadingAuth, user } = useAuth();
  const [directories, setDirectories] = useState<Folder[]>();
  console.log("SideBar.tsx 13 user, directories:", user, directories);

  useEffect(() => {
    if (user?.me?.data.directories) {
      setDirectories(JSON.parse(user.me.data.directories));
    }
  }, [user?.me?.data.directories]);

  if (loadingAuth || !user?.me) {
    return (
      <Flex w="300px" bgColor="gray.700" h="100vh" direction="column">
        <Text>Still loading or no user</Text>
      </Flex>
    );
  }

  // useEffect(() => {
  //   let isMounted = true;

  //   if (!userDataLoading && userData && authUser && isMounted) {
  //     console.log("SideBar.tsx 18 userData: useEffect", userData);

  //     if (userData.userData && userData.userData.directories) {
  //       setDirectories(JSON.parse(userData.userData.directories));
  //     }
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [userData, userDataLoading, authUser]);

  return (
    <Flex w="300px" bgColor="gray.700" h="100vh" direction="column">
      {directories && (
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
