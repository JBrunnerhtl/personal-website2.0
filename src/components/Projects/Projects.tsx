import RepoCard from "../RepoCard/RepoCard";
function Projects()
{
    const input: {urlLinkMd:string, repoName:string, repoUrl:string}[] = [
        {urlLinkMd:"https://raw.githubusercontent.com/JBrunnerhtl/Online-Shop/master/README.md", repoName:"Online-Shop", repoUrl:"https://github.com/JBrunnerhtl/Online-Shop"},
        {urlLinkMd:"https://raw.githubusercontent.com/JBrunnerhtl/My-Website/master/README.md", repoName:"Personal-Website", repoUrl:"https://github.com/JBrunnerhtl/My-Website"},
        {urlLinkMd:"https://raw.githubusercontent.com/JBrunnerhtl/Rust-Todo-List/main/README.md", repoName:"Rust Todo List", repoUrl:"https://github.com/JBrunnerhtl/Rust-Todo-List"},
        {urlLinkMd:"https://raw.githubusercontent.com/JBrunnerhtl/RpnCalculator/main/README.md", repoName:"Rpn Calculator", repoUrl:"https://github.com/JBrunnerhtl/RpnCalculator"},
        {urlLinkMd:"https://raw.githubusercontent.com/JBrunnerhtl/Project-Fitness-and-Health/main/README.md", repoName:"Project Fitness and Health", repoUrl:"https://github.com/JBrunnerhtl/Project-Fitness-and-Health"},
        {urlLinkMd:"https://raw.githubusercontent.com/JBrunnerhtl/Todo-List/main/README.md", repoName:"JavaScript Todo List", repoUrl:"https://github.com/JBrunnerhtl/Todo-List"},
        {urlLinkMd: "https://raw.githubusercontent.com/JBrunnerhtl/personal-website2.0/main/README.md", repoName:"Personal Website 2.0", repoUrl:"https://github.com/JBrunnerhtl/personal-website2.0?tab=readme-ov-file"},
        {urlLinkMd: "https://raw.githubusercontent.com/JBrunnerhtl/Leetcode/main/README.md", repoName: "Leetcode", repoUrl:"https://github.com/JBrunnerhtl/Leetcode"}
    ]
    const cards = input.map((item, index) => ( <RepoCard urlLinkMd={item.urlLinkMd} repoName={item.repoName} repoUrl={item.repoUrl} key={index}/>));

    return(
        <div className="w-full flex flex-col items-center justify-center">
            {cards}
        </div>
    )
}
export default Projects;