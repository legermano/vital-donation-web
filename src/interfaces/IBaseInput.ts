import type { InteractionMode } from "@/types";

export interface IBaseInput {
  name: string;
  horizontal?: boolean;
  showTitle?: boolean;
  title?: string;
  iconClass?: string;
  type?: string;
  mask?: string;
  mode?: InteractionMode;
  initialValue?: string | number;
}
