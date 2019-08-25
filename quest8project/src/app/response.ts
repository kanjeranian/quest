export interface Response<T = any> {
  status: number;
  data?: T;
  error?: string;
}
