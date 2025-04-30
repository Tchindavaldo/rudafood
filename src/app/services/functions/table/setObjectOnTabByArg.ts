export function setObjectOnTabByArg<T>(tab: T[] | null, newObject: T, key: keyof T, value: any, onTop = false): T[] | null {
  console.log('Received tab:', tab); // Affiche le tableau d'entrée
  console.log('Received newObject:', newObject); // Affiche l'objet à insérer
  console.log('Received key:', key); // Affiche la clé à utiliser pour la comparaison
  console.log('Received value:', value); // Affiche la valeur à comparer

  // const updatedTab = tab?.map(item => (item[key] === value ? newObject : item)); // Applique la modification

  if (onTop) {
    const filteredTab = (tab || []).filter(item => item[key] !== value);
    return [newObject, ...filteredTab];
  }

  const updatedTab = (tab || []).map(item => (item[key] === value ? newObject : item));
  console.log('Updated tab:', updatedTab);
  return updatedTab;
}
