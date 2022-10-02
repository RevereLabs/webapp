import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar'
import FilterButton from '../components/FilterButton'
import ProjectCard from '../components/ProjectCard'
import Button from '../components/Button'
import axios from 'axios'


function Home({ Projects }) {
    const [filters, setFilters] = useState(['*']);
    const [searchParam, setSearchParam] = useState('')

    // Projects = [{"title":"TestGig2", "description":"Need to Design a website",
    //     "bounty":"USD400", "time":"2 months", "completed":false,  "category": "Design"},]

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get(
            "/api/gig/fetch?completed=false").then((res) => {
                console.log(res);
                setProjects(res.data);
            })
    }, [])

    return (
        <div className={styles.container}>
            <div className="fixed top-[10vh] left-[-5rem] z-0"><Image src="/background/bg1.png"
                height="500"
                width="415"
                alt='bg1' /></div>
            <div className="fixed top-[55vh] bottom-0 right-0 z-0"><Image src="/background/bg2.png"
                height="480"
                width="670"
                alt='bg2' /></div>

            <div className="relative z-20 flex flex-col md:flex-row w-[100%] items-center justify-between text-center overflow-visible">
                <div className="order-2 md:order-1">
                    <SearchBar searchParam={searchParam}
                        setSearchParam={setSearchParam}
                    />
                </div>
                <h2 className="font-mada font-[800] text-main text-[5rem] order-first md:order-2">Welcome</h2>
                <div className="order-3">
                    <FilterButton filters={filters}
                        setFilters={setFilters}
                    />
                </div>
            </div>

            <div className="relative z-2 flex w-[95%] items-center justify-center md:justify-end overflow-visible">
                <Button Content={'Create Project'}
                    link={'/gig/create'} />
            </div>


            <div className="flex flex-wrap w-full justify-center  relative z-0">
                {projects?.filter(item => filters.includes(item.category) || filters.length === 1)
                    .filter(item => item.title === searchParam || searchParam === '')
                    .map((project, i) => (
                        <ProjectCard isGigActive={!project.completed}
                            jobTitle={project.title}
                            amount={project.bounty}
                            description={project.description}
                            key={i}
                            objectId={project.objectId}
                            project={project}
                        />
                    ))}
            </div>
        </div>
    )
}

// export async function getServerSideProps(){
//     //code to fetch data
// }

export default Home
