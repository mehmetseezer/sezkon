import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, message } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // 465 portu için true
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Web İletişim Formu" <${process.env.SMTP_USER}>`,
      to: 'info@sezkon.com',
      replyTo: email, // Siz cevapla dediğinizde direkt müşteriye gider
      subject: `Yeni Mesaj: ${name} - ${service}`,
      text: `İsim: ${name}\nE-posta: ${email}\nŞirket: ${company}\nHizmet: ${service}\n\nMesaj:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4f46e5;">Yeni İletişim Formu Mesajı</h2>
          <p><strong>Gönderen:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Şirket:</strong> ${company || 'Belirtilmedi'}</p>
          <p><strong>İlgi Alanı:</strong> ${service}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Mesaj:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    return NextResponse.json({ message: "Failed" }, { status: 500 });
  }
}