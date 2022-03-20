export const sendEmail = (
  email: string,
  subject: string,
  message: string,
): any => {
  return {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: message,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: 'mvb.serra@gmail.com',
  };
};
