import React from "react";
import { callbackFactory, type PointerCallback } from "./util";
import { useD3, useResizeObserver } from "../../hooks";
const TRANSPARENT = "rgba(0,0,0,0)";
interface ResizeManagerProps extends React.PropsWithChildren {
  onResize: React.Dispatch<React.SetStateAction<Dimensions>>;
}
export function ResizeManager({ onResize, ...props }: ResizeManagerProps) {
  const ref = useResizeObserver<HTMLDivElement>((entry) => {
    const { width, height } = entry.contentRect;
    onResize({ width, height });
  }, []);
  return <div ref={ref} {...props} />;
}
interface EventHandlers {
  onClick: PointerCallback;
  onMouseMove: PointerCallback;
}
interface SVGManagerProps
  extends PipeProps<
    React.SVGProps<SVGRectElement>,
    EventHandlers & Dimensions
  > {
  validTimes: Date[];
}
/**
 * the SVGManager is the root element of the Temporal control and is responsible for trigger the
 * callbacks for the mouse events.
 * @param param0
 * @returns
 */
export function SVGManager({
  onClick,
  onMouseMove,
  onResize,
  width,
  height,
  validTimes,
  children,
  ...props
}: SVGManagerProps): JSX.Element {
  const dataLength = validTimes.length; // 144hrs
  const handleOnClick = React.useCallback(
    callbackFactory(onClick, dataLength),
    [onClick, dataLength]
  );
  const handleOnMouseMove = React.useCallback(
    callbackFactory(onMouseMove, dataLength),
    [onMouseMove, dataLength]
  );

  const ref = useD3<SVGSVGElement>((svg) => {
    svg
      .selectAll("*") //
      .on("click", handleOnClick)
      .on("mousemove", handleOnMouseMove);
  }, []);

  return (
    <svg height={height} width={width} ref={ref}>
      {/* a transparent rect is needed to ensure onClick effects */}
      <rect width={width} height={height} fill={TRANSPARENT} {...props} />
      {!!width && !!height ? children : null}
    </svg>
  );
}

interface WindBarbWindowProps extends SVGManagerProps {
  data: WindDatum[];
  step: number;
}
import { WindBarb } from "../../common";
export function WindBarbWindow({
  data,
  step,
  children,
  ...props
}: WindBarbWindowProps) {
  //
  let xRatio = props.width / (props.validTimes.length - 1);
  // center the barbs in the window
  const yHeight = props.height / 2;

  return (
    <SVGManager {...props}>
      {data.map((datum, i) => {
        if (i % step !== 0) return null;
        return (
          <WindBarb
            key={`time-series-wind-barb-${i}`}
            x={i * xRatio}
            y={yHeight}
            height={props.height}
            width={props.width}
            {...datum}
          />
        );
      })}
      {/* need to place the children after the  wind barb mapping */}
      {children}
    </SVGManager>
  );
}
