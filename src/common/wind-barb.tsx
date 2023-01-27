const BASE_WIND_BARB_WIDTH = 20;

const getStaffLength = (windSpeed: number) =>
  (-BASE_WIND_BARB_WIDTH + (windSpeed > 100 ? 5 : 0) + (windSpeed > 150 ? 5 : 0)).toString()

const getBarbPath = (windSpeed: number) => {
  let windBarbPath = "";
  if (windSpeed <= 5) return windSpeed <= 0 ? windBarbPath : "m 0 4 l 4 -2 ";

  let isOver50 = false;
  while (Math.round((windSpeed - 50) / 5) * 5 >= 0) {
    isOver50 = true;
    windBarbPath += "h 9 l -9 4 m 0 1 "; // two flags on the staff
    windSpeed -= 50;
  }
  if (isOver50) {
    windBarbPath += "m 0 -1 ";
  } else {
    windBarbPath += "m 0 -1.75 ";
  }
  while (Math.round((windSpeed - 10) / 5) * 5 >= 0) {
    windBarbPath += "m 0 2 l 9 -2 l -9 2 ";
    windSpeed -= 10;
  }
  while (Math.round((windSpeed - 5) / 5) * 5 >= 0) {
    windBarbPath += "m 0 2 l 4 -1 l -4 1 ";
    windSpeed -= 5;
  }

  return windBarbPath;
};

function pathGenerator(windSpeed: number): string {
  const staffLength = getStaffLength(windSpeed);
  const windBarbPath = getBarbPath(windSpeed);
  return `M 0 0 v ${staffLength} ${windBarbPath} m 0 0`;
}

export interface WindBarbProps {
  x: number;
  y: number;
  width: number;
  height: number;
  windDirection: number;
  windSpeed: number;
  fill?: string;
  stroke?: string;
}

function WindBarb({
  x,
  y,
  width,
  height,
  windDirection,
  windSpeed,
  fill,
  stroke,
}: WindBarbProps) {
  return (
    <svg
      x={x}
      y={y}
      width={width}
      height={height}
      fill="transparent"
      overflow="visible"
      aria-label="wind-barb"
    >
      <path
        fill={fill ? fill : "#000"}
        stroke={stroke ? stroke : "#000"}
        strokeWidth={0.85}
        transform={`rotate(${windDirection})`}
        d={pathGenerator(windSpeed)}
      />
    </svg>
  );
}

export default WindBarb;
