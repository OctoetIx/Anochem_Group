import nodemailer from "nodemailer";

const sendAdminEmail = async (data: any) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlMessage = `
  <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;">
    <h2 style="text-align: center; color: #25D366;">New Contact Form Submission</h2>
    <div style="max-width: 600px; margin: 0 auto;">

      <!-- Name -->
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background: #e5e5ea; padding: 10px 15px; border-radius: 15px; max-width: 40%;">Name:</div>
        <div style="background: #dcf8c6; padding: 10px 15px; border-radius: 15px; max-width: 60%; margin-left: 10px;">
          ${data.firstName} ${data.lastName}
        </div>
      </div>

      <!-- Email -->
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background: #e5e5ea; padding: 10px 15px; border-radius: 15px; max-width: 40%;">Email:</div>
        <div style="background: #dcf8c6; padding: 10px 15px; border-radius: 15px; max-width: 60%; margin-left: 10px;">
          ${data.email}
        </div>
      </div>

      <!-- Phone -->
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background: #e5e5ea; padding: 10px 15px; border-radius: 15px; max-width: 40%;">Phone:</div>
        <div style="background: #dcf8c6; padding: 10px 15px; border-radius: 15px; max-width: 60%; margin-left: 10px;">
          ${data.phoneNumber || "N/A"}
        </div>
      </div>

      <!-- Category -->
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background: #e5e5ea; padding: 10px 15px; border-radius: 15px; max-width: 40%;">Category:</div>
        <div style="background: #dcf8c6; padding: 10px 15px; border-radius: 15px; max-width: 60%; margin-left: 10px;">
          ${data.productInterest || "N/A"}
        </div>
      </div>

      <!-- Product -->
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background: #e5e5ea; padding: 10px 15px; border-radius: 15px; max-width: 40%;">Product:</div>
        <div style="background: #dcf8c6; padding: 10px 15px; border-radius: 15px; max-width: 60%; margin-left: 10px;">
          ${data.product || "N/A"}
        </div>
      </div>

      <!-- Message -->
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background: #e5e5ea; padding: 10px 15px; border-radius: 15px; max-width: 40%;">Message:</div>
        <div style="background: #dcf8c6; padding: 10px 15px; border-radius: 15px; max-width: 60%; margin-left: 10px; white-space: pre-wrap;">
          ${data.message || "N/A"}
        </div>
      </div>

    </div>
  </div>
  `;

  await transporter.sendMail({
    from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    replyTo: data.email,
    subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
    html: htmlMessage,
  });

  console.log("Admin WhatsApp-style email sent!");
};

export default sendAdminEmail;