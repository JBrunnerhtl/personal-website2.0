import SkillCard from "../SkillCard/SkillCard"
import screenPng from "../../assets/Images/computer-screen.png"
import databasePng from "../../assets/Images/database.png"
import toolsPng from "../../assets/Images/tools.png"
import favouritePng from "../../assets/Images/favourite.png"
function Skills()
{
    const input =[
        {url: screenPng, skills: ["TypeScript", "HTML", "CSS", "JavaScript", "React", "Avalonia (C#)"], alt: "Frontend"},
        {url: databasePng ,skills: ["Java", "Node.js", "SQL (Oracle)", "C#", "Express", "TypeScript", "JavaScript"], alt: "Backend"},
        {url: toolsPng, skills: ["Git", "GitHub", "Jetbrain IDE's", "DBeaver", "Linux/Ubuntu", "Windows", "Podman", "Docker"], alt: "Tools"},
        {url: favouritePng, skills: ["React", "TypeScript", "C#", "SQL", "Java"], alt: "Favourites"}
    ]

    const cards = input.map((item, index) =>
    {
        console.log(index);
        return <SkillCard urlOfImage={item.url} skillNames={item.skills} alt={item.alt} key={index} time={index * 2}/>

    })

    return(
        <div className="w-full flex flex-col items-center justify-start px-3 sm:px-6 md:px-8">
            <div
                className="
                          grid
                          w-full
                          max-w-7xl
                          gap-6
                          justify-items-center
                          [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]
                        "
            >
                {cards}
            </div>
        </div>

    );
}
export default Skills;