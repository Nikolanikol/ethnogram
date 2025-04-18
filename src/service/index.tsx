import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../firebase";
import { tagFilter } from "@/utils/tagFilter";

interface CategoriesData {
  id?: number;
  title?: string;
  ru?: string;
}

class Service {
  /**
   * Fetches the documents from the Firestore database.
   */
  static async getUsersCards(
    lastVisible: firebase.firestore.DocumentSnapshot | null = null,
    limit: number = 10
  ) {
    try {
      let query1 = db.collection("users").limit(limit);

      // Если передан последний видимый документ, начинаем после него
      if (lastVisible) {
        query1 = query1.startAfter(lastVisible);
      }
      const [querySnapshot1] = await Promise.all([query1.get()]);

      let data1 = querySnapshot1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      //   Возвращаем данные и последний видимый документ для следующей страницы

      return {
        data: data1,
        lastVisible:
          querySnapshot1.docs[querySnapshot1.docs.length - 1] || null,
      };
    } catch (error) {
      console.error("Ошибка получения документов:", error);
      throw error;
    }
  }

  static async getUserCategories() {
    const data: CategoriesData[] = [];
    try {
      const querySnapshot = await db.collection("cats").get();

      querySnapshot.forEach((doc) => {
        const obj: CategoriesData = {};
        obj.id = doc.data().id;
        obj.title = doc.data().title;
        data.push(obj);
      });

      return data;
    } catch (error) {
      console.error("Ошибка получения документов:", error);
    }
  }

  static async getUserCityes() {
    const data: CategoriesData[] = [];
    try {
      const querySnapshot = await db.collection("cities").get();

      querySnapshot.forEach((doc) => {
        const obj: CategoriesData = {};
        obj.id = doc.data().id;
        obj.ru = doc.data().ru;
        data.push(obj);
      });

      return data;
    } catch (error) {
      console.error("Ошибка получения документов:", error);
    }
  }
}

export default Service;
