const ADMIN_UID = String(
  import.meta.env.VITE_YKOS_ADMIN_UID || "WnKrb0wcY3dHpSJjdn9b2aAwTw02"
).trim();

export function isAdminUser(user) {
  return Boolean(user && user.uid === ADMIN_UID);
}
