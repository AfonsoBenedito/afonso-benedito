import info from '../../../config/info.json';
import ProjectItem from './ProjectItem';

interface ProjectItemData {
    name: string;
    description: string;
    url?: string;
    github?: string;
    image?: string;
    languages?: string[];
    grade?: string;
}

interface ProjectCategory {
    category: string;
    items: ProjectItemData[];
}

const Projects = () => {
    const projects = info.projects as ProjectCategory[];

    return (
        <section id="projects" className="py-8 md:py-16">
            <div className="max-w-4xl mx-auto w-full">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4 md:mb-8">Projects</h2>

                {projects.map((category, catIndex) => (
                    <div key={catIndex} className={catIndex === projects.length - 1 ? "" : "mb-10 md:mb-20"}>
                        <h3 className="text-2xl font-light text-gray-900 mb-8">{category.category}</h3>
                        <div className="grid gap-4 md:gap-8">
                            {category.items.map((project, index) => (
                                <ProjectItem
                                    key={index}
                                    name={project.name}
                                    description={project.description}
                                    url={project.url}
                                    github={project.github}
                                    image={project.image}
                                    languages={project.languages}
                                    grade={project.grade}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
