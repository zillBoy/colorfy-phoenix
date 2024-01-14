// External Dependencies
import {
  query,
  collection,
  getDocs,
  limit,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Internal Dependencies
import { firestore } from "@/firebase";
import { CategoriesProps, CategoryProps } from "@/types";

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

const postCategory = async (category: Omit<CategoryProps, "id">) => {
  try {
    const newDocRef = doc(collection(firestore, "categories"));

    // Get the auto-generated ID
    const newDocId = newDocRef.id;

    await setDoc(newDocRef, {
      id: newDocId,
      name: category.name,
      position: category.position,
      status: category.status,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });

    return newDocId;
  } catch (error) {
    console.log("Error apiService.postCategory: ", error);
  }
};

const putCategory = async (category: Omit<CategoryProps, "createdAt">) => {
  try {
    // Reference to the document
    const docRef = doc(firestore, "categories", category.id);

    await updateDoc(docRef, {
      name: category.name,
      position: category.position,
      status: category.status,
      updatedAt: category.updatedAt,
    });

    return category;
  } catch (error) {
    console.log("Error apiService.putCategory: ", error);
  }
};

const deleteCategory = async (categoryId: string) => {
  try {
    // Reference to the document
    const docRef = doc(firestore, "categories", categoryId);
    await deleteDoc(docRef);

    return categoryId;
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
