import { SectionWrapper } from './section-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { education, skills, experiences, projects, certifications, achievements } from '@/lib/data';
import { BookOpen, Briefcase, Code, Cpu, Award, Star, Trophy, List, Mail } from 'lucide-react';

const SectionHeader = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center mb-12">
    <div className="mb-4 flex items-center justify-center rounded-full bg-primary/10 p-3 text-primary glow">
      {icon}
    </div>
    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-muted-foreground">{title}</h2>
    <p className="mt-2 max-w-2xl text-lg text-muted-foreground">{description}</p>
  </div>
);

export function Education() {
  return (
    <SectionWrapper>
      <section id="education">
        <SectionHeader
          icon={<BookOpen className="h-8 w-8" />}
          title="Education"
          description="My academic background and qualifications."
        />
        <Card className="card-glow">
          <CardHeader>
            <CardTitle>{education.degree}</CardTitle>
            <CardDescription>{education.university}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{education.location}</p>
            <p className="text-muted-foreground">{education.duration}</p>
            <p className="font-medium mt-2">{education.gpa}</p>
          </CardContent>
        </Card>
      </section>
    </SectionWrapper>
  );
}

export function Skills() {
  const skillCategories = [
    { title: 'Languages', icon: <Code className="mr-2 h-4 w-4" />, items: skills.languages },
    { title: 'AI/ML', icon: <Cpu className="mr-2 h-4 w-4" />, items: skills.ai },
    { title: 'Web & Mobile', icon: <Code className="mr-2 h-4 w-4" />, items: skills.web },
    { title: 'Tools & Libraries', icon: <List className="mr-2 h-4 w-4" />, items: skills.tools },
  ];

  return (
    <SectionWrapper>
      <section id="skills">
        <SectionHeader
          icon={<Star className="h-8 w-8" />}
          title="Technical Skills"
          description="A showcase of my technical abilities and tools I work with."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.title} className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center">{category.icon}{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}

export function Experience() {
  return (
    <SectionWrapper>
      <section id="experience">
        <SectionHeader
          icon={<Briefcase className="h-8 w-8" />}
          title="Work Experience"
          description="My professional journey and key contributions."
        />
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border/50 before:transform before:-translate-x-1/2">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex items-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
                <Briefcase className="h-5 w-5" />
              </div>
              <div className="ml-6 flex-grow">
                <Card className="card-glow">
                  <CardHeader>
                    <CardTitle>{exp.role}</CardTitle>
                    <CardDescription>{exp.company} - {exp.location}</CardDescription>
                    <p className="text-sm text-muted-foreground pt-1">{exp.duration}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                      {exp.points.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}

export function Projects() {
  return (
    <SectionWrapper>
      <section id="projects">
        <SectionHeader
          icon={<Trophy className="h-8 w-8" />}
          title="Projects"
          description="A selection of projects I've worked on."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, index) => (
            <Card key={index} className="card-glow flex flex-col">
              <CardHeader>
                <CardTitle>{proj.name}</CardTitle>
                <CardDescription>{proj.duration}</CardDescription>
                 {proj.tech && <p className="text-sm text-accent font-mono pt-2">{proj.tech}</p>}
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  {proj.points.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}

export function Certifications() {
  return (
    <SectionWrapper>
      <section id="certifications">
        <SectionHeader
          icon={<Award className="h-8 w-8" />}
          title="Certifications & Training"
          description="My credentials and continuous learning efforts."
        />
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <Card key={index} className="card-glow">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
                <p className="text-sm text-muted-foreground shrink-0 ml-4">{cert.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}

export function Achievements() {
    return (
      <SectionWrapper>
        <section id="achievements">
          <SectionHeader
            icon={<Star className="h-8 w-8" />}
            title="Awards & Achievements"
            description="Recognitions of my hard work and dedication."
          />
          <Card className="card-glow">
            <CardContent className="p-6">
              <ul className="list-disc space-y-3 pl-5 text-muted-foreground">
                {achievements.map((ach, index) => <li key={index}>{ach}</li>)}
              </ul>
            </CardContent>
          </Card>
        </section>
      </SectionWrapper>
    );
  }
