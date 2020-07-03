import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

describe('Upload Controller', () => {
  let controller: UploadController;
  let service: UploadService;

  beforeEach(async () => {
    service = {
      uploadPrivateFile: jest.fn(),
      uploadProfileBannerPic: jest.fn(),
      uploadProfilePic: jest.fn(),
      uploadPublicImage: jest.fn(),
      uploadPublicVideo: jest.fn(),
    } as unknown as UploadService;

    controller = new UploadController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
