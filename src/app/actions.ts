"use server";

import { z } from 'zod';
import { Resend } from 'resend';
import { profile } from '@/lib/data';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type FormState = {
  message: string;
  success: boolean;
};

export async function sendEmail(prevState: FormState, formData: FormData): Promise<FormState> {
  if (!process.env.RESEND_API_KEY) {
    return {
      message: 'The email service is not configured because the RESEND_API_KEY is missing from the .env file.',
      success: false,
    };
  }

  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || 'Invalid data. Please check your entries.',
      success: false,
    };
  }
  
  const { name, email, message } = validatedFields.data;
  
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'Deepak Kumar Portfolio <onboarding@resend.dev>',
      to: [profile.email],
      subject: `New message from ${name} via your portfolio`,
      reply_to: email,
      html: `
        <p>You have received a new message from your portfolio contact form.</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        message: 'There was an error sending your message. Please try again later.',
        success: false,
      };
    }

    return {
      message: `Thank you, ${name}! Your message has been sent successfully.`,
      success: true,
    };

  } catch (exception) {
    console.error("Email sending exception:", exception);
    return {
      message: 'An unexpected error occurred. Please try again later.',
      success: false,
    };
  }
}
