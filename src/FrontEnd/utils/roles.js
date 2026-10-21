export const ROLES = {
    ADMIN: 10,
    SUPER_ADMIN: 69,
};

export function isAdmin(user) {
    return !!user && (user.role === ROLES.ADMIN || user.role === ROLES.SUPER_ADMIN);
}
