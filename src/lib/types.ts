export interface Children {
  name: string;
  type: "folder" | "file";
}
export interface Structure {
  name: string;
  type: "folder" | "file";
  children?: Children | Children[];
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
