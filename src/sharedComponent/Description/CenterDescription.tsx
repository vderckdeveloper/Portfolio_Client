interface CenterDescriptionProps {
    title: string;
    content: string;
}

function CenterDescription(props: CenterDescriptionProps) {

    const title = props.title;
    const content = props.content;

    return(
        <article>
            <div>
                <h2>{title}</h2>
                <p>{content}</p>
            </div>    
        </article>
    );
}

export default CenterDescription;