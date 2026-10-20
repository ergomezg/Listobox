import {
  AllergenOption,
  DietaryCategoryId,
  FaqItem,
  ListoBoxState,
  ProteinAffinityOption,
  ProteinSwapOption,
  Recipe,
  SideDishItem,
} from "@/types/listobox";

export const HERO_IMAGES = {
  homeGuest:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  wizardStep1:
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
  spicesBoard:
    "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
  chefCooking:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
  boxOpenKitchen:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
  step1MiseEnPlace:
    "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80",
  step2ChickenDish:
    "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
  step3PastaDish:
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
};

export const ALLERGEN_OPTIONS: AllergenOption[] = [
  {
    id: "mariscos",
    title: "Mariscos y Crustáceos",
    subtitle: "Riesgo Severo",
    severityLabel: "VETADO",
    isCriticalRisk: true,
  },
  {
    id: "mani",
    title: "Maní y Nueces",
    subtitle: "Frutos secos",
    severityLabel: "VETADO",
    isCriticalRisk: true,
  },
  {
    id: "lactosa",
    title: "Lactosa / Lácteos",
    subtitle: "Derivados vaca/cabra",
    severityLabel: "VETADO",
    isCriticalRisk: false,
  },
  {
    id: "gluten",
    title: "Gluten",
    subtitle: "Trigo, cebada, centeno",
    severityLabel: "VETADO",
    isCriticalRisk: false,
  },
  {
    id: "soya",
    title: "Soya",
    subtitle: "Edamame, lecitina",
    severityLabel: "VETADO",
    isCriticalRisk: false,
  },
  {
    id: "huevo",
    title: "Huevo",
    subtitle: "Claras y yemas",
    severityLabel: "VETADO",
    isCriticalRisk: false,
  },
];

export const PROTEIN_AFFINITIES: ProteinAffinityOption[] = [
  {
    id: "pollo-pastoreo",
    title: "Pollo Campesino de Pastoreo",
    subtitle: "Libre de jaula y antibióticos",
  },
  {
    id: "pescados-sostenibles",
    title: "Pescados y Mariscos Sostenibles",
    subtitle: "Pesca de anzuelo y cultivo responsable",
  },
  {
    id: "res-madurada",
    title: "Cortes de Res Madurados",
    subtitle: "Alimentación 100% pasto nacional",
  },
  {
    id: "plant-based",
    title: "Plant-Based / Tofu Orgánico",
    subtitle: "Legumbres, tempeh y semillas",
  },
];

export const DIETARY_CATEGORIES: {
  id: DietaryCategoryId;
  label: string;
  sublabel?: string;
}[] = [
  { id: "todos", label: "Todos" },
  { id: "equilibradas", label: "Equilibradas" },
  { id: "alta-proteina", label: "Alta Proteína", sublabel: "(35g+)" },
  { id: "bajas-carbos", label: "Bajas en Carbos" },
  { id: "vegetarianas", label: "Vegetarianas" },
  { id: "pescatarianas", label: "Pescatarianas" },
];

export const DEFAULT_PROTEIN_SWAPS: ProteinSwapOption[] = [
  {
    id: "pollo-campesino",
    name: "Pechuga de Pollo Campesino",
    weightGrams: 250,
    subtitle: "Original en tu receta",
    extraCostCOP: 0,
    isOriginal: true,
    imageUrl:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80",
    macros: {
      kcal: 540,
      kcalDeltaText: "Original",
      proteinGrams: 38,
      proteinTag: "Magra",
      carbsGrams: 46,
      carbsTag: "Lenta abs",
      fatsGrams: 16,
      fatsTag: "Equilibrio",
    },
  },
  {
    id: "tofu-organico",
    name: "Tofu Orgánico Ahumado y Sellado",
    weightGrams: 260,
    subtitle: "Soja no transgénica local",
    badgeText: "100% Vegetal",
    extraCostCOP: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=300&q=80",
    macros: {
      kcal: 490,
      kcalDeltaText: "-50 kcal",
      proteinGrams: 38,
      proteinTag: "Veg pura",
      carbsGrams: 46,
      carbsTag: "Lenta abs",
      fatsGrams: 14,
      fatsTag: "Cardio",
    },
  },
  {
    id: "lomo-res",
    name: "Lomo de Res en Tiras Premium",
    weightGrams: 240,
    subtitle: "Madurado 14 días",
    extraCostCOP: 4500,
    imageUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=300&q=80",
    macros: {
      kcal: 580,
      kcalDeltaText: "+40 kcal",
      proteinGrams: 44,
      proteinTag: "Hierro+",
      carbsGrams: 46,
      carbsTag: "Lenta abs",
      fatsGrams: 20,
      fatsTag: "Pasto 100%",
    },
  },
  {
    id: "salmon-pacifico",
    name: "Filete de Salmón del Pacífico",
    weightGrams: 220,
    subtitle: "Pesca sostenible",
    extraCostCOP: 6900,
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80",
    macros: {
      kcal: 560,
      kcalDeltaText: "+20 kcal",
      proteinGrams: 42,
      proteinTag: "Omega-3",
      carbsGrams: 46,
      carbsTag: "Lenta abs",
      fatsGrams: 22,
      fatsTag: "Cardio+",
    },
  },
];

export const DEFAULT_SIDE_DISHES: SideDishItem[] = [
  {
    id: "yuca-vapor",
    name: "Yuca campesina al vapor (200g)",
    weightGrams: 200,
    description: "Guarnición principal",
    statusLabel: "Incluido",
    iconType: "fork-knife",
    swapOptions: [
      { id: "yuca-actual", label: "Yuca al vapor (Actual)", extraCostCOP: 0 },
      {
        id: "papa-criolla",
        label: "Cambiar por Papa Criolla ($0)",
        extraCostCOP: 0,
      },
    ],
  },
  {
    id: "hogao-artesanal",
    name: "Hogao artesanal fresco ListoBox",
    description: "Tomate chonto maduro y cebolla junca (120g)",
    statusLabel: "Dosificado",
    iconType: "cooking-pot",
  },
  {
    id: "cilantro-limon",
    name: "Cilantro fresco y limón mandarino",
    description: "Hierbas limpias recién cortadas de finca",
    statusLabel: "Incluido",
    iconType: "leaf",
  },
];

export const RECIPES_CATALOG: Recipe[] = [
  {
    id: "pollo-campesino-criolla",
    title: "Pollo Campesino en Salsa Criolla",
    shortName: "Pollo Ca",
    description:
      "Pechuga marinada a las finas hierbas, cocinada a fuego lento en reducción de hogao criollo.",
    imageUrl:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80",
    prepTimeMinutes: 18,
    kcal: 490,
    proteinGrams: 38,
    portions: 2,
    categoryLabel: "Alta Proteína",
    topBadge: {
      text: "Cosecha Andina",
      variant: "dark-harvest",
    },
    dietaryCategories: ["todos", "equilibradas", "alta-proteina"],
    allergens: [],
    ingredientsCount: 9,
    defaultProteinLabel: "Pechuga de pastoreo",
    defaultProteinId: "pollo-campesino",
    proteinOptions: DEFAULT_PROTEIN_SWAPS,
    sideDishes: DEFAULT_SIDE_DISHES,
    tagRight: "Sin costo extra",
  },
  {
    id: "bowl-mediterraneo-quinua",
    title: "Bowl Mediterráneo de Quinua & Feta",
    shortName: "Bowl Ar",
    description:
      "Quinua perlada del Cauca con garbanzos crocantes, aceitunas, tomates secos, tomate cherry y pepino.",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    prepTimeMinutes: 15,
    kcal: 430,
    proteinGrams: 22,
    portions: 2,
    categoryLabel: "Vegetariana",
    topBadge: {
      text: "Cosecha Andina",
      variant: "dark-harvest",
    },
    dietaryCategories: ["todos", "equilibradas", "vegetarianas"],
    allergens: ["lactosa"],
    ingredientsCount: 9,
    defaultProteinLabel: "Garbanzos crocantes & Feta",
    defaultProteinId: "tofu-organico",
    proteinOptions: DEFAULT_PROTEIN_SWAPS,
    sideDishes: DEFAULT_SIDE_DISHES,
    tagRight: "Veggie",
  },
  {
    id: "salmon-glaseado-panela",
    title: "Salmón Glaseado en Reducción de Panela & Limón",
    shortName: "Salmón",
    description:
      "Filete de salmón del Pacífico sellado al sartén con glaseado cítrico de panela orgánica y vegetales verdes.",
    imageUrl:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    prepTimeMinutes: 18,
    kcal: 560,
    proteinGrams: 42,
    portions: 2,
    categoryLabel: "Pescatariana",
    topBadge: {
      text: "Cosecha Andina",
      variant: "dark-harvest",
    },
    dietaryCategories: [
      "todos",
      "alta-proteina",
      "pescatarianas",
      "bajas-carbos",
    ],
    allergens: [],
    ingredientsCount: 8,
    defaultProteinLabel: "Filete de Salmón del Pacífico",
    defaultProteinId: "salmon-pacifico",
    proteinOptions: DEFAULT_PROTEIN_SWAPS,
    sideDishes: DEFAULT_SIDE_DISHES,
    tagRight: "Sin costo extra",
  },
  {
    id: "cazuela-langostinos-coco",
    title: "Cazuela de Langostinos con Leche de Coco & Cilantro Cimarrón",
    shortName: "Cazuela",
    description:
      "No seleccionable automáticamente debido a tus preferencias de alérgenos configuradas.",
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    prepTimeMinutes: 25,
    kcal: 460,
    proteinGrams: 36,
    portions: 2,
    categoryLabel: "Pescatariana",
    topBadge: {
      text: "Contiene Mariscos · Veto en tu perfil",
      variant: "danger-allergen",
    },
    dietaryCategories: ["todos", "pescatarianas", "alta-proteina"],
    allergens: ["mariscos"],
    allergenDetailLabel: "Contiene: Langostinos / Crustáceos",
    safeAlternativeRecipeId: "filete-corvina-criolla",
    ingredientsCount: 9,
    defaultProteinLabel: "Langostinos del Pacífico",
    defaultProteinId: "pollo-campesino",
    proteinOptions: DEFAULT_PROTEIN_SWAPS,
    sideDishes: DEFAULT_SIDE_DISHES,
    tagRight: "Cambio seguro",
  },
  {
    id: "pappardelle-hongos-salvia",
    title: "Pappardelle Artesanal con Hongos Silvestres & Salvia Fresca",
    shortName: "Pappardelle",
    description:
      "Seta orellana de Cundinamarca salteada con mantequilla avellanada, salvia fresca de huerto y queso Paipa madurado 90 días.",
    imageUrl:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    prepTimeMinutes: 18,
    kcal: 490,
    proteinGrams: 38,
    portions: 2,
    categoryLabel: "Equilibrada",
    topBadge: {
      text: "Recomendado del Chef",
      variant: "dark-harvest",
    },
    dietaryCategories: ["todos", "equilibradas", "vegetarianas"],
    allergens: ["gluten", "lactosa"],
    ingredientsCount: 7,
    defaultProteinLabel: "Setas Orellanas & Queso Paipa",
    defaultProteinId: "tofu-organico",
    proteinOptions: DEFAULT_PROTEIN_SWAPS,
    sideDishes: DEFAULT_SIDE_DISHES,
    tagRight: "Sin costo extra",
  },
  {
    id: "lomo-fino-wok-criollo",
    title: "Lomo Fino Salteado al Wok Criollo con Papitas Nativas",
    shortName: "Lomo Wok",
    description:
      "Tiras tiernas de lomo de pastoreo con cebolla ocañera caramelizada, tomate chonto y papas nativas moradas al romero.",
    imageUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    prepTimeMinutes: 18,
    kcal: 490,
    proteinGrams: 38,
    portions: 2,
    categoryLabel: "Alta Proteína",
    topBadge: {
      text: "Favorito de los suscriptores",
      variant: "dark-harvest",
    },
    dietaryCategories: [
      "todos",
      "alta-proteina",
      "equilibradas",
      "bajas-carbos",
    ],
    allergens: [],
    ingredientsCount: 7,
    defaultProteinLabel: "Lomo de Res en Tiras Premium",
    defaultProteinId: "lomo-res",
    proteinOptions: DEFAULT_PROTEIN_SWAPS,
    sideDishes: DEFAULT_SIDE_DISHES,
    tagRight: "Sin costo extra",
  },
  {
    id: "risotto-cebada-setas",
    title: "Risotto Criollo de Cebada Perlada con Setas y Queso Paipa",
    shortName: "Risotto",
    description:
      "Cebada perlada boyacense cocinada lentamente en reducción de vegetales asados con setas doradas y láminas de queso Paipa.",
    imageUrl:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
    prepTimeMinutes: 18,
    kcal: 490,
    proteinGrams: 38,
    portions: 2,
    categoryLabel: "Equilibrada",
    topBadge: {
      text: "Express",
      variant: "dark-harvest",
    },
    dietaryCategories: ["todos", "equilibradas", "vegetarianas"],
    allergens: ["gluten", "lactosa"],
    ingredientsCount: 7,
    defaultProteinLabel: "Setas doradas & Queso Paipa",
    defaultProteinId: "tofu-organico",
    proteinOptions: DEFAULT_PROTEIN_SWAPS,
    sideDishes: DEFAULT_SIDE_DISHES,
    tagRight: "Sin costo extra",
  },
  {
    id: "filete-corvina-criolla",
    title: "Filete de Corvina en Salsa Criolla",
    shortName: "Corvina",
    description:
      "Pescado blanco artesanal 100% libre de mariscos con salsa criolla de tomate chonto y patacón crocante.",
    imageUrl:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    prepTimeMinutes: 22,
    kcal: 470,
    proteinGrams: 44,
    portions: 2,
    categoryLabel: "Alta Proteína",
    topBadge: {
      text: "100% Libre de Mariscos",
      variant: "dark-harvest",
    },
    dietaryCategories: [
      "todos",
      "alta-proteina",
      "pescatarianas",
      "bajas-carbos",
    ],
    allergens: [],
    ingredientsCount: 8,
    defaultProteinLabel: "Corvina blanca artesanal",
    defaultProteinId: "pollo-campesino",
    proteinOptions: DEFAULT_PROTEIN_SWAPS,
    sideDishes: DEFAULT_SIDE_DISHES,
    tagRight: "Sin costo extra",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "¿Cuándo llega mi caja ListoBox?",
    answer:
      "Entregamos los martes y miércoles en la franja horaria que elijas durante el checkout. Puedes modificar tu menú o pausar la entrega hasta el martes a las 23:59.",
  },
  {
    id: "faq-2",
    question: "¿Necesito saber cocinar para disfrutar ListoBox?",
    answer:
      "Para nada. Todos los ingredientes llegan lavados y dosificados al gramo exacto con una guía visual paso a paso diseñada para estar lista en 18 a 25 minutos.",
  },
  {
    id: "faq-3",
    question: "¿Cómo conservo los ingredientes?",
    answer:
      "Tu caja térmica con geles biodegradables mantiene la cadena de frío por 48 horas. Al recibirla, solo guarda las bolsas identificadas por color en tu nevera.",
  },
];

export const INITIAL_LISTOBOX_STATE: ListoBoxState = {
  currentScreen: "home-guest",
  activeTab: "menu",
  isSubscribedUser: false,
  isAuthenticated: false,
  isWeekSkipped: false,
  userPhone: "300 123 4567",

  // Paso 1: 2 Personas · 4 Recetas ($16.500 COP por plato)
  peopleCount: 2,
  mealsPerWeek: 4,
  basePricePerPortionCOP: 16500,

  // Paso 2: Mariscos vetados por defecto (03 - Onboarding Wizard - Suscripción 2.png)
  vetoedAllergens: ["mariscos"],
  proteinAffinities: ["pollo-pastoreo", "res-madurada", "plant-based"],
  maxCookingTime: "15-20",

  // Paso 3: 3 de 4 recetas preseleccionadas coherentes con los chips superiores
  selectedSlots: [
    {
      recipeId: "pollo-campesino-criolla",
      selectedProteinId: "pollo-campesino",
      selectedSideSwapId: "yuca-actual",
      extraCostCOP: 0,
    },
    {
      recipeId: "salmon-glaseado-panela",
      selectedProteinId: "salmon-pacifico",
      selectedSideSwapId: "yuca-actual",
      extraCostCOP: 0,
    },
    {
      recipeId: "bowl-mediterraneo-quinua",
      selectedProteinId: "tofu-organico",
      selectedSideSwapId: "yuca-actual",
      extraCostCOP: 0,
    },
  ],
  activeDietaryFilter: "todos",
  appliedCoupon: {
    code: "BIENVENIDO15",
    discountPercent: 15,
  },

  allergenModalRecipeId: null,
  swapSheetRecipeId: null,

  checkoutForm: {
    addressLine1: "Cra. 7 # 115 - 32",
    addressLine2: "Apto 402, Torre B",
    city: "Bogotá D.C. — Usaquén",
    deliveryDay: "martes-24",
    paymentMethod: "tarjeta",
    pseBank: "Bancolombia",
    walletPhone: "300 123 4567",
    cardNumberMasked: "•••• •••• •••• 4242",
    cardExpiry: "11/27",
    cardCvc: "999",
    rememberPaymentMethod: true,
  },
  orderNumber: "#LK-48291",
  firstDeliveryDateLabel: "Martes 24 de Octubre (8:00 AM – 1:00 PM)",
  nextCutOffLabel: "Martes 23:59 PM",
  lastRefreshedAt: null,
};
