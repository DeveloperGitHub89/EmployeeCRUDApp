import { Router } from "express";

export abstract class CommonRoute{
    private static router: Router;
    private static controller: any;
    static getCommonRoutes(router: Router, controller: any) {
        CommonRoute.router = router;
        CommonRoute.controller = controller;
        CommonRoute.router.get('/', CommonRoute.controller.findAll);
        CommonRoute.router.get('/page/:pageNo/limit/:limit', CommonRoute.controller.find)
        CommonRoute.router.get('/:id', CommonRoute.controller.findById);
        CommonRoute.router.delete('/:id', CommonRoute.controller.deleteById);
        CommonRoute.router.post('/', CommonRoute.controller.save);
    }
}