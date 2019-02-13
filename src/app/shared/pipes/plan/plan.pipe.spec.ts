import { TaskStateToChinesePipe } from './plan.pipe';

describe('PlanPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskStateToChinesePipe();
    expect(pipe).toBeTruthy();
  });
});
