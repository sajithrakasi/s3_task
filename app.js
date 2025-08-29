// app.js
const { moveFile } = require('./s3Service');

async function main() {
    const bucketName = 's3-bucket';
    const sourceKey = 'folder1/example-file.txt';
    const destinationKey = 'folder2/example-file.txt';

    console.log('Starting the file move process...');
    await moveFile(bucketName, sourceKey, destinationKey);
    console.log('File move process completed.');
}

main().catch((error) => {
    console.error('Error in application:', error);
});
