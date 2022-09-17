import * as fromMySelectors from './user.selectors';

describe('User Selectors', () => {
  it('selectUser', () => {
    expect(fromMySelectors.selectUser.projector({ user: '123' })).toBe('123');
  });
  it('selectUserMsg', () => {
    expect(fromMySelectors.selectUserMsg.projector({ msg: '123' })).toBe('123');
  });
  it('selectUserDarkMode', () => {
    expect(fromMySelectors.selectUserDarkMode.projector({ darkMode: '123' })).toBe('123');
  });
});
