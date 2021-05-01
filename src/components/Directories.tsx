import {
  Flex,
  Text,
  Button,
  ButtonGroup,
  InputGroup,
  Input,
  InputRightElement,
} from "@chakra-ui/react";
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
import { useState } from "react";
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
  const [editMode, setEditMode] = useState(false);
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
    topLevel?: boolean,
    subDirectory?: Folder
  ) => {
    const newObj: Folder = {
      contents: { folders: [], files: [] },
      folderName: title,
      id: uuid(),
      open: false,
      order: order,
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
    console.log("Directories.tsx 96 :", directory);
    let tempEdit: Folder = {
      ...directory,
      open: false,
      folderName: title,
      order,
    };

    parentArray!.splice(i!, 1, tempEdit);
    setDirectories(JSON.parse(JSON.stringify(topLevelDirectories)));
  };

  const handleEditMode = () => {
    setAddMode(false);
    setEditMode(!editMode);
  };
  const handleAddMode = () => {
    setEditMode(false);
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
            <Flex w="100%" p={1}>
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
                        handleEditMode()
                      }
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
                {editMode && (
                  <EditFolderForm
                    subDirectories={subDirectories}
                    subDirectory={subDirectory}
                    handleEditMode={handleEditMode}
                    handleDelete={handleDelete}
                    indexToDelete={i}
                    handleEditFolder={handleEditFolder}
                  />
                )}
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

interface AddFolderFormProps {
  handleAddFolder: (
    title: string,
    order: number,
    topLevel?: boolean | undefined,
    subDirectory?: Folder | undefined
  ) => void;
  subDirectory: Folder;
  handleAddMode: () => void;
  length: number;
}

const AddFolderForm: React.FC<AddFolderFormProps> = ({
  handleAddFolder,
  subDirectory,
  handleAddMode,
  length,
}) => {
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(length);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(parseInt(e.target.value));
  };

  return (
    <Flex direction="column" m={2} p={2} bgColor="gray.600" borderRadius={5}>
      <Flex>
        <Input
          w="100%"
          placeholder="folder name"
          value={title}
          onChange={handleTitleChange}
        />
      </Flex>
      <Flex w="100%" mt={1} justifyContent="space-between" alignItems="center">
        <Input
          w="40%"
          placeholder="order"
          value={order}
          onChange={handleOrderChange}
        />
        <Button
          w="30%"
          h="1.75rem"
          size="sm"
          onClick={() => handleAddFolder(title, order, false, subDirectory)}
        >
          Save
        </Button>
        <Button w="30%" h="1.75rem" size="sm" onClick={() => handleAddMode()}>
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

interface EditFolderFormProps {
  handleEditMode: () => void;
  handleEditFolder: (
    parentArray: Folder[],
    i: number,
    directory: Folder,
    title: string,
    order: number
  ) => void;
  subDirectory: Folder;
  subDirectories: Folder[];
  handleDelete: (parentArray: Folder[], i: number) => void;
  indexToDelete: number;
}

const EditFolderForm: React.FC<EditFolderFormProps> = ({
  handleEditMode,
  handleEditFolder,
  subDirectory,
  subDirectories,
  handleDelete,
  indexToDelete,
}) => {
  const [title, setTitle] = useState(subDirectory.folderName);
  const [order, setOrder] = useState(subDirectory.order);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(parseInt(e.target.value));
  };

  return (
    <Flex direction="column" m={2} p={2} bgColor="gray.600" borderRadius={5}>
      <Flex>
        <Input
          w="100%"
          placeholder="folder name"
          value={title}
          onChange={handleTitleChange}
        />
      </Flex>
      <Flex w="100%" mt={1} justifyContent="space-between" alignItems="center">
        <Input
          w="40%"
          placeholder="order"
          value={order}
          onChange={handleOrderChange}
        />
        <Button
          w="30%"
          h="1.75rem"
          size="sm"
          onClick={() =>
            handleEditFolder(
              subDirectories,
              indexToDelete,
              subDirectory,
              title,
              order
            )
          }
        >
          Save
        </Button>
        <Button w="30%" h="1.75rem" size="sm" onClick={() => handleEditMode()}>
          Cancel
        </Button>
        <DeleteIcon
          boxSize={4}
          onClick={() => handleDelete(subDirectories, indexToDelete)}
        />
        )
      </Flex>
    </Flex>
  );
};
