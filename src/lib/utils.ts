import clsx, { ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { Structure } from "./types";

export const showerror = (msg: string) => toast.error(msg);
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const downloadStructure = (structureText: string) => {
  const blob = new Blob([structureText], {
    type: "text/plain;charset=utf-8",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "directory-structure.txt"; // or use .md if you prefer
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return;
};

export function generateTree(
  node: Structure,
  structureMap: Record<number, Structure>,
  indent = ""
): string {
  let result = `${indent}└── ${node.name}\n`;

  if (node.children && node.children.length > 0) {
    node.children.forEach((childId) => {
      //@ts-ignore
      const childNode = structureMap[childId];
      if (childNode) {
        result += generateTree(childNode, structureMap, indent + "    ");
      }
    });
  }

  return result;
}
