"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useListoBox } from "@/context/ListoBoxContext";
import { MobileShell } from "@/components/ui/MobileShell";
import { PullToRefreshContainer } from "@/components/ui/PullToRefreshContainer";
import { AllergenBlockModal } from "@/components/ui/AllergenBlockModal";
import { IngredientSwapSheet } from "@/components/ui/IngredientSwapSheet";
import { HomeGuestScreen } from "@/components/screens/HomeGuestScreen";
import { WizardStep1Screen } from "@/components/screens/WizardStep1Screen";
import { WizardStep2Screen } from "@/components/screens/WizardStep2Screen";
import { WizardStep3Screen } from "@/components/screens/WizardStep3Screen";
import { WizardStep4Screen } from "@/components/screens/WizardStep4Screen";
import { CheckoutScreen } from "@/components/screens/CheckoutScreen";
import { CheckoutSuccessScreen } from "@/components/screens/CheckoutSuccessScreen";
import { HomeActiveScreen } from "@/components/screens/HomeActiveScreen";

export default function ListoBoxAppPage() {
  const router = useRouter();
  const {
    state,
    recipes,
    setBottomTab,
    navigateScreen,
    closeAllergenModal,
    acceptSafeAlternative,
    closeSwapSheet,
    saveRecipeSwap,
  } = useListoBox();

  const blockedRecipe =
    recipes.find((r) => r.id === state.allergenModalRecipeId) ??
    recipes.find((r) => r.id === "cazuela-langostinos-coco")!;

  const safeAlternative =
    recipes.find(
      (r) =>
        r.id ===
        (blockedRecipe.safeAlternativeRecipeId ?? "filete-corvina-criolla")
    ) ?? recipes[0];

  const swapRecipe =
    recipes.find((r) => r.id === state.swapSheetRecipeId) ?? recipes[0];

  const swapExistingSlot = state.selectedSlots.find(
    (s) => s.recipeId === state.swapSheetRecipeId
  );

  const handleBackClick = () => {
    switch (state.currentScreen) {
      case "wizard-step-1":
        navigateScreen(state.isSubscribedUser ? "home-active" : "home-guest");
        break;
      case "wizard-step-2":
        navigateScreen("wizard-step-1");
        break;
      case "wizard-step-3":
        navigateScreen("wizard-step-2");
        break;
      case "wizard-step-4":
        navigateScreen("wizard-step-3");
        break;
      case "checkout":
        navigateScreen("wizard-step-4");
        break;
      case "checkout-success":
        navigateScreen("home-active");
        break;
      case "home-guest":
      case "home-active":
      default:
        router.back();
        break;
    }
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case "home-guest":
        return <HomeGuestScreen />;
      case "wizard-step-1":
        return <WizardStep1Screen />;
      case "wizard-step-2":
        return <WizardStep2Screen />;
      case "wizard-step-3":
        return <WizardStep3Screen />;
      case "wizard-step-4":
        return <WizardStep4Screen />;
      case "checkout":
        return <CheckoutScreen />;
      case "checkout-success":
        return <CheckoutSuccessScreen />;
      case "home-active":
        return <HomeActiveScreen />;
      default:
        return <HomeGuestScreen />;
    }
  };

  return (
    <MobileShell
      activeTab={state.activeTab}
      boxCount={state.mealsPerWeek}
      isSheetOpen={Boolean(state.swapSheetRecipeId)}
      onTabChange={setBottomTab}
      onBackClick={handleBackClick}
      onLogoClick={() =>
        navigateScreen(state.isSubscribedUser ? "home-active" : "home-guest")
      }
      onHelpClick={() => navigateScreen("home-guest")}
      onProfileClick={() =>
        navigateScreen(state.isSubscribedUser ? "home-active" : "wizard-step-2")
      }
    >
      <PullToRefreshContainer>
        {state.swapSheetRecipeId ? (
          <IngredientSwapSheet
            isOpen={true}
            recipe={swapRecipe}
            peopleCount={state.peopleCount}
            initialProteinId={swapExistingSlot?.selectedProteinId}
            initialSideSwapId={swapExistingSlot?.selectedSideSwapId}
            onSaveSwap={saveRecipeSwap}
            onClose={closeSwapSheet}
          />
        ) : (
          renderScreen()
        )}
      </PullToRefreshContainer>

      <AllergenBlockModal
        isOpen={Boolean(state.allergenModalRecipeId)}
        blockedRecipe={blockedRecipe}
        safeAlternative={safeAlternative}
        onAcceptAlternative={acceptSafeAlternative}
        onDismiss={closeAllergenModal}
        onEditRestrictions={() => {
          closeAllergenModal();
          navigateScreen("wizard-step-2");
        }}
      />
    </MobileShell>
  );
}
