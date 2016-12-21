var tool = (function () {
    function tool() {
    }
    var d = __define,c=tool,p=c.prototype;
    tool.anch = function (bitmap) {
        bitmap.anchorOffsetX = bitmap.width / 2;
        bitmap.anchorOffsetY = bitmap.height / 2;
    };
    return tool;
}());
egret.registerClass(tool,'tool');
//# sourceMappingURL=tool.js.map