import {multiply} from "./../index";

test('Example Test', async () => {
  let result = await multiply(3, 4);
  expect(result).toBe(12);
});
