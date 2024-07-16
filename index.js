// Nodejs app to test AWS S3 presigned URL feature
// Setup: `npm install express body-parser @aws-sdk/client-s3 @aws-sdk/s3-request-presigner`
// Edit .env in the root with your variables
// Run: `node --env-file .env index.js`
// Test: Use a tool like Postman to send a POST request to http://localhost:3000/upload with the following JSON body:
// {
//  "base64Image": "your_base64_encoded_image_string"
// }
//
// curl --location 'http://localhost:3000/upload' --header 'Content-Type: application/json' --data '{"base64Image": "/9j/4AAQSkZJRgABAQAAAQABAAD/4QDSRXhpZgAATU0AKgAAAAgABgEOAAIAAAAOAAAAVgEaAAUAAAABAAAAZAEbAAUAAAABAAAAbAEoAAMAAAABAAEAAAITAAMAAAABAAEAAIdpAAQAAAABAAAAdAAAAABKdXBpdGVyIEFob3khAAAAAAEAAAABAAAAAQAAAAEABZAAAAcAAAAEMDIzMJAEAAIAAAAUAAAAtpEBAAcAAAAEAQIDAKAAAAcAAAAEMDEwMKABAAMAAAAB//8AAAAAAAAyMDA3OjA0OjAyIDIzOjUwOjAxAP/tAEBQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAJBwCGQAHSnVwaXRlchwCGQAMTmV3IEhvcml6b25zHAIAAAIABP/hEQxodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4wNSc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpkYz0naHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8nPgogIDxkYzpkZXNjcmlwdGlvbj4KICAgPHJkZjpBbHQ+CiAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPkp1cGl0ZXIgQWhveSE8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6ZGVzY3JpcHRpb24+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+SnVwaXRlciBBaG95ITwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC9kYzp0aXRsZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6cGhvdG9zaG9wPSdodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvJz4KICA8cGhvdG9zaG9wOkNyZWRpdD5OQVNBL0pvaG5zIEhvcGtpbnMgVW5pdmVyc2l0eSBBcHBsaWVkIFBoeXNpY3MgTGFib3JhdG9yeS9Tb3V0aHdlc3QgDQpSZXNlYXJjaCBJbnN0aXR1dGU8L3Bob3Rvc2hvcDpDcmVkaXQ+CiAgPHBob3Rvc2hvcDpEYXRlQ3JlYXRlZD4yMDA3LTA0LTAyVDIzOjUwOjAxPC9waG90b3Nob3A6RGF0ZUNyZWF0ZWQ+CiAgPHBob3Rvc2hvcDpTb3VyY2U+TkFTQS9Kb2hucyBIb3BraW5zIFVuaXZlcnNpdHkgQXBwbGllZCBQaHlzaWNzIExhYm9yYXRvcnkvU291dGh3ZXN0IA0KUmVzZWFyY2ggSW5zdGl0dXRlPC9waG90b3Nob3A6U291cmNlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6SW1hZ2VEZXNjcmlwdGlvbj4KICAgPHJkZjpBbHQ+CiAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPkp1cGl0ZXIgQWhveSE8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvdGlmZjpJbWFnZURlc2NyaXB0aW9uPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPgogIDx4bXA6Q3JlYXRlRGF0ZT4yMDA3LTA0LTAyVDIzOjUwOjAxPC94bXA6Q3JlYXRlRGF0ZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eHh4PSdodHRwOi8vbnMubXluYW1lLmNvbS94eHgvMS4wLyc+CiAgPHh4eDpjcmVhdGVkYXRlPjIwMDctMDQtMDIgMjM6NTA6MDE8L3h4eDpjcmVhdGVkYXRlPgogIDx4eHg6Y3JlZGl0Pk5BU0EvSm9obnMgSG9wa2lucyBVbml2ZXJzaXR5IEFwcGxpZWQgUGh5c2ljcyBMYWJvcmF0b3J5L1NvdXRod2VzdCANClJlc2VhcmNoIEluc3RpdHV0ZTwveHh4OmNyZWRpdD4KICA8eHh4OmRlc2NyaXB0aW9uPkp1cGl0ZXIgQWhveSE8L3h4eDpkZXNjcmlwdGlvbj4KICA8eHh4Om5hc2FfaWQ+UElBMDkyMzE8L3h4eDpuYXNhX2lkPgogIDx4eHg6c2Vjb25kYXJ5Y3JlYXRvcj5OQVNBL0pvaG5zIEhvcGtpbnMgVW5pdmVyc2l0eSBBcHBsaWVkIFBoeXNpY3MgTGFib3JhdG9yeS9Tb3V0aHdlc3QgDQpSZXNlYXJjaCBJbnN0aXR1dGU8L3h4eDpzZWNvbmRhcnljcmVhdG9yPgogIDx4eHg6dGl0bGU+SnVwaXRlciBBaG95ITwveHh4OnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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"}'
//
// Response:
//{
//    "message": "Successfully uploaded image and generated URL",
//    "fileName": "uploaded-image-1721141902167.jpg",
//    "url": "https://s3.us-east-1.amazonaws.com/lbrenman_test/uploaded-image-1721141902167.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV7SX4LLL7LQGEJOD%2F20240716%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240716T145822Z&X-Amz-Expires=3600&X-Amz-Signature=978ca5a1da191f6fc3524ac916322d317cdada6747f6964083febe61534556fb&X-Amz-SignedHeaders=host&x-id=GetObject"
//}

import express from "express";
import bodyParser from "body-parser";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed

// Initialize the S3 client
const s3Client = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.CLIENT_ID,
        secretAccessKey: process.env.CLIENT_SECRET
    }
});

// Route to upload a base64-encoded image and generate a signed URL
app.post('/upload', async (req, res) => {
    const bucketName = process.env.BUCKETNAME;
    const fileName = `uploaded-image-${Date.now()}.jpg`;
    const base64String = req.body.base64Image;

    // Decode the base64 string
    const buffer = Buffer.from(base64String, 'base64');

    let uploadSuccess = false;

    try {
        // Upload the image to S3
        const putObjectCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: buffer,
            ContentType: 'image/jpeg'
        });
        await s3Client.send(putObjectCommand);

        uploadSuccess = true;
        
    } catch (err) {
        console.error('Error uploading image and generating URL:', err);
        
    } finally {

        try {

            // Generate a pre-signed URL for the uploaded file
            const getObjectCommand = new GetObjectCommand({
                Bucket: bucketName,
                Key: fileName
            });
            const signedUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: process.env.SIGNEDURLTIME });

            if (uploadSuccess) {
                res.json({
                    message: 'Successfully uploaded image and generated URL',
                    fileName: fileName,
                    url: signedUrl
                });
            } else {
                res.status(500).json({
                    message: 'Failed to upload image and generate URL',
                    error: err.message
                });
            }

        } catch (err) {
            console.error('Error generating signed URL:', err);
            res.status(500).json({
                message: 'Failed to upload image and generate URL',
                error: err.message
            });
        }

    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
