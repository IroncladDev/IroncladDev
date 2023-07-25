import { ObjectAny } from "application/types";

// Inputs & Outputs for the different hooks
export interface QueryInput {
  query: string;
  variables?: ObjectAny;
  onComplete?: (data?: GraphRes) => void;
  onError?: (e?: Error) => void;
  hold?: boolean;
}
export interface QueryOutput {
  data: ObjectAny | null;
  loading: boolean;
  error: string | null;
  refetch: (vars?: ObjectAny) => void;
}

export interface GraphRes {
  // Response from GraphQL
  data?: ObjectAny;
  errors?: ObjectAny;
}

export interface GraphInput {
  // GraphQL variable + query input
  query: string;
  variables?: ObjectAny;
}
