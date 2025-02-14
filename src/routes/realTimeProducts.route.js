import { Router } from 'express';

const routerRealTime = Router();

routerRealTime.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

export default routerRealTime;