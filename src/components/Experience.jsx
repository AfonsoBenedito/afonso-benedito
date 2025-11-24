import info from '../data/info.json';

const Experience = () => {
    const { experience } = info;
    const workExperience = experience.find(item => item.category === "Work")?.timeline || [];

    return (
        <section id="experience" className="py-24 min-h-screen flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-12">Experience</h2>

                <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                    {workExperience.map((job, index) => (
                        <div key={index} className="relative flex flex-col md:flex-row gap-8 md:gap-16 group">
                            <div className="md:w-1/3 flex-shrink-0 md:text-right">
                                <h3 className="text-xl font-medium text-gray-900 group-hover:text-primary-600 transition-colors">{job.title}</h3>
                                <p className="text-sm text-primary-500 font-medium mt-1">{job.start_date} — {job.end_date}</p>
                            </div>
                            <div className="md:w-2/3 pl-8 md:pl-0 border-l-2 border-primary-100 md:border-l-0 relative">
                                <span className="absolute top-2 -left-[9px] md:left-auto md:right-full md:mr-8 w-4 h-4 rounded-full bg-white border-4 border-primary-200 group-hover:border-primary-500 transition-colors"></span>
                                <p className="text-gray-600 leading-relaxed mb-4">{job.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {job.languages_and_tools && job.languages_and_tools.map((tool, i) => (
                                        <span key={i} className="text-xs border border-primary-100 text-primary-600 bg-primary-50/50 px-2 py-1 rounded-full">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
