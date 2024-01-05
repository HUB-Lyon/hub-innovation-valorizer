const ProjectSocials = ({ project }) => {
  return (
    <div>
      <h2>Liens</h2>
      <div className="mt-2 flex gap-2">
        <a href={`https://teams.microsoft.com/l/chat/0/0?users=${project.members.map(member => member.email).join(',')}`} target="_blank" rel="noreferrer">
          <img src="/teams.svg" alt="Appeler avec teams" className="h-6 aspect-square" />
        </a>
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer">
            <img src="/github.svg" alt="Voir le github" className="h-6 aspect-square" />
          </a>
        )}
        {project.intra && (
          <a href={project.intra} target="_blank" rel="noreferrer">
            <img src="/epitech.png" alt="Page intra" className="h-6 aspect-square" />
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectSocials;
