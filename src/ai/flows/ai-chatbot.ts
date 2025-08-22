// ai-chatbot.ts
'use server';
/**
 * @fileOverview An AI chatbot that answers questions about Deepak Kumar based on his profile data.
 *
 * - aiChatbot - A function that handles the chatbot functionality.
 * - AIChatbotInput - The input type for the aiChatbot function.
 * - AIChatbotOutput - The return type for the aiChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotInputSchema = z.object({
  question: z.string().describe('The user question about Deepak Kumar.'),
});
export type AIChatbotInput = z.infer<typeof AIChatbotInputSchema>;

const AIChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user question.'),
});
export type AIChatbotOutput = z.infer<typeof AIChatbotOutputSchema>;

export async function aiChatbot(input: AIChatbotInput): Promise<AIChatbotOutput> {
  return aiChatbotFlow(input);
}

const deepakKumarProfile = `
Deepak Kumar
Software Engineer | Full-Stack Developer | AI/ML Enthusiast
+917992298486 | dk201u@gmail.com | LinkedIn: Deepak Kumar | GitHub: deepak-411

Education
Maharishi Markandeshwar (Deemed to be University)
Mullana Ambala, Haryana, India
July 2019 – Aug 2023
B.Tech in Computer Science and Engineering — CGPA : 7.95/10

Technical Skills
Programming Languages: C/C++, Python, Java, JavaScript, Node.js, React.js, PHP, SQL , MySQL, HTML, CSS.
Web Development : Full-Stack Development, Frontend and Backend, Android Development.
Tools and Libraries: Git, Visual Studio, OpenCV, Pandas, NumPy, XAMPP, Google Cloud, Arduino IDE.
Machine Learning and AI: Deep Learning, Natural Language Processing (NLP), Computer Vision.

Work Experience
Ecolab (Software Engineer Full Time - Bangalore, India)
June 2023 – Jan 2025
• Developed data-driven software solutions to optimize water and energy management.
• Designed scalable microservices for industrial IoT applications using Python, Java, and cloud technologies.
• Conducted performance tuning and database optimization to improve system efficiency.
• Collaborated with cross-functional teams to integrate AI-powered predictive maintenance solutions.

AI / ML Internship
Indian Air Force – Remote,Delhi
Dec 2023 – March 2024
• Developed AI models to optimize operational efficiency and decision-making in defense systems.
• Implemented machine learning algorithms in a high-security, captive network environment.
• Conducted advanced data analysis to enhance intelligence and automation capabilities.

Software Engineer Intern
Ecolab – Bangalore, India
02 January 2023 – 28 April 2023
• Developed and optimized software solutions to improve system efficiency and performance.
• Assisted in designing, testing, and debugging applications to support business operations.
• Collaborated with cross-functional teams to enhance software functionality and user experience.
• Implemented automation scripts to streamline workflows and reduce manual efforts.
• Conducted code reviews and provided insights to improve code quality and maintainability.

Project Contributor – PostgreSQL
Google Summer Of Code – Remote, India
June 2022 – Sep 2022
• Enhanced the PostgreSQL pgarchives portal, improving UI/UX and performance.
• Developed new features and optimizations for PostgreSQL’s archive system.
• Collaborated with an open-source community to improve database infrastructure.

Projects
Farmer Crop Insurance claim By (PMFBY) § | HTML,CSS, PHP, JavaScript
Oct 2022 - Dec 2022
• Built a web-based system to track Pradhan Mantri Fasal Bima Yojana (PMFBY) insurance claims.
• Developed a real-time monitoring dashboard for farmers, insurance companies, and government agencies.
• Ensured transparency and efficiency in crop insurance claim settlements.

Deepak’s Algorithm § | Algorithm ,C++
May 2022 – Oct 2022
• Designed an algorithm to efficiently process subarray queries on large datasets.
• Reduced time complexity and improved computational performance.

MMDU UMS APP (University Project) § | Java, Android studio
Jul 2021 – Dec 2021
• Developed a mobile app for students and faculty to access university resources.
• Implemented secure authentication and real-time notifications.

Keep Tab: A novel way to aid memory with deep learning algorithms
2019 - 2021
• Developed a wearable device using deep-learning algorithms to help users recall object locations.
• Integrated a microcontroller, camera, and accelerometer for real-time tracking.
• Built a voice-enabled search feature powered by Google Assistant.

Certifications/Training
Space Science and Technology Awareness Training (START)
ISRO – Remote, India
April 2024 – May 2024
Silver League – Image captioning models and mastering diverse topics including generative AI, responsible AI, and large language models.
Google Cloud – Remote, India
2 March, 2024
Advanced React.js
Cutshort – Remote, India
17 Sep, 2023
FPGA-Based Embedded Systems (SMDP-III Project)
NIELIT Calicut – Remote, India
Oct 2020 - Oct 2020

Achievements
• The Civil Judge of Bihar nominated me for the Padma Shri Award 2024 for my exceptional contributions to the fields of Science and Engineering.
• HackerEarth handle : Deepak (Data Structure 3 star, Algorithm 2 Star , C++ 5 Star + Amateur Level)
• Hackerrank handle : Deepak (Rated 5 star in c++ and 5 star and gold level in Problem Solving.)
• Cutshort Certified React.js - Advanced Certificate : Deepak Kumar
• Achieved Google Cloud badge and secured first place in Google Cloud Skill Boost Silver League, demonstrating expertise in image captioning models and mastering diverse topics including generative AI, responsible AI, and large language models. : Deepak Kumar
• Rajasthan IT Hackathon 2023 First Prize : Awarded by the Chief Minister Of Rajasthan
• Mercor Hackathon 2023 Conducted by Mercor : Certificate of Appreciation
• TerraTech Hackathon 2023 Conducty by Terratech.AI : Winner
• Smart Odisha Hackathon 2022 Government of Odisha. : 3rd Prize
• Young Scientist Award 2020 , Conducted by VDGOOD : Award Winner
• Youn Scientist India 2020 conducted by Space Kidz and NITI Ayog : Award Winner
• Kishore Vaigyanik Protsahan Yojna - 2019 (KVPY) Fellow : SX Fellow
• Scientist for a Day 2019, NASA : Winner
• More than 100 National and International awards in Innovation, Coding and Research.
`;

const aiChatbotPrompt = ai.definePrompt({
  name: 'aiChatbotPrompt',
  input: {schema: z.object({
    question: AIChatbotInputSchema.shape.question,
    deepakKumarProfile: z.string(),
  })},
  output: {schema: AIChatbotOutputSchema},
  prompt: `You are a chatbot answering questions about Deepak Kumar.
  Use the following information about Deepak Kumar to answer the user's question.
  If the question cannot be answered based on the information provided, respond with "I am sorry, I don't have enough information to answer that question."

  Deepak Kumar's Profile:
  {{{deepakKumarProfile}}}

  User's Question: {{question}}`,
});

const aiChatbotFlow = ai.defineFlow(
  {
    name: 'aiChatbotFlow',
    inputSchema: AIChatbotInputSchema,
    outputSchema: AIChatbotOutputSchema,
  },
  async input => {
    const {output} = await aiChatbotPrompt({
      ...input,
      deepakKumarProfile,
    });
    return output!;
  }
);
