import { Router } from "express";

export abstract class CommonRoute{
    private static router: Router;
    private static controller: any;
    static getCommonRoutes(router: Router, controller: any,authMiddleware: any) {
        CommonRoute.router = router;
        CommonRoute.controller = controller;
        CommonRoute.router.get('/',authMiddleware, CommonRoute.controller.findAll);
        CommonRoute.router.get('/page/:pageNo/limit/:limit', authMiddleware, CommonRoute.controller.find)
        CommonRoute.router.get('/:id', authMiddleware, CommonRoute.controller.findById);
        CommonRoute.router.delete('/:id', authMiddleware, CommonRoute.controller.deleteById);
        CommonRoute.router.post('/', authMiddleware, CommonRoute.controller.save);
    }
}