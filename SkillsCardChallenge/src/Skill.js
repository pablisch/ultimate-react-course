function Skill({ skill }) {
  const style = {backgroundColor: skill.colour}

  return (
    <h3 className="skill" style={style}>{skill.skill} {skill.level === 3 ? "💪" : skill.level === 2 ? "👍" : "👶"}</h3>
  )
}

export default Skill
