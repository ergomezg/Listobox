export type ScreenId =
  | "home-guest"
  | "wizard-step-1"
  | "wizard-step-2"
  | "wizard-step-3"
  | "wizard-step-4"
  | "checkout"
  | "checkout-success"
  | "home-active"
  | "my-box"
  | "calendar"
  | "profile";

export type BottomNavTab = "menu" | "box" | "calendar" | "profile";

export type AllergenId =
  | "mariscos"
  | "mani"
  | "lactosa"
  | "gluten"
  | "soya"
  | "huevo";

export type ProteinAffinityId =
  | "pollo-pastoreo"
  | "pescados-sostenibles"
  | "res-madurada"
  | "plant-based";

export type CookingTimePref = "15-20" | "25-35";

export type DietaryCategoryId =
  | "todos"
  | "equilibradas"
  | "alta-proteina"
  | "bajas-carbos"
  | "vegetarianas"
  | "pescatarianas";

export type LocalPaymentMethodId = "tarjeta" | "pse" | "nequi" | "daviplata";

export interface AllergenOption {
  id: AllergenId;
  title: string;
  subtitle: string;
  severityLabel: string;
  isCriticalRisk: boolean;
}

export interface ProteinAffinityOption {
  id: ProteinAffinityId;
  title: string;
  subtitle: string;
}

export interface ProteinSwapOption {
  id: string;
  name: string;
  weightGrams: number;
  subtitle: string;
  badgeText?: string;
  extraCostCOP: number;
  isOriginal?: boolean;
  imageUrl: string;
  macros: {
    kcal: number;
    kcalDeltaText: string;
    proteinGrams: number;
    proteinTag: string;
    carbsGrams: number;
    carbsTag: string;
    fatsGrams: number;
    fatsTag: string;
  };
}

export interface SideDishItem {
  id: string;
  name: string;
  weightGrams?: number;
  description: string;
  statusLabel: "Incluido" | "Dosificado";
  iconType: "fork-knife" | "cooking-pot" | "leaf";
  swapOptions?: {
    id: string;
    label: string;
    extraCostCOP: number;
  }[];
}

export interface Recipe {
  id: string;
  title: string;
  shortName: string;
  description: string;
  imageUrl: string;
  prepTimeMinutes: number;
  kcal: number;
  proteinGrams: number;
  portions: number;
  categoryLabel: string;
  topBadge: {
    text: string;
    variant:
      | "dark-harvest"
      | "online-only"
      | "chef-signature"
      | "danger-allergen";
  };
  dietaryCategories: DietaryCategoryId[];
  allergens: AllergenId[];
  allergenDetailLabel?: string;
  safeAlternativeRecipeId?: string;
  ingredientsCount: number;
  defaultProteinLabel: string;
  defaultProteinId: string;
  proteinOptions: ProteinSwapOption[];
  sideDishes: SideDishItem[];
  tagRight: string;
}

export interface SelectedRecipeSlot {
  recipeId: string;
  selectedProteinId: string;
  selectedSideSwapId: string;
  extraCostCOP: number;
}

export interface CheckoutFormState {
  addressLine1: string;
  addressLine2: string;
  city: string;
  deliveryDay: "martes-24" | "miercoles-25";
  paymentMethod: LocalPaymentMethodId;
  pseBank: string;
  walletPhone: string;
  cardNumberMasked: string;
  cardExpiry: string;
  cardCvc: string;
  rememberPaymentMethod: boolean;
}

export type HelpFaqCategoryId =
  | "todos"
  | "suscripcion"
  | "envios"
  | "recetas";

export type HelpFaqIconType =
  | "calendar"
  | "snowflake"
  | "shield"
  | "swap"
  | "map-pin"
  | "cooking-pot";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: HelpFaqCategoryId;
  iconType?: HelpFaqIconType;
}

export interface ListoBoxState {
  currentScreen: ScreenId;
  activeTab: BottomNavTab;
  isSubscribedUser: boolean;
  isAuthenticated: boolean;
  isWeekSkipped: boolean;
  userPhone: string;
  authMethod?: "google" | "whatsapp" | "phone";

  // Wizard Paso 1: Tamaño del Hogar
  peopleCount: 1 | 2 | 4 | 6;
  mealsPerWeek: 3 | 4 | 5;
  basePricePerPortionCOP: number;

  // Wizard Paso 2: Seguridad y Gustos
  vetoedAllergens: AllergenId[];
  proteinAffinities: ProteinAffinityId[];
  maxCookingTime: CookingTimePref;

  // Wizard Paso 3 y 4: Selección de Caja y Swaps
  selectedSlots: SelectedRecipeSlot[];
  activeDietaryFilter: DietaryCategoryId;
  appliedCoupon: {
    code: string;
    discountPercent: number;
  } | null;

  // Modales Activos
  allergenModalRecipeId: string | null;
  swapSheetRecipeId: string | null;
  isSkipWeekModalOpen?: boolean;
  isHelpSheetOpen?: boolean;

  // Checkout & Confirmación
  checkoutForm: CheckoutFormState;
  orderNumber: string;
  firstDeliveryDateLabel: string;
  nextCutOffLabel: string;
  lastRefreshedAt: string | null;
}

export function formatCOP(value: number): string {
  return `$${Math.round(value).toLocaleString("es-CO")}`;
}
