"use server";

import { z } from 'zod';

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
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.message?.[0] || 'Invalid data.',
      success: false,
    };
  }
  
  const { name, email, message } = validatedFields.data;

  // In a real application, you would use a service like Resend, SendGrid, or Nodemailer here.
  // For this portfolio, we'll simulate the email sending process.
  console.log("--- New Contact Message ---");
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);
  console.log("---------------------------");

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Always return success for this simulation
  return {
    message: `Thank you, ${name}! Your message has been received. I'll get back to you shortly.`,
    success: true,
  };
}
