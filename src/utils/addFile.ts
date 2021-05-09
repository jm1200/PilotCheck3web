import { Folder, File } from "../types";

export const addFile = (
  directories: Folder[],
  newFile: File,
  stateFolderId: string
) => {
  directories.forEach((directory) => {
    if (directory.id === stateFolderId) {
      //insert file
      directory.contents.files.splice(newFile.order, 0, newFile);

      //reset all orders

      directory.contents.files.forEach((el, i) => (el.order = i));

      return;
    } else if (directory.contents.folders.length > 0) {
      addFile(directory.contents.folders, newFile, stateFolderId);
    }
    return;
  });
};

export const editFile = (
  directories: Folder[],
  file: File,
  stateFolderId: string
) => {
  directories.forEach((directory) => {
    if (directory.id === stateFolderId) {
      directory.contents.files.forEach((f, i) => {
        if (f.id === file.id) {
          //remove old file
          directory.contents.files.splice(i, 1);

          //insert edited file
          directory.contents.files.splice(file.order, 0, file);

          //reset all orders
          if (f.order !== file.order) {
            directory.contents.files.forEach((el, i) => (el.order = i));
          }

          return;
        }
      });

      return;
    } else if (directory.contents.folders.length > 0) {
      editFile(directory.contents.folders, file, stateFolderId);
    }
    return;
  });
};

export const deleteFile = (
  directories: Folder[],
  file: File,
  stateFolderId: string
) => {
  directories.forEach((directory) => {
    if (directory.id === stateFolderId) {
      directory.contents.files.forEach((f, i) => {
        if (f.id === file.id) {
          //remove old file
          console.log("addFile 68: found file:");
          directory.contents.files.splice(i, 1);

          //reset all orders
          if (f.order !== file.order) {
            directory.contents.files.forEach((el, i) => (el.order = i));
          }

          return;
        }
      });

      return;
    } else if (directory.contents.folders.length > 0) {
      deleteFile(directory.contents.folders, file, stateFolderId);
    }
    return;
  });
};
