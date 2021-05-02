import { FetchResult } from "@apollo/client";
import {
  LoginMutation,
  RegisterMutation,
  EmailPasswordInput,
} from "./generated/graphql";

export type Signin = (
  values: EmailPasswordInput
) => Promise<
  FetchResult<LoginMutation, Record<string, any>, Record<string, any>>
>;

export type Signup = (
  values: EmailPasswordInput
) => Promise<
  FetchResult<RegisterMutation, Record<string, any>, Record<string, any>>
>;

export type Signout = () => void;

type FileId = string;

interface FolderContents {
  folders: Folder[];
  files: FileId[];
}

export interface Folder {
  id: string;
  open: boolean;
  folderName: string;
  order: number;
  contents: FolderContents;
  editable: boolean;
}
