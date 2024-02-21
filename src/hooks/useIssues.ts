import { gitHubApi } from "@/api/githubApi"
import { sleep } from "@/helpers/sleep";
import { IssueProps } from "@/interfaces"
import { useQuery } from "@tanstack/react-query";

const getIssues = async ():Promise<IssueProps[]> => {

    await sleep(2)
    const { data } = await gitHubApi.get<IssueProps[]>('/issues')
    return data
}

export const useIssues = () => {

    const issuesQuery = useQuery({
        queryKey: ['issues'],
        queryFn: getIssues    
    })

    return { issuesQuery }
}
