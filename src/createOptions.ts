export function createOptions(
  method: string,
  user: string,
  period?: string,
  limit?: string,
  page?: string,
) {
  return {
    method,
    page,
    user,
    period,
    limit,
  };
}
