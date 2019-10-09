const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuidv4').default;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = 3000;

class Computer {
    constructor(manufacturer, processor) {
        this.id = uuidv4();
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

let computers = [];

computers.push(new Computer('LG', 'Intel'));
computers.push(new Computer('Lenovo', 'AMD'));

app.get('/computers/:id', (req, res) => {
    let id = req.params.id;
    let computer = computers.find(comp => comp.id === id);
    res.send(computer);
});

app.get('/computers', (req, res) => {
    res.send(JSON.stringify(computers));
});

app.post('/computers', (req, res) => {
    computers.push(new Computer(req.body.manufacturer, req.body.processor));
    res.send(JSON.stringify(computers[computers.length - 1]));
});

app.put('/computers', (req, res) => {
    let comp = req.body;
    const updatedComputers = [];
    computers.forEach(oldComp => {
        if (oldComp.id === comp.id) {
            updatedComputers.push(comp);
        } else {
            updatedComputers.push(oldComp);
        }
    });
    computers = updatedComputers;
    res.json(computers);
})

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server is listening on port ${port}!`));