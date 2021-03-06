// import { DrinkType } from './store/types';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

interface Order {
  id: string;
  name: string;
  dateTime: Date;
  tz: string;
}

interface MenuItem {
  id: string;
  name: string;
  // type: DrinkType;
  type: string;
}

type Maybe<Type> = Type | undefined;
