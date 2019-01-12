var connection =  new require('./kafka/Connection');
//topics files
var signin = require('./services/signin.js');
var traveller_sign = require('./services/traveller_sign.js');
var owner_signup =require('./services/owner_signup');
var traveller_signup =require('./services/traveller_signup');
var post_property=require('./services/property_add')
var booking_property=require('./services/book_property')
var message=require('./services/message')
var getownerproperty=require('./services/getownerproperty')
var messageget =require('./services/messageget')
var getproperty= require('./services/getproperty')
//var Books = require('./services/books.js');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_property",post_property)
handleTopicRequest("message",message)
handleTopicRequest("traveller_signup",traveller_signup)
handleTopicRequest("owner_signup",owner_signup)
handleTopicRequest("post_traveller",traveller_sign)
handleTopicRequest("post_owner",signin)
handleTopicRequest("booking_property",booking_property)
handleTopicRequest("getownerproperty",getownerproperty)
handleTopicRequest("messageget",messageget)
handleTopicRequest("getproperty",getproperty)