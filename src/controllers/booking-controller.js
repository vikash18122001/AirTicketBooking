const {BookingService}=require('../services/index');
const {StatusCodes}=require('http-status-code')

const bookingService=new BookingService();
const create=async (req,res)=>{
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
module.exports={
    create
}