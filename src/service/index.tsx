import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
interface CategoriesData {
  id?: number;
  title?: string;
  ru?: string;
}
class Service {
  /**
   * Fetches the documents from the Firestore database.
   */
  static async getUsersCards() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  }
  static async getUserCategories() {
    const data: CategoriesData[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, "cats"));

      querySnapshot.forEach((doc) => {
        const obj: CategoriesData = {};
        obj.id = doc.data().id;
        obj.title = doc.data().title;
        data.push(obj);
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Ошибка получения документов:", error);
    }
  }
  static async getUserCityes() {
    const data: CategoriesData[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, "cities"));

      querySnapshot.forEach((doc) => {
        const obj: CategoriesData = {};
        obj.id = doc.data().id;
        obj.ru = doc.data().ru;
        data.push(obj);
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Ошибка получения документов:", error);
    }
  }
}

export default Service;
