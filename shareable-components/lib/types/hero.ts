export interface HeroState {
  activePanel: string | null;
  sectionStates: {
    business: { 
      selectedIndustry: string; 
      expanded: boolean; 
    };
    personalized: { 
      step: number; 
      expanded: boolean; 
    };
    integrations: { 
      selectedTools: string[]; 
      expanded: boolean; 
    };
    features: { 
      selectedFeatures: string[]; 
      expanded: boolean; 
    };
    magic: { 
      dashboardView: string; 
      expanded: boolean; 
    };
    chooseUs: { 
      showCalendar: boolean; 
      expanded: boolean; 
    };
  };
  animationStates: Record<string, boolean>;
  centralAI: {
    currentLanguageIndex: number;
    isAnimating: boolean;
  };
}

export interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  isExpanded: boolean;
  onExpand: () => void;
  onHover?: () => void;
  children?: React.ReactNode;
}

export interface PanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export type SectionId = 'business' | 'personalized' | 'integrations' | 'features' | 'magic' | 'chooseUs';

export interface IndustryData {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  benefits: string[];
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
}

export interface IntegrationData {
  id: string;
  name: string;
  icon: string;
  category: string;
  connected: boolean;
  description: string;
}