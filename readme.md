A Nodejs example of generating [signed URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html) for files uploaded to an [AWS S3](https://aws.amazon.com/pm/serv-s3/?gclid=CjwKCAjwtNi0BhA1EiwAWZaANIGyJHZzgFXGaGTqiVjR3A8CL_h1h3tSP5yhC4OyOnsnS1tFRV8fuhoCuo0QAvD_BwE&trk=20e04791-939c-4db9-8964-ee54c41bc6ad&sc_channel=ps&ef_id=CjwKCAjwtNi0BhA1EiwAWZaANIGyJHZzgFXGaGTqiVjR3A8CL_h1h3tSP5yhC4OyOnsnS1tFRV8fuhoCuo0QAvD_BwE:G:s&s_kwcid=AL!4422!3!651751060962!e!!g!!aws%20s3!19852662362!145019251177) bucket

The app is a web server that exposes a REST API at reslurce path /upload



* Setup: `npm install express body-parser @aws-sdk/client-s3 @aws-sdk/s3-request-presigner`
* Edit .env in the root with your variables
* Run: `node --env-file .env index.js`
* Test: Use a tool like Postman to send a POST request to http://localhost:3000/upload with the following JSON body:
    ```JSON
    {
    "base64Image": "your_base64_encoded_image_string"
    }
    ```
    For example:

    ```bash
    curl --location 'http://localhost:3000/upload' --header 'Content-Type: application/json' --data '{"base64Image": "/9j/4AAQSkZJRgABAQAAAQABAAD/...FFFFf//Z"}'
    ```
* Response:
    ```JSON
    {
        "message": "Successfully uploaded image and generated URL",
        "fileName": "uploaded-image-1721141902167.jpg",
        "url": "https://s3.us-east-1.amazonaws.com/bucketname/uploaded-image-1721141902167.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAV7SX4LLL7LQGEJOD%2F20240716%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240716T145822Z&X-Amz-Expires=3600&X-Amz-Signature=978ca5a1da191f6fc3524ac916322d317cdada6747f6964083febe61534556fb&X-Amz-SignedHeaders=host&x-id=GetObject"
    }
    ```