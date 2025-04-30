export function showCard(bottomCard: string) {
  const element = document.getElementById(bottomCard);
  {
    if (element) element.style.transform = 'translateY(0%)';
    // console.log('click effectuer', element, bottomCard);
  }
}
