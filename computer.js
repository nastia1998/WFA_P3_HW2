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
        res.json(doc);
    })
});

app.get('/computers', (req, res) => {
    computers.find({}, (err, docs) => {
        res.json(docs);
    });
});

app.post('/computers', (req, res) => {
    let computer = new Computer(req.body.manufacturer, req.body.processor);
    computers.insert(computer, (err, doc) => {
        res.json(doc);
    })
});

app.put('/computers', (req, res) => {
    // let comp = req.body;
    // const updatedComputers = [];
    // let newComp = [];
    // computers.forEach(oldComp => {
    //     if (oldComp.id === comp.id) {
    //         updatedComputers.push(comp);
    //         newComp = comp;

    //     } else {
    //         updatedComputers.push(oldComp);
    //     }
    // });
    // computers = updatedComputers;
    // res.json(newComp);
});

app.delete('/computers', (req, res) => {
    // let id = req.body.id;
    // computers = computers.filter(comp => comp.id !== id);
    // res.json(computers);
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server is listening on port ${port}!`));