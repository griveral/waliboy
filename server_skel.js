var express = require('express');
var app = express();
var PORT = 3000;


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/app"));
app.set('port', process.env.PORT || PORT);

var server = app.listen(app.get('port'), function() {
    console.log('Server listening on port ' + server.address().port);
});


/* ROUTES */
app.post('/customer',function(req,res){

    console.log('Got Request for Insert');
    console.log('REQUEST:',req.body);

    
});

app.post('/customer/:id',function(req,res){

    console.log('Got Request for customer info');
    console.log('REQUEST:',req.body);

    
});

app.get('/customers',function(req,res){

    console.log('Got Request to Get all customers');

    

});


/* HELPER FUNCTIONS */
function getCustomers(callback){

    console.log('<<getCustomers>>\n');

    
};

function insertCustomer(new_customer,callback){

    console.log('<<insertCustomer>>')
   
};

function getCustomerInfo(id,callback){

    console.log('<<getCustomerInfo>>\n')
    
    
   
};
