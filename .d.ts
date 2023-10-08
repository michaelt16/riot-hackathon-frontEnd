// typings.d.ts
declare module "*.mp4" {
    const src: string;
    export default src;
  }
  declare module "*.json" {
    const value: any;
    export default value;
  }
  
  declare module "json!*" {
    let json: any;
    export default json;
  }