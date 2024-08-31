import { addDoc, collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../../firebase";
import { GloveType } from "../../Equipment/Glove/Glove";

export const getGolvesForUser =
  (
    uid: string | undefined,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setGloves: Dispatch<SetStateAction<Array<GloveType>>>,
    setError: Dispatch<SetStateAction<string | undefined>>
  ) =>
  async () => {
    setLoading(true);
    try {
      // Get all boards for the current user
      const gloveCollection = collection(db, `gloves/${uid}/gloves`);

      const gloveQuery = query(gloveCollection);

      const gloveSnapshot = await getDocs(gloveQuery);

      const gloveData = gloveSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<GloveType>;

      setGloves(gloveData);
    } catch (err: any) {
      console.log(err);
      if (err.code === "permission-denied") setError("Sign in or register to see this!");
      else setError("Something went wrong loading gloves...");
    } finally {
      setLoading(false);
    }
  };

export const addGlove =
  (uid: string | undefined, showSuccessToast: any, setError: any) => async (newGlove: GloveType) => {
    try {
      // Boards for the currentuser
      const gloveCollection = collection(db, `gloves/${uid}/gloves`);

      const docRef = await addDoc(gloveCollection, {
        ...newGlove,
      });
      console.log("Document written with ID: ", docRef.id);
      setError(undefined);
      showSuccessToast("GLOVE ADDED!");
    } catch (e) {
      console.error("Error adding document: ", e);
      setError(e);
    }
  };

export const deleteGlove =
  (uid: string | undefined, showSuccessToast: any, showErrorToast: any, setLoading: any, setError: any) =>
  async (wetsutiId?: string) => {
    try {
      await deleteDoc(doc(db, `gloves/${uid}/gloves`, wetsutiId ?? "")).then(res =>
        showSuccessToast("Glove deleted")
      );
    } catch (err) {
      showErrorToast("Something went wrong removing this glove");
      // setError("Something went wrong removing this board");
    }
  };
