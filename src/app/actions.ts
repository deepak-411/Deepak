"use server";

import { z } from 'zod';
import { Resend } from 'resend';

const hiringSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().min(2, "Company name is required."),
  jobTitle: z.string().min(2, "Job title is required."),
  jobDescription: z.string().min(20, "Job description must be at least 20 characters."),
  message: z.string().optional(),
});

const projectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  projectType: z.string({ required_error: "Please select a project type." }),
  budget: z.string({ required_error: "Please select a budget." }),
  projectDescription: z.string().min(20, "Project description must be at least 20 characters."),
});


export type FormState = {
  message: string;
  success: boolean;
};

async function sendEmail(to: string, subject: string, html: string, reply_to: string) {
  if (!process.env.RESEND_API_KEY) {
    return {
      message: 'The email service is not configured because the RESEND_API_KEY is missing from the .env file.',
      success: false,
    };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'Deepak Kumar Portfolio <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      reply_to: reply_to,
      html: html,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        message: 'There was an error sending your message. Please try again later.',
        success: false,
      };
    }

    return {
      message: "Thank you! Your message has been sent successfully.",
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

export async function sendHiringEmail(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = hiringSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || 'Invalid data. Please check your entries.',
      success: false,
    };
  }
  
  const { name, email, company, jobTitle, jobDescription, message } = validatedFields.data;
  
  const emailHtml = `
    <h1>New Hiring Inquiry</h1>
    <p>You have received a new inquiry from a hiring manager via your portfolio.</p>
    <h2>Candidate Details:</h2>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Company:</strong> ${company}</li>
      <li><strong>Proposed Role:</strong> ${jobTitle}</li>
    </ul>
    <h2>Job Description:</h2>
    <pre>${jobDescription}</pre>
    ${message ? `<h2>Additional Message:</h2><p>${message}</p>` : ''}
  `;

  const result = await sendEmail('dk201u@gmail.com', `Hiring Inquiry from ${name} at ${company}`, emailHtml, email);
  
  if(result.success) {
    return { ...result, message: `Thank you, ${name}! Your inquiry has been sent.` };
  }
  return result;
}


export async function sendProjectEmail(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = projectSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || 'Invalid data. Please check your entries.',
      success: false,
    };
  }
  
  const { name, email, projectType, budget, projectDescription } = validatedFields.data;
  
  const emailHtml = `
    <h1>New Project Proposal</h1>
    <p>You have received a new project proposal from a potential client via your portfolio.</p>
    <h2>Client Details:</h2>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
    </ul>
    <h2>Project Details:</h2>
    <ul>
      <li><strong>Project Type:</strong> ${projectType}</li>
      <li><strong>Estimated Budget:</strong> ${budget}</li>
    </ul>
    <h2>Project Description:</h2>
    <p>${projectDescription}</p>
  `;

  const result = await sendEmail('dk201u@gmail.com', `Project Proposal for a ${projectType}`, emailHtml, email);

  if(result.success) {
    return { ...result, message: `Thank you, ${name}! Your proposal has been sent.` };
  }
  return result;
}
