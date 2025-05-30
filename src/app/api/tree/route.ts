import { Structure, TreeItem } from "@/lib/types";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const branch = searchParams.get("branch") || "main";

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Missing owner or repo" },
      { status: 400 }
    );
  }

  try {
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`
    );
    if (!repoResponse.ok) {
      throw new Error("Repository not found");
    }
    const repoDetails = await repoResponse.json();

    const treeResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
    );
    if (!treeResponse.ok) {
      throw new Error("Failed to fetch tree structure");
    }

    const treeResult = await treeResponse.json();
    const treeItems: TreeItem[] = treeResult.tree;
    treeItems.sort((a: TreeItem, b: TreeItem) => {
      // Put folders (type "tree") before files (type "blob")
      if (a.type === "tree" && b.type === "blob") return -1;
      if (a.type === "blob" && b.type === "tree") return 1;

      // If same type, sort alphabetically by path
      return a.path.localeCompare(b.path);
    });

    const idMap = new Map<string, number>();
    const structure: Structure[] = [];
    let idCounter = 1;

    structure.push({ name: "", children: [], id: 0, parent: null });
    idMap.set("", 0);

    for (const item of treeItems) {
      const parts = item.path.split("/");
      let currentPath = "";
      let parentId = 0;

      for (let i = 0; i < parts.length; i++) {
        const name = parts[i];
        currentPath = currentPath ? `${currentPath}/${name}` : name;

        if (!idMap.has(currentPath)) {
          const node: Structure = {
            name,
            id: idCounter,
            parent: parentId,
            children: [],
          };

          if (i < parts.length - 1 || item.type === "tree") {
            node.children = [];
          } else {
            node.metadata = { size: item.size };
          }

          structure.push(node);
          idMap.set(currentPath, idCounter);

          const parentNode = structure.find((n) => n.id === parentId);
          if (parentNode?.children) {
            parentNode.children.push(idCounter);
          }

          parentId = idCounter;
          idCounter++;
        } else {
          parentId = idMap.get(currentPath)!;
        }
      }
    }

    return NextResponse.json({ structure, repoDetails });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
