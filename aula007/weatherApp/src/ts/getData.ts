import axios from "axios";

const API_KEY = "723128f55d64486bb45170233250504";

export async function getsearch(input) {
    try {
        // busca cidades que correspondem ao nome digitado
        const res = await axios.get(
            `http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${input}`
        );

        // se não encontrar nada, retorna vazio
        if (res.data.length === 0) {
            console.warn("Nenhuma cidade encontrada.");
            return [];
        }

        // busca dados climáticos de todas as cidades retornadas
        const response = await getData(res.data);

        return response;
    } catch (error) {
        console.error("Erro na busca:", error);
        return [];
    }
}

export async function getData(data) {
    try {
        // data é um array de objetos (cada cidade)
        const requests = data.map((city) =>
            axios.get(
                `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.name}`
            )
        );

        const responses = await Promise.all(requests);

        return responses.map((res) => res.data);
    } catch (error) {
        console.error("Erro ao buscar dados climáticos:", error);
        return [];
    }
}
