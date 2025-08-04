import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";

interface ActionBarProps {
  title: string;
  onBack?: () => void;
  onSearch: (value: string) => void;
  actions?: ButtonProps[];
}

export function ActionBar({
  title,
  onBack,
  onSearch,
  actions = [],
}: ActionBarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-b bg-muted/50 rounded-t-xl">
      {onBack ? (
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            aria-label="Kembali"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
      ) : null}
      <div className="flex gap-2 w-full md:max-w-md">
        <Input
          placeholder="Cari..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button variant="solid" onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Cari
        </Button>
      </div>

      {/* Custom Buttons */}
      <div className="flex gap-2 flex-wrap">
        {actions.map((btn, i) => (
          <Button key={i} {...btn}>
            {btn.children}
          </Button>
        ))}
      </div>
    </div>
  );
}
