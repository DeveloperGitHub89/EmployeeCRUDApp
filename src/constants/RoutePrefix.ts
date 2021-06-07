export class RoutePrefix {
    static readonly ROUTE_PREFIX: string = "/api/";
    static readonly EMPLOYEE_ROUTE_PREFIX: string = RoutePrefix.ROUTE_PREFIX+"employees";
    static readonly ADMIN_ROUTE_PREFIX: string = RoutePrefix.ROUTE_PREFIX + "admins";
    static readonly MANAGER_ROUTE_PREFIX: string = RoutePrefix.ROUTE_PREFIX + "managers";
    static readonly DEPARTMENT_ROUTE_PREFIX: string = RoutePrefix.ROUTE_PREFIX+"departments";
}