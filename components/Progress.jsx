import React from 'react'
import styles from '../styles/progress.module.scss'
function Progress({steps=3,stepsDone=0}) {
    var bars =[];
    for(var i = 0; i < steps;i++){
        stepsDone<=0?(bars.push(<div className={styles.bar}
            key={i}></div>))
            :(bars.push(<div className={styles.barComplete}
                key={i}></div>))
        stepsDone--;
    }
    return (
        <div className="flex h-[0.8rem] mt-10">
            {bars}
        </div>
    )
}

export default Progress