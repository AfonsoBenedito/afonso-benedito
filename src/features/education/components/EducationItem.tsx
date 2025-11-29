interface EducationItemProps {
    university?: string;
    institution?: string;
    title: string;
    start_date: string;
    end_date: string;
    url?: string;
}

const EducationItem = ({ university, institution, title, start_date, end_date, url }: EducationItemProps) => {
    return (
        <div className="relative flex flex-col md:flex-row gap-2 md:gap-16 group">
            <div className="md:w-1/3 flex-shrink-0 md:text-right">
                <h4 className="text-lg font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                    {university}
                </h4>
                <p className="text-sm text-primary-500 font-medium mt-1">{start_date} — {end_date}</p>
            </div>
            <div className="md:w-2/3 pl-8 md:pl-0 border-l-2 border-primary-100 md:border-l-0 relative">
                <span className="absolute top-2 -left-[9px] md:left-auto md:right-full md:mr-8 w-4 h-4 rounded-full bg-white border-4 border-primary-200 group-hover:border-primary-500 transition-colors"></span>
                {url ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center text-xl font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {institution}
                        <span className="ml-1 text-xs text-gray-400 group-hover:text-gray-600">↗</span>
                    </a>
                ) : (
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                        {institution}
                    </h3>
                )}
                <p className="text-sm font-heading font-medium text-primary-600 mb-2">{title}</p>
            </div>
        </div>
    );
};

export default EducationItem;
