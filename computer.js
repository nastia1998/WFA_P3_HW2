const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 3000;

const Datastore = require('nedb');
const computers = new Datastore({ filename: 'computers.db', autoload: true });

class Computer {
    constructor(manufacturer, processor) {
        this._manufacturer = manufacturer;
        this._processor = processor;
    }

    get manufacturer() {
        return this._manufacturer;
    }
    set manufacturer(newManufacturer) {
        this._manufacturer = newManufacturer;
    }

    get processor() {
        return this._processor;
    }
    set processor(newProcessor) {
        this._processor = newProcessor;
    }

    showInfo() {
        return [this.manufacturer, this.processor];
    }
}

class Ultrabook extends Computer {
    constructor(manufacturer, processor, hardDiskSize) {
        super(manufacturer, processor);
        this._hardDiskSize = hardDiskSize;
    }

    get hardDiskSize() {
        return this._hardDiskSize;
    }
    set hardDiskSize(newHardDiskSize) {
        this._hardDiskSize = newHardDiskSize;
    }

    showInfo() {
        return [super.showInfo(), this.hardDiskSize];
    }
}

app.get('/computers/:id', (req, res) => {
    let compId = req.params.id;
    computers.findOne({ _id: compId }, (err, doc) => {
        err === true ? res.json(err) : res.json(doc);
    });
});

app.get('/computers', (req, res) => {
    computers.find({}, (err, docs) => {
        err === true ? res.json(err) : res.json(docs);
    });
});

app.post('/computers', (req, res) => {
    let computer = new Computer(req.body.manufacturer, req.body.processor);
    computers.insert(computer, (err, doc) => {
        err === true ? res.json(err) : res.json(doc);
    })
});

app.put('/computers', (req, res) => {
    let comp = req.body;
    let replComp = [];
    computers.update({ _id: comp._id }, {
        $set:
            { _manufacturer: comp._manufacturer, _processor: comp._processor }
    }, {}, (err, numReplaced) => {
        if (err) {
            res.json(err);
        } else {
            computers.findOne({ _id: comp._id }, (err, doc) => {
                if (err) {
                    res.json(err);
                } else {
                    replComp = doc;
                    res.json(replComp);
                }
            });
        }
    });
});

app.delete('/computers', (req, res) => {
    let id = req.body.id;
    let delComp = [];

    computers.findOne({ _id: id }, (err, doc) => {
        err === true ? res.json(err) : (delComp = doc);
    });

    computers.remove({ _id: id }, (err, numDeleted) => {
        err === true ? res.json(err) : res.json(delComp);
    });
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server is listening on port ${port}!`));