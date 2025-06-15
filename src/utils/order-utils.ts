import { formatDate } from '@angular/common';

// Fonction de tri des commandes par champ
export function sortByField(orders: any, field: string = 'rank', order: 'asc' | 'desc' = 'desc'): any[] {
  if (!orders || !Array.isArray(orders)) return [];

  const multiplier = order === 'asc' ? 1 : -1;

  const sorted = [...orders].sort((a: any, b: any) => {
    const valueA = a[field];
    const valueB = b[field];

    if (valueA < valueB) return -1 * multiplier;
    if (valueA > valueB) return 1 * multiplier;
    return 0;
  });

  // Créer un tableau avec uniquement les rangs triés
  const ranks = sorted.map(order => order[field]);
  // console.log(`Tri par ${field} (${order}):`, ranks);

  return sorted;
}

export interface OrderGroupByDate {
  noDelivery: Record<string, any[]>;
  deliveryExpress: Record<string, any[]>;
  deliveryTime: Record<string, Record<string, any[]>>;
}

export const formatDateCreated = (createdAt: string | Date): string => {
  return formatDate(createdAt, 'yyyy-MM-dd', 'fr-FR');
};

export const getUniqueDates = (orders: any[]): string[] => {
  // console.log('order getttt uniiiiiqqq  ddddaaattteee ', orders);

  const dates = orders.map(order => formatDateCreated(order.delivery.date));
  // console.log('order getttt uniiiiiqqq  ddddaaattteee ', dates);
  return Array.from(new Set(dates)).sort();
};

export const getOrdersByDate = (orders: any[], date: string): any[] => {
  return orders.filter(order => formatDateCreated(order.delivery.date) === date);
};

export const getUserIdsByDateType = (orders: any[], status: boolean, date: string, type?: string, time?: string): string[] => {
  // if (type == 'time') console.log(`date ${date} `);
  const users = getOrdersByDate(orders, date)
    .filter(order => {
      if (!status) {
        return order.delivery?.status === false;
      }

      const matchType = order.delivery?.type === type;
      const matchStatus = order.delivery?.status === true;
      const matchTime = time ? order.delivery?.time === time : true;

      // Log pour les commandes dont le temps ne correspond pas lorsque le type est 'time'
      // if (type === 'time' && time && order.delivery?.time === time) {
      //   console.log(`Commande ${order.id} userId ${order.userId} - Temps ne correspond pas: ${order.delivery?.time} (attendu: ${time})`);
      // }

      // if (type === 'express') {
      //   console.log(`date ${date} `);
      //   console.log(`Commande ${order.id} userId ${order.userId} `);
      // }

      return matchType && matchStatus && matchTime;
    })
    .map(order => order.userId);

  return Array.from(new Set(users));
};

export const getOrdersByDateAndUserDelivery = (orders: any[], date: string, userId: string, status: boolean, type?: string, time?: string): any[] => {
  return getOrdersByDate(orders, date).filter(order => {
    if (order.userId !== userId || order.delivery?.status !== status) {
      return false;
    }

    if (status === false) {
      return true;
    }

    if (type === 'express') {
      return order.delivery?.type === 'express';
    } else if (type === 'time') {
      const timeMatch = time ? order.delivery?.time === time : true;
      return order.delivery?.type === 'time' && timeMatch;
    }

    if (type === order.delivery?.type) {
      return true;
    }

    return false;
  });
};

export const getTotalOrdersByTypeTime = (orders: any[], date: string, times: string[]): number => {
  let total = 0;

  for (const time of times) {
    const userIds = getUserIdsByDateType(orders, true, date, 'time', time);
    for (const userId of userIds) {
      total += getOrdersByDateAndUserDelivery(orders, date, userId, true, 'time', time).length;
    }
  }

  return total;
};

export const getTotalOrdersByTypeExpress = (orders: any[], date: string): number => {
  let total = 0;
  const userIds = getUserIdsByDateType(orders, true, date, 'express');

  for (const userId of userIds) {
    total += getOrdersByDateAndUserDelivery(orders, date, userId, true, 'express').length;
  }

  return total;
};

export const getTotalOrdersByStatus = (orders: any[], date: string, status: boolean): number => {
  let total = 0;
  const userIds = getUserIdsByDateType(orders, status, date);
  for (const userId of userIds) {
    total += getOrdersByDateAndUserDelivery(orders, date, userId, status).length;
  }
  return total;
};
