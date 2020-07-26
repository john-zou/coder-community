import {UploadSuccess} from "../api";
import {JwtLocalStorageKey} from "../constants";

// These functions are manually written because the generated version in `frontend/src/api` don't work for file upload
// For example usage, see `frontend/src/pages/group/CreateGroupForm.tsx` around line 100

/**
 * @returns the URL of the file (in a Promise)
 *
 * @param file The file we get from upload component is an array even for single uploads, but this function
 * will take *either* that array *or* the single file. Since the back end only handles 1 file at a time, it will use the
 * first file in the array, if it's an array
 */
export function uploadUserProfilePic(file: File | File[]): Promise<string> {
    return uploadHelper(file, "profile-pic");
}

/**
 * @returns the URL of the file (in a Promise)
 *
 * @param file The file we get from upload component is an array even for single uploads, but this function
 * will take *either* that array *or* the single file. Since the back end only handles 1 file at a time, it will use the
 * first file in the array, if it's an array
 */
export function uploadUserBannerPic(file: File | File[]): Promise<string> {
    return uploadHelper(file, "profile-banner-pic");
}

/**
 * The same as uploadPublicAsset.
 *
 * @returns the URL of the file (in a Promise)
 *
 * @param file The file we get from upload component is an array even for single uploads, but this function
 * will take *either* that array *or* the single file. Since the back end only handles 1 file at a time, it will use the
 * first file in the array, if it's an array
 */
export function uploadPublicVideo(file: File | File[]): Promise<string> {
    return uploadPublicAsset(file);
}

/**
 * For uploading anything non-private and not user profile picture or user profile banner.
 *
 * @returns the URL of the file (in a Promise)
 *
 * @param file The file we get from upload component is an array even for single uploads, but this function
 * will take *either* that array *or* the single file. Since the back end only handles 1 file at a time, it will use the
 * first file in the array, if it's an array
 */
export function uploadPublicAsset(file: File | File[]): Promise<string> {
    return uploadHelper(file, "public/asset");
}


async function uploadHelper(file: File | File[], endpoint: string): Promise<string> {
    if (Array.isArray(file)) {
        file = file[0];
    }
    const data = new FormData();
    data.append('file', file);
    const result: UploadSuccess = await fetch(`http://ec2-13-229-215-75.ap-southeast-1.compute.amazonaws.com/api/upload/${endpoint}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem(JwtLocalStorageKey),
        },
        method: 'POST',
        body: data
    }).then(res => res.json());
    return result.url;
}