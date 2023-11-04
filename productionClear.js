const fs = require('fs');
const path = require('path');

// Function to recursively read files in a directory and its subdirectories
function readFilesRecursively(directoryPath, searchString, replaceString) {
    const files = fs.readdirSync(directoryPath);

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            replaceInFile(filePath, searchString, replaceString);
        } else if (stats.isDirectory()) {
            readFilesRecursively(filePath, searchString, replaceString);
        }
    });
}

// Function to replace content in a file
function replaceInFile(filePath, searchString, replaceString) {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(new RegExp(searchString, 'g'), replaceString);

    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Replaced in: ${filePath}`);
}

const rootDirectoryPath = './dist'; // Replace with the actual root directory path

const assetsPrefix = '/%20/';
const assetsPrefixFix = '';

readFilesRecursively(rootDirectoryPath, assetsPrefix, assetsPrefixFix);

const scriptsPrefix = 'assets/';
const scriptsPrefixFix = '';

readFilesRecursively(rootDirectoryPath, scriptsPrefix, scriptsPrefixFix);

const esp_data_ui_folder = "F:/IOT_STUFF/_PROJECTS/gbaby/gbaby.tech.mcu/data/ui";

const ui_assets_source = "F:/IOT_STUFF/_PROJECTS/gbaby/gbaby.tech.mcu.ui/dist/lab_ui_v02/assets";
const ui_html_source = "F:/IOT_STUFF/_PROJECTS/gbaby/gbaby.tech.mcu.ui/dist/lab_ui_v02";

function removeInDir(directoryPath) {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);

            fs.stat(filePath, (error, stats) => {
                if (error) {
                    console.error('Error getting file stats:', error);
                    return;
                }

                if (stats.isFile()) {
                    // It's a file, so delete it
                    fs.unlink(filePath, (deleteError) => {
                        if (deleteError) {
                            console.error('Error deleting file:', deleteError);
                        } else {
                            console.log('File deleted:', filePath);
                        }
                    });
                }
            });
        });
    });
}

function copyFiles(source, destination) {
    fs.readdir(source, (err, files) => {
        if (err) {
            console.error('Error reading source directory:', err);
            return;
        }

        files.forEach((file) => {
            const sourceFilePath = path.join(source, file);
            const destinationFilePath = path.join(destination, file);

            fs.stat(sourceFilePath, (err, stats) => {
                if (err) {
                    console.error('Error checking file:', err);
                    return;
                }

                if (stats.isFile()) {
                    fs.copyFile(sourceFilePath, destinationFilePath, (copyErr) => {
                        if (copyErr) {
                            console.error('Error copying file:', copyErr);
                        } else {
                            console.log('File copied:', sourceFilePath, 'to', destinationFilePath);
                        }
                    });
                }
            });

            

           
        });
    });

}


removeInDir(esp_data_ui_folder);
copyFiles(ui_assets_source, esp_data_ui_folder + "/assets");
copyFiles(ui_html_source, esp_data_ui_folder);

