import { useParams } from "react-router-dom";
import CreateProject from "./CreateProject";
import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import Loading from "../components/Loading";
import { useMsal } from "@azure/msal-react";
import InternalError from "./InternalError";

const UpdateProject = () => {
  const { id } = useParams();
  const [isLoading, setIsoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [projectData, setProjectData] = useState(null)
  const { instance, accounts } = useMsal();

  useEffect(() => {
    instance
      .acquireTokenSilent({ scopes: ['User.Read'], account: accounts[0] })
      .then(res => res.idToken)
      .then(userToken => {
        fetch(`${API_URL}/projects/${id}`, { headers: { "Authorization": `Bearer ${userToken}` } }).then(res => {
          if (!res.ok) {
            setHasError(true)
            return
          }
          return res.json()
        }).then(res => {
          setProjectData(res)
          setIsoading(false)
        })

      })
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (hasError)
    return <InternalError />

  if (isLoading)
    return <Loading />

  return <CreateProject isEdit toUpdate={id} projectData={projectData} />
};

export default UpdateProject