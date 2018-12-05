import { ApkModule } from './apk.module';

describe('ApkModule', () => {
  let apkModule: ApkModule;

  beforeEach(() => {
    apkModule = new ApkModule();
  });

  it('should create an instance', () => {
    expect(apkModule).toBeTruthy();
  });
});
