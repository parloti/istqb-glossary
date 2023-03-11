import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
} from '@angular/router';

export class CustomReuseStrategy extends BaseRouteReuseStrategy {
  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return super.shouldDetach(route);
  }
  override store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle
  ): void {
    return super.store(route, handle);
  }
  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return super.shouldAttach(route);
  }
  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return super.retrieve(route);
  }
  override shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return false;
  }
}
