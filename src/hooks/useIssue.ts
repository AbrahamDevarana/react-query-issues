import { gitHubApi } from "@/api/githubApi";
import { sleep } from "@/helpers/sleep";
import { IssueProps } from "@/interfaces";
import { useQuery } from "@tanstack/react-query"


const getIssue = async (issueNumber: number):Promise<IssueProps> => {
    await sleep(2)
    const { data } = await gitHubApi.get<IssueProps>(`/issues/${issueNumber}`)
    return data
}   

const getIssueComments = async (issueNumber: number):Promise<IssueProps[]> => {
    await sleep(2)
    const { data } = await gitHubApi.get<IssueProps[]>(`/issues/${issueNumber}/comments`)
    return data
}


export const useIssue = (issueNumber: number) => {
    const issueQuery = useQuery({
        queryKey: ['issue', issueNumber],
        queryFn: () => getIssue(issueNumber)
    })

    const commentsQuery = useQuery({
        queryKey: ['issue', issueNumber, 'comments'],
        queryFn: () => getIssueComments(issueNumber),
        enabled: !!issueQuery.data
    })

  return { issueQuery, commentsQuery }
}
