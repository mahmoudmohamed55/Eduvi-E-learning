export type TUser = {
  id: string;
  aud: string;
  role: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  confirmed_at: string | null;
  email_confirmed_at: string | null;
  last_sign_in_at: string | null;
  is_anonymous: boolean;

  app_metadata: {
    provider: string;
    providers: string[];
  };

  user_metadata: {
    email: string;
    email_verified: boolean;
    name: string;
    phone_verified: boolean;
    sub: string;
  };

  identities: unknown[];
};

export type TAuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  expires_in: number;
  token_type: string;
  user: TUser;
};