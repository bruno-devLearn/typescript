export interface Personagem {
    classe: string;
    nome: string;
    vida: number;
    habilidade: string;
    poder: number | string;
}

// Valores fixos
export const ValoresPersonagem = {
    Guerreiro: { vida: 100, habilidade: "arma", poder: "Espada" },
    Mago: { vida: 80, habilidade: "mana", poder: 150 },
    Arqueiro: { vida: 85, habilidade: "flechas", poder: 30 },
    Clerigo: { vida: 90, habilidade: "cura", poder: 50 },
    Ladino: { vida: 70, habilidade: "agilidade", poder: 95 },
} as const;
