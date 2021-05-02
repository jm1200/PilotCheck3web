import { DeleteIcon } from "@chakra-ui/icons";
import { Flex, Input, Button, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { Folder } from "../../types";
import { options } from "./utils";

interface EditFolderFormProps {
  handleEditMode: (id: string) => void;
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

export const EditFolderForm: React.FC<EditFolderFormProps> = ({
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

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(parseInt(e.target.value));
  };

  let optArr = options(subDirectories.length);

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
        {/* <Input
          w="20%"
          placeholder="order"
          value={order}
          onChange={handleOrderChange}
        /> */}
        <Select w="100%" value={order} onChange={handleOrderChange}>
          {optArr.map((option) => option)}
        </Select>
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
        <Button
          w="30%"
          h="1.75rem"
          size="sm"
          onClick={() => handleEditMode("")}
        >
          Cancel
        </Button>
        <DeleteIcon
          boxSize={4}
          onClick={() => handleDelete(subDirectories, indexToDelete)}
        />
      </Flex>
    </Flex>
  );
};
