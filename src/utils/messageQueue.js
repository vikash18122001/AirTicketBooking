const amqplib=require('amqplib');
const {EXCHANGE_NAME,REMINDER_BINDING_KEY,MESSAGE_BROKER_URL}=require('../config/server-config')

const createChannel=async ()=>{
    try {
        const connection=await amqplib.connect(MESSAGE_BROKER_URL);
    const channel=await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME,'direct',false);
    return channel;
    } catch (error) {
        console.log(error);
        throw error;
    }
    

}
const subscribeChannel=async (channel,service,binding_key)=>{
    const applicationQueue=await channel.assertQueue('QUEUE_NAME');
    channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,binding_key);
    channel.consume(applicationQueue.queue,msg=>{
        console.log('received data');
        console.log(msg.content.toString());
        channel.ack(msg);

    })


}
const publishMessage=async (channel,binding_key,message)=>{
    try {
        await channel.assertQueue(QUEUE_NAME);
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message));
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports={
    subscribeChannel,
    createChannel,
    publishMessage
}