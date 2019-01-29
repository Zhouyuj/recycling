import { TaskStateToColorPipe } from './task-state-to-color.pipe';

describe('TaskStateToColorPipe', () => {
  it('create an instance', () => {
    const pipe = new TaskStateToColorPipe();
    expect(pipe).toBeTruthy();
  });
});
