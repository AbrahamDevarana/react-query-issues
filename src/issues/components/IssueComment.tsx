import { IssueProps } from "@/interfaces";
import { FC } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
    issue: IssueProps;
}

export const IssueComment: FC<Props> = ({ issue }) => {
    return (
        <div className="col-12">
            <div className="card border-white mt-2">
                <div className="card-header bg-dark">
                    <img
                        src={issue?.user.avatar_url || ''}
                        alt="User Avatar"
                        className="avatar"
                    />
                    <span className="mx-2">{issue.user.login} commented</span>
                </div>
                <div className="card-body text-dark">
                    <ReactMarkdown children={issue.body} />
                </div>
            </div>
        </div>
    );
};
