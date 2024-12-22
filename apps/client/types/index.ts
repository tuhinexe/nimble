export type OwnerState = {
  owner: Owner | null;
};

export interface APIResponseError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export type Owner = {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  updatedAt: string;
};
