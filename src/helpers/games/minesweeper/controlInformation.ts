import { ControlInformation, ControlType, MouseButtonType } from "@/helpers/generalTypes";

export const minesweeperControls: ControlInformation[] = [
  {
    type: ControlType.Mouse,
    control: [
      {
        button: MouseButtonType.Left,
      },
    ],
    description: "Open cell",
  },
  {
    type: ControlType.Mouse,
    control: [
      {
        button: MouseButtonType.Right,
      },
    ],
    description: "Toggle flag",
  },
  {
    type: ControlType.Mouse,
    control: [
      {
        button: MouseButtonType.Middle,
      },
    ],
    description: "Highlight cell neighbors",
  },
];
