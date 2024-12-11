export type OwnerState = {
  owner: null;
};

export interface APIResponseError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}
