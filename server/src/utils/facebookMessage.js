/***
 * @function removeFirstZero()
 * @param phoneNumber
 * Example usage:
 * const phoneNumber = "07060980876";
 * const updatedNumber = removeFirstZero(phoneNumber);
 * console.log(updatedNumber); Output: "7060980876"
 *
 */
function removeFirstZero(phoneNumber) {
  // Check if the phone number starts with '0'
  if (phoneNumber.startsWith("0")) {
    // Remove the first character (the zero)
    return phoneNumber.slice(1);
  }
  // Return the phone number unchanged if it doesn't start with '0'
  return phoneNumber;
}

export async function sendWhatsMessage(whatsappId, membername, memberId) {
  //   const userwhatspp = removeFirstZero(whatsappId);
  const res = await fetch(
    `https://graph.facebook.com/v22.0/528735956997502/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer EAAP6Cxx5ZBvQBO7ke5jl2ZCYi0Uqr1gao8QYJEAKHSPUYVPHFEGc8rX6cZBmXt5HHPR60jZC2kYh0YXL9wyXc2HiEw7A4ZCNzTgTAjjoZB8Xqh8IFZAQ6q6PKRZAMJv0woQmYeyi1IVvCujWAPpVcDg2Vz9CbNNrdk4ReNJi0s1V3H4oMvLoOLZALdvrRYyYYGJt5Dx0c2FnAmWzoEMlF4XeggOpZCVX1E7y0kSlnvcbfNZAp4ZD`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: `${whatsappId}`,
        type: "template",
        template: {
          name: "membership_update",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: `${membername}`,
                },
                {
                  type: "text",
                  text: `${memberId}`,
                },
              ],
            },
          ],
        },
      }),
    }
  );

  if (!res.ok) {
    console.log("Error sending WhatsApp message");
  }
  console.log(res.messages);
}
