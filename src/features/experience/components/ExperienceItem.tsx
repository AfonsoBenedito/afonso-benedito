interface ExperienceItemProps {
    title: string;
    company?: string;
    start_date: string;
    end_date: string;
    description: string;
    languages_and_tools?: string[];
    url?: string;
}

const ExperienceItem = ({ title, company, start_date, end_date, description, languages_and_tools, url }: ExperienceItemProps) => {
    return (
        <div className="relative flex flex-col md:flex-row gap-2 md:gap-16 group">
            <div className="md:w-1/3 flex-shrink-0 md:text-right">
                {url ? (
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-primary-600 transition-colors">
                            {company || title}
                        </a>
                    </h3>
                ) : (
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {company || title}
                    </h3>
                )}
                <p className="text-sm text-primary-500 font-medium mt-1">{start_date} — {end_date}</p>
            </div>
            <div className="md:w-2/3 pl-8 md:pl-0 border-l-2 border-primary-100 md:border-l-0 relative">
                <span className="absolute top-2 -left-[9px] md:left-auto md:right-full md:mr-8 w-4 h-4 rounded-full bg-white border-4 border-primary-200 group-hover:border-primary-500 transition-colors"></span>
                {company && (
                    url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-heading font-medium text-primary-600 group-hover:text-primary-600 transition-colors">
                            {title}
                            <span className="ml-1 text-xs text-gray-400 group-hover:text-gray-600">↗</span>
                        </a>
                    ) : (
                        <p className="text-sm font-heading font-medium text-primary-600 mb-2">{title}</p>
                    )
                )}
                <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {languages_and_tools && languages_and_tools.map((tool, i) => (
                        <span key={i} className="text-xs border border-primary-100 text-primary-600 bg-primary-50/50 px-2 py-1 rounded-full">
                            {tool}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExperienceItem;
