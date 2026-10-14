function SkillItem({ skill }) {
  return (
    <li className="skill-item">
      <span>{skill.name}</span>
      <span>{skill.level}</span>
    </li>
  );
}

export default SkillItem;