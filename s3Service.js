// s3Service.js
const s3 = require('./config/awsConfig');

/**
 * Function to move a file from one folder to another in an S3 bucket.
 * @param {string} bucketName - The name of the S3 bucket.
 * @param {string} sourceKey - The source path of the file (folder1/fileName).
 * @param {string} destinationKey - The destination path of the file (folder2/fileName).
 */
async function moveFile(bucketName, sourceKey, destinationKey) {
    try {
        // Step 1: Read the file from the source path
        console.log(`Reading file from ${bucketName}/${sourceKey}`);
        const fileData = await s3.getObject({ Bucket: bucketName, Key: sourceKey }).promise();

        console.log('File details:', fileData);

        // Step 2: Copy the file to the destination path
        console.log(`Copying file to ${bucketName}/${destinationKey}`);
        await s3
            .copyObject({
                Bucket: bucketName,
                CopySource: `${bucketName}/${sourceKey}`,
                Key: destinationKey,
            })
            .promise();

        console.log('File copied successfully.');

        // Step 3: Delete the file from the source path
        console.log(`Deleting file from ${bucketName}/${sourceKey}`);
        await s3.deleteObject({ Bucket: bucketName, Key: sourceKey }).promise();

        console.log('File deleted successfully.');
    } catch (error) {
        console.error('Error moving file:', error);
    }
}

module.exports = { moveFile };
