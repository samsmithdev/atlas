export type ActionResponse<T = void> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
};

export type ActionState = {
  message: string;
  status: "success" | "error" | "idle";
  errors?: {
    name?: string[];
    shortcode?: string[];
    description?: string[];
  };
};
