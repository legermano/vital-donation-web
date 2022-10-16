import type { InteractionMode } from "@/types";

export interface IBaseInput {
  name: string;
  horizontal?: boolean;
  showTitle?: boolean;
  title?: string;
  isExpanded?: boolean;
  isNarrow?: boolean;
  iconClass?: string;
  type?: string;
  mask?: string | Function;
  mode?: InteractionMode;
  initialValue?: string | number | null;
}
