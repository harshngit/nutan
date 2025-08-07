import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '@/app/firebase.config';

export const loginUsingEmail = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.name ,
        photoURL: user.photoURL || '',
        phoneNumber: user.phoneNumber || user.contact || '',
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.name || '',
        photoURL: user.photoURL || '',
        phoneNumber: user.phoneNumber || user.contact || '',
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName || user.name || '',
              photoURL: user.photoURL || '',
              phoneNumber: user.phoneNumber || user.contact || '',
              emailVerified: user.emailVerified,
            });
          } else {
            reject('No user found');
          }
        });
      });
    } catch (error) {
      return rejectWithValue(error.message || 'Load user failed');
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.name || '',
        photoURL: user.photoURL || '',
        phoneNumber: user.phoneNumber || user.contact || '',
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Google login failed');
    }
  }
);
