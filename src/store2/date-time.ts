/* eslint-disable import/prefer-default-export */
import { defineStore } from 'pinia'

import {
  getTimeFormatted,
  getDateFormatted,
  getCurrentDateISO,
} from '../util/dateUtil';

export const useDateTimeStore = defineStore('dateTime', {
  state: () => ({
    currentDateTime: new Date(),
    dateTimeFormatter: new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
    blockingDuration: 1,
    blockingTimeoutEnd: null,
    refreshTimeoutInSeconds: 10,
  }),
  getters: {
    getCurrentDateKey: (state): string => {
      const { currentDateTime, dateTimeFormatter } = state;

      const isoString = getCurrentDateISO(dateTimeFormatter, currentDateTime);

      return isoString;
    },
    getCurrentDate: (state) => {
      const { currentDateTime, dateTimeFormatter } = state;

      const dateFormatted = getDateFormatted(dateTimeFormatter, currentDateTime);

      return dateFormatted;
    },
    getCurrentTime: (state) => {
      const { currentDateTime, dateTimeFormatter } = state;

      const timeFormatted = getTimeFormatted(dateTimeFormatter, currentDateTime);

      return timeFormatted;
    },
    isBlocked: (state) => {
      const { blockingTimeoutEnd, currentDateTime } = state;

      if (!blockingTimeoutEnd) {
        return false;
      }

      const differenceInMS =
        blockingTimeoutEnd.getTime() - currentDateTime.getTime();

      return Math.sign(differenceInMS) === 1;
    },
    getRemainingBlockingTime: (state) => {
      const { blockingTimeoutEnd, currentDateTime } = state;

      if (!blockingTimeoutEnd) {
        return 0;
      }

      const differenceInMS =
        blockingTimeoutEnd.getTime() - currentDateTime.getTime();

      return Math.sign(differenceInMS) === 1 ? differenceInMS : 0;
    },
  },
  actions: {},
})
