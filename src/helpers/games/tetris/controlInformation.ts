import { ControlInformation, ControlType } from "@/helpers/generalTypes";

export const tetrisControls: ControlInformation[] = [
  {
    type: ControlType.Keyboard,
    control: [
      {
        key: "A",
      },
      {
        key: "←",
      },
    ],
    description: "Move figure left",
  },
  {
    type: ControlType.Keyboard,
    control: [
      {
        key: "D",
      },
      {
        key: "→",
      },
    ],
    description: "Move figure right",
  },
  {
    type: ControlType.Keyboard,
    control: [
      {
        key: "W",
      },
      {
        key: "↑",
      },
    ],
    description: "Rotate figure",
  },
  {
    type: ControlType.Keyboard,
    control: [
      {
        key: "S",
      },
      {
        key: "↓",
      },
    ],
    description: "Move figure down",
  },
  {
    type: ControlType.Keyboard,
    control: [
      {
        key: "Space",
      },
    ],
    description: "Pause/Resume game",
  },
];
