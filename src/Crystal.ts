class Crystal {
    static Id = 0;
    properties: Property;
    tempid=0;
    constructor() {
        Crystal.Id++;
        this.tempid = Crystal.Id;
        this.properties = new Property();
    }
    get Atk() {
        return this.properties.initialAtk;
    }
    get Def() {
        return this.properties.initialDef;
    }
    get fightPower() {
        var result = this.properties.initialAtk* 1.2 + this.properties.initialDef* 0.8;
        return result;
    }
    setinformation(id: string, atk: number, def: number, name: string, bitmap: egret.Bitmap) {
        this.properties.setInformation(id,this.tempid,name,atk,def,bitmap);
    }

}