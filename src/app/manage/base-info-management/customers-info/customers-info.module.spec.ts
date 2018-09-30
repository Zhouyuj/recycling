import { CustomersInfoModule } from './customers-info.module';

describe('CustomersInfoModule', () => {
  let customersInfoModule: CustomersInfoModule;

  beforeEach(() => {
    customersInfoModule = new CustomersInfoModule();
  });

  it('should create an instance', () => {
    expect(customersInfoModule).toBeTruthy();
  });
});
