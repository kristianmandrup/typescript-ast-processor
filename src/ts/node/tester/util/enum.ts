// TODO: cache keys for next lookup in same enum?
export function enumKey(enumRef: any, enumValue: any) {
  for (var enumMember in enumRef) {
    if (enumRef[enumMember] == enumValue) return enumMember
  }
  return undefined
}
