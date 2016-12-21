//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var user = new User();
        user.setinformation("982049377");
        var guanyu = new Hero();
        var bitmap = this.createBitmapByName("001_png");
        guanyu.setinformation("001", "关羽", 95, 85, heroQualitySort.S, bitmap);
        var zhangfei = new Hero();
        bitmap = this.createBitmapByName("002_png");
        zhangfei.setinformation("002", "张飞", 96, 70, heroQualitySort.S, bitmap);
        var qinglongyanyuedao = new Equipment();
        bitmap = this.createBitmapByName("weapan001_png");
        qinglongyanyuedao.setinformation("we001", 10, 0, "青龙偃月刀", equipmentQualitySort.Story, bitmap);
        var atkCrystal = new Crystal();
        bitmap = this.createBitmapByName("atk001_png");
        atkCrystal.setinformation("atk001", 5, 0, "攻击宝石", bitmap);
        var defCrystal = new Crystal();
        bitmap = this.createBitmapByName("def001_png");
        defCrystal.setinformation("def001", 0, 5, "防御宝石", bitmap);
        guanyu.x = 100;
        guanyu.y = 100;
        zhangfei.x = 100;
        zhangfei.y = 600;
        this.addChild(guanyu);
        this.addChild(zhangfei);
        var i = user.fightPower;
        console.log("user1没英雄战斗力" + i);
        user.addHero(guanyu);
        user.inToTeam(guanyu);
        i = user.fightPower;
        console.log("user1关羽上阵战斗力" + i); //182
        console.log("gunayu" + guanyu.fightPower);
        guanyu.addEquipment(user, qinglongyanyuedao);
        i = user.fightPower;
        console.log("user1关羽装备青龙偃月刀上阵战斗力" + i); //194
        console.log("gunayu" + guanyu.fightPower);
        qinglongyanyuedao.addCrystal(user, atkCrystal);
        console.log("gunayu  addCrystal " + guanyu.fightPower);
        console.log("刀  addCrystal " + qinglongyanyuedao.fightPower);
        i = user.fightPower;
        console.log("user1关羽装备青龙偃月刀（镶嵌攻击宝石1颗）上阵战斗力" + i); //201.2
        console.log("gunayu  addCrystal" + guanyu.fightPower);
        console.log("刀  addCrystal " + qinglongyanyuedao.fightPower);
        qinglongyanyuedao.addCrystal(user, defCrystal);
        i = user.fightPower;
        console.log("user1关羽装备青龙偃月刀（镶嵌攻击宝石1颗,防御宝石1颗）上阵战斗力" + i); //206
        console.log("gunayu战斗力" + guanyu.fightPower);
        user.addHero(zhangfei);
        user.inToTeam(zhangfei);
        i = user.fightPower;
        console.log("user1关羽and张飞上阵战斗力" + i); //377.2
        console.log("gunayu战斗力" + guanyu.fightPower);
        user.outToTean(zhangfei);
        i = user.fightPower;
        console.log("user1关羽上阵战斗力" + i);
        console.log("user1关羽atk" + guanyu.Atk);
        console.log("user1关羽def" + guanyu.Def);
        // var user2 = new User();
        // user2.setinformation("wang")
        // var guanyu2 = new Hero();
        // guanyu2.setinformation("001", "关羽", 95, 85, heroQualitySort.S);
        // i = user2.fightPower;
        // console.log("user2" + i);
        // user2.addHero(guanyu2);
        // user2.inToTeam(guanyu2);
        // i = user2.fightPower;
        // console.log("user2关羽上阵战斗力" + i);
        /* 测试Bignumber
         console.log(Bignumber.fold);
         Bignumber.fold=10;
         console.log(Bignumber.fold);
         var s: Bignumber = new Bignumber();
         s.setNumber(99);
         var t = 100;
         var w: Bignumber = new Bignumber();;
         w.setNumber(100);
         s.addNumber(t);
         console.log(s.toString());
         s.setNumber(99);
         s.subtractNumber(t);
         console.log(s.toString());
         s.setNumber(99);
         s.addBigNumber(w);
         console.log(s.toString());
         s.setNumber(99);
         s.subtractBigNumber(w);
         console.log(s.toString());
         s.setNumber(99);*/
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map