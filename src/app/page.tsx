"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  GitBranch,
  Search,
  Folder,
  File,
  ExternalLink,
  Github,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { RepoInfo, TreeItem } from "@/lib/types";

export default function Component() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);
  const [treeData, setTreeData] = useState<TreeItem[]>([]);
  const [error, setError] = useState("");

  const fetchRepoData = async () => {
    if (!owner || !repo) return;

    setLoading(true);
    setError("");

    try {
      // Fetch repository info
      const repoResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`
      );
      if (!repoResponse.ok) {
        throw new Error("Repository not found");
      }
      const repoData = await repoResponse.json();
      setRepoInfo(repoData);

      // Fetch tree structure
      const treeResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/git/trees/${repoData.default_branch}?recursive=1`
      );
      if (!treeResponse.ok) {
        throw new Error("Failed to fetch tree structure");
      }
      const treeResult = await treeResponse.json();
      setTreeData(treeResult.tree || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setRepoInfo(null);
      setTreeData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRepoData();
  };

  const renderTree = () => {
    const pathMap = new Map<string, TreeItem[]>();

    // Group items by their parent directory
    treeData.forEach((item) => {
      const parts = item.path.split("/");
      const parentPath = parts.slice(0, -1).join("/");

      if (!pathMap.has(parentPath)) {
        pathMap.set(parentPath, []);
      }
      pathMap.get(parentPath)!.push(item);
    });

    const renderItems = (
      parentPath: string,
      level = 0
    ): React.JSX.Element[] => {
      const items = pathMap.get(parentPath) || [];
      const result: React.JSX.Element[] = [];

      // Separate directories and files
      const directories = items.filter((item) => item.type === "tree");
      const files = items.filter((item) => item.type === "blob");

      // Render directories first
      directories.forEach((dir) => {
        const fullPath = parentPath
          ? `${parentPath}/${dir.path.split("/").pop()}`
          : dir.path;
        result.push(
          <div key={dir.path} className="select-none">
            <div
              className="flex items-center gap-2 py-1 px-2 hover:bg-muted/50 rounded-md cursor-pointer"
              style={{ paddingLeft: `${level * 20 + 8}px` }}
            >
              <Folder className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">
                {dir.path.split("/").pop()}
              </span>
            </div>
            {renderItems(dir.path, level + 1)}
          </div>
        );
      });

      // Render files
      files.forEach((file) => {
        const fileName = file.path.split("/").pop() || "";
        const extension = fileName.split(".").pop();

        result.push(
          <div
            key={file.path}
            className="flex items-center gap-2 py-1 px-2 hover:bg-muted/50 rounded-md cursor-pointer"
            style={{ paddingLeft: `${level * 20 + 8}px` }}
          >
            <File className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{fileName}</span>
            {file.size && (
              <span className="text-xs text-muted-foreground ml-auto">
                {(file.size / 1024).toFixed(1)}KB
              </span>
            )}
          </div>
        );
      });

      return result;
    };

    return renderItems("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
              <GitBranch className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DeepDive
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore and visualize the complete structure of any GitHub
            repository with beautiful tree visualization
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              Repository Explorer
            </CardTitle>
            <CardDescription>
              Enter the repository owner and name to explore its structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="owner">Repository Owner</Label>
                  <Input
                    id="owner"
                    placeholder="e.g., facebook"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repo">Repository Name</Label>
                  <Input
                    id="repo"
                    placeholder="e.g., react"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Exploring Repository...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Explore Repository
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="max-w-2xl mx-auto mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardContent className="pt-6">
              <p className="text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            </CardContent>
          </Card>
        )}

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
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5" />
                Repository Structure
              </CardTitle>
              <CardDescription>
                {treeData.length} items found in the repository
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4">{renderTree()}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Example repositories */}
        {!repoInfo && !loading && (
          <Card className="max-w-2xl mx-auto mt-8">
            <CardHeader>
              <CardTitle className="text-center">
                Try These Popular Repositories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { owner: "facebook", repo: "react" },
                  { owner: "vercel", repo: "next.js" },
                  { owner: "microsoft", repo: "vscode" },
                  { owner: "tailwindlabs", repo: "tailwindcss" },
                ].map(({ owner: exampleOwner, repo: exampleRepo }) => (
                  <Button
                    key={`${exampleOwner}/${exampleRepo}`}
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      setOwner(exampleOwner);
                      setRepo(exampleRepo);
                    }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    {exampleOwner}/{exampleRepo}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="mt-16 pb-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Developed with ❤️ by ikegwuonu
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
