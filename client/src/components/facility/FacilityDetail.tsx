type FacilitySchema = {
    title: string;
    desc: string;
  };
export const FacilityDetail = ({ title, desc }: FacilitySchema)=>{
    return <div className="space-y-8 grow col-span-2 text-justify">
    <h3 className="font-bold text-2xl capitalize">{title}</h3>
    <p className="text-lg">
     {desc}
    </p>
  </div>
}