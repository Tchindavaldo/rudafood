export function filterByArg(items: any, arg: any, value: any) {
  console.log('oreer recu', items);

  return items.filter((item: any) => item[arg] === value);
}

export function filterByArgs(items: any[], arg: string, values: string[]) {
  return items.filter((item: any) => values.includes(item[arg]));
}
