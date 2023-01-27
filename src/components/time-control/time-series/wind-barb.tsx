import { WindBarb } from "../../../common";

interface WindDatum {
  windDirection: number;
  windSpeed: number;
}

interface WindFactoryProps extends Dimensions {
  length: number;
  data: WindDatum[];
}

const WIND_BARB_HEIGHT = 30;

export default function TimeSeriesWindBarbs(
  props: WindFactoryProps
): JSX.Element {
  const { height, width, data, length } = props;
  // off set the wind barbs so they don't overlap with the bottom of the svg
  const yHeight = height - WIND_BARB_HEIGHT;
  // the ratio is used to determine the x position of each wind barb
  const xRatio = width / length;
  return (
    <>
      {data.map((datum, i) => (
        <WindBarb
          key={`time-series-wind-barb-${i}`}
          x={i * xRatio}
          y={yHeight}
          height={height}
          width={height}
          {...datum}
        />
      ))}
    </>
  );
}
