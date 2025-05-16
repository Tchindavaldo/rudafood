export function markNotifcationAsRead(notifications: any[], notificationId: any, notificationCreatedAt: any, userId: any): any[] {
  // console.log('🔍 Début de markNotifcationAsRead');
  // console.log('📥 Params reçus :', {
  //   notificationId,
  //   notificationCreatedAt,
  //   userId,
  // });

  // Création d'un nouveau tableau, avec copie superficielle des notifications
  const newNotifications = notifications.map(notification => {
    if (notification.id !== notificationId) {
      // Pas la notification cible, on garde l'objet original
      return notification;
    }

    // console.log('✅ Notification trouvée :', notification.id);

    // Copie superficielle de la notification cible
    const newNotifList = (notification.allNotif || []).map((notif: any) => {
      if (notif.createdAt !== notificationCreatedAt) {
        // Pas la notif cible, on garde l'objet original
        return notif;
      }

      // console.log('✅ Notification cible trouvée dans allNotif');

      // Copie superficielle de la notif ciblée
      const newIsRead = Array.isArray(notif.isRead) ? [...notif.isRead] : [];

      if (!newIsRead.includes(userId)) {
        // console.log(`➕ Ajout de l'utilisateur ${userId} à isRead`);
        newIsRead.push(userId);
      } else {
        // console.log(`ℹ️ L'utilisateur ${userId} est déjà dans isRead`);
      }

      return {
        ...notif,
        isRead: newIsRead,
      };
    });

    return {
      ...notification,
      allNotif: newNotifList,
    };
  });

  // console.log('📦 État final des notifications:', newNotifications);
  return newNotifications;
}
