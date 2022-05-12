import './Message.css';

export default function Message( {date, content}){


    return(
        <div className='Message'>
            <p>{date}</p>
            <p>{content}</p>
        </div>
    )
}