import { gitHubApi } from "@/api/githubApi"
import { sleep } from "@/helpers/sleep";
import { IssueProps, State } from "@/interfaces"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";


interface Props {
    state?: State
    labels?: string[]
    page?: number
}

const getIssues = async ({state, labels, page = 1}: Props):Promise<IssueProps[]> => {
    await sleep(2)

    const params = new URLSearchParams()

    if( state ) params.append('state', state)
    if( labels && labels.length > 0 ) {
        const labelString = labels.join(',')
        params.append('labels', labelString)
    }

    params.append('page', page.toString())
    params.append('per_page', '5')


    const { data } = await gitHubApi.get<IssueProps[]>('/issues', { params })
    return data
}

export const useIssues = ({ state, labels }:Props) => {
    
    const [page, setpage] = useState(1)


    useEffect(() => {
        setpage(1)
    }, [state, labels])

    const issuesQuery = useQuery({
        queryKey: ['issues', { state, labels, page } ],
        queryFn: () => getIssues({ state, labels, page }),
    })

    const nextPage = () => {
        if( issuesQuery.data?.length === 0 ) return
        setpage((prev) => prev + 1)
    }

    const prevPage = () => {
        if( page === 1 ) return
        setpage((prev) => prev - 1)
    }
    

    return { 
        // Props
        issuesQuery, 
        // Getter
        page: issuesQuery.isFetching ? 'Loading...' : page,
        // Methods
        nextPage,
        prevPage
    }
}
