/**
 * Formats values in USD.
 * Whole amounts keep no decimals ("$23"), the rest keeps two ("$14.90"),
 * exactly like the reference funnel does.
 */
export function usd(value: number): string {
  const casas = Number.isInteger(value) ? 0 : 2;
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}
