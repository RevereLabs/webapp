import React,{useState} from 'react'
import Checkpoints from './others/Checkpoints'
import Bounty from './others/Bounty'
import Terms from './others/Terms'
import axios from 'axios';
function ContractPortal({objectId, mainJSON}) {

    console.log("mainJSON",mainJSON);
    const[tab,setTab]=useState('terms');
    const [json, setJSON] = useState(
        mainJSON
    );

    const onMainSubmit = ( ) => {
        axios.post(
            `/api/gig-application/update`,
            {
                formalJson:json,
                objectId:objectId
            }
        ).then((res) =>{
            console.log("finals",res)
            location.reload();
        })
    }


    console.log(json);

    return (
        <div className=" bg-accent relative h-[30rem] w-[25rem] border-[0.5rem] border-[#B8DED3] rounded-md flex flex-col items-center justify-around ">
            <div onClick={()=>setTab('terms')}
                className="bg-accent cursor-pointer border-2 border-textMain hover:border-main text-main w-[100%] h-[6rem]  font-mada font-[700] text-center flex items-center justify-center"><h2>Terms</h2></div>
            {tab==='terms'&&<div className=" h-[10rem] w-[100%]  p-2"><Terms
                json={json}
                setJSON={setJSON}
            /></div> }


            <div onClick={()=>setTab('checkpoints')}
                className="bg-accent cursor-pointer border-x-2 border-b-2 border-textMain hover:border-main text-main w-[100%] h-[6rem]  font-mada font-[700] text-center flex items-center justify-center"><h2>Checkpoints</h2></div>
            {tab==='checkpoints'&&<div className=" h-[10rem] w-[100%]  p-2"><Checkpoints
                json={json}
                setJSON={setJSON}
            /></div>}

            <div onClick={()=>setTab('bounty')}
                className="bg-accent cursor-pointer border-x-2 border-b-2 border-textMain hover:border-main text-main w-[100%] h-[6rem]  font-mada font-[700] text-center flex items-center justify-center"><h2>Bounty</h2></div>
            {tab==='bounty'&&<div  className=" h-[10rem] w-[100%]  p-2"><Bounty 
                json={json}
                setJSON={setJSON}
            /></div>}

            <button onClick={()=> {onMainSubmit()}}>
                Submit Values
            </button>
        </div>
    )
}

export default ContractPortal;