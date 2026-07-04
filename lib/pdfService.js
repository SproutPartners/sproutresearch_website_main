// lib/pdfService.js
import { db } from './firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

const storage = getStorage();

export async function uploadPdfAndSaveDetails(file, heading, subheading, date) {
  const timestamp = Date.now();
  const storageRef = ref(storage, `pdfs/${timestamp}_${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  await addDoc(collection(db, 'pdfs'), {
    heading,
    subheading,
    date,
    pdfUrl: downloadURL,
    uploadedAt: serverTimestamp()
  });
}

export async function getAllPdfs() {
  const pdfsRef = collection(db, 'pdfs');
  const q = query(pdfsRef, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}