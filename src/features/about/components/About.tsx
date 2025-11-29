import info from '../../../config/info.json';
import { useInView } from '../../../hooks/useInView';

interface PersonalInfo {
    description: string;
}

const About = () => {
    const { description } = info.personal_info as PersonalInfo;
    const skills = info.skills as string[];
    const interests = info.interests as string[];

    const [sectionRef, isVisible] = useInView({ threshold: 0.5 });

    return (
        <section
            id="about"
            ref={sectionRef}
            className={`py-8 md:py-16 flex flex-col justify-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0 md:opacity-0 md:translate-y-10'
                }`}
        >
            <div className="max-w-4xl mx-auto w-full">
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    <div>
                        <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 md:mb-8">About Me</h2>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                            {description}
                        </p>



                    </div>

                    <div>
                        <h3 className="text-2xl font-light text-gray-900 mb-6">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium border border-primary-100">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                        Interests
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {interests.map((interest, index) => (
                            <span key={index} className="bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-medium border border-gray-100 shadow-sm">
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
