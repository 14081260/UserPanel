enum equipmentQualitySort {
    Common,//普通
    Rare,//稀有
    Epic,//史诗
    Story//传说
}

class Equipment extends egret.DisplayObjectContainer {
    static Id = 0;
    quality: equipmentQualitySort;
    crystals: Crystal[];
    static crystalsLimit = 5;
    crystalsCurrent = 0;
    properties:Property;
    get Atk() {
        var result = 0;
        this.crystals.forEach(crystal => result += crystal.Atk)
        switch (this.quality) {
            case equipmentQualitySort.Common:
                result = result * 0.8;
                break;
            case equipmentQualitySort.Rare:
                result = result * 0.9;
                break;
            case equipmentQualitySort.Epic:
                result = result * 1.0;
                break;
            case equipmentQualitySort.Story:
                result = result * 1.2;
                break;
        }
        result += this.properties.initialAtk;
        return result;
    }
    get Def() {
        var result = 0;
        this.crystals.forEach(crystal => result += crystal.Def)
        switch (this.quality) {
            case equipmentQualitySort.Common:
                result = result * 0.8;
                break;
            case equipmentQualitySort.Rare:
                result = result * 0.9;
                break;
            case equipmentQualitySort.Epic:
                result = result * 1.0;
                break;
            case equipmentQualitySort.Story:
                result = result * 1.2;
                break;
        }
        result += this.properties.initialDef;
        return result;
    }
    // private _cacheEquipmentFightPower = 0;

    get fightPower() {
        // if (!this._cacheEquipmentFightPower) {
        var result = this.Atk * 1.2 + this.Def * 0.8;
        //this.crystals.forEach(crystal => result += crystal.fightPower);
        // this._cacheEquipmentFightPower = result;
        // }
        // return this._cacheEquipmentFightPower;
        //console.log(result);
        return result;
    }
    tempid=0;
    constructor() {
        super();
        this.name = "";
        this.crystals = [];
        Equipment.Id++;
        this.tempid = Equipment.Id;
        this.properties=new Property();
    }
    setinformation(id: string, atk: number, def: number, name: string, quality: equipmentQualitySort, bitmap: egret.Bitmap) {
        this.properties.setInformation(id,this.tempid,name,atk,def,bitmap);
        this.name = name;
        this.quality = quality;
    }
    addCrystal(user: User, crystal: Crystal) {
        if (this.crystalsCurrent > Equipment.crystalsLimit)
            console.error("宝石超过上限，不能镶嵌");
        else {
            this.crystals.push(crystal);
            user.flag = true;
            this.crystalsCurrent++;
        }
    }
    removeCrystal(user: User, crystal: Crystal) {
        if (this.crystalsCurrent < 0)
            console.error(this.name + "没有宝石，不能卸载");
        else {
            var index = this.crystals.indexOf(crystal);
            this.crystals.splice(index);
            user.flag = true;
            this.crystalsCurrent--;
        }
    }
}

