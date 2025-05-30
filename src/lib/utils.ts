import clsx, { ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { Structure } from "./types";

export const showerror = (msg: string) => toast.error(msg);
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Optional: install uuid if not already done: `npm install uuid`
interface Tree {
  id: number | string;
  name: string;
  children?: Tree[];
}

export function convertToTreeData(nodes: Structure[], parentId: string = "") {
  return nodes.map((node) => {
    const id = uuidv4(); // or use a simpler ID logic
    const treeNode: any = {
      id,
      name: node.name,
      children: node.children
        ? convertToTreeData(node.children as Structure[], id)
        : undefined,
    };
    return treeNode;
  });
}
