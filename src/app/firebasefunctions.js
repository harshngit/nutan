import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from './firebase.config';


export async function getSinglePost(currentUrl){
   // Reference the 'blogs' collection
  const blogsRef = collection(db, 'blogs');

  // Create a query to find the document where the 'url' field matches the current URL
  const q = query(blogsRef, where('url', '==', currentUrl));
  console.log(currentUrl)
  // Execute the query
  const querySnapshot = await getDocs(q);

  // Check if any documents match the query
  if (!querySnapshot.empty) {
    // Return the first matching document's data
    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();
    console.log(data)
    return data;
  } else {
    // Handle the case where no documents match
    console.log('No matching document found!');
    return null; // Return null or throw an error
  }
}

export async function getBlogPosts() {
    const q = query(collection(db, "blogs")) 
        const querySnapshot = await getDocs(q);
        const posts = []
         querySnapshot.forEach((doc) => {
         
       posts.push({ id: doc.id, ...doc.data() })
         });
         return posts;
}