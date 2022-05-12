import './UserCard.css';

export default function UserCard( {name, status, img, messages}){

    const background = 'linear-gradient(178.18deg, #FD749B -13.56%, #281AC8 158.3%)';

    return(
        <div className='userCard'>
            <div className='sub-userCard'>
                <div className='profile-img' ><span className='dot' style={{backgroundColor:`${status === 'online'?('#8CEE5D'):('#DEDEDE')}`}} /></div>
                <div className='name'>
                    <p>{name}</p>
                    <p>{status}</p>
                </div>

            </div>
           
            <p className='msj-number' style={{background:`${messages > 0?(background):('white')}`}} >
                {messages}
            </p>
            
            
        </div>
    )
}