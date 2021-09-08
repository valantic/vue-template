/**
 * Creates a deep clone of the given value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function(value: any): any {
  return JSON.parse(JSON.stringify(value));
}
