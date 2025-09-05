import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@kesh:dividas";

export type Divida = {
    id: string;
    pessoa: string;
    descricao: string;
    valor: number;
    data: string | null;
    dividaPaga: boolean;
}

export async function saveDivida(divida: Divida) {
    try {
        const storedDividas = await AsyncStorage.getItem(STORAGE_KEY);
        const dividas: Divida[] = storedDividas ? JSON.parse(storedDividas) : [];
        dividas.push(divida);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dividas));
    } catch (error) {
        console.error("Erro em salvar a divida", error);
    }
}

export async function getDividas(): Promise<Divida[]> {
    try {
        const storedDividas = await AsyncStorage.getItem(STORAGE_KEY);
        return storedDividas ? JSON.parse(storedDividas) : [];
    } catch (error) {
        console.error("Erro em carregar as dividas", error);
        return [];
    }
}

export async function updateDividas(updatedDivida: Divida): Promise<void> {
    try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        let dividas: Divida[] = stored ? JSON.parse(stored) : [];
        dividas = dividas.map(divida => divida.id === updatedDivida.id ? updatedDivida : divida);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dividas));
    } catch (error) {
        console.error("Erro em atualizar a divida", error);
    }
}

export async function deleteDivida(id: string): Promise<void> {
    try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        let dividas: Divida[] = stored ? JSON.parse(stored) : [];
        dividas = dividas.filter(divida => divida.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dividas));
    } catch (error) {
        console.error("Erro em deletar a divida", error);
    }
}