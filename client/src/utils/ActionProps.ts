export type ActionProps ={
    link:string;
    onSuccess:()=>void;
    onError:(error:Error)=>void;
}