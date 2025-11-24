interface ProjectItemProps {
    name: string;
    description: string;
    url?: string;
    github?: string;
    image?: string;
    languages?: string[];
    grade?: string;
}

const ProjectItem = ({ name, description, url, github, image, languages, grade }: ProjectItemProps) => {
    return (
        <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 border border-gray-100 hover:border-primary-100 hover:-translate-y-1">
            <div className="absolute top-6 right-6 flex gap-4 items-center md:hidden">
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="17.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    </a>
                )}
                {url && (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="17.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up-right"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </a>
                )}
            </div>

            {(github || url) && (
                <div className="hidden md:flex justify-end mb-4 gap-4 items-center">
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="17.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                    )}
                    {url && (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17.5" height="17.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up-right"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </a>
                    )}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="flex-1">
                    <h4 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-primary-600 transition-colors flex items-center gap-2">
                        {name}
                        {grade && (
                            <span className="text-xs text-gray-400 font-normal border border-gray-200 px-1.5 py-0.5 rounded">
                                {grade}
                            </span>
                        )}
                    </h4>
                    <p className="text-gray-600 mb-4 max-w-xl">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {languages && languages.map((lang, i) => (
                            <span key={i} className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded font-medium">
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>
                {image && (
                    url ? (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full md:w-48 h-32 rounded-lg overflow-hidden border border-gray-100 shadow-sm flex-shrink-0 relative group/image cursor-pointer"
                        >
                            <img
                                src={image.startsWith('http') ? image : `${import.meta.env.BASE_URL}${image}`}
                                alt={name}
                                className="w-full h-full object-cover transition-all duration-300 group-hover/image:opacity-50"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 feather feather-arrow-up-right"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                            </div>
                        </a>
                    ) : (
                        <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden border border-gray-100 shadow-sm flex-shrink-0 relative">
                            <img
                                src={image.startsWith('http') ? image : `${import.meta.env.BASE_URL}${image}`}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ProjectItem;
