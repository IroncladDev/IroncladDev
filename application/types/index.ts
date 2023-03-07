export interface ObjectAny {
  [key: string]: any;
}

export type ObjectValueType = string | number | boolean | null | undefined;

export type ContentType = "kv" | "object" | "array";
export type KeyType = "string" | "number" | "date";

export enum RenderedComponent {
  Gallery = "Gallery",
}
