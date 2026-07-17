// lib/pdfService.js
import { db, storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

function ensureFirebaseResources() {
  if (!db || !storage) {
    throw new Error('Firebase is not configured');
  }
}

export async function uploadPdfAndSaveDetails(file, heading, subheading, date) {
  ensureFirebaseResources();
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
  ensureFirebaseResources();
  const pdfsRef = collection(db, 'pdfs');
  const q = query(pdfsRef, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
