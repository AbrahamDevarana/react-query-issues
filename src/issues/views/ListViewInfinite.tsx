import { useEffect, useState } from "react";
import { useIssues, useIssuesInfinite } from "@/hooks";

import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { LoadingIcon } from "@/shared/components/LoadingIcon";
import { State } from "@/interfaces";


export const ListViewInfinite = () => {

    const [ state, setstate ] = useState<State>()
    const [ selectedLabels, setSelectedLabels ] = useState<string[]>([]);
    const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels});

    const onLabelChanged = (labelName: string) => {
        (selectedLabels.includes(labelName))
            ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
            : setSelectedLabels([...selectedLabels, labelName]);

    }

    // add listener if its on the bottom of the page to fetch more data
    useEffect(() => {
    //    si esta al final de la pagina, fetch next page
        const handleScroll = () => {
            const bottom = Math.ceil((window.innerHeight + window.scrollY) + 100) >= document.documentElement.scrollHeight;
            if (bottom && !issuesQuery.isFetching) {
                issuesQuery.fetchNextPage();
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="row mt-5">
            <div className="col-8">
                {
                    issuesQuery.isLoading 
                    ? <LoadingIcon /> 
                    : <IssueList issues={issuesQuery.data?.pages.flat() || []} state={state} onStateChanged={(newState) => setstate(newState)}/>
                }

                <div className="d-flex mt-3 justify-content-center">
                   {
                      issuesQuery.isFetchingNextPage && <LoadingIcon /> 
                   }
                   {
                        !issuesQuery.hasNextPage && <p>No more issues</p>
                   }

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
