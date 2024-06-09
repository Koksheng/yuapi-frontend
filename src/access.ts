/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    canUser: loginUser,
    // canAdmin: currentUser && currentUser.userRole === 1,
    canAdmin: loginUser?.userRole === 'admin',
  };
}
