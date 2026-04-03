export interface LawyerCase {
  title: string;
  outcome: string;
  year: string;
}

export interface Lawyer {
  id: number;
  name: string;
  title: string;
  firm: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  rate: string;
  image: string;
  bio: string;
  education: string;
  admissions: string[];
  cases: LawyerCase[];
}

export const MOCK_LAWYERS: Lawyer[] = [
  {
    id: 1,
    name: "Inês Marques Ribeiro",
    title: "Sócia coordenadora",
    firm: "Marques Gil — Sociedade de Advogados, SP, RL",
    specialty: "Fusões e aquisições",
    rating: 4.9,
    reviews: 142,
    location: "Lisboa",
    rate: "280 € / h",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Mais de vinte anos em operações transfronteiriças de M&A e reestruturações para grupos cotados, fundos e famílias empresariais com sede ou operações em Portugal e na UE.",
    education: "Faculdade de Direito da Universidade de Lisboa, licenciatura; LL.M. em direito societário (Londres)",
    admissions: ["Ordem dos Advogados Portugueses", "Sociedade Portuguesa de Direito Comercial"],
    cases: [
      {
        title: "Aquisição de participação majoritária — tecnologia",
        outcome: "Operação aprovada pela concorrência",
        year: "2024",
      },
      {
        title: "Reestruturação de grupo em modo preventivo",
        outcome: "Plano homologado",
        year: "2023",
      },
    ],
  },
  {
    id: 2,
    name: "Ricardo Almeida Faria",
    title: "Sócio",
    firm: "Vila Nova — Propriedade Intelectual & TMT",
    specialty: "Propriedade industrial e PI",
    rating: 4.8,
    reviews: 98,
    location: "Porto",
    rate: "245 € / h",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Litígios e estratégia em patentes, marcas e software; defesa de inventores e scale-ups perante tribunais administrativos e arbitrais, com ênfase no Ecossistema do Norte.",
    education: "Faculdade de Direito da Universidade do Porto; examinador da Ordem dos Advogados (área PI)",
    admissions: ["Ordem dos Advogados Portugueses", "Instituto Nacional da Propriedade Industrial (representação)"],
    cases: [
      {
        title: "Litígio em patente farmacêutica",
        outcome: "Manutenção do título e indemnização",
        year: "2025",
      },
      {
        title: "Protecção de stack tecnológico — SaaS",
        outcome: "Acordo de licenciamento quadro",
        year: "2024",
      },
    ],
  },
  {
    id: 3,
    name: "Beatriz Fontes Carvalho",
    title: "Fundadora",
    firm: "Fontes Carvalho — Famílias e património",
    specialty: "Direito das sucessões e planeamento",
    rating: 5.0,
    reviews: 67,
    location: "Braga",
    rate: "220 € / h",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    bio: "Planeamento sucessório, constituição de fundações e holding familiar, compliance fiscal alinhado ao direito português e coordenação com consultores em jurisdições da UE e Lusofonia.",
    education: "Faculdade de Direito da Universidade do Minho; pós-graduação em direito tributário",
    admissions: ["Ordem dos Advogados Portugueses", "Associação Portuguesa de Arbitragem"],
    cases: [
      {
        title: "Reestruturação de unidade familiar e holding",
        outcome: "Governance e modelo fiscal otimizado",
        year: "2024",
      },
      {
        title: "Fundação de solidariedade com sede em Portugal",
        outcome: "Registo e quadro de doadores institucional",
        year: "2022",
      },
    ],
  },
];

export function getLawyerById(id: number): Lawyer | undefined {
  return MOCK_LAWYERS.find((l) => l.id === id);
}
