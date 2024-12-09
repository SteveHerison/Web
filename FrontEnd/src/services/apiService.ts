// apiService.ts
export interface Response {
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  error: boolean;
  message?: string;
}
