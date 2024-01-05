const Milestones = ({ project }) => {
  return (
    <div className='pt-8 mt-8 mx-auto flex flex-col items-center'>
      <h2 className='pb-6 font-bold text-2xl'>Milestones</h2>
      <div className="relative mx-4 px-3 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-2 before:bg-gray-300 mb-8 max-w-2xl">
        {project.milestones.map((milestone, idx) => (
          <div key={idx} className="flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before:rounded-full before:-left-[35px] before:z-[1] before:bg-epitechBlue group">
            <h3 className="text-xl font-semibold flex justify-between items-center">
              {milestone.title}
            </h3>
            <time className="text-xs tracking-wide uppercase text-gray-400">{milestone.date}</time>
            <p className="mt-2 whitespace-pre-wrap text-justify">{milestone.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Milestones;
