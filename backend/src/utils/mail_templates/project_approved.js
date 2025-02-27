export const projectApprovedTemplate = (title, guide) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Project Approved</title>
  </head>
  <body>
      <h1>Project Approved</h1>
      <p>Dear Team,</p>
      <p>We are pleased to inform you that the project <strong>${title}</strong> has been approved.</p>
      <p>Your assigned guide for this project is <strong>${guide}</strong>.</p>
      <p>Congratulations and keep up the good work!</p>
      <p>Best regards,</p>
      <p>The Approval Team</p>
  </body>
  </html>
`;
