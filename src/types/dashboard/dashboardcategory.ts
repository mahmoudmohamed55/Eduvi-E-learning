export type TDashboardCategory = {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
};

export type TCategoryFormValues = {
  name: string;
  slug: string;
  image: string;
  description: string;
};

export type TCategoryPayload = Omit<
  TDashboardCategory,
  "id" | "created_at"
>;