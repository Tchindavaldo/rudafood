export function showCard(elementId: string, axis: 'x' | 'y' = 'y', translateValue: string = '0%', transitionDuration: number = 500) {
  const element = document.getElementById(elementId);
  if (element) {
    console.log('element trouvé', elementId);
    element.style.transition = `transform ${transitionDuration}ms`;
    const transform = axis === 'x' ? `translateX(${translateValue})` : `translateY(${translateValue})`;
    element.style.transform = transform;
    console.log('element trouvé', elementId, transform);
  } else {
    console.log('element non trouvé', elementId);
  }
}

export function showCardTranslateY(id: string, value: string) {
  const element = document.getElementById(id);
  {
    console.log('recu', value);

    if (element) element.style.bottom = `${value}`;
    // console.log('click effectuer', element, id, value);
  }
}

export function toggleElementVisibility(id: string, show: boolean) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = show ? 'block' : 'none';
  }
}
