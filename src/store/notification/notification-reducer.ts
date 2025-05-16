import { createAction, createReducer, on, props } from '@ngrx/store';

/* --- State initial --- */
const initialNotificationState = {
  Notification: null as any[] | null,
};

/* --- Actions --- */
export const addNotificationReducer = createAction('[Notification] Add', props<{ Notification: any }>());

export const setNotificationReducer = createAction('[Notification] Set', props<{ NotificationTab: any[] | null }>());

export const markNotificationAsReadReducer = createAction('[Notification] Mark As Read', props<{ notificationId: any; notificationCreatedAt: any; userId: any }>());

/* --- Reducer --- */
export const NotificationReducer = createReducer(
  initialNotificationState,

  on(setNotificationReducer, (state, { NotificationTab }) => ({
    Notification: NotificationTab,
  })),

  on(addNotificationReducer, (state, { Notification }) => ({
    Notification: state.Notification ? [Notification, ...state.Notification] : [Notification],
  })),

  on(markNotificationAsReadReducer, (state, { notificationId, notificationCreatedAt, userId }) => {
    if (!state.Notification) return { Notification: [] };

    const updatedNotifications = state.Notification.map(notif => {
      if (notif.id === notificationId && notif.createdAt === notificationCreatedAt) {
        const isReadArray = Array.isArray(notif.isRead) ? notif.isRead : [];
        if (!isReadArray.includes(userId)) {
          return {
            ...notif,
            isRead: [...isReadArray, userId],
          };
        }
      }
      return notif;
    });

    return {
      Notification: updatedNotifications,
    };
  })
);
