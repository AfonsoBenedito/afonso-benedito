import info from '../data/info.json';

const Projects = () => {
    const { projects } = info;

    return (
        <section id="projects" className="py-24 min-h-screen">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-12">Work</h2>

                {projects.map((category, catIndex) => (
                    <div key={catIndex} className="mb-20">
                        <h3 className="text-2xl font-light text-gray-900 mb-8">{category.category}</h3>
                        <div className="grid gap-8">
                            {category.items.map((project, index) => (
                                <div key={index} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 border border-gray-100 hover:border-primary-100 hover:-translate-y-1">
                                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                                        <div>
                                            <h4 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                                {project.name}
                                            </h4>
                                            <p className="text-gray-600 mb-4 max-w-xl">{project.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.languages && project.languages.map((lang, i) => (
                                                    <span key={i} className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded font-medium">
                                                        {lang}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {project.url && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary-50 text-primary-400 hover:bg-primary-600 hover:text-white transition-all"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
