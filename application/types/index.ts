export interface ObjectAny {
  [key: string]: any;
}

export type ObjectValueType = string | number | boolean | null | undefined;

export type ContentType = "kv" | "object" | "array";
export type KeyType = "string" | "number" | "date";

export enum AuthError {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Validity = "Validity",
  ThreshStrike = "ThreshStrike",
  Exists = "Exists",
  CantSend = "CantSend",
  Default = "Default",
}

export interface AuthenticatedUser {
  verified: boolean;
  discordId: string;
  email: string;
  discriminator: string;
  avatar?: string;
}
