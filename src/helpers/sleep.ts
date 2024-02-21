export const sleep = (ms: number = 1): Promise<boolean> => {
    return new Promise((resolve) => setTimeout(() => resolve(true), ms * 1000));
}