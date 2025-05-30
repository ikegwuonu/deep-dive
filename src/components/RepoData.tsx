import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Copy,
  CopyCheck,
  Download,
  ExternalLink,
  Folder,
  Github,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import DirectoryTreeView from "./TreeView";
import { RepoInfo, Structure } from "@/lib/types";
import s from "./Clipboard";
import { downloadStructure, generateTree } from "@/lib/utils";
import Clipboard from "./Clipboard";

interface RepoDataProps {
  repoInfo: RepoInfo | null;
  treeData: Structure[];
}

const RepoData = ({ repoInfo, treeData }: RepoDataProps) => {
  const structureMap: Record<number, Structure> = {};
  treeData.forEach((node) => {
    structureMap[node.id] = node;
  });

  const structureText = treeData
    .filter((node) => node.parent === null)
    .map((rootNode) => generateTree(rootNode, structureMap))
    .join("");

  return (
    <div>
      {/* Repository Info */}
      {repoInfo && (
        <Card className="max-w-4xl mx-auto mb-8 shadow-lg">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  {repoInfo.full_name}
                </CardTitle>
                <CardDescription className="mt-2">
                  {repoInfo.description}
                </CardDescription>
              </div>
              <Link href={repoInfo.html_url} target="_blank">
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary">
                ⭐ {repoInfo.stargazers_count.toLocaleString()}
              </Badge>
              <Badge variant="secondary">
                🍴 {repoInfo.forks_count.toLocaleString()}
              </Badge>
              {repoInfo.language && (
                <Badge variant="outline">{repoInfo.language}</Badge>
              )}
              <Badge variant="outline">
                Updated {new Date(repoInfo.updated_at).toLocaleDateString()}
              </Badge>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Tree Structure */}
      {treeData.length > 0 && (
        <Card className="max-w-4xl mx-auto shadow-lg" id="tree-section">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="w-5 h-5" />
              Repository Structure
            </CardTitle>
            <div className="flex justify-between w-full text-slate-600 text-sm my-1">
              {treeData.length} items found in the repository
              <div className="flex gap-1 items-center">
                {" "}
                <Clipboard structureText={structureText} />
                <Button
                  className="bg-gray-400"
                  onClick={() => downloadStructure(structureText)}
                >
                  <Download />
                </Button>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
              <div className="p-4">
                {<DirectoryTreeView folder={treeData} />}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RepoData;
