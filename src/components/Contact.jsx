import info from '../data/info.json';

const Contact = () => {
    const { email, github, linkedin } = info.socials;

    return (
        <section id="contact" className="py-24 min-h-[50vh] flex flex-col justify-center">
            <div className="max-w-4xl mx-auto w-full text-center">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-8">Contact</h2>

                <h3 className="text-3xl md:text-5xl font-light text-gray-900 mb-12">
                    Let's work together.
                </h3>

                <div className="flex flex-col items-center gap-6">
                    <a
                        href={`mailto:${email}`}
                        className="text-xl md:text-2xl text-gray-900 hover:text-primary-600 transition-colors border-b-2 border-transparent hover:border-primary-600 pb-1"
                    >
                        {email}
                    </a>

                    <div className="flex gap-8 mt-8">
                        {github && (
                            <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors text-sm uppercase tracking-wider font-medium">
                                GitHub
                            </a>
                        )}
                        {linkedin && (
                            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-600 transition-colors text-sm uppercase tracking-wider font-medium">
                                LinkedIn
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
