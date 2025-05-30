import { NodeId } from "react-accessible-treeview";

export interface Children {
  name: string;
  type: "folder" | "file";
  children?: Children[];
}
export interface Structure {
  id: number;
  name: string;
  parent: number | null;
  children: NodeId[];
  metadata?: any; // or define your own metadata type
}

export interface TreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
}

export interface RepoInfo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}
