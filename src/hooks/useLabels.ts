import { gitHubApi } from "@/api/githubApi";
import { sleep } from "@/helpers/sleep";
import { LabelProps } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";

const getLabels = async (): Promise <LabelProps[]> => {

    await sleep(2)
    
    const { data } = await gitHubApi.get<LabelProps[]>('/labels?per_page=100')

    if (!data) {
        throw new Error('No data')
    }
    return data
}


export const useLabels = () => {
    const labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
        // staleTime: 1000 * 60 * 60 // 1 hora
        // initialData: [
        // ],
        initialData: [
            {"id":791921801,"node_id":"MDU6TGFiZWw3OTE5MjE4MDE=","url":"https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F","name":"❤️","color":"ffffff","default":false,"description":null},
            {"id":1757816973,"node_id":"MDU6TGFiZWwxNzU3ODE2OTcz","url":"https://api.github.com/repos/facebook/react/labels/dependencies","name":"dependencies","color":"0366d6","default":false,"description":"Pull requests that update a dependency file"}
        ]
    })

    return { labelsQuery }
}