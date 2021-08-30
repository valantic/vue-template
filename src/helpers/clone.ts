/**
 * Creates a deep clone of the given value.
 */
export default function(value: any): any {
  return JSON.parse(JSON.stringify(value));
}
