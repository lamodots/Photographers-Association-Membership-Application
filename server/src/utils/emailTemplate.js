const QRCode = require("qrcode");

exports.nodeMailerEmailTemplate = async (applicant) => {
  // Function returns mailOptions object
  // usage const mailOptions = nodeMailerEmailTemplate(object value)
  const qrCodeUrl = await QRCode.toDataURL(applicant._id.toString());
  const mailOptions = {
    from: `"Kerala Samajam Nigeria" <ksn@membersng.com>`,
    to: applicant.email,
    subject: "Your ticket is ready!",
    text: `Your ticket is ready!.\n\nApplicant Info:\nName: ${qrCodeUrl}\nEmail: ${applicant.email}\nPhone Number: ${applicant.phone_number}\n\nQR Code: ${qrCodeUrl}`,
    html: `<h1>your ticket is ready!.</h1>
                    <p><b>Dear ${applicant.full_name}</b></p>
                    <p>Your ticket to the Kerala Samajam Nigeria 2025 has been reserved and we are excited to have you join us for this immersive  experience!</p>
                   <p><b>Applicant Info:</b></p>
                   <ul>
                     <li>Name: ${applicant.full_name}</li>
                     <li>Email: ${applicant.email}</li>
                     <li>Phone Number: ${applicant.phone_number}</li>
                   </ul>
                    <p><b>Event Info:</b></p>
                    <ul>
                     <li>Event: ${applicant.event.title}</li>
                     <li>Time: ${applicant.event.time}</li>
                     <li>Venue: ${applicant.event.venue}</li>
                   </ul>
                   <p><b>Ticket details</b></p>
                   <img src="${qrCodeUrl}" alt="QR Code" />
               
                   <p>Order Number:   ${applicant._id}
        
                   `,
  };

  return mailOptions;
};

/*** @function  Function returns msg object
 usage const msg = sendGridEmailTemplate(object value)
 ***/
exports.sendGridEmailTemplate = (applicant) => {
  const familyMembers = applicant.attendees
    ? applicant.attendees
        .map((fam) => {
          {
            fam.attendee_full_name;
          }
        })
        .join(", ")
    : "None";
  console.log(familyMembers);
  const msg = {
    from: `"Kerala Samajam Nigeria" <ksn@membersng.com>`,
    to: applicant.email,
    subject: "Your ticket is ready!",
    text: `Your ticket is ready!.\n\nApplicant Info:\nName: ${applicant._id}\nEmail: ${applicant.email}\nPhone Number: ${applicant.phone_number}\n\nQR Code: https://api.qrserver.com/v1/create-qr-code/?data=${applicant._id}`,
    html: `<h1>Your ticket is ready!.</h1>
                    <p><b>Dear ${applicant.full_name}</b></p>
                    <p>Your ticket to the ${applicant.event.title} has been reserved and we are excited to have you join us for this immersive  experience!</p>
                   <p><b>Applicant Info:</b></p>
                   <ul>
                     <li>Name: ${applicant.full_name}</li>
                     <li>Email: ${applicant.email}</li>
                     <li>Phone Number: ${applicant.phone_number}</li>
                   </ul>
                   <p><b>Family member's Info:</b></p>
                    ${familyMembers}
                    <p><b>Event Info:</b></p>
                    <ul>
                     <li>Event: ${applicant.event.title}</li>
                     <li>Time: ${applicant.event.time}</li>
                     <li>Venue: ${applicant.event.venue}</li>
                   </ul>
                   <p><b>Ticket details</b></p>
                  <img src="https://api.qrserver.com/v1/create-qr-code/?data=${applicant._id}" alt="" title="" />
               
                   <p>Order Number:   ${applicant._id}
        
                   `,
  };

  return msg;
};
