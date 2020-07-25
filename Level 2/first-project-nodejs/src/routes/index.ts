import {Router} from 'express';
import appointmentsRouter from './appointmets.routes'

const routes = Router();

routes.use('/appointments', appointmentsRouter)

export default routes;