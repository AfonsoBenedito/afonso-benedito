import info from '../../../config/info.json';
import EducationItem from './EducationItem';
import CertificationItem from './CertificationItem';

interface EducationItemData {
    university?: string;
    institution?: string;
    title: string;
    start_date: string;
    end_date: string;
    url?: string;
}

interface EducationCategory {
    category: string;
    timeline: EducationItemData[];
}

interface CertificationItemData {
    title: string;
    institution: string;
    url?: string;
}

const Education = () => {
    const experience = info.experience as EducationCategory[];
    const certifications = info.certifications as CertificationItemData[];
    const educationData = experience.find(item => item.category === "Education")?.timeline || [];

    return (
        <section id="education" className="py-4 md:py-8 flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Education</h2>

                <div>
                    <h3 className="text-2xl font-light text-gray-900 mb-2 md:mb-8">Degrees</h3>
                    <div className="space-y-8">
                        {educationData.map((edu, index) => (
                            <EducationItem
                                key={index}
                                university={edu.university}
                                institution={edu.institution}
                                title={edu.title}
                                start_date={edu.start_date}
                                end_date={edu.end_date}
                                url={edu.url}
                            />
                        ))}
                    </div>

                    {certifications && certifications.length > 0 && (
                        <div className="mt-12">
                            <h3 className="text-2xl font-light text-gray-900 mb-2 md:mb-8">Certifications</h3>
                            <div className="space-y-6">
                                {certifications.map((cert, index) => (
                                    <CertificationItem
                                        key={index}
                                        title={cert.title}
                                        institution={cert.institution}
                                        url={cert.url}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Education;
