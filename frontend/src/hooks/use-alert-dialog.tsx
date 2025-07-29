import { useState } from "react";

export interface Content {
  title: string;
  description: string;
}

export function useAlertDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<Content>();

  return { isOpen, setIsOpen, content, setContent };
}
