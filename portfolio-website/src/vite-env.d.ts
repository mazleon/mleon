/// <reference types="vite/client" />

// Declare FiX for use in Projects.tsx
declare module "react-icons/fi" {
  import { IconType } from "react-icons";

  export const FiX: IconType;
}

// Fix TypeScript error for Button's 'as' prop
declare global {
  interface ButtonProps {
    as?: React.ElementType;
  }
}
