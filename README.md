# Export-Layers-To-PNG-Files-Fast-For-Photoshop-CS3
The new project doesn't work for early versions of Photoshop. This is from the original. I deliberately keep it simple so that it works for early versions of Photoshop.

The script will save every layer to a PNG file.

Use:
1. Copy the JSX file to: C:\Program Files (x86)\Adobe\Adobe Photoshop CS3\Presets\Scripts
2. In Photoshop, choose from menu: File - Scripts - Export Layers To PNG Files (Fast)

Notes:
1. The image file in Photoshop should be saved, because the script will use the name of the directory. If you don't want to save, change the following to something else:

   prefs.filePath = app.activeDocument.path;

   For example, change it to C:\Temp. You need to create C:\Temp by hand, otherwise it will fail.

   prefs.filePath = "C:/Temp";

2. The script will use the layer names as file names, so the layer names should be different after removing unusable characters. If you can't do it, change the following to something else:

   var fileName = layerName.replace(/[\\\*\/\?:"\|<> ]/g, '');

   For example, you may append the global counter.

   var fileName = layerName.replace(/[\\\*\/\?:"\|<> ]/g, '') + " - " + prefs.count;

