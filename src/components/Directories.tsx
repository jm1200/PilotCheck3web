import { Flex, Text, Button, ButtonGroup } from "@chakra-ui/react";
import { Folder } from "../types";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  ArrowUpDownIcon,
} from "@chakra-ui/icons";
import faker from "faker";
import { MdInsertDriveFile, MdFolder } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { Link as RouterLink } from "react-router-dom";
// import { searchTree } from "../../utils/helpers";

interface DirectoriesProps {
  subDirectories: Folder[];
  setDirectories: React.Dispatch<React.SetStateAction<Folder[]>>;
  topLevelDirectories: Folder[];
  depth: number;
}

export const Directories: React.FC<DirectoriesProps> = ({
  subDirectories,
  setDirectories,
  topLevelDirectories,
  depth,
}) => {
  const handleClick = (folder: Folder) => {
    folder.open = !folder.open;
    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  };

  const handleAdd = (topLevel?: boolean, subDirectory?: Folder) => {
    const newObj: Folder = {
      contents: { folders: [], files: [] },
      folderName: faker.company.companyName(),
      id: uuid(),
      open: false,
      order: subDirectories.length,
      editable: true,
    };

    if (topLevel) {
      subDirectories.push(newObj);
    } else {
      if (subDirectory) {
        subDirectory.open = true;
        subDirectory.contents.folders!.push(newObj);
      }
    }

    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  };

  const handleDelete = (parentArray: Folder[], i: number) => {
    parentArray!.splice(i, 1);

    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  };

  const handleOrder = (
    parentArray: Folder[],
    folder: Folder,
    oldIndex: number
  ) => {
    const newOrder = 1;
    parentArray!.splice(oldIndex, 1);
    parentArray!.splice(newOrder, 0, folder);

    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  };

  const handleEdit = (parentArray: Folder[], i: number, directory: Folder) => {
    console.log("Directories.tsx 96 :", directory);
    let tempEdit: Folder = {
      ...directory,
      open: false,
      folderName: "edited folder",
      order: 0,
    };

    parentArray!.splice(i!, 1, tempEdit);
    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  };

  return (
    <Flex direction="column">
      {/* {depth === 0 ? (
        <Button w="30%" h="15px" margin="auto" onClick={() => handleAdd(true)}>
          <AddIcon boxSize={3} />
        </Button>
      ) : null} */}
      {subDirectories.map((subDirectory, i) => {
        let nextDirectories = subDirectory.contents.folders;
        return (
          <Flex
            key={i}
            ml={depth * 2}
            borderLeftWidth="2px"
            pl={2}
            mt={2}
            direction="column"
          >
            <Flex w="100%" p={1}>
              <Text
                fontSize="14px"
                flex={1}
                onClick={() => handleClick(subDirectory)}
              >
                {subDirectory.folderName}
              </Text>
              <Flex alignItems="center">
                {/* <AddIcon
                  mr={3}
                  boxSize={3}
                  onClick={() => handleAdd(false, subDirectory)}
                /> */}

                {subDirectory.editable && (
                  <>
                    <ArrowUpDownIcon
                      mr={3}
                      boxSize={3}
                      onClick={() =>
                        handleOrder(subDirectories, subDirectory, i)
                      }
                    />
                    <EditIcon
                      mr={3}
                      boxSize={3}
                      onClick={() =>
                        handleEdit(subDirectories, i, subDirectory)
                      }
                    />
                    <DeleteIcon
                      boxSize={3}
                      onClick={() => handleDelete(subDirectories, i)}
                    />
                  </>
                )}
              </Flex>
            </Flex>

            {subDirectory.open ? (
              <>
                <ButtonGroup
                  p={2}
                  size="xs"
                  spacing="3"
                  justifyContent="center"
                >
                  <Button
                    fontSize="10px"
                    flex={1}
                    onClick={() => handleAdd(false, subDirectory)}
                  >
                    <MdFolder fontSize="14px" /> <Text ml={1}>Add Folder</Text>
                  </Button>
                  <Button
                    as={RouterLink}
                    to={`/edit-page?folderId=${subDirectory.id}`}
                    fontSize="10px"
                    flex={1}
                  >
                    <MdInsertDriveFile fontSize="14px" />
                    <Text ml={1}>Add File</Text>
                  </Button>
                </ButtonGroup>

                {nextDirectories && nextDirectories.length > 0 ? (
                  <Directories
                    topLevelDirectories={topLevelDirectories}
                    subDirectories={nextDirectories}
                    depth={depth + 1}
                    setDirectories={setDirectories}
                  />
                ) : (
                  <>
                    <Text w="100%" textAlign="center" fontSize="12px">
                      Folder is empty!
                    </Text>
                  </>
                )}
              </>
            ) : null}
          </Flex>
        );
      })}
    </Flex>
  );
};
