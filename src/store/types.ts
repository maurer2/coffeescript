export type StoreType = {
  state: {
    userId: string;
    zoomLevel: number;
    orders: {
      [orderDate: string]: Order[];
    };
  };
  modules: any;
  mutations: any;
  actions: any;
  [key: string]: any;
};

export type StateType = StoreType['state'];

export enum MutationsType {
  UPDATE_ZOOM = 'UPDATE_ZOOM',
  ADD_DAILY_ORDER = 'ADD_DAILY_ORDER',
}

export enum ActionsType {
  INCREASE_ZOOM = 'INCREASE_ZOOM',
  DECREASE_ZOOM = 'DECREASE_ZOOM',
  RESET_ZOOM = 'RESET_ZOOM',
  ADD_ORDER = 'ADD_ORDER',
}
