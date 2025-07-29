import { useState } from "react";

export function useDialog() {
  const [type, setType] = useState("");
  const [data, setData] = useState<Record<string, unknown>>({});
  const [isOpen, setIsOpen] = useState(false);

  const showDialog = (value: string, data?: Record<string, unknown>) => {
    setType(value);
    setIsOpen(!isOpen);
    if (data) {
      setData(data);
    }
  };

  return { isOpen, setIsOpen, type, setType, showDialog, data };
}
