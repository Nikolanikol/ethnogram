import firebase from "firebase/app";
import "firebase/firestore";
export interface UserState {
  items: UserProfile[];
  isLoading: boolean;
  error: string | null;
  filteredItems: UserProfile[];
  cityFilter: number;
  categoryFilter: number;
  modalIsShow: boolean;
  lastVisible?: firebase.firestore.DocumentSnapshot | null;
  currentPage: number;
}

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
}

interface _Timestamp {
  nanoseconds: number;
  seconds: number;
}

export interface UserSliceType {
  isLoading: boolean;
  items: UserProfile[];
  jenre?: number;
}
