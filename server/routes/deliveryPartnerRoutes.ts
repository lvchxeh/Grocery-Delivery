import express from "express"
import { updateLocation, updateDeliveryStatus, cancelDelivery, completeDelivery, getDeliveryDetail, loginPartner, getMyDeliveries } from "../controllers/deliveryPartnerController.js"
import deliveryAuth from "../middleware/deliveryAuth.js"


const deliveryPartnerRouter = express.Router()

deliveryPartnerRouter.post('/login', loginPartner)
deliveryPartnerRouter.get('/my-deliveries', getMyDeliveries)
deliveryPartnerRouter.get('/my-deliveries/:id', deliveryAuth, getDeliveryDetail)
deliveryPartnerRouter.put('/my-deliveries/:id', deliveryAuth, completeDelivery)
deliveryPartnerRouter.put('/my-deliveries/:id/cancel', deliveryAuth, cancelDelivery)
deliveryPartnerRouter.put('my-deliveries/:id/status', deliveryAuth, updateDeliveryStatus)
deliveryPartnerRouter.put('/my-deliveries/:id/location', deliveryAuth, updateLocation)

export default deliveryPartnerRouter