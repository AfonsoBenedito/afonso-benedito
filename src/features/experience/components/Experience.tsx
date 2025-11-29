import info from '../../../config/info.json';
import ExperienceItem from './ExperienceItem';

interface ExperienceItemData {
    title: string;
    company?: string;
    start_date: string;
    end_date: string;
    description: string;
    languages_and_tools?: string[];
    url?: string;
}

interface ExperienceCategory {
    category: string;
    timeline: ExperienceItemData[];
}

const Experience = () => {
    const experience = info.experience as ExperienceCategory[];
    const workExperience = experience.find(item => item.category === "Work")?.timeline || [];

    return (
        <section id="experience" className="py-4 md:py-8 flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 md:mb-8">Experience</h2>

                <div className="space-y-8 relative">
                    {workExperience.slice().reverse().map((job, index) => (
                        <ExperienceItem
                            key={index}
                            title={job.title}
                            company={job.company}
                            start_date={job.start_date}
                            end_date={job.end_date}
                            description={job.description}
                            languages_and_tools={job.languages_and_tools}
                            url={job.url}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
