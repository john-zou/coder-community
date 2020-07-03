import { UploadService } from './upload.service';
import { StorageService } from '../storage/storage.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(() => {
    const storage = new StorageService();
    service = new UploadService(storage);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
