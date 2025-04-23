export function filterByArg(items: any, arg: any, value: any) {
  return items.filter((item: any) => item[arg] === value);
}
