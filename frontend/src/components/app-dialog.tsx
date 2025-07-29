import { ReactElement } from "react";
import { Button, ButtonProps } from "./ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";

interface Action {
  type?: "submit" | "reset" | "button";
  variant: ButtonProps["variant"];
  intent: ButtonProps["intent"];
  handler?: () => void;
  text: string;
  form?: string;
}

interface AppDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  children: ReactElement;
  description?: string;
  actions?: Action[];
}

export function AppDialog({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  actions,
}: AppDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {children}
        {actions ? (
          <DialogFooter>
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                intent={action.intent}
                onClick={action.handler}
                form={action.form}
                type={action.type}
              >
                {action.text}
              </Button>
            ))}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
