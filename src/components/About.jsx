import info from '../data/info.json';

const About = () => {
    const { description } = info.personal_info;
    const { skills, education } = info;

    return (
        <section id="about" className="py-24 min-h-screen flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-12">About Me</h2>

                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h3 className="text-2xl font-light text-gray-900 mb-6">
                            Education
                        </h3>
                        <div className="space-y-8">
                            {education && education[0].timeline.map((edu, index) => (
                                <div key={index}>
                                    <h4 className="font-medium text-gray-900">{edu.institution}</h4>
                                    <p className="text-sm text-gray-500">{edu.title}</p>
                                    <p className="text-xs text-gray-400 mt-1">{edu.start_date} - {edu.end_date}</p>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-2xl font-light text-gray-900 mt-12 mb-6">
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

                    <div>
                        <p className="text-lg text-gray-600 leading-relaxed font-light">
                            {description}
                        </p>
                        <div className="mt-8 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                            <p className="text-gray-600 italic relative z-10">
                                "Highly motivated in data engineering or software development... Shy at first, then good company with a deep sense of humor."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
