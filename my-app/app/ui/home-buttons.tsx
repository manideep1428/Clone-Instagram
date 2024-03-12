

export function HomeButton({title,icon}:any){
    return(
        <div className="flex flex-wrap justify-start bg-slate-800 w-64 h-16 p-auto m-auto ml-4 mt-2 font-bold items-center gap-x-4 hover:bg-slate-900 rounded cursor-pointer ">
            <p> {icon}</p>
            <h1 >{title}</h1>
        </div>
    )
}