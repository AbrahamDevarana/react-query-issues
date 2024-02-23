import { useState } from "react";
import { useIssues } from "@/hooks";

import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { LoadingIcon } from "@/shared/components/LoadingIcon";
import { State } from "@/interfaces";


export const ListView = () => {

    const [ state, setstate ] = useState<State>()
    const [ selectedLabels, setSelectedLabels ] = useState<string[]>([]);
    const { issuesQuery, page, nextPage, prevPage } = useIssues({ state, labels: selectedLabels});

    const onLabelChanged = (labelName: string) => {
        (selectedLabels.includes(labelName))
            ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
            : setSelectedLabels([...selectedLabels, labelName]);

    }

    return (
        <div className="row mt-5">
            <div className="col-8">
                {
                    issuesQuery.isLoading 
                    ? <LoadingIcon /> 
                    : <IssueList issues={issuesQuery.data || []} state={state} onStateChanged={(newState) => setstate(newState)}/>
                }

                <div className="d-flex mt-2 justify-content-between">
                    <button className="btn btn-outline-primary" onClick={prevPage} disabled={issuesQuery.isFetching}>Prev</button>
                    <span>Page { page }</span>
                    <button className="btn btn-outline-primary" onClick={nextPage} disabled={issuesQuery.isFetching}>Next</button>
                </div>
            </div>

            <div className="col-4">
                <LabelPicker 
                    selectedLabels={selectedLabels}
                    onChange={(labelName: string) => onLabelChanged(labelName)}
                />
            </div>
        </div>
    );
};
