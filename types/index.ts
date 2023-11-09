import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type StatusProps = "Published" | "Inactive";

export type ModalSizeProp =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full";

export type ColumnProp = {
  key: string;
  label: string;
};

// DATABASE

/**************************/
/**       CATEGORY       **/
/**************************/

export type CategoryProps = {
  id: string | number;
  name: string;
  position: number;
  status: StatusProps;
};

export type CategoriesProps = CategoryProps[];
