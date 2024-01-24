export const inviteEmailTemplate = (link: string) => {
  return `
    <p>Hello!</p>
    <br />
    <p>Your store account has been created! Before logging in you will need to set up a new password, you can do this here <a href="${link}">${link}</a>. After setting up your password, you can login at www.store.cys.com</p>
    <br />
    <p>Kind regards,</p>
    <p>The CYS Team</p>
  `;
};
