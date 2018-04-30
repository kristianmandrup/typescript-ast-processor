/**
 * Get the enum key for an enum value in an enum structure
 * TODO: cache keys for next lookup in same enum?
 * @param enumRef
 * @param enumValue
 */
export function enumKey(enumRef: any, enumValue: any) {
  for (var enumMember in enumRef) {
    if (enumRef[enumMember] == enumValue) return enumMember
  }
  return undefined
}
