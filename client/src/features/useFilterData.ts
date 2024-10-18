export const useFilterData= (data:any, filter:number) =>{
    return data?.filter((data:any)=>data.layanan_id ==filter)
}