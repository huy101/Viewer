import {
  AngleMeasurementsMouseControl,
  AngleMeasurementsPlugin,
  DistanceMeasurementsMouseControl,
  DistanceMeasurementsPlugin,
  NavCubePlugin,
  SectionPlanesPlugin,
  TreeViewPlugin,
  Viewer,
  XKTLoaderPlugin,
} from '@xeokit/xeokit-sdk';
import type React from 'react';
import { createContext, type ReactNode, useContext, useReducer } from 'react';

// Types
export interface SectionPlaneInfo {
  id: string;
  name: string;
  plane: SectionPlane;
  active: boolean;
  modelId?: string;
}

interface ViewerState {
  viewer: Viewer | null;
  treeView: TreeViewPlugin | null;
  anglePlugin: AngleMeasurementsMouseControl | null;
  distancePlugin: DistanceMeasurementsMouseControl | null;
  highlightedItemId: string | null;
  sectionPlanes: SectionPlanesPlugin | null;
  angleMeasurementsPlugin: AngleMeasurementsPlugin | null;
  distanceMeasurementsPlugin: DistanceMeasurementsPlugin | null;
  xktLoader: XKTLoaderPlugin | null;
  currentModel: any | null;
  prevTreeModelId: string | null;
  showModal: boolean;
  isVisible: boolean;
  loading: boolean;
  sectionActive: boolean;
  activeTool: string;
  sectionPlanesList: SectionPlaneInfo[];
  activeSectionId: string | null;
  editingSectionName: string | null;
  tempSectionName: string;
  openDropdown: string | null;
  isWalkMode: boolean;
}

type ViewerAction =
  | { type: 'INIT_VIEWER'; payload: Partial<ViewerState> }
  | { type: 'HIGHLIGHT_ITEM'; payload: string | null }
  | { type: 'TOGGLE_HIGHLIGHT'; payload: string }
  | { type: 'SET_ACTIVE_TOOL'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SHOW_MODAL'; payload: boolean }
  | { type: 'SET_IS_VISIBLE'; payload: boolean }
  | { type: 'SET_WALK_MODE'; payload: boolean }
  | { type: 'SET_SECTION_ACTIVE'; payload: boolean }
  | { type: 'SET_CURRENT_MODEL'; payload: any }
  | { type: 'ADD_SECTION_PLANE'; payload: SectionPlaneInfo }
  | { type: 'TOGGLE_SECTION_PLANE'; payload: string }
  | { type: 'SET_ACTIVE_SECTION_ID'; payload: string | null }
  | { type: 'SET_EDITING_SECTION_NAME'; payload: string | null }
  | { type: 'SET_TEMP_SECTION_NAME'; payload: string }
  | { type: 'UPDATE_SECTION_NAME'; payload: { id: string; name: string } }
  | { type: 'DELETE_SECTION_PLANE'; payload: string }
  | { type: 'CLEAR_ALL_SECTION_PLANES' }
  | { type: 'SET_OPEN_DROPDOWN'; payload: string | null };

const initialState: ViewerState = {
  viewer: null,
  treeView: null,
  anglePlugin: null,
  distancePlugin: null,
  highlightedItemId: null,
  sectionPlanes: null,
  angleMeasurementsPlugin: null,
  distanceMeasurementsPlugin: null,
  xktLoader: null,
  currentModel: null,
  prevTreeModelId: null,
  showModal: false,
  isVisible: false,
  loading: false,
  sectionActive: false,
  activeTool: '',
  sectionPlanesList: [],
  activeSectionId: null,
  editingSectionName: null,
  tempSectionName: '',
  openDropdown: null,
  isWalkMode: false,
};

function viewerReducer(state: ViewerState, action: ViewerAction): ViewerState {
  switch (action.type) {
    case 'INIT_VIEWER':
      return { ...state, ...action.payload };
    case 'SET_ACTIVE_TOOL':
      return { ...state, activeTool: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SHOW_MODAL':
      return { ...state, showModal: action.payload };
    case 'SET_IS_VISIBLE':
      return { ...state, isVisible: action.payload };
    case 'SET_WALK_MODE':
      return { ...state, isWalkMode: action.payload };
    case 'SET_SECTION_ACTIVE':
      return { ...state, sectionActive: action.payload };
    case 'SET_CURRENT_MODEL':
      return { ...state, currentModel: action.payload };
    case 'ADD_SECTION_PLANE':
      return {
        ...state,
        sectionPlanesList: [...state.sectionPlanesList, action.payload],
      };
    case 'TOGGLE_SECTION_PLANE':
      return {
        ...state,
        sectionPlanesList: state.sectionPlanesList.map((sec) => (sec.id === action.payload ? { ...sec, active: !sec.active } : sec)),
      };
    case 'SET_ACTIVE_SECTION_ID':
      return { ...state, activeSectionId: action.payload };
    case 'SET_EDITING_SECTION_NAME':
      return { ...state, editingSectionName: action.payload };
    case 'SET_TEMP_SECTION_NAME':
      return { ...state, tempSectionName: action.payload };
    case 'UPDATE_SECTION_NAME':
      return {
        ...state,
        sectionPlanesList: state.sectionPlanesList.map((sec) => (sec.id === action.payload.id ? { ...sec, name: action.payload.name } : sec)),
      };
    case 'DELETE_SECTION_PLANE':
      return {
        ...state,
        sectionPlanesList: state.sectionPlanesList.filter((sec) => sec.id !== action.payload),
      };
    case 'CLEAR_ALL_SECTION_PLANES':
      return { ...state, sectionPlanesList: [] };
    case 'SET_OPEN_DROPDOWN':
      return { ...state, openDropdown: action.payload };
    case 'HIGHLIGHT_ITEM':
      return { ...state, highlightedItemId: action.payload };
    case 'TOGGLE_HIGHLIGHT':
      return {
        ...state,
        highlightedItemId: state.highlightedItemId === action.payload ? null : action.payload,
      };
    default:
      return state;
  }
}

interface ViewerContextType {
  state: ViewerState;
  dispatch: React.Dispatch<ViewerAction>;
}

const ViewerContext = createContext<ViewerContextType | undefined>(undefined);

export const ViewerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(viewerReducer, initialState);
  return <ViewerContext.Provider value={{ state, dispatch }}>{children}</ViewerContext.Provider>;
};

export const useViewer = () => {
  const context = useContext(ViewerContext);
  if (!context) throw new Error('useViewer must be used within ViewerProvider');
  return context;
};

// Side-effect helper
export const toggleHighlightEntity = (viewer: Viewer | null, entityId: string) => {
  if (!viewer) return;
  const obj = viewer.scene.objects?.[entityId];
  if (!obj) return;
  const newStatus = !obj.highlighted;
  viewer.scene.setObjectsHighlighted([entityId], newStatus);
  obj.highlighted = newStatus;
};
