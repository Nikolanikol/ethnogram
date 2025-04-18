import firebase from "firebase/app";
import "firebase/firestore";
export interface UserProfile {
  id: string;
  uid: string;
  bio: string;
  phone: string;
  blockedBy: string[];
  categories: number[];
  cities: number[];
  created: _Timestamp;
  updated: _Timestamp;
  image: string[];
  imagePath: string[];
  isPublic: boolean;
  likes: string[];
  reports: string[];
  smallImage: string;
  smallImagePath: string;
  lastVisible?: firebase.firestore.DocumentSnapshot | null;
}
interface _Timestamp {
  nanoseconds: number;
  seconds: number;
}
