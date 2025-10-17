import { apply as applyVisualEditing, setAttr } from "@directus/visual-editing";
import type { PrimaryKey } from "@directus/types";

interface ApplyOptions {
  directusUrl: string;
  elements?: HTMLElement[] | HTMLElement;
  onSaved?: (data: {
    collection?: string;
    item?: PrimaryKey | null;
    payload?: Record<string, any>;
  }) => void;
  customClass?: string;
}
export default function useVisualEditing() {
  // Use useState for state that persists across navigation
  const isVisualEditingEnabled = useState(
    "visual-editing-enabled",
    () => false
  );
  const route = useRoute();
  const {
    public: { enableVisualEditing, directusUrl },
  } = useRuntimeConfig();

  function isEmbeddedInDirectus(): boolean {
    console.log("isEmbeddedInDirectus", process.server);
    if (process.server) return false;
    try {
      console.log("isEmbeddedInDirectus", window.parent, window);
      const inIframe = window.parent !== window;
      if (!inIframe) return false;
      const parentOrigin = document.referrer
        ? new URL(document.referrer).origin
        : "";
      const directusOrigin = new URL(directusUrl).origin;
      return parentOrigin === directusOrigin;
    } catch {
      console.error("Error checking if embedded in Directus");

      return false;
    }
  }

  // Check query param on composable initialization.
  if (route.query["visual-editing"] === "true" && enableVisualEditing) {
    isVisualEditingEnabled.value = true;
  } else if (route.query["visual-editing"] === "false") {
    isVisualEditingEnabled.value = false;
  }

  const apply = (
    options: Pick<ApplyOptions, "elements" | "onSaved" | "customClass">
  ) => {
    if (!isVisualEditingEnabled.value) return;
    // Only initialize when embedded inside Directus to avoid postMessage origin mismatch
    /* 		
		
		if (!isEmbeddedInDirectus()) return;
		 */
    applyVisualEditing({
      ...options,
      directusUrl,
    });
  };

  return {
    isVisualEditingEnabled,
    apply,
    setAttr,
  };
}
