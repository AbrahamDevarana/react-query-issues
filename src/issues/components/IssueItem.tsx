import { FC } from "react";
import { getIssue, getIssueComments } from "@/hooks";
import { IssueProps, State } from "@/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface Props {
    issue: IssueProps;
}

export const IssueItem:FC<Props> = ({issue}) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const prefetchData = () => {
        queryClient.prefetchQuery({
            queryKey: ["issue", issue.number],
            queryFn: () => getIssue(issue.number),
            staleTime: 60000
        })

        queryClient.prefetchQuery({
            queryKey: ["issue", issue.number, "comments"],
            queryFn: () => getIssueComments(issue.number),
            staleTime: 60000
        })
    }

    const preSetData = () =>{
        queryClient.setQueryData(
            ["issue", issue.number],
            issue,
            {
                updatedAt: new Date().getTime() + 100000
            }
        )
    }

    return (
        <div className="card mb-2 issue"
            onClick={() => navigate(`/issues/issue/${issue.number}`)}
            // onMouseEnter={prefetchData}
            onMouseEnter={preSetData}
        >
            <div className="card-body d-flex align-items-center">
                {
                    issue.state === State.Open
                    ? <FiCheckCircle size={20} color="green" />
                    : <FiInfo size={20} color="red" />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>
                       {issue.title}
                    </span>
                    <span className="issue-subinfo">
                        #{issue.number} opened 2 days ago by{" "}
                        <span className="fw-bold">{ issue.user.login }</span>
                    </span>
                </div>

                <div className="d-flex align-items-center">
                    <img
                        src={issue.user.avatar_url}
                        alt={issue.user.login}
                        className="avatar"
                    />
                    <span className="px-2"> {issue.comments} </span>
                    <FiMessageSquare />
                </div>
            </div>
        </div>
    );
};
