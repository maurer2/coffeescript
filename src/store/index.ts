import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';

import menuList from '../data/menuList.json';

import { StoreType, StateType } from './types';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const dateTimeOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', dateTimeOptions);

const defaultStore: StoreType = {
  namespaced: true,
  state: {
    userId: 'ABC123456789',
    zoomLevel: 1.0,
    currentDateTime: new Date(),
    dateTimeFormatter,
    orders: {},
    maxDailyOrders: 5,
    menuList,
    blockingDuration: 1,
    blockingTimeoutEnd: null,
    refreshTimeoutInSeconds: 10,
  },
  modules: {},
  mutations,
  actions,
  getters,
};

const store = createStore(defaultStore);

export const key: InjectionKey<Store<StateType>> = Symbol('storeKey');

export default store;

export function useStore() {
  return baseUseStore(key);
}
