declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

interface Order {
  name: string;
  dateTime: Date;
  tz: string;
}
