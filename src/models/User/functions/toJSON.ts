export function toJSON(this: any) {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;
  return userObject;
}
