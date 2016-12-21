var Crystal = (function () {
    function Crystal() {
        this.tempid = 0;
        Crystal.Id++;
        this.tempid = Crystal.Id;
        this.properties = new Property();
    }
    var d = __define,c=Crystal,p=c.prototype;
    d(p, "Atk"
        ,function () {
            return this.properties.initialAtk;
        }
    );
    d(p, "Def"
        ,function () {
            return this.properties.initialDef;
        }
    );
    d(p, "fightPower"
        ,function () {
            var result = this.properties.initialAtk * 1.2 + this.properties.initialDef * 0.8;
            return result;
        }
    );
    p.setinformation = function (id, atk, def, name, bitmap) {
        this.properties.setInformation(id, this.tempid, name, atk, def, bitmap);
    };
    Crystal.Id = 0;
    return Crystal;
}());
egret.registerClass(Crystal,'Crystal');
//# sourceMappingURL=Crystal.js.map