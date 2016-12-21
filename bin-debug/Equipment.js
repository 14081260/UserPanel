var equipmentQualitySort;
(function (equipmentQualitySort) {
    equipmentQualitySort[equipmentQualitySort["Common"] = 0] = "Common";
    equipmentQualitySort[equipmentQualitySort["Rare"] = 1] = "Rare";
    equipmentQualitySort[equipmentQualitySort["Epic"] = 2] = "Epic";
    equipmentQualitySort[equipmentQualitySort["Story"] = 3] = "Story"; //传说
})(equipmentQualitySort || (equipmentQualitySort = {}));
var Equipment = (function (_super) {
    __extends(Equipment, _super);
    function Equipment() {
        _super.call(this);
        this.crystalsCurrent = 0;
        this.tempid = 0;
        this.name = "";
        this.crystals = [];
        Equipment.Id++;
        this.tempid = Equipment.Id;
        this.properties = new Property();
    }
    var d = __define,c=Equipment,p=c.prototype;
    d(p, "Atk"
        ,function () {
            var result = 0;
            this.crystals.forEach(function (crystal) { return result += crystal.Atk; });
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
    );
    d(p, "Def"
        ,function () {
            var result = 0;
            this.crystals.forEach(function (crystal) { return result += crystal.Def; });
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
    );
    d(p, "fightPower"
        // private _cacheEquipmentFightPower = 0;
        ,function () {
            // if (!this._cacheEquipmentFightPower) {
            var result = this.Atk * 1.2 + this.Def * 0.8;
            //this.crystals.forEach(crystal => result += crystal.fightPower);
            // this._cacheEquipmentFightPower = result;
            // }
            // return this._cacheEquipmentFightPower;
            //console.log(result);
            return result;
        }
    );
    p.setinformation = function (id, atk, def, name, quality, bitmap) {
        this.properties.setInformation(id, this.tempid, name, atk, def, bitmap);
        this.name = name;
        this.quality = quality;
    };
    p.addCrystal = function (user, crystal) {
        if (this.crystalsCurrent > Equipment.crystalsLimit)
            console.error("宝石超过上限，不能镶嵌");
        else {
            this.crystals.push(crystal);
            user.flag = true;
            this.crystalsCurrent++;
        }
    };
    p.removeCrystal = function (user, crystal) {
        if (this.crystalsCurrent < 0)
            console.error(this.name + "没有宝石，不能卸载");
        else {
            var index = this.crystals.indexOf(crystal);
            this.crystals.splice(index);
            user.flag = true;
            this.crystalsCurrent--;
        }
    };
    Equipment.Id = 0;
    Equipment.crystalsLimit = 5;
    return Equipment;
}(egret.DisplayObjectContainer));
egret.registerClass(Equipment,'Equipment');
//# sourceMappingURL=Equipment.js.map