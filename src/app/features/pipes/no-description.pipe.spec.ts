import { NoDescriptionPipe } from './no-description.pipe';

describe('NoDescriptionPipe', () => {
  it('create an instance', () => {
    const pipe = new NoDescriptionPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return "No description" when the value is -', () => {
    const pipe = new NoDescriptionPipe();
    const result = pipe.transform('-');
    expect(result).toBe('No description available');
  });
});
