// firebase/storage.js

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './index'; // Assuming your Firebase initialization is in index.js

const storageRef = getStorage(storage);

export async function uploadImage(file, userId) {
  const storagePath = `images/${userId}/${file.name}`;
  const imageRef = ref(storageRef, storagePath);

  await uploadBytes(imageRef, file);
  const downloadUrl = await getDownloadURL(imageRef);

  return downloadUrl;
}

// Other storage-related functions can go here
