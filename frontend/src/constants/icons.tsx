import {
  BookOpen,
  CircleGauge,
  Edit,
  Info,
  Plus,
  ShieldCheck,
  Trash,
  User,
} from "lucide-react";

export const ICONS = {
  "i-circle-guage": <CircleGauge />,
  "i-user": <User />,
  "i-users": <User />,
  "i-shield-check": <ShieldCheck />,
  "i-delete": <Trash />,
  "i-edit": <Edit />,
  "i-info": <Info />,
  "i-add": <Plus />,
  "i-book-open": <BookOpen />,
};

export type IconName = keyof typeof ICONS;
