export type CategoryStatusProps = "Published" | "Inactive";

export type CategoryProps = {
  id: string | number;
  name: string;
  position: number;
  status: CategoryStatusProps;
};

export type CategoriesProps = CategoryProps[];
