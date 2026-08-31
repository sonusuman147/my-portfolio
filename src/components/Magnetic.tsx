import { cloneElement, type ReactElement } from "react";
import { useMagnetic } from "../hooks/useMagnetic";

export default function Magnetic({
  children,
  strength = 8,
}: {
  children: ReactElement<{ ref?: React.Ref<HTMLElement> }>;
  strength?: number;
}) {
  const ref = useMagnetic<HTMLElement>(strength);
  return cloneElement(children, { ref });
}
