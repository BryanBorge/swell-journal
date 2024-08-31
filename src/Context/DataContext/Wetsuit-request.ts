import { addDoc, collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../../firebase";
import { WetsuitType } from "../../Equipment/Wetsuit/Wetsuit";

export const getWetsuitsForUser =
  (
    uid: string | undefined,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setWetsuits: Dispatch<SetStateAction<Array<WetsuitType>>>,
    setError: Dispatch<SetStateAction<string | undefined>>
  ) =>
  async () => {
    setLoading(true);
    try {
      // Get all boards for the current user
      const wetsuitCollection = collection(db, `wetsuits/${uid}/wetsuits`);

      const wetsuitQuery = query(wetsuitCollection);

      const boardSnapshot = await getDocs(wetsuitQuery);

      const wetsuitData = boardSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<WetsuitType>;

      setWetsuits(wetsuitData);
    } catch (err: any) {
      console.log(err);
      if (err.code === "permission-denied") setError("Sign in or register to see this!");
      else setError("Something went wrong loading wetsuits...");
    } finally {
      setLoading(false);
    }
  };

export const addWetsuit =
  (uid: string | undefined, showSuccessToast: any, setError: any) => async (newWetsuit: WetsuitType) => {
    try {
      // Boards for the currentuser
      const wetsuitCollection = collection(db, `wetsuits/${uid}/wetsuits`);

      const docRef = await addDoc(wetsuitCollection, {
        ...newWetsuit,
      });
      console.log("Document written with ID: ", docRef.id);
      setError(undefined);
      showSuccessToast("WETSUIT ADDED!");
    } catch (e) {
      console.error("Error adding document: ", e);
      setError(e);
    }
  };

export const deleteWetsuit =
  (uid: string | undefined, showSuccessToast: any, showErrorToast: any, setLoading: any, setError: any) =>
  async (wetsutiId?: string) => {
    try {
      await deleteDoc(doc(db, `wetsuits/${uid}/wetsuits`, wetsutiId ?? "")).then(res =>
        showSuccessToast("Wetsuit deleted")
      );
    } catch (err) {
      showErrorToast("Something went wrong removing this wetsuit");
      // setError("Something went wrong removing this board");
    }
  };
