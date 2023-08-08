const {StatusCodes}=require('http-status-code');
const {Booking}=require('../models/index');
const {AppErrors,ValidationErrors}=require('../utils/errors/index');

class BookingRepository{
        async create(data){
            try {
                const booking=await Booking.create(data);
                return booking;
                
            } catch (error) {
                if(error.name =='SequelizeValidationError'){
                    throw new ValidationErrors(error);
                }
                throw new AppErrors(
                    'RepositoryError',
                    'Cannot create Booking',
                    'there was something issue creating the booking ,please try again later',
                    StatusCodes.INTERNAL_SERVER_ERROR
                )
            }
        }
        async update(bookingId,data){
            try {
                await Booking.update(data,{
                    where:{
                        id:bookingId
                    }
                })
                return true;
            } catch (error) {
                throw new AppErrors(
                    'RepositoryError',
                    'Cannot update Booking',
                    'there was something issue updating the booking ,please try again later',
                    StatusCodes.INTERNAL_SERVER_ERROR
                )
            }
        }
}
module.exports=BookingRepository;