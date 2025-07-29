import { Row } from "@tanstack/react-table";
import { Button, ButtonProps } from "./ui/button";
import { ICONS } from "@/constants/icons";

interface Action {
  type: "delete" | "edit";
  handler: (id: string) => void;
}

interface RowActionProps<RData> {
  row: Row<RData>;
  actions: Action[];
}

export function RowAction<RData>({ row, actions }: RowActionProps<RData>) {
  return (
    <div className="flex gap-2">
      {actions.map((action) => {
        const iconKey = ("i-" + action.type) as keyof typeof ICONS;
        const intentMap: Record<Action["type"], ButtonProps["intent"]> = {
          delete: "danger",
          edit: "success",
        };
        return (
          <Button
            variant="outline"
            intent={intentMap[action.type]}
            key={action.type}
            onClick={() => action.handler(row.id)}
          >
            {ICONS[iconKey]}
          </Button>
        );
      })}
    </div>
  );
}
