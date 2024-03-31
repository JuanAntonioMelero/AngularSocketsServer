import {Router,Request, Response} from 'express';

const router = Router();

router.get('/mensajes',(req:Request, resp:Response)=>{
    resp.json({
        ok:true,
        mensaje:'Todo esta bien'
    })
})

router.post('/mensajes', ( req: Request, res: Response  ) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    res.json({
        ok: true,
        cuerpo,
        de
    });

});

export default router;


