import React, { useState } from "react";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { FaFile, FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import TreeView, { flattenTree } from "react-accessible-treeview";
import "../app/tree_styles.css";
import { Structure } from "@/lib/types";
import { SiJson, SiTypescript } from "react-icons/si";
import { BiLogoTypescript } from "react-icons/bi";
import {
  Copy,
  CopyCheck,
  File,
  FileJson,
  Folder,
  FolderOpen,
  Icon,
} from "lucide-react";
import { IconBase } from "react-icons";
import { MdJavascript } from "react-icons/md";
import { Button } from "./ui/button";

interface DirectoryTreeProps {
  folder: Structure[];
}

function DirectoryTreeView({ folder }: DirectoryTreeProps) {
  return (
    <div>
      <div className=" relative">
        <TreeView
          data={folder}
          aria-label="directory tree"
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
          }) => (
            <div
              {...getNodeProps()}
              style={{ paddingLeft: 20 * (level - 1) }}
              className="flex gap-1 text-sm"
            >
              {isBranch ? (
                <p className="flex items-center gap-2 py-0.5 w-full px-2 font-semibold  hover:bg-muted/50 rounded-md cursor-pointer">
                  <FolderIcon isOpen={isExpanded} /> {element.name}
                </p>
              ) : (
                <div className="px-2 py-0.5 flex justify-between w-full items-center">
                  <p className="flex gap-2 items-center">
                    <FileIcon filename={element.name} /> {element.name}
                  </p>
                  {element.metadata?.size && element.metadata.size && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      {(Number(element.metadata.size) / 1024).toFixed(1)}KB
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}

const FolderIcon = ({ isOpen }: { isOpen: boolean }) =>
  isOpen ? (
    <FolderOpen className="text-blue-500 icon w-4 h-4" />
  ) : (
    <Folder className="icon text-blue-500 w-4 h-4" />
  );

const FileIcon = ({ filename = "" }: { filename: string }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1) || "";
  switch (extension) {
    case "ts":
      return <SiTypescript className="icon text-gray-500 w-4 h-4" />;
    case "mjs":
      return <MdJavascript className="icon text-gray-500 w-4 h-4" />;
    case "json":
      return <FileJson className="icon text-gray-500 w-4 h-4" />;
    case "tsx":
      return <BiLogoTypescript className="icon text-gray-500 w-4 h-4" />;
    case "js":
      return <DiJavascript className="icon text-gray-500 w-4 h-4" />;
    case "css":
      return <DiCss3 className="icon text-gray-500 w-4 h-4" />;
    case "json":
      return <FaList className="icon text-gray-500 w-4 h-4" />;
    case "npmignore":
      return <DiNpm className="icon text-gray-500 w-4 h-4" />;
    default:
      return <File className="icon text-gray-500 w-4 h-4" />;
  }
};

export default DirectoryTreeView;
