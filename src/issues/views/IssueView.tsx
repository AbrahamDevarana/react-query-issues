import { Link, Navigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "@/hooks";
import { LoadingIcon } from "@/shared/components/LoadingIcon";

export const IssueView = () => {

    const params = useParams()

    const {id = 0} = params

    const { issueQuery, commentsQuery } = useIssue( +id )

    if(issueQuery.isLoading){
        return <LoadingIcon />
    }

    if(!issueQuery.data){
        return <Navigate to={'./issues/list'} />
    }

    const issue = issueQuery.data

    return (
        <div className="row mb-5 gap-3">
            <div className="col-12 mb-3">
                <Link to="./issues/list">Go Back</Link>
            </div>

            {/* Primer comentario */}
            <IssueComment issue={issue}/>
            {
                commentsQuery.isLoading && <LoadingIcon /> 
            }

            {/* Resto de comentarios */}
            {
                commentsQuery.data?.map((comment) => (
                    <IssueComment key={comment.id} issue={comment}/>
                ))
            }
        </div>
    );
};
