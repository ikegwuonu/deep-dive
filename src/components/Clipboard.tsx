import React, { useState } from "react";
import { Button } from "./ui/button";
import { Check, Copy, CopyCheck, CopyCheckIcon } from "lucide-react";

const Clipboard = ({ structureText }: { structureText: string }) => {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(structureText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex gap-2  items-center">
      <Button onClick={copyToClipboard} className="bg-gray-400">
        {copied ? <Check /> : <Copy />}
      </Button>
    </div>
  );
};

export default Clipboard;
