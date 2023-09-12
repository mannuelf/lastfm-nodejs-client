export function createOptions(
  method: string,
  user: string,
  period: string,
  limit: string) {
  return {
    method,
    user,
    period,
    limit,
  }
}