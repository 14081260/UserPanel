var Details = (function (_super) {
    __extends(Details, _super);
    function Details() {
        _super.call(this);
        this.contentField = new egret.DisplayObjectContainer();
    }
    var d = __define,c=Details,p=c.prototype;
    p.setInformation = function (content) {
        var background = new egret.Bitmap();
        background.texture = RES.getRes("detailbg_png");
        background.scaleX = 1.2;
        background.scaleY = 1.2;
        background.y = -20;
        tool.anch(background);
        this.addChild(background);
        var quality = new egret.TextField();
        switch (content.class) {
            case Hero:
                quality.text = "Quality:  " + heroQualitySort[content.quality];
                break;
            case Equipment:
                quality.text = "Quality:  " + equipmentQualitySort[content.quality];
                console.log("123456789987564613203");
                break;
        }
        quality.textColor = 0X000000;
        quality.x = -80;
        quality.y = 0;
        quality.scaleX = 0.7;
        quality.scaleY = 0.7;
        this.contentField.addChild(quality);
        var atk = new egret.TextField();
        atk.text = content.properties.atkDiscript + content.Atk.toString();
        atk.textColor = 0X000000;
        atk.x = -80;
        atk.y = -80;
        atk.scaleX = 0.7;
        atk.scaleY = 0.7;
        this.contentField.addChild(atk);
        var def = new egret.TextField();
        def.text = content.properties.defDiscript + content.Def.toString();
        def.textColor = 0X000000;
        def.x = -80;
        def.y = -30;
        def.scaleX = 0.7;
        def.scaleY = 0.7;
        this.contentField.addChild(def);
        var FightPower = new egret.TextField();
        FightPower.text = "FighrPower:   " + content.fightPower.toString();
        FightPower.textColor = 0X000000;
        FightPower.x = -80;
        FightPower.y = 20;
        FightPower.scaleX = 0.7;
        FightPower.scaleY = 0.7;
        this.contentField.addChild(FightPower);
        this.addChild(this.contentField);
    };
    return Details;
}(egret.DisplayObjectContainer));
egret.registerClass(Details,'Details');
//# sourceMappingURL=Details.js.map