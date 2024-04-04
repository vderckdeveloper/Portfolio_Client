import styles from '@/sharedComponentStyle/Description/LeftDescription.module.css';

interface LeftDescriptionContent {
    content: {
        title: string;
        body: string;
    }
}

function LeftDescription(props: LeftDescriptionContent) {

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

export default LeftDescription;