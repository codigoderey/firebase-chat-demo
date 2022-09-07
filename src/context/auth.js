import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiNfDTFdAio71aQE8EE0XqFft4yBjoCW8",
  authDomain: "fir-dev-chat.firebaseapp.com",
  projectId: "fir-dev-chat",
  storageBucket: "fir-dev-chat.appspot.com",
  messagingSenderId: "5702572719",
  appId: "1:5702572719:web:0868b3740a2486967b125a",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = getAuth();

  // states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  // create new user
  const createNewUser = async (email, password) => {
    try {
      setError(false);
      setLoading(true);
      if (email === "" || password === "") {
        setError(true);
        setMessage("All fields are required.");
        return;
      }
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(newUser.user);
      localStorage.setItem("chat-user", JSON.stringify({ email }));
      setLoading(false);
      return newUser;
    } catch (error) {
      console.error("Error creating user ", error);
      if (error.code === "auth/email-already-in-use") {
        setLoading(false);
        setError(true);
        setMessage("El usuario está registrado.");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  // login user
  const loginUser = async (email, password) => {
    try {
      setError(false);
      setLoading(true);
      if (email === "" || password === "") {
        setError(true);
        setMessage("All fields are required.");
        return;
      }
      const signedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("chat-user", JSON.stringify({ email }));
      setUser(signedInUser.user);
      setLoading(false);
      return signedInUser;
    } catch (error) {
      console.error("Error login user ", error);
      console.error("Error creating user ", error);
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError(true);
        setMessage("Invalid credentials.");
        setLoading(false);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  // user persistance
  const persistUser = () => {
    const userExists = localStorage.getItem("chat-user");

    if (userExists) {
      const user = JSON.parse(userExists);
      setUser(user);
      return true;
    } else {
      return false;
    }
  };

  // sign out user
  const signOut = () => {
    localStorage.removeItem("chat-user");
  };

  return (
    <AuthContext.Provider
      value={{
        createNewUser,
        loading,
        error,
        message,
        loginUser,
        user,
        persistUser,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
