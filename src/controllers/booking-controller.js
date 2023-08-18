const {BookingService}=require('../services/index');
const {StatusCodes}=require('http-status-code')

const bookingService=new BookingService();
const {createChannel,publishMessage}=require('../utils/messageQueue');
const {REMINDER_BINDING_KEY}=require('../config/server-config')
class BookingController{
    constructor(){
        
    }
    async sendMessageToQueue(req,res){
        const channel=await createChannel();
        const data={message : 'SUCCESS'};
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
        return res.status(200).json({
            message:'successfully publish the message'
        })
    }
    async create (req,res){
        try {
            const response=await bookingService.createBooking(req.body);
           
           
            return res.status(201).json({
                message:'successfully completed booking',
                data:response,
                error:{},
                success:true
            })
        } catch (error) {
            console.log(error);
         
            return res.status(error.statusCode).json({
                message:error.message,
                data:{},
                success:true,
                error:error.explanation
            })
        }
    
}
}

module.exports=BookingController;