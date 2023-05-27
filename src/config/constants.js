import { ai, logoShirt, leftPosition, rightPosition, middlePosition } from "../assets";

export const EditorTabs = [
  // {
  //   name: "textpicker",
  //   icon: textIcon,
  // },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterPosition = [
  {
    name: "leftPosition",
    icon: leftPosition 
  },
  {
    name: "middlePosition",
    icon: middlePosition
  },
  {
    name: "rightPosition",
    icon: rightPosition
  }
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,
  },
  // {
  //   name: "stylishShirt",
  //   icon: stylishShirt,
  // },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};



export const BASE_URL = 'https://apiv2dev.droplinked.com'
