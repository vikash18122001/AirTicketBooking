const {BookingRepository}=require('../repository/index');
const axios=require('axios');
const {FLIGHT_SERVICE_PATH}=require('../config/server-config');
const {ServiceErrors}=require('../utils/errors/index')

class BookingService{
    constructor(){
        this.bookingRepository=new BookingRepository();
    }
    async createBooking(data){
        try {
            const flightId=data.flightId;
            const getFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            const flight=await axios.get(getFlightRequestUrl);
            const flightData=flight.data.data;
            const piceOfFlight=flightData.price;
            if(data.noOfSeats>flightData.totalSeats){
                throw new ServiceErrors(
                    'something went wrong in service layer',
                    'insufficient seat'
                )
            }
            const totalCost=piceOfFlight*data.noOfSeats;
            const bookingPayload={...data,totalCost};
            const booking=await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flight/${booking.flightId}`;
           
            await axios.patch(updateFlightRequestUrl,{totalSeats:flightData.totalSeats - booking.noOfSeats});
            
            const finalBooking=await this.bookingRepository.update(bookingId,{status:'Booked'});
            return finalBooking;

            
        } catch (error) {
            if(error.name=='ValidationError'|| error.name=='RepositoryError')throw error; 
            throw new ServiceErrors(error);
        }
    }
}
module.exports=BookingService