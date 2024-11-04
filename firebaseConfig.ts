import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCXvtXPE8kVxKXfYKAx9O_jqV_xGWQJQQ",
  authDomain: "sos-light-ai.firebaseapp.com",
  projectId: "sos-light-ai",
  storageBucket: "sos-light-ai.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);