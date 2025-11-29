interface CertificationItemProps {
    title: string;
    institution: string;
    url?: string;
}

const CertificationItem = ({ title, institution, url }: CertificationItemProps) => {
    return url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-gray-900 hover:text-primary-600 transition-colors">
            <div>
                <h4 className="text-lg font-medium">{title}</h4>
                <p className="text-sm text-primary-500">{institution}</p>
            </div>
            <span className="ml-1 text-xs text-gray-400 hover:text-gray-600">↗</span>
        </a>
    ) : (
        <div className="flex items-center justify-between">
            <div>
                <h4 className="text-lg font-medium text-gray-900">{title}</h4>
                <p className="text-sm text-primary-500">{institution}</p>
            </div>
        </div>
    );
};

export default CertificationItem;
