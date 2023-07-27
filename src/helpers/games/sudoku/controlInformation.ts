import { ControlInformation, ControlType, MouseButtonType } from "@/helpers/generalTypes";

export const sudokuControls: ControlInformation[] = [
  {
    type: ControlType.Mouse,
    control: [
      {
        button: MouseButtonType.Left,
      },
    ],
    description: "Click on cell to select it and then type a digit to fill it",
  },
  {
    type: ControlType.Mouse,
    control: [
      {
        button: MouseButtonType.Left,
      },
    ],
    description: "Hold a left mouse button to informative numbers appear",
  },
];
