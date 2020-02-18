export declare interface AddOptions {
    /**
     * Total number of jobs to be running at any point in time
     */
    totalConcurrency?: number;
    duration: number | string;
}
export declare interface AddDefinitions extends AddOptions {
    handler: () => any;
}
declare type AddParameters<D extends string> = {
    [key in D]: AddDefinitions;
};
declare function add(name?: string, handler?: any, options?: AddOptions): AddParameters<string>;
export default add;
