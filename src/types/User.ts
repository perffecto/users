export type User = {
    id: number;
    firstName: string;
    secondName: string;
    email: string;
    lastVisitedAt: number;
};

export type AddUserPayload = Omit<User, 'id'>;

export type UpdateUserPayload = Partial<AddUserPayload> & Pick<User, 'id'>;

export type UserDTO = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    lastVisitedAt: number;
};

export function toUserModel(userDTO: UserDTO): User {
    const { lastName: secondName, ...fields } = userDTO;
    return { ...fields, secondName };
}
