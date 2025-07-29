import {
  CircleGauge,
  Edit,
  Info,
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
};

export type IconName = keyof typeof ICONS;
