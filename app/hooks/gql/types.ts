import { ObjectAny } from "app/types";

// Inputs & Outputs for the different hooks
export interface QueryInput {
  query: string;
  variables?: ObjectAny;
  onComplete?: (data?: GraphRes) => void;
  onError?: (e?: Error) => void;
  hold?: boolean;
}
export interface QueryOutput {
  data: ObjectAny;
  loading: boolean;
  error: string;
  refetch: (vars?: ObjectAny) => void;
}

export interface MutationInput {
  query: string;
  variables?: ObjectAny;
  onComplete?: (data?: GraphRes) => void;
  onError?: (e?: Error) => void;
}

export type MutationOutput = [
  (v?: ObjectAny) => void,
  {
    data: ObjectAny;
    loading: boolean;
    error: string;
  }
];

export interface BulkInput {
  onComplete?: (data?: Array<GraphRes>) => void;
  onError?: (e?: Array<string>) => void;
  onProgress?: (o: {
    progress: number;
    data: Array<GraphRes>;
    input: Array<GraphInput>;
  }) => void;
}

export type BulkMutationOutput = [
  (operations: Array<GraphInput>) => void,
  { data?: ObjectAny; loading: boolean; error?: string }
];

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
