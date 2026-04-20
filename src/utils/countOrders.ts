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

  // On va utiliser UTC/local safety en extraisant YYYY-MM-DD ou en setHours
  // Mais vue la possible erreur JS avec les Fuseaux horaire on préfère year/month/date de la date courante.
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth();
  const dateDay = date.getDate();

  let undefinedCount = 0;
  const filteredOrders = orders.filter(order => {
    if (status === 'pending' && (order.status === 'pending' || order.status === 'pendingToBuy')) {
      // autoriser pending et pendingToBuy pour le statut pending
    } else if (status === 'processing' && (order.status === 'processing' || order.status === 'active' || order.status === 'in_progress')) {
      // autoriser les stats active/processing
    } else if (status === 'finished' && (order.status === 'finished' || order.status === 'completed' || order.status === 'done')) {
      // autoriser les stats termine
    } else if (order.status !== status) {
      return false;
    }

    const deliveryDate = new Date(order?.delivery?.date);
    if (order?.delivery?.date === undefined) {
      undefinedCount++;
      // console.log(`Commande sans date de livraison (total: ${undefinedCount}) - ID:`, order.id, order);
      return false;
    }
    deliveryDate.setHours(0, 0, 0, 0);
    // if (!order.userReceptionDate) return false;

    // Log la date de livraison uniquement si elle est définie et <= à aujourd'hui
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Comparaison fiable des composants de la date
    let delYear, delMonth, delDay;

    // Si la date vient sous forme de string (ex: "2026-02-23")
    if (typeof order.delivery.date === 'string') {
      const parts = order.delivery.date.split('T')[0].split('-');
      if (parts.length === 3) {
        delYear = parseInt(parts[0], 10);
        delMonth = parseInt(parts[1], 10) - 1; // les mois en js sont 0-indexés
        delDay = parseInt(parts[2], 10);

        return delYear === dateYear && delMonth === dateMonth && delDay === dateDay;
      }
    }

    // Fallback à new Date
    const deliveryDateObj = new Date(order.delivery.date);
    return deliveryDateObj.getFullYear() === dateYear && deliveryDateObj.getMonth() === dateMonth && deliveryDateObj.getDate() === dateDay;
  });

  // Calculer le montant total
  const totalAmount = filteredOrders.reduce((total, order) => {
    // Vérifier si order.amount existe et est un nombre
    const amount = order.total ? parseFloat(order.total) : (order.prixTotal ? parseFloat(order.prixTotal) : 0);
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
