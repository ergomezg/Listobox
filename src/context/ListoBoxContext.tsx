"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import {
  AllergenId,
  BottomNavTab,
  CheckoutFormState,
  CookingTimePref,
  DietaryCategoryId,
  ListoBoxState,
  ProteinAffinityId,
  Recipe,
  ScreenId,
} from "@/types/listobox";
import {
  INITIAL_LISTOBOX_STATE,
  RECIPES_CATALOG,
} from "@/mocks/listoboxData";

const STORAGE_KEY = "listobox_mvp_state_v2";

type Action =
  | { type: "NAVIGATE_SCREEN"; payload: ScreenId }
  | { type: "SET_BOTTOM_TAB"; payload: BottomNavTab }
  | { type: "SET_PEOPLE_COUNT"; payload: 1 | 2 | 4 | 6 }
  | { type: "SET_MEALS_PER_WEEK"; payload: 3 | 4 | 5 }
  | { type: "TOGGLE_ALLERGEN"; payload: AllergenId }
  | { type: "CLEAR_ALLERGENS" }
  | { type: "TOGGLE_PROTEIN_AFFINITY"; payload: ProteinAffinityId }
  | { type: "SET_COOKING_TIME"; payload: CookingTimePref }
  | { type: "SET_DIETARY_FILTER"; payload: DietaryCategoryId }
  | { type: "TOGGLE_RECIPE_IN_BOX"; payload: string }
  | { type: "OPEN_ALLERGEN_MODAL"; payload: string }
  | { type: "CLOSE_ALLERGEN_MODAL" }
  | {
      type: "ACCEPT_SAFE_ALTERNATIVE";
      payload: { blockedRecipeId: string; alternativeRecipeId: string };
    }
  | { type: "OPEN_SWAP_SHEET"; payload: string }
  | { type: "CLOSE_SWAP_SHEET" }
  | {
      type: "SAVE_RECIPE_SWAP";
      payload: {
        recipeId: string;
        proteinId: string;
        sideSwapId: string;
        extraCostCOP: number;
      };
    }
  | {
      type: "AUTHENTICATE_GUEST";
      payload: { method: "google" | "whatsapp" | "phone"; phone?: string };
    }
  | { type: "UPDATE_CHECKOUT_FORM"; payload: Partial<CheckoutFormState> }
  | { type: "SUBMIT_CHECKOUT_ORDER" }
  | { type: "GO_TO_ACTIVE_HOME" }
  | { type: "TOGGLE_SKIP_WEEK" }
  | { type: "OPEN_SKIP_WEEK_MODAL" }
  | { type: "CLOSE_SKIP_WEEK_MODAL" }
  | { type: "CONFIRM_SKIP_WEEK" }
  | { type: "OPEN_HELP_SHEET" }
  | { type: "CLOSE_HELP_SHEET" }
  | { type: "SIMULATE_PULL_REFRESH" }
  | { type: "HYDRATE_STATE"; payload: ListoBoxState };

function listoboxReducer(
  state: ListoBoxState,
  action: Action
): ListoBoxState {
  switch (action.type) {
    case "HYDRATE_STATE":
      return {
        ...state,
        ...action.payload,
        isSkipWeekModalOpen: false,
        isHelpSheetOpen: false,
      };

    case "NAVIGATE_SCREEN": {
      const screen = action.payload;
      let activeTab: BottomNavTab = state.activeTab;
      if (screen === "home-guest" || screen === "home-active") {
        activeTab = "menu";
      } else if (
        screen === "my-box" ||
        screen === "wizard-step-3" ||
        screen === "wizard-step-4" ||
        screen === "checkout" ||
        screen === "checkout-success"
      ) {
        activeTab = "box";
      } else if (screen === "calendar" || screen === "wizard-step-1") {
        activeTab = "calendar";
      } else if (screen === "profile" || screen === "wizard-step-2") {
        activeTab = "profile";
      }
      return {
        ...state,
        currentScreen: screen,
        activeTab,
      };
    }

    case "SET_BOTTOM_TAB": {
      const tab = action.payload;
      let nextScreen: ScreenId = state.currentScreen;
      if (tab === "menu") {
        nextScreen = state.isSubscribedUser ? "home-active" : "home-guest";
      } else if (tab === "box") {
        nextScreen = "my-box";
      } else if (tab === "calendar") {
        nextScreen = "calendar";
      } else if (tab === "profile") {
        nextScreen = "profile";
      }
      return {
        ...state,
        activeTab: tab,
        currentScreen: nextScreen,
      };
    }

    case "SET_PEOPLE_COUNT":
      return {
        ...state,
        peopleCount: action.payload,
      };

    case "SET_MEALS_PER_WEEK": {
      const newMax = action.payload;
      const trimmedSlots =
        state.selectedSlots.length > newMax
          ? state.selectedSlots.slice(0, newMax)
          : state.selectedSlots;
      return {
        ...state,
        mealsPerWeek: newMax,
        selectedSlots: trimmedSlots,
      };
    }

    case "TOGGLE_ALLERGEN": {
      const id = action.payload;
      const exists = state.vetoedAllergens.includes(id);
      const nextAllergens = exists
        ? state.vetoedAllergens.filter((item) => item !== id)
        : [...state.vetoedAllergens, id];

      const safeSlots = state.selectedSlots.filter((slot) => {
        const recipe = RECIPES_CATALOG.find((r) => r.id === slot.recipeId);
        if (!recipe) return false;
        return !recipe.allergens.some((a) => nextAllergens.includes(a));
      });

      return {
        ...state,
        vetoedAllergens: nextAllergens,
        selectedSlots: safeSlots,
      };
    }

    case "CLEAR_ALLERGENS":
      return {
        ...state,
        vetoedAllergens: [],
      };

    case "TOGGLE_PROTEIN_AFFINITY": {
      const id = action.payload;
      const exists = state.proteinAffinities.includes(id);
      return {
        ...state,
        proteinAffinities: exists
          ? state.proteinAffinities.filter((item) => item !== id)
          : [...state.proteinAffinities, id],
      };
    }

    case "SET_COOKING_TIME":
      return {
        ...state,
        maxCookingTime: action.payload,
      };

    case "SET_DIETARY_FILTER":
      return {
        ...state,
        activeDietaryFilter: action.payload,
      };

    case "TOGGLE_RECIPE_IN_BOX": {
      const recipeId = action.payload;
      const recipe = RECIPES_CATALOG.find((r) => r.id === recipeId);
      if (!recipe) return state;

      // Synchronous allergen check (Rule #4)
      const hasVetoedAllergen = recipe.allergens.some((allergen) =>
        state.vetoedAllergens.includes(allergen)
      );
      if (hasVetoedAllergen) {
        return {
          ...state,
          allergenModalRecipeId: recipeId,
        };
      }

      const existingIndex = state.selectedSlots.findIndex(
        (s) => s.recipeId === recipeId
      );

      if (existingIndex >= 0) {
        return {
          ...state,
          selectedSlots: state.selectedSlots.filter(
            (s) => s.recipeId !== recipeId
          ),
        };
      }

      const newSlot = {
        recipeId,
        selectedProteinId: recipe.defaultProteinId,
        selectedSideSwapId: "yuca-actual",
        extraCostCOP: 0,
      };

      if (state.selectedSlots.length >= state.mealsPerWeek) {
        return {
          ...state,
          selectedSlots: [
            ...state.selectedSlots.slice(0, state.mealsPerWeek - 1),
            newSlot,
          ],
        };
      }

      return {
        ...state,
        selectedSlots: [...state.selectedSlots, newSlot],
      };
    }

    case "OPEN_ALLERGEN_MODAL":
      return {
        ...state,
        allergenModalRecipeId: action.payload,
      };

    case "CLOSE_ALLERGEN_MODAL":
      return {
        ...state,
        allergenModalRecipeId: null,
      };

    case "ACCEPT_SAFE_ALTERNATIVE": {
      const { alternativeRecipeId } = action.payload;
      const altRecipe = RECIPES_CATALOG.find(
        (r) => r.id === alternativeRecipeId
      );
      if (!altRecipe) {
        return { ...state, allergenModalRecipeId: null };
      }

      const alreadyInBox = state.selectedSlots.some(
        (s) => s.recipeId === alternativeRecipeId
      );
      let nextSlots = state.selectedSlots;

      if (!alreadyInBox) {
        const newSlot = {
          recipeId: alternativeRecipeId,
          selectedProteinId: altRecipe.defaultProteinId,
          selectedSideSwapId: "yuca-actual",
          extraCostCOP: 0,
        };
        if (state.selectedSlots.length < state.mealsPerWeek) {
          nextSlots = [...state.selectedSlots, newSlot];
        } else {
          nextSlots = [
            ...state.selectedSlots.slice(0, state.mealsPerWeek - 1),
            newSlot,
          ];
        }
      }

      return {
        ...state,
        selectedSlots: nextSlots,
        allergenModalRecipeId: null,
      };
    }

    case "OPEN_SWAP_SHEET":
      return {
        ...state,
        swapSheetRecipeId: action.payload,
      };

    case "CLOSE_SWAP_SHEET":
      return {
        ...state,
        swapSheetRecipeId: null,
      };

    case "SAVE_RECIPE_SWAP": {
      const { recipeId, proteinId, sideSwapId, extraCostCOP } = action.payload;
      const existsInBox = state.selectedSlots.some(
        (s) => s.recipeId === recipeId
      );

      let nextSlots = state.selectedSlots.map((slot) =>
        slot.recipeId === recipeId
          ? {
              ...slot,
              selectedProteinId: proteinId,
              selectedSideSwapId: sideSwapId,
              extraCostCOP,
            }
          : slot
      );

      if (!existsInBox && state.selectedSlots.length < state.mealsPerWeek) {
        nextSlots = [
          ...state.selectedSlots,
          {
            recipeId,
            selectedProteinId: proteinId,
            selectedSideSwapId: sideSwapId,
            extraCostCOP,
          },
        ];
      }

      return {
        ...state,
        selectedSlots: nextSlots,
        swapSheetRecipeId: null,
      };
    }

    case "AUTHENTICATE_GUEST":
      return {
        ...state,
        isAuthenticated: true,
        authMethod: action.payload.method,
        userPhone: action.payload.phone ?? state.userPhone,
        currentScreen: "checkout",
        activeTab: "box",
      };

    case "UPDATE_CHECKOUT_FORM":
      return {
        ...state,
        checkoutForm: {
          ...state.checkoutForm,
          ...action.payload,
        },
      };

    case "SUBMIT_CHECKOUT_ORDER":
      return {
        ...state,
        isAuthenticated: true,
        isSubscribedUser: true,
        currentScreen: "checkout-success",
        activeTab: "box",
      };

    case "GO_TO_ACTIVE_HOME":
      return {
        ...state,
        isAuthenticated: true,
        isSubscribedUser: true,
        currentScreen: "home-active",
        activeTab: "menu",
      };

    case "TOGGLE_SKIP_WEEK":
      return {
        ...state,
        isWeekSkipped: !state.isWeekSkipped,
        isSkipWeekModalOpen: false,
      };

    case "OPEN_SKIP_WEEK_MODAL":
      return {
        ...state,
        isSkipWeekModalOpen: true,
      };

    case "CLOSE_SKIP_WEEK_MODAL":
      return {
        ...state,
        isSkipWeekModalOpen: false,
      };

    case "CONFIRM_SKIP_WEEK":
      return {
        ...state,
        isWeekSkipped: true,
        isSkipWeekModalOpen: false,
      };

    case "OPEN_HELP_SHEET":
      return {
        ...state,
        isHelpSheetOpen: true,
      };

    case "CLOSE_HELP_SHEET":
      return {
        ...state,
        isHelpSheetOpen: false,
      };

    case "SIMULATE_PULL_REFRESH":
      return {
        ...state,
        lastRefreshedAt: new Date().toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

    default:
      return state;
  }
}

interface ListoBoxContextValue {
  state: ListoBoxState;
  recipes: Recipe[];
  totalPortions: number;
  baseSubtotalCOP: number;
  swapsExtraCOP: number;
  subtotalCOP: number;
  discountCOP: number;
  discountedTotalCOP: number;
  pricePerPortionDiscountedCOP: number;
  isRecipeBlockedByAllergen: (recipe: Recipe) => boolean;
  navigateScreen: (screen: ScreenId) => void;
  setBottomTab: (tab: BottomNavTab) => void;
  setPeopleCount: (count: 1 | 2 | 4 | 6) => void;
  setMealsPerWeek: (meals: 3 | 4 | 5) => void;
  toggleAllergen: (id: AllergenId) => void;
  clearAllergens: () => void;
  toggleProteinAffinity: (id: ProteinAffinityId) => void;
  setCookingTime: (pref: CookingTimePref) => void;
  setDietaryFilter: (category: DietaryCategoryId) => void;
  toggleRecipeInBox: (recipeId: string) => void;
  openAllergenModal: (recipeId: string) => void;
  closeAllergenModal: () => void;
  acceptSafeAlternative: (
    blockedRecipeId: string,
    alternativeRecipeId: string
  ) => void;
  openSwapSheet: (recipeId: string) => void;
  closeSwapSheet: () => void;
  saveRecipeSwap: (
    recipeId: string,
    proteinId: string,
    sideSwapId: string,
    extraCostCOP: number
  ) => void;
  authenticateGuest: (
    method: "google" | "whatsapp" | "phone",
    phone?: string
  ) => void;
  updateCheckoutForm: (fields: Partial<CheckoutFormState>) => void;
  submitCheckoutOrder: () => void;
  goToActiveHome: () => void;
  toggleSkipWeek: () => void;
  openSkipWeekModal: () => void;
  closeSkipWeekModal: () => void;
  confirmSkipWeek: () => void;
  openHelpSheet: () => void;
  closeHelpSheet: () => void;
  simulatePullRefresh: () => void;
}

const ListoBoxContext = createContext<ListoBoxContextValue | undefined>(
  undefined
);

export function ListoBoxProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    listoboxReducer,
    INITIAL_LISTOBOX_STATE
  );

  // Hydrate from localStorage on mount (Rule #6: Guest-to-User persistence)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ListoBoxState;
        if (parsed && parsed.currentScreen) {
          dispatch({ type: "HYDRATE_STATE", payload: parsed });
        }
      }
    } catch {
      // Ignore storage access errors in private mode
    }
  }, []);

  // Persist to localStorage on state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  const totalPortions = state.peopleCount * state.mealsPerWeek;
  const baseSubtotalCOP = totalPortions * state.basePricePerPortionCOP;
  const swapsExtraCOP = state.selectedSlots.reduce(
    (acc, slot) => acc + slot.extraCostCOP,
    0
  );
  const subtotalCOP = baseSubtotalCOP + swapsExtraCOP;
  const discountCOP = state.appliedCoupon
    ? Math.round((baseSubtotalCOP * state.appliedCoupon.discountPercent) / 100)
    : 0;
  const discountedTotalCOP = subtotalCOP - discountCOP;
  const pricePerPortionDiscountedCOP =
    totalPortions > 0 ? Math.round(discountedTotalCOP / totalPortions) : 14025;

  const isRecipeBlockedByAllergen = (recipe: Recipe): boolean => {
    return recipe.allergens.some((a) => state.vetoedAllergens.includes(a));
  };

  const value = useMemo<ListoBoxContextValue>(
    () => ({
      state,
      recipes: RECIPES_CATALOG,
      totalPortions,
      baseSubtotalCOP,
      swapsExtraCOP,
      subtotalCOP,
      discountCOP,
      discountedTotalCOP,
      pricePerPortionDiscountedCOP,
      isRecipeBlockedByAllergen,
      navigateScreen: (screen) =>
        dispatch({ type: "NAVIGATE_SCREEN", payload: screen }),
      setBottomTab: (tab) =>
        dispatch({ type: "SET_BOTTOM_TAB", payload: tab }),
      setPeopleCount: (count) =>
        dispatch({ type: "SET_PEOPLE_COUNT", payload: count }),
      setMealsPerWeek: (meals) =>
        dispatch({ type: "SET_MEALS_PER_WEEK", payload: meals }),
      toggleAllergen: (id) =>
        dispatch({ type: "TOGGLE_ALLERGEN", payload: id }),
      clearAllergens: () => dispatch({ type: "CLEAR_ALLERGENS" }),
      toggleProteinAffinity: (id) =>
        dispatch({ type: "TOGGLE_PROTEIN_AFFINITY", payload: id }),
      setCookingTime: (pref) =>
        dispatch({ type: "SET_COOKING_TIME", payload: pref }),
      setDietaryFilter: (category) =>
        dispatch({ type: "SET_DIETARY_FILTER", payload: category }),
      toggleRecipeInBox: (recipeId) =>
        dispatch({ type: "TOGGLE_RECIPE_IN_BOX", payload: recipeId }),
      openAllergenModal: (recipeId) =>
        dispatch({ type: "OPEN_ALLERGEN_MODAL", payload: recipeId }),
      closeAllergenModal: () => dispatch({ type: "CLOSE_ALLERGEN_MODAL" }),
      acceptSafeAlternative: (blockedRecipeId, alternativeRecipeId) =>
        dispatch({
          type: "ACCEPT_SAFE_ALTERNATIVE",
          payload: { blockedRecipeId, alternativeRecipeId },
        }),
      openSwapSheet: (recipeId) =>
        dispatch({ type: "OPEN_SWAP_SHEET", payload: recipeId }),
      closeSwapSheet: () => dispatch({ type: "CLOSE_SWAP_SHEET" }),
      saveRecipeSwap: (recipeId, proteinId, sideSwapId, extraCostCOP) =>
        dispatch({
          type: "SAVE_RECIPE_SWAP",
          payload: { recipeId, proteinId, sideSwapId, extraCostCOP },
        }),
      authenticateGuest: (method, phone) =>
        dispatch({
          type: "AUTHENTICATE_GUEST",
          payload: { method, phone },
        }),
      updateCheckoutForm: (fields) =>
        dispatch({ type: "UPDATE_CHECKOUT_FORM", payload: fields }),
      submitCheckoutOrder: () => dispatch({ type: "SUBMIT_CHECKOUT_ORDER" }),
      goToActiveHome: () => dispatch({ type: "GO_TO_ACTIVE_HOME" }),
      toggleSkipWeek: () => dispatch({ type: "TOGGLE_SKIP_WEEK" }),
      openSkipWeekModal: () => dispatch({ type: "OPEN_SKIP_WEEK_MODAL" }),
      closeSkipWeekModal: () => dispatch({ type: "CLOSE_SKIP_WEEK_MODAL" }),
      confirmSkipWeek: () => dispatch({ type: "CONFIRM_SKIP_WEEK" }),
      openHelpSheet: () => dispatch({ type: "OPEN_HELP_SHEET" }),
      closeHelpSheet: () => dispatch({ type: "CLOSE_HELP_SHEET" }),
      simulatePullRefresh: () => dispatch({ type: "SIMULATE_PULL_REFRESH" }),
    }),
    [
      state,
      totalPortions,
      baseSubtotalCOP,
      swapsExtraCOP,
      subtotalCOP,
      discountCOP,
      discountedTotalCOP,
      pricePerPortionDiscountedCOP,
    ]
  );

  return (
    <ListoBoxContext.Provider value={value}>
      {children}
    </ListoBoxContext.Provider>
  );
}

export function useListoBox(): ListoBoxContextValue {
  const ctx = useContext(ListoBoxContext);
  if (!ctx) {
    throw new Error("useListoBox must be used within a ListoBoxProvider");
  }
  return ctx;
}
