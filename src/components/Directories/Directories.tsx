import { Flex, Text, Button, ButtonGroup } from "@chakra-ui/react";
import { Folder } from "../../types";
import { EditIcon } from "@chakra-ui/icons";
import { MdInsertDriveFile, MdFolder } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { AddFolderForm } from "./AddFolderForm";
import { EditFolderForm } from "./EditFolderForm";

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
  const [editMode, setEditMode] = useState("");
  const [addMode, setAddMode] = useState(false);
  // const [newFolderTitle, setNewFolderTitle] = useState("");
  // const [order, setOrder] = useState(0);

  const handleClick = (folder: Folder) => {
    folder.open = !folder.open;
    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  };

  const handleAddFolder = (
    title: string,
    order: number,
    subDirectory: Folder
  ) => {
    const newObj: Folder = {
      contents: { folders: [], files: [] },
      folderName: title,
      id: uuid(),
      open: false,
      order: order,
      editable: true,
    };

    let parentFolderArray = subDirectory.contents.folders;

    subDirectory.open = true;
    if (parentFolderArray.length === 0) {
      parentFolderArray.push(newObj);
    } else {
      parentFolderArray.splice(order, 0, newObj);

      //reset all orders
      parentFolderArray.forEach((el, i) => (el.order = i));
    }

    setAddMode(false);
    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  };

  const handleDelete = (parentArray: Folder[], i: number) => {
    parentArray!.splice(i, 1);

    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  };

  // const handleOrder = (
  //   parentArray: Folder[],
  //   folder: Folder,
  //   oldIndex: number
  // ) => {
  //   const newOrder = 1;
  //   parentArray!.splice(oldIndex, 1);
  //   parentArray!.splice(newOrder, 0, folder);

  //   setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  // };

  const handleEditFolder = (
    parentArray: Folder[],
    i: number,
    directory: Folder,
    title: string,
    order: number
  ) => {
    let tempEdit: Folder = {
      ...directory,
      open: false,
      folderName: title,
      order,
    };
    //get rid of old index

    parentArray!.splice(directory.order, 1);

    //insert new
    parentArray!.splice(order, 0, tempEdit);
    parentArray.forEach((el, i) => (el.order = i));
    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
    setEditMode("");
  };

  const handleEditMode = (id: string) => {
    setAddMode(false);
    if (editMode === "") {
      setEditMode(id);
    } else {
      setEditMode("");
    }
  };
  const handleAddMode = () => {
    setEditMode("");
    setAddMode(!addMode);
  };

  return (
    <Flex direction="column">
      {subDirectories.map((subDirectory, i) => {
        let nextDirectories = subDirectory.contents.folders;
        let length = 0;
        if (nextDirectories?.length) {
          length = nextDirectories.length;
        }

        return (
          <Flex
            key={i}
            ml={depth * 2}
            borderLeftWidth="2px"
            pl={2}
            mt={2}
            direction="column"
          >
            <Flex w="100%" p={1} direction="column">
              <Flex w="100%">
                <Text
                  fontSize="14px"
                  flex={1}
                  onClick={() => handleClick(subDirectory)}
                >
                  {subDirectory.folderName}
                </Text>
                <Flex alignItems="center">
                  {subDirectory.editable && (
                    <>
                      <EditIcon
                        mr={3}
                        boxSize={3}
                        onClick={() =>
                          // handleEdit(subDirectories, i, subDirectory)
                          handleEditMode(subDirectory.id)
                        }
                      />
                    </>
                  )}
                </Flex>
              </Flex>
              {editMode === subDirectory.id && (
                <EditFolderForm
                  subDirectories={subDirectories}
                  subDirectory={subDirectory}
                  handleEditMode={handleEditMode}
                  handleDelete={handleDelete}
                  indexToDelete={i}
                  handleEditFolder={handleEditFolder}
                />
              )}
            </Flex>

            {subDirectory.open ? (
              <>
                <ButtonGroup
                  p={2}
                  size="xs"
                  spacing="3"
                  justifyContent="center"
                >
                  <Button fontSize="10px" flex={1} onClick={handleAddMode}>
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

                {addMode && (
                  <AddFolderForm
                    handleAddMode={handleAddMode}
                    handleAddFolder={handleAddFolder}
                    subDirectory={subDirectory}
                    length={length}
                  />
                )}
                {/* {editMode && (
                  <EditFolderForm
                    subDirectories={subDirectories}
                    subDirectory={subDirectory}
                    handleEditMode={handleEditMode}
                    handleDelete={handleDelete}
                    indexToDelete={i}
                    handleEditFolder={handleEditFolder}
                  />
                )} */}
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
