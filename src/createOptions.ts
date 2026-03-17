export function createOptions(
  method: string,
  user: string,
  period?: string,
  limit?: string,
  page?: string,
  from?: string,
) {
  return {
    method,
    page,
    user,
    period,
    limit,
    from,
  };
}
