export type User = {
  display_name: string;
  images: Array<{ url: string }>;
};

export type AuthUser = User & { token: string };
