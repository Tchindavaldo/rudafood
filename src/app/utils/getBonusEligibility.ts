export function getBonusEligibility(
  commandes: number,
  palier: number
): {
  eligible: boolean;
  restant: number;
  totalBonus: number;
} {
  const restant = palier - (commandes % palier);
  const eligible = commandes % palier === 0 && commandes > 0;
  const totalBonus = Math.floor(commandes / palier);

  return {
    eligible,
    restant: eligible ? 0 : restant,
    totalBonus,
  };
}
