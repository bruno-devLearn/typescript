import { create } from "zustand";
import type { Funcionario } from "./build";

type FuncionariosType = {
    listaFuncionarios: Funcionario[];
    updateLista: (newList: Funcionario[]) => void;
};

export const useFuncionarios = create<FuncionariosType>((set) => ({
    listaFuncionarios: [],
    updateLista: (newList) => set({ listaFuncionarios: newList }),
}));
