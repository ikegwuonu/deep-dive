// app/api/folder-structure/route.ts

import { NextResponse } from "next/server";
import axios from "axios";
import { Structure } from "@/lib/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const path = searchParams.get("path") || "";

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Missing owner or repo in query parameters." },
      { status: 400 }
    );
  }

  async function getFolderStructure(owner: string, repo: string, path = "") {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await axios.get(url);
    const contents = response.data;

    if (!Array.isArray(contents)) return [];

    const structure: Structure[] = await Promise.all(
      contents.map(async (item: any) => {
        if (item.type === "dir") {
          return {
            name: item.name,
            type: "folder",
            children: await getFolderStructure(owner, repo, item.path),
          };
        } else {
          return {
            name: item.name,
            type: "file",
          };
        }
      })
    );

    return structure.filter(Boolean);
  }

  try {
    const structure = await getFolderStructure(owner, repo, path);
    return NextResponse.json({ structure });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch structure", details: err.message },
      { status: 500 }
    );
  }
}
