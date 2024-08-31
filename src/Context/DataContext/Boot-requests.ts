import { addDoc, collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../../firebase";
import { BootType } from "../../Equipment/Boot/Boot";

export const getBootsForUser =
  (
    uid: string | undefined,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setBoots: Dispatch<SetStateAction<Array<BootType>>>,
    setError: Dispatch<SetStateAction<string | undefined>>
  ) =>
  async () => {
    setLoading(true);
    try {
      // Get all boots for the current user
      const bootCollection = collection(db, `boots/${uid}/boots`);

      const bootQuery = query(bootCollection);

      const bootSnapshot = await getDocs(bootQuery);

      const bootData = bootSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<BootType>;

      setBoots(bootData);
    } catch (err: any) {
      console.log(err);
      if (err.code === "permission-denied") setError("Sign in or register to see this!");
      else setError("Something went wrong loading boots...");
    } finally {
      setLoading(false);
    }
  };

export const addBoot =
  (uid: string | undefined, showSuccessToast: any, setError: any) => async (newBoot: BootType) => {
    try {
      // Boots for the currentuser
      const bootCollection = collection(db, `boots/${uid}/boots`);

      const docRef = await addDoc(bootCollection, {
        ...newBoot,
      });
      console.log("Document written with ID: ", docRef.id);
      setError(undefined);
      showSuccessToast("BOOT ADDED!");
    } catch (e) {
      console.error("Error adding document: ", e);
      setError(e);
    }
  };

export const deleteBoot =
  (uid: string | undefined, showSuccessToast: any, showErrorToast: any, setLoading: any, setError: any) =>
  async (bootId?: string) => {
    try {
      await deleteDoc(doc(db, `boots/${uid}/boots`, bootId ?? "")).then(res =>
        showSuccessToast("Boot deleted")
      );
    } catch (err) {
      showErrorToast("Something went wrong removing this boot");
    }
  };
