import styles from '@/sharedComponentStyle/Description/CenterDescription.module.css';

interface CenterDescriptionContent {
    content: {
        title: string;
        body: string;
    }
}

function CenterDescription(props: CenterDescriptionContent) {

    const content = props.content;
    const title = content.title;
    const body = content.body;

    return (
        <article className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.textBox}>
                    <h2>{title}</h2>
                    <p>{body}</p>
                </div>
            </div>
        </article>
    );
}

export default CenterDescription;