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

let computer = new Computer("HP", "AMD");
let ultrabook = new Ultrabook("Lenovo", "Intel", 256);

console.log(computer.showInfo());
console.log(ultrabook.showInfo());