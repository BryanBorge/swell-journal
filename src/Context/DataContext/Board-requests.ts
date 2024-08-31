import { addDoc, collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { db } from "../../firebase";
import { BoardType } from "../../Equipment/Board/Boards";

export const getBoardsForUser =
  (
    uid: string | undefined,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setBoards: Dispatch<SetStateAction<Array<BoardType>>>,
    setError: Dispatch<SetStateAction<string | undefined>>
  ) =>
  async () => {
    setLoading(true);
    try {
      // Get all boards for the current user
      const boardCollection = collection(db, `boards/${uid}/boards`);

      const boardQuery = query(boardCollection);

      const boardSnapshot = await getDocs(boardQuery);

      const boardData = boardSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<BoardType>;

      setBoards(boardData);
    } catch (err: any) {
      console.log(err);
      if (err.code === "permission-denied") setError("Sign in or register to see this!");
      else setError("Something went wrong loading boards...");
    } finally {
      setLoading(false);
    }
  };

export const addBoard =
  (uid: string | undefined, showSuccessToast: any, setError: any) => async (newBoard: BoardType) => {
    try {
      // Boards for the currentuser
      const boardCollection = collection(db, `boards/${uid}/boards`);

      const docRef = await addDoc(boardCollection, {
        ...newBoard,
      });
      console.log("Document written with ID: ", docRef.id);
      setError(undefined);
      showSuccessToast("BOARD ADDED!");
    } catch (e) {
      console.error("Error adding document: ", e);
      setError(e);
    }
  };

export const deleteBoard =
  (uid: string | undefined, showSuccessToast: any, showErrorToast: any, setLoading: any, setError: any) =>
  async (boardId?: string) => {
    try {
      await deleteDoc(doc(db, `boards/${uid}/boards`, boardId ?? "")).then(res =>
        showSuccessToast("Board deleted")
      );
    } catch (err) {
      showErrorToast("Something went wrong removing this board");
      // setError("Something went wrong removing this board");
    }
  };
