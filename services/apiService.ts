// External Dependencies
import { query, collection, getDocs, limit } from "firebase/firestore";

// Internal Dependencies
import { firestore } from "@/firebase";
import { CategoriesProps } from "@/types";

/************************
 *      CATEGORIES      *
 ************************/
const getCategories = async (size: number) => {
  try {
    const categories: CategoriesProps = [];
    const q = query(collection(firestore, "categories"), limit(size));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => categories.push(doc.data()));
    return categories;
  } catch (error) {
    console.log("Error apiService.getCategories: ", error);
  }
};

const getCategory = async () => {
  try {
    // ...
  } catch (error) {
    console.log("Error apiService.getCategory: ", error);
  }
};

const postCategory = async () => {
  try {
    // ...
  } catch (error) {
    console.log("Error apiService.postCategory: ", error);
  }
};

const putCategory = async () => {
  try {
    // ...
  } catch (error) {
    console.log("Error apiService.putCategory: ", error);
  }
};

const deleteCategory = async () => {
  try {
    // ...
  } catch (error) {
    console.log("Error apiService.deleteCategory: ", error);
  }
};

const apiService = {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
};

export default apiService;
