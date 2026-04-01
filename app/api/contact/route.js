import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

      
        // 📩 ADMIN EMAIL
        await resend.emails.send({
            from: "Shahnawaz <dev@shahnawaz.online>",
            to: [process.env.CONTACT_EMAIL],
            reply_to: email,
            subject: `New message from ${name}`,
            html: `
                <h2>New Message</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b> ${message}</p>
            `,
            text: `Name: ${name}, Email: ${email}, Message: ${message}`,
        });

          await resend.emails.send({
            from: "Shahnawaz <dev@shahnawaz.online>",
            to: [email],
            reply_to: "dev@shahnawaz.online",
            subject: "Thanks for contacting Shahnawaz",


            html: `
<div style="margin:0;padding:0; font-family:Arial,sans-serif; color:#000;">
  <div style="max-width:600px;margin:auto;padding:20px;">

    <div style="border-radius:16px;padding:30px;box-shadow:0 0 40px rgba(0,200,255,0.1);">

      <!-- TITLE -->
      <h2 style="text-align:center;font-size:24px;margin-bottom:10px;color:#000;">
        Building Secure & Modern Digital Experiences
      </h2>

      <p style="text-align:center;color:#000;font-size:14px;margin-bottom:25px;">
        Thanks for reaching out — your message has been successfully received.
      </p>

      <!-- MESSAGE -->
      <div style="border:1px solid rgba(0,200,255,0.2);border-radius:12px;padding:20px;margin-bottom:25px;">
        <p style="margin:0;font-size:16px;color:#000;">
          Hello <strong style="color:#00d9ff;">${name}</strong>,
        </p>

        <p style="margin-top:10px;color:#000;line-height:1.6;">
          I appreciate you taking the time to connect. Your message has been received, and I’ll review it carefully and get back to you as soon as possible.
        </p>
      </div>

      <!-- BUTTON -->
      <div style="text-align:center;margin-bottom:30px;">
        <a href="https://www.shahnawaz.online" 
           style="display:inline-block;padding:12px 24px;background:linear-gradient(90deg,#00d9ff,#3b82f6);color:#000;text-decoration:none;border-radius:30px;font-weight:bold;">
           Visit Portfolio
        </a>
      </div>

      <!-- FOOTER -->
      <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(0,0,0,0.1);padding-top:20px;font-size:13px;color:#000;">
        
        <!-- LEFT SIDE TEXT -->
        <div>
          <p style="margin:5px 0;">🌐 www.shahnawaz.online</p>
          <p style="margin:5px 0;">📧 dev@shahnawaz.online</p>
          <p style="margin:5px 0;">📞 +91 9456702910</p>
          <p style="margin:5px 0;">📍 Jaipur, India</p>
        </div>

        <!-- RIGHT SIDE LOGO -->
        <div>
          <img src="https://www.shahnawaz.online/Portfolio.png"
               width="80"
               height="80"
               style="border-radius:50%; object-fit:cover;" />
        </div>

      </div>

      <!-- COPYRIGHT -->
      <p style="margin-top:15px;font-size:11px;color:#555;text-align:center;">
        © ${new Date().getFullYear()} Shahnawaz. All rights reserved.
      </p>

    </div>
  </div>
</div>
`
        });

        /* ✅ RESPONSE AFTER SUCCESS */
        return Response.json(
            { success: true, message: "Form submitted successfully" },
            { status: 200 }
        );


    } catch (error) {
        console.error("Resend error:", error);
        return Response.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
