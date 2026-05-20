/**
 * Resolves a Mongo doctor id for URLs from API-shaped objects.
 */
export function resolveDoctorId(doctor) {
  const raw = doctor?._id ?? doctor?.id;

  if (raw == null) {
    return "";
  }

  if (typeof raw === "string") {
    return raw.trim();
  }

  if (
    typeof raw === "object" &&
    typeof raw.$oid === "string"
  ) {
    return raw.$oid.trim();
  }

  const asString = String(raw).trim();

  if (asString === "[object Object]") {
    return "";
  }

  return asString;
}
