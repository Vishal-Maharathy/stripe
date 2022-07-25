import { Controller, Get, Res, Render, Req, Post } from '@nestjs/common';
import { Response, Request } from 'express'

var stripeKey = 'YOUR STRIPE API KEY';
var successURL = 'http://localhost:3000';
const stripe = require('stripe')(stripeKey);


// const storeItems = new Map([
//   [1, { price: 200, name: "test1"}]
// ])
@Controller()
export class AppController {
  @Get('/')
  getHello(@Res() res: Response) {
    return res.render('main');
  }
  @Post('/create-checkout-session')
  async checkOut(@Req() req: Request, @Res() res: Response) {
    try {
      const session = await stripe.checkout.sessions.create({
        success_url:`${successURL}/success.html`,
        cancel_url:`${successURL}/cancel.html`,
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        line_items: [
          {
            // below is the price ID which needs to be setup on stripe
            price: 'price_1LP7EGSFmOc3pRNdvN2R48qL',
            quantity: 1    
          },
        ],
        mode: 'subscription',
      })
      res.json({ url: session.url })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

