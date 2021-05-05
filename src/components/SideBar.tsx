import { Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useMeQuery, useUserDataQuery } from "../generated/graphql";
import { Directories } from "./Directories/Directories";

// import { defaultDirectories } from "../data/data";
// import { useData } from "../Providers/DataProvider";
import { Folder } from "../types";

export const Sidebar = () => {
  const { data: meData, loading } = useMeQuery();
  // const { userData, userDataLoading } = useData();
  const { data: userData, loading: userDataLoading } = useUserDataQuery();
  const [directories, setDirectories] = useState<Folder[]>([]);

  useEffect(() => {
    if (!userDataLoading && userData) {
      console.log(
        "SideBar.tsx 18 userData: useEffect",
        JSON.parse(userData.userData!.directories)
      );
      setDirectories(JSON.parse(userData.userData!.directories));
    }
  }, [userData, userDataLoading]);

  let authUser: Boolean = !loading && !!meData?.me;

  return (
    <Flex w="300px" bgColor="gray.700" h="100vh" direction="column">
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
