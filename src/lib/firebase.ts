import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaK9_I9C9QnRuO4aremUZRO2PK0pZzy7M",
  authDomain: "msbte-portal.firebaseapp.com",
  projectId: "msbte-portal",
  storageBucket: "msbte-portal.firebasestorage.app",
  messagingSenderId: "323814955101",
  appId: "1:323814955101:web:cc822a96619e7c281695b4",
  measurementId: "G-JWNP2KL7JX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// ─── Papers ───
export const fbLoadPapers = async () => {
  const snap = await getDocs(collection(db, "papers"));
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a: any, b: any) => (b.ts || 0) - (a.ts || 0));
};

// ─── Manual Subjects ───
export const fbLoadManualSubjects = async (branch: string, sem: number) => {
  const q = query(
    collection(db, "manualSubjects"),
    where("branch", "==", branch),
    where("sem", "==", sem)
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a: any, b: any) => (b.ts || 0) - (a.ts || 0));
};

// ─── Manual PDFs ───
export const fbLoadManualPdfs = async (branch: string, sem: number) => {
  const q = query(
    collection(db, "manualPdfs"),
    where("branch", "==", branch),
    where("sem", "==", sem)
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a: any, b: any) =>
      (a.subjectCode || "").localeCompare(b.subjectCode || "")
    );
};

// ─── Syllabus ───
export const fbLoadSyllabus = async (branch: string, sem: number) => {
  const q = query(
    collection(db, "syllabus"),
    where("branch", "==", branch),
    where("sem", "==", sem)
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a: any, b: any) =>
      (a.subjectCode || "").localeCompare(b.subjectCode || "")
    );
};

// ─── PDF helpers ───
export const embedUrl = (url: string) => {
  if (!url) return "";
  const m = url.match(/\/d\/([a-zA-Z0-9_-]{10,})/) || url.match(/[?&]id=([a-zA-Z0-9_-]{10,})/);
  if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
};

export const directLink = (url: string) => {
  if (!url) return "";
  const m = url.match(/\/d\/([^/?]+)/) || url.match(/id=([^&]+)/);
  if (m) return `https://drive.google.com/file/d/${m[1]}/view`;
  return url;
};

export const downloadLink = (url: string) => {
  if (!url) return "";
  const m = url.match(/\/d\/([^/?]+)/) || url.match(/id=([^&]+)/);
  if (m) return `https://drive.google.com/uc?export=download&id=${m[1]}`;
  return url;
};
