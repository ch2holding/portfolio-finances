export const getObjectValue = (
  obj: Record<string, unknown>,
  key: string,
): unknown => {
  const keys = key.split(".");
  const data = obj[keys[0]] ?? "";
  keys.shift();

  if (keys.length > 0) {
    return getObjectValue(
      (typeof data === "object" && data !== null ? data : {}) as Record<
        string,
        unknown
      >,
      keys.join("."),
    );
  }
  return data;
};
