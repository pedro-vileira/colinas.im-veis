import type { PropertyProvider, RawSourceProperty } from "./types";

const img = (f: string, alt: string, w = 1600, h = 1100) => ({ src: `/demo/${f}.svg`, alt, width: w, height: h });

/** IMÓVEIS FICTÍCIOS — somente demonstração. Nunca misturar com registros de produção. */
const DEMO: RawSourceProperty[] = [
  {
    externalId: "DEMO-001", code: "DEMO-001", title: "Casa de concreto aparente com pátio central",
    propertyType: "Casa", transactionType: "venda", price: 4850000, iptu: 1800,
    city: "São José dos Campos", neighborhood: "Jardim Esplanada",
    builtArea: 420, landArea: 800, bedrooms: 4, suites: 4, bathrooms: 6, parkingSpaces: 4, livingRooms: 3,
    description: "Residência de demonstração organizada em torno de um pátio central, com ambientes integrados ao paisagismo e iluminação natural ao longo do dia.\n\nTexto fictício, usado apenas para validar o layout do site.",
    features: ["Concreto aparente", "Pátio central", "Piscina", "Automação", "Aquecimento solar"],
    images: [img("a", "Fachada em concreto aparente"), img("b", "Sala integrada ao jardim"), img("c", "Pátio central"), img("d", "Suíte principal")],
    featured: true, published: true, isDemo: true,
  },
  {
    externalId: "DEMO-002", code: "DEMO-002", title: "Apartamento em andar alto com varanda contínua",
    propertyType: "Apartamento", transactionType: "venda", price: 1980000, condominiumFee: 1650, iptu: 720,
    city: "São José dos Campos", neighborhood: "Vila Ema",
    builtArea: 168, bedrooms: 3, suites: 3, bathrooms: 4, parkingSpaces: 3, livingRooms: 2,
    description: "Apartamento de demonstração com planta aberta e varanda contínua. Texto fictício.",
    features: ["Varanda contínua", "Piso em pedra natural", "Lazer completo"],
    images: [img("e", "Sala com varanda contínua"), img("c", "Cozinha integrada"), img("a", "Dormitório")],
    featured: true, published: true, isDemo: true,
  },
  {
    externalId: "DEMO-003", code: "DEMO-003", title: "Edifício comercial corporativo",
    propertyType: "Prédio comercial", transactionType: "venda", price: 12400000,
    city: "São José dos Campos", neighborhood: "Jardim Aquarius",
    builtArea: 2300, landArea: 1200, parkingSpaces: 40,
    description: "Edifício comercial de demonstração, lajes corridas e recepção em pé-direito duplo. Texto fictício.",
    features: ["Lajes corridas", "Gerador"],
    images: [img("b", "Fachada do edifício corporativo"), img("d", "Recepção")],
    featured: true, published: true, isDemo: true,
  },
  {
    externalId: "DEMO-004", code: "DEMO-004", title: "Casa em condomínio com jardim lateral",
    propertyType: "Casa", transactionType: "venda", price: 2750000, condominiumFee: 1200, iptu: 950,
    city: "Jacareí", neighborhood: "Jardim Alvorada",
    builtArea: 290, landArea: 520, bedrooms: 3, suites: 2, bathrooms: 4, parkingSpaces: 3, livingRooms: 2,
    description: "Casa de demonstração em condomínio fechado. Texto fictício.",
    features: ["Madeira e pedra", "Jardim lateral", "Churrasqueira"],
    images: [img("d", "Casa com jardim lateral"), img("a", "Varanda gourmet"), img("e", "Sala de estar")],
    published: true, isDemo: true,
  },
  {
    externalId: "DEMO-005", code: "DEMO-005", title: "Terreno plano com frente para avenida",
    propertyType: "Terreno", transactionType: "venda", price: 3200000,
    city: "São José dos Campos", neighborhood: "Urbanova",
    landArea: 1500,
    description: "Terreno de demonstração, plano, com testada ampla. Texto fictício.",
    features: ["Plano", "Frente para avenida"],
    images: [img("c", "Terreno plano")],
    published: true, isDemo: true,
  },
  {
    externalId: "DEMO-006", code: "DEMO-006", title: "Sala comercial com vista aberta",
    propertyType: "Sala comercial", transactionType: "venda", price: 890000, condominiumFee: 980, iptu: 310,
    city: "São José dos Campos", neighborhood: "Jardim Aquarius",
    builtArea: 74, parkingSpaces: 2, bathrooms: 1,
    description: "Sala comercial de demonstração. Texto fictício.",
    features: ["Vista aberta", "Piso elevado"],
    images: [img("e", "Sala comercial"), img("b", "Recepção do andar")],
    published: true, isDemo: true,
  },
  {
    externalId: "DEMO-007", code: "DEMO-007", title: "Imóvel não publicado (teste de ocultação)",
    propertyType: "Casa", transactionType: "venda", price: 1000000,
    city: "Jacareí", neighborhood: "Centro", builtArea: 100, bedrooms: 2,
    images: [img("a", "Teste")], published: false, isDemo: true,
  },
];

export const mockProvider: PropertyProvider = {
  name: "mock",
  async fetchAll() {
    return DEMO;
  },
};
