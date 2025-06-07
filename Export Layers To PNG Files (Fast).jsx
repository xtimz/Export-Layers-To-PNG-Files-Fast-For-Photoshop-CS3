/*

��ÿ��ͼ���Ϊһ�� PNG �ļ���

ʹ�÷�����
 1. �����ļ����Ƶ���C:\Program Files (x86)\Adobe\Adobe Photoshop CS3\Presets\Scripts��
 2. �� Photoshop �У�ѡ��˵���File - Scripts - Export Layers To PNG Files (Fast)��

Ҫ��
 1. �ļ������ѱ��棬��ΪҪ��������Ŀ¼��
 2. ÿ��ͼ������ƣ���ɾȥ�����õ��ַ��󣬶����벻ͬ����ΪҪ�����ļ�����

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
