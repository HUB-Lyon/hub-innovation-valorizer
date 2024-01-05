const ProjectMembers = ({ project }) => {
  return (
    <div>
      <h2>Membres du projet</h2>
      <ul className='mt-2 list-disc'>
        {project.members.map(member =>
          <li key={member.email} className="text-sm italic">
            <span className='font-semibold'>{member.email}</span> - <span>{member.role}</span>
          </li>
        )}
      </ul>
    </div>

  )
}

export default ProjectMembers;
