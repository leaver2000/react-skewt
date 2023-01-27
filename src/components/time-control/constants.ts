enum PASTEL {
  BLUE = "#a6bddb",
  RED = "#d0a6ba",
  GREEN = "#a6d7b7",
}

enum COLOR {
  PRIMARY = "#1f77b4", // blue rgb(31, 119, 180)
  SECONDARY = "#ff7f0e", // orange rgb(255, 127, 14)
  ALTERNATE = "#2ca02c", // green rgb(44, 160, 44)
}

export const colorMap = {
  primary: {
    main: COLOR.PRIMARY,
    area: PASTEL.BLUE,
  },
  secondary: {
    main: COLOR.SECONDARY,
    area: PASTEL.RED,
  },
  alternate: {
    main: COLOR.ALTERNATE,
    area: PASTEL.GREEN,
  },
} as const;

const M = 5;
export const MARGIN = { top: M, right: M, bottom: M, left: M } as const;
