import info from '../data/info.json';

const Hero = () => {
    const { name, image } = info.personal_info;
    const { email } = info.socials;

    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative">
            <div className="text-center z-10">
                <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-12 font-handwriting">
                    Welcome, I'm <span className="font-normal text-primary-600">{name.split(' ')[0]}</span>
                </h1>

                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto relative ring-4 ring-primary-100">
                    <img
                        src={image.startsWith('http') ? image : `${import.meta.env.BASE_URL}${image}`}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

        </section>
    );
};

export default Hero;
