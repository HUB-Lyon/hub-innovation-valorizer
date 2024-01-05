import { useEffect, useState } from "react";
import { XCircleIcon, CheckBadgeIcon, InformationCircleIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import { classNames } from "../../../utils";

const ProjectStatusAlert = ({ project }) => {
  const ALERT_CONFIG = {
    PENDING: {
      icon: InformationCircleIcon,
      message: "Ce projet n'a pas encore été validé.",
      alertBackgroundClass: "bg-amber-100",
      iconColor: "text-amber-400",
      messageColor: "text-amber-800",
    },
    VALIDATED: {
      icon: CheckBadgeIcon,
      message: `Ce projet a été validé par ${project.statusUpdatedBy} le ${dayjs(project.updatedAt).format('DD/MM/YY HH:mm')}.`,
      alertBackgroundClass: "bg-green-100",
      iconColor: "text-green-400",
      messageColor: "text-green-800",
    },
    REFUSED: {
      icon: XCircleIcon,
      message: `Ce projet a été refusé par ${project.statusUpdatedBy} le ${dayjs(project.updatedAt).format('DD/MM/YY HH:mm')}.`,
      alertBackgroundClass: "bg-red-100",
      iconColor: "text-red-400",
      messageColor: "text-red-800",
    },
    DONE: {
      icon: CheckBadgeIcon,
      message: `Ce projet est terminé depuis le ${dayjs(project.updatedAt).format('DD/MM/YY HH:mm')}.`,
      alertBackgroundClass: "bg-emerald-100",
      iconColor: "text-emerald-400",
      messageColor: "text-emerald-800",
    },
  }

  const [config, setConfig] = useState(null)

  useEffect(() => {
    if (project && project.status)
      setConfig(ALERT_CONFIG[project.status])
  }, [project]) // eslint-disable-line react-hooks/exhaustive-deps


  if (!config)
    return null;

  return (
    <div className={
      classNames(
        "rounded-md",
        "p-4 mt-3",
        config.alertBackgroundClass
      )
    }>
      <div className="flex">
        <div className="flex-shrink-0">
          <config.icon className={
            classNames(
              "h-5 aspect-1",
              config.iconColor
            )} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <p className={
            classNames(
              "text-sm font-medium",
              config.messageColor
            )
          }>
            {config.message}
          </p>
          {project.status === "REFUSED" && project.refusedBecause && (
            <div className={
              classNames(
                "mt-2 text-sm",
                "text-red-700",
              )
            }>
              <p className="whitespace-pre">{project.refusedBecause}</p>
              <p className="mt-2">
                Cliquez <a className="underline hover:text-red-800" href={`/update-project/${project._id}`}>ici</a> pour le modifier
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectStatusAlert;
