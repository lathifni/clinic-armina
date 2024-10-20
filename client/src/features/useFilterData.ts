export const useFilterData= (data:any, filter:string|number) =>{
    return data?.filter((data:any)=>data.layanan_id ==filter)
}