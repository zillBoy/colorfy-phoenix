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
  id: string;
  name: string;
  position: number;
  status: StatusProps | string;
  createdAt: string;
  updatedAt: string;
};

export type CategoriesProps = CategoryProps[];

/**************************/
/**         USER         **/
/**************************/

export type UserProps = {
  id: string | number;
  name: string;
  email: string;
  googleId?: string;
  facebookId?: string;
};

export type UsersProps = UserProps[];

export type ItemProps = CategoryProps | UserProps | any;
export type ItemsProps = CategoriesProps | UsersProps | any;
