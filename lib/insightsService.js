import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  increment, 
  query, 
  orderBy, 
  serverTimestamp, 
  where 
} from 'firebase/firestore';
import { db } from './firebase';

// 🔹 slug helpers
import { generateSlug, ensureUniqueSlug } from './slugUtils';

const COLLECTION_NAME = 'insights';

// Fetch all existing slugs
async function getExistingSlugs() {
  const q = query(collection(db, COLLECTION_NAME));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data().slug).filter(Boolean);
}

// Get all insights (sorted by date, newest first)
export const getInsights = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const insights = [];
    
    querySnapshot.forEach((doc) => {
      insights.push({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to readable date
        date: doc.data().createdAt?.toDate().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }) || 'No date'
      });
    });
    
    return insights;
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
};

// Add a new insight (with slug)
export const addInsight = async (insightData) => {
  try {
    // ✅ generate unique slug
    const baseSlug = generateSlug(insightData.title);
    const existingSlugs = await getExistingSlugs();
    const uniqueSlug = ensureUniqueSlug(baseSlug, existingSlugs);

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      title: insightData.title,
      subtitle: insightData.subtitle || "",
      pdfLink: insightData.pdfLink || "",
      cloudinaryId: insightData.cloudinaryId || "",
      thumbnail: insightData.thumbnail || "",
      viewCount: 0,
      slug: uniqueSlug,
      createdAt: serverTimestamp()
    });
    
    console.log('Insight added with ID: ', docRef.id);
    return { id: docRef.id, slug: uniqueSlug };
  } catch (error) {
    console.error('Error adding insight:', error);
    throw error;
  }
};

// Increment view count
export const incrementViewCount = async (insightId) => {
  try {
    const insightRef = doc(db, COLLECTION_NAME, insightId);
    await updateDoc(insightRef, {
      viewCount: increment(1)
    });
    
    console.log('View count incremented for insight:', insightId);
  } catch (error) {
    console.error('Error incrementing view count:', error);
    throw error;
  }
};

// Validate insight data structure
export const validateInsightData = (data) => {
  const required = ['title', 'subtitle', 'thumbnail', 'pdfLink'];
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  return true;
};

// Get a single insight by slug
export const getInsightBySlug = async (slug) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("slug", "==", slug)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const docSnap = querySnapshot.docs[0];
    return {
      id: docSnap.id,
      ...docSnap.data(),
      date: docSnap.data().createdAt?.toDate().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) || 'No date'
    };
  } catch (error) {
    console.error("Error fetching insight by slug:", error);
    throw error;
  }
};
