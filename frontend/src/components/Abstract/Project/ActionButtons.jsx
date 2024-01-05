import Button from "../../Button";

const ActionButtons = ({
  project,
  isAdmin,
  currentUser,
  updateProjectStatus,
  setIsRefusedModalOpen
}) => {
  return (
    <div className='absolute top-20 md:top-0 right-0 m-4 flex gap-2'>
      {isAdmin && (
        <>
          {project.status === 'PENDING' && (
            <>
              <Button onClick={() => updateProjectStatus('VALIDATED')} className='bg-green-700'>Valider</Button>
              <Button onClick={() => setIsRefusedModalOpen(true)} className='bg-red-700'>Refuser</Button>
            </>
          )}
          {project.status === 'VALIDATED' && (
            <>
              <Button onClick={() => updateProjectStatus('DONE')}>Marquer comme terminé</Button>
            </>
          )}
        </>
      )}
      {project.createdBy === currentUser.username && project.status === "REFUSED" && (
        <Button>Modifier</Button>
      )}
    </div>
  )
}

export default ActionButtons;
