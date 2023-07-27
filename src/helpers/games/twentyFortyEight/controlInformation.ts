import { ControlInformation, ControlType } from "@/helpers/generalTypes";

export const twentyFortyEightControlInformation: ControlInformation[] = [
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
    description: "Move tiles left",
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
    description: "Move tiles right",
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
    description: "Move tiles up",
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
    description: "Move tiles down",
  },
];
