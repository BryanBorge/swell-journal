import React, { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

import { AuthContext } from "../AuthContext";
import useToast from "../ToastContainer";
import { WetsuitType } from "../../Equipment/Wetsuit/Wetsuit";
import { addWetsuit, deleteWetsuit, getWetsuitsForUser } from "./Wetsuit-request";
import { addBoard, deleteBoard, getBoardsForUser } from "./Board-requests";
import { GloveType } from "../../Equipment/Glove/Glove";
import { addGlove, deleteGlove, getGolvesForUser } from "./Glove-request";
import { BootType } from "../../Equipment/Boot/Boot";
import { addBoot, deleteBoot, getBootsForUser } from "./Boot-requests";
import { BoardType } from "../../Equipment/Board/Boards";

type DataContext = {
  boards: Array<BoardType>;
  wetsuits: Array<WetsuitType>;
  gloves: Array<GloveType>;
  boots: Array<BootType>;
  loading: boolean;
  error: string | undefined;
  // BOARDS
  getBoardsForUser: () => void;
  addBoard: (board: BoardType) => void;
  deleteBoard: (boardId?: string) => void;
  // WETSUITS
  getWetsuitsForUser: () => void;
  addWetsuit: (wetsuit: WetsuitType) => void;
  deleteWetsuit: (wetsuitId?: string) => void;
  // GLOVES
  getGlovesForUser: () => void;
  addGlove: (glove: GloveType) => void;
  deleteGlove: (gloveId?: string) => void;
  // BOOTS
  getBootsForUser: () => void;
  addBoot: (boot: BootType) => void;
  deleteBoot: (bootId?: string) => void;
};

const defaultContext: DataContext = {
  boards: [],
  wetsuits: [],
  gloves: [],
  boots: [],
  loading: false,
  error: undefined,
  // BOARDS
  getBoardsForUser: () => {},
  addBoard: (board: BoardType) => {},
  deleteBoard: (boardId?: string) => {},
  // WETSUITS
  getWetsuitsForUser: () => {},
  addWetsuit: (wetsuit: WetsuitType) => {},
  deleteWetsuit: (wetsuitId?: string) => {},
  // GLOVES
  getGlovesForUser: () => {},
  addGlove: (glove: GloveType) => {},
  deleteGlove: (gloveId?: string) => {},
  // BOOTS
  getBootsForUser: () => {},
  addBoot: (boot: BootType) => {},
  deleteBoot: (bootId?: string) => {},
};

export const DataContext = createContext(defaultContext);

export const DataContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [boards, setBoards] = useState<Array<BoardType>>([]);
  const [wetsuits, setWetsuits] = useState<Array<WetsuitType>>([]);
  const [gloves, setGloves] = useState<Array<GloveType>>([]);
  const [boots, setBoots] = useState<Array<BootType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { user } = useContext(AuthContext);
  const { showSuccessToast, showErrorToast } = useToast();

  return (
    <DataContext.Provider
      value={{
        boards,
        wetsuits,
        gloves,
        boots,
        loading,
        error,
        // BOARDS
        getBoardsForUser: getBoardsForUser(user?.uid, setLoading, setBoards, setError),
        addBoard: addBoard(user?.uid, showSuccessToast, setError),
        deleteBoard: deleteBoard(user?.uid, showSuccessToast, showErrorToast, setLoading, setError),
        // WETSUITS
        getWetsuitsForUser: getWetsuitsForUser(user?.uid, setLoading, setWetsuits, setError),
        addWetsuit: addWetsuit(user?.uid, showSuccessToast, setError),
        deleteWetsuit: deleteWetsuit(user?.uid, showSuccessToast, showErrorToast, setLoading, setError),
        // GLOVES
        getGlovesForUser: getGolvesForUser(user?.uid, setLoading, setGloves, setError),
        addGlove: addGlove(user?.uid, showSuccessToast, setError),
        deleteGlove: deleteGlove(user?.uid, showSuccessToast, showErrorToast, setLoading, setError),
        // BOOTS
        getBootsForUser: getBootsForUser(user?.uid, setLoading, setBoots, setError),
        addBoot: addBoot(user?.uid, showSuccessToast, setError),
        deleteBoot: deleteBoot(user?.uid, showSuccessToast, showErrorToast, setLoading, setError),
      }}>
      {children}
    </DataContext.Provider>
  );
};
