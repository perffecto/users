import { User } from "@/domain/models/User";

export type CreateUserFields = Omit<User, 'id'>;
export type SortOrder = 'asc' | 'desc';
