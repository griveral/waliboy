var express = require('express');
var app = express();
var PORT = 3000;

var mongojs = require('mongojs');
db = mongojs('mongotest_db',['customers','products']);


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

    var new_customer = {
        'name': req.body.name,
        'email': req.body.email,
        'ts'   : new Date()
    };

    insertCustomer(new_customer,function(err){
        if(err){
            res.status(400);
        }
        res.status(200);
        res.type('text/plain');
        res.send('Customer Inserted OK!');
    });

});

app.get('/customer/:id',function(req,res){

    console.log('Got Request for customer info');
    console.log('REQUEST:',req.params);

    var id = req.params.id;

    getCustomerInfo(id,function(err,doc){
        if(err){
            res.status(400);
        }
        res.json(doc);
    })


});

app.get('/customers',function(req,res){

    console.log('Got Request to Get all customers');
    console.log('REQUEST:', req.params);

    getCustomers(function(err,docs){
        if(err){
            res.status(400);
        }
        res.json(docs);
    })

});

app.post('/product',function(req,res){
    console.log('Got request for adding new product.')
    console.log('REQ:', req.body);

    var new_product = {
        'name': req.body.name,
        'code': req.body.code,
        'ts'  : new Date()
    };

    insertProduct(new_product,function(err){
        if(err){
            res.status(400);
        }
        res.status(200);
        res.type('text/plain');
        res.send('Product inserted');
    })
});

/* HELPER FUNCTIONS */
function getCustomers(callback){

    console.log('<<getCustomers>>\n');

    db.customers.find(function(err,docs){
        if(err){
            callback(err,null);
        }
        callback(null,docs);

    })


};

function insertCustomer(new_customer,callback){

    console.log('<<insertCustomer>>')
    db.customers.save(new_customer,function(err,res){
       if(err){
           callback(err);
       }
        callback(null);
    });

};

function insertProduct(new_product,callback){

    console.log('<<insertProduct>>');
    db.products.save(new_product,function(err,res){                 //in node-mongo driver save == insert()
        if(err){
            callback(err);
        }
        callback(null);
    });

};

function getCustomerInfo(id,callback){

    console.log('<<getCustomerInfo>>\n')

    var key = {
          _id : mongojs.ObjectID(id)
    };

    db.customers.find(key,function(err,doc){
        if(err){
            callback(err,null);
        }
        callback(null,doc);
    });

};
