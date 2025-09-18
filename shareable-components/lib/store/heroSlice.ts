import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeroState, SectionId } from '../types/hero';

const initialState: HeroState = {
  activePanel: null,
  sectionStates: {
    business: { 
      selectedIndustry: 'hvac', 
      expanded: false 
    },
    personalized: { 
      step: 0, 
      expanded: false 
    },
    integrations: { 
      selectedTools: [], 
      expanded: false 
    },
    features: { 
      selectedFeatures: [], 
      expanded: false 
    },
    magic: { 
      dashboardView: 'overview', 
      expanded: false 
    },
    chooseUs: { 
      showCalendar: false, 
      expanded: false 
    },
  },
  animationStates: {},
  centralAI: {
    currentLanguageIndex: 0,
    isAnimating: false,
  },
};

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    openPanel: (state, action: PayloadAction<SectionId>) => {
      // Close all other panels
      Object.keys(state.sectionStates).forEach((key) => {
        const sectionKey = key as SectionId;
        state.sectionStates[sectionKey].expanded = false;
      });
      
      // Open the requested panel
      state.sectionStates[action.payload].expanded = true;
      state.activePanel = action.payload;
    },
    
    closePanel: (state) => {
      if (state.activePanel) {
        const activePanelId = state.activePanel as SectionId;
        state.sectionStates[activePanelId].expanded = false;
        state.activePanel = null;
      }
    },
    
    closePanelById: (state, action: PayloadAction<SectionId>) => {
      state.sectionStates[action.payload].expanded = false;
      if (state.activePanel === action.payload) {
        state.activePanel = null;
      }
    },
    
    selectIndustry: (state, action: PayloadAction<string>) => {
      state.sectionStates.business.selectedIndustry = action.payload;
    },
    
    updatePersonalizedStep: (state, action: PayloadAction<number>) => {
      state.sectionStates.personalized.step = action.payload;
    },
    
    toggleIntegrationTool: (state, action: PayloadAction<string>) => {
      const tools = state.sectionStates.integrations.selectedTools;
      const toolIndex = tools.indexOf(action.payload);
      
      if (toolIndex === -1) {
        tools.push(action.payload);
      } else {
        tools.splice(toolIndex, 1);
      }
    },
    
    toggleFeature: (state, action: PayloadAction<string>) => {
      const features = state.sectionStates.features.selectedFeatures;
      const featureIndex = features.indexOf(action.payload);
      
      if (featureIndex === -1) {
        features.push(action.payload);
      } else {
        features.splice(featureIndex, 1);
      }
    },
    
    changeDashboardView: (state, action: PayloadAction<string>) => {
      state.sectionStates.magic.dashboardView = action.payload;
    },
    
    toggleCalendar: (state) => {
      state.sectionStates.chooseUs.showCalendar = !state.sectionStates.chooseUs.showCalendar;
    },
    
    setAnimationState: (state, action: PayloadAction<{ key: string; value: boolean }>) => {
      state.animationStates[action.payload.key] = action.payload.value;
    },
    
    nextLanguage: (state) => {
      const totalLanguages = 6; // YOU, para TI, für DICH, pour VOUS, per TE, для ВАС
      state.centralAI.currentLanguageIndex = (state.centralAI.currentLanguageIndex + 1) % totalLanguages;
    },
    
    setCentralAIAnimating: (state, action: PayloadAction<boolean>) => {
      state.centralAI.isAnimating = action.payload;
    },
  },
});

export const {
  openPanel,
  closePanel,
  closePanelById,
  selectIndustry,
  updatePersonalizedStep,
  toggleIntegrationTool,
  toggleFeature,
  changeDashboardView,
  toggleCalendar,
  setAnimationState,
  nextLanguage,
  setCentralAIAnimating,
} = heroSlice.actions;

export default heroSlice.reducer;