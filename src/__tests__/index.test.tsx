import {EmailHelper} from "./../index";

test('Example Test', async () => {
  expect(EmailHelper.isValidEmail("mail@example.com")).toBeTruthy()
});
