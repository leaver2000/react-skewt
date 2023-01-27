import * as d3 from "d3";
import { useD3 } from "../../hooks";
type D3Scale =
  | d3.ScaleLinear<number, number, never>
  | d3.ScaleTime<number, number, never>;
export interface D3ScaleProps {
  x: D3Scale;
  y: D3Scale;
}

interface TickProps extends React.SVGProps<SVGGElement> {
  axis: d3.Axis<number | { valueOf(): number }>;
  hook?: (tick: d3.Selection<SVGGElement, any, any, any>) => void;
}
export function D3Ticks({ axis, hook = () => void 0, ...props }: TickProps) {
  const ref = useD3<SVGGElement, number>(
    (g) => {
      g.selectAll("*").remove();
      g.call(axis).call(hook);
    },
    [axis, hook]
  );
  return <g ref={ref} {...props} />;
}

interface D3AreaProps
  extends PipeProps<React.SVGProps<SVGGElement>, D3ScaleProps & Dimensions> {
  data: number[];
  fillAbove?: boolean;
}
export function D3Area({
  data,
  x,
  y,
  height,
  fillAbove,
  ...props
}: D3AreaProps) {
  const ref = useD3<SVGGElement>(
    (g) => {
      g.selectAll("*").remove();
      const areaGenerator = d3
        .area<number>()
        .x((_, i) => x(i))
        .y0(fillAbove ? 0 : height)
        .y1(y);

      g.append("path").attr("d", areaGenerator(data));
    },
    [data, x, y, height, fillAbove]
  );

  return <g ref={ref} {...props} />;
}
