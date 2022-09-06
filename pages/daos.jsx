import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar'
import DaoCard from '../components/DaoCard'
import Button from '../components/Button'

function Daos({Daos}) {
    const [searchParam,setSearchParam] = useState('')

    Daos = [{"title":"odysseydao", "gigsProvided":250, "description":"Need to Design a website", "link":"https://ethereum.org/en/dao/", "memberCount":414, "gigsDone":135,  "category": "Design"},
        {"title":"odysseydao", "gigsProvided":250, "description":"Need to implement a website", "link":"https://ethereum.org/en/dao/", "memberCount":414, "gigsDone":135,  "category": "Development"},
        {"title":"odysseydao", "gigsProvided":250, "description":"Need to implement a website", "link":"https://ethereum.org/en/dao/", "memberCount":414, "gigsDone":359,  "category": "Development"},
        {"title":"odysseydao", "gigsProvided":250, "description":"Need to implement a website", "link":"https://ethereum.org/en/dao/", "memberCount":414, "gigsDone":359,  "category": "Design"},
        {"title":"odysseydao", "gigsProvided":250, "description":"Need to implement a website", "link":"https://ethereum.org/en/dao/", "memberCount":414, "gigsDone":359,  "category": "Design"},
        {"title":"revereDao", "gigsProvided":250, "description":"Need to implement a website", "link":"https://ethereum.org/en/dao/", "memberCount":414, "gigsDone":359,  "category": "Design"},
        {"title":"revereDao", "gigsProvided":250, "description":"Need to implement a website", "link":"https://ethereum.org/en/dao/", "memberCount":414, "gigsDone":135,  "category": "Design"},
        {"title":"revereDao", "gigsProvided":250, "description":"Need to implement a website", "link":"https://ethereum.org/en/dao/", "memberCount":414, "gigsDone":135,  "category": "Development"},
        {"title":"revereDao", "gigsProvided":30, "description":"Need to implement a website", "link":"https://ethereum.org/en/dao/", "memberCount":414, "gigsDone":135,  "category": "Development"}]


    return (
        <div className={styles.container}>
            <div className="fixed top-[10vh] left-[-5rem]"><Image src="/background/bg1.png"
                height="500"
                width="415" /></div>
            <div className="fixed top-[55vh] bottom-0 right-0"><Image src="/background/bg2.png"
                height="480"
                width="670" /></div>

            <div className="relative z-20 flex w-[100%] items-center justify-between  overflow-visible">
                <SearchBar searchParam={searchParam}
                    setSearchParam={setSearchParam}/>
                <h2 className="font-mada font-[800] text-main text-[5rem]">Le Daos</h2>
                <div className="w-[10rem]"></div>
            </div>

            <div className="relative z-2 flex w-[95%] items-center justify-end overflow-visible">
                <Button Content={'Apply Dao'}
                    link={'https://linktr.ee/reverelabs'}/>
            </div>


            <div className="flex flex-wrap w-[100%] justify-items-center  relative z-0">
                {Daos.filter(item=>item.title==searchParam||searchParam=='')
                    .map((Dao, i) =>(<DaoCard daoImage={'/dao.png'}
                        gigsProvided={Dao.gigsProvided}
                        gigsDone={Dao.gigsDone}
                        memberCount={Dao.memberCount}
                        descp={Dao.description}
                        link={Dao.link}
                        key={i}/>  ))}
            </div>
        </div>
    )
}

//   export async function getServerSideProps(){
//       //code to fetch data
//   }

export default Daos
