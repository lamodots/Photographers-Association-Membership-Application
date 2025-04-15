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

export async function sendWhatsMessage(text, whatsappId) {
  //   const userwhatspp = removeFirstZero(whatsappId);
  const res = await fetch(
    `https://graph.facebook.com/v22.0/528735956997502/messages `,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer EAAP6Cxx5ZBvQBOZBryclzKwGXxLQTcWYIQ1Lb4ccdt54Bf5R7XZBEM26KayZAn6FE2Kq0nhdJwFKrTlLa74iFZAjNNRucC1KZCgWl9R0IXucuoYUyEZC3ZBbIOwNOCGB36kK2hejqqUThuBoUoIMNU1doYAVFXL51UAQZAZAQdNzZCFPZAcSDx5IDnpcDmidh4i8oZCQhkazCKK1tD7luFXDbcEMbTufjqcZAqVCuHRRq4sdA9EMS8`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: `${whatsappId}`,
        type: "text",
        text: {
          preview_url: false,
          body: text,
        },
      }),
    }
  );
}
