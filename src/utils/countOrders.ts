export interface OrderCountResult {
  count: number;
  totalAmount: number;
  filteredOrders: any[];
}

export function countOrders(orders: any[], dateParam?: Date, status = 'pending'): OrderCountResult {
  if (!orders) {
    console.log('countOrders - Aucune commande fournie');
    return { count: 0, totalAmount: 0, filteredOrders: [] };
  }

  const date = dateParam;
  if (!date) {
    console.log('countOrders - Aucune date fournie');
    return { count: 0, totalAmount: 0, filteredOrders: [] };
  } else {
    // console.log('apppeler avec la date', date);
  }

  date.setHours(0, 0, 0, 0); // on compare uniquement les dates, pas les heures

  let undefinedCount = 0;
  const filteredOrders = orders.filter(order => {
    if (order.status !== status) return false;

    const deliveryDate = new Date(order?.delivery?.date);
    if (order?.delivery?.date === undefined) {
      undefinedCount++;
      console.log(`Commande sans date de livraison (total: ${undefinedCount}) - ID:`, order.id, order);
      return false;
    }
    deliveryDate.setHours(0, 0, 0, 0);
    // if (!order.userReceptionDate) return false;

    // Log la date de livraison uniquement si elle est définie et <= à aujourd'hui
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (order?.delivery?.date) {
      const deliveryDate = new Date(order.delivery.date);
      deliveryDate.setHours(0, 0, 0, 0);

      // if (deliveryDate <= today) {
      //   console.log('Delivery date (past or today):', order.delivery.date, 'for order:', order.id || order._id);
      // } else {
      //   // console.log('Delivery date (future):', order.delivery.date, 'for order:', order.id || order._id);
      // }
    }

    if (today.getTime() > date.getTime() || today.getTime() < date.getTime()) {
      return deliveryDate.getTime() === date.getTime();
    }
    return deliveryDate.getTime() <= date.getTime();
  });

  // Calculer le montant total
  const totalAmount = filteredOrders.reduce((total, order) => {
    // Vérifier si order.amount existe et est un nombre
    const amount = order.total ? parseFloat(order.total) : 0;
    return total + amount;
  }, 0);

  // if (undefinedCount > 0) {
  //   console.log(`⚠️ ${undefinedCount} commande(s) sans date de livraison ont été ignorées`);
  // }
  // console.log(`✅ ${filteredOrders.length} commande(s) valides filtrées pour le statut: ${status}`, filteredOrders);

  return {
    count: filteredOrders.length,
    totalAmount: totalAmount,
    filteredOrders: filteredOrders,
  };
}
