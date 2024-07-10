import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log("test");
  return next(req);
};
// https://api.entur.io/customers/v2
