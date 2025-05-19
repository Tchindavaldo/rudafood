export interface OrderCountResult {
  count: number;
  totalAmount: number;
  filteredOrders: any[];
}

export function countOrders(orders: any[], dateParam?: Date, status = 'pending'): OrderCountResult {
  if (!orders) return { count: 0, totalAmount: 0, filteredOrders: [] };

  const date = dateParam || new Date();
  date.setHours(0, 0, 0, 0); // on compare uniquement les dates, pas les heures

  const filteredOrders = orders.filter(order => {
    // if (!order.userReceptionDate) return false;

    const receptionDate = new Date(order.userReceptionDate);
    receptionDate.setHours(0, 0, 0, 0);

    const isPending = order.status === status;

    if (!isPending) return false;

    // ✅ Cas 1 : si la date est future, on ne garde que les commandes de cette date précise
    // if (receptionDate.getTime() > date.getTime()) {
    //   return receptionDate.getTime() === date.getTime();
    // }

    // // ✅ Cas 2 : si la date est aujourd’hui ou passée
    // return receptionDate.getTime() <= date.getTime();
    return true;
  });

  // Calculer le montant total
  const totalAmount = filteredOrders.reduce((total, order) => {
    // Vérifier si order.amount existe et est un nombre
    const amount = order.total ? parseFloat(order.total) : 0;
    return total + amount;
  }, 0);

  return {
    count: filteredOrders.length,
    totalAmount: totalAmount,
    filteredOrders: filteredOrders,
  };
}
