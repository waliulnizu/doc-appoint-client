/** Profile photo from Better Auth user (Google uses `picture` in OAuth profile). */
export function getUserImage(user) {
  if (!user) return null;

  const url = user.image || user.picture;

  return typeof url === "string" && url.trim() !== ""
    ? url.trim()
    : null;
}

export function getProfileFormValues(user) {
  return {
    name: user?.name ?? "",
    image: getUserImage(user) ?? "",
  };
}

export function getAvatarFallback(name, email) {
  const label = encodeURIComponent(
    name || email?.split("@")[0] || "User"
  );

  return `https://ui-avatars.com/api/?name=${label}&background=2563eb&color=fff`;
}
