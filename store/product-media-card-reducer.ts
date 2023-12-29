export type ProductMediaState = {
  files: File[] | null;
  isLoading: boolean;
  previewUrls: string[];
};

export const initialState: ProductMediaState = {
  files: null,
  isLoading: false,
  previewUrls: [],
};

export type ProdutMediaAction =
  | { type: "SET_FILES"; payload: File[] }
  | { type: "APPEND_FILES"; payload: File[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PREVIEW_URLS"; payload: string[] }
  | { type: "APPEND_PREVIEW_URLS"; payload: string[] };

export function productMediaCardReducer(
  state: ProductMediaState,
  action: ProdutMediaAction,
): ProductMediaState {
  switch (action.type) {
    case "SET_FILES":
      return { ...state, files: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_PREVIEW_URLS":
      return { ...state, previewUrls: action.payload };
    case "APPEND_FILES":
      return { ...state, files: [...(state.files || []), ...action.payload] };
    case "APPEND_PREVIEW_URLS":
      return {
        ...state,
        previewUrls: [...state.previewUrls, ...action.payload],
      };
    default:
      return state;
  }
}
