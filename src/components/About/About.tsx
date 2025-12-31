import Card from "../Card/Card.tsx"
function About()
{
    const items = [
        {header: "Who am I?", text: "I'm Jan, 16 years old and a passionate software developer and student at HTL Leonding."},
        {header: "What do I do?", text: "I specialize in web development, creating dynamic and responsive websites using modern technologies. Also I enjoy to program in C# and Java."},
        {header: "What are my hobbies?", text: "In my free time, I play table tennis, go out with friends, and explore new technologies. Currently I'm learning Rust and try to understand it :)."}
        ];
    const cards = items.map(((input, index) => <Card header={input.header} content={input.text} time={window.innerWidth > 768 ? index + 1: 0} key = {index}/>));
    return(
        <div className="w-full flex flex-col items-center justify-center px-3 sm:px-6 md:px-8">

            <div
                className="
                      flex flex-col
                      sm:flex-wrap sm:flex-row sm:justify-center
                      lg:grid lg:justify-start
                      lg:[grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]
                      gap-6
                      w-full
                      max-w-7xl
                    ">
                {cards}
            </div>
        </div>






    )
}
export default About;