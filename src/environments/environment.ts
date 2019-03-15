// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'http://recycling.3po-dwm.com:8888',
  api: 'http://recycling.3po-dwm.com:8888/api',
  wechatApi: 'http://recycling.3po-dwm.com:5555/api',
  // 高德 api key
  amapKey: '234f52ac0db9acffc06680a652bc86dc'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
