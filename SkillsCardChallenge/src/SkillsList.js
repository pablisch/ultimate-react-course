import Skill from "./Skill"

function SkillsList() {
  const skills = [
    {skill: "HTML & CSS", level: 3, colour: "blue"},
    {skill: "JavaScript", level: 3, colour: "yellow"},
    {skill: "Ruby", level: 2, colour: "red"},
    {skill: "Java", level: 1, colour: "brown"},
    {skill: "React", level: 2, colour: "cyan"},
    {skill: "Python", level: 1, colour: "orange"},
  ]
  return (
    <div className="skill-list">
      {skills.map((skill, index) => 
        <Skill key={index} skill={skill} />
      )}
    </div>
  )
}

export default SkillsList;