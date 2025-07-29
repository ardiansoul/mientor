import { Content } from "@/hooks/use-alert-dialog";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from "./ui/alert-dialog";

interface AppAlertDialogProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  content: Content;
  submitHandler: () => void;
  cancelHandler?: () => void;
}

export function AppAlertDialog({
  content,
  isOpen,
  setIsOpen,
  submitHandler,
  cancelHandler,
}: AppAlertDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{content.title}</AlertDialogTitle>
          <AlertDialogDescription>{content.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              if (cancelHandler) {
                cancelHandler();
              }
              setIsOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => submitHandler()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
