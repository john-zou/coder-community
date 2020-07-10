# `UploadModule`

## Front End Usage
Use `frontend/src/api-upload` helper functions!

(Unlike the other API endpoints, the generated helper functions don't work for file upload.)



## Details
For now, allows a user to upload a file, using `StorageModule`.

Later, can handle the creation of temporary credentials for user to directly upload to Azure Blob or AWS S3

Endpoints for upload can be found at: localhost:3001/api

Public file uploads (images and videos) are implemented.
They are statically hosted in `backend/public`

Once uploaded, they are accessable as static files in:

## Profile Pics:

- `localhost:3001/uploads/profile-pics/<user_mongodb_id>.jpg` (or other extension)

## Profile Banner Img:

- `localhost:3001/uploads/profile-banner/<user_mongodb_id>.jpg` (or other extension)

## Assets:

- `localhost:3001/uploads/assets/<random string>.jpg` (or other extension)

The idea is that the user is able to upload anything to the assets endpoint and use them in their posts using markdown to embed the image,
or if they have a video post, to link to it directly.

The front end will receive the URL in all cases in response.
