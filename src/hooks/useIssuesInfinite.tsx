import { gitHubApi } from "@/api/githubApi"
import { sleep } from "@/helpers"
import { IssueProps, State } from "@/interfaces"
import { useInfiniteQuery } from "@tanstack/react-query"


interface Props {
    state?: State
    labels?: string[]
    page?: number
}

interface QueryProps {
    pageParam?: number
    queryKey: (string | Props)[]
}


const getIssues = async ( {queryKey, pageParam = 1}: QueryProps ):Promise<IssueProps[]> => {

    const [ , , args ] = queryKey
    const { state, labels } = args as Props
    const params = new URLSearchParams()

    if( state ) params.append('state', state)
    if( labels && labels.length > 0 ) {
        const labelString = labels.join(',')
        params.append('labels', labelString)
    }

    params.append('page', pageParam.toString())
    params.append('per_page', '5')


    const { data } = await gitHubApi.get<IssueProps[]>('/issues', { params })
    return data
}


export const useIssuesInfinite = ({state, labels}: Props) => {

    const issuesQuery = useInfiniteQuery({
        initialPageParam: 0,
        queryKey: ['issues', 'infinite', { state, labels, page: 1 }],
        queryFn: (data) => getIssues(data),
        getNextPageParam: (lastPage, allPages) => {
            if( lastPage.length === 0 ) return 
            return allPages.length + 1
        },
        staleTime: 1000 * 60 * 5
    })

  return {
    issuesQuery
  }
}
