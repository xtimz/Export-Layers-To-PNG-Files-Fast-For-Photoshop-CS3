/*

将每个图层存为一个 PNG 文件。

使用方法：
 1. 将此文件复制到：C:\Program Files (x86)\Adobe\Adobe Photoshop CS3\Presets\Scripts。
 2. 在 Photoshop 中，选择菜单：File - Scripts - Export Layers To PNG Files (Fast)。

要求：
 1. 文件必须已保存，因为要用其所在目录。
 2. 每个图层的名称，在删去不能用的字符后，都必须不同，因为要用做文件名。

*/

function main() {
    if (!confirm("Continue?")) return;

    prefs = new Object();
    prefs.filePath = app.activeDocument.path;
    prefs.count = 0;

    hideLayers(activeDocument);
    saveLayers(activeDocument);
    alert("Saved " + prefs.count + " files.");
}

function hideLayers(ref) {
    for (var i = 0; i < ref.layers.length; i++) {
        var layer = ref.layers[i];
        if (layer.typename == 'LayerSet') {
            hideLayers(layer);
        } else {
            layer.visible = false;
        }
    }
}

function saveLayers(ref) {
    for (var i = 0; i < ref.layers.length; i++) {
        var layer = ref.layers[i];
        if (layer.typename == 'LayerSet') {
            saveLayers(layer);
        } else {
            layer.visible = true;
            saveImage(layer.name);
            layer.visible = false;
        }
    }
}

function saveImage(layerName) {
    var fileName = layerName.replace(/[\\\*\/\?:"\|<> ]/g, '');
    var fileHandle = File(prefs.filePath + "/" + fileName + ".PNG");

    var pngSaveOptions = new PNGSaveOptions();
    activeDocument.saveAs(fileHandle, pngSaveOptions, true, Extension.LOWERCASE);
    prefs.count++;
}

main();
