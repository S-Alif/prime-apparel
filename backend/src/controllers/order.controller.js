import controllerHandler from "../helpers/controller.helper.js"
import orderService from "../services/order.service.js"

const orderController = {
    create: controllerHandler(orderService.create),
    update: controllerHandler(orderService.update),
    remove: controllerHandler(orderService.remove),
    getAllOrder: controllerHandler(orderService.getAllOrder),
    getOrderById: controllerHandler(orderService.getOrderById),
    getOrderByUser: controllerHandler(orderService.getOrderByUser)
}

export default orderController